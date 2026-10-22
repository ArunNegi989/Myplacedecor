import { MapPin, Navigation } from "lucide-react";
import { SITE } from "@/data/content";
import s from "@/styles/components/Contact.module.css";

// Keyless Google Maps embed + directions link, both driven by SITE.mapQuery.
const q = encodeURIComponent(SITE.mapQuery);
const EMBED = `https://www.google.com/maps?q=${q}&output=embed`;
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${q}`;

export default function LocationMap() {
  return (
    <div className={s.map}>
      <iframe
        src={EMBED}
        title={`Map showing the location of ${SITE.name} — ${SITE.address}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div className={s.mapCard}>
        <span className={s.mapPin} aria-hidden>
          <MapPin size={18} />
        </span>
        <div>
          <strong>{SITE.name} Studio</strong>
          <address>{SITE.address}</address>
        </div>
        <a href={DIRECTIONS} target="_blank" rel="noopener noreferrer" className={s.mapBtn}>
          <Navigation size={15} aria-hidden /> Get Directions
        </a>
      </div>
    </div>
  );
}
