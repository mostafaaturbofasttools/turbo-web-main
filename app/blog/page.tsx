import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/content-loader";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on app publishing, mobile games, AI, Felt, and growth from TRBO.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = getBlogPosts();

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
        <p className="mt-3 text-muted">
          Publishing, mobile games, AI, Felt, and growth from the TRBO team.
        </p>
        <div className="mt-12 space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="overflow-hidden rounded-2xl border border-border bg-card/60">
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[2/1] w-full overflow-hidden bg-surface">
                  <Image
                    src={post.cover}
                    alt=""
                    fill
                    sizes="(max-width: 896px) 100vw, 896px"
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs text-muted">
                    {formatDate(post.date)} · {post.readingTime}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold group-hover:text-accent">{post.title}</h2>
                  <p className="mt-2 text-muted">{post.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-surface px-2 py-0.5 text-xs text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
