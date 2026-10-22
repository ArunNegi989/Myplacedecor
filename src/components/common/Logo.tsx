import Link from "next/link";
import Image from "next/image";
import s from "@/styles/components/Logo.module.css";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={[s.logo, light ? s.light : ""].join(" ")}
      aria-label="Acumen Interiors – home"
    >
      <Image
        src="/assets/images/logo.png"
        alt="Acumen Interiors"
        width={200}
        height={80}
        priority
        className={s.logoImage}
      />
    </Link>
  );
}
