"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Pause, Play } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/common/Button";
import SafeImage from "@/components/common/SafeImage";
import { ABOUT_STATS } from "@/data/content";
import { PORTFOLIO_CATEGORIES, PORTFOLIO_ITEMS, PORTFOLIO_VIDEO } from "@/data/portfolio";
import s from "@/styles/components/Portfolio.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

const STATS = [
  { value: `${ABOUT_STATS[0].value}${ABOUT_STATS[0].suffix}`, label: "Projects delivered" },
  { value: `${PORTFOLIO_ITEMS.length}`, label: "Spaces in this gallery" },
  { value: `${PORTFOLIO_CATEGORIES.length - 1}`, label: "Design categories" },
];

/** Cinematic full-bleed video with a poster fallback, pause control and scroll parallax. */
export default function PortfolioHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Autoplay only when it helps: skip for reduced-motion users and data-saver connections.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) return;
    video.play().catch(() => setPlaying(false));
  }, [reduce]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => setFailed(true));
    else video.pause();
  };

  return (
    <section ref={sectionRef} className={s.hero} aria-labelledby="portfolio-title">
      <div className={s.heroFrame}>
        <motion.div className={s.heroMedia} style={reduce ? undefined : { scale: mediaScale }}>
          <SafeImage
            src={PORTFOLIO_VIDEO.poster}
            alt=""
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            className={s.heroPoster}
          />
          {!failed && (
            <video
              ref={videoRef}
              className={[s.heroVideo, playing ? s.heroVideoOn : ""].join(" ")}
              src={PORTFOLIO_VIDEO.src}
              poster={PORTFOLIO_VIDEO.poster}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
              onPlaying={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onError={() => setFailed(true)}
            />
          )}
        </motion.div>
        <div className={s.heroShade} aria-hidden />

        <motion.div className={s.heroCopy} style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}>
          <motion.nav className={s.heroCrumbs} aria-label="Breadcrumb" {...fadeUp(0.1)}>
            <Link href="/">Home</Link>
            <ChevronRight size={14} aria-hidden />
            <span aria-current="page">Portfolio</span>
          </motion.nav>

          <motion.span className={s.heroEyebrow} {...fadeUp(0.2)}>
            <i aria-hidden /> Our Portfolio
          </motion.span>

          <h1 id="portfolio-title" className={s.heroTitle}>
            <span className={s.line}>
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
              >
                Spaces designed
              </motion.span>
            </span>
            <span className={s.line}>
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.42, ease: EASE }}
              >
                to <em>inspire.</em>
              </motion.span>
            </span>
          </h1>

          <motion.p className={s.heroText} {...fadeUp(0.6)}>
            Homes and workplaces shaped around the people who use them — calm materials, considered light and
            detailing you notice the longer you stay.
          </motion.p>

          <motion.div className={s.heroActions} {...fadeUp(0.75)}>
            <Button href="#gallery" variant="light" size="lg">
              Explore Our Projects
            </Button>
          </motion.div>
        </motion.div>

        {!failed && (
          <button
            type="button"
            className={s.heroToggle}
            onClick={toggle}
            aria-label={playing ? "Pause background video" : "Play background video"}
          >
            {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
          </button>
        )}

        <a href="#gallery" className={s.scrollCue} aria-label="Scroll to gallery">
          <span />
        </a>
      </div>

      <motion.ul className={s.heroStats} {...fadeUp(0.9)}>
        {STATS.map((st) => (
          <li key={st.label}>
            <strong>{st.value}</strong>
            <span>{st.label}</span>
          </li>
        ))}
      </motion.ul>
    </section>
  );
}
