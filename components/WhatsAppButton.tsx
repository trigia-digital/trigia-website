"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { buildWhatsAppHref } from "@/lib/whatsapp";

export default function WhatsAppButton() {
  const t = useTranslations("whatsapp");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const href = buildWhatsAppHref(t("message"));

  return (
    <div className="group fixed bottom-6 right-6 z-[950] flex items-center">
      <span
        className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full border border-line bg-dark-gray px-4 py-2 text-sm font-medium text-white opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
        aria-hidden="true"
      >
        {t("label")}
      </span>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("label")}
        className="relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-300 hover:scale-105"
        style={{ backgroundColor: "#25D366" }}
      >
        {!reducedMotion && (
          <>
            <span className="wa-pulse-ring" aria-hidden="true" />
            <span className="wa-pulse-ring" style={{ animationDelay: "1.3s" }} aria-hidden="true" />
          </>
        )}
        <svg viewBox="0 0 24 24" fill="currentColor" className="relative z-10 h-7 w-7" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12.004 2.003h-.358c-5.514 0-9.997 4.483-9.997 9.997 0 1.762.464 3.484 1.345 4.997l-1.428 5.212a1 1 0 0 0 1.225 1.225l5.212-1.428a9.958 9.958 0 0 0 4.997 1.345h.004c5.514 0 9.997-4.483 9.997-9.997 0-5.514-4.483-9.997-9.997-9.997zm.004 18.184h-.004a8.16 8.16 0 0 1-4.15-1.135l-.297-.176-3.096.848.85-3.02-.194-.31a8.144 8.144 0 0 1-1.256-4.394c0-4.507 3.671-8.178 8.183-8.178 2.186 0 4.24.852 5.785 2.398a8.13 8.13 0 0 1 2.394 5.785c0 4.507-3.67 8.182-8.215 8.182z" />
        </svg>
      </a>
    </div>
  );
}
