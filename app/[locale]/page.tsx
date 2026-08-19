import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import GrowthCurve from "@/components/GrowthCurve";
import Belief from "@/components/Belief";
import Services from "@/components/Services";
import Solutions from "@/components/Solutions";
import Packages from "@/components/Packages";
import Process from "@/components/Process";
import Work from "@/components/Work";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

// Below-the-fold sections: code-split into separate chunks deferred from the
// initial bundle, but still server-rendered (no ssr:false) so content stays
// in the first HTML response — no SEO loss, no layout shift from a late pop-in.
const FAQ = dynamic(() => import("@/components/FAQ"));
const About = dynamic(() => import("@/components/About"));

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* LCP element: Hero's .hero-bg background-image. Preloaded here (not
          the root layout) since Hero only renders on this route. */}
      <link rel="preload" as="image" href="/bg-curve-2.jpg" fetchPriority="high" />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <GrowthCurve variant={1} />
        <Belief />
        <Services />
        <Solutions />
        <Packages />
        <Process />
        <Work />
        <FAQ />
        <GrowthCurve variant={2} />
        <About />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
