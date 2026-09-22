import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { WorkFilters } from "@/components/work/work-filters";
import { WorkGrid } from "@/components/work/work-grid";
import {
  getAllCaseStudies,
  getWorkIndustries,
  getWorkServiceSlugs,
} from "@/lib/case-studies";
import { getServiceBySlug } from "@/lib/services";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected case studies from Black Screen Media. Launches, rebrands, and campaigns built before it's seen.",
};

export const dynamic = "force-dynamic";

export default async function WorkPage({
  searchParams,
}: PageProps<"/work">) {
  const params = await searchParams;
  const activeService =
    typeof params.service === "string" ? params.service : "all";
  const activeIndustry =
    typeof params.industry === "string" ? params.industry : "all";

  const studies = (await getAllCaseStudies()).filter((study) => {
    const matchesService =
      activeService === "all" || study.services.includes(activeService);
    const matchesIndustry =
      activeIndustry === "all" || study.industry === activeIndustry;
    return matchesService && matchesIndustry;
  });

  const serviceSlugs = await getWorkServiceSlugs();
  const industries = await getWorkIndustries();

  return (
    <div className="flex-1">
      <section className="border-b border-gray-500 py-20 sm:py-28">
        <Container>
          <Reveal>
            <Heading as="h1" size="xl" split>
              Selected work
            </Heading>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-100">
              Launches, rebrands, and campaigns built to land before they&apos;re
              seen. Filter by what we did and who we did it for.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-12">
            <div className="rounded-xl border border-gray-500 bg-surface/60 p-6 sm:p-8">
              <WorkFilters
                serviceRow={{
                  label: "Services",
                  param: "service",
                  active: activeService,
                  options: serviceSlugs.map((slug) => ({
                    value: slug,
                    label: getServiceBySlug(slug)?.title ?? slug,
                  })),
                }}
                industryRow={{
                  label: "Industries",
                  param: "industry",
                  active: activeIndustry,
                  options: industries.map((industry) => ({
                    value: industry,
                    label: industry,
                  })),
                }}
              />
            </div>
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