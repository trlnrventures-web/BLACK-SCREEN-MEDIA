import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Work with Black Screen Media. Right now there are no open roles, but we're always happy to see great work. Send yours to hello@blackscreenmedia.in.",
  alternates: { canonical: "/careers" },
};

const openRoles: { title: string; type: string; description: string }[] = [];

export default function CareersPage() {
  return (
    <div className="flex-1">
      <section className="border-b border-gray-500 py-20 sm:py-28">
        <Container className="max-w-3xl">
          <Reveal>
            <Heading as="h1" size="xl" split>
              Work with us
            </Heading>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xl leading-relaxed text-gray-100">
              We&apos;re a small team doing craft-first work for real estate
              developers and D2C brands. Strategy, creative, content, and
              performance under one roof.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="max-w-3xl">
          {openRoles.length > 0 ? (
            <div className="divide-y divide-gray-500 border-y border-gray-500">
              {openRoles.map((role, index) => (
                <Reveal key={role.title} delay={index * 0.08}>
                  <div className="group flex flex-col justify-between gap-2 py-8 sm:flex-row sm:items-start">
                    <div>
                      <h2 className="font-heading text-2xl font-bold tracking-tight">
                        {role.title}
                      </h2>
                      <p className="mt-1 text-xs font-medium uppercase tracking-[0.25em] text-accent">
                        {role.type}
                      </p>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-100">
                        {role.description}
                      </p>
                    </div>
                    <a
                      className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-gray-500 px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
                      href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(
                        `Application: ${role.title}`,
                      )}`}
                      data-cursor
                    >
                      Apply by email
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path
                          d="M4 12L12 4M12 4H5.5M12 4v6.5"
                          stroke="currentColor"
                          strokeWidth="1.2"
                        />
                      </svg>
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="rounded-xl border border-gray-500 bg-surface/60 p-8 sm:p-10">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
                  No open positions right now
                </p>
                <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight">
                  Good work never goes unnoticed here
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-100">
                  Vibe fits and standout portfolios get remembered. If you do
                  strategy, creative, content, or growth work you&apos;re proud of,
                  send it over. We&apos;ll keep it on file for the next opening.
                </p>
                <a
                  href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(
                    "Portfolio, Black Screen Media",
                  )}`}
                  data-cursor
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-4 text-sm font-medium uppercase tracking-widest text-background transition-opacity hover:opacity-90"
                >
                  Email your portfolio
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M4 12L12 4M12 4H5.5M12 4v6.5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                  </svg>
                </a>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.15}>
            <div className="mt-12">
              <p className="text-sm text-gray-300">
                Direct for anything else:{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-gray-100 underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  {siteConfig.email}
                </a>
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}