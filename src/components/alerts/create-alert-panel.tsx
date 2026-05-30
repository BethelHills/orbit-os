"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Plus } from "lucide-react";

import { buildAgentChatUrl } from "@/lib/agent-chat-url";
import {
  ALERT_TYPE_LABELS,
  ALERT_TYPE_OPTIONS,
  buildCreateAlertPrompt,
  type AlertSeverity,
  type AlertType,
} from "@/lib/alerts-data";
import { cn } from "@/lib/utils";

const SEVERITY_OPTIONS: AlertSeverity[] = ["low", "medium", "high"];

export function CreateAlertPanel() {
  const router = useRouter();
  const [type, setType] = useState<AlertType>("price_movement");
  const [severity, setSeverity] = useState<AlertSeverity>("medium");
  const [target, setTarget] = useState("MOONJOY");
  const [condition, setCondition] = useState("Price crosses 0.5 ETH");

  const previewPrompt = buildCreateAlertPrompt({ type, target, condition });

  function handleStage() {
    router.push(buildAgentChatUrl(previewPrompt));
  }

  return (
    <aside className="relative overflow-hidden rounded-[28px] border border-purple-500/25 glass p-5 sm:p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-purple-500/15 blur-3xl"
      />

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.16em] text-orbit-accent">
          Create alert
        </p>
        <h2 className="mt-2 text-lg font-semibold text-orbit-foreground">
          New watch rule
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-orbit-muted">
          Configure a rule locally, then stage it with Aomi in Agent Chat. Live
          persistence will connect here later.
        </p>

        <form
          className="mt-5 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            handleStage();
          }}
        >
          <label className="block space-y-1.5">
            <span className="text-xs text-orbit-muted">Alert type</span>
            <select
              value={type}
              onChange={(event) => setType(event.target.value as AlertType)}
              className="min-h-11 w-full rounded-xl border border-orbit-border bg-orbit-surface-strong px-3 text-sm text-orbit-foreground outline-none focus:border-purple-500/50"
            >
              {ALERT_TYPE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {ALERT_TYPE_LABELS[option]}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs text-orbit-muted">Severity</span>
            <div className="flex flex-wrap gap-2">
              {SEVERITY_OPTIONS.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSeverity(level)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs capitalize transition",
                    severity === level
                      ? "border-purple-500/50 bg-purple-500/15 text-purple-100"
                      : "border-orbit-border bg-orbit-surface text-orbit-muted hover:border-purple-500/30",
                  )}
                >
                  {level}
                </button>
              ))}
            </div>
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs text-orbit-muted">Target</span>
            <input
              value={target}
              onChange={(event) => setTarget(event.target.value)}
              placeholder="Coin symbol or wallet"
              className="min-h-11 w-full rounded-xl border border-orbit-border bg-orbit-surface-strong px-3 text-sm text-orbit-foreground outline-none placeholder:text-orbit-muted/70 focus:border-purple-500/50"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs text-orbit-muted">Condition</span>
            <textarea
              value={condition}
              onChange={(event) => setCondition(event.target.value)}
              rows={3}
              placeholder="Describe the trigger threshold"
              className="w-full resize-none rounded-xl border border-orbit-border bg-orbit-surface-strong px-3 py-2.5 text-sm text-orbit-foreground outline-none placeholder:text-orbit-muted/70 focus:border-purple-500/50"
            />
          </label>

          <div className="rounded-xl border border-orbit-subtle bg-orbit-surface-strong p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-orbit-muted">
              Aomi prompt preview
            </p>
            <p className="mt-2 text-sm leading-relaxed text-orbit-muted">
              {previewPrompt}
            </p>
          </div>

          <button
            type="submit"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-purple-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-purple-500"
          >
            <Plus className="size-4" />
            Stage with Aomi
          </button>
        </form>

        <Link
          href={buildAgentChatUrl(
            "List all alert types I can configure for Zora on Base.",
          )}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 text-sm text-orbit-accent hover:text-purple-200"
        >
          Browse alert templates
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </aside>
  );
}
