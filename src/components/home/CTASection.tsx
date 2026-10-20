import { Phone } from "lucide-react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import SafeImage from "@/components/common/SafeImage";
import RevealAnimation from "@/components/animations/RevealAnimation";
import EnquireButton from "./EnquireButton";
import { CTA_BG, SITE } from "@/data/content";
import s from "@/styles/components/CTA.module.css";

export default function CTASection() {
  return (
    <section id="contact" className={s.section} aria-labelledby="cta-title">
      <Container>
        <RevealAnimation y={40}>
          <div className={s.banner}>
            <SafeImage src={CTA_BG} alt="" fill sizes="(min-width: 1320px) 1230px, 94vw" className={s.bg} />
            <div className={s.scrim} />
            <div className={s.orb} aria-hidden />

            <div className={s.body}>
              <span className={s.kicker}>Start your journey</span>
              <h2 id="cta-title">
                Let&apos;s create a space <em>you&apos;ll love to live in.</em>
              </h2>
              <p>
                Tell us about your space, your style and your vision. We&apos;ll help you turn it into something
                extraordinary.
              </p>
              <div className={s.btns}>
                <EnquireButton variant="primary" size="lg" label="Get Your Consultation Today" />
                <Button href={SITE.phoneHref} variant="glass" size="lg" arrow={false} icon={<Phone size={18} />}>
                  Talk to a Designer
                </Button>
              </div>
            </div>
          </div>
        </RevealAnimation>
      </Container>
    </section>
  );
}
