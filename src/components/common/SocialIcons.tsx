import type { ReactElement } from "react";
import { SITE, whatsappLink } from "@/data/content";
import s from "@/styles/components/Footer.module.css";

// Lucide v1 dropped brand icons, so these are tiny inline SVGs.
export const SOCIAL_ICONS: Record<string, ReactElement> = {
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
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path
        transform="translate(7.3 7.3) scale(0.4)"
        strokeWidth="3.6"
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      />
    </svg>
  ),
};

const LABELS: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  pinterest: "Pinterest",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  whatsapp: "WhatsApp",
};

/** Only profiles with a real URL in SITE.social, plus WhatsApp (always configured). */
export const SOCIAL_LINKS = [
  ...Object.entries(SITE.social)
    .filter(([, href]) => href)
    .map(([name, href]) => ({ name, label: LABELS[name] ?? name, href })),
  { name: "whatsapp", label: LABELS.whatsapp, href: whatsappLink() },
];

export default function SocialIcons({ className }: { className?: string }) {
  return (
    <ul className={className ?? s.social}>
      {SOCIAL_LINKS.map(({ name, label, href }) => (
        <li key={name}>
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Acumen Interiors on ${label}`}>
            {SOCIAL_ICONS[name]}
          </a>
        </li>
      ))}
    </ul>
  );
}
