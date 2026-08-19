"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { revealVariants, revealViewport } from "@/lib/motion";
import { Link } from "@/i18n/navigation";
import { SERVICE_SLUGS } from "@/lib/serviceSlugs";

type ServiceItem = { index: string; name: string; desc: string };

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as ServiceItem[];

  return (
    <section className="pt-[100px] pb-[130px]" id="services">
      <div className="wrap">
        <div className="mb-16">
          <div className="eyebrow">{t("eyebrow")}</div>
          <h2 className="font-display font-semibold text-[clamp(30px,3.6vw,46px)] max-w-[600px] mt-4">
            {t("heading")}
          </h2>
        </div>

        {items.map((s, i) => (
          <m.div
            key={s.index}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            variants={revealVariants}
            transition={{ delay: i * 0.05 }}
          >
            <Link href={`/services/${SERVICE_SLUGS[i]}`} className="service-row">
              <div className="font-display text-sm text-text-dim">{s.index}</div>
              <div className="font-display text-[23px] font-semibold">{s.name}</div>
              <div className="service-desc text-text-dim text-[15px]">{s.desc}</div>
              <div className="service-arrow">
                <ArrowIcon />
              </div>
            </Link>
          </m.div>
        ))}
      </div>
    </section>
  );
}
