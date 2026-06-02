# TRBO Fast Tools — Marketing Website

Next.js 16 marketing site for [TRBO FAST TOOLS INC](https://www.turbofasttools.com) — AI-native app publishing studio for consumer apps and games.

## Stack

- Next.js 16 (App Router, static Server Components)
- Tailwind CSS v4 + Geist
- Azure Blob Storage for form submissions
- Resend for email notifications
- Vercel Analytics

## Development

```bash
npm install
cp .env.example .env.local
# Fill in .env.local (never commit this file)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` → `.env.local`. **Never commit `.env.local`** — it is gitignored.

| Variable | Purpose |
|----------|---------|
| `AZURE_STORAGE_CONNECTION_STRING` | Saves each form submission as JSON in Azure Blob |
| `AZURE_SUBMISSIONS_CONTAINER` | Blob container name (default: `app-submissions`) |
| `RESEND_API_KEY` | Sends email when someone submits a form |
| `RESEND_FROM` | Sender address — **must be a domain verified in [Resend](https://resend.com/domains)** |
| `SUBMISSIONS_EMAIL_TO` | Inbox for notifications (default: `info@turbofasttools.com`) |

### Sync local env → Vercel (production)

After `vercel login` and `vercel link` (one-time):

```bash
chmod +x scripts/sync-env-to-vercel.sh
npm run env:vercel              # production
npm run env:vercel -- preview   # preview only
npm run env:vercel -- all       # production + preview + development
```

The script reads only keys from `.env.example`, never prints secret values, and uses `vercel env add --force`.

Then redeploy: `vercel --prod`

## Will form submissions send email?

**Yes, in production — if Resend is configured correctly.**

On each submit the site:

1. Saves JSON to **Azure Blob** (if `AZURE_STORAGE_CONNECTION_STRING` is set)
2. Sends email via **Resend** (if `RESEND_API_KEY` is set)

In **production**, if **both** fail, the user sees an error instead of a fake success.

**Resend checklist for `info@turbofasttools.com`:**

1. Add and verify domain `turbofasttools.com` in Resend
2. Set `RESEND_FROM=TRBO Website <info@turbofasttools.com>` (or `noreply@turbofasttools.com`)
3. Set `RESEND_API_KEY` from the Resend dashboard
4. Set `SUBMISSIONS_EMAIL_TO=info@turbofasttools.com`

`onboarding@resend.dev` is for testing only — it cannot reliably deliver to your real inbox in production.

**Local dev without env vars:** forms show success but only log to the terminal. That is expected.

## Deploy to Vercel

1. Push to GitHub and import the repo in Vercel
2. Run `npm run env:vercel` or add variables in **Settings → Environment Variables**
3. Deploy — static pages are edge-cached automatically

## CI

GitHub Actions runs `npm ci`, `npm run build`, and `npm run lint` on every push/PR to `main`.

## Project structure

- `app/` — routes (landing, /felt, /publish, /blog, legal pages)
- `components/` — UI and section components
- `content/blog/` — blog posts (Markdown)
- `content/legal/` — legal pages (mirrored from live site)
- `lib/` — games data, site config, submission adapters
- `scripts/sync-env-to-vercel.sh` — push `.env.local` to Vercel safely
- `docs/linkedin-brand-updates.md` — LinkedIn profile copy & logo brief

## Forms

- `/publish` — app submission (Azure Blob + email)
- `/contact` — general contact (Azure Blob + email)
