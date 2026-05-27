import * as Sentry from "@sentry/nextjs";

export function captureOrbitError(
  error: unknown,
  context?: Record<string, unknown>
) {
  Sentry.captureException(error, {
    extra: context,
    tags: {
      surface: "orbit-os",
    },
  });
}

export function captureOrbitMessage(
  message: string,
  context?: Record<string, unknown>
) {
  Sentry.captureMessage(message, {
    level: "info",
    extra: context,
    tags: {
      surface: "orbit-os",
    },
  });
}
