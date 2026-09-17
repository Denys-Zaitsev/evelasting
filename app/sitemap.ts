import type { MetadataRoute } from "next";
import { releases } from "@/app/components/Music/releases";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-17");
  const releasePages: MetadataRoute.Sitemap = releases.map((release) => ({
    url: `${siteConfig.url}/music/${release.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
    images: [`${siteConfig.url}${encodeURI(release.cover)}`],
  }));

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [`${siteConfig.url}/about/denys-zaitsev.webp`],
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
