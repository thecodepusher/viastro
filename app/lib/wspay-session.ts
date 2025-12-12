const activeSessions = new Map<
  string,
  { shoppingCartId: string; expiresAt: number; reservationData?: any }
>();

const SESSION_EXPIRY_MS = 30 * 60 * 1000;

export function generateWSPaySessionId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `wspay_${timestamp}_${random}`;
}

export function createWSPaySession(
  shoppingCartId: string,
  reservationData?: any
): string {
  const sessionId = generateWSPaySessionId();
  const expiresAt = Date.now() + SESSION_EXPIRY_MS;

  activeSessions.set(sessionId, {
    shoppingCartId,
    expiresAt,
    reservationData,
  });

  cleanupExpiredSessions();

  return sessionId;
}

export function getWSPaySession(sessionId: string | null | undefined): {
  shoppingCartId: string;
  reservationData?: any;
} | null {
  if (!sessionId) {
    return null;
  }

  const session = activeSessions.get(sessionId);

  if (!session) {
    return null;
  }

  if (Date.now() > session.expiresAt) {
    activeSessions.delete(sessionId);
    return null;
  }

  return {
    shoppingCartId: session.shoppingCartId,
    reservationData: session.reservationData,
  };
}

export function invalidateWSPaySession(
  sessionId: string | null | undefined
): void {
  if (sessionId) {
    activeSessions.delete(sessionId);
  }
}

function cleanupExpiredSessions(): void {
  const now = Date.now();
  for (const [sessionId, session] of activeSessions.entries()) {
    if (now > session.expiresAt) {
      activeSessions.delete(sessionId);
    }
  }
}

export function getSessionIdFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("sessionId");
  } catch {
    return null;
  }
}
