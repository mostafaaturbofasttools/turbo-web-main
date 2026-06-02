import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const defaultOgImage = {
  url: "/logo-512.png",
  width: 512,
  height: 512,
  alt: `${siteConfig.name} logo`,
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
