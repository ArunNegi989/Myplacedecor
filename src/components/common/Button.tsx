import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode, MouseEventHandler } from "react";
import s from "@/styles/components/Button.module.css";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  variant?: "primary" | "light" | "ghost" | "glass" | "gold";
  size?: "md" | "lg" | "sm";
  arrow?: boolean;
  icon?: ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  external?: boolean;
  "aria-label"?: string;
};

/** Pill button / link with shine sweep + animated arrow. Server-safe. */
export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  arrow = true,
  icon,
  className,
  type = "button",
  disabled,
  external,
  ...aria
}: Props) {
  const cls = [s.btn, s[variant], s[size], className ?? ""].join(" ").trim();
  const inner = (
    <>
      {icon && <span className={s.icon}>{icon}</span>}
      <span className={s.label}>{children}</span>
      {arrow && (
        <span className={s.arrow} aria-hidden>
          <ArrowRight size={16} strokeWidth={2} />
        </span>
      )}
    </>
  );

  if (href) {
    const isExternal = external ?? /^(https?:|tel:|mailto:)/.test(href);
    return isExternal ? (
      <a
        href={href}
        className={cls}
        onClick={onClick}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...aria}
      >
        {inner}
      </a>
    ) : (
      <Link href={href} className={cls} onClick={onClick} {...aria}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled} {...aria}>
      {inner}
    </button>
  );
}
