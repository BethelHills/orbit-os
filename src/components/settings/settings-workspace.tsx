"use client";

import Link from "next/link";
import { ArrowUpRight, RotateCcw } from "lucide-react";

import {
  StandalonePageHeader,
  StandalonePageShell,
} from "@/components/layout/standalone-page";
import { AgentBehaviorPresets } from "@/components/settings/agent-behavior-presets";
import { BackendUrlDisplay } from "@/components/settings/backend-url-display";
import { ByokReminderCard } from "@/components/settings/byok-reminder-card";
import { NetworkSettingsPanel } from "@/components/settings/network-settings-panel";
import { NotificationPreferencesPanel } from "@/components/settings/notification-preferences-panel";
import { SafetySettingsPanel } from "@/components/settings/safety-settings-panel";
import { SecurityWarningCard } from "@/components/settings/security-warning-card";
import { ThemeSettingsPanel } from "@/components/settings/theme-settings-panel";
import { WalletSettingsPanel } from "@/components/settings/wallet-settings-panel";
import { useSettingsControlCenter } from "@/hooks/use-settings-control-center";
import { buildAgentChatUrl } from "@/lib/agent-chat-url";
import {
  SETTINGS_DEFAULT_PROMPT,
  summarizeSettingsForDisplay,
} from "@/lib/settings-data";

export function SettingsWorkspace() {
  const {
    state,
    meta,
    setSafetyMode,
    setManualConfirmation,
    setSimulateBeforeSign,
    setAgentPreset,
    setNotification,
    resetToDefaults,
  } = useSettingsControlCenter();

  const summary = summarizeSettingsForDisplay(state);

  return (
    <StandalonePageShell>
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-purple-600/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-28 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl"
        />

        <StandalonePageHeader
          title="AI Control Center"
          subtitle="Control safety, wallet behavior, agent presets, network, backend routing, and UI preferences — local UI state only, no secrets stored."
        />

        <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-200">
              {meta.source} state
            </span>
            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">
              {meta.networkName} · {meta.chainId}
            </span>
            <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs capitalize text-purple-200">
              {state.agentPreset} agent
            </span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
              {state.manualConfirmation ? "Confirm on" : "Confirm off"}
            </span>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={resetToDefaults}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-orbit-border bg-orbit-surface px-5 py-2.5 text-sm font-medium text-orbit-foreground transition hover:border-purple-500/40 hover:bg-orbit-surface-strong"
            >
              Reset defaults
              <RotateCcw className="size-4 opacity-80" />
            </button>
            <Link
              href={buildAgentChatUrl(SETTINGS_DEFAULT_PROMPT)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-500"
            >
              Explain my current OrbitOS settings
              <ArrowUpRight className="size-4 opacity-80" />
            </Link>
          </div>
        </div>

        <p className="mb-8 rounded-2xl border border-orbit-border bg-orbit-surface/80 px-4 py-3 text-sm text-orbit-muted sm:mb-10">
          Current snapshot: {summary}
        </p>

        <div className="relative space-y-8 sm:space-y-10">
          <SecurityWarningCard />

          <section className="grid min-w-0 gap-6 xl:grid-cols-2 xl:gap-8">
            <SafetySettingsPanel
              state={state}
              onSafetyModeChange={setSafetyMode}
              onManualConfirmationChange={setManualConfirmation}
              onSimulateBeforeSignChange={setSimulateBeforeSign}
            />
            <AgentBehaviorPresets
              value={state.agentPreset}
              onChange={setAgentPreset}
            />
          </section>

          <section className="grid min-w-0 gap-6 lg:grid-cols-2 xl:grid-cols-3 xl:gap-8">
            <NetworkSettingsPanel meta={meta} />
            <WalletSettingsPanel />
            <BackendUrlDisplay meta={meta} />
          </section>

          <section className="grid min-w-0 gap-6 lg:grid-cols-2 xl:gap-8">
            <ThemeSettingsPanel />
            <NotificationPreferencesPanel
              notifications={state.notifications}
              onNotificationChange={setNotification}
            />
          </section>

          <ByokReminderCard meta={meta} />
        </div>
      </div>
    </StandalonePageShell>
  );
}
