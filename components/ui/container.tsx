import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const widths = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-[1440px]",
  full: "max-w-none",
} as const;

type ContainerProps = {
  as?: "div" | "section" | "article" | "header" | "footer";
  width?: keyof typeof widths;
  className?: string;
  children: ReactNode;
};

export function Container({
  as: Tag = "div",
  width = "lg",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-6 sm:px-8", widths[width], className)}>
      {children}
    </Tag>
  );
}