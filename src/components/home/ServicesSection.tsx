"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Armchair, ArrowUpRight, Building2, Home, KeyRound } from "lucide-react";
import { useState } from "react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import SectionHeading from "@/components/common/SectionHeading";
import SafeImage from "@/components/common/SafeImage";
import RevealAnimation from "@/components/animations/RevealAnimation";
import { useEnquiry } from "@/components/common/EnquiryProvider";
import { SERVICES } from "@/data/content";
import s from "@/styles/components/Services.module.css";

const ICONS = { home: Home, building: Building2, key: KeyRound, armchair: Armchair } as const;

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const { openEnquiry } = useEnquiry();

  return (
    <section id="services" className={s.section} aria-labelledby="services-title">
      <Container>
        <div className={s.grid}>
          {/* image stack */}
          <RevealAnimation variant="image" className={s.visual}>
            <div className={s.frame}>
              {SERVICES.map((sv, i) => (
                <div key={sv.title} className={[s.slide, i === active ? s.on : ""].join(" ")}>
                  <SafeImage src={sv.image} alt={`${sv.title} project`} fill sizes="(min-width: 992px) 45vw, 92vw" />
                </div>
              ))}
              <div className={s.chip}>
                <span>0{active + 1}</span> {SERVICES[active].title}
              </div>
            </div>
          </RevealAnimation>

          {/* list */}
          <div className={s.content}>
            <SectionHeading
              eyebrow="What we do"
              title={
                <span id="services-title">
                  Interior design tailored to <em>your lifestyle.</em>
                </span>
              }
            />

            <ul className={s.list}>
              {SERVICES.map((sv, i) => {
                const Icon = ICONS[sv.icon];
                const on = i === active;
                return (
                  <li key={sv.title}>
                    <RevealAnimation delay={i * 0.08} y={22}>
                      <div className={[s.row, on ? s.rowOn : ""].join(" ")} onMouseEnter={() => setActive(i)}>
                        <button
                          className={s.head}
                          aria-expanded={on}
                          onClick={() => setActive(i)}
                          onFocus={() => setActive(i)}
                        >
                          <span className={s.icon}>
                            <Icon size={20} />
                          </span>
                          <span className={s.text}>
                            <strong>{sv.title}</strong>
                            <small>{sv.desc}</small>
                          </span>
                          <span className={s.go} aria-hidden>
                            <ArrowUpRight size={18} />
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {on && (
                            <motion.div
                              className={s.more}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            >
                              <div className={s.moreInner}>
                                <ul className={s.tags}>
                                  {sv.tags.map((t) => (
                                    <li key={t}>{t}</li>
                                  ))}
                                </ul>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => openEnquiry(sv.title)}
                                  aria-label={`Enquire about ${sv.title}`}
                                >
                                  Enquire about this
                                </Button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </RevealAnimation>
                  </li>
                );
              })}
            </ul>

            <RevealAnimation delay={0.3}>
              <Button href="/services/" variant="primary">
                Explore Services
              </Button>
            </RevealAnimation>
          </div>
        </div>
      </Container>
    </section>
  );
}
