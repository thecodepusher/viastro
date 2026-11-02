import { createHmac, timingSafeEqual } from "crypto";
import {
  createWSPayFormData,
  ensureHttpsUrl,
  getWSPayAuthorizationUrl,
} from "@/lib/wspay";

export const RENTAL_RESUME_DAYS = 7;
const RENTAL_RESUME_MS = RENTAL_RESUME_DAYS * 24 * 60 * 60 * 1000;
const COOKIE_NAME = "wspay_rental";
const DEPOSIT_COOKIE = "wspay_deposit";

const claimedRentalCarts = new Set<string>();

export type RentalResumeReservation = {
  carName: string;
  pickupName: string;
  dropOffName: string;
  pickupDateFormatted: string;
  dropOffDateFormatted: string;
  pickUpTime: string;
  dropOffTime: string;
  days: number;
  carPrice: number;
  totalPrice: number;
  originalTotalPrice?: number;
  promoCode?: string;
  promoDiscountPercent?: number;
  promoDiscountAmount?: number;
  depositeDiscount: number;
  depositAfterDiscount: number;
  carDeposit?: number;
  extrasDescriptions: string[];
  firstName: string;
  lastName: string;
  customerEmail: string;
  phone: string;
};

export type RentalResumePayload = {
  exp: number;
  cartId: string;
  lang?: string;
  depositOrderId?: string;
  depositApproval?: string;
  reservation: RentalResumeReservation;
};

function resumeSecret(): string | undefined {
  return (
    process.env.WSPAY_SECRET_KEY ||
    (typeof import.meta !== "undefined"
      ? import.meta.env?.WSPAY_SECRET_KEY
      : undefined)
  );
}

function signBody(body: string, secret: string): string {
  return createHmac("sha256", secret).update(body).digest("base64url");
}

export function snapshotReservation(reservationData: {
  carName: string;
  pickupName: string;
  dropOffName: string;
  pickupDateFormatted: string;
  dropOffDateFormatted: string;
  pickUpTime: string;
  dropOffTime: string;
  days: number;
  carPrice: number;
  totalPrice: number;
  originalTotalPrice?: number;
  promoCode?: string;
  promoDiscountPercent?: number;
  promoDiscountAmount?: number;
  depositeDiscount?: number;
  depositAfterDiscount: number;
  carDeposit?: number;
  extrasDescriptions?: string[];
  firstName: string;
  lastName: string;
  customerEmail: string;
  phone: string;
}): RentalResumeReservation {
  return {
    carName: reservationData.carName,
    pickupName: reservationData.pickupName,
    dropOffName: reservationData.dropOffName,
    pickupDateFormatted: reservationData.pickupDateFormatted,
    dropOffDateFormatted: reservationData.dropOffDateFormatted,
    pickUpTime: reservationData.pickUpTime,
    dropOffTime: reservationData.dropOffTime,
    days: reservationData.days,
    carPrice: reservationData.carPrice,
    totalPrice: reservationData.totalPrice,
    originalTotalPrice: reservationData.originalTotalPrice,
    promoCode: reservationData.promoCode,
    promoDiscountPercent: reservationData.promoDiscountPercent,
    promoDiscountAmount: reservationData.promoDiscountAmount,
    depositeDiscount: reservationData.depositeDiscount || 0,
    depositAfterDiscount: reservationData.depositAfterDiscount,
    carDeposit: reservationData.carDeposit,
    extrasDescriptions: reservationData.extrasDescriptions || [],
    firstName: reservationData.firstName,
    lastName: reservationData.lastName,
    customerEmail: reservationData.customerEmail,
    phone: reservationData.phone,
  };
}

export function createRentalResumeToken(
  payload: RentalResumePayload,
): string | null {
  const secret = resumeSecret();
  if (!secret) return null;
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${signBody(body, secret)}`;
}

export function verifyRentalResumeToken(
  token: string | null | undefined,
): RentalResumePayload | null {
  const secret = resumeSecret();
  if (!secret || !token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [body, signature] = parts;
  const expected = signBody(body, secret);
  const actualBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expected);
  if (
    actualBuf.length !== expectedBuf.length ||
    !timingSafeEqual(actualBuf, expectedBuf)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8"),
    ) as RentalResumePayload;
    if (!payload || typeof payload.cartId !== "string" || !payload.cartId) {
      return null;
    }
    if (typeof payload.exp !== "number" || payload.exp < Date.now()) {
      return null;
    }
    if (
      !payload.reservation ||
      typeof payload.reservation.totalPrice !== "number" ||
      typeof payload.reservation.customerEmail !== "string"
    ) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function rentalResumeExpiry(now = Date.now()): number {
  return now + RENTAL_RESUME_MS;
}

export function reservationFromResume(payload: RentalResumePayload) {
  return {
    ...payload.reservation,
    needsTotalPayment: true,
    isTotalPayment: true,
    depositAmount: payload.reservation.depositAfterDiscount,
    depositPreAuth: {
      wsPayOrderId: payload.depositOrderId,
      approvalCode: payload.depositApproval,
    },
  };
}

function cookieHeader(name: string, value: string, maxAge: number): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${name}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

export function resumeCookieHeader(token: string): string {
  const maxAge = RENTAL_RESUME_DAYS * 24 * 60 * 60;
  return cookieHeader(COOKIE_NAME, encodeURIComponent(token), maxAge);
}

export function clearResumeCookieHeader(): string {
  return cookieHeader(COOKIE_NAME, "", 0);
}

export function depositCookieHeader(token: string): string {
  const maxAge = RENTAL_RESUME_DAYS * 24 * 60 * 60;
  return cookieHeader(DEPOSIT_COOKIE, encodeURIComponent(token), maxAge);
}

export function clearDepositCookieHeader(): string {
  return cookieHeader(DEPOSIT_COOKIE, "", 0);
}

function readNamedCookie(request: Request, name: string): string | null {
  const raw = request.headers.get("Cookie");
  if (!raw) return null;
  for (const part of raw.split(";")) {
    const trimmed = part.trim();
    if (!trimmed.startsWith(`${name}=`)) continue;
    try {
      return decodeURIComponent(trimmed.slice(name.length + 1));
    } catch {
      return null;
    }
  }
  return null;
}

export function readResumeTokenFromRequest(request: Request): string | null {
  return readNamedCookie(request, COOKIE_NAME);
}

export function matchDepositReservation(request: Request, cartId: string) {
  const payload = verifyRentalResumeToken(
    readNamedCookie(request, DEPOSIT_COOKIE),
  );
  if (!payload || payload.cartId !== cartId) return null;
  return {
    ...payload.reservation,
    lang: payload.lang,
    needsTotalPayment: true,
    isTotalPayment: false,
    depositAmount: payload.reservation.depositAfterDiscount,
  };
}

export function matchResumeReservation(request: Request, cartId: string) {
  const payload = verifyRentalResumeToken(readResumeTokenFromRequest(request));
  if (!payload || payload.cartId !== cartId) return null;
  return reservationFromResume(payload);
}

export function claimRentalCart(cartId: string): boolean {
  if (!cartId || claimedRentalCarts.has(cartId)) return false;
  claimedRentalCarts.add(cartId);
  return true;
}

export function wspayCredentials(): { shopId?: string; secretKey?: string } {
  return {
    shopId:
      process.env.WSPAY_SHOP_ID ||
      (typeof import.meta !== "undefined"
        ? import.meta.env?.WSPAY_SHOP_ID
        : undefined),
    secretKey: resumeSecret(),
  };
}

export function isWSPayTestMode(): boolean {
  const testModeEnv =
    process.env.WSPAY_TEST_MODE ||
    (typeof import.meta !== "undefined"
      ? import.meta.env?.WSPAY_TEST_MODE
      : undefined);
  return testModeEnv !== "false";
}

export function buildRentalSaleForm(options: {
  shopId: string;
  secretKey: string;
  cartId: string;
  totalPriceEur: number;
  langCode: string;
  baseUrl: string;
  sessionId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}) {
  const isTestMode = isWSPayTestMode();
  const successPath = `/${options.langCode}/wspay/success?sessionId=${options.sessionId}`;
  const errorPath = `/${options.langCode}/wspay/error?sessionId=${options.sessionId}`;
  const cancelPath = `/${options.langCode}/wspay/cancel?sessionId=${options.sessionId}`;
  const totalAmount =
    options.totalPriceEur * Number(process.env.WSPAY_EURO_EXCHANGE_RATE || 1);

  return {
    url: getWSPayAuthorizationUrl(isTestMode),
    formData: createWSPayFormData({
      shopId: options.shopId,
      secretKey: options.secretKey,
      shoppingCartId: options.cartId,
      totalAmount,
      returnUrl: ensureHttpsUrl(`${options.baseUrl}${successPath}`, isTestMode),
      returnErrorUrl: ensureHttpsUrl(
        `${options.baseUrl}${errorPath}`,
        isTestMode,
      ),
      cancelUrl: ensureHttpsUrl(`${options.baseUrl}${cancelPath}`, isTestMode),
      customerFirstName: options.firstName,
      customerLastName: options.lastName,
      customerEmail: options.email,
      customerPhone: options.phone,
      lang: options.langCode.toUpperCase(),
      returnMethod: "GET",
      authorizationType: "Sale",
    }),
  };
}
