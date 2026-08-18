"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { revealVariants, revealViewport } from "@/lib/motion";
import SpotlightCard from "./SpotlightCard";

type SolutionItem = { tag: string; title: string; desc: string; includes: string[] };

export default function Solutions() {
  const t = useTranslations("solutions");
  const items = t.raw("items") as SolutionItem[];

  return (
    <section className="bg-dark-gray py-[120px]" id="solutions">
      <div className="wrap">
        <div className="flex justify-between items-end gap-10 flex-wrap mb-16">
          <div>
            <div className="eyebrow">{t("eyebrow")}</div>
            <h2 className="font-display font-semibold text-[clamp(30px,3.6vw,46px)] max-w-[620px] mt-4">
              {t("heading")}
            </h2>
          </div>
          <p className="max-w-[340px] text-text-dim text-[15px] pb-1.5">{t("intro")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line">
          {items.map((s, i) => (
            <motion.div
              key={s.title}
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
              variants={revealVariants}
              transition={{ delay: i * 0.08 }}
            >
              <SpotlightCard className="h-full bg-obsidian p-10 flex flex-col gap-4 transition-colors duration-300 hover:bg-dark-gray">
                <div className="text-[11px] tracking-[0.1em] uppercase text-orange font-semibold">
                  {s.tag}
                </div>
                <h3 className="font-display text-[26px] font-semibold leading-tight">{s.title}</h3>
                <p className="text-text-dim text-[15px] leading-relaxed">{s.desc}</p>
                <div className="flex flex-wrap gap-2 border-t border-line pt-5 mt-auto">
                  {s.includes.map((item) => (
                    <span
                      key={item}
                      className="text-[12px] text-text-dim border border-line rounded-full px-3.5 py-1.5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <a
            href="#packages"
            className="inline-flex items-center gap-2 text-sm text-text-dim hover:text-orange transition-colors"
          >
            {t("packagesLink")}
          </a>
        </div>
      </div>
    </section>
  );
}
