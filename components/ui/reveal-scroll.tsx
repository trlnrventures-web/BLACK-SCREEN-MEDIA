"use client";

import { useLayoutEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type ScrollRevealProps = {
  as?: "div" | "section" | "article" | "span" | "li" | "figure";
  variant?: "fade" | "scale";
  scrub?: boolean;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

// Scroll-tied reveal. "fade" = slide-up + fade (style a), "scale" = scale-in
// from 95% (style c). scrub ties the motion to scroll position; when false it
// plays once on entry. Reduced motion always settles at the final state.
export function ScrollReveal({
  as: Tag = "div",
  variant = "fade",
  scrub = false,
  delay = 0,
  className,
  style,
  children,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set(el, { autoAlpha: 1, x: 0, y: 0, scale: 1 });
      return;
    }

    const from =
      variant === "scale"
        ? { autoAlpha: 0, scale: 0.95 }
        : { autoAlpha: 0, y: 72 };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        from,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          delay,
          scrollTrigger: scrub
            ? {
                trigger: el,
                start: "top 92%",
                end: "top 55%",
                scrub: true,
              }
            : {
                trigger: el,
                start: "top 88%",
                once: true,
              },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [variant, scrub, delay]);

  return (
    <Tag ref={ref as never} className={cn(className)} style={style}>
      {children}
    </Tag>
  );
}