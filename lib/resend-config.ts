/** Resend-verified sending domain (subdomain). Only addresses on this domain can be used as `from`. */
export const RESEND_SEND_DOMAIN = "contact.turbofasttools.com";

/** Resend sandbox domain — only delivers to your own Resend account email. */
const RESEND_SANDBOX_DOMAIN = "resend.dev";

/** Where form notifications are delivered (your group inbox is fine). */
const DEFAULT_TO = "info@turbofasttools.com";

const DEFAULT_FROM_LOCAL = "notifications";
const PRODUCTION_FROM = `TRBO Website <${DEFAULT_FROM_LOCAL}@${RESEND_SEND_DOMAIN}>`;

export type ResendConfig =
  | { ok: true; apiKey: string; from: string; to: string }
  | { ok: false; reason: string };

function isProduction(): boolean {
  return process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";
}

/** Strip line breaks and stray spaces from Vercel env pastes. */
function trimEnv(value: string | undefined): string {
  return (value ?? "").replace(/[\r\n]+/g, "").trim();
}

/** Remove whitespace inside email strings (e.g. `info@domain.com ` or `iinfo@...`). */
function sanitizeEmailAddress(email: string): string {
  let e = email.replace(/\s+/g, "").toLowerCase();
  if (e === "iinfo@turbofasttools.com") {
    e = DEFAULT_TO;
  }
  return e;
}

/** Pull bare address from `Name <email@domain.com>` or plain email. */
export function extractEmailAddress(fromOrTo: string): string {
  const angle = fromOrTo.match(/<([^>]+)>/);
  const raw = (angle?.[1] ?? fromOrTo).trim();
  return sanitizeEmailAddress(raw);
}

/** Pull the optional display name from `Name <email@domain.com>`. */
function extractDisplayName(from: string): string {
  const angle = from.match(/^([^<]+)<[^>]+>/);
  return angle ? angle[1].trim() : "TRBO Website";
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildFrom(name: string, email: string): string {
  return name ? `${name} <${email}>` : email;
}

/**
 * Sender must use the verified subdomain. In production we always use
 * notifications@contact.turbofasttools.com so a bad RESEND_FROM in Vercel cannot 403.
 */
function resolveFrom(rawFrom: string): { from: string; note?: string } {
  if (isProduction()) {
    return { from: PRODUCTION_FROM };
  }

  const email = extractEmailAddress(rawFrom);
  const name = extractDisplayName(rawFrom);
  const domain = email.split("@")[1] ?? "";
  const local = email.split("@")[0] || DEFAULT_FROM_LOCAL;

  if (domain === RESEND_SEND_DOMAIN) {
    return { from: buildFrom(name, email) };
  }
  if (domain === RESEND_SANDBOX_DOMAIN) {
    return { from: buildFrom(name, email) };
  }

  const corrected = buildFrom(name, `${local}@${RESEND_SEND_DOMAIN}`);
  return {
    from: corrected,
    note: `RESEND_FROM was not on ${RESEND_SEND_DOMAIN}; using ${corrected}`,
  };
}

/** Recipient can be any inbox (e.g. info@ group on the root domain). */
function resolveTo(rawTo: string): { to: string; note?: string } {
  const plain = sanitizeEmailAddress(extractEmailAddress(rawTo || DEFAULT_TO));
  if (isValidEmail(plain)) {
    return { to: plain };
  }
  return {
    to: DEFAULT_TO,
    note: `SUBMISSIONS_EMAIL_TO was invalid (got "${rawTo.slice(0, 60)}"); using ${DEFAULT_TO}`,
  };
}

export function getResendConfig(): ResendConfig {
  const apiKey = trimEnv(process.env.RESEND_API_KEY);
  const rawFrom = trimEnv(process.env.RESEND_FROM);
  const rawTo = trimEnv(process.env.SUBMISSIONS_EMAIL_TO);

  if (!apiKey) {
    return { ok: false, reason: "RESEND_API_KEY is not set" };
  }

  const { from, note: fromNote } = resolveFrom(rawFrom || PRODUCTION_FROM);
  const { to, note: toNote } = resolveTo(rawTo || DEFAULT_TO);

  if (fromNote) console.warn("[email]", fromNote);
  if (toNote) console.warn("[email]", toNote);

  const fromEmail = extractEmailAddress(from);
  const toEmail = extractEmailAddress(to);

  if (!isValidEmail(fromEmail)) {
    return {
      ok: false,
      reason: `Could not build a valid from address. Use: ${PRODUCTION_FROM}`,
    };
  }

  if (!isValidEmail(toEmail)) {
    return {
      ok: false,
      reason: `Could not build a valid to address. Use: ${DEFAULT_TO}`,
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
