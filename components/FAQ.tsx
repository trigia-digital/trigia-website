"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { revealVariants, revealViewport } from "@/lib/motion";

type FaqItem = { q: string; a: string };

export default function FAQ() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FaqItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-[110px]" id="faq">
      <div className="wrap">
        <div className="mb-16">
          <div className="eyebrow">{t("eyebrow")}</div>
          <h2 className="font-display font-semibold text-[clamp(30px,3.6vw,46px)] mt-4 max-w-[600px]">
            {t("heading")}
          </h2>
        </div>

        <div className="border-t border-line">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={item.q}
                className="border-b border-line"
                initial="hidden"
                whileInView="visible"
                viewport={revealViewport}
                variants={revealVariants}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-7 text-left"
                >
                  <span className="font-display text-lg md:text-xl font-semibold">{item.q}</span>
                  <span
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-line text-orange transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 0.84, 0.44, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-text-dim text-[15px] leading-relaxed pb-7 max-w-[720px]">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
