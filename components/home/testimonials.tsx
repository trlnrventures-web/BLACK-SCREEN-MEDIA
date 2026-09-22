"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { Container } from "@/components/ui/container";
import { testimonials } from "@/lib/content";

export function TestimonialStage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (reduced) {
      gsap.set(root, { autoAlpha: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 85%", once: true },
        },
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    if (reduced || total <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, 9000);
    return () => window.clearInterval(timer);
  }, [reduced, total]);

  const goTo = useCallback(
    (direction: -1 | 1) => {
      setIndex((current) => {
        const next = current + direction;
        if (next < 0) return total - 1;
        if (next >= total) return 0;
        return next;
      });
    },
    [total],
  );

  return (
    <section className="overflow-x-clip border-y border-gray-500 bg-background py-24 sm:py-32">
      <Container>
        <div ref={rootRef}>
          <div className="flex min-h-[240px] items-center sm:min-h-[280px]">
            {testimonials.map((item, itemIndex) => (
              <figure
                key={item.name}
                aria-hidden={itemIndex !== index}
                className={itemIndex === index ? "block" : "hidden"}
              >
                <blockquote className="max-w-4xl font-heading text-[clamp(1.5rem,4vw,3.5rem)] font-bold leading-snug tracking-tight">
                  <span aria-hidden="true" className="text-accent">
                    “
                  </span>
                  {item.quote}
                  <span aria-hidden="true" className="text-accent">
                    ”
                  </span>
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-500 font-heading text-xs font-bold uppercase tracking-[0.15em]"
                  >
                    {item.name.slice(0, 2)}
                  </span>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em]">
                      {item.name}
                    </p>
                    <p className="mt-0.5 text-xs uppercase tracking-[0.25em] text-gray-100">
                      {item.role}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-gray-500 pt-6">
            <div className="flex items-center gap-2">
              {testimonials.map((item, dotIndex) => (
                <span
                  key={item.name}
                  aria-hidden="true"
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    dotIndex === index ? "w-8 bg-brand-gradient" : "w-3 bg-gray-500"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              {([-1, 1] as const).map((direction) => (
                <button
                  key={direction}
                  type="button"
                  onClick={() => goTo(direction)}
                  disabled={total <= 1}
                  aria-label={
                    direction === -1 ? "Previous testimonial" : "Next testimonial"
                  }
                  data-cursor
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-500 text-foreground transition-all duration-300 hover:border-accent hover:bg-accent hover:text-background disabled:opacity-40"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    {direction === -1 ? (
                      <path d="M10.5 4.5L6 9l4.5 4.5" stroke="currentColor" strokeWidth="1.2" />
                    ) : (
                      <path d="M7.5 4.5L12 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.2" />
                    )}
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-8 text-xs uppercase tracking-[0.25em] text-gray-300">
            Placeholder quote, approved client testimonial pending
          </p>
        </div>
      </Container>
    </section>
  );
}