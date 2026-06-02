"use client";

import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from "react";
import { COOKIE_CONSENT_KEY } from "@/components/cookie-consent";

export function AnalyticsGate() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const read = () => setEnabled(localStorage.getItem(COOKIE_CONSENT_KEY) === "all");
    read();
    window.addEventListener("trbo-cookie-update", read);
    return () => window.removeEventListener("trbo-cookie-update", read);
  }, []);

  if (!enabled) return null;
  return <Analytics />;
}
