"use client";

import { ShieldCheck, Truck, Users, Leaf, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
    {
        icon: ShieldCheck,
        title: "Certified Quality",
        description: "100% authentic inputs verified by agricultural experts.",
        border: "hover:border-emerald-500/20",
        iconColor: "text-emerald-600 dark:text-emerald-400",
        bgHover: "hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10"
    },
    {
        icon: Truck,
        title: "Reliable Delivery",
        description: "Fast and secure logistics network reaching remote farms.",
        border: "hover:border-blue-500/20",
        iconColor: "text-blue-600 dark:text-blue-400",
        bgHover: "hover:bg-blue-50/50 dark:hover:bg-blue-900/10"
    },
    {
        icon: Users,
        title: "Community Driven",
        description: "Join thousands of farmers sharing knowledge and success.",
        border: "hover:border-orange-500/20",
        iconColor: "text-orange-600 dark:text-orange-400",
        bgHover: "hover:bg-orange-50/50 dark:hover:bg-orange-900/10"

    },
    {
        icon: Leaf,
        title: "Sustainable Focus",
        description: "Promoting eco-friendly practices for long-term soil health.",
        border: "hover:border-green-500/20",
        iconColor: "text-green-600 dark:text-green-400",
        bgHover: "hover:bg-green-50/50 dark:hover:bg-green-900/10"
    },
];

export default function TrustSection() {
    return (
        <section className="py-24 bg-white dark:bg-black border-y border-gray-100 dark:border-white/5">
            <div className="container-width">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2 block">Our Promise</span>
                        <h2 className="text-3xl md:text-5xl font-bold font-outfit text-gray-900 dark:text-white tracking-tight mb-4">
                            Built for the <br className="hidden md:block" />
                            <span className="text-emerald-700 dark:text-emerald-500">Modern Farmer.</span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
                            We combine industrial-grade supply chains with deep agronomy expertise to deliver what matters most: Trust and Results.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-white/5 border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden bg-white dark:bg-white/5 shadow-sm">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={cn(
                                "group relative p-10 transition-all duration-300",
                                feature.bgHover
                            )}
                        >
                            <div className={`mb-6 p-3 w-fit rounded-xl bg-gray-50 dark:bg-white/5 group-hover:scale-105 transition-transform duration-300`}>
                                <feature.icon className={cn("w-8 h-8", feature.iconColor)} strokeWidth={1.5} />
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 font-outfit group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                                {feature.title}
                            </h3>

                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm mb-6">
                                {feature.description}
                            </p>

                            <div className="flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors uppercase tracking-wider">
                                Learn More <ArrowRight className="w-3 h-3 ml-2 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
