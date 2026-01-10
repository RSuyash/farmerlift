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
    Package
} from "lucide-react";
import Link from "next/link";

const categories = [
    {
        id: "water-soluble-npk",
        title: "Water Soluble NPK Fertilizer",
        icon: Droplets,
        color: "text-blue-500",
        // Light: Blue-50 bg, Dark: Dark Zinc card with subtle blue tint
        className: "from-blue-500/0 to-blue-500/0 hover:from-blue-500/5 hover:to-blue-500/10 dark:hover:from-blue-500/10 dark:hover:to-blue-500/20",
        iconBg: "bg-blue-50 dark:bg-blue-500/10 group-hover:bg-blue-500 group-hover:text-white"
    },
    {
        id: "water-soluble-special",
        title: "Water Soluble Special Grades",
        icon: FlaskConical,
        color: "text-cyan-500",
        className: "from-cyan-500/0 to-cyan-500/0 hover:from-cyan-500/5 hover:to-cyan-500/10 dark:hover:from-cyan-500/10 dark:hover:to-cyan-500/20",
        iconBg: "bg-cyan-50 dark:bg-cyan-500/10 group-hover:bg-cyan-500 group-hover:text-white"
    },
    {
        id: "organic-bio-fertilizers",
        title: "Organic and Bio fertilizers",
        icon: Leaf,
        color: "text-green-500",
        className: "from-green-500/0 to-green-500/0 hover:from-green-500/5 hover:to-green-500/10 dark:hover:from-green-500/10 dark:hover:to-green-500/20",
        iconBg: "bg-green-50 dark:bg-green-500/10 group-hover:bg-green-500 group-hover:text-white"
    },
    {
        id: "straight-micronutrients",
        title: "Straight Micronutrients",
        icon: Atom,
        color: "text-purple-500",
        className: "from-purple-500/0 to-purple-500/0 hover:from-purple-500/5 hover:to-purple-500/10 dark:hover:from-purple-500/10 dark:hover:to-purple-500/20",
        iconBg: "bg-purple-50 dark:bg-purple-500/10 group-hover:bg-purple-500 group-hover:text-white"
    },
    {
        id: "micronutrient-mixtures",
        title: "Micronutrients Mixtures",
        icon: Layers,
        color: "text-indigo-500",
        className: "from-indigo-500/0 to-indigo-500/0 hover:from-indigo-500/5 hover:to-indigo-500/10 dark:hover:from-indigo-500/10 dark:hover:to-indigo-500/20",
        iconBg: "bg-indigo-50 dark:bg-indigo-500/10 group-hover:bg-indigo-500 group-hover:text-white"
    },
    {
        id: "biostimulants-pgrs",
        title: "Biostimulants / PGRs",
        icon: Zap,
        color: "text-yellow-500",
        className: "from-yellow-500/0 to-yellow-500/0 hover:from-yellow-500/5 hover:to-yellow-500/10 dark:hover:from-yellow-500/10 dark:hover:to-yellow-500/20",
        iconBg: "bg-yellow-50 dark:bg-yellow-500/10 group-hover:bg-yellow-500 group-hover:text-white"
    },
    {
        id: "chelated-micronutrients",
        title: "Chelated Micronutrients",
        icon: Microscope,
        color: "text-emerald-500",
        className: "from-emerald-500/0 to-emerald-500/0 hover:from-emerald-500/5 hover:to-emerald-500/10 dark:hover:from-emerald-500/10 dark:hover:to-emerald-500/20",
        iconBg: "bg-emerald-50 dark:bg-emerald-500/10 group-hover:bg-emerald-500 group-hover:text-white"
    },
    {
        id: "secondary-nutrients",
        title: "Secondary Nutrients",
        icon: Sprout,
        color: "text-lime-600",
        className: "from-lime-500/0 to-lime-500/0 hover:from-lime-500/5 hover:to-lime-500/10 dark:hover:from-lime-500/10 dark:hover:to-lime-500/20",
        iconBg: "bg-lime-50 dark:bg-lime-500/10 group-hover:bg-lime-600 group-hover:text-white"
    }
];

export default function ProductRange() {
    return (
        <section className="py-24 bg-gray-50/50 dark:bg-black relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

            <div className="container-width relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold font-outfit text-gray-900 dark:text-white mb-6 tracking-tight">
                        Product <span className="text-emerald-600 dark:text-emerald-500">Range</span>
                    </h2>
                    <p className="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-300">
                        Every Field, Every Crop - <span className="font-semibold text-emerald-700 dark:text-emerald-400">One Solution</span>
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 justify-center">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/catalogue/${cat.id}`}
                            className={`
                                group relative flex flex-col items-center text-center p-8
                                rounded-3xl border border-gray-100 dark:border-white/10
                                bg-white dark:bg-zinc-900/50 backdrop-blur-sm
                                bg-gradient-to-br ${cat.className}
                                transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-transparent
                                dark:hover:shadow-emerald-900/10 hover:shadow-gray-200/50
                            `}
                        >
                            <div className={`mb-6 p-5 rounded-2xl ${cat.iconBg} transition-all duration-500 shadow-sm group-hover:shadow-md group-hover:scale-110`}>
                                <cat.icon className={`w-8 h-8 md:w-10 md:h-10 ${cat.color} group-hover:text-white transition-colors duration-500`} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-base md:text-xl font-bold text-gray-900 dark:text-gray-100 font-outfit leading-tight group-hover:text-emerald-800 dark:group-hover:text-white transition-colors">
                                {cat.title}
                            </h3>

                            {/* Hover Arrow */}
                            <div className="absolute bottom-4 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">View Products</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
