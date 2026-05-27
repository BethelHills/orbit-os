import type { BrowserOptions, EdgeOptions, NodeOptions } from "@sentry/nextjs";

function readSentryDsn() {
  const dsn =
    process.env.NEXT_PUBLIC_SENTRY_DSN?.trim() ||
    process.env.SENTRY_DSN?.trim() ||
    "";

  return dsn.length > 0 ? dsn : undefined;
}

export const sentryDsn = readSentryDsn();

export const isSentryEnabled = Boolean(sentryDsn);

const tracesSampleRate =
  process.env.NODE_ENV === "production" ? 0.1 : 1.0;

export const baseSentryOptions = {
  dsn: sentryDsn,
  enabled: isSentryEnabled,
  environment: process.env.NODE_ENV ?? "development",
  sendDefaultPii: false,
  tracesSampleRate,
  enableLogs: true,
} satisfies Partial<NodeOptions & BrowserOptions & EdgeOptions>;
