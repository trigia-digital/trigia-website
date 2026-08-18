"use client";

import { useEffect, useRef, useState } from "react";

const PREVIEW_WIDTH = 1440;
const PREVIEW_HEIGHT = 900;

type PrototypePreviewProps = {
  src: string;
};

// Prototypes are full 1440x900 desktop pages. Rather than re-rendering them
// responsively, we load the fixed-size page in an iframe and scale it down
// with a CSS transform so it fits the card — same trick as a live thumbnail.
//
// Some prototype files are several MB (one is ~7MB). The native `loading="lazy"`
// hint on <iframe> is not a guarantee — browsers apply their own distance
// heuristics and can fetch well ahead of scroll (measured: all 12 iframes on
// /prototype fired their requests within ~1.5s of page load, before any
// scrolling). So visibility is gated explicitly via IntersectionObserver and
// `src` is only set once the card is actually near the viewport.
export default function PrototypePreview({ src }: PrototypePreviewProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    function updateScale() {
      if (!el) return;
      setScale(el.getBoundingClientRect().width / PREVIEW_WIDTH);
    }

    updateScale();
    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(el);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          intersectionObserver.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    intersectionObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full aspect-video overflow-hidden bg-dark-gray border-b border-line">
      {inView && (
        <iframe
          src={src}
          title={src.split("/").pop()}
          width={PREVIEW_WIDTH}
          height={PREVIEW_HEIGHT}
          loading="lazy"
          tabIndex={-1}
          className="pointer-events-none absolute left-0 top-0 border-0 origin-top-left"
          style={{ transform: `scale(${scale})`, opacity: scale ? 1 : 0 }}
        />
      )}
    </div>
  );
}
