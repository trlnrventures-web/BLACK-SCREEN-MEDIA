import Link from "next/link";
import type { CaseStudy } from "@/lib/case-studies";
import { getWorkClientInitials } from "@/lib/case-studies";

type WorkCardProps = {
  study: CaseStudy;
  index?: string;
};

export function WorkCard({ study, index }: WorkCardProps) {
  return (
    <Link href={`/work/${study.slug}`} className="group block" data-cursor>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-gray-500 bg-surface">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-brand-gradient-animated opacity-40 transition-transform duration-700 group-hover:scale-105"
          style={study.cover ? { background: study.cover } : undefined}
        />
        <div
          aria-hidden="true"
          className="grain absolute inset-0 opacity-[0.12] mix-blend-overlay"
        />
        {index ? (
          <span className="absolute left-4 top-4 font-heading text-xs font-bold tracking-[0.2em] text-foreground/70">
            {index}
          </span>
        ) : null}
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="font-heading text-5xl font-bold uppercase tracking-[0.15em] text-background/40">
            {getWorkClientInitials(study.client)}
          </span>
        </span>
      </div>

      <div className="mt-6 flex items-baseline justify-between gap-4">
        <h3 className="font-heading text-2xl font-bold tracking-tight transition-colors duration-300 group-hover:text-accent">
          {study.client}
        </h3>
        <span className="text-xs uppercase tracking-[0.25em] text-gray-100">
          {study.industry}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-gray-100">
        {study.summary}
      </p>
    </Link>
  );
}