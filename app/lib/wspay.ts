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
