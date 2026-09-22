"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";

const heroLines = ["A campaign is built", "in the dark."];

const heroServices = [
  "REAL ESTATE",
  "D2C",
  "BRANDING",
  "CONTENT",
  "PERFORMANCE ADS",
];

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set("[data-hero-line], [data-hero-fade], [data-hero-glow]", {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-line]",
        { yPercent: 112, autoAlpha: 0, filter: "blur(8px)" },
        {
          yPercent: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power4.out",
          stagger: 0.15,
          delay: 0.1,
        },
      );

      gsap.fromTo(
        "[data-hero-fade]",
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.9,
        },
      );

      gsap.fromTo(
        "[data-hero-glow]",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1.6, ease: "power2.out", delay: 0.4 },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const glow = cursorGlowRef.current;
    if (!root || !glow) return;

    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const xTo = gsap.quickTo(glow, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(glow, "y", { duration: 0.6, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      xTo(event.clientX - rect.left - 160);
      yTo(event.clientY - rect.top - 160);
    };

    root.addEventListener("pointermove", onMove, { passive: true });
    return () => root.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section
      ref={rootRef}
      data-cursor
      className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-[#0A0A0A] sm:min-h-[calc(100svh-5rem)]"
    >
      <div
        aria-hidden="true"
        data-hero-glow
        className="pointer-events-none absolute inset-0 opacity-0"
      >
        <div className="orb-drift-slow absolute bottom-[-18rem] right-[-14rem] h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle_at_center,#C10801_0%,#F16001_38%,#D9C3AB_68%,transparent_100%)] opacity-[0.16] blur-[120px]" />
        <div className="orb-drift-slower absolute left-[-12rem] top-[-10rem] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle_at_center,#C10801_0%,#F16001_55%,transparent_100%)] opacity-[0.13] blur-[100px]" />
        <div className="orb-drift absolute right-[18%] top-[40%] h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle_at_center,#D9C3AB_0%,transparent_100%)] opacity-[0.1] blur-[90px]" />
        <div className="grain absolute inset-0 opacity-[0.04] mix-blend-overlay" />
      </div>

      <div
        aria-hidden="true"
        ref={cursorGlowRef}
        className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(232,80,2,0.16)_0%,transparent_65%)] blur-[80px] mix-blend-screen"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-20 sm:px-8">
        <p
          data-hero-fade
          className="mb-8 text-xs font-medium uppercase tracking-[0.35em] text-gray-100"
        >
          Creative & Marketing Agency
        </p>

        <h1 className="max-w-5xl font-heading text-[clamp(3.5rem,8vw,8rem)] font-bold uppercase leading-[0.95] tracking-tight xl:max-w-[70%]">
          {heroLines.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <span
                data-hero-line
                className="block will-change-transform"
              >
                {line}
              </span>
            </span>
          ))}
          <span
            className="block overflow-hidden pb-[0.08em] -mb-[0.08em]"
            style={{ filter: "drop-shadow(0 0 22px rgba(232, 80, 2, 0.22))" }}
          >
            <span
              data-hero-line
              className="block text-gradient-brand-sweep will-change-transform"
            >
              Before It&apos;s Seen.
            </span>
          </span>
          <span
            className="block overflow-hidden pb-[0.08em] -mb-[0.08em]"
            style={{ filter: "drop-shadow(0 0 22px rgba(232, 80, 2, 0.22))" }}
          >
            <span
              data-hero-line
              className="block text-gradient-brand-sweep will-change-transform"
            >
              It wins.
            </span>
          </span>
        </h1>

        <div
          data-hero-fade
          className="mt-12 flex max-w-2xl items-center gap-4"
        >
          <span aria-hidden="true" className="h-px flex-1 bg-brand-gradient" />
          <p className="text-base leading-relaxed text-gray-100 sm:text-lg">
            Black Screen Media is the creative-to-CRM partner behind 30+ real
            estate launches and brands built from zero.
          </p>
        </div>

        <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="/contact" size="lg" data-cursor>
            Start a Project
          </Button>
          <Button href="/work" variant="ghost" size="lg" data-cursor>
            See Our Work
          </Button>
        </div>
      </div>

      <div className="border-y border-gray-500 py-4">
        <Marquee items={heroServices} size="sm" duration={22} />
      </div>
    </section>
  );
}