"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { revealVariants, revealViewport } from "@/lib/motion";
import { Link } from "@/i18n/navigation";
import SpotlightCard from "./SpotlightCard";
import { buildWhatsAppHref } from "@/lib/whatsapp";

type PackageItem = {
  name: string;
  price: string;
  note?: string;
  commitment?: string;
  suitedFor: string;
  includes: string[];
};

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function Packages() {
  const t = useTranslations("packages");
  const tWhatsapp = useTranslations("whatsapp");
  const items = t.raw("items") as PackageItem[];
  const waHref = buildWhatsAppHref(tWhatsapp("message"));

  return (
    <section className="py-[120px]" id="packages">
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
          {items.map((pkg, i) => {
            const isPremiumTier = i >= 2;
            const isFlagship = i === 3;

            return (
              <m.div
                key={pkg.name}
                initial="hidden"
                whileInView="visible"
                viewport={revealViewport}
                variants={revealVariants}
                transition={{ delay: i * 0.08 }}
              >
                <SpotlightCard
                  className={`h-full p-10 flex flex-col gap-4 border-t-2 transition-colors duration-300 ${
                    isFlagship
                      ? "bg-gradient-to-br from-dark-gray to-[#241206] border-t-orange shadow-[0_0_60px_-15px_rgba(255,90,31,0.35)] hover:to-[#2c1608]"
                      : isPremiumTier
                        ? "bg-dark-gray border-t-orange hover:bg-obsidian"
                        : "bg-obsidian border-t-transparent hover:bg-dark-gray"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      {isFlagship && (
                        <div className="text-[11px] tracking-[0.1em] uppercase text-orange font-semibold mb-1.5">
                          {t("flagshipLabel")}
                        </div>
                      )}
                      <h3 className="font-display text-[26px] font-semibold leading-tight">{pkg.name}</h3>
                    </div>
                    {isPremiumTier && pkg.commitment && (
                      <span className="text-[11px] tracking-[0.08em] uppercase font-semibold text-orange border border-orange/40 rounded-full px-3 py-1 whitespace-nowrap">
                        <span className="sr-only">{t("commitmentLabel")}: </span>
                        {pkg.commitment}
                      </span>
                    )}
                  </div>

                  <div>
                    <div
                      className={`font-display font-semibold ${
                        isPremiumTier ? "text-xl text-text-dim" : "text-[28px] text-white"
                      }`}
                    >
                      {pkg.price}
                    </div>
                    {pkg.note && <div className="text-[13px] text-orange mt-1.5">{pkg.note}</div>}
                  </div>

                  <p className="text-text-dim text-[15px] leading-relaxed">{pkg.suitedFor}</p>

                  <div className="flex flex-wrap gap-2 border-t border-line pt-5 mt-auto">
                    {pkg.includes.map((item) => (
                      <span
                        key={item}
                        className="text-[12px] text-text-dim border border-line rounded-full px-3.5 py-1.5"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn ${isPremiumTier ? "btn-ghost" : "btn-primary"}`}
                  >
                    {isPremiumTier ? t("ctaConsult") : t("ctaDirect")}
                    <ArrowIcon />
                  </a>
                </SpotlightCard>
              </m.div>
            );
          })}
        </div>

        <div className="mt-10">
          <Link
            href="/rate-card"
            className="inline-flex items-center gap-2 text-sm text-text-dim hover:text-orange transition-colors"
          >
            {t("rateCardLink")}
          </Link>
        </div>
      </div>
    </section>
  );
}
