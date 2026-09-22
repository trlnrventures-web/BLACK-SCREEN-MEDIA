"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site";

type PostShareProps = {
  slug: string;
  title: string;
};

export function PostShare({ slug, title }: PostShareProps) {
  const [copied, setCopied] = useState(false);
  const url = `${siteConfig.url}/insights/${slug}`;
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const links = [
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
    },
  ];

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs uppercase tracking-[0.25em] text-gray-300">
        Share
      </span>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor
          className="rounded-full border border-gray-500 px-4 py-1.5 text-xs font-medium text-gray-100 transition-colors duration-300 hover:border-accent hover:text-accent"
        >
          {link.label}
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        data-cursor
        className="rounded-full border border-gray-500 px-4 py-1.5 text-xs font-medium text-gray-100 transition-colors duration-300 hover:border-accent hover:text-accent"
      >
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}