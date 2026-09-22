export type { Service } from "@/lib/services";
export { services } from "@/lib/services";
export type { CaseStudy } from "@/lib/case-studies";

export type Stat = {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
};

export const stats: Stat[] = [
  { value: 3, suffix: "", label: "Years" },
  { value: 10, suffix: "+", label: "Team" },
  { value: 30, suffix: "+", label: "Real estate clients" },
  { value: 50, suffix: "L+", prefix: "₹", label: "Generated in 9 months for one brand" },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

// PLACEHOLDER TESTIMONIALS. Not real client quotes. Stallions quote is the
// working copy from the client; flag remains until the approved quote arrives.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Black Screen Media's content brought us leads we could actually close. Multiple projects sold straight from the reels they made.",
    name: "Stallions",
    role: "Real estate developer, Vasai-Virar",
  },
];

export type InsightPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description: "We dig into the problem before touching a single asset.",
  },
  {
    number: "02",
    title: "Strategy",
    description: "Campaigns, content, and channels mapped to one goal: results.",
  },
  {
    number: "03",
    title: "Execution",
    description: "Branding, content, ads, and launch. Built and shipped.",
  },
  {
    number: "04",
    title: "Results & Reporting",
    description: "Leads tracked, deals closed, reported back. Not just delivered and forgotten.",
  },
];

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "Do you work on retainer or per-project?",
    answer:
      "Both. Real estate clients like Mansarovar Group are retained partnerships; launches like Akmas Perfumes start as a full-scope project.",
  },
  {
    question: "Do you only work with real estate brands?",
    answer:
      "It's our strongest track record, 30+ clients. But we build D2C brands from zero too, Akmas Perfumes being the proof.",
  },
  {
    question: "How long does a launch take?",
    answer:
      "Depends on scope. A content/lead-gen engine can start delivering within weeks; a full brand build like Akmas Perfumes ran across several months to first sales.",
  },
  {
    question: "Where are you based, and do you work outside Mumbai?",
    answer:
      "We're based in Vasai-Virar, Maharashtra, and work with clients across Mumbai and pan-India.",
  },
];