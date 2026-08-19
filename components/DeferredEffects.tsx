"use client";

import dynamic from "next/dynamic";

// CustomCursor and Spotlight are cosmetic-only, mouse-driven effects that
// already bail out entirely on touch devices (isCoarsePointer check). They
// carry no content/SEO value, so they're safe to fully exclude from SSR and
// the initial JS bundle — only fetched once the client mounts.
const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });
const Spotlight = dynamic(() => import("./Spotlight"), { ssr: false });

// SmoothScroll (Lenis, ~18.6 KB) is a pure UX enhancement with its own
// prefers-reduced-motion bail-out — native browser scrolling is a seamless
// fallback while this chunk loads in behind the initial paint.
const SmoothScroll = dynamic(() => import("./SmoothScroll"), { ssr: false });

export default function DeferredEffects() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <Spotlight />
    </>
  );
}
