"use client";

import dynamic from "next/dynamic";

const CookieConsentLoader = dynamic(
  () => import("@/components/cookie-consent-loader").then((m) => ({ default: m.CookieConsentLoader })),
  { ssr: false },
);

const AnalyticsGate = dynamic(
  () => import("@/components/analytics-gate").then((m) => ({ default: m.AnalyticsGate })),
  { ssr: false },
);

export function DeferredClientWidgets() {
  return (
    <>
      <CookieConsentLoader />
      <AnalyticsGate />
    </>
  );
}
