import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  title: string;
  description: string;
  tags?: string[];
  index?: string;
  media?: ReactNode;
  href?: string;
  className?: string;
};

export function Card({ title, description, tags, index, media, href, className }: CardProps) {
  const inner = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-gray-500 bg-surface">
        {media ?? (
          <div aria-hidden="true" className="absolute inset-0 bg-brand-gradient opacity-20" />
        )}
        {index ? (
          <span className="absolute left-4 top-4 font-heading text-xs font-bold tracking-[0.2em] text-foreground/70">
            {index}
          </span>
        ) : null}
      </div>

      <div className="mt-6 flex items-start justify-between gap-4">
        <h3 className="font-heading text-2xl font-bold tracking-tight transition-colors duration-300 group-hover:text-accent">
          {title}
        </h3>
        <span
          aria-hidden="true"
          className="mt-1 h-8 w-8 shrink-0 rounded-full border border-gray-500 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-background"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="mx-auto mt-[7px]"
            fill="none"
          >
            <path
              d="M4 12L12 4M12 4H5.5M12 4v6.5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-gray-100">{description}</p>

      {tags && tags.length > 0 ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-gray-500 px-3 py-1 text-xs text-gray-100"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );

  const classes = cn("group block", className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return <article className={classes}>{inner}</article>;
}