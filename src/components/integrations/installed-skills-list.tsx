import { Puzzle } from "lucide-react";

import { IntegrationStatusBadge } from "@/components/integrations/integration-status-badge";
import type { InstalledSkill } from "@/lib/integrations-data";

type InstalledSkillsListProps = {
  skills: InstalledSkill[];
};

export function InstalledSkillsList({ skills }: InstalledSkillsListProps) {
  if (skills.length === 0) {
    return (
      <p className="rounded-[24px] border border-dashed border-orbit-border px-4 py-8 text-center text-sm text-orbit-muted">
        No Aomi skills installed in this workspace.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {skills.map((skill) => (
        <li key={skill.id}>
          <article className="flex min-w-0 flex-col gap-3 rounded-[24px] border border-orbit-border bg-orbit-surface p-4 transition hover:border-purple-500/35 hover:bg-orbit-surface-strong sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex min-w-0 items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10">
                <Puzzle className="size-4 text-purple-200" />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-mono text-sm font-semibold text-orbit-foreground sm:text-base">
                    {skill.name}
                  </h3>
                  {skill.version ? (
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-orbit-muted">
                      v{skill.version}
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-orbit-muted">
                  {skill.description}
                </p>
                <p className="mt-2 font-mono text-xs text-orbit-accent/80">
                  .agents/skills/{skill.slug}
                </p>
              </div>
            </div>
            <IntegrationStatusBadge status={skill.status} />
          </article>
        </li>
      ))}
    </ul>
  );
}
