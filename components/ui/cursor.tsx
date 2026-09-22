"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const HOVER_SELECTOR = 'a, button, [data-cursor], img, video, [role="button"]';
const NATIVE_CURSOR_SELECTOR = "input, textarea, select";
const VIEW_SELECTOR = "[data-cursor-view]";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const label = labelRef.current;
    if (!dot || !label) return;

    const xTo = gsap.quickTo(dot, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.35, ease: "power3.out" });
    const scaleTo = gsap.quickTo(dot, "scale", { duration: 0.4, ease: "power3.out" });

    gsap.set(dot, { xPercent: -50, yPercent: -50, x: -100, y: -100, scale: 1 });

    const setLabel = (show: boolean) => {
      label.style.opacity = show ? "1" : "0";
    };

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const native = target?.closest?.(NATIVE_CURSOR_SELECTOR);
      if (native) {
        scaleTo(0);
        setLabel(false);
        return;
      }
      const viewable = target?.closest?.(VIEW_SELECTOR);
      if (viewable) {
        dot.classList.add("cursor-view");
        scaleTo(2.6);
        setLabel(true);
        return;
      }
      dot.classList.remove("cursor-view");
      const hoverable = target?.closest?.(HOVER_SELECTOR);
      scaleTo(hoverable ? 2 : 1);
      setLabel(false);
    };

    const onPointerDown = () => scaleTo(0.8);
    const onPointerUp = () => scaleTo(1);

    document.documentElement.classList.add("cursor-hidden");

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      document.documentElement.classList.remove("cursor-hidden");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex h-6 w-6 items-center justify-center rounded-full bg-brand-gradient will-change-transform [&.cursor-view]:border [&.cursor-view]:border-gray-500 [&.cursor-view]:bg-surface/90 [&.cursor-view]:backdrop-blur-sm"
    >
      <span
        ref={labelRef}
        className="font-heading text-[9px] font-bold uppercase leading-none tracking-[0.25em] text-foreground opacity-0 transition-opacity duration-200"
      >
        View
      </span>
    </div>
  );
}