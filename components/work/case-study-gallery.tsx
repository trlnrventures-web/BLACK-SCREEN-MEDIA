"use client";

import { useRef } from "react";
import type { CaseStudyMedia } from "@/lib/case-studies";

type CaseStudyGalleryProps = {
  items: CaseStudyMedia[];
  cover: string;
  client: string;
};

export function CaseStudyGallery({
  items,
  cover,
  client,
}: CaseStudyGalleryProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const state = useRef({ active: false, startX: 0, baseScroll: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    state.current = {
      active: true,
      startX: e.clientX,
      baseScroll: scroller.scrollLeft,
    };
    scroller.classList.add("drag-scrolling");
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (!scroller || !state.current.active) return;
    scroller.scrollLeft =
      state.current.baseScroll - (e.clientX - state.current.startX);
  };

  const onPointerEnd = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    state.current.active = false;
    scroller.classList.remove("drag-scrolling");
  };

  return (
    <div className="group/roll" data-cursor>
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory cursor-grab gap-4 overflow-x-auto pb-4 active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onPointerLeave={onPointerEnd}
      >
        {items.map((item, index) =>
          item.src ? (
            item.type === "video" ? (
              <video
                key={index}
                src={item.src}
                muted
                loop
                playsInline
                preload="none"
                className="aspect-[4/3] w-[80%] shrink-0 snap-center rounded-xl border border-gray-500 object-cover sm:w-[60%]"
              >
                <track kind="captions" />
              </video>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={index}
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-[80%] shrink-0 snap-center rounded-xl border border-gray-500 object-cover sm:w-[60%]"
              />
            )
          ) : (
            <div
              key={index}
              className="relative aspect-[4/3] w-[80%] shrink-0 snap-center overflow-hidden rounded-xl border border-gray-500 bg-surface sm:w-[60%]"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: cover }}
              />
              <div
                aria-hidden="true"
                className="grain absolute inset-0 opacity-[0.12] mix-blend-overlay"
              />
              <span className="absolute bottom-4 left-4 font-heading text-xs font-bold uppercase tracking-[0.2em] text-background/70">
                {item.alt}
              </span>
            </div>
          ),
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 text-gray-100 transition-colors duration-300 group-hover/roll:border-accent group-hover/roll:text-accent">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </span>
        <p className="text-xs uppercase tracking-[0.25em] text-gray-100">
          Execution, {client}
        </p>
        <span aria-hidden="true" className="h-1 w-10 bg-brand-gradient" />
      </div>
    </div>
  );
}