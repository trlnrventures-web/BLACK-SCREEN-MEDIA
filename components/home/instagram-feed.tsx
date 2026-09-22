import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { reels } from "@/lib/reels";
import { siteConfig } from "@/lib/site";

export function InstagramFeed() {
  const instagram = siteConfig.socials[0]?.href ?? "https://www.instagram.com";

  return (
    <section className="border-t border-gray-500 bg-surface/60 py-24 sm:py-32">
      <Container>
        <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-heading text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight">
              From the <span className="text-gradient-brand-animated">feed.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-100">
              Reels, reveals, and the work between campaigns. Everything that
              reaches our feed first.
            </p>
          </div>
          <Link
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 text-sm text-gray-100 transition-colors hover:text-accent"
          >
            Follow on Instagram
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {reels.map((reel) => (
              <a
                key={reel.slug}
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${reel.title} on Instagram`}
                className="group relative block aspect-square overflow-hidden rounded-xl border border-gray-500 bg-surface"
                data-cursor
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-70 transition-transform duration-700 group-hover:scale-105"
                  style={{ background: reel.cover }}
                />
                <div
                  aria-hidden="true"
                  className="grain absolute inset-0 opacity-[0.12] mix-blend-overlay"
                />
                <svg
                  aria-hidden="true"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="absolute right-4 top-4 text-foreground/80"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.4" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
                </svg>
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent p-4 pt-14">
                  <span className="block font-heading text-sm font-bold tracking-tight transition-colors group-hover:text-accent">
                    {reel.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-gray-100">{reel.tag}</span>
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}