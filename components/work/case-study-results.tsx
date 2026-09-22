"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import type { CaseStudyResult } from "@/lib/case-studies";

type CaseStudyResultsProps = {
  results: CaseStudyResult[];
};

export function CaseStudyResults({ results }: CaseStudyResultsProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.utils.toArray<HTMLElement>("[data-result-value]").forEach((el) => {
        el.textContent = `${Number(el.dataset.value)}${el.dataset.suffix ?? ""}`;
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-result-value]").forEach((el) => {
        const target = Number(el.dataset.value);
        const decimals = Number(el.dataset.decimals ?? 0);
        const suffix = el.dataset.suffix ?? "";
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = `${counter.value.toFixed(decimals)}${suffix}`;
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <div className="grid gap-y-10 sm:grid-cols-3 sm:gap-8">
        {results.map((result) => (
          <div key={result.label}>
            <p className="font-heading text-5xl font-bold tracking-tight sm:text-6xl">
              <span
                data-result-value
                data-value={result.value}
                data-suffix={result.suffix}
                data-decimals={result.decimals ?? 0}
              >
                0
              </span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-100">
              {result.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}