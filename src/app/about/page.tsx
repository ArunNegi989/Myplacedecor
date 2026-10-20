import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Home,
  Users,
  Clock,
  Award,
  Target,
  PenTool,
  User,
  ShieldCheck,
  MessageSquare,
  Lightbulb,
  Ruler,
  Hammer,
  Key,
  PhoneCall,
  Quote,
} from "lucide-react";
import styles from "./AboutUs.module.css";
import Button from "@/components/common/Button";

/* ───────────── ONLINE IMAGES ───────────── */
const IMG = {
  hero: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80",
  heroSmall:
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80",
  /* Placeholder portrait: Prince Hooda ki asli photo ka link yahan daal dena */
  founder:
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80",
  whoA: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  whoB: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80",
  cta: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80",
  t1: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=80",
  t2: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80",
  t3: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80",
  t4: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=80",
};

/* ───────────── DATA ───────────── */
const values = [
  { icon: Target, label: "Visionary Leadership" },
  { icon: PenTool, label: "Design Excellence" },
  { icon: User, label: "Client First Approach" },
  { icon: ShieldCheck, label: "Quality & Integrity" },
];

const stats = [
  { icon: Home, value: "250+", label: "Projects Completed" },
  { icon: Users, value: "120+", label: "Happy Clients" },
  { icon: Clock, value: "15+", label: "Years Experience" },
  { icon: Award, value: "20+", label: "Design Awards" },
];

const steps = [
  { icon: MessageSquare, title: "Consultation", text: "Understanding your needs & vision." },
  { icon: Lightbulb, title: "Conceptualisation", text: "Creating ideas & design direction." },
  { icon: Ruler, title: "Planning", text: "Space planning, materials & details." },
  { icon: PenTool, title: "Design Development", text: "Refining designs with precision." },
  { icon: Hammer, title: "Execution", text: "Bringing design to life." },
  { icon: Key, title: "Handover", text: "Delivering perfection on time." },
];

/* Naam aur photos placeholder hain, apni team ke hisaab se badal lena */
const team = [
  {
    name: "Aarav Malhotra",
    role: "Co-Founder",
    tag: "Creative Direction",
    text: "Shapes the design language of every project and leads the studio alongside the founder.",
    img: IMG.t1,
    featured: true,
  },
  {
    name: "Riya Kapoor",
    role: "Head of Design",
    tag: "Design Studio",
    text: "Turns briefs into layouts, 3D views and material palettes that clients can feel.",
    img: IMG.t2,
    featured: false,
  },
  {
    name: "Karan Mehta",
    role: "Project Manager",
    tag: "Planning & Timelines",
    text: "Keeps budgets, vendors and schedules aligned so handover happens on the promised date.",
    img: IMG.t3,
    featured: false,
  },
  {
    name: "Neha Sharma",
    role: "Site Execution Head",
    tag: "On-site Quality",
    text: "Supervises carpentry, finishing and installation to match the drawing, to the millimetre.",
    img: IMG.t4,
    featured: false,
  },
];

/* ───────────── COMPONENT ───────────── */
export default function AboutUs() {
  return (
    <main className={styles.page}>
      {/* ═══════ 1. HERO ═══════ */}
      <section className={`${styles.container} ${styles.hero}`}>
        <div className={styles.heroText}>
          <span className={styles.eyebrow}>
            <i className={styles.dot} /> About Acumen Interiors
          </span>
          <h1 className={styles.heroTitle}>
            Our story, <br />
            our <em>approach.</em>
          </h1>
          <p className={styles.heroPara}>
            We design and build homes and workplaces that feel personal, function beautifully
            and age gracefully. One team, one process, from the first drawing to the final
            handover.
          </p>
          <div className={styles.heroBtns}>
            <Button href="/contact" className={styles.btnPrimary}>
              Start Your Project 
            </Button>
            <Button href="#founder" className={styles.btnOutline}>
              Meet the Founder
            </Button>
          </div>
        </div>

        <div className={styles.heroMedia}>
          <img src={IMG.hero} alt="Living room by Acumen Interiors" className={styles.heroArch} />
          <img src={IMG.heroSmall} alt="Modular kitchen" className={styles.heroSmall} />
          <div className={styles.heroBadge}>
            <strong>15+</strong>
            <span>Years of crafting spaces</span>
          </div>
        </div>
      </section>

      {/* ═══════ 2. FOUNDER ═══════ */}
      <section id="founder" className={styles.container}>
        <div className={styles.founder}>
          <div className={styles.founderMedia}>
            <span className={styles.frame} />
            <img
              src={IMG.founder}
              alt="Prince Hooda, Founder & CEO"
              className={styles.founderImg}
            />
            <span className={styles.expPill}>
              <strong>15+</strong> Years of design
            </span>

            <div className={styles.mottoCard}>
              <p className={styles.mottoText}>
                Design with intention. Craft with precision. Create spaces that last.
              </p>
              <span className={styles.signature}>Prince Hooda</span>
              <span className={styles.signRole}>Founder &amp; CEO</span>
            </div>
          </div>

          <div className={styles.founderBody}>
            <div className={styles.eyebrowRow}>
              <span className={styles.eyebrow}>
                <i className={styles.dot} /> Meet the Founder
              </span>
              <span className={styles.eyebrowLine} />
            </div>

            <h2 className={styles.founderName}>Prince Hooda</h2>
            <p className={styles.founderRole}>Founder &amp; CEO, Acumen Interiors</p>

            <blockquote className={styles.pullQuote}>
              <Quote size={34} className={styles.quoteIcon} />
              I believe a beautiful space should do more than look good. It should feel like it
              belongs to the people who live in it.
            </blockquote>

            <p className={styles.para}>
              Prince Hooda leads the vision behind Acumen Interiors with a simple belief: great
              design is not about trends, it&apos;s about people.
            </p>
            <p className={styles.para}>
              For him, every project is a story waiting to be told. He and his team listen,
              understand and translate ideas into spaces that are functional, aesthetic and
              timeless. From homes to workplaces, his commitment remains the same: thoughtful
              design, honest process and flawless execution.
            </p>

            <ul className={styles.valuesStrip}>
              {values.map(({ icon: Icon, label }) => (
                <li key={label} className={styles.valueItem}>
                  <span className={styles.valueIcon}>
                    <Icon size={18} strokeWidth={1.5} />
                  </span>
                  <span className={styles.valueLabel}>{label}</span>
                </li>
              ))}
            </ul>

            <div className={styles.founderFoot}>
              <Button href="#who-we-are" className={styles.btnPrimary}>
                Our Journey
              </Button>
               <Button href="/contact"className={styles.btnOutline}> Talk to Prince</Button>
             
             
             
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ 3. WHO WE ARE ═══════ */}
      <section id="who-we-are" className={`${styles.container} ${styles.who}`}>
        <div className={styles.whoMedia}>
          <img src={IMG.whoA} alt="Designed interior" className={styles.whoImgA} />
          <img src={IMG.whoB} alt="Bathroom design" className={styles.whoImgB} />
        </div>

        <div className={styles.whoBody}>
          <span className={styles.eyebrow}>
            <i className={styles.dot} /> Who We Are
          </span>
          <h2 className={styles.title}>Design that speaks for the people who live in it.</h2>
          <p className={styles.para}>
            Acumen Interiors designs and builds residential and commercial interiors across
            full-home projects, single rooms, and bespoke furniture. We work end-to-end, from
            the first measured drawing through to final styling and handover.
          </p>
          <p className={styles.para}>
            Every project starts with how a space is actually used, not just how it will
            photograph. That approach shapes our layouts, material choices and the way we manage
            execution on site.
          </p>

          <div className={styles.stats}>
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className={styles.stat}>
                <span className={styles.statIcon}>
                  <Icon size={16} strokeWidth={1.5} />
                </span>
                <strong className={styles.statValue}>{value}</strong>
                <span className={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>

          <Button href="/contact" className={styles.btnPrimary}>
            Get in Touch 
          </Button>
        </div>
      </section>

      {/* ═══════ 4. PROCESS ═══════ */}
      <section id="process" className={styles.container}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>
            <i className={styles.dot} /> Our Process
          </span>
          <h2 className={styles.title}>From idea to reality, our seamless 6-step process.</h2>
        </div>

        <ol className={styles.steps}>
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className={styles.step}>
              <span className={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.stepIcon}>
                <Icon size={18} strokeWidth={1.5} />
              </span>
              <h3 className={styles.stepTitle}>{title}</h3>
              <p className={styles.stepText}>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ═══════ 5. TEAM ═══════ */}
      <section id="team" className={styles.container}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>
            <i className={styles.dot} /> Leadership Team
          </span>
          <h2 className={styles.title}>The people behind every space we create.</h2>
          <p className={styles.headPara}>
            A close-knit team of designers, planners and site experts, working as one from
            concept to completion.
          </p>
        </div>

        <div className={styles.team}>
          {team.map((m) => (
            <article key={m.name} className={styles.member}>
              <div className={styles.memberPhoto}>
                <img src={m.img} alt={m.name} className={styles.memberImg} />
                <span className={`${styles.chip} ${m.featured ? styles.chipGold : ""}`}>
                  {m.role}
                </span>
              </div>
              <div className={styles.memberBody}>
                <h3 className={styles.memberName}>{m.name}</h3>
                <span className={styles.memberTag}>{m.tag}</span>
                <p className={styles.memberText}>{m.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ═══════ 6. CTA ═══════ */}
      <section className={styles.container}>
        <div className={styles.cta}>
          <div className={styles.ctaBody}>
            <h2 className={styles.ctaTitle}>Let&apos;s create a space you&apos;ll love to live in.</h2>
            <p className={styles.ctaText}>
              Tell us about your space, your style and your vision. We&apos;ll help you turn it
              into something extraordinary.
            </p>
            <div className={styles.ctaBtns}>
              <Button href="/contact" className={styles.btnLight}>
                Get Your Consultation Today 
              </Button>
              <a href="tel:+918476898395" className={styles.btnGlass}>
                <PhoneCall size={15} /> Talk to a Designer
              </a>
            </div>
          </div>
          <div className={styles.ctaMedia}>
            <img src={IMG.cta} alt="" className={styles.ctaImg} />
          </div>
        </div>
      </section>
    </main>
  );
}