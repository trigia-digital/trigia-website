"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

type Props = {
  href: string;
  variant?: "primary" | "ghost";
  className?: string;
  children: React.ReactNode;
};

export default function MagneticButton({ href, variant = "primary", className = "", children }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isCoarsePointer || prefersReduced) return;

    const el = ref.current;
    if (!el) return;

    function handleMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      el!.style.transform = `translate(${relX * 0.28}px, ${relY * 0.35}px)`;
    }
    function handleLeave() {
      el!.style.transform = "translate(0,0)";
    }

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const variantClass = variant === "primary" ? "btn-primary" : "btn-ghost";
  const isExternal = href.startsWith("http");

  return (
    <Link
      href={href}
      ref={ref}
      className={`btn ${variantClass} ${className}`}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}
