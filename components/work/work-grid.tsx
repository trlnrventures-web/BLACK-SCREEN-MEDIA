import { Reveal } from "@/components/ui/reveal";
import { WorkCard } from "@/components/work/work-card";
import type { CaseStudy } from "@/lib/case-studies";

type WorkGridProps = {
  studies: CaseStudy[];
};

export function WorkGrid({ studies }: WorkGridProps) {
  if (studies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-500 px-6 py-24 text-center">
        <p className="font-heading text-2xl font-bold tracking-tight">
          No work matches those filters
        </p>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-100">
          Try clearing a filter to see everything across services and
          industries.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
      {studies.map((study, index) => (
        <Reveal key={study.slug} delay={(index % 2) * 0.15}>
          <WorkCard
            study={study}
            index={String(index + 1).padStart(2, "0")}
          />
        </Reveal>
      ))}
    </div>
  );
}