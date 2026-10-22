import { Armchair, Building2, Check, Home, KeyRound } from "lucide-react";
import Container from "@/components/common/Container";
import SafeImage from "@/components/common/SafeImage";
import RevealAnimation from "@/components/animations/RevealAnimation";
import EnquireButton from "@/components/home/EnquireButton";
import { PROCESS_STEPS, SERVICES, SERVICE_DETAILS } from "@/data/content";
import s from "@/styles/components/ServicesPage.module.css";

const ICONS = { home: Home, building: Building2, key: KeyRound, armchair: Armchair } as const;

export default function ServiceBlocks() {
  return (
    <>
      {/* ---------- one block per service, image side alternates ---------- */}
      <section className={s.section} aria-label="Our services">
        <Container>
          <ul className={s.list}>
            {SERVICES.map((sv, i) => {
              const Icon = ICONS[sv.icon];
              const details = SERVICE_DETAILS[sv.title]?.points ?? [];
              return (
                <li key={sv.title} className={[s.block, i % 2 ? s.flip : ""].join(" ")}>
                  <RevealAnimation variant="image" className={s.media}>
                    <div className={s.frame}>
                      <SafeImage
                        src={sv.image}
                        alt={`${sv.title} by MyplaceDecor`}
                        fill
                        sizes="(min-width: 992px) 46vw, 92vw"
                      />
                    </div>
                  </RevealAnimation>

                  <RevealAnimation delay={0.1} className={s.copy}>
                    <span className={s.num}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={s.icon}>
                      <Icon size={22} />
                    </span>
                    <h2>{sv.title}</h2>
                    <p className={s.desc}>{sv.desc}</p>

                    <ul className={s.points}>
                      {details.map((p) => (
                        <li key={p}>
                          <span aria-hidden>
                            <Check size={13} strokeWidth={3} />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>

                    <ul className={s.tags}>
                      {sv.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>

                    <EnquireButton
                      variant="ghost"
                      size="sm"
                      service={sv.title}
                      label="Enquire about this"
                      aria-label={`Enquire about ${sv.title}`}
                    />
                  </RevealAnimation>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ---------- process ---------- */}
      <section className={s.process} aria-labelledby="process-title">
        <Container>
          <RevealAnimation>
            <header className={s.processHead}>
              <span className={s.eyebrow}>
                <i aria-hidden /> How we work
              </span>
              <h2 id="process-title">
                A simple, <em>transparent process.</em>
              </h2>
            </header>
          </RevealAnimation>

          <ol className={s.steps}>
            {PROCESS_STEPS.map((st, i) => (
              <li key={st.title}>
                <RevealAnimation delay={i * 0.08} y={24} className={s.step}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{st.title}</h3>
                  <p>{st.desc}</p>
                </RevealAnimation>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
