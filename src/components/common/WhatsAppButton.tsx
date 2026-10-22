import { SITE, whatsappLink } from "@/data/content";
import { SOCIAL_ICONS } from "./SocialIcons";
import s from "@/styles/components/WhatsAppButton.module.css";

/** Floating click-to-chat button, shown on every page. */
export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink(`Hi ${SITE.name}, I'd like to discuss an interior project.`)}
      target="_blank"
      rel="noopener noreferrer"
      className={s.fab}
      aria-label="Chat with MyplaceDecor on WhatsApp"
    >
      <span className={s.ring} aria-hidden />
      <span className={s.icon} aria-hidden>
        {SOCIAL_ICONS.whatsapp}
      </span>
      <span className={s.label} aria-hidden>
        Chat with us
      </span>
    </a>
  );
}
