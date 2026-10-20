"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import Button from "./Button";
import { useEnquiry } from "./EnquiryProvider";
import { NAV, SITE } from "@/data/content";
import s from "@/styles/components/Header.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const current = pathname === "/" ? "/" : `${pathname.replace(/\/+$/, "")}/`;
  const { openEnquiry } = useEnquiry();

  // shrink / elevate on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // mobile menu: lock scroll, Esc to close, close when resized to desktop
  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1200 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className={[s.header, scrolled ? s.scrolled : ""].join(" ")}>
      <div className={s.bar}>
        <Logo />

        <nav className={s.nav} aria-label="Primary">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={[s.link, current === n.href ? s.active : ""].join(" ")}
              aria-current={current === n.href ? "page" : undefined}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className={s.actions}>
          <a href={SITE.phoneHref} className={s.phone} aria-label={`Call ${SITE.phone}`}>
            <Phone size={18} />
          </a>
          <Button size="sm" arrow={false} className={s.cta} onClick={() => openEnquiry()}>
            Enquire Now
          </Button>
          <button
            className={[s.burger, open ? s.burgerOpen : ""].join(" ")}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className={s.mobile}
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0 round 28px)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0 round 28px)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0 round 28px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Mobile">
              <ul>
                {NAV.map((n, i) => (
                  <motion.li
                    key={n.href}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className={current === n.href ? s.mActive : undefined}
                    >
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      {n.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              className={s.mFoot}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a href={SITE.phoneHref}>
                <Phone size={16} /> {SITE.phone}
              </a>
              <Button
                onClick={() => {
                  setOpen(false);
                  openEnquiry();
                }}
              >
                Enquire Now
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
