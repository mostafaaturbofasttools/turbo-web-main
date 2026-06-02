"use client";

import { useActionState } from "react";
import { submitPublishForm } from "@/app/actions/forms";
import { Button } from "@/components/ui/button";
import type { FormActionResult } from "@/lib/schemas";
import { publishStages } from "@/lib/schemas";

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent";

export function PublishForm() {
  const [state, action, pending] = useActionState(
    async (_prev: FormActionResult | null, formData: FormData) => submitPublishForm(formData),
    null,
  );

  if (state?.ok) {
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent/10 p-8 text-center">
        <h3 className="text-xl font-bold">Submission received</h3>
        <p className="mt-2 text-muted">Thank you. Our team will review your app and get back to you.</p>
      </div>
    );
  }

  const fieldError = (name: string) =>
    state?.ok === false && state.error[name]?.[0] ? (
      <p className="mt-1 text-xs text-red-400">{state.error[name]?.[0]}</p>
    ) : null;

  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="appName" className="mb-1.5 block text-sm font-medium">
            App name
          </label>
          <input id="appName" name="appName" type="text" required className={inputClass} />
          {fieldError("appName")}
        </div>

        <div>
          <label htmlFor="category" className="mb-1.5 block text-sm font-medium">
            Category
          </label>
          <input id="category" name="category" type="text" required className={inputClass} />
          {fieldError("category")}
        </div>

        <div>
          <label htmlFor="teamSize" className="mb-1.5 block text-sm font-medium">
            Team size
          </label>
          <input id="teamSize" name="teamSize" type="text" required className={inputClass} />
          {fieldError("teamSize")}
        </div>

        <div>
          <label htmlFor="stage" className="mb-1.5 block text-sm font-medium">
            App stage
          </label>
          <select id="stage" name="stage" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select stage
            </option>
            {publishStages.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          {fieldError("stage")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="appDescription" className="mb-1.5 block text-sm font-medium">
            What is your app about?
          </label>
          <textarea id="appDescription" name="appDescription" required rows={4} className={inputClass} />
          {fieldError("appDescription")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="traction" className="mb-1.5 block text-sm font-medium">
            Where is the app today?
          </label>
          <textarea
            id="traction"
            name="traction"
            required
            rows={3}
            placeholder="e.g. Pre-launch with a playable build, beta with 500 testers, or live with growing installs."
            className={inputClass}
          />
          {fieldError("traction")}
        </div>

        <div className="sm:col-span-2 space-y-3">
          <div>
            <p className="text-sm font-medium">Links</p>
            <p className="mt-1 text-xs text-muted">
              At least one is required. Use a full https URL. Leave any field blank if it does not apply yet.
            </p>
          </div>

          <div>
            <label htmlFor="website" className="mb-1.5 block text-sm font-medium">
              Website
            </label>
            <input
              id="website"
              name="website"
              type="url"
              placeholder="https://yourapp.com"
              className={inputClass}
            />
            {fieldError("website")}
          </div>

          <div>
            <label htmlFor="appStoreUrl" className="mb-1.5 block text-sm font-medium">
              App Store link
            </label>
            <input
              id="appStoreUrl"
              name="appStoreUrl"
              type="url"
              placeholder="https://apps.apple.com/..."
              className={inputClass}
            />
            {fieldError("appStoreUrl")}
          </div>

          <div>
            <label htmlFor="playStoreUrl" className="mb-1.5 block text-sm font-medium">
              Google Play link
            </label>
            <input
              id="playStoreUrl"
              name="playStoreUrl"
              type="url"
              placeholder="https://play.google.com/store/apps/..."
              className={inputClass}
            />
            {fieldError("playStoreUrl")}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contactEmail" className="mb-1.5 block text-sm font-medium">
            Contact email
          </label>
          <input id="contactEmail" name="contactEmail" type="email" required className={inputClass} />
          {fieldError("contactEmail")}
        </div>
      </div>

      {state?.ok === false && state.error.form?.[0] ? (
        <p className="text-sm text-red-400">{state.error.form[0]}</p>
      ) : null}

      <Button type="submit" disabled={pending} size="lg">
        {pending ? "Submitting..." : "Submit your app"}
      </Button>
    </form>
  );
}
