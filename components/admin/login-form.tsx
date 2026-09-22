"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions";
import { cn } from "@/lib/cn";

const inputClasses =
  "mt-3 w-full rounded-lg border border-gray-500 bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-gray-300 focus:border-accent";
const labelClasses = "text-xs uppercase tracking-[0.25em] text-gray-300";
const errorClasses = "mt-1.5 text-xs text-accent";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form
      action={action}
      className="rounded-xl border border-gray-500 bg-surface/60 p-6 sm:p-8"
    >
      <div>
        <label htmlFor="admin-password" className={labelClasses}>
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={cn(inputClasses)}
        />
        {state?.error ? <p className={errorClasses}>{state.error}</p> : null}
      </div>
      <button
        type="submit"
        disabled={pending}
        data-cursor
        className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-brand-gradient px-7 py-4 text-sm font-medium uppercase tracking-widest text-background transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
