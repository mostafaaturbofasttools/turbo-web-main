"use client";

import dynamic from "next/dynamic";

const CookieConsent = dynamic(
  () => import("@/components/cookie-consent").then((m) => ({ default: m.CookieConsent })),
  { ssr: false },
);

export function CookieConsentLoader() {
  return <CookieConsent />;
}
