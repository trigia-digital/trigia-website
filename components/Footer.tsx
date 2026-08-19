"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { revealVariants, revealViewport } from "@/lib/motion";
import { INSTAGRAM_URL } from "@/lib/site";

const SITEMAP_LINKS = [
  { href: "#services", key: "services" },
  { href: "#solutions", key: "solutions" },
  { href: "#work", key: "work" },
  { href: "#about", key: "about" },
] as const;

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tMarquee = useTranslations("marquee");
  const serviceItems = tMarquee.raw("items") as string[];

  return (
    <footer className="border-t border-line pb-9">
      <div className="wrap">
        <m.a
          href="#contact"
          className="footer-mega"
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={revealVariants}
        >
          <span className="footer-mega-text">{t("mega")}</span>
          <span className="footer-mega-arrow">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </span>
        </m.a>

        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-8 md:gap-10 border-b border-line py-12">
          <div>
            <a href="#home" className="flex items-center gap-2.5 mb-4">
              <Image src="/logo-mark.png" alt="TRIGIA" width={28} height={28} />
              <span className="font-display text-[19px] font-bold">TRIGIA</span>
            </a>
            <p className="text-text-dim text-sm max-w-[280px]">{t("tagline")}</p>
          </div>

          <div>
            <h2 className="text-xs tracking-[0.1em] uppercase text-text-dim font-semibold mb-[18px]">
              {t("sitemapTitle")}
            </h2>
            {SITEMAP_LINKS.map((l) => (
              <a key={l.key} href={l.href} className="block text-sm mb-3 hover:text-orange transition-colors">
                {tNav(l.key)}
              </a>
            ))}
          </div>

          <div>
            <h2 className="text-xs tracking-[0.1em] uppercase text-text-dim font-semibold mb-[18px]">
              {t("servicesTitle")}
            </h2>
            {serviceItems.map((l) => (
              <a key={l} href="#services" className="block text-sm mb-3 hover:text-orange transition-colors">
                {l}
              </a>
            ))}
          </div>

          <div>
            <h2 className="text-xs tracking-[0.1em] uppercase text-text-dim font-semibold mb-[18px]">
              {t("contactTitle")}
            </h2>
            <a href="#contact" className="block text-sm mb-3 hover:text-orange transition-colors">
              {t("startProject")}
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm mb-3 hover:text-orange transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="flex justify-between items-center pt-7 text-[13px] text-text-dim flex-wrap gap-3">
          <span>{t("copyright")}</span>
          <span>{t("tagBottom")}</span>
        </div>
      </div>
    </footer>
  );
}
