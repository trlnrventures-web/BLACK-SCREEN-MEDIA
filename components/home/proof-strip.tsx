"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Container } from "@/components/ui/container";
import { stats } from "@/lib/content";

export function ProofStrip() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set("[data-stat]", { autoAlpha: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-stat]",
        { autoAlpha: 0, y: 48 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: root, start: "top 88%", once: true },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-stat-value]").forEach((el) => {
        const target = Number(el.dataset.value);
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.value)}`;
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="border-y border-gray-500 bg-background py-20 sm:py-24">
      <Container>
        <dl className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} data-stat>
              <dd className="flex items-baseline font-heading text-6xl font-bold tracking-tight sm:text-7xl">
                {stat.prefix ? (
                  <span className="text-gradient-brand-animated">{stat.prefix}</span>
                ) : null}
                <span data-stat-value data-value={stat.value}>
                  0
                </span>
                {stat.suffix ? <span>{stat.suffix}</span> : null}
              </dd>
              <dt className="mt-3 text-xs font-medium uppercase tracking-[0.25em] text-gray-100">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}