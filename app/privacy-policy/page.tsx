import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Black Screen Media collects, uses, and protects your information.",
  alternates: { canonical: "/privacy-policy" },
};

const sections = [
  {
    title: "Who we are",
    body: (
      <>
        Black Screen Media is a creative and marketing agency registered at{" "}
        {siteConfig.address}. We operate this website and are the data
        controller for the information you share with us through it.
      </>
    ),
  },
  {
    title: "What we collect",
    body: (
      <>
        When you contact us through our website, we collect the information you
        choose to provide. Typically your name, email address, and the details
        of your message. We may also collect basic technical information that
        browsers send automatically, such as your IP address, browser type, and
        the pages you visit, to keep the site secure and understand how it&apos;s
        used.
      </>
    ),
  },
  {
    title: "How we use it",
    body: (
      <>
        We use your information to respond to enquiries, prepare proposals, and
        deliver the services you ask for. Communications you send us may be
        kept and used for legitimate business purposes such as record keeping,
        invoicing, and follow-up.
      </>
    ),
  },
  {
    title: "Cookies",
    body: (
      <>
        This website may use essential cookies to make the site function
        correctly. We do not run advertising trackers on this site. You can
        control or delete cookies through your browser settings at any time.
      </>
    ),
  },
  {
    title: "Who we share it with",
    body: (
      <>
        We don&apos;t sell or rent your personal information. Where necessary to
        provide services, we may share limited data with trusted tools and
        providers we use (such as email, analytics, and project management
        platforms), which are bound to keep it confidential. We may also
        disclose information where required by law.
      </>
    ),
  },
  {
    title: "How we protect it",
    body: (
      <>
        We take reasonable technical and organisational measures to protect
        your information from unauthorised access, alteration, or disclosure.
        No method of transmission over the internet is completely secure, so
        we cannot guarantee absolute security.
      </>
    ),
  },
  {
    title: "Your rights",
    body: (
      <>
        Depending on where you are, you may have rights to access, correct,
        delete, or restrict the processing of your personal information, and
        to object to how we use it. To exercise any of these rights, email us
        at {siteConfig.email} and we&apos;ll respond within a reasonable time.
      </>
    ),
  },
  {
    title: "Changes to this policy",
    body: (
      <>
        We may update this policy from time to time. When we do, we&apos;ll revise
        the date below. Continued use of our website after changes are posted
        means you accept the updated policy.
      </>
    ),
  },
  {
    title: "Contact",
    body: (
      <>
        Questions about this policy or your data can be sent to{" "}
        {siteConfig.email} or by post to {siteConfig.address}.
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="flex-1">
      <section className="border-b border-gray-500 py-20 sm:py-28">
        <Container className="max-w-3xl">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-accent">
              Last updated: June 2026
            </p>
            <Heading as="h1" size="xl" split className="mt-4">
              Privacy Policy
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