"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import MagneticButton from "./MagneticButton";
import { revealVariants, revealViewport } from "@/lib/motion";
import { buildWhatsAppHref } from "@/lib/whatsapp";

export default function FinalCTA() {
  const t = useTranslations("finalCta");
  const waHref = buildWhatsAppHref(t("whatsappMessage"));
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    function handleScroll() {
      const bg = bgRef.current;
      const section = sectionRef.current;
      if (!bg || !section) return;
      const rect = section.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      bg.style.transform = `translateY(${(progress - 0.5) * 60}px)`;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-40 overflow-hidden text-center" id="contact">
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover opacity-55"
        style={{ backgroundImage: "url('/bg-curve-1.jpg')", backgroundPosition: "center 30%" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--obsidian) 0%, rgba(11,11,13,0.75) 40%, var(--obsidian) 100%)",
        }}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={revealVariants}
        className="relative z-[2] max-w-[720px] mx-auto"
      >
        <div className="eyebrow justify-center before:hidden">{t("eyebrow")}</div>
        <h2 className="font-display font-semibold text-[clamp(34px,5vw,64px)] leading-[1.08] my-5">
          {t("heading")}
        </h2>
        <p className="text-text-dim text-[17px] mb-10">{t("body")}</p>
        <div className="flex gap-4 flex-wrap justify-center">
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
      </motion.div>
    </section>
  );
}
