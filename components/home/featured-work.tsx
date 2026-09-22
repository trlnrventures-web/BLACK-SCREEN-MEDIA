import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { WorkCard } from "@/components/work/work-card";
import { getFeaturedWorks } from "@/lib/case-studies";

const punchLines: Record<string, string> = {
  "mansarovar-group": "3 years. 2 projects. Leads that keep closing.",
  "stallions-reels": "Reels that sold real estate. No ad spend needed.",
  "akmas-perfumes": "Zero to ₹50L in 9 months. Now launching in the UK.",
};

export async function FeaturedWork() {
  const works = await getFeaturedWorks();

  const big = works.find((study) => study.slug === "mansarovar-group");
  const stack = works.filter((study) => study.slug !== "mansarovar-group");

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="max-w-2xl font-heading text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight">
            We don&apos;t guess.{" "}
            <span className="text-gradient-brand-animated">We&apos;ve done this.</span>
          </h2>
          <Link
            href="/work"
            className="group inline-flex items-center gap-3 text-sm text-gray-100 transition-colors hover:text-accent"
          >
            View All Work
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {big ? (
            <Reveal className="lg:col-span-3">
              <div className="group relative">
                <WorkCard study={big} index="01" />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center px-6"
                >
                  <span className="rounded-full border border-gray-500 bg-background/80 px-5 py-2 text-sm font-medium text-foreground opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
                    {punchLines[big.slug]}
                  </span>
                </span>
              </div>
            </Reveal>
          ) : null}

          <div className="flex flex-col gap-8 lg:col-span-2">
            {stack.map((study, index) => (
              <Reveal key={study.slug} delay={(index + 1) * 0.12} className="flex-1">
                <div className="group relative">
                  <WorkCard
                    study={study}
                    index={String(index + 2).padStart(2, "0")}
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center px-6"
                  >
                    <span className="rounded-full border border-gray-500 bg-background/80 px-5 py-2 text-sm font-medium text-foreground opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
                      {punchLines[study.slug]}
                    </span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}