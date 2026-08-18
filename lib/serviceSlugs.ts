// Order matches messages/*.json → services.items (index 01–07).
export const SERVICE_SLUGS = [
  "website",
  "web-app",
  "mobile-app",
  "digital-marketing",
  "ai-automation",
  "branding",
  "content-production",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
