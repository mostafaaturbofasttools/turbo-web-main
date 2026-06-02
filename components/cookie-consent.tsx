"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

export const COOKIE_CONSENT_KEY = "trbo-cookie-consent";
export const COOKIE_PREFERENCES_EVENT = "trbo-open-cookie-preferences";

export type CookieConsentValue = "all" | "essential" | "dismissed";

function setConsent(value: CookieConsentValue) {
  localStorage.setItem(COOKIE_CONSENT_KEY, value);
  window.dispatchEvent(new Event("trbo-cookie-update"));
}

function linkClassName() {
  return "font-medium text-foreground underline underline-offset-2 hover:text-accent";
}

export function CookieConsent() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !localStorage.getItem(COOKIE_CONSENT_KEY);
  });
  const [showManage, setShowManage] = useState(false);

  useEffect(() => {
    const openPreferences = () => {
      setVisible(true);
      setShowManage(true);
    };

    window.addEventListener(COOKIE_PREFERENCES_EVENT, openPreferences);
    return () =>
      window.removeEventListener(COOKIE_PREFERENCES_EVENT, openPreferences);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-[#111318]/95 px-4 py-5 shadow-2xl backdrop-blur-md sm:px-6"
    >
      <button
        type="button"
        aria-label="Close cookie banner"
        className="absolute right-4 top-4 rounded-md p-1 text-muted transition hover:bg-surface hover:text-foreground sm:right-6"
        onClick={() => {
          setConsent("dismissed");
          setVisible(false);
          setShowManage(false);
        }}
      >
        <X className="h-4 w-4" />
      </button>

      <div className="mx-auto max-w-6xl pr-8 lg:pr-0">
        {!showManage ? (
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-3xl">
              <h2
                id="cookie-consent-title"
                className="text-base font-semibold text-foreground"
              >
                We use cookies
              </h2>
              <p
                id="cookie-consent-desc"
                className="mt-1.5 text-sm leading-relaxed text-muted"
              >
                Cookies help this site function, measure usage, and support
                marketing.{" "}
                <button
                  type="button"
                  className={linkClassName()}
                  onClick={() => setShowManage(true)}
                >
                  Manage
                </button>{" "}
                your cookie preferences anytime. Learn more about our{" "}
                <Link href="/cookie-policy" className={linkClassName()}>
                  cookie policy
                </Link>
                .
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2.5">
              <button
                type="button"
                className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-muted"
                onClick={() => {
                  setConsent("essential");
                  setVisible(false);
                }}
              >
                Reject non-essential
              </button>
              <button
                type="button"
                className="rounded-full border-2 border-accent bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-accent/10"
                onClick={() => {
                  setConsent("all");
                  setVisible(false);
                }}
              >
                Accept all
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl">
            <h2
              id="cookie-consent-title"
              className="text-base font-semibold text-foreground"
            >
              Cookie preferences
            </h2>
            <p id="cookie-consent-desc" className="mt-1.5 text-sm text-muted">
              Choose which cookies we can use. Essential cookies are required
              for the site to work.
            </p>

            <ul className="mt-4 space-y-3 text-sm">
              <li className="rounded-xl border border-border bg-surface/60 px-4 py-3">
                <p className="font-medium text-foreground">Essential</p>
                <p className="mt-1 text-muted">
                  Required for security, forms, and remembering your consent
                  choice.
                </p>
                <p className="mt-2 text-xs text-accent">Always active</p>
              </li>
              <li className="rounded-xl border border-border bg-surface/60 px-4 py-3">
                <p className="font-medium text-foreground">Analytics</p>
                <p className="mt-1 text-muted">
                  Helps us understand traffic and improve the site (Vercel
                  Analytics).
                </p>
              </li>
            </ul>

            <p className="mt-4 text-sm text-muted">
              Read our{" "}
              <Link href="/cookie-policy" className={linkClassName()}>
                cookie policy
              </Link>
              .
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <button
                type="button"
                className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-muted"
                onClick={() => {
                  setConsent("essential");
                  setVisible(false);
                  setShowManage(false);
                }}
              >
                Reject non-essential
              </button>
              <button
                type="button"
                className="rounded-full border-2 border-accent bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-accent/10"
                onClick={() => {
                  setConsent("all");
                  setVisible(false);
                  setShowManage(false);
                }}
              >
                Accept all
              </button>
              <button
                type="button"
                className="rounded-full px-4 py-2.5 text-sm text-muted transition hover:text-foreground"
                onClick={() => setShowManage(false)}
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function openCookiePreferences() {
  window.dispatchEvent(new Event(COOKIE_PREFERENCES_EVENT));
}
