import Link from "next/link";
import { ServiceIcon } from "@/components/work/service-icons";
import type { Service } from "@/lib/services";
import { cn } from "@/lib/cn";

type ServiceCardProps = {
  service: Service;
  index: number;
  className?: string;
};

export function ServiceCard({ service, index, className }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      data-cursor
      aria-label={`${service.title}. ${service.tagline}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-500/70 bg-[#0B0B0B] p-7 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-gray-300",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        "[&:hover]:shadow-lifted",
        className,
      )}
    >
      <span className="relative z-10 font-heading text-xs font-bold uppercase tracking-[0.25em] text-gray-100">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative z-10 mt-10 flex h-16 items-center justify-center">
        <div
          aria-hidden="true"
          className="absolute inset-0 scale-150 bg-[radial-gradient(circle_at_center,rgba(232,80,2,0.5),rgba(232,80,2,0.16)_55%,transparent_75%)] opacity-70 blur-xl transition-all duration-500 group-hover:scale-[1.8] group-hover:opacity-100"
        />
        <ServiceIcon
          slug={service.slug}
          className="h-9 w-9 text-[#15110C] transition-transform duration-300 group-hover:scale-110 [filter:drop-shadow(0_2px_0_rgba(0,0,0,0.45))_drop-shadow(0_-1px_0_rgba(249,249,249,0.15))]"
        />
      </div>

      <h3 className="relative z-10 mt-8 font-heading text-xl font-bold uppercase tracking-[0.06em] transition-colors duration-300 group-hover:text-accent md:text-2xl">
        {service.title}
      </h3>
      <p className="relative z-10 mt-2.5 text-sm leading-relaxed text-gray-100">
        {service.tagline}
      </p>
    </Link>
  );
}