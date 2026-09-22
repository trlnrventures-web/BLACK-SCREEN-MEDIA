import Link from "next/link";
import type { InsightPost } from "@/lib/insights";

type PostCardProps = {
  post: InsightPost;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group">
      <Link href={`/insights/${post.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-gray-500 bg-surface">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-brand-gradient-animated opacity-40 transition-transform duration-700 group-hover:scale-105"
            style={{ background: post.cover }}
          />
          <div
            aria-hidden="true"
            className="grain absolute inset-0 opacity-[0.12] mix-blend-overlay"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="font-heading text-3xl font-bold uppercase tracking-[0.15em] text-background/40">
              BSM
            </span>
          </span>
        </div>

        <p className="mt-6 text-xs text-gray-100">
          <span className="uppercase tracking-[0.25em] text-accent">
            {post.category}
          </span>
          <span aria-hidden="true" className="mx-2">
            ·
          </span>
          <span>{post.date}</span>
        </p>
        <h3 className="mt-4 font-heading text-2xl font-bold leading-snug tracking-tight transition-colors duration-300 group-hover:text-accent">
          {post.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-100">
          {post.excerpt}
        </p>
        <p className="mt-6 text-xs uppercase tracking-[0.25em] text-gray-100">
          {post.readTime}
        </p>
      </Link>
    </article>
  );
}