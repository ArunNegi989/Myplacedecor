"use client";

import { AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Images } from "lucide-react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import SectionHeading from "@/components/common/SectionHeading";
import RevealAnimation from "@/components/animations/RevealAnimation";
import CardImageSlider from "@/components/portfolio/CardImageSlider";
import ProjectGallery from "@/components/portfolio/ProjectGallery";
import { useProjectGallery } from "@/hooks/useProjectGallery";
import { useScrollCarousel } from "@/hooks/useScrollCarousel";
import { FEATURED_PROJECTS } from "@/data/portfolio";
import s from "@/styles/components/Projects.module.css";

/** Featured work: 3 cards per view on desktop, 2 on tablets, 1 + peek on phones. Opens the shared project gallery. */
export default function ProjectsSection() {
  const { ref, canPrev, canNext, scrollByCard } = useScrollCarousel<HTMLUListElement>();
  const gallery = useProjectGallery();

  return (
    <section id="projects" className={s.section} aria-labelledby="projects-title">
      <Container>
        <SectionHeading
          eyebrow="Our projects"
          title={
            <span id="projects-title">
              Crafted with passion. <em>Designed for you.</em>
            </span>
          }
          action={
            (canPrev || canNext) && (
              <div className={s.arrows}>
                <button type="button" onClick={() => scrollByCard(-1)} disabled={!canPrev} aria-label="Previous projects">
                  <ChevronLeft size={18} />
                </button>
                <button type="button" onClick={() => scrollByCard(1)} disabled={!canNext} aria-label="Next projects">
                  <ChevronRight size={18} />
                </button>
              </div>
            )
          }
        />

        {/* one reveal for the whole track: per-card reveals never fire for a card that only peeks in */}
        <RevealAnimation y={36}>
          <ul ref={ref} className={s.track} aria-label="Featured projects">
            {FEATURED_PROJECTS.map((p, i) => {
              const count = p.images.length;
              return (
                <li key={p.id} className={s.item}>
                  <button
                    type="button"
                    className={s.card}
                    onClick={(e) => gallery.open(p, e.currentTarget)}
                    aria-haspopup="dialog"
                    aria-label={`View project: ${p.title} (${p.category}, ${count} ${count === 1 ? "photo" : "photos"})`}
                  >
                    <CardImageSlider
                      images={p.images}
                      sizes="(min-width: 1320px) 400px, (min-width: 992px) 31vw, (min-width: 640px) 46vw, 84vw"
                      imgClassName={s.img}
                    />
                    <span className={s.overlay} aria-hidden />
                    <span className={s.index} aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={s.cat}>{p.category}</span>
                    <span className={s.info}>
                      <span className={s.name}>{p.title}</span>
                      <span className={s.meta}>
                        <span className={s.link}>
                          <span>View Project</span>
                          <ArrowRight size={16} aria-hidden />
                        </span>
                        {count > 1 && (
                          <span className={s.count} aria-hidden>
                            <Images size={14} /> {count}
                          </span>
                        )}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </RevealAnimation>

        <div className={s.foot}>
          <Button href="/portfolio/" variant="ghost">
            View All Projects
          </Button>
        </div>
      </Container>

      <AnimatePresence>
        {gallery.project && (
          <ProjectGallery key={gallery.project.id} project={gallery.project} onClose={gallery.close} />
        )}
      </AnimatePresence>
    </section>
  );
}
