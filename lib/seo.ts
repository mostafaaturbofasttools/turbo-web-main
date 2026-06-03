import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const defaultOgImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — ${siteConfig.descriptor}`,
} as const;

export function buildPageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const pageTitle = title ?? siteConfig.descriptor;
  const url = `${siteConfig.url}${path}`;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_CA",
      url,
      siteName: siteConfig.name,
      title: pageTitle,
      description,
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [defaultOgImage.url],
    },
  };
}
