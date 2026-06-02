"use client";

import { useActionState } from "react";
import { submitPublishForm } from "@/app/actions/forms";
import { Button } from "@/components/ui/button";
import { RequiredMark } from "@/components/ui/required-mark";
import {
  emptyPublishFormValues,
  publishCategories,
  publishHelpOptions,
  publishStages,
  publishTeamSizes,
  type PublishFormActionResult,
} from "@/lib/schemas";

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent";

export function PublishForm() {
  const [state, action, pending] = useActionState(
    async (_prev: PublishFormActionResult | null, formData: FormData) =>
      submitPublishForm(formData),
    null,
  );

  if (state?.ok) {
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent/10 p-8 text-center">
        <h3 className="text-xl font-bold">Submission received</h3>
        <p className="mt-2 text-muted">
          Someone from our team will review your app. If it is a match, we will contact you within 7
          business days.
        </p>
      </div>
    );
  }

  const values = state?.ok === false ? state.values : emptyPublishFormValues;
  const formKey = state?.ok === false ? state.attemptId : "initial";

  const fieldError = (name: string) =>
    state?.ok === false && state.error[name]?.[0] ? (
      <p className="mt-1 text-xs text-red-400">{state.error[name]?.[0]}</p>
    ) : null;

  return (
    <form key={formKey} action={action} className="space-y-4">
      <p className="text-xs text-muted">
        Fields marked with <span className="text-accent">*</span> are required.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="appName" className="mb-1.5 block text-sm font-medium">
            App name
            <RequiredMark />
          </label>
          <input
            id="appName"
            name="appName"
            type="text"
            required
            defaultValue={values.appName}
            className={inputClass}
          />
          {fieldError("appName")}
        </div>

        <div>
          <label htmlFor="category" className="mb-1.5 block text-sm font-medium">
            Category
            <RequiredMark />
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue={values.category}
            className={inputClass}
          >
            <option value="" disabled>
              Select category
            </option>
            {publishCategories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          {fieldError("category")}
        </div>

        <div>
          <label htmlFor="teamSize" className="mb-1.5 block text-sm font-medium">
            Team size
            <RequiredMark />
          </label>
          <select
            id="teamSize"
            name="teamSize"
            required
            defaultValue={values.teamSize}
            className={inputClass}
          >
            <option value="" disabled>
              Select team size
            </option>
            {publishTeamSizes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          {fieldError("teamSize")}
        </div>

        <div>
          <label htmlFor="stage" className="mb-1.5 block text-sm font-medium">
            App stage
            <RequiredMark />
          </label>
          <select
            id="stage"
            name="stage"
            required
            defaultValue={values.stage}
            className={inputClass}
          >
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
            <RequiredMark />
          </label>
          <textarea
            id="appDescription"
            name="appDescription"
            required
            rows={4}
            defaultValue={values.appDescription}
            className={inputClass}
          />
          {fieldError("appDescription")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="traction" className="mb-1.5 block text-sm font-medium">
            Where is the app today?
            <RequiredMark />
          </label>
          <textarea
            id="traction"
            name="traction"
            required
            rows={3}
            defaultValue={values.traction}
            placeholder="e.g. Pre-launch with a playable build, beta with 500 testers, or live with growing installs."
            className={inputClass}
          />
          {fieldError("traction")}
        </div>

        <div className="sm:col-span-2 space-y-3">
          <div>
            <p className="text-sm font-medium">
              Links
              <RequiredMark />
            </p>
            <p className="mt-1 text-xs text-muted">
              At least one link is required. Use a full https URL. Leave any field blank if it does
              not apply yet.
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
              defaultValue={values.website}
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
              defaultValue={values.appStoreUrl}
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
              defaultValue={values.playStoreUrl}
              placeholder="https://play.google.com/store/apps/..."
              className={inputClass}
            />
            {fieldError("playStoreUrl")}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contactEmail" className="mb-1.5 block text-sm font-medium">
            Contact email
            <RequiredMark />
          </label>
          <input
            id="contactEmail"
            name="contactEmail"
            type="email"
            required
            defaultValue={values.contactEmail}
            className={inputClass}
          />
          {fieldError("contactEmail")}
        </div>

        <div className="sm:col-span-2 border-t border-border pt-4">
          <p className="text-sm font-medium">Optional metrics</p>
          <p className="mt-1 text-xs text-muted">
            Share what you have. These fields help us review faster but are not required.
          </p>
        </div>

        <div>
          <label htmlFor="currentDownloads" className="mb-1.5 block text-sm font-medium">
            Current downloads
          </label>
          <input
            id="currentDownloads"
            name="currentDownloads"
            type="text"
            defaultValue={values.currentDownloads}
            placeholder="e.g. 50K total or 2K MAU"
            className={inputClass}
          />
          {fieldError("currentDownloads")}
        </div>

        <div>
          <label htmlFor="monthlyRevenue" className="mb-1.5 block text-sm font-medium">
            Monthly revenue
          </label>
          <input
            id="monthlyRevenue"
            name="monthlyRevenue"
            type="text"
            defaultValue={values.monthlyRevenue}
            placeholder="e.g. $5K MRR or pre-revenue"
            className={inputClass}
          />
          {fieldError("monthlyRevenue")}
        </div>

        <div>
          <label htmlFor="d1Retention" className="mb-1.5 block text-sm font-medium">
            D1 retention
          </label>
          <input
            id="d1Retention"
            name="d1Retention"
            type="text"
            defaultValue={values.d1Retention}
            placeholder="e.g. 35%"
            className={inputClass}
          />
          {fieldError("d1Retention")}
        </div>

        <div>
          <label htmlFor="d7Retention" className="mb-1.5 block text-sm font-medium">
            D7 retention
          </label>
          <input
            id="d7Retention"
            name="d7Retention"
            type="text"
            defaultValue={values.d7Retention}
            placeholder="e.g. 12%"
            className={inputClass}
          />
          {fieldError("d7Retention")}
        </div>

        <div>
          <label htmlFor="cpiCacTested" className="mb-1.5 block text-sm font-medium">
            CPI / CAC tested
          </label>
          <input
            id="cpiCacTested"
            name="cpiCacTested"
            type="text"
            defaultValue={values.cpiCacTested}
            placeholder="e.g. $1.20 CPI on Meta"
            className={inputClass}
          />
          {fieldError("cpiCacTested")}
        </div>

        <div>
          <label htmlFor="targetCountries" className="mb-1.5 block text-sm font-medium">
            Target countries
          </label>
          <input
            id="targetCountries"
            name="targetCountries"
            type="text"
            defaultValue={values.targetCountries}
            placeholder="e.g. US, CA, UK"
            className={inputClass}
          />
          {fieldError("targetCountries")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="testFlightLink" className="mb-1.5 block text-sm font-medium">
            TestFlight / APK link
          </label>
          <input
            id="testFlightLink"
            name="testFlightLink"
            type="url"
            defaultValue={values.testFlightLink}
            placeholder="https://testflight.apple.com/..."
            className={inputClass}
          />
          {fieldError("testFlightLink")}
        </div>

        <div className="sm:col-span-2">
          <p className="mb-2 text-sm font-medium">Help needed (optional)</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {publishHelpOptions.map((option) => (
              <label key={option.value} className="flex items-center gap-2 text-sm text-muted">
                <input
                  type="checkbox"
                  name="helpNeeded"
                  value={option.value}
                  defaultChecked={values.helpNeeded.includes(option.value)}
                  className="rounded border-border bg-surface"
                />
                {option.label}
              </label>
            ))}
          </div>
          {fieldError("helpNeeded")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="revenueShareOpen" className="mb-1.5 block text-sm font-medium">
            Open to revenue share?
            <RequiredMark />
          </label>
          <select
            id="revenueShareOpen"
            name="revenueShareOpen"
            required
            defaultValue={values.revenueShareOpen}
            className={inputClass}
          >
            <option value="" disabled>
              Select one
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {fieldError("revenueShareOpen")}
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
