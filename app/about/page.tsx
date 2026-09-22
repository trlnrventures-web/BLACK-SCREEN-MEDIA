import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { stats } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Black Screen Media is a creative and marketing agency built on one belief: the work wins before it's seen.",
  alternates: { canonical: "/about" },
};

const team = [
  {
    initials: "ST",
    name: "Strategy",
    role: "Positioning & Planning",
    bio: "Research, positioning, and campaign plans. The work that decides what gets made and why it will work.",
  },
  {
    initials: "CC",
    name: "Creative & Content",
    role: "Design, Film & Social",
    bio: "Identity, packaging, reels, and campaigns. Everything the audience actually sees, produced in-house.",
  },
  {
    initials: "PA",
    name: "Performance & Ads",
    role: "Paid Media & Lead Gen",
    bio: "Meta campaigns, landing pages, and optimisation. Managed for cost per lead and ROAS, not impressions.",
  },
  {
    initials: "CS",
    name: "Client Success",
    role: "Accounts & Delivery",
    bio: "The bridge to your team. Timelines, reporting, and CRM follow-up so nothing stalls between brief and close.",
  },
];

const values = [
  {
    title: "Before it's seen",
    description:
      "The strategy, research, and craft happen while nobody is watching. That's where the work wins.",
  },
  {
    title: "Bold over safe",
    description:
      "Safe work is expensive advertising for the wrong brand. We'd rather defend a point of view.",
  },
  {
    title: "Craft is respect",
    description:
      "Every frame, word, and pixel is an act of respect for the person who'll remember it.",
  },
  {
    title: "Speed with taste",
    description:
      "Deadlines are where taste gets proven. We ship fast without shipping cheap.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex-1">
      <section className="relative overflow-hidden border-b border-gray-500 py-24 sm:py-32">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gradient-animated opacity-30 blur-[160px]" />
          <div className="grain absolute inset-0 opacity-[0.08] mix-blend-overlay" />
        </div>
        <Container className="relative max-w-3xl">
          <Reveal>
            <Heading as="h1" size="hero" split>
              The work wins before it&apos;s seen
            </Heading>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 text-xl leading-relaxed text-gray-100">
              Black Screen Media is a creative and marketing agency for
              companies that would rather be remembered than liked. We believe
              the launch is the easiest part. The months of invisible strategy,
              research, and craft before it are what make the visible part land.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-6 text-lg leading-relaxed text-gray-100">
              &ldquo;Before It&apos;s Seen&rdquo; isn&apos;t a slogan; it&apos;s sequencing. The work
              nobody claps for is the work that moves the market. We push that
              phase further, earlier, and harder than most agencies are willing.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-y border-gray-500 bg-background py-20 sm:py-24">
        <Container>
          <Reveal>
            <Heading as="h2" size="lg">
              How we&apos;re organised
            </Heading>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <Reveal key={member.name} delay={(index % 4) * 0.1}>
                <figure className="group relative">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-gray-500 bg-surface">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(160deg, var(--bsm-gradient-mid) 0%, var(--bsm-gradient-start) 70%, var(--bsm-surface) 100%)",
                      }}
                    />
                    <div
                      aria-hidden="true"
                      className="grain absolute inset-0 opacity-[0.12] mix-blend-overlay"
                    />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="font-heading text-5xl font-bold uppercase tracking-[0.15em] text-background/50">
                        {member.initials}
                      </span>
                    </span>
                    <figcaption className="absolute inset-x-0 bottom-0 translate-y-[70%] bg-surface/90 p-5 backdrop-blur-md transition-transform duration-500 group-hover:translate-y-0">
                      <p className="font-heading text-lg font-bold tracking-tight">
                        {member.name}
                      </p>
                      <p className="mt-1 text-xs font-medium uppercase tracking-[0.25em] text-accent">
                        {member.role}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-gray-100">
                        {member.bio}
                      </p>
                    </figcaption>
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <Heading as="h2" size="lg">
              What we&apos;re building
            </Heading>
          </Reveal>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={(index % 4) * 0.1}>
                <div className="border-t-2 border-gray-300 pt-6">
                  <span className="font-heading text-xs font-bold tracking-[0.2em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-heading text-2xl font-bold tracking-tight">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-100">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-gray-500 bg-surface/50 py-20 sm:py-24">
        <Container>
          <Reveal>
            <Heading as="h2" size="lg">
              By the numbers
            </Heading>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-full border border-gray-500 px-5 py-2.5 text-sm text-gray-100"
                >
                  <span className="font-heading font-bold text-foreground">
                    {stat.prefix ?? ""}
                    {stat.value}
                    {stat.suffix}
                  </span>{" "}
                  {stat.label}
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container className="flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <Heading as="h2" size="xl" split>
              Let&apos;s work before it&apos;s seen
            </Heading>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-100">
              Bring us the problem. We&apos;ll bring the strategy, craft, and pace to
              make it impossible to ignore.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10">
              <Button href="/contact" size="lg" data-cursor>
                Start a project
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}