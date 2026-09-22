import { readCaseStudies } from "@/lib/cms/store";
import { getServiceBySlug } from "@/lib/services";

export type CaseStudyMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
};

export type CaseStudyResult = {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
};

export type CaseStudyTestimonial = {
  quote: string;
  name: string;
  role: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  services: string[];
  year: string;
  summary: string;
  cover: string;
  featured: boolean;
  hero: CaseStudyMedia;
  challenge: string;
  approach: string[];
  gallery: CaseStudyMedia[];
  results: CaseStudyResult[];
  testimonial: CaseStudyTestimonial | null;
};

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  return readCaseStudies<CaseStudy>();
}

export async function getAllSlugs(): Promise<{ slug: string }[]> {
  const studies = await getAllCaseStudies();
  return studies.map((study) => ({ slug: study.slug }));
}

export async function getCaseStudy(
  slug: string,
): Promise<CaseStudy | undefined> {
  const studies = await getAllCaseStudies();
  return studies.find((study) => study.slug === slug);
}

export async function getFeaturedWorks(): Promise<CaseStudy[]> {
  const studies = await getAllCaseStudies();
  return studies.filter((study) => study.featured);
}

export async function getWorkIndustries(): Promise<string[]> {
  const studies = await getAllCaseStudies();
  return Array.from(new Set(studies.map((study) => study.industry))).sort();
}

export async function getWorkServiceSlugs(): Promise<string[]> {
  const slugs = new Set<string>();
  for (const study of await getAllCaseStudies()) {
    for (const slug of study.services) slugs.add(slug);
  }
  return Array.from(slugs);
}

export function getServiceTitle(slug: string): string {
  return getServiceBySlug(slug)?.title ?? slug;
}

export function getCaseStudyServices(
  study: CaseStudy,
): { slug: string; title: string }[] {
  return study.services.map((slug) => ({
    slug,
    title: getServiceTitle(slug),
  }));
}

export async function getNextProject(slug: string): Promise<CaseStudy> {
  const studies = await getAllCaseStudies();
  const index = studies.findIndex((study) => study.slug === slug);
  return studies[(index + 1) % studies.length];
}

export function getWorkClientInitials(client: string): string {
  return client
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}