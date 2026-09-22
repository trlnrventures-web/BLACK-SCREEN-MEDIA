import type { MetadataRoute } from "next";
import { getAllSlugs as getAllCaseSlugs } from "@/lib/case-studies";
import { getAllPosts } from "@/lib/insights";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/work",
    "/services",
    "/real-estate",
    "/about",
    "/insights",
    "/contact",
    "/careers",
    "/privacy-policy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path === "/contact" ? 0.7 : 0.8,
  }));

  const workRoutes: MetadataRoute.Sitemap = (await getAllCaseSlugs()).map(
    (item) => ({
      url: `${base}/work/${item.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }),
  );

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${base}/services/${service.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = (await getAllPosts()).map(
    (post) => ({
      url: `${base}/insights/${post.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }),
  );

  return [...staticRoutes, ...workRoutes, ...serviceRoutes, ...postRoutes];
}