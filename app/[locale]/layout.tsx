import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Script from "next/script";
import { LazyMotion, domAnimation } from "framer-motion";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "./globals.css";
import { routing } from "@/i18n/routing";
import Grain from "@/components/Grain";
import Intro from "@/components/Intro";
import WhatsAppButton from "@/components/WhatsAppButton";
import DeferredEffects from "@/components/DeferredEffects";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL, INSTAGRAM_URL, urlFor } from "@/lib/site";

const GA_MEASUREMENT_ID = "G-XQCC36KYW7";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TRIGIA Digital",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-mark.png`,
  description:
    "TRIGIA Digital — Your Digital Growth Partner. Membangun website, web app, mobile app, digital marketing, dan AI automation untuk bisnis di Indonesia.",
  sameAs: [INSTAGRAM_URL],
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    icons: { icon: "/favicon.png" },
    verification: { google: "mQN39Nkfxc8lmmqtE22mdF6gXC7is-yFjwGAw7X7atg" },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: urlFor(locale, "/"),
      siteName: "TRIGIA Digital",
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga4-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}');
                `,
              }}
            />
          </>
        )}
        <NextIntlClientProvider>
          <LazyMotion features={domAnimation} strict>
            <Grain />
            <DeferredEffects />
            <Intro />
            <WhatsAppButton />
            {children}
            <Analytics />
          </LazyMotion>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
