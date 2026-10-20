import type { ElementType, ReactNode } from "react";
import s from "@/styles/components/Container.module.css";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  id?: string;
  narrow?: boolean;
};

export default function Container({ children, as: Tag = "div", className, id, narrow }: Props) {
  return (
    <Tag id={id} className={[s.container, narrow ? s.narrow : "", className ?? ""].join(" ").trim()}>
      {children}
    </Tag>
  );
}
