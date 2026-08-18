import { routing } from "@/i18n/routing";

export const SITE_URL = "https://trigia.id";
export const INSTAGRAM_URL = "https://www.instagram.com/trigia.id";

// Builds an absolute, locale-aware URL matching the "as-needed" locale
// prefix used by i18n/routing.ts (default locale has no prefix).
export function urlFor(locale: string, path: string = "/") {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const cleanPath = path === "/" ? "" : path;
  return `${SITE_URL}${prefix}${cleanPath}` || SITE_URL;
}
