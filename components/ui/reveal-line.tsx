"use client";

import { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type LineRevealProps = {
  as?: "h1" | "h2" | "h3" | "p" | "div";
  lines: string[];
  gradient?: boolean;
  blur?: boolean;
  stagger?: number;
  className?: string;
  children?: ReactNode;
};

// Split-text line reveal (style b): each line is masked and slides up into
// place with an optional blur-to-sharp pass. Starts when scrolled into view.
export function LineReveal({
  as: Tag = "h2",
  lines,
  gradient = false,
  blur = false,
  stagger = 0.12,
  className,
}: LineRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set("[data-line-inner]", { autoAlpha: 1, yPercent: 0, filter: "blur(0px)" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-line-inner]",
        { yPercent: 118, autoAlpha: 0, ...(blur ? { filter: "blur(10px)" } : {}) },
        {
          yPercent: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power4.out",
          stagger,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [blur, stagger]);

  return (
    <Tag ref={ref as never} className={cn("font-heading font-bold tracking-tight", className)}>
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <span
            data-line-inner
            className={cn(
              "block will-change-transform",
              gradient ? "text-gradient-brand-animated" : "",
            )}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}