import { Button } from "@/components/ui/button";

export function CtaBand() {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden py-28 sm:min-h-[70vh]">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gradient-animated opacity-30 blur-[160px]" />
        <div className="grain absolute inset-0 opacity-[0.08] mix-blend-overlay" />
      </div>

      <div className="relative flex max-w-4xl flex-col items-center px-6 text-center">
        <h2 className="font-heading text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[1.02] tracking-tight">
          Let&apos;s build something{" "}
          <span className="text-gradient-brand-animated">worth showing.</span>
        </h2>
        <div className="mt-12">
          <Button href="/contact" size="lg" data-cursor>
            Start a Project
          </Button>
        </div>
      </div>
    </section>
  );
}