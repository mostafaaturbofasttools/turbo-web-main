"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/app/actions/forms";
import { Button } from "@/components/ui/button";
import { RequiredMark } from "@/components/ui/required-mark";
import type { FormActionResult } from "@/lib/schemas";

export function ContactForm() {
  const [state, action, pending] = useActionState(
    async (_prev: FormActionResult | null, formData: FormData) => submitContactForm(formData),
    null,
  );

  if (state?.ok) {
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent/10 p-6 text-center">
        <p className="font-semibold">Message sent. We will get back to you soon.</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <p className="text-xs text-muted">
        Fields marked with <span className="text-accent">*</span> are required.
      </p>
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          Name
          <RequiredMark />
        </label>
        <input id="name" name="name" required className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent" />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Email
          <RequiredMark />
        </label>
        <input id="email" name="email" type="email" required className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent" />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
          <RequiredMark />
        </label>
        <textarea id="message" name="message" required rows={5} className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent" />
      </div>
      {state?.ok === false && state.error.form?.[0] ? (
        <p className="text-sm text-red-400">{state.error.form[0]}</p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
