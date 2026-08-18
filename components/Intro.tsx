"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Intro() {
  const introRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intro = introRef.current;
    const burst = burstRef.current;
    const ring = ringRef.current;
    const logo = logoRef.current;
    const tagline = taglineRef.current;
    if (!intro || !burst || !ring || !logo || !tagline) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.style.overflow = "hidden";

    function finishIntro() {
      document.documentElement.style.overflow = "";
      intro!.classList.add("hidden");
      window.dispatchEvent(new Event("trigia-intro-done"));
      (window as unknown as { __trigiaIntroDone?: boolean }).__trigiaIntroDone = true;
    }

    if (reduced) {
      logo.classList.add("pop");
      const t = setTimeout(() => {
        intro.style.transition = "opacity .4s ease";
        intro.style.opacity = "0";
        setTimeout(finishIntro, 420);
      }, 350);
      return () => clearTimeout(t);
    }

    // Build radiating burst lines around the logo
    const LINE_COUNT = 16;
    const maxLen = Math.max(window.innerWidth, window.innerHeight) * 0.55;
    const lineEls: HTMLDivElement[] = [];
    for (let i = 0; i < LINE_COUNT; i++) {
      const angle = (360 / LINE_COUNT) * i;
      const line = document.createElement("div");
      line.className = "intro-line";
      line.style.transform = `rotate(${angle}deg)`;
      line.style.setProperty("--len", maxLen * (0.6 + Math.random() * 0.4) + "px");
      line.style.animationDelay = Math.random() * 0.15 + "s";
      burst.appendChild(line);
      lineEls.push(line);
    }

    const raf1 = requestAnimationFrame(() => {
      logo.classList.add("pop");
      ring.classList.add("go");
      tagline.classList.add("go");
      lineEls.forEach((l) => l.classList.add("go"));
    });

    // After the logo pop, fly it into the navbar position, then wipe the overlay open
    const flyTimer = setTimeout(() => {
      const navBrand = document.getElementById("nav-logo");
      if (navBrand) {
        const from = logo.getBoundingClientRect();
        const to = navBrand.getBoundingClientRect();
        const scale = to.width / from.width;
        const dx = to.left + to.width / 2 - (from.left + from.width / 2);
        const dy = to.top + to.height / 2 - (from.top + from.height / 2);
        intro.style.setProperty("--wipe-x", to.left + to.width / 2 + "px");
        intro.style.setProperty("--wipe-y", to.top + to.height / 2 + "px");

        // The 'pop' keyframe animation still fills the transform (forwards);
        // freeze it to a plain inline style first so the fly transition isn't overridden.
        logo.classList.remove("pop");
        logo.style.opacity = "1";
        logo.style.transform = "scale(1)";
        void logo.offsetWidth; // force reflow so the freeze commits before we transition
        logo.classList.add("fly");
        logo.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
      }
      const wipeTimer = setTimeout(() => {
        intro!.classList.add("wipe");
        setTimeout(finishIntro, 1050);
      }, 260);
      return () => clearTimeout(wipeTimer);
    }, 900);

    return () => {
      cancelAnimationFrame(raf1);
      clearTimeout(flyTimer);
    };
  }, []);

  return (
    <div className="intro" ref={introRef} aria-hidden="true">
      <div className="intro-burst" ref={burstRef} />
      <div className="intro-ring" ref={ringRef} />
      <div className="intro-logo" ref={logoRef}>
        <Image src="/logo-mark.png" alt="" width={68} height={68} priority />
      </div>
      <div className="intro-tagline" ref={taglineRef}>
        Your Digital Growth Partner
      </div>
    </div>
  );
}
