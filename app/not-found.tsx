import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page doesn't exist. Let's get you back somewhere real.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="relative flex min-h-[calc(100svh-5rem)] flex-1 flex-col items-center justify-center overflow-hidden border-b border-gray-500 text-center sm:min-h-[calc(100svh-6rem)]">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gradient-animated opacity-30 blur-[160px]" />
          <div className="grain absolute inset-0 opacity-[0.08] mix-blend-overlay" />
        </div>

        <Container className="relative">
          <Reveal>
            <p className="font-heading text-[clamp(6rem,20vw,14rem)] font-bold leading-none tracking-tight text-transparent">
              <span className="text-gradient-brand-animated">404</span>
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <Heading as="h1" size="xl" className="mt-4">
              This page went dark
            </Heading>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-gray-100">
              The page you&apos;re looking for doesn&apos;t exist. Maybe it moved,
              or maybe you took a wrong turn before it was seen.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button href="/" size="lg" data-cursor>
                Back home
              </Button>
              <Button href="/work" variant="ghost" size="lg" data-cursor>
                View our work
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-12">
              <p className="text-sm text-gray-300">
                Spot a broken link? Let us know at{" "}
                <Link
                  href={`mailto:${siteConfig.email}`}
                  className="text-gray-100 underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  {siteConfig.email}
                </Link>
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}