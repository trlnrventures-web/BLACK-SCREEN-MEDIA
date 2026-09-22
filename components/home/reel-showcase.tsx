"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { reels, type Reel } from "@/lib/reels";
import { ReelThumb, ReelLightbox, ReelAutoplay } from "@/components/home/reel-media";

export function ReelShowcase() {
  const [active, setActive] = useState<Reel | null>(null);

  const close = useCallback(() => setActive(null), []);

  return (
    <section className="border-t border-gray-500 bg-surface/60 py-24 sm:py-32">
      <Container>
        <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="font-heading text-[clamp(1.875rem,3.5vw,3rem)] font-bold leading-[1.08] tracking-tight">
            Recent work, in motion
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 text-sm text-gray-100 transition-colors hover:text-accent"
          >
            Get reels like these
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <ReelAutoplay>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-3">
              {reels.map((reel, index) => (
                <Reveal key={reel.slug} delay={(index % 3) * 0.1}>
                  <ReelThumb reel={reel} onOpen={() => setActive(reel)} />
                </Reveal>
              ))}
            </div>
          </ReelAutoplay>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-8 text-xs uppercase tracking-[0.25em] text-gray-300">
            Preview reels. Muted autoplay on view, click to play full screen
          </p>
        </Reveal>
      </Container>

      {active ? <ReelLightbox reel={active} onClose={close} /> : null}
    </section>
  );
}