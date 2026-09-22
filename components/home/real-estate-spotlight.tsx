"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { reels, type Reel } from "@/lib/reels";
import { ReelThumb, ReelLightbox } from "@/components/home/reel-media";

const spotlightReels = reels.filter((reel) => reel.vertical === "real-estate").slice(0, 4);

export function RealEstateSpotlight() {
  const [active, setActive] = useState<Reel | null>(null);

  const close = useCallback(() => setActive(null), []);

  return (
    <section className="border-t border-gray-500 bg-surface/60 py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal>
              <h2 className="font-heading text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight">
                Mumbai&apos;s real estate brands trust us to{" "}
                <span className="text-gradient-brand-animated">
                  sell before the site is even built.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex items-baseline gap-3">
                <span className="font-heading text-7xl font-bold tracking-tight">
                  <span className="text-gradient-brand-animated">30+</span>
                </span>
                <span className="text-xs uppercase tracking-[0.25em] text-gray-100">
                  Real estate clients, and counting
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <Link
                href="/real-estate"
                className="group mt-10 inline-flex items-center gap-3 text-sm font-medium text-foreground transition-colors hover:text-accent"
              >
                See Real Estate Work
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {spotlightReels.map((reel) => (
                <ReelThumb
                  key={reel.slug}
                  reel={reel}
                  onOpen={() => setActive(reel)}
                  compact
                />
              ))}
            </div>
          </Reveal>
        </div>
      </Container>

      {active ? <ReelLightbox reel={active} onClose={close} /> : null}
    </section>
  );
}