"use server";

import { Resend } from "resend";
import {
  contactFormSchema,
  contactTopicLabel,
  parsePublishFormValues,
  publishFormSchema,
  type ContactFormActionResult,
  type FormFieldErrors,
  type PublishFormActionResult,
} from "@/lib/schemas";
import { formatResendError, getResendConfig } from "@/lib/resend-config";
import { checkRateLimit } from "@/lib/submissions/rate-limit";
import { saveSubmission } from "@/lib/submissions";

async function sendEmail(subject: string, body: string): Promise<boolean> {
  const config = getResendConfig();
  if (!config.ok) {
    console.warn("[email]", config.reason, "— no email sent for:", subject);
    return false;
  }

  const resend = new Resend(config.apiKey);
  const { error } = await resend.emails.send({
    from: config.from,
    to: config.to,
    subject,
    text: body,
  });

  if (error) {
    console.error("[email] Resend delivery failed:", formatResendError(error), {
      from: config.from,
      to: config.to,
      subject,
    });
    return false;
  }

  console.info("[email] sent", { from: config.from, to: config.to, subject });
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

function publishFailure(error: FormFieldErrors, values: ReturnType<typeof parsePublishFormValues>): PublishFormActionResult {
  return { ok: false, error, values, attemptId: String(Date.now()) };
}

async function persistPublishAttempt(
  values: ReturnType<typeof parsePublishFormValues>,
  reason: string,
  error?: Record<string, string[] | undefined>,
): Promise<void> {
  if (!process.env.AZURE_STORAGE_CONNECTION_STRING) return;

  try {
    await saveSubmission({
      type: "publish-attempt",
      submittedAt: new Date().toISOString(),
      data: {
        ...Object.fromEntries(
          Object.entries(values).map(([k, v]) => [
            k,
            Array.isArray(v) ? v.join(", ") : String(v ?? ""),
          ]),
        ),
        _reason: reason,
        _errors: error ? JSON.stringify(error) : "",
      },
    });
  } catch (err) {
    console.error("[submission] Failed to save publish attempt:", err);
  }
}

export async function submitPublishForm(formData: FormData): Promise<PublishFormActionResult> {
  const values = parsePublishFormValues(formData);
  const helpNeeded = values.helpNeeded;

  const parsed = publishFormSchema.safeParse({
    ...values,
    helpNeeded: helpNeeded.length > 0 ? helpNeeded : undefined,
  });

  if (!parsed.success) {
    const error = parsed.error.flatten().fieldErrors;
    void persistPublishAttempt(values, "validation_failed", error);
    return publishFailure(error, values);
  }

  const email = parsed.data.contactEmail;
  if (!(await checkRateLimit(`publish:${email}`))) {
    void persistPublishAttempt(values, "rate_limited");
    return publishFailure({ form: ["Please wait a minute before submitting again."] }, values);
  }

  const payload = {
    type: "publish" as const,
    submittedAt: new Date().toISOString(),
    data: Object.fromEntries(
      Object.entries(parsed.data).map(([k, v]) => [
        k,
        Array.isArray(v) ? v.join(", ") : String(v ?? ""),
      ]),
    ),
  };

  const body = Object.entries(parsed.data)
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
    .join("\n\n");

  const [saved, emailed] = await Promise.all([
    persistSubmission(payload),
    sendEmail(`New app submission: ${parsed.data.appName}`, body),
  ]);

  if (process.env.NODE_ENV === "production" && !saved && !emailed) {
    void persistPublishAttempt(values, "delivery_failed");
    return publishFailure(
      {
        form: [
          "We could not save your submission right now. Please email info@turbofasttools.com directly.",
        ],
      },
      values,
    );
  }

  return { ok: true as const };
}

export async function submitContactForm(formData: FormData): Promise<ContactFormActionResult> {
  const values = {
    topic: String(formData.get("topic") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  const parsed = contactFormSchema.safeParse(values);

  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.flatten().fieldErrors, values };
  }

  if (!(await checkRateLimit(`contact:${parsed.data.email}`))) {
    return {
      ok: false as const,
      error: { form: ["Please wait a minute before submitting again."] },
      values,
    };
  }

  const payload = {
    type: "contact" as const,
    submittedAt: new Date().toISOString(),
    data: Object.fromEntries(Object.entries(parsed.data).map(([k, v]) => [k, String(v)])),
  };

  const topicLabel = contactTopicLabel(parsed.data.topic);
  const body = `Topic: ${topicLabel}\nName: ${parsed.data.name}\nEmail: ${parsed.data.email}\n\n${parsed.data.message}`;

  const [saved, emailed] = await Promise.all([
    persistSubmission(payload),
    sendEmail(`Contact (${topicLabel}): ${parsed.data.name}`, body),
  ]);

  if (process.env.NODE_ENV === "production" && !saved && !emailed) {
    return {
      ok: false as const,
      error: {
        form: [
          "We could not save your submission right now. Please email info@turbofasttools.com directly.",
        ],
      },
      values,
    };
  }

  return { ok: true as const };
}
