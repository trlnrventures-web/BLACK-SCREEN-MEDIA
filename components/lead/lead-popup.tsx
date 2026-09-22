"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/cn";

const SESSION_KEY = "bsm_lead_popup";

type PopupState = "idle" | "closed" | "submitted";

type LeadFormState = {
  name: string;
  contact: string;
  vertical: "" | "Real Estate" | "D2C Brand";
};

type Errors = Partial<Record<keyof LeadFormState, string>>;

const initialForm: LeadFormState = { name: "", contact: "", vertical: "" };

function loadState(): PopupState {
  if (typeof window === "undefined") return "idle";
  const saved = window.sessionStorage.getItem(SESSION_KEY);
  if (saved === "closed" || saved === "submitted") return saved;
  return "idle";
}

function saveState(state: Exclude<PopupState, "idle">) {
  window.sessionStorage.setItem(SESSION_KEY, state);
}

export function LeadPopup() {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState<LeadFormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});

  const stateRef = useRef<PopupState>("idle");

  useEffect(() => {
    stateRef.current = loadState();
    if (stateRef.current !== "idle") return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const openOnce = () => {
      if (stateRef.current !== "idle") return;
      stateRef.current = "closed";
      saveState("closed");
      setVisible(true);
    };

    if (coarse) {
      const onScroll = () => {
        const doc = document.documentElement;
        const progress =
          window.scrollY / Math.max(1, doc.scrollHeight - window.innerHeight);
        if (progress >= 0.6) {
          window.removeEventListener("scroll", onScroll);
          openOnce();
        }
      };
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }

    if (reduced) {
      const timeout = window.setTimeout(openOnce, 2500);
      return () => window.clearTimeout(timeout);
    }

    const onMouseLeave = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 0) openOnce();
    };
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    return () =>
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
  }, []);

  const dismiss = useCallback(() => {
    stateRef.current = "closed";
    saveState("closed");
    setVisible(false);
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    },
    [dismiss],
  );

  useEffect(() => {
    if (visible) {
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }
  }, [visible, onKeyDown]);

  if (!visible) return null;

  const set = (field: keyof LeadFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors: Errors = {};
    if (!form.name.trim()) nextErrors.name = "Please add your name.";
    const contact = form.contact.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
    const isPhone = /^[+\d][\d\s-]{7,14}$/.test(contact);
    if (!contact) nextErrors.contact = "Add a phone number or email.";
    else if (!isEmail && !isPhone)
      nextErrors.contact = "That doesn't look like a phone or email.";
    if (!form.vertical) nextErrors.vertical = "Pick your vertical.";
    setErrors(nextErrors);
    if (Object.values(nextErrors).length) return;

    const message = [
      "Hi Black Screen Media — I'd like a free content audit for my project.",
      `Name: ${form.name.trim()}`,
      `Contact: ${form.contact.trim()}`,
      `Vertical: ${form.vertical}`,
    ].join("\n");

    stateRef.current = "submitted";
    saveState("submitted");
    setVisible(false);
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  };

  const inputClasses =
    "w-full rounded-lg border border-gray-500 bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-gray-300 focus:border-accent";
  const labelClasses = "text-xs uppercase tracking-[0.25em] text-gray-300";

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-popup-title"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gray-500 bg-surface shadow-lifted">
        <div
          aria-hidden="true"
          className="bg-brand-gradient pointer-events-none absolute inset-x-0 top-0 h-1"
        />

        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          data-cursor
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-gray-500 text-gray-100 transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          ✕
        </button>

        <div className="p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
            Before it&apos;s seen
          </p>
          <h2
            id="lead-popup-title"
            className="mt-3 font-heading text-2xl font-bold leading-tight tracking-tight"
          >
            Get a free content audit for your project.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-100">
            We&apos;ll show you exactly how we&apos;d generate leads for your
            brand — from how Mansarovar Group stays in front of buyers all year
            to how Akmas went 0 to ₹50L in 9 months.
          </p>

          <form noValidate onSubmit={onSubmit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="lead-name" className={labelClasses}>
                Name
              </label>
              <input
                id="lead-name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                aria-invalid={Boolean(errors.name)}
                className={cn(inputClasses, "mt-2")}
              />
              {errors.name ? (
                <p className="mt-1.5 text-xs text-accent">{errors.name}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="lead-contact" className={labelClasses}>
                Phone or email
              </label>
              <input
                id="lead-contact"
                type="text"
                autoComplete="tel"
                value={form.contact}
                onChange={(e) => set("contact", e.target.value)}
                aria-invalid={Boolean(errors.contact)}
                className={cn(inputClasses, "mt-2")}
                placeholder="+91 ... or you@email.com"
              />
              {errors.contact ? (
                <p className="mt-1.5 text-xs text-accent">{errors.contact}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="lead-vertical" className={labelClasses}>
                Your vertical
              </label>
              <select
                id="lead-vertical"
                value={form.vertical}
                onChange={(e) => set("vertical", e.target.value)}
                aria-invalid={Boolean(errors.vertical)}
                className={cn(inputClasses, "mt-2")}
              >
                <option value="">Select…</option>
                <option value="Real Estate">Real estate developer</option>
                <option value="D2C Brand">D2C brand</option>
              </select>
              {errors.vertical ? (
                <p className="mt-1.5 text-xs text-accent">{errors.vertical}</p>
              ) : null}
            </div>

            <button
              type="submit"
              data-cursor
              className="inline-flex w-full items-center justify-center rounded-full bg-brand-gradient px-7 py-4 text-sm font-medium uppercase tracking-widest text-background transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Claim my audit
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-300">
            One tap — we reply within one business day.
          </p>
        </div>
      </div>
    </div>
  );
}