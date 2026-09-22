"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type FormState = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  message: "",
};

const projectTypes = [
  "Website design",
  "Branding & packaging",
  "Content production",
  "Social media management",
  "Influencer marketing",
  "Performance marketing",
  "Real estate lead generation",
  "Something else",
];

const budgets = [
  "Under $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k – $100k",
  "$100k+",
];

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (!form.name.trim()) errors.name = "Please add your name.";
  if (!form.email.trim()) errors.email = "Please add your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "That email doesn't look right.";
  }
  if (!form.projectType) errors.projectType = "Pick a project type.";
  if (!form.budget) errors.budget = "Select a budget range.";
  if (form.message.trim().length < 10) {
    errors.message = "Give us a little detail (at least 10 characters).";
  }
  return errors;
}

const inputClasses =
  "w-full rounded-lg border border-gray-500 bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-gray-300 focus:border-accent";

const labelClasses = "text-xs uppercase tracking-[0.25em] text-gray-300";

const errorClasses = "mt-1.5 text-xs text-accent";

export function ContactForm() {
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
    if (Object.keys(nextErrors).some((key) => nextErrors[key as keyof Errors]))
      return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-xl border border-gray-500 bg-surface/60 px-6 py-16 text-center">
        <span
          aria-hidden="true"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-2xl font-bold text-background"
        >
          ✓
        </span>
        <h2 className="mt-6 font-heading text-3xl font-bold tracking-tight">
          Message received
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-100">
          Thanks, {form.name.split(" ")[0]}. We&apos;ll get back to you within one
          business day, before anyone else sees this brief.
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-xl border border-gray-500 bg-surface/60 p-6 sm:p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClasses}>
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            className={cn(inputClasses, "mt-3")}
          />
          {errors.name ? <p className={errorClasses}>{errors.name}</p> : null}
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClasses}>
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            className={cn(inputClasses, "mt-3")}
          />
          {errors.email ? <p className={errorClasses}>{errors.email}</p> : null}
        </div>

        <div>
          <label htmlFor="contact-project" className={labelClasses}>
            Project type
          </label>
          <select
            id="contact-project"
            value={form.projectType}
            onChange={(e) => set("projectType", e.target.value)}
            className={cn(inputClasses, "mt-3")}
          >
            <option value="">Select…</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.projectType ? (
            <p className={errorClasses}>{errors.projectType}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-budget" className={labelClasses}>
            Budget range
          </label>
          <select
            id="contact-budget"
            value={form.budget}
            onChange={(e) => set("budget", e.target.value)}
            className={cn(inputClasses, "mt-3")}
          >
            <option value="">Select…</option>
            {budgets.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
          {errors.budget ? (
            <p className={errorClasses}>{errors.budget}</p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className={labelClasses}>
            Message
          </label>
          <textarea
            id="contact-message"
            rows={6}
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={Boolean(errors.message)}
            className={cn(inputClasses, "mt-3 resize-y")}
            placeholder="What are we solving before anyone sees it?"
          />
          {errors.message ? (
            <p className={errorClasses}>{errors.message}</p>
          ) : null}
        </div>
      </div>

      <button
        type="submit"
        data-cursor
        className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-brand-gradient px-7 py-4 text-sm font-medium uppercase tracking-widest text-background transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-auto"
      >
        Send message
      </button>
    </form>
  );
}