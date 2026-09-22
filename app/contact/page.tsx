import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us the problem before anyone else sees it. Start a project with Black Screen Media.",
  alternates: { canonical: "/contact" },
};

const mapSrc =
  "https://maps.google.com/maps?q=B-102%20Lawrence%20Trade%20Center%20KT%20Vision%20Vasai%20West%20Maharashtra%20401202&t=&z=15&ie=UTF8&iwloc=&output=embed";

export default function ContactPage() {
  return (
    <div className="flex-1">
      <section className="border-b border-gray-500 py-20 sm:py-28">
        <Container className="max-w-3xl">
          <Heading as="h1" size="xl">
            Let&apos;s talk before it&apos;s seen
          </Heading>
          <p className="mt-6 text-xl leading-relaxed text-gray-100">
            Short headline, shorter reply time. Tell us the problem and we&apos;ll
            get back to you within one business day.
          </p>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
            <ContactForm />

            <aside className="flex flex-col gap-10">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-gray-300">
                  Email
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-3 inline-block text-lg text-foreground transition-colors hover:text-accent"
                >
                  {siteConfig.email}
                </a>
                <br />
                <a
                  href={siteConfig.phoneHref}
                  className="mt-2 inline-block text-lg text-foreground transition-colors hover:text-accent"
                >
                  {siteConfig.phone}
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-gray-300">
                  Studio
                </p>
                <address className="mt-3 text-sm not-italic leading-relaxed text-gray-100">
                  B-102, Lawrence Trade Center
                  <br />
                  KT Vision, Vasai West
                  <br />
                  Maharashtra 401202, India
                  <br />
                  <span className="text-gray-300">by appointment</span>
                </address>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-gray-300">
                  Social
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {siteConfig.socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor
                        className="text-sm text-gray-100 transition-colors hover:text-accent"
                      >
                        {social.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="overflow-hidden rounded-xl border border-gray-500">
                <iframe
                  src={mapSrc}
                  title={`Map of ${siteConfig.city}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full min-h-[260px] w-full grayscale contrast-[0.9]"
                />
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}