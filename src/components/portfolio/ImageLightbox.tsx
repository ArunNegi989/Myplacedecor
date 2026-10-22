"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PortfolioItem } from "@/data/portfolio";
import s from "@/styles/components/Lightbox.module.css";

type Props = {
  items: PortfolioItem[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
};

const EASE = [0.22, 1, 0.36, 1] as const;
const SWIPE = 70;

/** Full-screen image viewer: Esc / arrows / swipe, focus trap, scroll lock. Render inside <AnimatePresence>. */
export default function ImageLightbox({ items, index, onIndexChange, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [dir, setDir] = useState(1);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const item = items[index];
  const total = items.length;
  const src = failedSrc === item.full ? item.thumb : item.full;
  const loaded = loadedSrc === src;

  const go = (step: number) => {
    setDir(step);
    onIndexChange((index + step + total) % total);
  };

  // Keep handlers fresh for the global key listener without re-binding it on every render.
  const goRef = useRef(go);
  const closeCb = useRef(onClose);
  useEffect(() => {
    goRef.current = go;
    closeCb.current = onClose;
  });

  // scroll lock, keyboard support, focus trap, initial focus
  useEffect(() => {
    document.body.classList.add("no-scroll");
    closeRef.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCb.current();
      else if (e.key === "ArrowRight") goRef.current(1);
      else if (e.key === "ArrowLeft") goRef.current(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const nodes = dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled])");
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // warm the cache for the neighbours so prev / next feel instant
  useEffect(() => {
    if (total < 2) return;
    [items[(index + 1) % total], items[(index - 1 + total) % total]].forEach((n) => {
      const pre = new Image();
      pre.src = n.full;
    });
  }, [index, items, total]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE) go(1);
    else if (info.offset.x > SWIPE) go(-1);
  };

  const backdropClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <motion.div
      className={s.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onMouseDown={backdropClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${item.title} — image ${index + 1} of ${total}`}
        className={s.dialog}
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 16 }}
        transition={{ duration: 0.5, ease: EASE }}
        onMouseDown={backdropClose}
      >
        <header className={s.top}>
          <span className={s.counter} aria-hidden>
            <strong>{String(index + 1).padStart(2, "0")}</strong> / {String(total).padStart(2, "0")}
          </span>
          <button ref={closeRef} type="button" className={s.close} onClick={onClose} aria-label="Close image viewer">
            <X size={20} />
          </button>
        </header>

        <div className={s.stage} onMouseDown={backdropClose}>
          {total > 1 && (
            <button type="button" className={`${s.nav} ${s.prev}`} onClick={() => go(-1)} aria-label="Previous image">
              <ChevronLeft size={22} />
            </button>
          )}

          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.figure
              key={item.id}
              className={s.figure}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.5, ease: EASE }}
              drag={total > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={onDragEnd}
            >
              {!loaded && <span className={s.spinner} aria-hidden />}
              {/* eslint-disable-next-line @next/next/no-img-element -- natural aspect ratio + onLoad state */}
              <img
                src={src}
                alt={item.alt}
                className={[s.img, loaded ? s.imgOn : ""].join(" ")}
                draggable={false}
                onLoad={() => setLoadedSrc(src)}
                onError={() => setFailedSrc(item.full)}
              />
            </motion.figure>
          </AnimatePresence>

          {total > 1 && (
            <button type="button" className={`${s.nav} ${s.next}`} onClick={() => go(1)} aria-label="Next image">
              <ChevronRight size={22} />
            </button>
          )}
        </div>

        <footer className={s.caption}>
          <span className={s.badge}>{item.category}</span>
          <h2 className={s.title}>{item.title}</h2>
          {total > 1 && <p className={s.hint}>Use ← → keys or swipe to browse</p>}
        </footer>
      </motion.div>
    </motion.div>
  );
}
