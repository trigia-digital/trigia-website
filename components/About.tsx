"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { revealVariants, revealViewport } from "@/lib/motion";

export default function About() {
  const t = useTranslations("about");
  return (
    <section className="relative overflow-hidden py-[120px]" id="about">
      <div
        className="blob"
        style={{ width: 380, height: 380, background: "var(--orange)", bottom: -140, left: "4%", opacity: 0.12 }}
        aria-hidden="true"
      />
      <div className="wrap relative z-10 grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-16 items-start">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={revealVariants}
        >
          <div className="eyebrow">{t("eyebrow")}</div>
          <h2 className="font-display font-semibold text-[clamp(30px,3.6vw,44px)] leading-[1.15] mt-4">
            {t("heading")}
          </h2>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={revealVariants}
          className="pt-3.5"
        >
          <p className="text-text-dim text-base max-w-[480px] mb-5">{t("paragraph1")}</p>
          <p className="text-text-dim text-base max-w-[480px]">{t("paragraph2")}</p>
        </motion.div>
      </div>
    </section>
  );
}
