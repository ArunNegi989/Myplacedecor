import { Hammer } from "lucide-react";
import Container from "./Container";
import Button from "./Button";
import RevealAnimation from "@/components/animations/RevealAnimation";
import s from "@/styles/components/TempSection.module.css";

type Props = { heading: string; note?: string };

/**
 * TEMPORARY placeholder body for pages whose real content isn't ready yet
 * (About, Portfolio, Contact). Delete this component's usage from the page
 * and build the real sections in its place.
 */
export default function TempSection({ heading, note }: Props) {
  return (
    <section className={s.section}>
      <Container narrow>
        <RevealAnimation y={24}>
          <div className={s.card}>
            <span className={s.icon} aria-hidden>
              <Hammer size={26} />
            </span>
            <h2>{heading}</h2>
            <p>{note ?? "This page is a temporary placeholder. The real content will be added here soon."}</p>
            <Button href="/" variant="ghost">
              Back to Home
            </Button>
          </div>
        </RevealAnimation>
      </Container>
    </section>
  );
}
