"use client";

const CONTROL_SESSION_PREFIX = "control:";
export const AOMI_CLIENT_ID_STORAGE_KEY = "aomi_client_id";

export function getControlSessionId(
  clientId: string | null | undefined,
  fallbackSessionId?: string,
): string | undefined {
  const trimmedClientId = clientId?.trim();
  if (trimmedClientId) {
    return `${CONTROL_SESSION_PREFIX}${trimmedClientId}`;
  }
  const trimmedFallback = fallbackSessionId?.trim();
  return trimmedFallback || undefined;
}

export function readStoredAomiClientId(): string | undefined {
  try {
    const stored = globalThis.localStorage?.getItem(AOMI_CLIENT_ID_STORAGE_KEY);
    if (stored && stored.trim().length > 0) {
      return stored.trim();
    }
  } catch {
    // localStorage unavailable (SSR / privacy mode)
  }
  return undefined;
}

export function resolveRuntimeControlSessionId(
  clientId?: string | null,
  threadId?: string,
): string | undefined {
  return getControlSessionId(clientId ?? readStoredAomiClientId(), threadId);
}
