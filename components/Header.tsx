"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Link as LocaleLink } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const LINKS = [
    { href: "/#services", label: t("services") },
    { href: "/#solutions", label: t("solutions") },
    { href: "/#work", label: t("work") },
    { href: "/prototype", label: t("prototype") },
    { href: "/articles", label: t("articles") },
    { href: "/#about", label: t("about") },
    { href: "/#contact", label: t("contact") },
  ];

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="wrap">
        <nav className="flex items-center justify-between">
          <Link href="#home" className="flex items-center gap-2.5">
            <Image id="nav-logo" src="/logo-mark.png" alt="TRIGIA" width={28} height={28} priority />
            <span className="font-display text-[19px] font-bold tracking-wide">TRIGIA</span>
          </Link>

          <div
            className={`nav-links flex fixed md:static top-0 right-0 h-screen md:h-auto w-[78%] max-w-[340px] md:w-auto
              bg-dark-gray md:bg-transparent flex-col md:flex-row justify-center md:justify-start items-start md:items-center
              px-10 md:px-0 gap-7 md:gap-9 border-l border-line md:border-none
              transition-transform duration-400 ease-out z-[1001]
              ${open ? "translate-x-0" : "translate-x-full md:translate-x-0"}`}
          >
            {LINKS.map((link) => (
              <LocaleLink key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </LocaleLink>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <LocaleLink href="/#contact" className="btn btn-ghost hidden md:inline-flex !py-[11px] !px-[22px]">
              {t("cta")}
            </LocaleLink>
            <button
              className="flex md:hidden flex-col gap-[5px] p-2"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="w-[22px] h-0.5 bg-white block" />
              <span className="w-[22px] h-0.5 bg-white block" />
              <span className="w-[22px] h-0.5 bg-white block" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
