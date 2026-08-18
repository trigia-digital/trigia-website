import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SpotlightCard from "@/components/SpotlightCard";
import { buildWhatsAppHref } from "@/lib/whatsapp";

type RateCardLineItem = {
  name: string;
  price: string;
  facilities: string[];
  addons?: string[];
  note?: string;
};

type RateCardCategory = {
  id: string;
  number: string;
  name: string;
  items: RateCardLineItem[];
  note?: string;
};

type RateCardBundle = {
  name: string;
  tagline: string;
  price: string;
  flagship?: boolean;
  includes: string[];
};

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "rateCard" });

  return {
    title: `${t("title")} Rate Card`,
    description: t("metaDescription"),
  };
}

export default async function RateCardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("rateCard");
  const tWhatsapp = await getTranslations("whatsapp");

  const categories = t.raw("categories") as RateCardCategory[];
  const bundles = t.raw("bundling.items") as RateCardBundle[];
  const waHref = buildWhatsAppHref(tWhatsapp("message"));

  return (
    <>
      <Header />
      <main>
        <section className="pt-[150px] pb-[70px]">
          <div className="wrap text-center">
            <div className="eyebrow mx-auto justify-center">{t("eyebrow")}</div>
            <h1 className="font-display font-semibold text-[clamp(36px,5.5vw,64px)] leading-[1.05] mt-4">
              {t("title")}
            </h1>
            <p className="text-text-dim text-lg mt-3">{t("subtitle")}</p>
          </div>
        </section>

        <section className="pb-[100px]">
          <div className="wrap">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
              {categories.map((category) => (
                <div key={category.id} id={category.id} className="border-t border-line py-9 scroll-mt-28">
                  <div className="flex items-baseline gap-3 mb-7">
                    <span className="font-display text-sm text-text-dim">{category.number}</span>
                    <h2 className="font-display text-2xl font-semibold">{category.name}</h2>
                  </div>

                  <div className="flex flex-col gap-7">
                    {category.items.map((item) => (
                      <div key={item.name}>
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                          <span className="font-display font-semibold text-[15px]">{item.name}</span>
                          <span className="flex-1 min-w-[16px] border-b border-dotted border-line translate-y-[-4px]" />
                          <span className="font-display font-semibold text-orange text-[15px] whitespace-nowrap">
                            {item.price}
                          </span>
                        </div>
                        <ul className="mt-2.5 flex flex-col gap-1.5">
                          {item.facilities.map((f) => (
                            <li key={f} className="text-[13px] text-text-dim leading-relaxed pl-3.5 relative">
                              <span className="absolute left-0 text-orange">·</span>
                              {f}
                            </li>
                          ))}
                        </ul>
                        {item.addons && item.addons.length > 0 && (
                          <p className="text-[12px] text-text-dim/70 mt-2 pl-3.5">
                            + {t("addonLabel")}: {item.addons.join(", ")}
                          </p>
                        )}
                        {item.note && <p className="text-[12px] text-orange/80 mt-2 pl-3.5">{item.note}</p>}
                      </div>
                    ))}
                  </div>

                  {category.note && (
                    <p className="text-[12px] text-text-dim italic mt-6">{category.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-[100px] bg-dark-gray">
          <div className="wrap">
            <div className="mb-14">
              <div className="eyebrow">{t("bundling.heading")}</div>
              <h2 className="font-display font-semibold text-[clamp(30px,3.6vw,46px)] max-w-[620px] mt-4">
                {t("bundling.intro")}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line">
              {bundles.map((bundle) => (
                <SpotlightCard
                  key={bundle.name}
                  className={`h-full p-10 flex flex-col gap-4 border-t-2 transition-colors duration-300 ${
                    bundle.flagship
                      ? "bg-gradient-to-br from-obsidian to-[#241206] border-t-orange shadow-[0_0_60px_-15px_rgba(255,90,31,0.35)] hover:to-[#2c1608]"
                      : "bg-obsidian border-t-transparent hover:bg-dark-gray"
                  }`}
                >
                  {bundle.flagship && (
                    <div className="text-[11px] tracking-[0.1em] uppercase text-orange font-semibold">
                      {t("flagshipLabel")}
                    </div>
                  )}
                  <h3 className="font-display text-[26px] font-semibold leading-tight">{bundle.name}</h3>
                  <p className="text-text-dim text-[14px]">{bundle.tagline}</p>
                  <div className="font-display text-xl font-semibold text-orange">{bundle.price}</div>
                  <div className="flex flex-wrap gap-2 border-t border-line pt-5 mt-auto">
                    {bundle.includes.map((item) => (
                      <span
                        key={item}
                        className="text-[12px] text-text-dim border border-line rounded-full px-3.5 py-1.5"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        <section className="py-[90px]">
          <div className="wrap text-center">
            <p className="text-text-dim text-sm max-w-[520px] mx-auto mb-7">{t("footnote")}</p>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {t("cta")}
              <ArrowIcon />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
