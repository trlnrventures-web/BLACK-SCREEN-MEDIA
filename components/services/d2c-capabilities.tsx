import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const proofPoints = [
  {
    index: "01",
    title: "Brand & packaging system",
    body: "Identity, bottle and box system, and unboxing moments designed end to end — built to work on shelf and in a feed.",
  },
  {
    index: "02",
    title: "Meta ads engine",
    body: "Campaigns structured around sampling and repeat purchase. Weekly creative and audience iteration, spend moved to what converts.",
  },
  {
    index: "03",
    title: "0 to ₹50L in 9 months",
    body: "New fragrance brand, zero audience, no provenance. In 9 months it crossed ₹50L in sales off Meta-driven order volume.",
  },
  {
    index: "04",
    title: "Export-ready",
    body: "One system shipped into two markets — India and the UK — without breaking the identity or the costs.",
  },
];

export function D2cCapabilities() {
  return (
    <section className="border-t border-gray-500 bg-surface/40 py-20 sm:py-28">
      <Container>
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
            D2C Capabilities — proven on Akmas Perfumes
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 max-w-2xl font-heading text-[clamp(1.875rem,3.5vw,3rem)] font-bold leading-[1.08] tracking-tight">
            Taking a D2C brand from nothing to{" "}
            <span className="text-gradient-brand-animated">₹50L in 9 months.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-gray-500 bg-gray-500 sm:grid-cols-2">
          {proofPoints.map((point, index) => (
            <Reveal key={point.index} delay={(index % 2) * 0.15} className="h-full">
              <div className="flex h-full flex-col gap-4 bg-surface p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-heading text-xs font-bold tracking-[0.25em] text-gray-100">
                    {point.index}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-gray-500"
                  />
                </div>
                <h3 className="font-heading text-xl font-bold leading-snug tracking-tight">
                  {point.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-100">
                  {point.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <Link
            href="/work/akmas-perfumes"
            data-cursor
            className="group mt-10 inline-flex items-center gap-3 text-sm font-medium text-foreground transition-colors hover:text-accent"
          >
            Read the Akmas Perfumes case study
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}