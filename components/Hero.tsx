"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import MagneticButton from "./MagneticButton";
import FlowCanvas from "./FlowCanvas";
import HeroSweep from "./HeroSweep";
import { buildWhatsAppHref } from "@/lib/whatsapp";

export default function Hero() {
  const t = useTranslations("hero");
  const words = t.raw("headlineWords") as string[];
  const accentIndex = t.raw("headlineAccentIndex") as number;
  const waHref = buildWhatsAppHref(t("whatsappMessage"));
  const bgRef = useRef<HTMLDivElement>(null);
  const bgLeftRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if ((window as unknown as { __trigiaIntroDone?: boolean }).__trigiaIntroDone) {
      setIntroDone(true);
      return;
    }

    function handleIntroDone() {
      setIntroDone(true);
    }

    window.addEventListener("trigia-intro-done", handleIntroDone);
    return () => window.removeEventListener("trigia-intro-done", handleIntroDone);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const isCoarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    let scrollY = 0;
    const mouse = { targetX: 0, targetY: 0, x: 0, y: 0 };
    let raf = 0;

    function handleScroll() {
      scrollY = window.scrollY;
    }

    function handleMouseMove(e: MouseEvent) {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    function tick() {
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      if (contentRef.current) {
        contentRef.current.style.transform = `translate(${mouse.x * 6}px, ${mouse.y * 4}px)`;
      }
      if (bgRef.current) {
        bgRef.current.style.transform = `translate(${mouse.x * 16}px, ${scrollY * 0.12 + mouse.y * 10}px)`;
      }
      if (bgLeftRef.current) {
        // Same intensity as bgRef, mirrored horizontally to match the
        // mirrored curve — the two wings tilt apart/together instead of
        // sliding in lockstep, which reads more naturally as a mirror pair.
        bgLeftRef.current.style.transform = `translate(${mouse.x * -16}px, ${scrollY * 0.12 + mouse.y * 10}px)`;
      }
      if (canvasWrapRef.current) {
        canvasWrapRef.current.style.transform = `translate(${mouse.x * 26}px, ${scrollY * 0.08 + mouse.y * 16}px)`;
      }
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    if (!isCoarsePointer) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero relative min-h-screen flex items-center pt-[100px] overflow-hidden" id="home">
      <div
        ref={bgRef}
        className="hero-bg"
        style={{ backgroundImage: "url('/bg-curve-2.jpg')" }}
      />
      <div ref={bgLeftRef} className="hero-bg-left" aria-hidden="true">
        <div className="hero-bg-left-inner" style={{ backgroundImage: "url('/bg-curve-2.jpg')" }} />
      </div>
      <div
        className="blob"
        style={{ width: 340, height: 340, background: "var(--orange)", top: 0, right: "15%", opacity: 0.14 }}
        aria-hidden="true"
      />
      <div ref={canvasWrapRef}>
        <FlowCanvas />
      </div>

      <HeroSweep />

      <div className="wrap">
        <motion.div style={{ opacity: heroOpacity, y: heroY }}>
          <div ref={contentRef} className="max-w-[680px]">
            <div className="eyebrow">{t("eyebrow")}</div>

            <h1 className="hero-headline font-display font-semibold leading-[1.04] my-[22px] text-[clamp(42px,6.2vw,76px)]">
              {words.map((w, i) => (
                <span
                  key={i}
                  className={`${introDone ? "word" : "word-pending"} ${i === accentIndex ? "accent" : ""}`}
                  style={{ animationDelay: `${0.05 + i * 0.07}s` }}
                >
                  {w}
                </span>
              ))}
            </h1>

            <p className="text-lg text-text-dim max-w-[520px] mb-[38px]">{t("subtext")}</p>

            <div className="flex gap-4 flex-wrap">
              <MagneticButton href={waHref} variant="primary">
                {t("ctaPrimary")}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </MagneticButton>
              <MagneticButton href="#work" variant="ghost">
                {t("ctaGhost")}
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-6 md:left-10 z-[2] hidden md:flex items-center gap-3 text-xs text-text-dim tracking-wider uppercase"
      >
        <div className="scroll-line" />
      </motion.div>
    </section>
  );
}
