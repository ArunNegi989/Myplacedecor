"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import s from "@/styles/components/Footer.module.css";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      className={[s.toTop, show ? s.toTopShow : ""].join(" ")}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      tabIndex={show ? 0 : -1}
    >
      <ArrowUp size={20} />
    </button>
  );
}
