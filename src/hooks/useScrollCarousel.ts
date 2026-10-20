"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Tracks a native scroll-snap track: prev/next availability + progress (0-1). */
export function useScrollCarousel<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [state, setState] = useState({ canPrev: false, canNext: true, progress: 0 });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const left = el.scrollLeft;
    setState({
      canPrev: left > 4,
      canNext: left < max - 4,
      progress: max > 0 ? Math.min(1, Math.max(0, left / max)) : 1,
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  const scrollByCard = useCallback((dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap || "16") || 16;
    const step = (card?.getBoundingClientRect().width ?? el.clientWidth * 0.8) + gap;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  return { ref, ...state, scrollByCard };
}
