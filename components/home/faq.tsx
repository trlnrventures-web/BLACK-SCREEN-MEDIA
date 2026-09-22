"use client";

import { useId, useState } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { faqs } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="py-24 sm:py-32">
      <Container className="max-w-5xl">
        <Reveal>
          <h2 className="font-heading text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight">
            Before you{" "}
            <span className="text-gradient-brand-animated">ask.</span>
          </h2>
        </Reveal>

        <div className="mt-14 border-t border-gray-500">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            const buttonId = `${baseId}-q-${index}`;
            const panelId = `${baseId}-a-${index}`;

            return (
              <Reveal key={faq.question} delay={index * 0.05}>
                <div className="border-b border-gray-500">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      data-cursor
                      onClick={() => setOpen(isOpen ? null : index)}
                      className="group flex w-full items-center justify-between gap-6 py-7 text-left"
                    >
                      <span
                        className={cn(
                          "font-heading text-xl font-bold tracking-tight transition-colors duration-300 group-hover:text-accent sm:text-3xl",
                          isOpen && "text-accent",
                        )}
                      >
                        {faq.question}
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "block h-9 w-9 shrink-0 rounded-full border border-gray-500 text-gray-100 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-background sm:h-11 sm:w-11",
                          isOpen && "border-accent bg-accent text-background",
                        )}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className={cn(
                            "mx-auto mt-3 transition-transform duration-300 sm:mt-3.5",
                            isOpen && "rotate-45",
                          )}
                        >
                          <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.3" />
                        </svg>
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-500 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-8 text-base leading-relaxed text-gray-100">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}