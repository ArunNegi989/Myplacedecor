"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Button from "./Button";
import { SERVICES } from "@/data/content";
import s from "@/styles/components/EnquiryModal.module.css";

type Props = { open: boolean; service?: string; onClose: () => void };

export default function EnquiryModal({ open, service, onClose }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const firstRef = useRef<HTMLInputElement>(null);

  // lock scroll, close on Escape, focus first field
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("no-scroll");
    const t = window.setTimeout(() => firstRef.current?.focus(), 250);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    // TODO: connect to your API (e.g. fetch("/api/enquiry", { method: "POST", body: new FormData(e.currentTarget) }))
    window.setTimeout(() => setStatus("done"), 900);
  };

  return (
    <AnimatePresence onExitComplete={() => setStatus("idle")}>
      {open && (
        <motion.div
          className={s.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-title"
            className={s.dialog}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className={s.close} onClick={onClose} aria-label="Close enquiry form">
              <X size={20} />
            </button>

            {status === "done" ? (
              <div className={s.done}>
                <span className={s.tick}>
                  <Check size={28} />
                </span>
                <h2>Thank you!</h2>
                <p>Our design team will call you back shortly to plan your consultation.</p>
                <Button onClick={onClose} arrow={false}>
                  Close
                </Button>
              </div>
            ) : (
              <>
                <span className={s.eyebrow}>Free consultation</span>
                <h2 id="enquiry-title" className={s.title}>
                  Tell us about your <em>space.</em>
                </h2>
                <form onSubmit={submit} className={s.form}>
                  <label>
                    <span>Full name</span>
                    <input ref={firstRef} name="name" required autoComplete="name" placeholder="Your name" />
                  </label>
                  <div className={s.row}>
                    <label>
                      <span>Phone</span>
                      <input name="phone" type="tel" required autoComplete="tel" placeholder="+91" />
                    </label>
                    <label>
                      <span>Email</span>
                      <input name="email" type="email" autoComplete="email" placeholder="you@email.com" />
                    </label>
                  </div>
                  <label>
                    <span>I&apos;m interested in</span>
                    <select name="service" defaultValue={service ?? SERVICES[0].title} key={service ?? "default"}>
                      {SERVICES.map((sv) => (
                        <option key={sv.title}>{sv.title}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>Message</span>
                    <textarea name="message" rows={3} placeholder="Property type, size, budget, timeline…" />
                  </label>
                  <Button type="submit" size="lg" disabled={status === "sending"} className={s.submit}>
                    {status === "sending" ? "Sending…" : "Request consultation"}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
