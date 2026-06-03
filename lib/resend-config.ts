/** Resend-verified sending domain (subdomain). Only addresses on this domain can be used as `from`. */
export const RESEND_SEND_DOMAIN = "contact.turbofasttools.com";

/** Resend sandbox domain — only delivers to your own Resend account email. */
const RESEND_SANDBOX_DOMAIN = "resend.dev";

const DEFAULT_TO = "info@turbofasttools.com";
const DEFAULT_FROM_LOCAL = "notifications";
const PRODUCTION_FROM = `TRBO Website <${DEFAULT_FROM_LOCAL}@${RESEND_SEND_DOMAIN}>`;

export type ResendConfig =
  | { ok: true; apiKey: string; from: string; to: string }
  | { ok: false; reason: string };

/** Collapse accidental line breaks in Vercel env values (fixes truncated `info@` addresses). */
function trimEnv(value: string | undefined): string {
  return (value ?? "").replace(/[\r\n]+/g, "").trim();
}

/** Pull bare address from `Name <email@domain.com>` or plain email. */
export function extractEmailAddress(fromOrTo: string): string {
  const angle = fromOrTo.match(/<([^>]+)>/);
  return (angle?.[1] ?? fromOrTo).trim();
}

/** Pull the optional display name from `Name <email@domain.com>`. */
function extractDisplayName(from: string): string {
  const angle = from.match(/^([^<]+)<[^>]+>/);
  return angle ? angle[1].trim() : "";
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildFrom(name: string, email: string): string {
  return name ? `${name} <${email}>` : email;
}

/**
 * Force the `from` address onto the verified domain.
 *
 * Resend returns 403 unless the `from` domain exactly matches a verified domain.
 * We keep the display name and local part but rewrite any non-verified domain
 * (e.g. the bare root `turbofasttools.com`) to `contact.turbofasttools.com`.
 * The `resend.dev` sandbox is left untouched so local/manual testing still works.
 */
function normalizeFrom(from: string): { from: string; rewrittenFrom?: string } {
  const email = extractEmailAddress(from);
  const name = extractDisplayName(from);
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  const local = email.split("@")[0] || DEFAULT_FROM_LOCAL;

  if (domain === RESEND_SEND_DOMAIN || domain === RESEND_SANDBOX_DOMAIN) {
    return { from: buildFrom(name, email) };
  }

  const corrected = buildFrom(name, `${local}@${RESEND_SEND_DOMAIN}`);
  return { from: corrected, rewrittenFrom: from };
}

export function getResendConfig(): ResendConfig {
  const apiKey = trimEnv(process.env.RESEND_API_KEY);
  const rawFrom = trimEnv(process.env.RESEND_FROM) || PRODUCTION_FROM;
  const to = trimEnv(process.env.SUBMISSIONS_EMAIL_TO) || DEFAULT_TO;

  if (!apiKey) {
    return { ok: false, reason: "RESEND_API_KEY is not set" };
  }

  const { from, rewrittenFrom } = normalizeFrom(rawFrom);
  const fromEmail = extractEmailAddress(from);
  const toEmail = extractEmailAddress(to);

  if (!isValidEmail(fromEmail)) {
    return {
      ok: false,
      reason: `RESEND_FROM is invalid (got "${rawFrom.slice(0, 80)}"). Use: ${PRODUCTION_FROM}`,
    };
  }

  if (!isValidEmail(toEmail)) {
    return {
      ok: false,
      reason: `SUBMISSIONS_EMAIL_TO is invalid (got "${to.slice(0, 80)}"). Use: ${DEFAULT_TO}`,
    };
  }

  if (rewrittenFrom) {
    console.warn(
      `[email] RESEND_FROM "${rewrittenFrom}" is not on the verified domain ${RESEND_SEND_DOMAIN}. ` +
        `Sending from "${from}" instead. Set RESEND_FROM=${PRODUCTION_FROM} to silence this.`,
    );
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
