import Link from "next/link";
import Image from "next/image";
import s from "@/styles/components/Footer.module.css";

/**
 * Footer-only logo, independent of the header. Point `src` at a light / reversed
 * version of the logo for the dark footer; the white plate (`.logoPlate` in
 * Footer.module.css) keeps the current dark artwork readable until then.
 * `width` / `height` are the image's intrinsic pixels; the rendered size comes from CSS.
 */
const FOOTER_LOGO = {
  src: "/assets/images/logo.png",
  width: 660,
  height: 509,
  alt: "MyplaceDecor",
  plate: true,
};

export default function FooterLogo() {
  return (
    <Link
      href="/"
      className={[s.logo, FOOTER_LOGO.plate ? s.logoPlate : ""].join(" ")}
      aria-label="MyplaceDecor – home"
    >
      <Image
        src={FOOTER_LOGO.src}
        alt={FOOTER_LOGO.alt}
        width={FOOTER_LOGO.width}
        height={FOOTER_LOGO.height}
        className={s.logoImg}
      />
    </Link>
  );
}
