import type { MetadataRoute } from "next";
import { getBlogPosts, policySlugs } from "@/lib/content-loader";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = ["", "/felt", "/publish", "/contact", "/blog", ...policySlugs.map((s) => `/${s}`)];
  const blogPosts = getBlogPosts().map((p) => `/blog/${p.slug}`);

  return [...staticRoutes, ...blogPosts].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
