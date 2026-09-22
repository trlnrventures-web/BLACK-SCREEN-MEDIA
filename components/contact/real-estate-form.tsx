"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/cn";

type FormState = {
  name: string;
  contact: string;
  project: string;
  location: string;
  budget: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: "",
  contact: "",
  project: "",
  location: "",
  budget: "",
};

const budgets = [
  "Under ₹25L",
  "₹25L – ₹75L",
  "₹75L – ₹1.5Cr",
  "₹1.5Cr+",
  "Not sure yet",
];

const inputClasses =
  "w-full rounded-lg border border-gray-500 bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-gray-300 focus:border-accent";
const labelClasses = "text-xs uppercase tracking-[0.25em] text-gray-300";

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (!form.name.trim()) errors.name = "Please add your name.";
  const contact = form.contact.trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  const isPhone = /^[+\d][\d\s-]{7,14}$/.test(contact);
  if (!contact) errors.contact = "Add a phone number or email.";
  else if (!isEmail && !isPhone)
    errors.contact = "That doesn't look like a phone or email.";
  if (!form.project.trim()) errors.project = "Add the project name.";
  if (!form.location.trim()) errors.location = "Add the project location.";
  if (!form.budget) errors.budget = "Select a budget/scale range.";
  return errors;
}

export function RealEstateForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.values(nextErrors).length) return;

    const message = [
      "Hi Black Screen Media — new real estate project enquiry.",
      `Name: ${form.name.trim()}`,
      `Contact: ${form.contact.trim()}`,
      `Project: ${form.project.trim()}`,
      `Location: ${form.location.trim()}`,
      `Budget/Scale: ${form.budget}`,
    ].join("\n");

    setSubmitted(true);
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-gray-500 bg-surface/60 px-6 py-16 text-center">
        <span
          aria-hidden="true"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-2xl font-bold text-background"
        >
          ✓
        </span>
        <h2 className="mt-6 font-heading text-3xl font-bold tracking-tight">
          Enquiry sent
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-100">
          Thanks, {form.name.split(" ")[0]}. Your enquiry opens in WhatsApp —
          our sales team replies within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="rounded-xl border border-gray-500 bg-surface/60 p-6 sm:p-8"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="re-name" className={labelClasses}>
            Name
          </label>
          <input
            id="re-name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            className={cn(inputClasses, "mt-3")}
          />
          {errors.name ? <p className="mt-1.5 text-xs text-accent">{errors.name}</p> : null}
        </div>

        <div>
          <label htmlFor="re-contact" className={labelClasses}>
            Phone or email
          </label>
          <input
            id="re-contact"
            type="text"
            autoComplete="tel"
            value={form.contact}
            onChange={(e) => set("contact", e.target.value)}
            aria-invalid={Boolean(errors.contact)}
            className={cn(inputClasses, "mt-3")}
            placeholder="+91 ... or you@developer.com"
          />
          {errors.contact ? <p className="mt-1.5 text-xs text-accent">{errors.contact}</p> : null}
        </div>

        <div>
          <label htmlFor="re-project" className={labelClasses}>
            Project name
          </label>
          <input
            id="re-project"
            type="text"
            autoComplete="off"
            value={form.project}
            onChange={(e) => set("project", e.target.value)}
            aria-invalid={Boolean(errors.project)}
            className={cn(inputClasses, "mt-3")}
            placeholder="e.g. Pearl Gardens"
          />
          {errors.project ? <p className="mt-1.5 text-xs text-accent">{errors.project}</p> : null}
        </div>

        <div>
          <label htmlFor="re-location" className={labelClasses}>
            Location
          </label>
          <input
            id="re-location"
            type="text"
            autoComplete="off"
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            aria-invalid={Boolean(errors.location)}
            className={cn(inputClasses, "mt-3")}
            placeholder="e.g. Vasai-Virar, Mumbai"
          />
          {errors.location ? <p className="mt-1.5 text-xs text-accent">{errors.location}</p> : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="re-budget" className={labelClasses}>
            Budget / scale
          </label>
          <select
            id="re-budget"
            value={form.budget}
            onChange={(e) => set("budget", e.target.value)}
            aria-invalid={Boolean(errors.budget)}
            className={cn(inputClasses, "mt-3")}
          >
            <option value="">Select…</option>
            {budgets.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
          {errors.budget ? <p className="mt-1.5 text-xs text-accent">{errors.budget}</p> : null}
        </div>
      </div>

      <button
        type="submit"
        data-cursor
        className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-brand-gradient px-7 py-4 text-sm font-medium uppercase tracking-widest text-background transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Send project enquiry
      </button>
      <p className="mt-4 text-center text-xs text-gray-300">
        Opens WhatsApp so nothing gets lost between forms and follow-ups.
      </p>
    </form>
  );
}