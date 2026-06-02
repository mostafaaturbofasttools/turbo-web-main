"use server";

import { Resend } from "resend";
import { contactFormSchema, publishFormSchema, type FormActionResult } from "@/lib/schemas";
import { checkRateLimit } from "@/lib/submissions/rate-limit";
import { saveSubmission } from "@/lib/submissions";

async function sendEmail(subject: string, body: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.SUBMISSIONS_EMAIL_TO ?? "info@turbofasttools.com";
  const from = process.env.RESEND_FROM ?? "TRBO Website <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY not set — no email sent for:", subject);
    return false;
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    subject,
    text: body,
  });

  if (error) {
    console.error("[email] Resend delivery failed:", error);
    return false;
  }

  return true;
}

async function persistSubmission(payload: Parameters<typeof saveSubmission>[0]): Promise<boolean> {
  if (!process.env.AZURE_STORAGE_CONNECTION_STRING) {
    console.warn("[submission] AZURE_STORAGE_CONNECTION_STRING not set — not saved to blob storage");
    return false;
  }

  await saveSubmission(payload);
  return true;
}

function submissionUnavailable() {
  return {
    ok: false as const,
    error: {
      form: [
        "We could not save your submission right now. Please email info@turbofasttools.com directly.",
      ],
    },
  };
}

export async function submitPublishForm(formData: FormData): Promise<FormActionResult> {
  const parsed = publishFormSchema.safeParse({
    appName: formData.get("appName"),
    appDescription: formData.get("appDescription"),
    category: formData.get("category"),
    teamSize: formData.get("teamSize"),
    stage: formData.get("stage"),
    traction: formData.get("traction"),
    website: formData.get("website"),
    appStoreUrl: formData.get("appStoreUrl"),
    playStoreUrl: formData.get("playStoreUrl"),
    contactEmail: formData.get("contactEmail"),
  });

  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.flatten().fieldErrors };
  }

  const email = parsed.data.contactEmail;
  if (!(await checkRateLimit(`publish:${email}`))) {
    return { ok: false as const, error: { form: ["Please wait a minute before submitting again."] } };
  }

  const payload = {
    type: "publish" as const,
    submittedAt: new Date().toISOString(),
    data: Object.fromEntries(Object.entries(parsed.data).map(([k, v]) => [k, String(v)])),
  };

  const body = Object.entries(parsed.data)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  const [saved, emailed] = await Promise.all([
    persistSubmission(payload),
    sendEmail(`New app submission: ${parsed.data.appName}`, body),
  ]);

  if (process.env.NODE_ENV === "production" && !saved && !emailed) {
    return submissionUnavailable();
  }

  return { ok: true as const };
}

export async function submitContactForm(formData: FormData): Promise<FormActionResult> {
  const parsed = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.flatten().fieldErrors };
  }

  if (!(await checkRateLimit(`contact:${parsed.data.email}`))) {
    return { ok: false as const, error: { form: ["Please wait a minute before submitting again."] } };
  }

  const payload = {
    type: "contact" as const,
    submittedAt: new Date().toISOString(),
    data: Object.fromEntries(Object.entries(parsed.data).map(([k, v]) => [k, String(v)])),
  };

  const body = `Name: ${parsed.data.name}\nEmail: ${parsed.data.email}\n\n${parsed.data.message}`;

  const [saved, emailed] = await Promise.all([
    persistSubmission(payload),
    sendEmail(`Contact from ${parsed.data.name}`, body),
  ]);

  if (process.env.NODE_ENV === "production" && !saved && !emailed) {
    return submissionUnavailable();
  }

  return { ok: true as const };
}
