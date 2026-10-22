"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import SafeImage from "@/components/common/SafeImage";
import { useEnquiry } from "@/components/common/EnquiryProvider";
import { ABOUT_STATS, CATEGORIES, HERO_SLIDES, HERO_VIDEO, SITE } from "@/data/content";
import s from "@/styles/components/Hero.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;
const YEARS = ABOUT_STATS.find((st) => st.icon === "clock");

function Words({ text, start = 0, className }: { text: string; start?: number; className?: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i}>
          {i > 0 && " "}
          <span className={s.wordMask}>
            <motion.span
              className={[s.word, className ?? ""].join(" ")}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: start + i * 0.09, ease: EASE }}
            >
              {w}
            </motion.span>
          </span>
        </span>
      ))}
    </>
  );
}

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const { openEnquiry } = useEnquiry();
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  // `started` flips on the first frame; until then (or if the video fails) the slideshow is the visual.
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const count = HERO_SLIDES.length;
  const showVideo = started && !failed;

  const go = useCallback((n: number) => setIndex((n + count) % count), [count]);

  // Autoplay the muted clip only when it helps: skip for reduced-motion users and data-saver
  // connections (they keep the static slideshow and can still press play).
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) return;
    video.muted = true;
    video.play().catch(() => {
      /* autoplay blocked (e.g. low-power mode): the slideshow stays, the play button remains */
    });
  }, [reduce]);

  useEffect(() => {
    if (showVideo || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % count), 5500);
    return () => window.clearInterval(t);
  }, [showVideo, paused, count]);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => setFailed(true));
    else video.pause();
  };

  return (
    <section id="home" className={s.hero} aria-label="Introduction">
      <Container>
        <div className={s.grid}>
          {/* ---------- copy ---------- */}
          <div className={s.copy}>
            <motion.span
              className={s.pill}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <Sparkles size={14} /> Crafting beautiful spaces
            </motion.span>

            <h1 className={s.title}>
              <Words text="Designing spaces," start={0.15} />
              <br />
              <Words text="inspiring lives." start={0.4} className={s.em} />
            </h1>

            <motion.p
              className={s.lead}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
            >
              At Acumen Interiors, we create beautiful, functional and timeless spaces tailored to your style and
              needs.
            </motion.p>

            <motion.div
              className={s.ctas}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
            >
              <Button size="lg" onClick={() => openEnquiry()}>
                Book a Consultation
              </Button>
              <Button href="/portfolio/" variant="ghost" size="lg" arrow={false}>
                Explore Our Work
              </Button>
            </motion.div>

            <motion.div
              className={s.proof}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <a href={SITE.googleReviews} target="_blank" rel="noopener noreferrer" className={s.trust}>
                <span className={s.stars} aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </span>
                <span>
                  <strong>{SITE.rating}</strong> from {SITE.reviewCount}+ Google reviews
                </span>
              </a>
              {YEARS && (
                <span className={s.years}>
                  <strong>
                    {YEARS.value}
                    {YEARS.suffix}
                  </strong>{" "}
                  years of design
                </span>
              )}
            </motion.div>
          </div>

          {/* ---------- visual: video, with the slideshow as fallback ---------- */}
          <motion.div
            className={s.visualWrap}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className={s.arch}>
              {HERO_SLIDES.map((sl, i) => (
                <div
                  key={sl.src}
                  className={[s.slide, i === index ? s.slideOn : ""].join(" ")}
                  aria-hidden={showVideo || i !== index}
                >
                  <SafeImage
                    src={sl.src}
                    alt={sl.label}
                    fill
                    priority={i === 0}
                    sizes="(min-width: 992px) 46vw, 92vw"
                    className={s.img}
                  />
                </div>
              ))}

              {!failed && (
                <video
                  ref={videoRef}
                  className={[s.video, showVideo ? s.videoOn : ""].join(" ")}
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-hidden
                  onPlaying={() => {
                    setStarted(true);
                    setPlaying(true);
                  }}
                  onPause={() => setPlaying(false)}
                >
                  {/* smaller rendition on phones; browsers pick the first <source> whose media matches */}
                  <source src={HERO_VIDEO.srcMobile} type="video/mp4" media="(max-width: 767px)" />
                  <source src={HERO_VIDEO.src} type="video/mp4" onError={() => setFailed(true)} />
                </video>
              )}
              <div className={s.shade} />

              {showVideo ? (
                <div className={s.caption}>
                  <span>{playing ? "Now playing" : "Paused"}</span>
                  {HERO_VIDEO.label}
                </div>
              ) : (
                <div className={s.caption} aria-live="polite">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {HERO_SLIDES[index].label}
                </div>
              )}

              <div className={s.controls}>
                {!showVideo && (
                  <>
                    <button type="button" onClick={() => go(index - 1)} aria-label="Previous slide">
                      <ChevronLeft size={18} />
                    </button>
                    <div className={s.dots} role="tablist" aria-label="Choose slide">
                      {HERO_SLIDES.map((sl, i) => (
                        <button
                          key={sl.label}
                          type="button"
                          role="tab"
                          aria-selected={i === index}
                          aria-label={`Show ${sl.label}`}
                          className={i === index ? s.dotOn : ""}
                          onClick={() => setIndex(i)}
                        />
                      ))}
                    </div>
                    <button type="button" onClick={() => go(index + 1)} aria-label="Next slide">
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
                {!failed && (
                  <button
                    type="button"
                    className={s.videoToggle}
                    onClick={toggleVideo}
                    aria-label={playing ? "Pause background video" : "Play background video"}
                  >
                    {playing ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}
                  </button>
                )}
              </div>
            </div>

            <div className={s.float}>
              <span className={s.floatIcon}>
                <TrendingUp size={18} />
              </span>
              <div>
                <strong>250+</strong>
                <small>Projects delivered</small>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ---------- category strip ---------- */}
        <motion.nav
          className={s.strip}
          aria-label="Browse by space"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1, ease: EASE }}
        >
          <ul>
            {CATEGORIES.map((c) => (
              <li key={c.label}>
                <Link href="/portfolio/">
                  <span className={s.thumb}>
                    <SafeImage src={c.src} alt="" fill sizes="44px" />
                  </span>
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>
      </Container>
    </section>
  );
}
