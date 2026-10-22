"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import SafeImage from "@/components/common/SafeImage";
import type { PortfolioItem } from "@/data/portfolio";
import s from "@/styles/components/Lightbox.module.css";

type Props = {
  project: PortfolioItem;
  onClose: () => void;
};

const EASE = [0.22, 1, 0.36, 1] as const;
const SWIPE = 70;

/**
 * Full-screen gallery for ONE project: browses only that project's images.
 * Esc / ← → / Home / End / swipe, focus trap, scroll lock. Render inside <AnimatePresence>.
 * Used by the /portfolio grid and the homepage "Our projects" carousel.
 */
export default function ProjectGallery({ project, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const { images } = project;
  const total = images.length;
  const multi = total > 1;
  const image = images[index];
  const src = failedSrc === image.full ? image.thumb : image.full;
  const loaded = loadedSrc === src;

  const show = (next: number, step = next > index ? 1 : -1) => {
    setDir(step);
    setIndex((next + total) % total);
  };

  // Keep handlers fresh for the global key listener without re-binding it on every render.
  const keyRef = useRef<(e: KeyboardEvent) => void>(() => {});
  useEffect(() => {
    keyRef.current = (e) => {
      if (e.key === "Escape") onClose();
      else if (multi && e.key === "ArrowRight") show(index + 1, 1);
      else if (multi && e.key === "ArrowLeft") show(index - 1, -1);
      else if (multi && e.key === "Home") show(0, -1);
      else if (multi && e.key === "End") show(total - 1, 1);
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
  });

  // scroll lock, keyboard support, initial focus
  useEffect(() => {
    document.body.classList.add("no-scroll");
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => keyRef.current(e);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // warm the cache for the neighbours so prev / next feel instant
  useEffect(() => {
    if (!multi) return;
    [images[(index + 1) % total], images[(index - 1 + total) % total]].forEach((n) => {
      const pre = new Image();
      pre.src = n.full;
    });
  }, [index, images, total, multi]);

  // keep the active thumbnail in view (without scrolling the page)
  useEffect(() => {
    const strip = thumbsRef.current;
    const thumb = strip?.children[index] as HTMLElement | undefined;
    if (!strip || !thumb) return;
    const target = thumb.offsetLeft - (strip.clientWidth - thumb.offsetWidth) / 2;
    strip.scrollTo({ left: target, behavior: "smooth" });
  }, [index]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE) show(index + 1, 1);
    else if (info.offset.x > SWIPE) show(index - 1, -1);
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
        aria-labelledby={titleId}
        className={s.dialog}
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 16 }}
        transition={{ duration: 0.5, ease: EASE }}
        onMouseDown={backdropClose}
      >
        <header className={s.top}>
          <div className={s.heading}>
            <span className={s.badge}>{project.category}</span>
            <h2 id={titleId} className={s.title}>
              {project.title}
            </h2>
          </div>
          <button ref={closeRef} type="button" className={s.close} onClick={onClose} aria-label="Close gallery">
            <X size={20} />
          </button>
        </header>

        <div className={[s.stage, multi ? "" : s.stageSingle].join(" ")} onMouseDown={backdropClose}>
          {multi && (
            <button type="button" className={`${s.nav} ${s.prev}`} onClick={() => show(index - 1, -1)} aria-label="Previous image">
              <ChevronLeft size={22} />
            </button>
          )}

          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.figure
              key={`${project.id}-${index}`}
              className={s.figure}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.5, ease: EASE }}
              drag={multi ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={onDragEnd}
              style={multi ? undefined : { cursor: "default" }}
            >
              {!loaded && <span className={s.spinner} aria-hidden />}
              {/* eslint-disable-next-line @next/next/no-img-element -- natural aspect ratio + onLoad state */}
              <img
                src={src}
                alt={image.alt}
                className={[s.img, loaded ? s.imgOn : ""].join(" ")}
                draggable={false}
                onLoad={() => setLoadedSrc(src)}
                onError={() => setFailedSrc(image.full)}
              />
            </motion.figure>
          </AnimatePresence>

          {multi && (
            <button type="button" className={`${s.nav} ${s.next}`} onClick={() => show(index + 1, 1)} aria-label="Next image">
              <ChevronRight size={22} />
            </button>
          )}
        </div>

        <footer className={s.caption}>
          <p className={s.counter} aria-live="polite">
            {multi ? (
              <>
                <span className="sr-only">Image </span>
                <strong>{String(index + 1).padStart(2, "0")}</strong> / {String(total).padStart(2, "0")}
              </>
            ) : (
              "1 photo"
            )}
          </p>

          {multi && (
            <div ref={thumbsRef} className={s.thumbs} role="group" aria-label="Choose image">
              {images.map((im, i) => (
                <button
                  key={im.full}
                  type="button"
                  className={[s.thumb, i === index ? s.thumbOn : ""].join(" ")}
                  aria-label={`Show image ${i + 1} of ${total}: ${im.alt}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => show(i)}
                >
                  <SafeImage src={im.thumb} alt="" fill sizes="80px" className={s.thumbImg} />
                </button>
              ))}
            </div>
          )}

          {multi && <p className={s.hint}>Use ← → keys or swipe to browse</p>}
        </footer>
      </motion.div>
    </motion.div>
  );
}
