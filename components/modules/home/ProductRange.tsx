"use client";

import {
    Droplets,
    Leaf,
    Sprout,
    FlaskConical,
    Zap,
    Microscope,
    Atom,
    Layers,
    ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const categories = [
    {
        id: "water-soluble-npk",
        title: "Water Soluble NPK",
        subtitle: "Maximized Yield Efficiency",
        icon: Droplets,
        color: "text-blue-500",
        gradient: "from-blue-500/20 to-cyan-500/20",
        border: "group-hover:border-blue-500/50"
    },
    {
        id: "water-soluble-special",
        title: "Special Grades",
        subtitle: "Tailored Crop Nutrition",
        icon: FlaskConical,
        color: "text-cyan-500",
        gradient: "from-cyan-500/20 to-teal-500/20",
        border: "group-hover:border-cyan-500/50"
    },
    {
        id: "organic-bio-fertilizers",
        title: "Organic & Bio",
        subtitle: "Sustainable Growth",
        icon: Leaf,
        color: "text-green-500",
        gradient: "from-green-500/20 to-emerald-500/20",
        border: "group-hover:border-green-500/50"
    },
    {
        id: "straight-micronutrients",
        title: "Straight Micros",
        subtitle: "Precision Correction",
        icon: Atom,
        color: "text-purple-500",
        gradient: "from-purple-500/20 to-violet-500/20",
        border: "group-hover:border-purple-500/50"
    },
    {
        id: "micronutrient-mixtures",
        title: "Micro Mixtures",
        subtitle: "Balanced Formulas",
        icon: Layers,
        color: "text-indigo-500",
        gradient: "from-indigo-500/20 to-blue-500/20",
        border: "group-hover:border-indigo-500/50"
    },
    {
        id: "biostimulants-pgrs",
        title: "Biostimulants",
        subtitle: "Growth Activators",
        icon: Zap,
        color: "text-amber-500",
        gradient: "from-amber-500/20 to-orange-500/20",
        border: "group-hover:border-amber-500/50"
    },
    {
        id: "chelated-micronutrients",
        title: "Chelated Micros",
        subtitle: "High Absorption",
        icon: Microscope,
        color: "text-emerald-500",
        gradient: "from-emerald-500/20 to-teal-500/20",
        border: "group-hover:border-emerald-500/50"
    },
    {
        id: "secondary-nutrients",
        title: "Secondary Nutrients",
        subtitle: "Essential Elements",
        icon: Sprout,
        color: "text-lime-600",
        gradient: "from-lime-500/20 to-green-500/20",
        border: "group-hover:border-lime-500/50"
    }
];

export default function ProductRange() {
    return (
        <section className="py-24 bg-zinc-50 dark:bg-black relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container-width relative z-10">
                {/* Brand Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-zinc-200 dark:border-zinc-800 pb-8">
                    <div className="max-w-xl">
                        <span className="text-emerald-600 dark:text-emerald-500 font-bold tracking-wider uppercase text-xs mb-2 block">
                            Our Ecosystem
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black font-outfit text-zinc-900 dark:text-white leading-tight">
                            Advanced Crop <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                                Nutrition Solutions
                            </span>
                        </h2>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-lg font-medium text-zinc-500 dark:text-zinc-400">
                            Every Field. Every Crop. <br />
                            <span className="text-zinc-900 dark:text-white font-bold">One Solution.</span>
                        </p>
                    </div>
                </div>

                {/* Premium Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {categories.map((cat, idx) => (
                        <Link
                            key={cat.id}
                            href={`/catalogue/${cat.id}`}
                            className={cn(
                                "group relative overflow-hidden rounded-2xl p-6 h-full flex flex-col justify-between transition-all duration-300",
                                "bg-white dark:bg-zinc-900",
                                "border border-zinc-100 dark:border-zinc-800",
                                "hover:shadow-2xl hover:shadow-zinc-200/50 dark:hover:shadow-emerald-900/10",
                                "hover:-translate-y-1",
                                cat.border
                            )}
                        >
                            {/* Hover Gradient Overlay */}
                            <div className={cn(
                                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br",
                                cat.gradient
                            )} />

                            {/* Icon & Top */}
                            <div className="relative z-10 flex justify-between items-start mb-8">
                                <div className={cn(
                                    "p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 transition-colors duration-300 group-hover:bg-white dark:group-hover:bg-zinc-900",
                                    "group-hover:scale-110 transform transition-transform"
                                )}>
                                    <cat.icon className={cn("w-6 h-6", cat.color)} strokeWidth={2} />
                                </div>
                                <ArrowUpRight className="w-5 h-5 text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold font-outfit text-zinc-900 dark:text-white mb-1 group-hover:translate-x-1 transition-transform duration-300">
                                    {cat.title}
                                </h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                                    {cat.subtitle}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
