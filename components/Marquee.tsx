import { getTranslations } from "next-intl/server";

export default async function Marquee() {
  const t = await getTranslations("marquee");
  const items = t.raw("items") as string[];
  const loop = [...items, ...items];

  return (
    <div className="marquee">
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-5">
            {item}
            <span className="dot">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
