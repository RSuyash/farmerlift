import HeroSection from "@/components/modules/home/HeroSection";
import TrustSection from "@/components/modules/home/TrustSection";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import BlogPreviewSection from "@/components/modules/home/BlogPreviewSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <FeaturedProducts />
      <BlogPreviewSection />
    </>
  );
}