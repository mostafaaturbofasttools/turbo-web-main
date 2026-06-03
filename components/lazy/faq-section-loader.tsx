"use client";

import dynamic from "next/dynamic";

export const FaqSectionLoader = dynamic(
  () => import("@/components/faq-section").then((m) => ({ default: m.FaqSection })),
  {
    ssr: false,
    loading: () => <div className="mt-10 min-h-48 animate-pulse rounded-xl bg-surface/40" aria-hidden />,
  },
);
