import Image from "next/image";

import { Shield, Users, Sprout, TrendingUp, Handshake, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">

      {/* 1. Hero Section (Text Driven) */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-emerald-950 text-white border-b border-white/10">
        {/* Background Image Banner */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/70 z-10" />
          <Image
            src="/images/home-hero.png"
            alt="About FarmerLift"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="container-width relative z-10 text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-emerald-800/50 border border-emerald-700/50 text-emerald-100 text-xs font-bold uppercase tracking-widest mb-6">
            Established 2025
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-outfit mb-6 tracking-tight leading-tight">
            Empowering the <br />
            <span className="text-emerald-400">Future of Farming</span>
          </h1>
          <p className="text-emerald-100/80 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            FarmerLift is building the digital infrastructure to connect India's rural agricultural economy with global-grade inputs and markets.
          </p>
        </div>
      </section>



      {/* 3. Our Story Section */}
      <section className="py-24 container-width">
        <div className="grid gap-16 md:grid-cols-2 items-center">
          <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
            {/* Abstract Graphic Placeholder since Image Gen is down */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/20 dark:to-black opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sprout className="w-24 h-24 text-emerald-900/20 dark:text-white/20" />
            </div>
          </div>

          <div className="space-y-8 animate-slide-up">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-outfit text-gray-900 dark:text-white mb-6">
                Technology meets Tradition.
              </h2>
              <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  For decades, Indian farmers have faced a disconnected supply chain—struggling with counterfeit products, delayed deliveries, and a lack of access to modern agricultural knowledge.
                </p>
                <p>
                  <strong className="text-emerald-700 dark:text-emerald-400">FarmerLift changed that equation.</strong> By partnering directly with industrial manufacturers like Coromandel, Bayer, and Jain Irrigation, we created a streamlined digital pipeline.
                </p>
                <p>
                  We don't just deliver boxes; we deliver trust. Every bag of seed and every liter of fertilizer on our platform is tracked, verified, and delivered with care.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/contact">
                <Button className="rounded-full bg-emerald-900 text-white hover:bg-emerald-800 px-8 h-12">
                  Join Our Network
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" className="rounded-full border-gray-300 dark:border-white/20 h-12 px-8">
                  Explore Inputs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Leadership Team */}
      <section className="py-24 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-white/5">
        <div className="container-width text-center">
          <h2 className="text-3xl font-bold font-outfit text-gray-900 dark:text-white mb-4">Meet the Minds</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
            A diverse team of agricultural experts and technologists united by a single mission.
          </p>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16 max-w-3xl mx-auto">
            {[
              {
                name: "Dr. Mahesh Mahajan",
                role: "Co-Founder",
                subRole: "PhD Molecular Biology & Biotechnology",
                bg: "bg-emerald-100 text-emerald-700"
              },
              {
                name: "Er. Gaurav Mahajan",
                role: "Co-Founder",
                subRole: "M.Tech Computer Science",
                bg: "bg-indigo-100 text-indigo-700"
              },
            ].map((member, i) => (
              <div key={i} className="group">
                <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center text-3xl font-bold mb-6 ${member.bg} group-hover:scale-110 transition-transform shadow-lg`}>
                  {member.name.split(" ").slice(1).map(n => n[0]).join("")}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-outfit">{member.name}</h3>
                <p className="text-base font-bold text-emerald-700 dark:text-emerald-500 uppercase tracking-wider mb-1">{member.role}</p>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{member.subRole}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Core Values Grid */}
      <section className="py-24 bg-gray-50 dark:bg-black/40 border-y border-gray-200 dark:border-white/5">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-outfit text-gray-900 dark:text-white mb-4">Our Core Values</h2>
            <p className="text-gray-600 dark:text-gray-400">The principles that drive every decision we make.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Uncompromising Quality",
                text: "We have a zero-tolerance policy for counterfeit products. If it's on FarmerLift, it's authentic."
              },
              {
                icon: Handshake,
                title: "Farmer First",
                text: "We advocate for fair pricing and transparent terms. We succeed only when our farmers succeed."
              },
              {
                icon: Globe,
                title: "Sustainable Growth",
                text: "We prioritize products and practices that ensure long-term soil health and environmental balance."
              }
            ].map((val, i) => (
              <div key={i} className="bg-white dark:bg-white/5 p-8 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-700 dark:text-emerald-400 mb-6">
                  <val.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-outfit">{val.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {val.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
