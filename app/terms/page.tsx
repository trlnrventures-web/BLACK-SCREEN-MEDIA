import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply to using the Black Screen Media website and engaging our services.",
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    title: "These terms",
    body: (
      <>
        These terms of service (&ldquo;Terms&rdquo;) apply to your use of the Black
        Screen Media website at {siteConfig.url} and to any engagement with our
        services. By using this website or contacting us, you agree to these
        Terms.
      </>
    ),
  },
  {
    title: "About us",
    body: (
      <>
        Black Screen Media is a creative and marketing agency based at{" "}
        {siteConfig.address}, reachable at {siteConfig.email}. The scope,
        deliverables, timelines, and fees for any specific engagement are
        always defined in a separate proposal or agreement.
      </>
    ),
  },
  {
    title: "Use of the website",
    body: (
      <>
        You may use this website for lawful purposes only. You agree not to
        misuse the site, attempt to gain unauthorised access to it, or interfere
        with the way it works. Content on this website is provided for general
        information and doesn&apos;t constitute professional or investment advice.
        We aren&apos;t liable for reliance placed on it.
      </>
    ),
  },
  {
    title: "Intellectual property",
    body: (
      <>
        The design, branding, copy, and code on this site are owned by Black
        Screen Media or its licensors and are protected by copyright and other
        intellectual property laws. You may view and share links to our content,
        but you may not reproduce or commercially use it without our written
        permission.
      </>
    ),
  },
  {
    title: "Our services",
    body: (
      <>
        Each project or retainer is governed by its own agreement, which sets out
        deliverables, fees, payment terms, and ownership of work product.
        Client-owned content we produce is licensed or assigned to you as stated
        in that agreement; where we reuse our underlying tools and templates,
        those remain our property.
      </>
    ),
  },
  {
    title: "Third-party links",
    body: (
      <>
        Links to third-party sites (including social media) are provided for
        convenience. We don&apos;t control and aren&apos;t responsible for their content,
        practices, or policies.
      </>
    ),
  },
  {
    title: "Limitation of liability",
    body: (
      <>
        To the fullest extent permitted by law, Black Screen Media won&apos;t be
        liable for any indirect, incidental, or consequential loss arising from
        your use of this website. Nothing in these Terms limits liability that
        can&apos;t be limited under applicable law.
      </>
    ),
  },
  {
    title: "Changes",
    body: (
      <>
        We may update these Terms from time to time. Changes take effect when
        posted here, with the date below revised. Continued use of the site after
        changes means you accept the updated Terms.
      </>
    ),
  },
  {
    title: "Governing law",
    body: (
      <>
        These Terms are governed by the laws of India and the courts of
        Mumbai, Maharashtra, will have jurisdiction over any dispute under them.
      </>
    ),
  },
  {
    title: "Contact",
    body: (
      <>
        Questions about these Terms can be sent to {siteConfig.email} or by post
        to {siteConfig.address}.
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="flex-1">
      <section className="border-b border-gray-500 py-20 sm:py-28">
        <Container className="max-w-3xl">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-accent">
              Last updated: June 2026
            </p>
            <Heading as="h1" size="xl" split className="mt-4">
              Terms of Service
            </Heading>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <div className="flex flex-col gap-12">
            {sections.map((section, index) => (
              <Reveal key={section.title} delay={(index % 2) * 0.05}>
                <div className="border-t border-gray-500 pt-8">
                  <div className="flex items-baseline gap-4">
                    <span className="font-heading text-sm font-bold text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-heading text-2xl font-bold tracking-tight">
                      {section.title}
                    </h2>
                  </div>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-100">
                    {section.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}