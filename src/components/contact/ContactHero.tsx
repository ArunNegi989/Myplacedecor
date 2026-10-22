import Link from "next/link";
import { ChevronRight, MapPin, Phone } from "lucide-react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import SafeImage from "@/components/common/SafeImage";
import RevealAnimation from "@/components/animations/RevealAnimation";
import { SOCIAL_ICONS } from "@/components/common/SocialIcons";
import { SITE, whatsappLink } from "@/data/content";
import { CONTACT_HERO_IMG } from "@/data/contact";
import s from "@/styles/components/Contact.module.css";

export default function ContactHero() {
  return (
    <section className={s.hero} aria-labelledby="contact-title">
      <div className={s.heroGlow} aria-hidden />
      <Container>
        <div className={s.heroGrid}>
          <div className={s.heroCopy}>
            <RevealAnimation y={14}>
              <nav className={s.crumbs} aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <ChevronRight size={14} aria-hidden />
                <span aria-current="page">Contact Us</span>
              </nav>
            </RevealAnimation>
            <RevealAnimation delay={0.08} y={14}>
              <span className={s.eyebrow}>
                <i aria-hidden /> Get in touch
              </span>
            </RevealAnimation>
            <RevealAnimation delay={0.16}>
              <h1 id="contact-title" className={s.heroTitle}>
                Let&apos;s create something <em>extraordinary.</em>
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={0.24}>
              <p className={s.heroText}>
                Whether it&apos;s a single room or a complete home or workspace, tell us what you have in mind. Our
                designers will take it from the first sketch to the final handover.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={0.32} className={s.heroBtns}>
              <Button href="#enquiry" size="lg">
                Send an Enquiry
              </Button>
              <Button href={SITE.phoneHref} variant="ghost" size="lg" arrow={false} icon={<Phone size={17} />}>
                {SITE.phone}
              </Button>
            </RevealAnimation>
          </div>

          <RevealAnimation variant="image" delay={0.15} className={s.heroMedia}>
            <SafeImage
              src={CONTACT_HERO_IMG}
              alt="Bright living room with grey sofas and a pendant light"
              fill
              sizes="(min-width: 992px) 560px, 94vw"
              loading="eager"
              fetchPriority="high"
              className={s.heroImg}
            />
            <div className={s.heroImgShade} aria-hidden />
            <span className={s.heroPin}>
              <MapPin size={14} aria-hidden /> Gurugram studio
            </span>
            <a
              href={whatsappLink(`Hi ${SITE.name}, I'd like to discuss an interior project.`)}
              target="_blank"
              rel="noopener noreferrer"
              className={s.heroChat}
            >
              <span className={s.heroChatIcon} aria-hidden>
                {SOCIAL_ICONS.whatsapp}
              </span>
              <span>
                <small>Prefer to chat?</small>
                <strong>Message us on WhatsApp</strong>
              </span>
            </a>
          </RevealAnimation>
        </div>
      </Container>
    </section>
  );
}
