"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          clearProps: "opacity,visibility,transform",
        },
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
