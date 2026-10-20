"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
  /** Wipe-style reveal for images (clip-path) instead of a fade-up */
  variant?: "fade" | "image";
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function RevealAnimation({
  children,
  delay = 0,
  y = 28,
  x = 0,
  className,
  variant = "fade",
}: Props) {
  if (variant === "image") {
    return (
      <motion.div
        className={className}
        initial={{ clipPath: "inset(12% 0% 0% 0% round 28px)", opacity: 0, scale: 0.97 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 28px)", opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
