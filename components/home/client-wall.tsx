import Image from "next/image";
import type { CSSProperties } from "react";
import type { ClientLogo } from "@/lib/clients";
import { clientLogos } from "@/lib/clients";

function LogoRow({ items }: { items: ClientLogo[] }) {
  return (
    <div aria-hidden="true" className="flex w-max shrink-0 items-center">
      {[...items, ...items, ...items, ...items].map((logo, index) => (
        <div key={`${logo.src}-${index}`} className="flex items-center">
          <span className="px-8">
            <Image
              src={logo.src}
              alt={logo.label}
              width={190}
              height={80}
              unoptimized
              className="h-10 w-auto max-w-[160px] object-contain opacity-50 saturate-0 brightness-0 invert transition-opacity duration-300 hover:opacity-100 sm:h-12"
            />
          </span>
          <span
            aria-hidden="true"
            className="h-2 w-2 shrink-0 rotate-45 bg-gray-500"
          />
        </div>
      ))}
    </div>
  );
}

export function ClientWall() {
  return (
    <section className="overflow-hidden border-y border-gray-500 bg-background py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <h2 className="font-heading text-[clamp(1.875rem,3.5vw,3rem)] font-bold leading-[1.08] tracking-tight">
          Trusted across <span className="text-gradient-brand-animated">30+ real estate projects</span>,{" "}
          and counting.
        </h2>
        <p className="mt-4 text-xs uppercase tracking-[0.25em] text-gray-300">
          Placeholder labels; real client names to be mapped to logos
        </p>
      </div>

      <div className="mt-14 flex flex-col gap-6">
        <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div
            className="marquee-track flex w-max"
            style={{ "--marquee-duration": "44s" } as CSSProperties}
          >
            <LogoRow items={clientLogos} />
          </div>
        </div>
        <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div
            className="marquee-track marquee-reverse flex w-max"
            style={{ "--marquee-duration": "50s" } as CSSProperties}
          >
            <LogoRow items={clientLogos.slice().reverse()} />
          </div>
        </div>
      </div>
    </section>
  );
}