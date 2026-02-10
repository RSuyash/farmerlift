import Container from "@/components/global/ui/Container";
import { getPageBanner } from "@/lib/cms";
import Image from "next/image";
import { Linkedin, Mail } from "lucide-react";

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

        {/* MEET THE MINDS SECTION */}
        <div className="mt-32 mb-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-50/50 to-transparent dark:via-emerald-900/10 -z-10 blur-3xl" />

          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-widest uppercase mb-4">
              Our Leadership
            </span>
            <h2 className="text-4xl md:text-5xl font-black font-outfit text-zinc-900 dark:text-white mb-6">
              Meet the Minds
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-300 font-light leading-relaxed">
              Merging deep agricultural heritage with cutting-edge technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Dr. Mahesh Mahajan */}
            <div className="group relative bg-white dark:bg-zinc-900/80 backdrop-blur-sm rounded-3xl p-2 border border-zinc-100 dark:border-zinc-800 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-900/10">
              <div className="relative h-80 w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src="/images/team/mahesh-mahajan.jpg"
                  alt="Dr. Mahesh Mahajan"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex gap-2 justify-center">
                    <button className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-emerald-500 transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </button>
                    <button className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-emerald-500 transition-colors">
                      <Mail className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-8 text-center relative">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Dr. Mahesh Mahajan</h3>
                <p className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-sm mb-4">Co-Founder & Agri-Scientist</p>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Ph.D. in Molecular Biology & Biotechnology. <br />
                  Leading the research on sustainable crop nutrition and precision dosage models.
                </p>
              </div>
            </div>

            {/* Er. Gaurav Mahajan */}
            <div className="group relative bg-white dark:bg-zinc-900/80 backdrop-blur-sm rounded-3xl p-2 border border-zinc-100 dark:border-zinc-800 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/10">
              <div className="relative h-80 w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src="/images/team/gaurav-mahajan.jpg"
                  alt="Er. Gaurav Mahajan"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex gap-2 justify-center">
                    <button className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </button>
                    <button className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                      <Mail className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Er. Gaurav Mahajan</h3>
                <p className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider text-sm mb-4">Co-Founder & Tech Lead</p>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  M.Tech in Computer Science. <br />
                  Architecting the digital infrastructure to connect millions of farmers with quality inputs.
                </p>
              </div>
            </div>
          </div>
        </div>

      </Container>
    </main>
  );
}