"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Container } from "@/components/ui/container";
import { processSteps } from "@/lib/content";

export function HowWeWork() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set("[data-process-line], [data-process-step]", {
        strokeDashoffset: 0,
        autoAlpha: 1,
        y: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-process-line]",
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            end: "center 60%",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        "[data-process-step]",
        { autoAlpha: 0, y: 40, scale: 0.95 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: root,
            start: "top 65%",
            once: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="overflow-hidden py-24 sm:py-32">
      <Container>
        <h2 className="font-heading text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight">
          How a project{" "}
          <span className="text-gradient-brand-animated">actually happens.</span>
        </h2>

        <div className="mt-16">
          <svg
            aria-hidden="true"
            className="mx-auto hidden w-full max-w-5xl lg:block"
            viewBox="0 0 1024 8"
            preserveAspectRatio="none"
          >
            <path
              d="M0 4 H1024"
              stroke="var(--bsm-gray-500)"
              strokeWidth="1"
              fill="none"
            />
            <path
              data-process-line
              d="M0 4 H1024"
              stroke="url(#processGradient)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="1000"
              className="will-change-transform"
            />
            <defs>
              <linearGradient id="processGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--bsm-gradient-start)" />
                <stop offset="55%" stopColor="var(--bsm-gradient-mid)" />
                <stop offset="100%" stopColor="var(--bsm-gradient-end)" />
              </linearGradient>
            </defs>
          </svg>

          <ol className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((step, index) => (
              <li key={step.title} data-process-step className="relative">
                <span className="text-outline font-heading text-7xl font-bold tracking-tight sm:text-8xl">
                  {step.number}
                </span>
                <h3 className="mt-6 font-heading text-2xl font-bold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-100">
                  {step.description}
                </p>
                {index < processSteps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-12 h-px w-full -translate-y-1/2 bg-gray-500 lg:hidden"
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}