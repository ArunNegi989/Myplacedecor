import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import Container from "@/components/common/Container";
import SafeImage from "@/components/common/SafeImage";
import RevealAnimation from "@/components/animations/RevealAnimation";
import NewsletterCard from "./NewsletterCard";
import { WHY_BG, WHY_POINTS } from "@/data/content";
import s from "@/styles/components/Why.module.css";

export default function WhyChooseSection() {
  return (
    <section id="why" className={s.section} aria-labelledby="why-title">
      <Container>
        <div className={s.bento}>
          <RevealAnimation className={s.whyWrap}>
            <div className={s.why}>
              <SafeImage src={WHY_BG} alt="" fill sizes="(min-width: 992px) 60vw, 92vw" className={s.bg} />
              <div className={s.scrimGreen} />
              <div className={s.whyBody}>
                <div>
                  <span className={s.kicker}>Our promise</span>
                  <h2 id="why-title">
                    Why choose <em>MyplaceDecor?</em>
                  </h2>
                  <p>Let&apos;s create a space you&apos;ll love to live in.</p>
                </div>

                <ul className={s.points}>
                  {WHY_POINTS.map((p, i) => (
                    <li key={p} style={{ ["--i" as string]: i }}>
                      <span>
                        <Check size={14} strokeWidth={3} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>

                <Link href="/about/#process" className={s.whyLink}>
                  <span>See how we work</span>
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </div>
            </div>
          </RevealAnimation>

          <RevealAnimation delay={0.12} className={s.newsWrap}>
            <NewsletterCard />
          </RevealAnimation>
        </div>
      </Container>
    </section>
  );
}
