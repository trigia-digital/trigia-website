"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { revealVariants, revealViewport } from "@/lib/motion";
import SpotlightCard from "./SpotlightCard";

type WorkCase = {
  type: "selfInitiated" | "client";
  tag: string;
  title: string;
  url?: string;
  image?: string;
  challenge: string;
  solution: string;
  result: string;
};

type WorkLabels = {
  challenge: string;
  solution: string;
  result: string;
  selfInitiated: string;
  client: string;
  visitSite: string;
};

function WorkCard({
  workCase,
  labels,
  delay,
}: {
  workCase: WorkCase;
  labels: WorkLabels;
  delay: number;
}) {
  const { type, tag, title, url, image, challenge, solution, result } = workCase;
  const isClient = type === "client";

  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={revealVariants}
      transition={{ delay }}
    >
      <SpotlightCard className="work-card h-full">
        {image && (
          <div className="relative w-full aspect-[16/10] border-b border-line">
            <Image
              src={image}
              alt={`${title} website preview`}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col gap-[18px] p-10">
          <span
            className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
              isClient ? "border-orange text-orange" : "border-line text-text-dim"
            }`}
          >
            {isClient ? labels.client : labels.selfInitiated}
          </span>

          <div className="text-[11px] tracking-[0.1em] uppercase text-orange font-semibold">{tag}</div>
          <h3 className="font-display text-xl font-semibold">{title}</h3>

          <div className="flex flex-col gap-2.5 text-[13px] text-text-dim border-t border-line pt-4 mt-auto">
            <div>
              <b className="text-white font-semibold">{labels.challenge} —</b> {challenge}
            </div>
            <div>
              <b className="text-white font-semibold">{labels.solution} —</b> {solution}
            </div>
            <div>
              <b className="text-white font-semibold">{labels.result} —</b> {result}
            </div>
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-orange text-[13px] font-semibold mt-1 transition-all hover:gap-2.5"
              >
                {labels.visitSite}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </SpotlightCard>
    </m.div>
  );
}

export default function Work() {
  const t = useTranslations("work");
  const cases = t.raw("cases") as WorkCase[];
  const labels = t.raw("labels") as WorkLabels;

  return (
    <section className="py-[120px]" id="work">
      <div className="wrap">
        <div className="mb-16">
          <div className="eyebrow">{t("eyebrow")}</div>
          <h2 className="font-display font-semibold text-[clamp(30px,3.6vw,46px)] mt-4">
            {t("heading")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line border border-line">
          {cases.map((c, i) => (
            <WorkCard key={c.title} workCase={c} labels={labels} delay={i * 0.08} />
          ))}
        </div>

        <p className="mt-7 text-[13px] text-text-dim">{t("note")}</p>
      </div>
    </section>
  );
}
