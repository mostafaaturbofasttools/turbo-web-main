"use client";

import dynamic from "next/dynamic";

export const PublishFormSectionLoader = dynamic(
  () => import("@/components/publish-form-section").then((m) => ({ default: m.PublishFormSection })),
  {
    ssr: false,
    loading: () => <div className="min-h-[28rem] animate-pulse rounded-xl bg-surface/40" aria-hidden />,
  },
);
