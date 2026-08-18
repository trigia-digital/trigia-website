import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCover from "@/components/ArticleCover";
import { getAllArticles, coverImageExists } from "@/lib/articles";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "articlesPage" });

  return {
    title: `${t("heading")} — TRIGIA`,
    description: t("metaDescription"),
  };
}

function formatDate(dateStr: string, locale: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export default async function ArticlesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("articlesPage");
  const articles = getAllArticles(locale);

  return (
    <>
      <Header />
      <main>
        {articles.length === 0 ? (
          <section className="min-h-screen flex items-center pt-[150px] pb-[100px]">
            <div className="wrap text-center">
              <div className="eyebrow mx-auto justify-center">{t("eyebrow")}</div>
              <h1 className="font-display font-semibold text-[clamp(34px,5vw,58px)] leading-[1.1] mt-4 max-w-[720px] mx-auto">
                {t("heading")}
              </h1>
              <p className="text-text-dim text-lg mt-5 max-w-[560px] mx-auto">{t("comingSoonDesc")}</p>

              <div className="mt-10 flex flex-col items-center gap-8">
                <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase font-semibold text-orange border border-orange/40 rounded-full px-4 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
                  {t("comingSoonLabel")}
                </span>
                <Link href="/" className="btn btn-ghost">
                  {t("backButton")}
                </Link>
              </div>
            </div>
          </section>
        ) : (
          <section className="pt-[150px] pb-[130px]">
            <div className="wrap">
              <div className="mb-16">
                <div className="eyebrow">{t("eyebrow")}</div>
                <h1 className="font-display font-semibold text-[clamp(30px,3.6vw,46px)] mt-4">
                  {t("heading")}
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line border border-line">
                {articles.map((article) => (
                  <Link key={article.slug} href={`/articles/${article.slug}`} className="group">
                    <div className="h-full bg-obsidian flex flex-col transition-colors duration-300 group-hover:bg-dark-gray">
                      <ArticleCover
                        src={article.coverImage}
                        hasImage={coverImageExists(article.coverImage)}
                        alt={article.title}
                      />
                      <div className="p-8 flex-1 flex flex-col gap-3">
                        <div className="flex items-center gap-3 text-[12px] text-text-dim">
                          {article.category && (
                            <span className="text-orange font-semibold uppercase tracking-[0.06em]">
                              {article.category}
                            </span>
                          )}
                          {article.category && article.publishedAt && <span aria-hidden="true">·</span>}
                          {article.publishedAt && <span>{formatDate(article.publishedAt, locale)}</span>}
                        </div>
                        <h2 className="font-display text-xl font-semibold leading-snug">{article.title}</h2>
                        {article.excerpt && (
                          <p className="text-text-dim text-[14px] leading-relaxed">{article.excerpt}</p>
                        )}
                        {article.readingTime && (
                          <div className="text-[12px] text-text-dim mt-auto pt-3">{article.readingTime}</div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
