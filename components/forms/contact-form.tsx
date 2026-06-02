"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/app/actions/forms";
import { Button } from "@/components/ui/button";
import { RequiredMark } from "@/components/ui/required-mark";
import type { ContactFormActionResult } from "@/lib/schemas";

const emptyContactValues = { name: "", email: "", message: "" };

export function ContactForm() {
  const [state, action, pending] = useActionState(
    async (_prev: ContactFormActionResult | null, formData: FormData) =>
      submitContactForm(formData),
    null,
  );

  if (state?.ok) {
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent/10 p-6 text-center">
        <p className="font-semibold">Message sent. We will get back to you soon.</p>
      </div>
    );
  }

  const values = state?.ok === false ? state.values : emptyContactValues;
  const formKey = state?.ok === false ? JSON.stringify(values) : "initial";

  return (
    <form key={formKey} action={action} className="space-y-4">
      <p className="text-xs text-muted">
        Fields marked with <span className="text-accent">*</span> are required.
      </p>
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          Name
          <RequiredMark />
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={values.name}
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Email
          <RequiredMark />
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          defaultValue={values.email}
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
          <RequiredMark />
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          defaultValue={values.message}
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
        />
      </div>
      {state?.ok === false && state.error.form?.[0] ? (
        <p className="text-sm text-red-400">{state.error.form[0]}</p>
      ) : null}
      {state?.ok === false && state.error.name?.[0] ? (
        <p className="text-sm text-red-400">{state.error.name[0]}</p>
      ) : null}
      {state?.ok === false && state.error.email?.[0] ? (
        <p className="text-sm text-red-400">{state.error.email[0]}</p>
      ) : null}
      {state?.ok === false && state.error.message?.[0] ? (
        <p className="text-sm text-red-400">{state.error.message[0]}</p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
