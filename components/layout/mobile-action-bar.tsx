"use client";

import { usePathname } from "next/navigation";
import { whatsappLink } from "@/lib/site";

const HIDDEN_ROUTES = new Set(["/contact", "/admin", "/admin/login"]);

export function MobileActionBar() {
  const pathname = usePathname();

  if (HIDDEN_ROUTES.has(pathname)) return null;

  return (
    <>
      <div aria-hidden="true" className="h-20 md:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-[500] border-t border-gray-500 bg-background/90 backdrop-blur-sm md:hidden">
        <div className="grid grid-cols-2 gap-px">
          <a
            href="tel:+917758880078"
            data-cursor
            className="flex items-center justify-center gap-2 bg-background py-4 text-sm font-semibold uppercase tracking-widest text-foreground transition-colors active:bg-surface"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6.6 3.5c.5 0 1 .3 1.2.8l1.2 3c.2.5.1 1.1-.3 1.5L7.4 9.7a12 12 0 0 0 3.5 5 12 12 0 0 0 2 .7l1.4-1.4c.4-.4 1-.5 1.5-.3l3 1.2c.5.2.8.7.8 1.2v2.5c0 .6-.4 1-1 1A13 13 0 0 1 5.5 6.5c0-.6.4-1 1-1z"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
            Call
          </a>
          <a
            href={whatsappLink(
              "Hi Black Screen Media — I found you on the website and I'd like to talk.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="flex items-center justify-center gap-2 bg-brand-gradient py-4 text-sm font-semibold uppercase tracking-widest text-background transition-opacity active:opacity-80"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 5-1.3A10 10 0 1 0 12 2zm5.2 13.8c-.2.6-1 1.1-1.7 1.2-.4.1-1 .1-1.6-.1a10 10 0 0 1-.8-.3c-1.9-.8-3.8-2.3-5-4.5-.4-.7-.8-1.6-.8-2.4 0-.9.5-1.9 1.1-2.3.3-.2.5-.3.7-.3h.5c.1 0 .3 0 .5.4l.7 1.6c.1.2.1.4 0 .5l-.5.7c-.1.1-.2.3-.1.5.3.5 1 1.3 1.9 1.9.9.6 1.4.8 1.7.9.2 0 .4 0 .5-.2l.7-.9c.2-.2.4-.3.6-.2l1.5.7c.3.1.6.3.6.5-.1.2 0 .6-.1 1z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}