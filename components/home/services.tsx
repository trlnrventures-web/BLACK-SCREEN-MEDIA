import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ServicesGrid } from "@/components/work/services-grid";

export function Services() {
  return (
    <section className="border-t border-gray-500 bg-surface/60 py-24 sm:py-32">
      <Container>
        <Reveal>
          <h2 className="max-w-3xl font-heading text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight">
            One team.{" "}
            <span className="text-gradient-brand-animated">Every touchpoint.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-lg text-gray-100">
            From the first frame to the closed deal.
          </p>
        </Reveal>

        <div className="mt-14">
          <ServicesGrid />
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl border border-gray-500 bg-surface p-8 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
                Real estate developers
              </p>
              <p className="mt-3 max-w-lg font-heading text-2xl font-bold leading-snug tracking-tight">
                Built to sell real estate before it&apos;s built.
              </p>
            </div>
            <Link
              href="/real-estate"
              data-cursor
              className="group inline-flex shrink-0 items-center gap-3 rounded-full border border-gray-300 px-7 py-3.5 text-sm font-medium uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Real Estate Landing
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}