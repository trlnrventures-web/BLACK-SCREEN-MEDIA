"use client";

import { useMemo, useState } from "react";
import { PostCard } from "@/components/insights/post-card";
import { cn } from "@/lib/cn";
import type { InsightPost } from "@/lib/insights";

type InsightsFilterProps = {
  posts: InsightPost[];
  categories: string[];
};

export function InsightsFilter({ posts, categories }: InsightsFilterProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = category === "all" || post.category === category;
      const matchesQuery =
        q === "" ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, category]);

  return (
    <div>
      <div className="flex flex-col gap-6 rounded-xl border border-gray-500 bg-surface/60 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <Chip
            label="All"
            active={category === "all"}
            onClick={() => setCategory("all")}
          />
          {categories.map((item) => (
            <Chip
              key={item}
              label={item}
              active={category === item}
              onClick={() => setCategory(item)}
            />
          ))}
        </div>

        <label className="relative block lg:w-72">
          <span className="sr-only">Search insights</span>
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search insights…"
            className="w-full rounded-full border border-gray-500 bg-background py-2.5 pl-11 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-gray-300 focus:border-accent"
          />
        </label>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, index) => (
            <div
              key={post.slug}
              className="animate-[bsm-fade-up_0.6s_ease_forwards] opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-12 rounded-xl border border-dashed border-gray-500 px-6 py-16 text-center text-gray-100">
          No posts match &quot;{query || category}&quot;. Try a different search or
          category.
        </p>
      )}
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor
      className={cn(
        "rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors duration-300",
        active
          ? "border-accent bg-accent text-background"
          : "border-gray-500 text-gray-100 hover:border-accent hover:text-accent",
      )}
    >
      {label}
    </button>
  );
}