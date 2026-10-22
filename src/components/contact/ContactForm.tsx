"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ChevronDown, ExternalLink, PenLine } from "lucide-react";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Button from "@/components/common/Button";
import { SOCIAL_ICONS } from "@/components/common/SocialIcons";
import { SITE, whatsappLink } from "@/data/content";
import { BUDGETS, CONTACT_METHODS, PROJECT_TYPES } from "@/data/contact";
import s from "@/styles/components/Contact.module.css";

type Values = {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  location: string;
  budget: string;
  method: string;
  message: string;
};
type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;

const EMPTY: Values = {
  name: "",
  phone: "",
  email: "",
  projectType: "",
  location: "",
  budget: "",
  method: "",
  message: "",
};

const ORDER: Field[] = ["name", "phone", "email", "projectType", "location", "budget", "method", "message"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EASE = [0.22, 1, 0.36, 1] as const;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";

  const digits = v.phone.replace(/\D/g, "");
  if (!digits) e.phone = "Please enter your phone number.";
  else if (!/^[+\d\s()-]+$/.test(v.phone.trim()) || digits.length < 10 || digits.length > 15)
    e.phone = "Enter a valid phone number, e.g. 98765 43210 or +91 98765 43210.";
  else if (digits.length === 10 && !/^[6-9]/.test(digits)) e.phone = "Indian mobile numbers start with 6, 7, 8 or 9.";

  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Enter a valid email address, e.g. name@example.com.";

  if (v.message.trim().length < 10) e.message = "Tell us a little about your project (at least 10 characters).";
  return e;
}

/** Neatly formatted WhatsApp message — only completed fields are included. */
function buildMessage(v: Values) {
  const line = (label: string, value: string) => (value.trim() ? `*${label}:* ${value.trim()}` : null);
  return [
    `*New Interior Enquiry — ${SITE.name}*`,
    "",
    line("Name", v.name),
    line("Phone", v.phone),
    line("Email", v.email),
    line("Project Type", v.projectType),
    line("Project Location", v.location),
    line("Estimated Budget", v.budget),
    line("Preferred Contact", v.method),
    "",
    "*Project Requirements:*",
    v.message.trim(),
    "",
    "_Sent from the website contact form_",
  ]
    .filter((l) => l !== null)
    .join("\n");
}

export default function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "opening" | "handoff">("idle");
  const [showSummary, setShowSummary] = useState(false);
  const [waUrl, setWaUrl] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const update = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    // re-validate live once a field has been visited
    if (touched[name as Field]) setErrors(validate(next));
  };

  const blur = (e: { target: { name: string } }) => {
    const name = e.target.name as Field;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(values));
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched(Object.fromEntries(ORDER.map((f) => [f, true])));

    const firstBad = ORDER.find((f) => found[f]);
    if (firstBad) {
      setShowSummary(true);
      formRef.current?.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }
    setShowSummary(false);

    const url = whatsappLink(buildMessage(values));
    setWaUrl(url);
    setStatus("opening");

    // Open synchronously inside the submit handler so pop-up blockers allow it.
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url;

    window.setTimeout(() => setStatus("handoff"), 900);
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setTouched({});
    setStatus("idle");
  };

  const err = (f: Field) => (touched[f] ? errors[f] : undefined);
  const fieldProps = (f: Field) => ({
    id: `cf-${f}`,
    name: f,
    value: values[f],
    onChange: update,
    onBlur: blur,
    "aria-invalid": err(f) ? true : undefined,
    "aria-describedby": err(f) ? `cf-${f}-error` : undefined,
  });
  const errorText = (f: Field) =>
    err(f) ? (
      <span id={`cf-${f}-error`} className={s.error}>
        <AlertCircle size={13} aria-hidden /> {err(f)}
      </span>
    ) : null;

  const errorCount = Object.keys(errors).length;

  return (
    <div className={s.formCard}>
      <AnimatePresence mode="wait" initial={false}>
        {status === "handoff" ? (
          <motion.div
            key="handoff"
            className={s.handoff}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: EASE }}
            role="status"
            aria-live="polite"
          >
            <span className={s.handoffIcon} aria-hidden>
              {SOCIAL_ICONS.whatsapp}
            </span>
            <h2 className={s.blockTitle}>
              One last step — <em>press Send.</em>
            </h2>
            <p className={s.blockText}>
              Your enquiry is ready in WhatsApp. It reaches our studio only after you press <strong>Send</strong> in
              the WhatsApp chat that just opened.
            </p>
            <ol className={s.steps}>
              <li>Check the prefilled message in WhatsApp or WhatsApp Web.</li>
              <li>Press Send to deliver it to {SITE.whatsappDisplay}.</li>
              <li>We&apos;ll reply on your preferred contact method.</li>
            </ol>
            <div className={s.handoffBtns}>
              <Button
                href={waUrl}
                variant="primary"
                arrow={false}
                icon={<ExternalLink size={16} />}
                aria-label="Open WhatsApp again with your enquiry"
              >
                WhatsApp didn&apos;t open? Try again
              </Button>
              <Button variant="ghost" arrow={false} icon={<PenLine size={16} />} onClick={() => setStatus("idle")}>
                Edit enquiry
              </Button>
            </div>
            <button type="button" className={s.textBtn} onClick={reset}>
              Start a new enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            className={s.form}
            onSubmit={submit}
            noValidate
            aria-labelledby="enquiry-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className={s.formHead}>
              <span className={s.eyebrow}>
                <i aria-hidden /> Project enquiry
              </span>
              <h2 id="enquiry-title" className={s.blockTitle}>
                Tell us about <em>your space.</em>
              </h2>
              <p className={s.blockText}>
                Fields marked <span className={s.req}>*</span> are required. Your enquiry opens in WhatsApp so you can
                review it before sending.
              </p>
            </div>

            <div aria-live="assertive">
              {showSummary && errorCount > 0 && (
                <p className={s.summary} role="alert">
                  <AlertCircle size={16} aria-hidden /> Please fix {errorCount} highlighted{" "}
                  {errorCount === 1 ? "field" : "fields"} to continue.
                </p>
              )}
            </div>

            <div className={s.row}>
              <div className={s.field}>
                <label htmlFor="cf-name">
                  Full Name <span className={s.req} aria-hidden>*</span>
                </label>
                <input {...fieldProps("name")} type="text" autoComplete="name" placeholder="Your full name" required />
                {errorText("name")}
              </div>
              <div className={s.field}>
                <label htmlFor="cf-phone">
                  Phone Number <span className={s.req} aria-hidden>*</span>
                </label>
                <input
                  {...fieldProps("phone")}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                  required
                />
                {errorText("phone")}
              </div>
            </div>

            <div className={s.field}>
              <label htmlFor="cf-email">
                Email Address <span className={s.req} aria-hidden>*</span>
              </label>
              <input
                {...fieldProps("email")}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="name@example.com"
                required
              />
              {errorText("email")}
            </div>

            <div className={s.row}>
              <div className={s.field}>
                <label htmlFor="cf-projectType">Project Type</label>
                <div className={s.selectWrap}>
                  <select {...fieldProps("projectType")}>
                    <option value="">Select a project type</option>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} aria-hidden />
                </div>
              </div>
              <div className={s.field}>
                <label htmlFor="cf-location">
                  Project Location <span className={s.opt}>(optional)</span>
                </label>
                <input
                  {...fieldProps("location")}
                  type="text"
                  autoComplete="address-level2"
                  placeholder="e.g. Sector 62, Gurugram"
                />
              </div>
            </div>

            <div className={s.field}>
              <label htmlFor="cf-budget">
                Estimated Budget <span className={s.opt}>(optional)</span>
              </label>
              <div className={s.selectWrap}>
                <select {...fieldProps("budget")}>
                  <option value="">Select a budget range</option>
                  {BUDGETS.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
                <ChevronDown size={16} aria-hidden />
              </div>
            </div>

            <fieldset className={s.field}>
              <legend>
                Preferred Contact Method <span className={s.opt}>(optional)</span>
              </legend>
              <div className={s.chips}>
                {CONTACT_METHODS.map((m) => (
                  <label key={m} className={s.chip}>
                    <input
                      type="radio"
                      name="method"
                      value={m}
                      checked={values.method === m}
                      onChange={update}
                    />
                    <span>{m}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className={s.field}>
              <label htmlFor="cf-message">
                Message / Project Requirements <span className={s.req} aria-hidden>*</span>
              </label>
              <textarea
                {...fieldProps("message")}
                rows={5}
                placeholder="Property type & size, rooms to design, style you like, timeline…"
                required
              />
              {errorText("message")}
            </div>

            <Button type="submit" size="lg" className={s.submit} disabled={status === "opening"} arrow={status !== "opening"}>
              {status === "opening" ? (
                <>
                  <span className={s.loader} aria-hidden /> Opening WhatsApp…
                </>
              ) : (
                "Send Enquiry via WhatsApp"
              )}
            </Button>
            <p className={s.note}>
              Opens WhatsApp with your details prefilled — nothing is sent until you press Send there.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
