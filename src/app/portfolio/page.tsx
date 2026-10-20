import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import TempSection from "@/components/common/TempSection";

export const metadata: Metadata = {
  title: "Portfolio | Acumen Interiors",
  description: "Explore completed homes and workspaces by Acumen Interiors.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        crumb="Portfolio"
        eyebrow="Our work"
        title={
          <>
            Spaces we&apos;ve <em>brought to life.</em>
          </>
        }
        text="Temporary intro text — completed projects will be showcased here."
      />
      <TempSection heading="Portfolio — coming soon" />
    </>
  );
}
