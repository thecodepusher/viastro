import { en } from "@/locales/en";
import { ru } from "@/locales/ru";
import { sr } from "@/locales/sr";
import type { BaseLocale } from "@/locales/base-locale";
import { sendCustomerRentalDueEmail } from "@/lib/email";
import { publicPaths } from "@/lib/paths";
import { getBaseUrl } from "@/lib/seo";
import {
  RENTAL_RESUME_DAYS,
  readResumeTokenFromRequest,
  verifyRentalResumeToken,
} from "@/lib/wspay-resume";

const NOTIFIED_COOKIE = "wspay_rental_mail";
const REMINDER_DELAY_MS = 3 * 60 * 1000;
const remindedCarts = new Set<string>();
const reminderTimers = new Map<string, ReturnType<typeof setTimeout>>();

export function pickLang(
  ...candidates: (string | undefined | null)[]
): "sr" | "en" | "ru" {
  for (const candidate of candidates) {
    const value = candidate?.toLowerCase().trim();
    if (value === "en" || value === "ru" || value === "sr") return value;
  }
  return "sr";
}

function localeFor(lang: string | undefined): BaseLocale {
  const code = pickLang(lang);
  if (code === "en") return en;
  if (code === "ru") return ru;
  return sr;
}

function langFromPath(pathname: string): string {
  const segment = pathname.split("/").filter(Boolean)[0];
  if (segment === "en" || segment === "ru" || segment === "sr") return segment;
  return "sr";
}

function shouldRemindOnPath(pathname: string): boolean {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (/\/wspay\/(redirect|success|nastavi)$/.test(path)) return false;
  if (/\/uspesno$/.test(path)) return false;
  return true;
}

function notifiedCart(request: Request): string | null {
  const raw = request.headers.get("Cookie");
  if (!raw) return null;
  for (const part of raw.split(";")) {
    const trimmed = part.trim();
    if (!trimmed.startsWith(`${NOTIFIED_COOKIE}=`)) continue;
    try {
      return decodeURIComponent(trimmed.slice(NOTIFIED_COOKIE.length + 1));
    } catch {
      return null;
    }
  }
  return null;
}

function notifiedCookie(cartId: string): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  const maxAge = RENTAL_RESUME_DAYS * 24 * 60 * 60;
  return `${NOTIFIED_COOKIE}=${encodeURIComponent(cartId)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

function rentalDuePayload(
  reservation: {
    carName: string;
    pickupName: string;
    pickupDateFormatted: string;
    pickUpTime: string;
    dropOffName: string;
    dropOffDateFormatted: string;
    dropOffTime: string;
    days: number;
    carPrice: number;
    totalPrice: number;
    originalTotalPrice?: number;
    promoCode?: string;
    promoDiscountPercent?: number;
    promoDiscountAmount?: number;
    carDeposit?: number;
    depositeDiscount: number;
    depositAfterDiscount: number;
    extrasDescriptions?: string[];
    firstName: string;
    lastName: string;
    customerEmail: string;
    phone: string;
  },
  baseUrl: string,
) {
  return {
    carName: reservation.carName,
    pickupSummary: `${reservation.pickupName} ${reservation.pickupDateFormatted} - ${reservation.pickUpTime}`,
    dropoffSummary: `${reservation.dropOffName} ${reservation.dropOffDateFormatted} - ${reservation.dropOffTime}`,
    days: reservation.days,
    carPrice: reservation.carPrice,
    totalPrice: reservation.totalPrice,
    originalTotalPrice: reservation.originalTotalPrice,
    promoCode: reservation.promoCode,
    promoDiscountPercent: reservation.promoDiscountPercent,
    promoDiscountAmount: reservation.promoDiscountAmount,
    carDeposit:
      reservation.carDeposit ||
      reservation.depositAfterDiscount + reservation.depositeDiscount,
    depositDiscount: reservation.depositeDiscount,
    depositDue: reservation.depositAfterDiscount,
    extrasDescriptions: reservation.extrasDescriptions || [],
    customerName: `${reservation.firstName} ${reservation.lastName}`,
    customerEmail: reservation.customerEmail,
    customerPhone: reservation.phone,
    baseUrl,
  };
}

async function deliverRentalReminder(options: {
  cartId: string;
  token: string;
  langCode: string;
  baseUrl: string;
  reservation: Parameters<typeof rentalDuePayload>[0];
}) {
  if (remindedCarts.has(options.cartId)) return false;
  remindedCarts.add(options.cartId);
  const timer = reminderTimers.get(options.cartId);
  if (timer) clearTimeout(timer);
  reminderTimers.delete(options.cartId);

  try {
    const langCode = pickLang(
      verifyRentalResumeToken(options.token)?.lang,
      options.langCode,
    );
    const payUrl = `${options.baseUrl}${publicPaths.wspay.resume(langCode)}?t=${encodeURIComponent(options.token)}`;
    await sendCustomerRentalDueEmail(
      rentalDuePayload(options.reservation, options.baseUrl),
      localeFor(langCode),
      payUrl,
    );
    return true;
  } catch (error) {
    remindedCarts.delete(options.cartId);
    console.error("Failed to send rental payment link email:", error);
    return false;
  }
}

export function scheduleRentalReminder(options: {
  cartId: string;
  token: string;
  langCode: string;
  baseUrl: string;
  reservation: Parameters<typeof rentalDuePayload>[0];
  delayMs?: number;
}) {
  if (remindedCarts.has(options.cartId)) return;
  const existing = reminderTimers.get(options.cartId);
  if (existing) clearTimeout(existing);

  const timer = setTimeout(() => {
    reminderTimers.delete(options.cartId);
    void deliverRentalReminder(options);
  }, options.delayMs ?? REMINDER_DELAY_MS);
  reminderTimers.set(options.cartId, timer);
}

export function cancelRentalReminder(cartId: string) {
  const timer = reminderTimers.get(cartId);
  if (timer) clearTimeout(timer);
  reminderTimers.delete(cartId);
  if (cartId) remindedCarts.add(cartId);
}

export async function maybeRemindRentalPayment(
  request: Request,
): Promise<string | null> {
  const url = new URL(request.url);
  if (!shouldRemindOnPath(url.pathname)) return null;

  const token = readResumeTokenFromRequest(request);
  const payload = verifyRentalResumeToken(token);
  if (!payload || !token) return null;
  if (notifiedCart(request) === payload.cartId) return null;

  const sent = await deliverRentalReminder({
    cartId: payload.cartId,
    token,
    langCode: pickLang(payload.lang, langFromPath(url.pathname)),
    baseUrl: getBaseUrl(request),
    reservation: payload.reservation,
  });
  return sent ? notifiedCookie(payload.cartId) : null;
}
