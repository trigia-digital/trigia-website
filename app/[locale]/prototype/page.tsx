import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SpotlightCard from "@/components/SpotlightCard";
import PrototypePreview from "@/components/PrototypePreview";

type PrototypeItem = {
  src: string;
  badge: string;
  title: string;
  desc: string;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "prototypePage" });

  return {
    title: `${t("heading")} — TRIGIA`,
    description: t("desc"),
  };
}

export default async function PrototypePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("prototypePage");
  const items = t.raw("items") as PrototypeItem[];

  return (
    <>
      <Header />
      <main>
        <section className="pt-[150px] pb-[130px]">
          <div className="wrap">
            <div className="mb-16 max-w-[640px]">
              <div className="eyebrow">{t("eyebrow")}</div>
              <h1 className="font-display font-semibold text-[clamp(30px,3.6vw,46px)] mt-4">
                {t("heading")}
              </h1>
              <p className="text-text-dim text-lg mt-5">{t("desc")}</p>
              <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase font-semibold text-orange border border-orange/40 rounded-full px-4 py-2 mt-6">
                <span className="w-1.5 h-1.5 rounded-full bg-orange" />
                {t("badgeLabel")}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
              {items.map((item) => (
                <SpotlightCard key={item.src} className="work-card h-full">
                  <PrototypePreview src={item.src} />

                  <div className="flex flex-1 flex-col gap-3 p-8">
                    <span className="inline-flex w-fit items-center rounded-full border border-orange text-orange px-3 py-1 text-[11px] font-semibold uppercase tracking-wide">
                      {item.badge}
                    </span>
                    <h2 className="font-display text-xl font-semibold">{item.title}</h2>
                    <p className="text-text-dim text-[14px] leading-relaxed">{item.desc}</p>
                    <a
                      href={item.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-orange text-[13px] font-semibold mt-auto pt-3 transition-all hover:gap-2.5"
                    >
                      {t("viewDemo")}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </a>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
