import type { ReactElement } from "react";
import { SITE } from "@/data/content";
import s from "@/styles/components/Footer.module.css";

// Lucide v1 dropped brand icons, so these are tiny inline SVGs.
const ICONS: Record<string, ReactElement> = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />
    </svg>
  ),
  pinterest: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M10.5 20.5 12 13m-1.6-1.4c0-2 3.6-2.4 3.6.4 0 2-1.5 3.6-3 3.2-1.2-.3-1.4-1.6-1-2.6" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10 9.5 5 2.5-5 2.5z" fill="currentColor" />
    </svg>
  ),
};

export default function SocialIcons() {
  return (
    <ul className={s.social}>
      {Object.entries(SITE.social).map(([name, href]) => (
        <li key={name}>
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Acumen Interiors on ${name}`}>
            {ICONS[name]}
          </a>
        </li>
      ))}
    </ul>
  );
}
