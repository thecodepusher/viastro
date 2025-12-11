import { createHash } from "crypto";

export interface WSPayFormData {
  ShopID: string;
  ShoppingCartID: string;
  Version: string;
  TotalAmount: string;
  ReturnURL: string;
  ReturnErrorURL: string;
  CancelURL: string;
  Signature: string;
  CustomerFirstName?: string;
  CustomerLastName?: string;
  CustomerEmail?: string;
  CustomerPhone?: string;
  Lang?: string;
  ReturnMethod?: "GET" | "POST";
  AuthorizationType?: "PreAuth" | "Sale";
}

export interface WSPayCallbackParams {
  Success?: string;
  ApprovalCode?: string;
  ShoppingCartID?: string;
  Signature?: string;
  Amount?: string;
  STAN?: string;
  ErrorMessage?: string;
  wsPayOrderId?: string;
}

export function generateWSPaySignature(
  shopId: string,
  secretKey: string,
  shoppingCartId: string,
  totalAmount: string
): string {
  const amountForHashing = totalAmount.replace(/[^0-9]/g, "");

  const signatureString = `${shopId}${secretKey}${shoppingCartId}${secretKey}${amountForHashing}${secretKey}`;

  const hash = createHash("sha512").update(signatureString).digest("hex");

  return hash;
}

export function formatAmountForWSPay(amount: number): string {
  return amount.toFixed(2).replace(".", ",");
}

export function generateShoppingCartId(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `VI${timestamp}${random}`;
}

export function ensureHttpsUrl(
  url: string,
  isTestMode: boolean = true
): string {
  if (isTestMode && (url.includes("localhost") || url.includes("127.0.0.1"))) {
    return url;
  }

  return url.replace(/^http:/i, "https:");
}

export function createWSPayFormData(params: {
  shopId: string;
  secretKey: string;
  shoppingCartId: string;
  totalAmount: number;
  returnUrl: string;
  returnErrorUrl: string;
  cancelUrl: string;
  customerFirstName?: string;
  customerLastName?: string;
  customerEmail?: string;
  customerPhone?: string;
  lang?: string;
  returnMethod?: "GET" | "POST";
  authorizationType?: "PreAuth" | "Sale";
}): WSPayFormData {
  const formattedAmount = formatAmountForWSPay(params.totalAmount);
  const signature = generateWSPaySignature(
    params.shopId,
    params.secretKey,
    params.shoppingCartId,
    formattedAmount
  );

  const formData: WSPayFormData = {
    ShopID: params.shopId,
    ShoppingCartID: params.shoppingCartId,
    Version: "2.0",
    TotalAmount: formattedAmount,
    ReturnURL: params.returnUrl,
    ReturnErrorURL: params.returnErrorUrl,
    CancelURL: params.cancelUrl,
    Signature: signature,
  };

  if (params.customerFirstName) {
    formData.CustomerFirstName = params.customerFirstName;
  }
  if (params.customerLastName) {
    formData.CustomerLastName = params.customerLastName;
  }
  if (params.customerEmail) {
    formData.CustomerEmail = params.customerEmail;
  }
  if (params.customerPhone) {
    formData.CustomerPhone = params.customerPhone;
  }
  if (params.lang) {
    formData.Lang = params.lang;
  }
  if (params.returnMethod) {
    formData.ReturnMethod = params.returnMethod;
  }
  if (params.authorizationType) {
    formData.AuthorizationType = params.authorizationType;
  }

  return formData;
}

export function getWSPayAuthorizationUrl(isTestMode: boolean = true): string {
  if (isTestMode) {
    return "https://formtest.wspay.biz/authorization.aspx";
  }
  return "https://form.wspay.biz/authorization.aspx";
}

export function verifyWSPayCallbackSignature(
  params: WSPayCallbackParams,
  shopId: string,
  secretKey: string
): boolean {
  if (!params.Signature || !params.ShoppingCartID || !params.Success) {
    return false;
  }

  const approvalCode = params.ApprovalCode || "";
  const signatureString = `${shopId}${secretKey}${params.ShoppingCartID}${secretKey}${params.Success}${secretKey}${approvalCode}${secretKey}`;
  const hash = createHash("sha512").update(signatureString).digest("hex");
  return hash.toLowerCase() === params.Signature.toLowerCase();
}

export interface WSPayCaptureReleaseParams {
  shopId: string;
  secretKey: string;
  wsPayOrderId: string;
  approvalCode: string;
  amount?: number; // Za capture - opcioni, ako nije naveden koristi se originalni iznos
}

export interface WSPayCaptureReleaseResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Capture (naplata) preautorizovane transakcije
 */
export async function captureWSPayPreAuth(
  params: WSPayCaptureReleaseParams,
  isTestMode: boolean = true
): Promise<WSPayCaptureReleaseResponse> {
  const apiUrl = isTestMode
    ? "https://formtest.wspay.biz/api/transaction"
    : "https://form.wspay.biz/api/transaction";

  const amountForHashing = params.amount
    ? formatAmountForWSPay(params.amount).replace(/[^0-9]/g, "")
    : "";

  // Signature za capture: ShopID + SecretKey + WsPayOrderId + SecretKey + ApprovalCode + SecretKey + Amount + SecretKey
  const signatureString = `${params.shopId}${params.secretKey}${params.wsPayOrderId}${params.secretKey}${params.approvalCode}${params.secretKey}${amountForHashing}${params.secretKey}`;
  const signature = createHash("sha512").update(signatureString).digest("hex");

  const requestBody: Record<string, string> = {
    ShopID: params.shopId,
    WsPayOrderId: params.wsPayOrderId,
    ApprovalCode: params.approvalCode,
    Signature: signature,
    Action: "Capture",
  };

  if (params.amount) {
    requestBody.Amount = formatAmountForWSPay(params.amount);
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(requestBody).toString(),
    });

    const responseText = await response.text();
    
    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${responseText}`,
      };
    }

    // WSPay obično vraća XML ili form-urlencoded odgovor
    // Parsiranje odgovora zavisi od WSPay API formata
    const responseParams = new URLSearchParams(responseText);
    const success = responseParams.get("Success") === "1" || responseParams.get("success") === "1";

    if (success) {
      return {
        success: true,
        message: "Capture uspešan",
      };
    } else {
      const errorMessage = responseParams.get("ErrorMessage") || responseParams.get("error") || "Nepoznata greška";
      return {
        success: false,
        error: errorMessage,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Nepoznata greška",
    };
  }
}

/**
 * Release (otpuštanje) preautorizovane transakcije
 */
export async function releaseWSPayPreAuth(
  params: WSPayCaptureReleaseParams,
  isTestMode: boolean = true
): Promise<WSPayCaptureReleaseResponse> {
  const apiUrl = isTestMode
    ? "https://formtest.wspay.biz/api/transaction"
    : "https://form.wspay.biz/api/transaction";

  // Signature za release: ShopID + SecretKey + WsPayOrderId + SecretKey + ApprovalCode + SecretKey
  const signatureString = `${params.shopId}${params.secretKey}${params.wsPayOrderId}${params.secretKey}${params.approvalCode}${params.secretKey}`;
  const signature = createHash("sha512").update(signatureString).digest("hex");

  const requestBody: Record<string, string> = {
    ShopID: params.shopId,
    WsPayOrderId: params.wsPayOrderId,
    ApprovalCode: params.approvalCode,
    Signature: signature,
    Action: "Void",
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(requestBody).toString(),
    });

    const responseText = await response.text();
    
    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${responseText}`,
      };
    }

    const responseParams = new URLSearchParams(responseText);
    const success = responseParams.get("Success") === "1" || responseParams.get("success") === "1";

    if (success) {
      return {
        success: true,
        message: "Release uspešan",
      };
    } else {
      const errorMessage = responseParams.get("ErrorMessage") || responseParams.get("error") || "Nepoznata greška";
      return {
        success: false,
        error: errorMessage,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Nepoznata greška",
    };
  }
}
