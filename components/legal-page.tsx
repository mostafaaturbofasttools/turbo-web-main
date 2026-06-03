import type { Metadata } from "next";
import { MarkdownContent } from "@/components/markdown-content";
import { getLegalDoc } from "@/lib/content-loader";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { notFound } from "next/navigation";

export function generateLegalMetadata(slug: string, fallback: string): Metadata {
  const doc = getLegalDoc(slug);
  const title = doc?.title ?? fallback;
  return buildPageMetadata({
    title,
    description: `${title} for ${siteConfig.name}. Official policy at turbofasttools.com.`,
    path: `/${slug}`,
  });
}

function formatLegalDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function LegalPage({ slug }: { slug: string }) {
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">{doc.title}</h1>
      {doc.updated ? (
        <p className="mt-2 text-sm text-muted">Last updated {formatLegalDate(doc.updated)}</p>
      ) : null}
      <MarkdownContent content={doc.content} className="prose-legal mt-8" />
    </article>
  );
}
