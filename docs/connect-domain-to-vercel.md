# Connect turbofasttools.com to Vercel

Step-by-step guide to point your domain from Wix to your Vercel deployment.

## TL;DR

- Your domain's DNS is **managed at Google** (nameservers are `ns-cloud-aX.googledomains.com`).
- It currently points to **Wix**, which is why Vercel shows **"Invalid Configuration."**
- You only need to **edit two DNS records inside Google Cloud DNS**. You do **not** need to change nameservers, and you do **not** need to touch Wix for the switch to work.

## Current state (for reference)

Checked on 2026-06-02:

| Record | Currently points to | Meaning |
|--------|--------------------|---------|
| Nameservers | `ns-cloud-a1..a4.googledomains.com` | DNS is controlled at **Google** |
| `@` (apex) A record | `185.230.63.107` | a **Wix** server |
| `www` CNAME | `pointing.wixdns.net` | **Wix** |

## What Vercel wants

| Type | Name / Host | Value |
|------|-------------|-------|
| A | `@` | `216.150.1.1` |
| CNAME | `www` | `f8c2a60b0256ed8d.vercel-dns-017.com.` |

> Note: the CNAME value is specific to your Vercel project. If Vercel's dashboard shows a different value, use the one shown in Vercel.

## Steps

### 1. Open Google Cloud DNS

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Navigate to **Network Services → Cloud DNS**.
3. Open the DNS **zone** for `turbofasttools.com`.

### 2. Fix the apex (`@`) A record

1. Find the existing **A** record for the zone root (name `turbofasttools.com.` / host `@`) pointing to `185.230.63.107`.
2. Edit it (or delete and recreate) so the value is:
   - **`216.150.1.1`**
3. Save.

### 3. Fix the `www` CNAME record

1. Find the existing **CNAME** record for `www` pointing to `pointing.wixdns.net`.
2. Edit it so the value is:
   - **`f8c2a60b0256ed8d.vercel-dns-017.com.`** (keep the trailing dot in Google Cloud DNS)
3. Save.

### 4. Wait for propagation

Your zone TTL is short (300 seconds = 5 minutes), so changes usually take effect within a few minutes, occasionally up to a few hours.

### 5. Verify (optional, from a terminal)

```bash
dig +short A turbofasttools.com
# expect: 216.150.1.1

dig +short www.turbofasttools.com
# expect a CNAME chain ending at vercel-dns-017.com / a Vercel IP
```

### 6. Refresh in Vercel

Back in the Vercel dashboard, click **Refresh** on both `turbofasttools.com` and `www.turbofasttools.com`. The status should change from **Invalid Configuration** to **Valid**.

## About Wix

- Wix is **not** your nameserver, so it does not block this change. The Wix entries are just records living inside your Google DNS zone, and you are replacing them.
- Once DNS points to Vercel, your site loads from Vercel instead of Wix automatically.
- You can later cancel/clean up the Wix site so you are not paying for something unused. That cleanup is optional and not required for the domain to work on Vercel.

## Troubleshooting

- **Still "Invalid Configuration" after 30+ min:** double-check you edited the records in the **Google Cloud DNS** zone (not in Wix, and not as a new conflicting record). Make sure there is only **one** A record for `@` and **one** CNAME for `www`.
- **`www` won't accept a CNAME:** ensure there is no other record (like an A record) on `www` at the same time — a host can't have both.
- **Apex won't accept the A record:** remove any old Wix A/AAAA records on the root before adding the Vercel one.
