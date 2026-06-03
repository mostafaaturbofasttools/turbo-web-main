# Resend email setup (fix 403 on form submissions)

Form submissions call Resend from `app/actions/forms.ts`. A **403** almost always means the **`from` domain** is wrong—not a bug in the form.

## Your setup

| Item | Value |
|------|--------|
| **Verified in Resend** | `contact.turbofasttools.com` |
| **Not verified (root)** | `turbofasttools.com` alone |

So **`RESEND_FROM` must use `@contact.turbofasttools.com`**, not `info@turbofasttools.com`.

**Recipient (`to`)** can be any inbox, e.g. `info@turbofasttools.com` or `mostafaa@turbofasttools.com`.

## Vercel env (copy exactly, one line each)

```bash
RESEND_API_KEY=re_xxxxxxxx
RESEND_FROM=TRBO Website <notifications@contact.turbofasttools.com>
SUBMISSIONS_EMAIL_TO=info@turbofasttools.com
```

Or send to yourself while testing:

```bash
SUBMISSIONS_EMAIL_TO=mostafaa@turbofasttools.com
```

Then redeploy:

```bash
npm run env:vercel
vercel --prod
```

## Why your test worked but the site failed

**Works (Resend dashboard test):**

```json
{
  "from": "Resend <onboarding@resend.dev>",
  "to": ["mostafaa@turbofasttools.com"]
}
```

`onboarding@resend.dev` may only send to your Resend account email.

**Failed (site before fix):**

```json
{
  "from": "TRBO Website <info@turbofasttools.com>",
  "to": ["info@turbofasttools.com"]
}
```

Error: *Domain not verified: Verify turbofasttools.com or update your from domain.*

Root `@turbofasttools.com` is not verified—only **`contact.turbofasttools.com`** is.

**Truncated `info@` in logs:** If `RESEND_FROM` was pasted with a line break after `@`, an old bug kept only the first line (`info@`). That is fixed in `lib/resend-config.ts` (newlines are stripped, not split). Still paste each env value on **one line** in Vercel.

## Quick test vs production

| Mode | `RESEND_FROM` | `SUBMISSIONS_EMAIL_TO` |
|------|----------------|-------------------------|
| Quick test | *(unset)* → `onboarding@resend.dev` | `mostafaa@turbofasttools.com` |
| Production | `TRBO Website <notifications@contact.turbofasttools.com>` | `info@turbofasttools.com` (or your inbox) |

## Checklist

1. Resend → Domains → **`contact.turbofasttools.com`** shows **Verified**
2. Vercel → `RESEND_FROM` uses **`@contact.turbofasttools.com`**
3. Vercel → `SUBMISSIONS_EMAIL_TO` is a full address on one line
4. Redeploy production
5. Submit https://www.turbofasttools.com/publish and check Resend → Emails

## Optional: Azure backup

If `AZURE_STORAGE_CONNECTION_STRING` is set, submissions are still saved when email fails. Users only see an error when **both** email and blob save fail.

## Related files

- `lib/resend-config.ts` — env trim + validation
- `.env.example` — local template
