import { Cloud } from "lucide-react";

import type { SettingsMeta } from "@/lib/settings-data";

type BackendUrlDisplayProps = {
  meta: SettingsMeta;
};

export function BackendUrlDisplay({ meta }: BackendUrlDisplayProps) {
  return (
    <article className="rounded-[28px] border border-orbit-border bg-orbit-surface-strong p-5 sm:p-6">
      <p className="text-xs uppercase tracking-[0.16em] text-orbit-accent">
        Runtime
      </p>
      <h2 className="mt-1 text-lg font-semibold">Aomi backend URL</h2>
      <p className="mt-2 text-sm text-orbit-muted">
        Public runtime endpoint for Agent Chat — no API keys stored in OrbitOS UI.
      </p>

      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-purple-500/25 bg-purple-500/[0.06] px-4 py-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10">
          <Cloud className="size-4 text-purple-200" />
        </span>
        <div className="min-w-0">
          <p className="break-all font-mono text-sm text-purple-200">
            {meta.backendUrl}
          </p>
          <p className="mt-2 text-sm text-orbit-muted">
            Set via <span className="font-mono text-xs">NEXT_PUBLIC_BACKEND_URL</span> in
            your deployment environment.
          </p>
        </div>
      </div>
    </article>
  );
}
