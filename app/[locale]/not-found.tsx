import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { buildWhatsAppHref } from "@/lib/whatsapp";

// Rendered inside app/[locale]/layout.tsx, which already calls
// setRequestLocale() — next-intl picks up the current request locale
// automatically here, so no explicit locale param is needed.
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("notFound");
  return { title: `404 — ${t("heading")}` };
}

export default async function NotFound() {
  const t = await getTranslations("notFound");
  const tNav = await getTranslations("nav");
  const waHref = buildWhatsAppHref(t("whatsappMessage"));

  const quickLinks = [
    { href: "/#services", label: tNav("services") },
    { href: "/#work", label: tNav("work") },
    { href: "/rate-card", label: tNav("rateCard") },
    { href: "/articles", label: tNav("articles") },
  ];

  return (
    <>
      <Header />
      <main>
        <section className="relative min-h-screen flex items-center pt-[150px] pb-[100px] overflow-hidden">
          <div
            className="blob"
            style={{
              width: 420,
              height: 420,
              background: "var(--orange)",
              top: "12%",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            aria-hidden="true"
          />

          <div className="wrap relative z-[1] text-center animate-fadeInUp">
            <div className="font-display font-bold leading-none text-[clamp(90px,16vw,180px)] text-transparent bg-clip-text bg-gradient-to-b from-orange to-orange/20">
              {t("code")}
            </div>
            <h1 className="font-display font-semibold text-[clamp(28px,4vw,46px)] mt-4">{t("heading")}</h1>
            <p className="text-text-dim text-lg mt-4 max-w-[520px] mx-auto">{t("subtext")}</p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/" className="btn btn-primary">
                {t("ctaPrimary")}
              </Link>
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                {t("ctaSecondary")}
              </a>
            </div>

            <div className="mt-16 pt-10 border-t border-line max-w-[480px] mx-auto">
              <div className="text-[11px] tracking-[0.1em] uppercase text-text-dim font-semibold mb-5">
                {t("quickLinksLabel")}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm hover:text-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
