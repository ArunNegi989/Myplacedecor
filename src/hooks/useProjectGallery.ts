"use client";

import { useCallback, useRef, useState } from "react";
import type { PortfolioItem } from "@/data/portfolio";

/** Open / close state for <ProjectGallery />, returning focus to the card that opened it. */
export function useProjectGallery() {
  const [project, setProject] = useState<PortfolioItem | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((item: PortfolioItem, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setProject(item);
  }, []);

  const close = useCallback(() => {
    setProject(null);
    window.setTimeout(() => triggerRef.current?.focus({ preventScroll: true }), 0);
  }, []);

  return { project, open, close };
}
