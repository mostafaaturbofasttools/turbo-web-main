import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/markdown-content";
import { getBlogPost, getBlogPosts } from "@/lib/content-loader";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    ...buildPageMetadata({
      title: post.title,
      description: post.description,
      path: `/blog/${slug}`,
    }),
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/blog/${slug}`,
      images: [{ url: post.cover, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.cover],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link href="/blog" className="text-sm text-accent hover:underline">
        ← Back to blog
      </Link>
      <div className="relative mt-6 aspect-[2/1] overflow-hidden rounded-2xl border border-border bg-surface">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </div>
      <p className="mt-6 text-sm text-muted">
        {formatDate(post.date)} · {post.readingTime}
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">{post.title}</h1>
      <div className="mt-3 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-border bg-surface/80 px-2.5 py-0.5 text-xs text-muted">
            {tag}
          </span>
        ))}
      </div>
      <MarkdownContent content={post.content} className="prose-blog mt-8" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            image: `${siteConfig.url}${post.cover}`,
            author: { "@type": "Organization", name: siteConfig.name },
          }),
        }}
      />
    </article>
  );
}
