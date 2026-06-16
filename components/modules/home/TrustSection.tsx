"use client";

import { ShieldCheck, Truck, Microscope, Award, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/global/AnimatedCounter";

const metrics = [
  { label: "Farmers Empowered", value: 50000, suffix: "+" },
  { label: "Certified Products", value: 150, suffix: "+" },
  { label: "Dealer Network", value: 200, suffix: "+" },
  { label: "Districts Covered", value: 25, suffix: "+" },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Supply Chain",
    description: "Guaranteed authentic agricultural inputs sourced directly from certified manufacturers.",
  },
  {
    icon: Microscope,
    title: "Agronomy Expert Support",
    description: "Dedicated agricultural scientists and agronomists supporting our entire network.",
  },
  {
    icon: Award,
    title: "Certified Quality Standards",
    description: "Adhering to the highest industry and government benchmarks for safety and efficacy.",
  },
  {
    icon: Truck,
    title: "Pan-India Logistics",
    description: "Reliable, trackable delivery systems ensuring products reach the most remote farms.",
  },
];

const certifications = [
  "ISO 9001:2015 Certified",
  "FSSAI Approved",
  "Organic India",
  "Make in India",
  "GMP Certified",
];

export default function TrustSection() {
  return (
    <section className="relative py-20 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-white/10 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-emerald-500/5 dark:from-emerald-900/10 to-transparent pointer-events-none" />

      <div className="container-width relative z-10">
        
        {/* Layer 1: Metrics (Scale) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-20">
          {metrics.map((metric, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-black/40 rounded-2xl border border-zinc-100 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-3xl md:text-5xl font-black font-outfit text-emerald-600 dark:text-emerald-400 mb-2 tracking-tight flex items-center">
                <AnimatedCounter to={metric.value} duration={2.5} suffix={metric.suffix} />
              </div>
              <div className="text-sm md:text-base font-semibold text-zinc-600 dark:text-zinc-400">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Layer 2: Premium Trust Cards (Authority) */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-outfit text-zinc-900 dark:text-white mb-6 tracking-tight">
              Enterprise-Grade <span className="text-emerald-600 dark:text-emerald-500">Reliability.</span>
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We combine an industrial-scale supply chain with deep agronomic expertise to guarantee authenticity, quality, and results for every stakeholder.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative bg-white dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-200/50 dark:border-white/10 shadow-lg shadow-zinc-200/20 dark:shadow-none hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-emerald-600 dark:text-emerald-400 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold font-outfit text-zinc-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Layer 3: Certifications Banner (Proof) */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="border-t border-zinc-200 dark:border-white/10 pt-10"
        >
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-8">
            Recognized & Certified By
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="font-bold text-sm md:text-base">{cert}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
