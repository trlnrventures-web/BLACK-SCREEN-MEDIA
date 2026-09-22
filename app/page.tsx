import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ProofStrip } from "@/components/home/proof-strip";
import { ClientWall } from "@/components/home/client-wall";
import { FeaturedWork } from "@/components/home/featured-work";
import { ReelShowcase } from "@/components/home/reel-showcase";
import { Services } from "@/components/home/services";
import { HowWeWork } from "@/components/home/how-we-work";
import { TeamTeaser } from "@/components/home/team-teaser";
import { TestimonialStage } from "@/components/home/testimonials";
import { RealEstateSpotlight } from "@/components/home/real-estate-spotlight";
import { Faq } from "@/components/home/faq";
import { InstagramFeed } from "@/components/home/instagram-feed";
import { InsightsTeaser } from "@/components/home/insights";
import { CtaBand } from "@/components/home/cta-band";
import { LeadPopup } from "@/components/lead/lead-popup";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="flex-1">
      <Hero />
      <ProofStrip />
      <ClientWall />
      <FeaturedWork />
      <ReelShowcase />
      <Services />
      <HowWeWork />
      <TeamTeaser />
      <TestimonialStage />
      <RealEstateSpotlight />
      <Faq />
      <InstagramFeed />
      <InsightsTeaser />
      <CtaBand />
      <LeadPopup />
    </div>
  );
}