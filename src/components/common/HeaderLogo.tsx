import Link from "next/link";
import Image from "next/image";
import s from "@/styles/components/Header.module.css";

/**
 * Header-only logo. Change the file, size or styling here (and `.logo` / `.logoImg`
 * in Header.module.css) without touching the footer logo.
 * `width` / `height` are the image's intrinsic pixels; the rendered size comes from CSS.
 */
const HEADER_LOGO = {
  src: "/assets/images/headerlogo.png",
  width: 660,
  height: 509,
  alt: "MyplaceDecor",
};

export default function HeaderLogo() {
  return (
    <Link href="/" className={s.logo} aria-label="MyplaceDecor – home">
      <Image
        src={HEADER_LOGO.src}
        alt={HEADER_LOGO.alt}
        width={HEADER_LOGO.width}
        height={HEADER_LOGO.height}
        priority
        className={s.logoImg}
      />
    </Link>
  );
}
