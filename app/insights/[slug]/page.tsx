import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { PostShare } from "@/components/insights/post-share";
import { PostCard } from "@/components/insights/post-card";
import {
  getPost,
  getRelatedPosts,
  type InsightPost,
} from "@/lib/insights";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}/insights/${post.slug}`,
      publishedTime: post.date,
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.excerpt,
    },
  };
}

function PostBody({ post }: { post: InsightPost | undefined }) {
  if (!post) return null;

  return (
    <div className="mx-auto max-w-2xl">
      {post.body.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h2
              key={index}
              className="mt-14 font-heading text-3xl font-bold tracking-tight"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote
              key={index}
              className="my-10 border-l-2 border-accent pl-6 text-xl italic leading-relaxed text-gray-100"
            >
              {block.text}
            </blockquote>
          );
        }
        if (block.type === "list") {
          return (
            <ul
              key={index}
              className="my-8 space-y-4 border-y border-gray-500 py-8"
            >
              {block.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="flex items-start gap-4 text-lg leading-relaxed text-foreground"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[9px] h-1 w-6 shrink-0 bg-brand-gradient"
                  />
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p
            key={index}
            className="mt-8 text-lg leading-relaxed text-gray-100 first:mt-0"
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

export default async function PostPage({
  params,
}: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return notFound();

  const related = await getRelatedPosts(post);

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    wordCount: post.body.reduce(
      (count, block) =>
        count + ("text" in block ? block.text.split(" ").length : 0),
      0,
    ),
    mainEntityOfPage: `${siteConfig.url}/insights/${post.slug}`,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <div className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      <section className="border-b border-gray-500 py-20 sm:py-28">
        <Container className="max-w-3xl">
          <Reveal>
            <p className="text-xs text-gray-100">
              <span className="uppercase tracking-[0.25em] text-accent">
                {post.category}
              </span>
              <span aria-hidden="true" className="mx-2">
                ·
              </span>
              <span>{post.date}</span>
              <span aria-hidden="true" className="mx-2">
                ·
              </span>
              <span>{post.readTime}</span>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading as="h1" size="xl" className="mt-8">
              {post.title}
            </Heading>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4">{post.author.name}</p>
            <p className="text-sm text-gray-100">{post.author.role}</p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <Reveal>
            <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-500 bg-surface">
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: post.cover }}
              />
              <div
                aria-hidden="true"
                className="grain absolute inset-0 opacity-20 mix-blend-overlay"
              />
              <span className="absolute bottom-6 left-6 font-heading text-3xl font-bold uppercase tracking-[0.15em] text-background/50 sm:text-5xl">
                BSM
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-14">
            <PostBody post={post} />
          </Reveal>

          <Reveal delay={0.1} className="mt-16 flex justify-between gap-6">
            <Link
              href="/insights"
              className="group inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-gray-100 transition-colors hover:text-accent"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M9 5L13 8l-4 3" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              All insights
            </Link>
            <PostShare slug={post.slug} title={post.title} />
          </Reveal>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="border-t border-gray-500 bg-surface/50 py-20 sm:py-24">
          <Container>
            <Reveal>
              <Heading as="h2" size="lg">
                Keep reading
              </Heading>
            </Reveal>
            <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-3">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.12}>
                  <PostCard post={item} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}