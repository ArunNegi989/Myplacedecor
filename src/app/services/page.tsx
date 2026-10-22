import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import ServiceBlocks from "@/components/services/ServiceBlocks";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Services | MyplaceDecor",
  description:
    "Residential and commercial interior design, turnkey execution and custom furniture by MyplaceDecor in Gurugram.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumb="Services"
        eyebrow="What we do"
        title={
          <>
            Interior design tailored to <em>your lifestyle.</em>
          </>
        }
        text="From a single room to a complete turnkey home or workspace — design, execution and handover under one roof."
      />
      <ServiceBlocks />
      <CTASection />
    </>
  );
}
