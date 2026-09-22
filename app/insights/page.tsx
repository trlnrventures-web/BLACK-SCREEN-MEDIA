import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { InsightsFilter } from "@/components/insights/insights-filter";
import { getAllPosts, getPostCategories } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Essays, systems, and opinions on strategy, design, and the work that wins before it's seen.",
  alternates: { canonical: "/insights" },
};

export const dynamic = "force-dynamic";

export default async function InsightsPage() {
  const posts = await getAllPosts();
  const categories = await getPostCategories();

  return (
    <div className="flex-1">
      <section className="border-b border-gray-500 py-20 sm:py-28">
        <Container>
          <Reveal>
            <Heading as="h1" size="xl" split>
              Insights
            </Heading>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-100">
              The thinking behind the work. On strategy, design, and what it
              takes to be felt before you&apos;re seen.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <InsightsFilter posts={posts} categories={categories} />
        </Container>
      </section>
    </div>
  );
}