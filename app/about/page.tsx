import Container from "@/components/global/ui/Container";
import { getPageBanner } from "@/lib/cms";
import Image from "next/image";

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function AboutPage() {
  // 1. Fetch 'about-us' data from WordPress
  const data = await getPageBanner('about-us');

  // 2. Fallback Data (If client hasn't created the page in WP yet)
  const content = {
    heading: data?.heading || "Empowering Agriculture Through Innovation",
    subtext: data?.subtext || "We bridge the gap between traditional farming and modern technology.",
    bannerImage: data?.image || "/images/hero/slide-1.png", // Ensure this exists in public folder
    mission: data?.aboutContent?.mission || "<p>Our mission is to provide high-quality agricultural inputs...</p>",
    aboutImage: data?.aboutContent?.image || "/images/home-hero.png" // Fallback image
  };

  return (
    <main className="min-h-screen bg-background pb-20">

      {/* DYNAMIC HERO BANNER */}
      <section className="relative h-[400px] w-full flex items-center justify-center text-center text-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={content.bannerImage}
            alt="About Banner"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>

        {/* Text Content */}
        <div className="relative z-10 px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {content.heading}
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            {content.subtext}
          </p>
        </div>
      </section>

      <Container className="pt-16">
        {/* MISSION SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left: Dynamic Content (HTML from WYSIWYG) */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">Our Mission & Vision</h2>
            <div
              className="prose prose-lg text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: content.mission }}
            />
          </div>

          {/* Right: Dynamic Image */}
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl border border-border/50">
            <Image
              src={content.aboutImage}
              alt="About FarmerLift"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* STATS SECTION */}
        <div className="flex justify-center mt-20 border-t border-border pt-12">
          {[
            { label: "Products", value: "50+" },
          ].map((stat, i) => (
            <div key={i} className="text-center px-10">
              <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

      </Container>
    </main>
  );
}