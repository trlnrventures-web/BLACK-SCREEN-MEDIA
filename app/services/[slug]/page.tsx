import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ServiceIcon } from "@/components/work/service-icons";
import { getServiceBySlug, services } from "@/lib/services";

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service not found" };
  }

  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) return notFound();

  const index = services.findIndex((item) => item.slug === service.slug);

  return (
    <div className="flex-1">
      <section className="border-b border-gray-500 py-24 sm:py-32">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.25em] text-gray-300">
              <span className="font-bold text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>Service</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Heading as="h1" size="hero" split className="mt-8">
              {service.title}
            </Heading>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-gray-100">
              {service.intro}
            </p>
          </Reveal>

          <Reveal delay={0.28} className="mt-10">
            <Button href="/contact" size="lg" data-cursor>
              Start a project
            </Button>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
            <div>
              <Reveal>
                <Heading as="h2" size="lg">
                  What&apos;s included
                </Heading>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="mt-8 space-y-4">
                  {service.included.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span className="text-base leading-relaxed text-gray-100">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <aside className="space-y-8 border-t border-gray-500 pt-8 lg:border-t-0 lg:pt-0">
              <Reveal>
                <div className="relative flex h-28 items-center justify-center overflow-hidden rounded-xl border border-gray-500/70 bg-[#0B0B0B]">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 scale-150 bg-[radial-gradient(circle_at_center,rgba(232,80,2,0.4),transparent_70%)] opacity-80"
                  />
                  <ServiceIcon
                    slug={service.slug}
                    className="h-12 w-12 text-foreground"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-gray-500 px-3 py-1.5 text-xs font-medium text-gray-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-y border-gray-500 bg-surface/50 py-20 sm:py-24">
        <Container>
          <Reveal>
            <Heading as="h2" size="lg">
              How it runs
            </Heading>
          </Reveal>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, stepIndex) => (
              <Reveal key={step.title} delay={stepIndex * 0.1}>
                <div className="border-t-2 border-gray-300 pt-6">
                  <span className="font-heading text-5xl font-bold text-accent">
                    {String(stepIndex + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 font-heading text-lg font-bold tracking-tight">
                    {step.title}
                  </p>
                  <p className="mt-2 leading-relaxed text-gray-100">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <div className="flex items-baseline justify-between gap-6">
              <Heading as="h2" size="lg">
                Explore other practices
              </Heading>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {services
              .filter((item) => item.slug !== service.slug)
              .slice(0, 4)
              .map((item, itemIndex) => (
                <Reveal key={item.slug} delay={itemIndex * 0.06}>
                  <Link
                    href={`/services/${item.slug}`}
                    data-cursor
                    className="group flex items-center justify-between rounded-xl border border-gray-500 px-6 py-5 transition-colors duration-300 hover:border-gray-300 hover:bg-surface"
                  >
                    <span className="font-heading text-base font-bold tracking-tight transition-colors group-hover:text-accent">
                      {item.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-gray-100 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent"
                    >
                      →
                    </span>
                  </Link>
                </Reveal>
              ))}
          </div>
          <Reveal delay={0.2} className="mt-16">
            <Link
              href="/services"
              className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-accent transition-colors hover:text-foreground"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M7 5L3 8l4 3" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              All services
            </Link>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}