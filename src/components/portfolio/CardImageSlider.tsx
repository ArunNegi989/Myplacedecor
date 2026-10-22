"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SafeImage from "@/components/common/SafeImage";
import type { ProjectImage } from "@/data/portfolio";
import s from "@/styles/components/CardSlider.module.css";

type Props = {
  images: readonly ProjectImage[];
  sizes: string;
  /** Class for each <img> — keeps the card's own object-fit + hover zoom. */
  imgClassName: string;
  /** ms each photo stays before cross-fading to the next. */
  interval?: number;
};

/**
 * Auto-advancing cross-fade of one project's photos, filling its card.
 * Render as the card's first child: it pauses while the card is hovered (mouse) or
 * keyboard-focused, stops off-screen, and stays on the cover for reduced-motion users.
 * Photos mount one step ahead of the current slide, so a card never loads all of them up front.
 */
export default function CardImageSlider({ images, sizes, imgClassName, interval = 4500 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const offset = useRef(0);
  const first = useRef(true);
  const reduce = useReducedMotion();
  const [{ index, prev }, setSlide] = useState({ index: 0, prev: -1 });
  const [mounted, setMounted] = useState(2);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);

  const total = images.length;
  const auto = !reduce && total > 1;

  // watch the card itself: overlays sit on top of the slides, so listen on the parent
  useEffect(() => {
    const card = ref.current?.parentElement;
    if (!auto || !card) return;

    // cards further right start later, so a row ripples instead of switching in unison
    const left = card.getBoundingClientRect().left / window.innerWidth;
    offset.current = Math.round(Math.min(1, Math.max(0, left)) * 1600);

    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(card);

    const enter = (e: PointerEvent) => e.pointerType === "mouse" && setPaused(true);
    const leave = () => setPaused(false);
    const focusIn = () => card.matches(":focus-visible") && setPaused(true);
    card.addEventListener("pointerenter", enter);
    card.addEventListener("pointerleave", leave);
    card.addEventListener("focusin", focusIn);
    card.addEventListener("focusout", leave);
    return () => {
      io.disconnect();
      card.removeEventListener("pointerenter", enter);
      card.removeEventListener("pointerleave", leave);
      card.removeEventListener("focusin", focusIn);
      card.removeEventListener("focusout", leave);
    };
  }, [auto]);

  useEffect(() => {
    if (!auto || !inView || paused) return;
    const wait = first.current ? interval + offset.current : interval;
    const t = window.setTimeout(() => {
      first.current = false;
      const next = (index + 1) % total;
      setSlide({ index: next, prev: index });
      setMounted((m) => Math.max(m, Math.min(total, next + 2)));
    }, wait);
    return () => window.clearTimeout(t);
  }, [auto, inView, paused, index, total, interval]);

  return (
    <span ref={ref} className={s.slides}>
      {images.slice(0, mounted).map((im, i) => (
        <span key={im.full} className={[s.slide, i === index ? s.on : "", i === prev ? s.was : ""].join(" ")}>
          <SafeImage src={im.thumb} alt={i === 0 ? im.alt : ""} fill sizes={sizes} className={imgClassName} />
        </span>
      ))}
    </span>
  );
}
