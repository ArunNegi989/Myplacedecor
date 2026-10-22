import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import Container from "./Container";
import FooterLogo from "./FooterLogo";
import SocialIcons from "./SocialIcons";
import ScrollToTop from "./ScrollToTop";
import RevealAnimation from "@/components/animations/RevealAnimation";
import { FOOTER_LINKS, SITE } from "@/data/content";
import s from "@/styles/components/Footer.module.css";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.glow} aria-hidden />
      <Container>
        <div className={s.grid}>
          <RevealAnimation className={s.brand}>
            <FooterLogo />
            <p>
              Premium interior design and turnkey execution crafting spaces that reflect who you are, from concept to
              handover.
            </p>
            <SocialIcons />
          </RevealAnimation>

          <RevealAnimation delay={0.08}>
            <h3 className={s.h}>Quick Links</h3>
            <ul className={s.list}>
              {FOOTER_LINKS.quick.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </RevealAnimation>

          <RevealAnimation delay={0.16}>
            <h3 className={s.h}>Services</h3>
            <ul className={s.list}>
              {FOOTER_LINKS.services.map((l) => (
                <li key={l}>
                  <Link href="/services/">{l}</Link>
                </li>
              ))}
            </ul>
          </RevealAnimation>

          <RevealAnimation delay={0.24}>
            <h3 className={s.h}>Contact</h3>
            <ul className={s.contact}>
              <li>
                <span>
                  <Phone size={16} />
                </span>
                <a href={SITE.phoneHref}>{SITE.phone}</a>
              </li>
              <li>
                <span>
                  <MapPin size={16} />
                </span>
                <address>{SITE.address}</address>
              </li>
              <li>
                <span>
                  <Clock size={16} />
                </span>
                {SITE.hours}
              </li>
            </ul>
          </RevealAnimation>
        </div>

        <div className={s.bottom}>
          <p>© 2026 {SITE.name}. All Rights Reserved.</p>
          <div>
            <Link href="/contact/">Privacy Policy</Link>
            <Link href="/contact/">Terms &amp; Conditions</Link>
          </div>
        </div>
      </Container>
      <ScrollToTop />
    </footer>
  );
}
