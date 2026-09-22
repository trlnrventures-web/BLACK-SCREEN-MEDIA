import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { WorkCard } from "@/components/work/work-card";
import { RealEstateForm } from "@/components/contact/real-estate-form";
import { LeadPopup } from "@/components/lead/lead-popup";
import { getAllCaseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Real Estate Marketing for Developers",
  description:
    "Real estate lead generation, project marketing, and CRM support for Mumbai & Vasai-Virar developers. 30+ clients. Get a free project audit.",
  alternates: { canonical: "/real-estate" },
  openGraph: {
    title: "Real Estate Marketing for Developers | Black Screen Media",
    description:
      "Project marketing, leads, and sales support for Mumbai & Vasai-Virar developers. 30+ real estate clients.",
  },
};

export const dynamic = "force-dynamic";

const reServices = [
  {
    title: "Project marketing content & reels",
    body: "Property walkthroughs, launch reels, and site stories planned on a cadence that keeps inventory top-of-mind.",
  },
  {
    title: "Lead generation campaigns",
    body: "Meta campaigns and landing pages aimed at buyers, priced per enquiry, not per impression.",
  },
  {
    title: "CRM & sales-closing support",
    body: "Leads tagged, routed, and followed up on WhatsApp and calls — scripts, cadence, and reports with your team.",
  },
  {
    title: "Hoardings & event enablement",
    body: "Positioning, creative, and collaterals that make your on-ground presence match your digital spend.",
  },
];

export default async function RealEstatePage() {
  const all = await getAllCaseStudies();
  const studies = all.filter((study) => study.industry === "Real Estate");
  const featuredStudies = studies.filter((study) => study.featured);
  const spotlight = featuredStudies.slice(0, 2);

  return (
    <div className="flex-1">
      <section className="relative overflow-hidden border-b border-gray-500 py-24 sm:py-32">
        <div
          aria-hidden="true"
          className="gradient-mesh-gloom pointer-events-none absolute inset-0 opacity-70"
        />
        <Container className="relative">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
              For real estate developers · Mumbai & Vasai-Virar
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading as="h1" size="hero" split className="mt-5 max-w-4xl">
              Sell projects before they&apos;re built.
            </Heading>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-gray-100">
              You&apos;re not short of buyers. You&apos;re short of a system
              that keeps warm enquiries in front of your sales team every day.
              We run that loop for 30+ developers: reels that stop the scroll,
              campaigns that cost per enquiry, and follow-up that closes.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { value: "30+", label: "Real estate clients" },
                { value: "3 yr", label: "Retained partnership" },
                { value: "365", label: "Days/year of leads" },
                { value: "Multi", label: "Projects sold on content alone" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-gray-500 bg-surface/60 p-6"
                >
                  <span className="font-heading text-4xl font-bold tracking-tight">
                    <span className="text-gradient-brand-animated">{stat.value}</span>
                  </span>
                  <p className="mt-2 text-xs uppercase tracking-[0.25em] text-gray-100">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
              Proof from the field
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading as="h2" size="lg" split className="mt-5">
              Two developers, two different wins.
            </Heading>
          </Reveal>

          <div className="mt-12 grid gap-x-8 gap-y-14 lg:grid-cols-2">
            {spotlight.map((study, index) => (
              <Reveal key={study.slug} delay={index * 0.15}>
                <WorkCard study={study} index={String(index + 1).padStart(2, "0")} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-gray-500 bg-surface/40 py-20 sm:py-28">
        <Container>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
              What we run for you
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading as="h2" size="xl" split className="mt-5">
              One partner, the full loop.
            </Heading>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {reServices.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.1} className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-xl border border-gray-500 bg-surface p-8">
                  <span className="font-heading text-xs font-bold tracking-[0.25em] text-gray-100">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-xl font-bold leading-snug tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-100">
                    {service.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-5 lg:items-start">
          <div className="lg:col-span-2">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
                Get a free project audit
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Heading as="h2" size="lg" split className="mt-5">
                Tell us about the project.
              </Heading>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-base leading-relaxed text-gray-100">
                Two pages max: what&apos;s selling, what isn&apos;t, and where
                the leaks are. You get it within one business day — whether we
                work together or not.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.25} className="lg:col-span-3">
            <RealEstateForm />
          </Reveal>
        </Container>
      </section>

      <LeadPopup />
    </div>
  );
}