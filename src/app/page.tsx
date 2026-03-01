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
import { CtaBanner } from "@/components/sections/CtaBanner";
import { KnightOnlineSection } from "@/components/sections/KnightOnlineSection";
import { ApiProductsSection } from "@/components/sections/ApiProductsSection";
import { useSystem } from "@/context/SystemContext";

const SECTION_COMPONENTS: Record<string, React.ComponentType> = {
  hero: Hero,
  platformgrid: PlatformGrid,
  knightonlinesection: KnightOnlineSection,
  salesgrid: SalesGrid,
  productgrid: ProductGrid,
  trustbanner: TrustBanner,
  calculatorwidget: CalculatorWidget,
  ctabanner: CtaBanner,
  seocontent: SeoContent,
  apiproductssection: ApiProductsSection,
};

// Sections that should ALWAYS appear even if not in Firebase saved order
const ALWAYS_INCLUDE: string[] = ["knightonlinesection", "apiproductssection"];

export default function Home() {
  const { settings } = useSystem();

  const defaultOrder = ["hero", "platformgrid", "knightonlinesection", "salesgrid", "ctabanner", "trustbanner", "productgrid", "calculatorwidget", "seocontent"];

  let sectionOrder = settings.homepageSectionOrder || defaultOrder;
  const hiddenSections = (settings.hiddenSections || []).map(s => s.toLowerCase());

  // Normalize to lowercase and inject missing required sections
  sectionOrder = sectionOrder.map((s: string) => s.toLowerCase());
  for (const key of ALWAYS_INCLUDE) {
    if (!sectionOrder.includes(key)) {
      // Insert after platformgrid (or at position 2 if not found)
      const insertAfter = sectionOrder.indexOf("platformgrid");
      sectionOrder.splice(insertAfter >= 0 ? insertAfter + 1 : 2, 0, key);
    }
  }

  // Filter out hidden sections
  sectionOrder = sectionOrder.filter((s: string) => !hiddenSections.includes(s));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        {sectionOrder.map((sectionId: string) => {
          const SectionComponent = SECTION_COMPONENTS[sectionId];
          return SectionComponent ? <SectionComponent key={sectionId} /> : null;
        })}
      </main>

      <Footer />
    </div>
  );
}

