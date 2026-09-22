import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { CaseStudyGallery } from "@/components/work/case-study-gallery";
import { CaseStudyResults } from "@/components/work/case-study-results";
import { WorkCard } from "@/components/work/work-card";
import {
  getCaseStudy,
  getCaseStudyServices,
  getNextProject,
  getWorkClientInitials,
} from "@/lib/case-studies";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);

  if (!study) {
    return { title: "Work not found" };
  }

  return {
    title: study.client,
    description: study.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);

  if (!study) return notFound();

  const services = getCaseStudyServices(study);
  const nextProject = await getNextProject(slug);

  return (
    <div className="flex-1">
      <section className="border-b border-gray-500 pt-20 sm:pt-28">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.25em] text-gray-300">
              <span className="font-bold text-accent">{study.year}</span>
              <span>{study.industry}</span>
              {services.map((service) => (
                <span key={service.slug}>{service.title}</span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Heading as="h1" size="hero" split className="mt-8">
              {study.client}
            </Heading>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-gray-100">
              {study.summary}
            </p>
          </Reveal>

          <Reveal delay={0.25} className="mt-14 sm:mt-20">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-500 bg-surface">
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: study.cover }}
              />
              <div
                aria-hidden="true"
                className="grain absolute inset-0 opacity-20 mix-blend-overlay"
              />
              <span className="absolute bottom-6 left-6 font-heading text-4xl font-bold uppercase tracking-[0.15em] text-background/50 sm:text-6xl">
                {getWorkClientInitials(study.client)}
              </span>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
            <div>
              <Reveal>
                <Heading as="h2" size="lg">
                  The challenge
                </Heading>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-100">
                  {study.challenge}
                </p>
              </Reveal>
            </div>

            <aside className="space-y-8 border-t border-gray-500 pt-8 lg:border-t-0 lg:pt-0">
              <Reveal>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-gray-300">
                    Services
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {services.map((service) => (
                      <span
                        key={service.slug}
                        className="rounded-full border border-gray-500 px-3 py-1.5 text-xs font-medium text-gray-100"
                      >
                        {service.title}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-gray-300">
                    Sector
                  </p>
                  <p className="mt-4 text-sm font-medium text-foreground">
                    {study.industry}
                  </p>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </section>

      {study.approach.length > 0 && (
        <section className="border-y border-gray-500 bg-surface/50 py-20 sm:py-24">
          <Container>
            <Reveal>
              <Heading as="h2" size="lg">
                The approach
              </Heading>
            </Reveal>
            <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
              {study.approach.map((step, index) => (
                <Reveal key={index} delay={index * 0.12}>
                  <div className="border-t-2 border-gray-300 pt-6">
                    <span className="font-heading text-5xl font-bold text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-4 leading-relaxed text-gray-100">{step}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-20 sm:py-24">
        <Container className="overflow-hidden">
          <Reveal>
            <Heading as="h2" size="lg">
              The execution
            </Heading>
          </Reveal>
          <Reveal delay={0.12} className="mt-12">
            <CaseStudyGallery
              items={study.gallery}
              cover={study.cover}
              client={study.client}
            />
          </Reveal>
        </Container>
      </section>

      {study.results.length > 0 && (
        <section className="border-y border-gray-500 bg-background py-20 sm:py-24">
          <Container>
            <Reveal>
              <Heading as="h2" size="lg">
                The result
              </Heading>
            </Reveal>
            <Reveal delay={0.12} className="mt-12">
              <CaseStudyResults results={study.results} />
            </Reveal>
          </Container>
        </section>
      )}

      {study.testimonial && (
        <section className="py-20 sm:py-24">
          <Container>
            <Reveal>
              <blockquote className="mx-auto max-w-3xl text-center">
                <span aria-hidden="true" className="font-heading text-6xl text-accent">
                  &ldquo;
                </span>
                <p className="text-2xl leading-relaxed tracking-tight sm:text-3xl">
                  {study.testimonial.quote}
                </p>
                <footer className="mt-8 text-sm text-gray-100">
                  <span className="font-heading font-bold text-foreground">
                    {study.testimonial.name}
                  </span>
                  <span className="block text-gray-300">{study.testimonial.role}</span>
                </footer>
              </blockquote>
            </Reveal>
          </Container>
        </section>
      )}

      <section className="border-t border-gray-500 bg-surface/50 py-20 sm:py-24">
        <Container>
          <Reveal>
            <div className="flex items-baseline justify-between gap-6">
              <Heading as="h2" size="lg">
                Next project
              </Heading>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="mt-12">
            <WorkCard study={nextProject} />
          </Reveal>
          <Reveal delay={0.2} className="mt-16">
            <Link
              href="/work"
              className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-accent transition-colors hover:text-foreground"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M7 5L3 8l4 3" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              All work
            </Link>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}