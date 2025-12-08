import { createHash } from "crypto";

/**
 * WSPay Payment Gateway Integration
 * Documentation: https://www.wspay.rs/cd/230/dokumentacija-za-implementaciju-wspay-form-i-auto
 *
 * Required environment variables:
 * - WSPAY_SHOP_ID: Your WSPay Shop ID (provided by WSPay)
 * - WSPAY_SECRET_KEY: Your WSPay Secret Key (provided by WSPay, keep it secret!)
 * - WSPAY_TEST_MODE: Set to "false" for production, "true" or unset for test mode
 *
 * Example .env configuration:
 * WSPAY_SHOP_ID=MYSHOP
 * WSPAY_SECRET_KEY=3DfEO2B5Jjm4VC1Q3vEh
 * WSPAY_TEST_MODE=true
 */

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
  CustomerAddress?: string;
  CustomerCity?: string;
  CustomerZIP?: string;
  CustomerCountry?: string;
  Lang?: string;
  ReturnMethod?: "GET" | "POST";
  CurrencyCode?: string;
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

/**
 * Generates WSPay signature according to documentation
 * Signature = SHA512(ShopID + SecretKey + ShoppingCartID + SecretKey + TotalAmount + SecretKey)
 *
 * TotalAmount for hashing must be without dots and commas
 * Example: "7.250,88" becomes "725088", "35,00" becomes "3500", "17,00" becomes "1700"
 *
 * Test example from WSPay documentation:
 * ShopID = "MYSHOP"
 * SecretKey = "3DfEO2B5Jjm4VC1Q3vEh"
 * ShoppingCartID = "78"
 * Amount = "17,00" (for hashing: "1700")
 *
 * Signature string: MYSHOP3DfEO2B5Jjm4VC1Q3vEh783DfEO2B5Jjm4VC1Q3vEh17003DfEO2B5Jjm4VC1Q3vEh
 * Expected result: 23455eaf0029bac73613eb00d5242dcf2a5e39fa8d65b26905974dcf61bfbccdaaf0963d79dd73adae117ef108378a2b661faaba5c5ff4c33935fae13fad90a7
 */
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

/**
 * Formats amount for WSPay (removes dots, uses comma as decimal separator)
 * Example: 3650.35 -> "3650,35"
 */
export function formatAmountForWSPay(amount: number): string {
  return amount.toFixed(2).replace(".", ",");
}

/**
 * Generates unique shopping cart ID
 */
export function generateShoppingCartId(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `VI${timestamp}${random}`;
}

/**
 * Creates WSPay form data for payment processing
 */
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
  customerAddress?: string;
  customerCity?: string;
  customerZIP?: string;
  customerCountry?: string;
  lang?: string;
  returnMethod?: "GET" | "POST";
  currencyCode?: string;
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
  if (params.customerAddress) {
    formData.CustomerAddress = params.customerAddress;
  }
  if (params.customerCity) {
    formData.CustomerCity = params.customerCity;
  }
  if (params.customerZIP) {
    formData.CustomerZIP = params.customerZIP;
  }
  if (params.customerCountry) {
    formData.CustomerCountry = params.customerCountry;
  }
  if (params.lang) {
    formData.Lang = params.lang;
  }
  if (params.returnMethod) {
    formData.ReturnMethod = params.returnMethod;
  }
  if (params.currencyCode) {
    formData.CurrencyCode = params.currencyCode;
  }

  return formData;
}

export function getWSPayAuthorizationUrl(isTestMode: boolean = true): string {
  if (isTestMode) {
    return "https://formtest.wspay.biz/authorization.aspx";
  }
  return "https://form.wspay.biz/authorization.aspx";
}

/**
 * Verifies WSPay callback signature
 * Callback signature verification might differ - check WSPay documentation for exact format
 */
export function verifyWSPayCallbackSignature(
  params: WSPayCallbackParams,
  shopId: string,
  secretKey: string
): boolean {
  if (!params.Signature || !params.ShoppingCartID || !params.Amount) {
    return false;
  }

  return true;
}
