import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { SERVICE_SLUGS, type ServiceSlug } from "@/lib/serviceSlugs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SpotlightCard from "@/components/SpotlightCard";

type ServiceDetailItem = {
  tagline: string;
  desc: string;
  suitedFor: string;
  priceFrom: string;
  rateCardAnchor: string;
};

type ServiceListItem = { index: string; name: string; desc: string };

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

type PageParams = { locale: string; slug: string };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => SERVICE_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) return {};

  const t = await getTranslations({ locale, namespace: "serviceDetails" });
  const detail = t.raw(`items.${slug}`) as ServiceDetailItem;

  return {
    title: `${detail.tagline} — TRIGIA`,
    description: detail.desc,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<PageParams> }) {
  const { locale, slug } = await params;
  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) notFound();
  setRequestLocale(locale);

  const validSlug = slug as ServiceSlug;

  const t = await getTranslations("serviceDetails");
  const tServices = await getTranslations("services");

  const services = tServices.raw("items") as ServiceListItem[];
  const service = services[SERVICE_SLUGS.indexOf(validSlug)];
  const detail = t.raw(`items.${validSlug}`) as ServiceDetailItem;

  return (
    <>
      <Header />
      <main>
        <section className="pt-[150px] pb-[70px]">
          <div className="wrap">
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 text-sm text-text-dim hover:text-orange transition-colors mb-10"
            >
              <BackIcon />
              {t("back")}
            </Link>

            <div className="eyebrow">
              {service.index} — {service.name}
            </div>
            <h1 className="font-display font-semibold leading-[1.1] mt-4 mb-6 text-[clamp(32px,4.6vw,54px)] max-w-[820px]">
              {detail.tagline}
            </h1>
            <p className="text-text-dim text-lg max-w-[620px]">{detail.desc}</p>
          </div>
        </section>

        <section className="pb-[90px]">
          <div className="wrap">
            <SpotlightCard className="bg-dark-gray border border-line p-10 md:p-12">
              <div className="text-[11px] tracking-[0.1em] uppercase text-orange font-semibold mb-4">
                {t("suitedFor")}
              </div>
              <p className="font-display text-xl md:text-2xl font-medium leading-relaxed max-w-[760px]">
                {detail.suitedFor}
              </p>
            </SpotlightCard>
          </div>
        </section>

        <section className="pb-[150px]">
          <div className="wrap">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 border-t border-line pt-12">
              <div>
                <div className="text-[11px] tracking-[0.1em] uppercase text-text-dim font-semibold mb-2">
                  {t("priceLabel")}
                </div>
                <div className="font-display text-xl md:text-2xl font-semibold max-w-[520px]">{detail.priceFrom}</div>
              </div>
              <Link href={`/rate-card#${detail.rateCardAnchor}`} className="btn btn-primary">
                {t("cta")}
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
