"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { revealVariants, revealViewport } from "@/lib/motion";

export default function Belief() {
  const t = useTranslations("belief");
  return (
    <section className="relative overflow-hidden py-[150px]" id="belief">
      <div
        className="blob"
        style={{ width: 420, height: 420, background: "var(--orange)", top: -100, right: "8%" }}
        aria-hidden="true"
      />
      <div className="wrap relative z-10 grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-16 items-start">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={revealVariants}
        >
          <div className="eyebrow">{t("eyebrow")}</div>
          <h2 className="font-display font-semibold text-[clamp(32px,4vw,52px)] leading-[1.12] mt-4">
            {t("heading")}
          </h2>
        </m.div>
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={revealVariants}
          className="pt-3.5"
        >
          <p className="text-text-dim text-[17px] max-w-[460px]">{t("body")}</p>
        </m.div>
      </div>
    </section>
  );
}
