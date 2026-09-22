import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const sizes = {
  hero: "text-[clamp(3rem,7vw,6.75rem)] leading-[1.02]",
  xl: "text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05]",
  lg: "text-[clamp(1.875rem,3.5vw,3rem)] leading-[1.08]",
  md: "text-[clamp(1.5rem,2.5vw,2.25rem)] leading-[1.12]",
  sm: "text-lg md:text-xl",
  xs: "text-base md:text-lg",
} as const;

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div" | "span";
  size?: keyof typeof sizes;
  split?: boolean;
  className?: string;
  children: ReactNode;
};

function SplitWords({ text }: { text: string }) {
  return (
    <span role="text">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word, index) => (
          <span key={index} className="heading-word">
            <span className="heading-word-inner">{word}</span>
            {index < text.split(" ").length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </span>
    </span>
  );
}

export function Heading({
  as: Tag = "h2",
  size = "md",
  split = false,
  className,
  children,
}: HeadingProps) {
  const content =
    split && typeof children === "string" ? (
      <SplitWords text={children} />
    ) : (
      children
    );

  return (
    <Tag className={cn("font-heading font-bold tracking-tight", sizes[size], className)}>
      {content}
    </Tag>
  );
}