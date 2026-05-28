import type { OrbitFeatureItem } from "@/lib/orbitos-data";

interface FeaturePageProps {
  title: string;
  subtitle: string;
  items: OrbitFeatureItem[];
}

export function FeaturePage({ title, subtitle, items }: FeaturePageProps) {
  return (
    <main className="min-h-screen bg-[#050510] p-4 text-white md:p-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-300">OrbitOS</p>
          <h1 className="mt-3 text-4xl font-bold">{title}</h1>
          <p className="mt-4 max-w-2xl text-slate-400">{subtitle}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-[28px] border border-purple-500/20 bg-white/[0.03] p-6 transition hover:border-purple-500/40"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <span className="shrink-0 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-xs text-green-300">
                  {item.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.description}</p>
              <p className="mt-5 text-xs uppercase tracking-wider text-purple-300/80">
                {item.network}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
