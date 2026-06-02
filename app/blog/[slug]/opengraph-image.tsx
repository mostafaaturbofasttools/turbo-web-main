import { OgImage } from "@/lib/og";
import { getBlogPost, getBlogPosts } from "@/lib/content-loader";

export const alt = "TRBO Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  return OgImage({
    title: post?.title ?? "TRBO Blog",
    subtitle: post?.description ?? "Insights on app publishing and growth",
  });
}
