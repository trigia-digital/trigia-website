"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

const LOCALES = [
  { code: "id", label: "ID" },
  { code: "en", label: "EN" },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(code: string) {
    if (code === locale) return;
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.replace(`${pathname}${hash}`, { locale: code });
  }

  return (
    <div className="flex items-center gap-1.5 text-sm font-medium">
      {LOCALES.map((l, i) => (
        <span key={l.code} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-text-dim">/</span>}
          <button
            type="button"
            onClick={() => switchTo(l.code)}
            aria-current={locale === l.code}
            className={`transition-colors duration-200 ${
              locale === l.code ? "text-white" : "text-text-dim hover:text-orange"
            }`}
          >
            {l.label}
          </button>
        </span>
      ))}
    </div>
  );
}
