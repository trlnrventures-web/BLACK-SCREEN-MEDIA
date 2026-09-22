"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useNavMenu } from "@/components/ui/overlay-nav";
import { cn } from "@/lib/cn";

export function Header() {
  const { openMenu } = useNavMenu();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[70] border-b backdrop-blur-xl transition-shadow duration-300",
        scrolled
          ? "border-gray-500/70 bg-background/72 shadow-lifted"
          : "border-gray-500/50 bg-background/55",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:h-20 sm:px-8">
        <Link href="/" aria-label="Black Screen Media, home" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Black Screen Media"
            width={473}
            height={210}
            priority
            unoptimized
            className="h-7 w-auto sm:h-8"
          />
        </Link>

        <button
          type="button"
          onClick={openMenu}
          aria-label="Open menu"
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium uppercase tracking-[0.25em] text-foreground transition-colors duration-300 hover:text-accent"
        >
          Menu
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </header>
  );
}