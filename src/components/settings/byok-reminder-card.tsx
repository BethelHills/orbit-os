import { KeyRound } from "lucide-react";

import type { SettingsMeta } from "@/lib/settings-data";

type ByokReminderCardProps = {
  meta: SettingsMeta;
};

export function ByokReminderCard({ meta }: ByokReminderCardProps) {
  return (
    <article className="rounded-[28px] border border-dashed border-orbit-border bg-orbit-surface/60 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10">
          <KeyRound className="size-4 text-amber-200" />
        </span>
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.16em] text-orbit-accent">
            BYOK
          </p>
          <h2 className="mt-1 text-lg font-semibold">OpenRouter reminder</h2>
          <p className="mt-2 text-sm leading-relaxed text-orbit-muted">
            Bring your own OpenRouter API key for model routing. OrbitOS does not
            collect or persist secrets in this settings UI — configure keys in your
            deployment or local environment only.
          </p>
          <p className="mt-3 text-sm text-orbit-muted">
            Status:{" "}
            <span className="font-medium text-amber-200">
              {meta.openRouterConfigured ? "Configured" : "Not configured"}
            </span>
          </p>
        </div>
      </div>
    </article>
  );
}
