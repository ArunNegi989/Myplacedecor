import type { Metadata } from "next";
import Container from "@/components/common/Container";
import RevealAnimation from "@/components/animations/RevealAnimation";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import LocationMap from "@/components/contact/LocationMap";
import { PROCESS_STEPS } from "@/data/content";
import s from "@/styles/components/Contact.module.css";

export const metadata: Metadata = {
  title: "Contact Us | Acumen Interiors",
  description:
    "Plan your home or workspace with Acumen Interiors, Gurugram. Call, WhatsApp or send a project enquiry for a free design consultation.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section id="enquiry" className={s.main} aria-label="Contact details and enquiry form">
        <Container>
          <div className={s.layout}>
            <RevealAnimation className={s.areaInfo}>
              <ContactInfo />
            </RevealAnimation>
            <RevealAnimation delay={0.1} className={s.areaForm}>
              <ContactForm />
            </RevealAnimation>
            <RevealAnimation delay={0.1} className={s.areaMap}>
              <LocationMap />
            </RevealAnimation>
          </div>
        </Container>
      </section>

      <section className={s.process} aria-labelledby="next-title">
        <Container>
          <RevealAnimation y={16}>
            <h2 id="next-title" className={s.processTitle}>
              What happens <em>next?</em>
            </h2>
          </RevealAnimation>
          <ol className={s.processList}>
            {PROCESS_STEPS.map((st, i) => (
              <li key={st.title}>
                <RevealAnimation delay={i * 0.08} y={20} className={s.processReveal}>
                  <div className={s.processItem}>
                    <span className={s.processNum}>{String(i + 1).padStart(2, "0")}</span>
                    <h3>{st.title}</h3>
                    <p>{st.desc}</p>
                  </div>
                </RevealAnimation>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
