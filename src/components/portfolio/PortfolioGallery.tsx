"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import SectionHeading from "@/components/common/SectionHeading";
import PortfolioCard from "./PortfolioCard";
import ImageLightbox from "./ImageLightbox";
import { PORTFOLIO_CATEGORIES, PORTFOLIO_ITEMS } from "@/data/portfolio";
import s from "@/styles/components/Portfolio.module.css";

type Filter = (typeof PORTFOLIO_CATEGORIES)[number];

const PAGE = 9;
const EASE = [0.22, 1, 0.36, 1] as const;

const COUNTS = PORTFOLIO_CATEGORIES.reduce<Record<string, number>>((acc, c) => {
  acc[c] = c === "All" ? PORTFOLIO_ITEMS.length : PORTFOLIO_ITEMS.filter((i) => i.category === c).length;
  return acc;
}, {});

export default function PortfolioGallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const [limit, setLimit] = useState(PAGE);
  const [active, setActive] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const items = useMemo(
    () => (filter === "All" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((i) => i.category === filter)),
    [filter],
  );
  const visible = items.slice(0, limit);

  const choose = (f: Filter) => {
    setFilter(f);
    setLimit(PAGE);
  };

  const close = useCallback(() => {
    setActive(null);
    // return focus to the card that opened the lightbox
    window.setTimeout(() => triggerRef.current?.focus({ preventScroll: true }), 0);
  }, []);

  return (
    <section id="gallery" className={s.gallery} aria-labelledby="gallery-title">
      <Container>
        <SectionHeading
          center
          eyebrow="Photo Gallery"
          title={
            <span id="gallery-title">
              Browse our work <em>by space.</em>
            </span>
          }
          text="Tap any project to see it full screen. Use the filters to focus on the rooms you're planning."
        />

        <LayoutGroup id="portfolio-filters">
          <div className={s.filters} role="group" aria-label="Filter projects by category">
            {PORTFOLIO_CATEGORIES.map((c) => {
              const on = c === filter;
              return (
                <button
                  key={c}
                  type="button"
                  className={[s.filter, on ? s.filterOn : ""].join(" ")}
                  aria-pressed={on}
                  onClick={() => choose(c)}
                >
                  {on && (
                    <motion.span
                      layoutId="filter-pill"
                      className={s.filterBg}
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  )}
                  <span className={s.filterLabel}>{c}</span>
                  <span className={s.filterCount}>{COUNTS[c]}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        <p className={s.resultNote} role="status" aria-live="polite">
          Showing {visible.length} of {items.length} {filter === "All" ? "projects" : `${filter} projects`}
        </p>

        <motion.ul layout className={s.grid}>
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((item, i) => (
              <motion.li
                key={item.id}
                layout
                className={s.gridItem}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.3 } }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.09, ease: EASE }}
              >
                <PortfolioCard
                  item={item}
                  onOpen={(el) => {
                    triggerRef.current = el;
                    setActive(i);
                  }}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {limit < items.length && (
          <div className={s.more}>
            <Button variant="ghost" arrow={false} onClick={() => setLimit((l) => l + PAGE)}>
              Load more projects
            </Button>
          </div>
        )}
      </Container>

      <AnimatePresence>
        {active !== null && (
          <ImageLightbox items={items} index={active} onIndexChange={setActive} onClose={close} />
        )}
      </AnimatePresence>
    </section>
  );
}
