import type { Metadata } from "next";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";
import PortfolioCTA from "@/components/portfolio/PortfolioCTA";

export const metadata: Metadata = {
  title: "Portfolio | MyplaceDecor",
  description:
    "Explore living rooms, kitchens, bathrooms, bedrooms, wardrobes, commercial spaces and custom furniture designed by MyplaceDecor, Gurugram.",
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
