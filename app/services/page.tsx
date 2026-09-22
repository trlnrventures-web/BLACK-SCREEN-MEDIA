import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ServicesGrid } from "@/components/work/services-grid";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website design, branding & packaging, content, social, influencer, performance marketing, and real estate lead generation from Black Screen Media.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div className="flex-1">
      <section className="border-b border-gray-500 py-24 sm:py-32">
        <Container>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
              01&ndash;07, One Standard
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading
              as="h1"
              size="xl"
              split
              className="mt-5 uppercase tracking-[0.02em]"
            >
              Services
            </Heading>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-100">
              Seven practices, one standard. Every engagement starts before it&apos;s
              seen, with strategy, research, and restraint.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="overflow-hidden py-20 sm:py-28">
        <Container>
          <ServicesGrid />
        </Container>
      </section>

      <section className="border-t border-gray-500 py-20 sm:py-28">
        <Container className="flex max-w-3xl flex-col items-start sm:items-center sm:text-center">
          <Reveal>
            <Heading as="h2" size="lg" split>
              Not sure where to start?
            </Heading>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-100">
              Tell us the problem before anyone else sees it. We&apos;ll map it to
              the right practice.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10">
              <Button href="/contact" size="lg" data-cursor>
                Talk to us
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}