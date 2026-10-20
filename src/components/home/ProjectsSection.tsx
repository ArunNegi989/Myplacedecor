"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import SectionHeading from "@/components/common/SectionHeading";
import SafeImage from "@/components/common/SafeImage";
import RevealAnimation from "@/components/animations/RevealAnimation";
import { useEnquiry } from "@/components/common/EnquiryProvider";
import { useScrollCarousel } from "@/hooks/useScrollCarousel";
import { PROJECTS } from "@/data/content";
import s from "@/styles/components/Projects.module.css";

export default function ProjectsSection() {
  const { ref, canPrev, canNext, scrollByCard } = useScrollCarousel<HTMLUListElement>();
  const { openEnquiry } = useEnquiry();

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
            <div className={s.arrows}>
              <button onClick={() => scrollByCard(-1)} disabled={!canPrev} aria-label="Previous projects">
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => scrollByCard(1)} disabled={!canNext} aria-label="Next projects">
                <ChevronRight size={18} />
              </button>
            </div>
          }
        />
      </Container>

      <ul ref={ref} className={s.track} aria-label="Featured projects">
        {PROJECTS.map((p, i) => (
          <li key={p.title} className={s.item}>
            <RevealAnimation delay={Math.min(i, 3) * 0.08} y={36} className={s.reveal}>
              <article className={s.card}>
                <SafeImage src={p.image} alt={p.title} fill sizes="(min-width: 992px) 400px, 80vw" className={s.img} />
                <div className={s.overlay} />
                <span className={s.index}>{String(i + 1).padStart(2, "0")}</span>
                <span className={s.cat}>{p.category}</span>
                <div className={s.info}>
                  <h3>{p.title}</h3>
                  <button className={s.link} onClick={() => openEnquiry()}>
                    <span>View Project</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            </RevealAnimation>
          </li>
        ))}
      </ul>

      <Container>
        <div className={s.foot}>
          <Button href="/portfolio/" variant="primary">
            View Full Portfolio
          </Button>
        </div>
      </Container>
    </section>
  );
}
