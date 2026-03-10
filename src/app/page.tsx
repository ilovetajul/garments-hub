import type { Metadata } from "next";
import { HeroSection }      from "@/components/home/HeroSection";
import { CategoryCards }    from "@/components/home/CategoryCards";
import { FeaturedArticles } from "@/components/home/FeaturedArticles";
import { ToolsSection }     from "@/components/home/ToolsSection";
import { CoursesSection }   from "@/components/home/CoursesSection";
import { GlossaryTeaser }   from "@/components/home/GlossaryTeaser";
import { NewsletterCTA }    from "@/components/home/NewsletterCTA";

export const metadata: Metadata = {
  title: "Garments Brain — QC, POM & Fabric Knowledge Hub",
  description:
    "The definitive knowledge hub for garment QC inspectors, supervisors, and designers. POM charts, defect libraries, fabric specs, and free tools.",
};

// Revalidate homepage every hour
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryCards />
      <FeaturedArticles />
      <ToolsSection />
      <CoursesSection />
      <GlossaryTeaser />
      <NewsletterCTA />
    </>
  );
}
