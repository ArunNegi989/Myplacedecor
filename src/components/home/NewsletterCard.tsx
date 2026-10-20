"use client";

import { Check, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import SafeImage from "@/components/common/SafeImage";
import { NEWSLETTER_BG } from "@/data/content";
import s from "@/styles/components/Why.module.css";

export default function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setState("sending");
    // TODO: connect to your newsletter API / provider
    window.setTimeout(() => {
      setState("done");
      setEmail("");
    }, 800);
  };

  return (
    <div id="journal" className={s.news}>
      <SafeImage src={NEWSLETTER_BG} alt="" fill sizes="(min-width: 992px) 36vw, 92vw" className={s.bg} />
      <div className={s.scrim} />
      <div className={s.newsBody}>
        <span className={s.kicker}>The Acumen Journal</span>
        <h3>
          Stay inspired with design <em>ideas &amp; updates.</em>
        </h3>

        {state === "done" ? (
          <p className={s.thanks} role="status">
            <Check size={18} /> You&apos;re on the list — welcome!
          </p>
        ) : (
          <form onSubmit={submit} className={s.form}>
            <label className="sr-only" htmlFor="nl-email">
              Email address
            </label>
            <input
              id="nl-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
            />
            <button type="submit" aria-label="Subscribe" disabled={state === "sending"}>
              <Send size={16} />
            </button>
          </form>
        )}
        <small>No spam, unsubscribe anytime.</small>
      </div>
    </div>
  );
}
