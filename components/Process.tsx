"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { revealVariants, revealViewport } from "@/lib/motion";

type ProcessStep = { num: string; title: string; desc: string };

export default function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as ProcessStep[];
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.75", "end 0.6"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-[110px] bg-dark-gray relative">
      <div className="wrap">
        <div className="eyebrow">{t("eyebrow")}</div>
        <h2 className="font-display font-semibold text-[clamp(30px,3.6vw,46px)] mt-4 max-w-[600px]">
          {t("heading")}
        </h2>

        <div ref={trackRef} className="mt-[70px] relative pl-10 md:pl-12">
          <div className="absolute left-[2px] md:left-[6px] top-0 bottom-0 w-0.5 bg-line" aria-hidden="true" />
          <motion.div
            className="absolute left-[2px] md:left-[6px] top-0 w-0.5 bg-orange origin-top"
            style={{ height: lineHeight }}
            aria-hidden="true"
          />

          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              className="relative py-[34px] border-t border-line last:border-b"
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
              variants={revealVariants}
              transition={{ delay: i * 0.05 }}
            >
              <motion.span
                className="absolute -left-10 md:-left-12 top-[38px] h-3 w-3 rounded-full bg-line"
                initial={{ scale: 1, backgroundColor: "#2A2A2E" }}
                whileInView={{ scale: 1.15, backgroundColor: "#FF5A1F" }}
                viewport={revealViewport}
                transition={{ duration: 0.4 }}
              />
              <div className="font-display text-[15px] text-orange font-semibold">
                {s.num} / {s.title}
              </div>
              <h3 className="font-display text-2xl font-semibold mb-2 mt-1">{s.title}</h3>
              <p className="text-text-dim text-[15px] max-w-[560px]">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
