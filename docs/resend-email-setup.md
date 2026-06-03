# Resend email setup (fix 403 on form submissions)

Form submissions call Resend from `app/actions/forms.ts`. A **403** almost always means the **from** address or domain is not allowed yet—not a bug in the form.

## What the 403 means

A **successful** Resend test email often looks like this:

```json
{
  "from": "Resend <onboarding@resend.dev>",
  "to": ["mostafaa@turbofasttools.com"]
}
```

That works because `onboarding@resend.dev` may **only** send to the email on your Resend account (here `mostafaa@turbofasttools.com`).

The website was failing when **`to` was `info@turbofasttools.com`** with the same `from` — Resend returns **403** for that combination.

Common Resend messages:

- *You can only send testing emails to your own email address* — `onboarding@resend.dev` + recipient is not your Resend login email.
- *The turbofasttools.com domain is not verified* — `RESEND_FROM` uses `@turbofasttools.com` but DNS is not verified in Resend.

## Fix checklist

### 1. Verify the domain in Resend

1. Open [resend.com/domains](https://resend.com/domains).
2. Add **`turbofasttools.com`** (or a subdomain like **`contact.turbofasttools.com`** if you use inbound mail on the root domain).
3. Add the DNS records Resend shows (SPF, DKIM, etc.) in **Google Cloud DNS** (same place as your Vercel records).
4. Wait until status is **Verified** (often minutes, sometimes up to 72 hours).

### 2. Choose test vs production routing

**Option A — Quick test (no domain verification yet)**

Match what already works in the Resend dashboard:

| Variable | Value |
|----------|--------|
| `RESEND_FROM` | *(leave unset, or)* `Resend <onboarding@resend.dev>` |
| `SUBMISSIONS_EMAIL_TO` | `mostafaa@turbofasttools.com` |

Form notifications will go to **you**, not `info@`, until the domain is verified.

**Option B — Production (recommended)**

| Variable | Value |
|----------|--------|
| `RESEND_FROM` | `TRBO Website <info@turbofasttools.com>` |
| `SUBMISSIONS_EMAIL_TO` | `info@turbofasttools.com` |

Requires **Verified** domain in Resend (step 1).

### 3. Set Vercel environment variables

In **Vercel → Project → Settings → Environment Variables** (Production):

| Variable | Example value | Notes |
|----------|---------------|--------|
| `RESEND_API_KEY` | `re_...` | From Resend → API Keys. No quotes, no spaces. |
| `RESEND_FROM` | `TRBO Website <info@turbofasttools.com>` | Must use your **verified** domain. Single line only. |
| `SUBMISSIONS_EMAIL_TO` | `info@turbofasttools.com` | Where notifications land. |

**Common mistakes**

- Pasting a line break into `RESEND_FROM` so the address becomes `info@` only — keep each value on **one line**.
- Using `info@turbofasttools.com` in `RESEND_FROM` before the domain shows **Verified** in Resend.
- Leaving `RESEND_FROM` unset in production (falls back to `onboarding@resend.dev`, which cannot send to your inbox).

Sync from `.env.local`:

```bash
npm run env:vercel
vercel --prod
```

### 4. Test

1. Resend dashboard → **Emails** → send a test from `info@turbofasttools.com` to `info@turbofasttools.com`.
2. Submit the publish form on https://www.turbofasttools.com/publish.
3. Check **Vercel → Logs** for `[email] Resend delivery failed:` — the log now includes the full Resend message.

## Optional: Azure backup

If `AZURE_STORAGE_CONNECTION_STRING` is set, submissions are still saved when email fails. In production, users only see an error when **both** email and blob save fail.

## Related files

- `lib/resend-config.ts` — trims env vars and validates addresses before send
- `.env.example` — local template
- `README.md` — short Resend summary
