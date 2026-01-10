import HeroCarousel from "@/components/modules/home/HeroCarousel";
import ProductRange from "@/components/modules/home/ProductRange";
import TrustSection from "@/components/modules/home/TrustSection";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import BlogPreviewSection from "@/components/modules/home/BlogPreviewSection";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <TrustSection />
      <ProductRange />
      <FeaturedProducts />
      <BlogPreviewSection />
    </>
  );
}