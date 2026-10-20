"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import SectionHeading from "@/components/common/SectionHeading";
import SafeImage from "@/components/common/SafeImage";
import RevealAnimation from "@/components/animations/RevealAnimation";
import { useScrollCarousel } from "@/hooks/useScrollCarousel";
import { SITE, VIDEOS } from "@/data/content";
import s from "@/styles/components/Videos.module.css";

export default function VideosSection() {
  const { ref, canPrev, canNext, progress, scrollByCard } = useScrollCarousel<HTMLUListElement>();
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    document.body.classList.add("no-scroll");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="videos" className={s.section} aria-labelledby="videos-title">
      <Container>
        <SectionHeading
          light
          eyebrow="Spaces in motion"
          title={
            <span id="videos-title">
              Step inside our <em>creations.</em>
            </span>
          }
          text="Experience the flow, the details and the emotions behind our spaces through exclusive walkthroughs."
          action={
            <Button href={SITE.youtube} variant="glass">
              View All Videos
            </Button>
          }
        />
      </Container>

      <RevealAnimation y={40}>
        <ul ref={ref} className={s.track} aria-label="Walkthrough videos">
          {VIDEOS.map((v, i) => (
            <li key={v.title} className={s.item}>
              <button className={s.card} onClick={() => setActive(i)} aria-label={`Play ${v.title}`}>
                <SafeImage src={v.poster} alt="" fill sizes="(min-width: 992px) 560px, 80vw" className={s.poster} />
                <span className={s.shade} />
                <span className={s.tag}>{v.tag}</span>
                <span className={s.play}>
                  <Play size={22} fill="currentColor" />
                </span>
                <span className={s.name}>
                  <em>{String(i + 1).padStart(2, "0")}</em>
                  {v.title}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </RevealAnimation>

      <Container>
        <div className={s.nav}>
          <button onClick={() => scrollByCard(-1)} disabled={!canPrev} aria-label="Previous videos">
            <ChevronLeft size={18} />
          </button>
          <div className={s.bar} aria-hidden>
            <span style={{ width: `${Math.max(12, progress * 100)}%` }} />
          </div>
          <button onClick={() => scrollByCard(1)} disabled={!canNext} aria-label="Next videos">
            <ChevronRight size={18} />
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className={s.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => e.target === e.currentTarget && setActive(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={VIDEOS[active].title}
              className={s.player}
              initial={{ scale: 0.92, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <button className={s.close} onClick={() => setActive(null)} aria-label="Close video">
                <X size={20} />
              </button>
              <video src={VIDEOS[active].video} poster={VIDEOS[active].poster} controls autoPlay playsInline />
              <p>{VIDEOS[active].title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
