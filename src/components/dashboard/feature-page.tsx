import type { OrbitFeatureItem } from "@/lib/orbitos-data";
import {
  StandalonePageHeader,
  StandalonePageShell,
} from "@/components/layout/standalone-page";

interface FeaturePageProps {
  title: string;
  subtitle: string;
  items: OrbitFeatureItem[];
}

export function FeaturePage({ title, subtitle, items }: FeaturePageProps) {
  return (
    <StandalonePageShell>
      <StandalonePageHeader title={title} subtitle={subtitle} />

      <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className="min-w-0 rounded-[28px] border border-orbit-border bg-orbit-surface p-5 transition hover:border-purple-500/40 sm:p-6"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
              <h2 className="min-w-0 break-words text-base font-semibold sm:text-lg">
                {item.title}
              </h2>
              <span className="w-fit shrink-0 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-xs text-green-300">
                {item.status}
              </span>
            </div>
            <p className="mt-3 break-words text-sm leading-relaxed text-orbit-muted">
              {item.description}
            </p>
            <p className="mt-5 text-xs uppercase tracking-wider text-orbit-accent/80">
              {item.network}
            </p>
          </article>
        ))}
      </div>
    </StandalonePageShell>
  );
}
