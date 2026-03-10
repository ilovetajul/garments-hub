import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Garments Brain — QC, POM & Fabric Knowledge Hub",
    template: "%s | Garments Brain",
  },
  description:
    "The definitive knowledge hub for garment industry professionals. POM charts, QC guides, defect libraries, fabric specs, and free calculation tools.",
  keywords: ["garment QC", "POM chart", "fabric GSM", "AQL", "garment defects", "sewing terms"],
  authors: [{ name: "Garments Brain" }],
  creator: "Garments Brain",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://garmentsbrain.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://garmentsbrain.com",
    siteName: "Garments Brain",
    title: "Garments Brain — QC, POM & Fabric Knowledge Hub",
    description: "The definitive knowledge hub for garment industry professionals.",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "Garments Brain" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Garments Brain",
    description: "The definitive knowledge hub for garment industry professionals.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
