export const PROMO_CODE_DISCOUNT_PERCENT = 10;

export const ALLOWED_PROMO_CODES = ["barber10"];

export type ResolvedPromoCode = {
  valid: boolean;
  code: string;
  percent: number;
  originalPrice: number;
  discountedPrice: number;
  discountAmount: number;
};

export function normalizePromoCode(input: string): string {
  return input.trim().toLowerCase();
}

export function isAllowedPromoCode(input: unknown): boolean {
  if (typeof input !== "string") {
    return false;
  }

  const normalized = normalizePromoCode(input);
  if (!normalized) {
    return false;
  }

  return ALLOWED_PROMO_CODES.some(
    (code) => normalizePromoCode(code) === normalized,
  );
}

export function applyPromoDiscount(originalPrice: number): number {
  const discounted =
    originalPrice * (1 - PROMO_CODE_DISCOUNT_PERCENT / 100);
  return Math.round(discounted * 100) / 100;
}

export function resolvePromoCode(
  input: unknown,
  originalPrice: number,
): ResolvedPromoCode {
  const valid = isAllowedPromoCode(input);
  const discountedPrice = valid
    ? applyPromoDiscount(originalPrice)
    : originalPrice;
  const discountAmount = valid
    ? Math.round((originalPrice - discountedPrice) * 100) / 100
    : 0;

  return {
    valid,
    code: valid && typeof input === "string" ? normalizePromoCode(input) : "",
    percent: valid ? PROMO_CODE_DISCOUNT_PERCENT : 0,
    originalPrice,
    discountedPrice,
    discountAmount,
  };
}
