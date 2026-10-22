import { ArrowRight, Images } from "lucide-react";
import CardImageSlider from "./CardImageSlider";
import type { PortfolioItem } from "@/data/portfolio";
import s from "@/styles/components/Portfolio.module.css";

type Props = {
  item: PortfolioItem;
  onOpen: (trigger: HTMLButtonElement) => void;
};

export default function PortfolioCard({ item, onOpen }: Props) {
  const count = item.images.length;
  const photos = `${count} ${count === 1 ? "photo" : "photos"}`;

  return (
    <button
      type="button"
      className={s.card}
      onClick={(e) => onOpen(e.currentTarget)}
      aria-label={`View project: ${item.title} (${item.category}, ${photos})`}
      aria-haspopup="dialog"
    >
      <CardImageSlider
        images={item.images}
        sizes="(min-width: 1320px) 410px, (min-width: 992px) 31vw, (min-width: 576px) 46vw, 92vw"
        imgClassName={s.cardImg}
      />
      <span className={s.cardShade} aria-hidden />
      <span className={s.badge}>{item.category}</span>
      <span className={s.expand} aria-hidden>
        <Images size={15} />
        {count > 1 && <span className={s.expandCount}>{count}</span>}
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
