import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import SafeImage from "@/components/common/SafeImage";
import RevealAnimation from "@/components/animations/RevealAnimation";
import { SOCIAL_ICONS } from "@/components/common/SocialIcons";
import { whatsappLink } from "@/data/content";
import { PORTFOLIO_CTA_BG } from "@/data/portfolio";
import s from "@/styles/components/Portfolio.module.css";

export default function PortfolioCTA() {
  return (
    <section className={s.closing} aria-labelledby="portfolio-cta-title">
      <Container>
        <RevealAnimation y={24}>
          <blockquote className={s.statement}>
            <span className={s.statementMark} aria-hidden>
              &ldquo;
            </span>
            <p>
              Every space we design begins with a conversation — about how you live, what you love, and how you
              want to <em>feel</em> when you walk through the door.
            </p>
          </blockquote>
        </RevealAnimation>

        <RevealAnimation variant="image" className={s.ctaReveal}>
          <div className={s.cta}>
            <SafeImage
              src={PORTFOLIO_CTA_BG}
              alt=""
              fill
              sizes="(min-width: 1320px) 1230px, 94vw"
              className={s.ctaImg}
            />
            <div className={s.ctaShade} aria-hidden />
            <div className={s.ctaBody}>
              <span className={s.ctaKicker}>Start your project</span>
              <h2 id="portfolio-cta-title" className={s.ctaTitle}>
                Have a project <em>in mind?</em>
              </h2>
              <p className={s.ctaText}>
                Share a few details about your space and we&apos;ll help shape it into something you&apos;ll love
                coming home to.
              </p>
              <div className={s.ctaBtns}>
                <Button href="/contact/" variant="light" size="lg">
                  Contact Us
                </Button>
                <Button
                  href={whatsappLink("Hi Acumen Interiors, I saw your portfolio and have a project in mind.")}
                  variant="glass"
                  size="lg"
                  arrow={false}
                  icon={<span className={s.waIcon}>{SOCIAL_ICONS.whatsapp}</span>}
                >
                  Chat on WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </RevealAnimation>
      </Container>
    </section>
  );
}
