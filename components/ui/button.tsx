import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium tracking-wide transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary: "bg-brand-gradient text-background shadow-soft hover:shadow-lifted hover:opacity-90",
  ghost:
    "border border-gray-500 text-foreground hover:border-accent hover:text-accent hover:bg-surface",
} as const;

const sizes = {
  sm: "px-5 py-2.5 text-xs uppercase tracking-widest",
  md: "px-7 py-3 text-sm",
  lg: "px-9 py-4 text-base",
} as const;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    className?: string;
    children: ReactNode;
    href?: string;
  };

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  type = "button",
  disabled,
  onClick,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}