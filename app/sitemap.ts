import type { MetadataRoute } from "next";
import { releases } from "@/app/components/Music/releases";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const releasePages: MetadataRoute.Sitemap = releases.map((release) => ({
    url: `${siteConfig.url}/music/${release.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
    images: [`${siteConfig.url}${encodeURI(release.cover)}`],
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified: new Date("2026-07-24"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...releasePages,
  ];
}
