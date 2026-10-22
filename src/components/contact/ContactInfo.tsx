import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import SocialIcons, { SOCIAL_ICONS } from "@/components/common/SocialIcons";
import { SITE, whatsappLink } from "@/data/content";
import s from "@/styles/components/Contact.module.css";

type Row = { icon: ReactNode; label: string; value: string; href?: string; external?: boolean };

const ROWS: Row[] = [
  { icon: <Phone size={18} />, label: "Call us", value: SITE.phone, href: SITE.phoneHref },
  {
    icon: <span className={s.infoWa}>{SOCIAL_ICONS.whatsapp}</span>,
    label: "WhatsApp",
    value: SITE.whatsappDisplay,
    href: whatsappLink(),
    external: true,
  },
  // hidden until SITE.email is filled in
  ...(SITE.email ? [{ icon: <Mail size={18} />, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` }] : []),
  { icon: <MapPin size={18} />, label: "Studio", value: SITE.address },
  { icon: <Clock size={18} />, label: "Business hours", value: SITE.hours },
];

export default function ContactInfo() {
  return (
    <div className={s.info}>
      <h2 className={s.blockTitle}>
        Visit, call or <em>say hello.</em>
      </h2>
      <p className={s.blockText}>Reach the studio directly — we&apos;re happy to talk through ideas before you commit to anything.</p>

      <ul className={s.infoList}>
        {ROWS.map((r) => {
          const body = (
            <>
              <span className={s.infoIcon} aria-hidden>
                {r.icon}
              </span>
              <span className={s.infoBody}>
                <small>{r.label}</small>
                {r.label === "Studio" ? <address>{r.value}</address> : <strong>{r.value}</strong>}
              </span>
            </>
          );
          return (
            <li key={r.label}>
              {r.href ? (
                <a
                  href={r.href}
                  className={`${s.infoItem} ${s.infoLink}`}
                  {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {body}
                </a>
              ) : (
                <div className={s.infoItem}>{body}</div>
              )}
            </li>
          );
        })}
      </ul>

      <div className={s.follow}>
        <span>Follow our work</span>
        <SocialIcons className={s.social} />
      </div>
    </div>
  );
}
