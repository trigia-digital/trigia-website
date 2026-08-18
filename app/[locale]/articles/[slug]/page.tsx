import type { Metadata } from "next";
import type { ComponentPropsWithoutRef } from "react";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCover from "@/components/ArticleCover";
import { getAllArticles, getArticleBySlug, coverImageExists } from "@/lib/articles";

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
);

// Maps raw MDX output to brand-consistent elements — font-display for
// headings, font-body (the default body font) for text, orange accents.
const mdxComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h2 className="font-display text-3xl font-semibold mt-12 mb-4 first:mt-0" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="font-display text-2xl font-semibold mt-12 mb-4 first:mt-0" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="font-display text-xl font-semibold mt-8 mb-3" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="text-text-dim text-[16px] leading-relaxed mb-5" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="list-disc pl-5 text-text-dim text-[16px] leading-relaxed mb-5 space-y-1.5" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="list-decimal pl-5 text-text-dim text-[16px] leading-relaxed mb-5 space-y-1.5" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a className="text-orange hover:underline" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="text-white font-semibold" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="border-l-2 border-orange pl-4 italic text-text-dim my-6" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code className="bg-dark-gray px-1.5 py-0.5 rounded text-[14px] font-mono" {...props} />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="overflow-x-auto mb-6 border border-line">
      <table className="w-full border-collapse text-[14px]" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<"thead">) => (
    <thead className="bg-dark-gray" {...props} />
  ),
  tr: (props: ComponentPropsWithoutRef<"tr">) => (
    <tr className="border-b border-line last:border-b-0" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th className="text-left font-display font-semibold text-white py-3 px-4 whitespace-nowrap" {...props} />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="text-text-dim py-3 px-4 align-top" {...props} />
  ),
};

type PageParams = { locale: string; slug: string };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllArticles(locale).map((article) => ({ locale, slug: article.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(locale, slug);
  if (!article) return {};

  return {
    title: article.metaTitle || `${article.title} — TRIGIA`,
    description: article.metaDescription || article.excerpt || undefined,
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

export default async function ArticleDetailPage({ params }: { params: Promise<PageParams> }) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(locale, slug);
  if (!article) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("articlesPage");
  const hasImage = coverImageExists(article.coverImage);

  return (
    <>
      <Header />
      <main>
        <article className="pt-[150px] pb-[130px]">
          <div className="wrap max-w-[720px] mx-auto">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-sm text-text-dim hover:text-orange transition-colors mb-10"
            >
              <BackIcon />
              {t("backButton")}
            </Link>

            <div className="flex items-center gap-3 text-[12px] text-text-dim mb-4">
              {article.category && (
                <span className="text-orange font-semibold uppercase tracking-[0.06em]">
                  {article.category}
                </span>
              )}
              {article.category && article.publishedAt && <span aria-hidden="true">·</span>}
              {article.publishedAt && <span>{formatDate(article.publishedAt, locale)}</span>}
              {article.readingTime && <span aria-hidden="true">·</span>}
              {article.readingTime && <span>{article.readingTime}</span>}
            </div>

            <h1 className="font-display font-semibold text-[clamp(32px,4.6vw,48px)] leading-[1.15] mb-6">
              {article.title}
            </h1>

            {article.author && <div className="text-[13px] text-text-dim mb-10">{article.author}</div>}

            <div className="mb-12 border border-line">
              <ArticleCover src={article.coverImage} hasImage={hasImage} alt={article.title} />
            </div>

            <div className="font-body">
              <MDXRemote
                source={article.content}
                components={mdxComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
            </div>

            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 border-t border-line pt-6 mt-10">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[12px] text-text-dim border border-line rounded-full px-3.5 py-1.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
