"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

const GlobeScene = dynamic(
  () => import("@/components/globe/globe-scene").then((m) => m.GlobeScene),
  { ssr: false }
);

export type NetworkNode = {
  name: string;
  count: string;
  side: "left" | "right";
  top: string;
  left?: string;
  right?: string;
  mobileTop: string;
  mobileLeft?: string;
  mobileRight?: string;
};

interface NetworkMapOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nodes: NetworkNode[];
}

export function NetworkMapOverlay({
  open,
  onOpenChange,
  nodes,
}: NetworkMapOverlayProps) {
  const mounted = useMounted();
  const isMobile = useMediaQuery("(max-width: 767px)");

  if (!mounted) return null;

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="flex h-[min(92dvh,820px)] flex-col gap-0 rounded-t-[28px] border-orbit-border bg-orbit-shell p-0 text-orbit-foreground"
        >
          <SheetHeader className="shrink-0 border-b border-orbit-subtle px-4 pb-4 pt-5">
            <SheetTitle className="text-left text-lg font-semibold">
              Aomi Network Map
            </SheetTitle>
            <SheetDescription className="text-left text-sm text-orbit-muted">
              Live protocol connections across Base and agent workflows
            </SheetDescription>
          </SheetHeader>
          <NetworkMapBody nodes={nodes} expanded />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex h-[min(85vh,760px)] max-h-[85vh] w-[min(96vw,960px)] max-w-[96vw] flex-col gap-0 overflow-hidden border-orbit-border bg-orbit-shell p-0 text-orbit-foreground sm:max-w-[960px]"
      >
        <DialogHeader className="shrink-0 border-b border-orbit-subtle px-5 pb-4 pt-5">
          <div className="flex items-start justify-between gap-3 pr-8">
            <div>
              <DialogTitle className="text-left text-xl font-semibold">
                Aomi Network Map
              </DialogTitle>
              <DialogDescription className="text-left text-sm text-orbit-muted">
                Live protocol connections across Base and agent workflows
              </DialogDescription>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 inline-flex min-h-10 min-w-10 touch-manipulation items-center justify-center rounded-lg border border-orbit-subtle bg-orbit-surface text-orbit-muted transition hover:text-orbit-foreground"
              aria-label="Close network map"
            >
              <X size={18} />
            </button>
          </div>
        </DialogHeader>
        <NetworkMapBody nodes={nodes} expanded />
      </DialogContent>
    </Dialog>
  );
}

function NetworkMapBody({
  nodes,
  expanded = false,
}: {
  nodes: NetworkNode[];
  expanded?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  const isWide = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width > 0 && height > 0) {
        setDims({ w: Math.round(width), h: Math.round(height) });
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [expanded, isWide]);

  return (
    <div
      className={cn(
        "min-h-0 flex-1 overflow-y-auto",
        isWide ? "grid grid-cols-[minmax(0,1fr)_280px] gap-0" : "flex flex-col"
      )}
    >
      <div
        ref={containerRef}
        className={cn(
          "relative min-w-0 touch-none bg-orbit-page",
          isWide ? "min-h-[420px] h-full" : "h-[min(42dvh,320px)] shrink-0"
        )}
      >
        {dims ? (
          <GlobeScene
            width={dims.w}
            height={dims.h}
            globeOffset={isWide ? [60, 0] : [0, 0]}
          />
        ) : null}

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.18),transparent_40%)]" />

        {isWide
          ? nodes.map((node) => <OverlayNode key={node.name} {...node} />)
          : null}
      </div>

      <aside
        className={cn(
          "border-orbit-subtle bg-orbit-surface/50 p-4 sm:p-5",
          isWide ? "overflow-y-auto border-l" : "border-t"
        )}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orbit-accent">
          Connected Protocols
        </p>
        <ul className="mt-3 space-y-2">
          {nodes.map((node) => (
            <li key={node.name}>
              <div className="rounded-xl border border-orbit-border bg-orbit-surface-strong px-3 py-3 sm:px-4">
                <p className="text-sm font-semibold text-orbit-foreground">
                  {node.name}
                </p>
                <p className="mt-1 break-words text-xs leading-relaxed text-orbit-muted sm:text-sm">
                  {node.count}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

function OverlayNode({
  name,
  count,
  side,
  top,
  left,
  right,
}: NetworkNode) {
  return (
    <div
      className="pointer-events-none absolute z-20"
      style={{ top, left, right }}
    >
      <div className="relative">
        <div
          className={cn(
            "absolute top-1/2 h-px bg-gradient-to-r",
            side === "left"
              ? "right-full w-20 from-transparent to-fuchsia-500"
              : "left-full w-20 from-fuchsia-500 to-transparent"
          )}
        />
        <div className="rounded-xl border border-violet-500/25 bg-black/60 px-3 py-2 backdrop-blur-xl sm:px-4 sm:py-3">
          <h4 className="text-[10px] font-bold text-white sm:text-xs">{name}</h4>
          <p className="mt-0.5 max-w-[9rem] break-words text-[9px] text-violet-300 sm:max-w-[11rem] sm:text-[10px]">
            {count}
          </p>
        </div>
      </div>
    </div>
  );
}

export function NetworkNodeStrip({ nodes }: { nodes: NetworkNode[] }) {
  return (
    <div className="-mx-1 mt-3 overflow-x-auto px-1 pb-1 lg:hidden">
      <div className="flex w-max min-w-full gap-2 sm:gap-3">
        {nodes.map((node) => (
          <div
            key={node.name}
            className="min-w-[132px] max-w-[180px] shrink-0 rounded-xl border border-orbit-border bg-orbit-surface-strong px-3 py-2.5 sm:min-w-[148px] sm:px-4 sm:py-3"
          >
            <p className="truncate text-[10px] font-bold tracking-wide text-orbit-accent sm:text-xs">
              {node.name}
            </p>
            <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-orbit-muted sm:text-[11px]">
              {node.count}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
