import HeroSection from "@/components/modules/home/HeroSection";
import TrustSection from "@/components/modules/home/TrustSection";
import ShopByCropSection from "@/components/modules/home/ShopByCropSection";
import ProductRange from "@/components/modules/home/ProductRange";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import TestimonialsSection from "@/components/modules/home/TestimonialsSection";
import BlogPreviewSection from "@/components/modules/home/BlogPreviewSection";
import { getHomeBanners } from "@/lib/cms";

export const revalidate = 300;

export default async function Home() {
  // 1. Fetch Banners from CMS
  const slides = await getHomeBanners();

  return (
    <main className="min-h-screen bg-background">
      <HeroSection slides={slides} />

      <TrustSection />

      <ShopByCropSection />

      {/* Products are already dynamic via the ProductRange/Featured components */}
      <ProductRange />
      <FeaturedProducts />

      <TestimonialsSection />

      <BlogPreviewSection />
    </main>
  );
}
