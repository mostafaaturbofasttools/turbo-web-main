import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const contentRoot = path.join(process.cwd(), "content");

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover: string;
  readingTime: string;
  content: string;
};

export type LegalDoc = {
  slug: string;
  title: string;
  updated?: string;
  content: string;
};

function estimateReadingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export function getBlogPosts(): BlogPost[] {
  const dir = path.join(contentRoot, "blog");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, filename), "utf8");
      const { data, content } = matter(raw);
      const cover = data.cover ? String(data.cover) : `/blog/covers/${slug}.webp`;
      return {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ""),
        date: String(data.date ?? ""),
        tags: (data.tags as string[]) ?? [],
        cover,
        readingTime: estimateReadingTime(content),
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPost(slug: string): BlogPost | null {
  return getBlogPosts().find((p) => p.slug === slug) ?? null;
}

export function getLegalDoc(slug: string): LegalDoc | null {
  const file = path.join(contentRoot, "legal", `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? slug),
    updated: data.updated ? String(data.updated) : undefined,
    content,
  };
}

export const legalSlugs = [
  "privacy-policy",
  "terms-conditions",
  "games-terms-conditions",
  "imprint",
  "games-privacy-policy",
] as const;

/** Markdown legal docs plus dedicated policy app routes (for sitemap and nav) */
export const policySlugs = [...legalSlugs, "cookie-policy"] as const;
