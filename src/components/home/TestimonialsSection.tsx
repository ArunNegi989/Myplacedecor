import { ArrowUpRight, Quote, Star } from "lucide-react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import SectionHeading from "@/components/common/SectionHeading";
import RevealAnimation from "@/components/animations/RevealAnimation";
import { REVIEWS, SITE } from "@/data/content";
import s from "@/styles/components/Testimonials.module.css";

const Stars = () => (
  <span className={s.stars} role="img" aria-label="5 out of 5 stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
    ))}
  </span>
);

export default function TestimonialsSection() {
  return (
    <section id="reviews" className={s.section} aria-labelledby="reviews-title">
      <Container>
        <SectionHeading
          eyebrow="Client reviews"
          title={
            <span id="reviews-title">
              Trusted by homeowners <em>across Gurugram.</em>
            </span>
          }
          action={
            <a href={SITE.googleReviews} target="_blank" rel="noopener noreferrer" className={s.score}>
              <strong>{SITE.rating}</strong>
              <span>
                <Stars />
                <small>{SITE.reviewCount} reviews on Google</small>
              </span>
              <i>
                <ArrowUpRight size={16} />
              </i>
            </a>
          }
        />

        <ul className={s.masonry}>
          {REVIEWS.map((r, i) => (
            <li key={r.name}>
              <RevealAnimation delay={(i % 3) * 0.1} y={30}>
                <figure className={[s.card, r.featured ? s.featured : ""].join(" ")}>
                  <div className={s.top}>
                    <Stars />
                    <Quote size={22} className={s.q} aria-hidden />
                  </div>
                  <blockquote>“{r.text}”</blockquote>
                  <figcaption>
                    <span className={s.avatar}>{r.name[0]}</span>
                    <span>
                      <strong>{r.name}</strong>
                      <small>Homeowner · Google Review</small>
                    </span>
                  </figcaption>
                </figure>
              </RevealAnimation>
            </li>
          ))}
        </ul>

        <RevealAnimation className={s.foot}>
          <Button href={SITE.googleReviews} variant="light">
            Read All {SITE.reviewCount} Reviews on Google
          </Button>
        </RevealAnimation>
      </Container>
    </section>
  );
}
