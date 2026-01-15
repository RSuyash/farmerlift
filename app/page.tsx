import HeroSection from "@/components/modules/home/HeroSection";
import TrustSection from "@/components/modules/home/TrustSection";
import ProductRange from "@/components/modules/home/ProductRange";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import BlogPreviewSection from "@/components/modules/home/BlogPreviewSection";
import { getHomeBanners } from "@/lib/cms";

// Force dynamic rendering so banners update immediately when changed in WP
export const dynamic = 'force-dynamic';

export default async function Home() {
  // 1. Fetch Banners from CMS
  const slides = await getHomeBanners();

  return (
    <main className="min-h-screen bg-background">
      {/* Pass CMS slides to HeroSection. 
          Note: You will need to update HeroSection.tsx to accept { slides } as props 
          or it will just ignore them and show default. */}
      <HeroSection slides={slides} />

      <TrustSection />

      {/* Products are already dynamic via the ProductRange/Featured components */}
      <ProductRange />
      <FeaturedProducts />

      <BlogPreviewSection />
    </main>
  );
}