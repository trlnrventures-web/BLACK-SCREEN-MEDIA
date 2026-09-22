import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ServicesGrid } from "@/components/work/services-grid";

export function Services() {
  return (
    <section className="border-t border-gray-500 bg-surface/60 py-24 sm:py-32">
      <Container>
        <Reveal>
          <h2 className="max-w-3xl font-heading text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight">
            One team.{" "}
            <span className="text-gradient-brand-animated">Every touchpoint.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-lg text-gray-100">
            From the first frame to the closed deal.
          </p>
        </Reveal>

        <div className="mt-14">
          <ServicesGrid />
        </div>
      </Container>
    </section>
  );
}