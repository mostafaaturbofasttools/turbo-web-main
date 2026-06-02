"use client";

import { useActionState, useEffect } from "react";
import { submitPublishForm } from "@/app/actions/forms";
import { Button } from "@/components/ui/button";
import { FormSuccessPanel } from "@/components/ui/form-success-panel";
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

const FIELD_ORDER = [
  "appName",
  "category",
  "teamSize",
  "stage",
  "appDescription",
  "traction",
  "website",
  "appStoreUrl",
  "playStoreUrl",
  "contactEmail",
  "testFlightLink",
  "revenueShareOpen",
] as const;

function fieldClass(hasError: boolean) {
  return hasError ? `${inputClass} border-red-400/70 focus:border-red-400` : inputClass;
}

export function PublishForm() {
  const [state, action, pending] = useActionState(
    async (_prev: PublishFormActionResult | null, formData: FormData) =>
      submitPublishForm(formData),
    null,
  );

  useEffect(() => {
    if (state?.ok === true) {
      document.getElementById("publish-form-result")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (state?.ok !== false) return;

    const firstField = FIELD_ORDER.find((name) => state.error[name]?.[0]);
    if (firstField) {
      const el = document.getElementById(firstField);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus({ preventScroll: true });
      return;
    }

    if (state.error.form?.[0]) {
      document.querySelector("[data-form-error]")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [state]);

  if (state?.ok) {
    return (
      <FormSuccessPanel
        id="publish-form-result"
        title="Submission received"
        description="Someone from our team will review your app. If it is a match, we will contact you within 7 business days."
      />
    );
  }

  const values = state?.ok === false ? state.values : emptyPublishFormValues;
  const formKey = state?.ok === false ? state.attemptId : "initial";
  const hasError = (name: string) => state?.ok === false && Boolean(state.error[name]?.[0]);

  const fieldError = (name: string) =>
    state?.ok === false && state.error[name]?.[0] ? (
      <p id={`${name}-error`} role="alert" className="mt-1 text-xs text-red-400">
        {state.error[name]?.[0]}
      </p>
    ) : null;

  const fieldProps = (name: string) =>
    hasError(name)
      ? { "aria-invalid": true as const, "aria-describedby": `${name}-error` }
      : {};

  return (
    <form key={formKey} action={action} noValidate className="space-y-4">
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
            className={fieldClass(hasError("appName"))}
            {...fieldProps("appName")}
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
            className={fieldClass(hasError("category"))}
            {...fieldProps("category")}
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
            className={fieldClass(hasError("teamSize"))}
            {...fieldProps("teamSize")}
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
            className={fieldClass(hasError("stage"))}
            {...fieldProps("stage")}
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
            className={fieldClass(hasError("appDescription"))}
            {...fieldProps("appDescription")}
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
            className={fieldClass(hasError("traction"))}
            {...fieldProps("traction")}
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
              type="text"
              inputMode="url"
              autoComplete="url"
              defaultValue={values.website}
              placeholder="https://yourapp.com"
              className={fieldClass(hasError("website"))}
              {...fieldProps("website")}
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
              type="text"
              inputMode="url"
              defaultValue={values.appStoreUrl}
              placeholder="https://apps.apple.com/..."
              className={fieldClass(hasError("appStoreUrl"))}
              {...fieldProps("appStoreUrl")}
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
              type="text"
              inputMode="url"
              defaultValue={values.playStoreUrl}
              placeholder="https://play.google.com/store/apps/..."
              className={fieldClass(hasError("playStoreUrl"))}
              {...fieldProps("playStoreUrl")}
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
            type="text"
            inputMode="email"
            autoComplete="email"
            required
            defaultValue={values.contactEmail}
            className={fieldClass(hasError("contactEmail"))}
            {...fieldProps("contactEmail")}
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
            type="text"
            inputMode="url"
            defaultValue={values.testFlightLink}
            placeholder="https://testflight.apple.com/..."
            className={fieldClass(hasError("testFlightLink"))}
            {...fieldProps("testFlightLink")}
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
            className={fieldClass(hasError("revenueShareOpen"))}
            {...fieldProps("revenueShareOpen")}
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
        <p data-form-error role="alert" className="text-sm text-red-400">
          {state.error.form[0]}
        </p>
      ) : null}

      <Button type="submit" disabled={pending} size="lg">
        {pending ? "Submitting..." : "Submit your app"}
      </Button>
    </form>
  );
}
