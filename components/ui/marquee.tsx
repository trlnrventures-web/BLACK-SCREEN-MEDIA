import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

type MarqueeProps = {
  items: string[];
  reverse?: boolean;
  duration?: number;
  size?: "sm" | "lg";
  className?: string;
};

type MarqueeRowProps = {
  items: string[];
  size: "sm" | "lg";
  ariaHidden?: boolean;
};

function MarqueeRow({ items, size, ariaHidden = false }: MarqueeRowProps) {
  return (
    <ul
      aria-hidden={ariaHidden ? "true" : undefined}
      className="flex w-max shrink-0 items-center"
    >
      {items.map((item, index) => (
        <li key={index} className="flex items-center">
          <span
            className={cn(
              "font-heading font-bold tracking-tight",
              size === "sm"
                ? "px-6 text-sm uppercase tracking-[0.3em] text-gray-300"
                : "px-7 text-5xl font-bold uppercase tracking-tight text-foreground sm:text-6xl md:text-7xl",
            )}
          >
            {item}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "shrink-0 rotate-45 bg-brand-gradient",
              size === "sm" ? "h-1.5 w-1.5" : "h-3 w-3",
            )}
          />
        </li>
      ))}
    </ul>
  );
}

export function Marquee({
  items,
  reverse = false,
  duration = 28,
  size = "lg",
  className,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]",
        className,
      )}
    >
      <div
        className={cn("marquee-track flex w-max", reverse && "marquee-reverse")}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <MarqueeRow items={items} size={size} />
        <MarqueeRow items={items} size={size} ariaHidden />
      </div>
    </div>
  );
}