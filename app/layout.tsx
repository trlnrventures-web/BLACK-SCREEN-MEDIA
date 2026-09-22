import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import SmoothScroll from "@/components/providers/smooth-scroll";
import { NavProvider } from "@/components/ui/overlay-nav";
import { Cursor } from "@/components/ui/cursor";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seoTitle,
    template: "%s | Black Screen Media",
  },
  description: siteConfig.seoDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.seoTitle,
    description: siteConfig.seoDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seoTitle,
    description: siteConfig.seoDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  description: siteConfig.seoDescription,
  slogan: "Before it's seen.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "B-102, Lawrence Trade Center, KT Vision",
    addressLocality: "Vasai West",
    addressRegion: "Maharashtra",
    postalCode: "401202",
    addressCountry: "IN",
  },
  telephone: siteConfig.phone,
  sameAs: siteConfig.socials.map((social) => social.href),
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteConfig.url}/#business`,
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  description: siteConfig.seoDescription,
  slogan: "Before it's seen.",
  image: `${siteConfig.url}/opengraph-image.png`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "B-102, Lawrence Trade Center, KT Vision",
    addressLocality: "Vasai West",
    addressRegion: "Maharashtra",
    postalCode: "401202",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 19.3916,
    longitude: 72.8369,
  },
  areaServed: {
    "@type": "City",
    name: "Mumbai",
  },
  sameAs: siteConfig.socials.map((social) => social.href),
  makesOffer: [
    { "@type": "Offer", name: "Branding & Packaging" },
    { "@type": "Offer", name: "Content Production" },
    { "@type": "Offer", name: "Performance Marketing" },
    { "@type": "Offer", name: "Website Design" },
  ],
};

function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
    />
  );
}

function LocalBusinessJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
    />
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground antialiased">
        <NavProvider>
          <SmoothScroll />
          <Cursor />
          <Header />
          <main className="flex flex-1 flex-col pt-16 sm:pt-20">{children}</main>
          <Footer />
          <OrganizationJsonLd />
          <LocalBusinessJsonLd />
        </NavProvider>
      </body>
    </html>
  );
}