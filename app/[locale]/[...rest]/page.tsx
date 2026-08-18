import { notFound } from "next/navigation";

// Catches any path under a locale that doesn't match a real route.
// Without this, Next.js has no route to match against for unknown paths
// and falls back to the root app/not-found.tsx instead of this segment's
// locale-aware app/[locale]/not-found.tsx.
export default function CatchAll() {
  notFound();
}
