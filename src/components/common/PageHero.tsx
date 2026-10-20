import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import Container from "./Container";
import RevealAnimation from "@/components/animations/RevealAnimation";
import s from "@/styles/components/PageHero.module.css";

type Props = {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  /** Breadcrumb label for the current page */
  crumb: string;
};

/** Top banner used by every inner page (About, Services, Portfolio, Contact). */
export default function PageHero({ eyebrow, title, text, crumb }: Props) {
  return (
    <section className={s.hero} aria-labelledby="page-title">
      <div className={s.glow} aria-hidden />
      <Container>
        <RevealAnimation y={14}>
          <nav className={s.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} aria-hidden />
            <span aria-current="page">{crumb}</span>
          </nav>
        </RevealAnimation>
        <RevealAnimation delay={0.08} y={14}>
          <span className={s.eyebrow}>
            <i aria-hidden /> {eyebrow}
          </span>
        </RevealAnimation>
        <RevealAnimation delay={0.16}>
          <h1 id="page-title" className={s.title}>
            {title}
          </h1>
        </RevealAnimation>
        {text && (
          <RevealAnimation delay={0.24}>
            <p className={s.text}>{text}</p>
          </RevealAnimation>
        )}
      </Container>
    </section>
  );
}
