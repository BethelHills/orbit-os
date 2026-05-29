"use client";

import {
  getControlSessionId,
  readStoredAomiClientId,
} from "./runtime-session";

const SESSION_HEADER = "X-Session-Id";

function requestUrl(input: RequestInfo | URL): string {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.href;
  return input.url;
}

function needsRuntimeSessionHeader(url: string): boolean {
  return (
    url.includes("/api/settings/account") || url.includes("/api/sessions")
  );
}

function fallbackSessionId(): string {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }
  return `session-${Date.now()}`;
}

/**
 * Ensures account/thread bootstrap requests always carry a non-empty
 * X-Session-Id header (required by api.aomi.dev — missing header → 400).
 */
export function createAomiClientFetch(
  baseFetch: typeof fetch = globalThis.fetch.bind(globalThis),
): typeof fetch {
  return async (input, init) => {
    const url = requestUrl(input);
    if (!needsRuntimeSessionHeader(url)) {
      return baseFetch(input, init);
    }

    const headers = new Headers(init?.headers);
    const existing = headers.get(SESSION_HEADER)?.trim();
    if (!existing) {
      const sessionId =
        getControlSessionId(readStoredAomiClientId()) ?? fallbackSessionId();
      headers.set(SESSION_HEADER, sessionId);
    }

    return baseFetch(input, { ...init, headers });
  };
}
