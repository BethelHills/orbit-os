"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { buildAgentChatUrl } from "@/lib/agent-chat-url";
import type { ProtocolUniverseCard } from "@/lib/protocols-data";
import { cn } from "@/lib/utils";

const ACCENT_STYLES = {
  purple: {
    glow: "group-hover:shadow-[0_0_44px_rgba(168,85,247,0.16)]",
    orb: "bg-purple-500/15 group-hover:bg-purple-500/25",
    badge: "border-purple-500/35 bg-purple-500/10 text-purple-200",
    ring: "ring-purple-500/20",
  },
  cyan: {
    glow: "group-hover:shadow-[0_0_44px_rgba(34,211,238,0.14)]",
    orb: "bg-cyan-500/12 group-hover:bg-cyan-500/20",
    badge: "border-cyan-500/35 bg-cyan-500/10 text-cyan-200",
    ring: "ring-cyan-500/20",
  },
  blue: {
    glow: "group-hover:shadow-[0_0_44px_rgba(59,130,246,0.14)]",
    orb: "bg-blue-500/12 group-hover:bg-blue-500/20",
    badge: "border-blue-500/35 bg-blue-500/10 text-blue-200",
    ring: "ring-blue-500/20",
  },
  green: {
    glow: "group-hover:shadow-[0_0_44px_rgba(16,185,129,0.14)]",
    orb: "bg-emerald-500/12 group-hover:bg-emerald-500/20",
    badge: "border-emerald-500/35 bg-emerald-500/10 text-emerald-200",
    ring: "ring-emerald-500/20",
  },
  amber: {
    glow: "group-hover:shadow-[0_0_44px_rgba(245,158,11,0.14)]",
    orb: "bg-amber-500/12 group-hover:bg-amber-500/20",
    badge: "border-amber-500/35 bg-amber-500/10 text-amber-200",
    ring: "ring-amber-500/20",
  },
  violet: {
    glow: "group-hover:shadow-[0_0_44px_rgba(139,92,246,0.16)]",
    orb: "bg-violet-500/15 group-hover:bg-violet-500/25",
    badge: "border-violet-500/35 bg-violet-500/10 text-violet-200",
    ring: "ring-violet-500/20",
  },
} as const;

const STATUS_STYLES = {
  Active: "border-emerald-500/35 bg-emerald-500/10 text-emerald-300",
  Ready: "border-sky-500/35 bg-sky-500/10 text-sky-300",
  Bridge: "border-amber-500/35 bg-amber-500/10 text-amber-300",
  Preview: "border-violet-500/35 bg-violet-500/10 text-violet-300",
} as const;

type ProtocolCardProps = {
  protocol: ProtocolUniverseCard;
};

export function ProtocolCard({ protocol }: ProtocolCardProps) {
  const accent = ACCENT_STYLES[protocol.accent];
  const agentChatHref = buildAgentChatUrl(protocol.agentChatPrompt);

  return (
    <article
      className={cn(
        "group relative flex min-h-full min-w-0 flex-col overflow-hidden rounded-[28px] border border-orbit-border glass transition duration-300",
        "hover:border-purple-500/40 hover:bg-orbit-surface-strong",
        accent.glow,
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full blur-3xl transition",
          accent.orb,
        )}
      />

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-orbit-subtle bg-orbit-surface-strong ring-1",
              accent.ring,
            )}
          >
            {protocol.logoPath ? (
              <Image
                src={protocol.logoPath}
                alt=""
                width={56}
                height={56}
                className="size-full object-cover"
              />
            ) : (
              <span className="text-lg font-bold text-orbit-foreground">
                {protocol.name.slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-semibold text-orbit-foreground">
                {protocol.name}
              </h2>
              <span
                className={cn(
                  "rounded-full border px-2 py-0.5 text-xs font-medium",
                  STATUS_STYLES[protocol.status],
                )}
              >
                {protocol.status}
              </span>
            </div>
            <p
              className={cn(
                "mt-1 inline-flex rounded-full border px-2.5 py-0.5 text-xs",
                accent.badge,
              )}
            >
              {protocol.category}
            </p>
          </div>
        </div>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-orbit-muted">
          {protocol.description}
        </p>

        <div className="mt-5 space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-orbit-muted">
            <span className="rounded-full border border-orbit-subtle bg-orbit-surface px-2.5 py-1">
              {protocol.network}
            </span>
          </div>

          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-orbit-accent">
              <Sparkles className="size-3.5" />
              Aomi actions
            </p>
            <ul className="flex flex-wrap gap-2">
              {protocol.actions.map((action) => (
                <li
                  key={action}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-orbit-muted"
                >
                  {action}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Link
            href={agentChatHref}
            className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-2xl bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-500"
          >
            Ask in Agent Chat
            <ArrowUpRight className="size-4 opacity-80" />
          </Link>
          <Link
            href="/trade-actions"
            className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-2xl border border-orbit-border bg-orbit-surface px-4 py-2 text-sm font-medium text-orbit-foreground transition hover:border-purple-500/40 hover:bg-orbit-surface-strong"
          >
            Trade / Actions
            <ArrowUpRight className="size-4 opacity-80" />
          </Link>
        </div>
      </div>
    </article>
  );
}
