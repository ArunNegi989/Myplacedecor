import { Award, Clock, Home, Users } from "lucide-react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import SectionHeading from "@/components/common/SectionHeading";
import SafeImage from "@/components/common/SafeImage";
import RevealAnimation from "@/components/animations/RevealAnimation";
import Counter from "@/components/animations/Counter";
import { ABOUT_IMAGES, ABOUT_STATS } from "@/data/content";
import s from "@/styles/components/About.module.css";

const ICONS = { home: Home, users: Users, clock: Clock, award: Award } as const;

export default function AboutSection() {
  return (
    <section id="about" className={s.section} aria-labelledby="about-title">
      <Container>
        <div className={s.grid}>
          <div className={s.copy}>
            <SectionHeading
              eyebrow="About Acumen Interiors"
              title={
                <span id="about-title">
                  We design spaces that <em>speak for you.</em>
                </span>
              }
              text="From concept to completion, we blend creativity with functionality to craft spaces that reflect who you are."
            />

            <ul className={s.stats}>
              {ABOUT_STATS.map((st, i) => {
                const Icon = ICONS[st.icon];
                return (
                  <li key={st.label}>
                    <RevealAnimation delay={i * 0.08} y={22} className={s.stat}>
                      <span className={s.icon}>
                        <Icon size={20} />
                      </span>
                      <div>
                        <strong>
                          <Counter value={st.value} suffix={st.suffix} />
                        </strong>
                        <small>{st.label}</small>
                      </div>
                    </RevealAnimation>
                  </li>
                );
              })}
            </ul>

            <RevealAnimation delay={0.3}>
              <Button href="/about/">Know More About Us</Button>
            </RevealAnimation>
          </div>

          {/* staggered collage */}
          <div className={s.collage}>
            <RevealAnimation variant="image" className={[s.tile, s.t1].join(" ")}>
              <SafeImage src={ABOUT_IMAGES[0]} alt="Sage and cream living room by Acumen Interiors" fill sizes="(min-width: 992px) 30vw, 60vw" />
            </RevealAnimation>
            <RevealAnimation variant="image" delay={0.12} className={[s.tile, s.t2].join(" ")}>
              <SafeImage src={ABOUT_IMAGES[1]} alt="Warm modern interior detail" fill sizes="(min-width: 992px) 20vw, 40vw" />
            </RevealAnimation>
            <RevealAnimation variant="image" delay={0.24} className={[s.tile, s.t3].join(" ")}>
              <SafeImage src={ABOUT_IMAGES[2]} alt="Luxury bathroom with green tiles" fill sizes="(min-width: 992px) 20vw, 40vw" />
            </RevealAnimation>
            <RevealAnimation variant="image" delay={0.36} className={[s.tile, s.t4].join(" ")}>
              <SafeImage src={ABOUT_IMAGES[3]} alt="Walk-in wardrobe design" fill sizes="(min-width: 992px) 20vw, 40vw" />
            </RevealAnimation>

            <div className={s.badge} aria-hidden>
              <svg viewBox="0 0 120 120">
                <defs>
                  <path id="circ" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                </defs>
                <text>
                  <textPath href="#circ">Crafting timeless interiors • 15+ years of design •</textPath>
                </text>
              </svg>
              <span>A</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
