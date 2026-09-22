import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { WorkGrid } from "@/components/work/work-grid";
import { getAllCaseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Real Estate",
  description:
    "Content, campaigns, and lead generation for 30+ real estate developers across Mumbai and Vasai-Virar.",
  alternates: { canonical: "/real-estate" },
};

export const dynamic = "force-dynamic";

export default async function RealEstatePage() {
  const studies = (await getAllCaseStudies()).filter(
    (study) => study.industry === "Real Estate",
  );

  return (
    <div className="flex-1">
      <section className="border-b border-gray-500 py-24 sm:py-32">
        <Container className="max-w-3xl">
          <Reveal>
            <Heading as="h1" size="hero" split>
              Built to sell real estate
            </Heading>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 text-xl leading-relaxed text-gray-100">
              30+ developers trust us to run the full loop: campaign creative,
              reels-first content, Meta ads, landing pages, and CRM follow-up.
              Projects stay in front of buyers from first scroll to signed
              sale.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <WorkGrid studies={studies} />
        </Container>
      </section>
    </div>
  );
}