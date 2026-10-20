import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import TempSection from "@/components/common/TempSection";

export const metadata: Metadata = {
  title: "Contact Us | Acumen Interiors",
  description: "Get in touch with Acumen Interiors for a free design consultation.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact Us"
        eyebrow="Get in touch"
        title={
          <>
            Let&apos;s talk about <em>your space.</em>
          </>
        }
        text="Temporary intro text — contact details and the enquiry form will go here."
      />
      <TempSection heading="Contact Us — coming soon" />
    </>
  );
}
