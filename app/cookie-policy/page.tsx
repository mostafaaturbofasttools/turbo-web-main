import type { Metadata } from "next";
import Link from "next/link";
import { CookiePreferencesButton } from "@/components/cookie-preferences-button";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How TRBO FAST TOOLS INC uses cookies on turbofasttools.com.",
};

export default function CookiePolicyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Cookie Policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated June 2, 2026</p>

      <div className="prose-legal mt-8 space-y-6 text-muted">
        <p>
          This cookie policy explains how TRBO FAST TOOLS INC (&quot;TRBO&quot;, &quot;we&quot;, &quot;us&quot;) uses cookies and
          similar technologies on{" "}
          <a href="https://www.turbofasttools.com" className="text-accent underline">
            turbofasttools.com
          </a>{" "}
          (the &quot;Site&quot;).
        </p>

        <section id="manage">
          <h2 className="text-xl font-bold text-foreground">Manage your preferences</h2>
          <p className="mt-3">
            You can update your cookie choices at any time. Essential cookies stay on so the Site works; analytics
            cookies are optional.
          </p>
          <CookiePreferencesButton />
        </section>

        <section id="cookies">
          <h2 className="text-xl font-bold text-foreground">What are cookies?</h2>
          <p className="mt-3">
            Cookies are small text files stored on your device. We use them to keep the Site secure, remember your
            consent, and measure how visitors use our pages if you allow it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground">Cookies we use</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Essential:</strong> consent storage and core site functionality.
              These cannot be disabled.
            </li>
            <li>
              <strong className="text-foreground">Analytics:</strong> privacy-friendly usage metrics via Vercel
              Analytics. Loaded only if you choose &quot;Accept all&quot;.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground">Third parties</h2>
          <p className="mt-3">
            When analytics is enabled, Vercel may process aggregated visit data. We do not use advertising or
            cross-site tracking cookies on this Site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground">More information</h2>
          <p className="mt-3">
            For how we handle personal data in our apps and services, see our{" "}
            <Link href="/privacy-policy" className="text-accent underline">
              Privacy Policy
            </Link>
            . Questions:{" "}
            <a href="mailto:info@turbofasttools.com" className="text-accent underline">
              info@turbofasttools.com
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
