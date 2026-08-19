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
import FAQ from "@/components/FAQ";
import About from "@/components/About";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
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
