"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import type { Reel } from "@/lib/reels";

export function PlayIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6 4.5v11l9-5.5-9-5.5Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function ReelThumb({
  reel,
  onOpen,
  compact = false,
}: {
  reel: Reel;
  onOpen: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      data-cursor-view
      aria-label={`Play ${reel.title}, ${reel.tag}`}
      className="group relative block aspect-[9/16] w-full overflow-hidden rounded-xl border border-gray-500 bg-surface text-left transition-colors duration-300 hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: reel.cover }}
      />
      <div
        aria-hidden="true"
        className="grain absolute inset-0 opacity-10 mix-blend-overlay"
      />
      <video
        data-reel
        src={reel.src}
        poster={reel.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      >
        <track kind="captions" />
      </video>

      <span className="absolute right-3 top-3 rounded-full bg-background/70 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur-sm">
        {reel.duration}
      </span>

      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent p-4 pt-14">
        <span className="block font-heading text-sm font-bold tracking-tight">
          {reel.title}
        </span>
        <span className="mt-0.5 block text-xs text-gray-100">{reel.tag}</span>
      </span>

      <span className="absolute inset-0 flex items-center justify-center">
        <span
          className={`flex items-center justify-center rounded-full bg-brand-gradient text-background shadow-lg transition-opacity duration-300 group-hover:opacity-100 ${
            compact ? "h-9 w-9" : "h-12 w-12"
          } opacity-0`}
        >
          <PlayIcon />
        </span>
      </span>
    </button>
  );
}

export function ReelLightbox({
  reel,
  onClose,
}: {
  reel: Reel;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${reel.title}, ${reel.tag}`}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[420px]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <div
          className="relative aspect-[9/16] overflow-hidden rounded-xl border border-gray-500 bg-surface"
          style={{ background: reel.cover }}
        >
          <video
            src={reel.src}
            poster={reel.poster}
            autoPlay={!reducedMotion}
            muted
            loop
            playsInline
            controls
            preload="auto"
            className="absolute inset-0 h-full w-full"
          >
            <track kind="captions" />
          </video>
          <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gray-100 backdrop-blur-sm">
            Preview. Placeholder reel
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between gap-6">
          <div>
            <p className="font-heading text-lg font-bold tracking-tight">
              {reel.title}
            </p>
            <p className="mt-0.5 text-xs uppercase tracking-[0.25em] text-accent">
              {reel.tag}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            data-cursor
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gray-500 px-4 py-2 text-xs font-medium uppercase tracking-widest text-gray-100 transition-colors hover:border-accent hover:text-accent"
          >
            Close
            <CloseIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ReelAutoplay({ children }: { children: ReactNode }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = gridRef.current;
    if (!root || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const videos = Array.from(
      root.querySelectorAll<HTMLVideoElement>("video[data-reel]"),
    );
    if (videos.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            const play = () => {
              gsap.fromTo(video, { opacity: 0.7 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
              video.play().catch(() => {});
            };
            play();
          } else {
            video.pause();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.35 },
    );

    videos.forEach((video) => io.observe(video));
    return () => io.disconnect();
  }, []);

  return <div ref={gridRef} className="contents">{children}</div>;
}