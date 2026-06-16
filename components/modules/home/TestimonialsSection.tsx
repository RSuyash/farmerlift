"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Rajesh Patil",
    role: "Farmer",
    location: "Nashik, Maharashtra",
    quote: "Since I started using FarmerLift's certified inputs, my crop yield has visibly improved. The quality guarantee gives me peace of mind every season.",
    initials: "RP",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  {
    name: "Vikram Singh",
    role: "Retailer",
    location: "Indore, Madhya Pradesh",
    quote: "The supply chain reliability is unmatched. As a retailer, getting authentic products delivered on time means I can keep my customers happy without stockouts.",
    initials: "VS",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    name: "Anand Agro Agencies",
    role: "Distributor",
    location: "Pune, Maharashtra",
    quote: "Partnering with FarmerLift has expanded our reach significantly. Their transparent logistics and premium product range make them an ideal enterprise partner.",
    initials: "AA",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  {
    name: "Suresh Reddy",
    role: "Farmer",
    location: "Kurnool, Andhra Pradesh",
    quote: "The agronomy experts actually guided me on the right nutrition schedule. It's not just buying products; it's getting complete agricultural support.",
    initials: "SR",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  {
    name: "Kisan Sewa Kendra",
    role: "Retailer",
    location: "Jalgaon, Maharashtra",
    quote: "FarmerLift's dealer support network is excellent. The margins are transparent, and the bulk delivery system is completely hassle-free.",
    initials: "KS",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    name: "Patidar Logistics",
    role: "Distributor",
    location: "Ujjain, Madhya Pradesh",
    quote: "We've scaled our operations 3x since joining the FarmerLift network. The enterprise-grade supply chain infrastructure they provide is best-in-class.",
    initials: "PL",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-black/20 border-y border-zinc-200/50 dark:border-white/5 overflow-hidden">
      <div className="container-width">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-widest text-xs mb-3 block">
            Real Voices from the Field
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-outfit text-zinc-900 dark:text-white mb-6 tracking-tight">
            Trusted by India's <span className="text-emerald-600 dark:text-emerald-500">Agricultural Network.</span>
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            From individual farmers to enterprise distributors, hear how our partners are scaling their operations and improving yields with FarmerLift.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200/60 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-emerald-500/30 dark:hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Quote Icon Background (Decorative) */}
              <Quote className="absolute top-8 right-8 w-12 h-12 text-zinc-100 dark:text-white/5 rotate-12 group-hover:-rotate-12 transition-transform duration-500" strokeWidth={1} />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <blockquote className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-8 flex-grow relative z-10 text-base md:text-[15px]">
                "{testimonial.quote}"
              </blockquote>

              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-zinc-100 dark:border-white/5 relative z-10">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold font-outfit text-lg ${testimonial.color}`}>
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white font-outfit">
                    {testimonial.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                      {testimonial.role}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {testimonial.location}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
