const DEFAULT_TO = "info@turbofasttools.com";
const DEFAULT_FROM = "TRBO Website <onboarding@resend.dev>";

export type ResendConfig =
  | { ok: true; apiKey: string; from: string; to: string }
  | { ok: false; reason: string };

function trimEnv(value: string | undefined): string {
  return (value ?? "").trim().replace(/\r\n/g, "\n").split("\n")[0]?.trim() ?? "";
}

/** Pull bare address from `Name <email@domain.com>` or plain email. */
export function extractEmailAddress(fromOrTo: string): string {
  const angle = fromOrTo.match(/<([^>]+)>/);
  return (angle?.[1] ?? fromOrTo).trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function getResendConfig(): ResendConfig {
  const apiKey = trimEnv(process.env.RESEND_API_KEY);
  const from = trimEnv(process.env.RESEND_FROM) || DEFAULT_FROM;
  const to = trimEnv(process.env.SUBMISSIONS_EMAIL_TO) || DEFAULT_TO;

  if (!apiKey) {
    return { ok: false, reason: "RESEND_API_KEY is not set" };
  }

  const fromEmail = extractEmailAddress(from);
  const toEmail = extractEmailAddress(to);

  if (!isValidEmail(fromEmail)) {
    return {
      ok: false,
      reason: `RESEND_FROM is invalid (got "${from.slice(0, 80)}"). Use: TRBO Website <info@turbofasttools.com>`,
    };
  }

  if (!isValidEmail(toEmail)) {
    return {
      ok: false,
      reason: `SUBMISSIONS_EMAIL_TO is invalid (got "${to.slice(0, 80)}"). Use: info@turbofasttools.com`,
    };
  }

  return { ok: true, apiKey, from, to };
}

export function formatResendError(error: {
  name?: string;
  message?: string;
  statusCode?: number | null;
}): string {
  const parts = [
    error.statusCode != null ? `status ${error.statusCode}` : null,
    error.name,
    error.message,
  ].filter(Boolean);
  return parts.join(" — ") || "unknown Resend error";
}
