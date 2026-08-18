import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "./globals.css";
import { routing } from "@/i18n/routing";
import Grain from "@/components/Grain";
import Spotlight from "@/components/Spotlight";
import CustomCursor from "@/components/CustomCursor";
import Intro from "@/components/Intro";
import WhatsAppButton from "@/components/WhatsAppButton";
import SmoothScroll from "@/components/SmoothScroll";
import { SITE_URL, INSTAGRAM_URL } from "@/lib/site";

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
    title: t("title"),
    description: t("description"),
    icons: { icon: "/favicon.png" },
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
        <NextIntlClientProvider>
          <SmoothScroll />
          <Grain />
          <Spotlight />
          <CustomCursor />
          <Intro />
          <WhatsAppButton />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
