"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { services } from "@/lib/services";

const sitemapLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
];

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.94 8.5H4.06V20h2.88V8.5ZM5.5 7.2a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4ZM20 13.15c0-3.15-1.68-4.62-3.93-4.62-1.81 0-2.62 1-3.07 1.69V8.5H10.1V20h2.9v-6.02c0-1.58.3-3.13 2.28-3.13 1.95 0 1.97 1.82 1.97 3.24V20H20v-6.85Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 13L13 3M13 3H6M13 3v7" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function SocialCell({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor
      className="group flex items-center justify-between rounded-xl border border-gray-500 bg-surface/40 px-6 py-5 transition-colors duration-300 hover:border-gray-300 hover:bg-surface"
    >
      <span className="flex items-center gap-3">
        <span className="text-gray-100 transition-colors duration-300 group-hover:text-accent">
          {icon}
        </span>
        <span className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-foreground">
          {label}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="text-gray-100 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
      >
        <ArrowIcon />
      </span>
    </a>
  );
}

function LinkColumn({
  label,
  links,
}: {
  label: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
        {label}
      </p>
      <ul className="mt-5 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-gray-100 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const inputClasses =
  "w-full rounded-none border border-gray-500 bg-background px-5 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-gray-300 focus:border-accent";

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Add a valid email to stay in the loop.");
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  const instagram = siteConfig.socials.find((s) => s.label === "Instagram")?.href;
  const linkedin = siteConfig.socials.find((s) => s.label === "LinkedIn")?.href;

  return (
    <footer className="relative border-t border-gray-500 bg-background">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-24 h-64 overflow-hidden">
        <div
          className="absolute right-[8%] top-0 h-56 w-96 bg-brand-gradient opacity-25 blur-[80px]"
          style={{ filter: "blur(70px)" }}
        />
        <div
          className="absolute left-[15%] top-8 h-40 w-80 bg-[#F16001] opacity-15 blur-[90px]"
          style={{ filter: "blur(90px)" }}
        />
        <div
          className="absolute bottom-0 left-[45%] h-32 w-72 bg-[#C10801] opacity-20 blur-[100px]"
          style={{ filter: "blur(100px)" }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-16 sm:px-8 sm:pt-20">
        <div className="grid gap-4 sm:grid-cols-2">
          {instagram ? (
            <SocialCell href={instagram} label="Instagram" icon={<InstagramIcon />} />
          ) : null}
          {linkedin ? (
            <SocialCell href={linkedin} label="LinkedIn" icon={<LinkedinIcon />} />
          ) : null}
        </div>

        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <LinkColumn label="Sitemap" links={sitemapLinks} />
          <LinkColumn
            label="Services"
            links={services.map((service) => ({
              href: `/services/${service.slug}`,
              label: service.title,
            }))}
          />
          <LinkColumn label="Company" links={companyLinks} />
          <LinkColumn label="Legal" links={legalLinks} />
        </div>

        <div className="mt-20 flex flex-col justify-between gap-10 border-t border-gray-500 pt-10 lg:flex-row lg:items-end">
          <div>
            <Image
              src="/logo-white.svg"
              alt="Black Screen Media"
              width={473}
              height={210}
              unoptimized
              className="h-10 w-auto"
            />
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              Before It&apos;s Seen.
            </p>
          </div>

          <div className="w-full max-w-md">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
              Get our content playbook
            </p>
            {submitted ? (
              <div className="mt-4 border border-gray-500 px-5 py-3 text-sm text-gray-100">
                You&apos;re in. The playbook is on its way.
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} className="mt-4 flex items-stretch">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  aria-invalid={Boolean(error)}
                  placeholder="your email"
                  className={inputClasses}
                />
                <button
                  type="submit"
                  data-cursor
                  className="shrink-0 rounded-none border border-[#E85002] bg-[#E85002] px-6 text-xs font-medium uppercase tracking-widest text-background transition-colors duration-200 hover:bg-[#F16001] hover:border-[#F16001] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Subscribe
                </button>
              </form>
            )}
            {error ? <p className="mt-2 text-xs text-accent">{error}</p> : null}
          </div>
        </div>

        <div className="mt-10 border-t border-gray-500 py-6">
          <p className="text-xs text-gray-300">
            © {new Date().getFullYear()} Black Screen Media. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}