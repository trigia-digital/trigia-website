import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SERVICE_SLUGS } from "@/lib/serviceSlugs";
import { getAllArticles } from "@/lib/articles";
import { urlFor } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const locale of routing.locales) {
    entries.push({ url: urlFor(locale, "/"), lastModified: now, changeFrequency: "weekly", priority: 1 });
    entries.push({ url: urlFor(locale, "/rate-card"), lastModified: now, changeFrequency: "monthly", priority: 0.8 });
    entries.push({ url: urlFor(locale, "/prototype"), lastModified: now, changeFrequency: "monthly", priority: 0.6 });
    entries.push({ url: urlFor(locale, "/articles"), lastModified: now, changeFrequency: "weekly", priority: 0.7 });

    for (const slug of SERVICE_SLUGS) {
      entries.push({
        url: urlFor(locale, `/services/${slug}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    for (const article of getAllArticles(locale)) {
      entries.push({
        url: urlFor(locale, `/articles/${article.slug}`),
        lastModified: article.publishedAt ? new Date(article.publishedAt) : now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
