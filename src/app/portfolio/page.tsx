import type { Metadata } from "next";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";
import PortfolioCTA from "@/components/portfolio/PortfolioCTA";

export const metadata: Metadata = {
  title: "Portfolio | Acumen Interiors",
  description:
    "Explore living rooms, kitchens, bathrooms, bedrooms, wardrobes, commercial spaces and custom furniture designed by Acumen Interiors, Gurugram.",
};

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <PortfolioGallery />
      <PortfolioCTA />
    </>
  );
}
