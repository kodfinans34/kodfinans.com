"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { PlatformGrid } from "@/components/sections/PlatformGrid";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { CalculatorWidget } from "@/components/sections/CalculatorWidget";
import { SeoContent } from "@/components/sections/SeoContent";
import { SalesGrid } from "@/components/sections/SalesGrid";
import { TrustBanner } from "@/components/sections/TrustBanner";
import { useSystem } from "@/context/SystemContext";
import { cn } from "@/lib/utils";

const SECTION_COMPONENTS: Record<string, React.ComponentType> = {
  Hero,
  PlatformGrid,
  SalesGrid,
  ProductGrid,
  TrustBanner,
  CalculatorWidget,
  SeoContent,
};

export default function Home() {
  const { settings, isLoaded } = useSystem();

  const defaultOrder = ["Hero", "PlatformGrid", "SalesGrid", "TrustBanner", "ProductGrid", "CalculatorWidget", "SeoContent"];
  const sectionOrder = settings.homepageSectionOrder || defaultOrder;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className={cn(
        "transition-opacity duration-700 ease-in-out",
        isLoaded ? "opacity-100" : "opacity-0"
      )}>
        {sectionOrder.map((sectionId) => {
          const SectionComponent = SECTION_COMPONENTS[sectionId];
          return SectionComponent ? <SectionComponent key={sectionId} /> : null;
        })}
      </main>

      <Footer />
    </div>
  );
}
