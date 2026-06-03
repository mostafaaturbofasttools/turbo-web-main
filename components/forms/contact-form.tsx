"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/app/actions/forms";
import { Button } from "@/components/ui/button";
import { RequiredMark } from "@/components/ui/required-mark";
import { contactTopics, type ContactFormActionResult } from "@/lib/schemas";

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent";

const emptyContactValues = { topic: "", name: "", email: "", message: "" };

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
  const hasTopicError = state?.ok === false && Boolean(state.error.topic?.[0]);

  return (
    <form key={formKey} action={action} noValidate className="space-y-4">
      <p className="text-xs text-muted">
        Fields marked with <span className="text-accent">*</span> are required.
      </p>
      <div>
        <label htmlFor="topic" className="mb-1.5 block text-sm font-medium">
          I am contacting about
          <RequiredMark />
        </label>
        <select
          id="topic"
          name="topic"
          required
          defaultValue={values.topic}
          className={hasTopicError ? `${inputClass} border-red-400/70` : inputClass}
          aria-invalid={hasTopicError || undefined}
        >
          <option value="" disabled>
            Select a topic
          </option>
          {contactTopics.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {state?.ok === false && state.error.topic?.[0] ? (
          <p className="mt-1 text-sm text-red-400">{state.error.topic[0]}</p>
        ) : null}
      </div>
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
          className={inputClass}
        />
        {state?.ok === false && state.error.name?.[0] ? (
          <p className="mt-1 text-sm text-red-400">{state.error.name[0]}</p>
        ) : null}
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Email
          <RequiredMark />
        </label>
        <input
          id="email"
          name="email"
          type="text"
          inputMode="email"
          autoComplete="email"
          required
          defaultValue={values.email}
          className={inputClass}
        />
        {state?.ok === false && state.error.email?.[0] ? (
          <p className="mt-1 text-sm text-red-400">{state.error.email[0]}</p>
        ) : null}
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
          className={inputClass}
        />
        {state?.ok === false && state.error.message?.[0] ? (
          <p className="mt-1 text-sm text-red-400">{state.error.message[0]}</p>
        ) : null}
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
