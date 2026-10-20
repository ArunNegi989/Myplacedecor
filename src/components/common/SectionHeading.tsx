import type { ReactNode } from "react";
import RevealAnimation from "@/components/animations/RevealAnimation";
import s from "@/styles/components/SectionHeading.module.css";

type Props = {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  /** Optional right-aligned slot (usually a Button) */
  action?: ReactNode;
  light?: boolean;
  center?: boolean;
  as?: "h1" | "h2";
};

export default function SectionHeading({ eyebrow, title, text, action, light, center, as: Tag = "h2" }: Props) {
  return (
    <header className={[s.wrap, light ? s.light : "", center ? s.center : ""].join(" ")}>
      <div className={s.copy}>
        <RevealAnimation y={14}>
          <span className={s.eyebrow}>
            <i aria-hidden /> {eyebrow}
          </span>
        </RevealAnimation>
        <RevealAnimation delay={0.08}>
          <Tag className={s.title}>{title}</Tag>
        </RevealAnimation>
        {text && (
          <RevealAnimation delay={0.16}>
            <p className={s.text}>{text}</p>
          </RevealAnimation>
        )}
      </div>
      {action && (
        <RevealAnimation delay={0.2} className={s.action}>
          {action}
        </RevealAnimation>
      )}
    </header>
  );
}
