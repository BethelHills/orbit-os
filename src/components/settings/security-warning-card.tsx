import { ShieldAlert } from "lucide-react";

export function SecurityWarningCard() {
  return (
    <article className="relative overflow-hidden rounded-[28px] border border-red-500/30 bg-red-500/[0.06] p-5 sm:p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-red-500/15 blur-3xl"
      />

      <div className="relative flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-red-500/35 bg-red-500/10">
          <ShieldAlert className="size-5 text-red-300" />
        </span>
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.16em] text-red-300/90">
            Security notice
          </p>
          <h2 className="mt-1 text-lg font-semibold text-orbit-foreground">
            Real transactions spend real funds
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-red-100/80">
            OrbitOS and Aomi can stage wallet requests that move assets on Base.
            Always simulate multi-step batches, review calldata, and confirm in
            your wallet before signing. OrbitOS never custodies keys — you control
            every broadcast.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-red-100/70">
            <li>· Keep manual confirmation enabled for production wallets.</li>
            <li>· Verify protocol, network, and recipient before signing.</li>
            <li>· Never paste private keys or seed phrases into Agent Chat.</li>
          </ul>
        </div>
      </div>
    </article>
  );
}
