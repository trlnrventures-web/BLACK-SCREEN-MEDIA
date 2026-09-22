"use client";

import { useLayoutEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type RevealProps = {
  as?: "div" | "section" | "article" | "span" | "li" | "figure";
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  style,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set(el, { autoAlpha: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return (
    <Tag ref={ref as never} className={cn(className)} style={style}>
      {children}
    </Tag>
  );
}