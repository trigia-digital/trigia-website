import { Variants } from "framer-motion";

// Standard scroll-reveal used across most sections.
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.16, 0.84, 0.44, 1] },
  },
};

// Viewport settings shared by whileInView usage — fires once, slightly
// before the element fully enters (matches the old IntersectionObserver
// rootMargin behavior).
export const revealViewport = { once: true, amount: 0.15, margin: "0px 0px -60px 0px" };
