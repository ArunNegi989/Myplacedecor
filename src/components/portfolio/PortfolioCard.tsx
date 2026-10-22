import { ArrowRight, Expand } from "lucide-react";
import SafeImage from "@/components/common/SafeImage";
import type { PortfolioItem } from "@/data/portfolio";
import s from "@/styles/components/Portfolio.module.css";

type Props = {
  item: PortfolioItem;
  onOpen: (trigger: HTMLButtonElement) => void;
};

export default function PortfolioCard({ item, onOpen }: Props) {
  return (
    <button
      type="button"
      className={s.card}
      onClick={(e) => onOpen(e.currentTarget)}
      aria-label={`Open ${item.title} (${item.category}) in full screen`}
      aria-haspopup="dialog"
    >
      <SafeImage
        src={item.thumb}
        alt={item.alt}
        fill
        sizes="(min-width: 1320px) 410px, (min-width: 992px) 31vw, (min-width: 576px) 46vw, 92vw"
        className={s.cardImg}
      />
      <span className={s.cardShade} aria-hidden />
      <span className={s.badge}>{item.category}</span>
      <span className={s.expand} aria-hidden>
        <Expand size={16} />
      </span>
      <span className={s.cardInfo}>
        <span className={s.cardTitle}>{item.title}</span>
        <span className={s.cardLink}>
          <span>View Project</span>
          <ArrowRight size={15} aria-hidden />
        </span>
      </span>
    </button>
  );
}
