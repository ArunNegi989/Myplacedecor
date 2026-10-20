import Link from "next/link";
import s from "@/styles/components/Logo.module.css";

/** Placeholder wordmark. Replace the monogram with your real logo image when ready. */
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={[s.logo, light ? s.light : ""].join(" ")} aria-label="Acumen Interiors – home">
      <span className={s.mark} aria-hidden>
        <svg viewBox="0 0 40 40" fill="none">
          <path d="M20 5 L33 34 M20 5 L7 34 M12.5 24h15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M5 36h30" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".6" />
        </svg>
      </span>
      <span className={s.word}>
        <strong>Acumen</strong>
        <small>Interiors</small>
      </span>
    </Link>
  );
}
