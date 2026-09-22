import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { getAllPosts } from "@/lib/insights";

export async function InsightsTeaser() {
  const posts = (await getAllPosts()).slice(0, 3);

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="font-heading text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight">
            We write about{" "}
            <span className="text-gradient-brand-animated">what we do.</span>
          </h2>
          <Link
            href="/insights"
            className="group inline-flex items-center gap-3 text-sm text-gray-100 transition-colors hover:text-accent"
          >
            All insights
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.1}>
              <Link href={`/insights/${post.slug}`} className="group block" data-cursor>
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-gray-500 bg-surface">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-50 transition-transform duration-700 group-hover:scale-105"
                    style={{ background: post.cover }}
                  />
                  <div
                    aria-hidden="true"
                    className="grain absolute inset-0 opacity-[0.1] mix-blend-overlay"
                  />
                  <span className="absolute left-4 top-4 text-xs uppercase tracking-[0.25em] text-foreground/80">
                    {post.date}
                  </span>
                </div>
                <div className="mt-5">
                  <h3 className="font-heading text-xl font-bold leading-snug tracking-tight transition-colors duration-300 group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-xs uppercase tracking-[0.25em] text-gray-100">
                    {post.category}
                    <span aria-hidden="true" className="mx-2">
                      ·
                    </span>
                    {post.readTime}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}