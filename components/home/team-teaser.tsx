import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const teams = [
  { initials: "ST", name: "Strategy" },
  { initials: "CC", name: "Creative & Content" },
  { initials: "PA", name: "Performance & Ads" },
  { initials: "CS", name: "Client Success" },
];

export function TeamTeaser() {
  return (
    <section className="border-t border-gray-500 bg-surface/50 py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <h2 className="font-heading text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight">
                10+ people,{" "}
                <span className="text-gradient-brand-animated">
                  one outcome: results.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-100">
                Four working cells: strategy, creative and content, performance
                and ads, and client success. One shared mandate: the work wins
                before it&apos;s seen.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              Meet the team
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-14">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {teams.map((member) => (
              <div
                key={member.name}
                className="group relative overflow-hidden rounded-xl border border-gray-500 bg-gradient-to-br from-[var(--bsm-gradient-mid)] to-[var(--bsm-gradient-start)] p-6"
              >
                <div className="grain absolute inset-0 opacity-[0.12] mix-blend-overlay" />
                <span className="relative block font-heading text-6xl font-bold uppercase tracking-[0.12em] text-background/45 transition-colors duration-300 group-hover:text-background/70">
                  {member.initials}
                </span>
                <p className="relative mt-8 font-heading text-sm font-bold uppercase tracking-[0.15em] text-background/80">
                  {member.name}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}