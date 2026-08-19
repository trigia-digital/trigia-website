"use client";

import { m } from "framer-motion";

type Props = {
  variant?: 1 | 2;
};

const PATHS = {
  1: "M0,30 C 320,30 320,10 640,10 C 960,10 960,50 1280,50",
  2: "M0,10 C 320,10 320,50 640,50 C 960,50 960,20 1280,20",
};

export default function GrowthCurve({ variant = 1 }: Props) {
  return (
    <div className="growth-curve">
      <svg viewBox="0 0 1280 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <m.path
          d={PATHS[variant]}
          stroke="#FF5A1F"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.8, ease: [0.16, 0.84, 0.44, 1] }}
        />
      </svg>
    </div>
  );
}
