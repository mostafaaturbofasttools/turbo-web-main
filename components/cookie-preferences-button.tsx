"use client";

import { openCookiePreferences } from "@/components/cookie-consent";
import { Button } from "@/components/ui/button";

export function CookiePreferencesButton() {
  return (
    <Button type="button" variant="outline" className="mt-4" onClick={openCookiePreferences}>
      Manage cookie preferences
    </Button>
  );
}
