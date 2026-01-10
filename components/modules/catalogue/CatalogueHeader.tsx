"use client";

import Image from "next/image";
import Link from "next/link";
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

const iconMap: any = {
    Droplets,
    Leaf,
    Sprout,
    FlaskConical,
    Zap,
    Microscope,
    Atom,
    Layers,
    Package
};

interface Category {
    id: string;
    name: string;
    description: string;
    icon: string;
}

interface CatalogueHeaderProps {
    categories: Category[];
}

export default function CatalogueHeader({ categories }: CatalogueHeaderProps) {
    // Filter out 'Other Products' to keep the list focused
    const displayCategories = categories.filter(c => c.name !== "Other Products");

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            // Offset for sticky header
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center text-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/60 z-10" /> {/* Dark Overlay */}
                    <Image
                        src="/images/home-hero.png"
                        alt="Agriculture Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content */}
                <div className="relative z-20 container-width px-4">
                    <h1 className="text-4xl md:text-6xl font-bold font-outfit text-white mb-4 tracking-tight shadow-xl">
                        Our Product Range
                    </h1>
                    <p className="text-emerald-100 text-lg md:text-xl font-light max-w-2xl mx-auto hidden md:block">
                        Direct-from-manufacturer inputs at wholesale prices. Verified authentic.
                    </p>
                </div>
            </div>

            {/* Category Infinite Marquee Section */}
            <div className="bg-zinc-50 dark:bg-zinc-950 py-16 border-b border-gray-100 dark:border-white/5 relative overflow-hidden">
                <div className="container-width mb-12 relative z-10 px-4">
                    {/* Overhauled Header Section: Left Aligned & Clean */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="max-w-2xl">
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-widest text-xs uppercase mb-2 block">
                                CATALOGUE
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white font-outfit mb-3 tracking-tight">
                                Browse Categories
                            </h2>
                            <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed">
                                Explore our comprehensive range of specialized agricultural inputs, designed for maximum yield and efficiency.
                            </p>
                        </div>

                        {/* Visual Hint */}
                        <div className="hidden md:block pb-2">
                            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                                Scroll to Explore <span className="animate-bounce">→</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Marquee Container */}
                <div className="relative w-full overflow-hidden group/marquee" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }} suppressHydrationWarning>
                    <div
                        className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused] py-4 pl-4"
                        style={{ width: "max-content" }}
                    >
                        {[...displayCategories, ...displayCategories].map((category, index) => {
                            const Icon = iconMap[category.icon] || Package;

                            return (
                                <a
                                    key={`${category.id}-${index}`}
                                    href={`#${category.id}`}
                                    onClick={(e) => scrollToSection(e, category.id)}
                                    // Compact Card Design: h-[180px], clean white bg, emerald accents on hover
                                    className="relative w-[280px] h-[160px] flex-shrink-0 bg-white dark:bg-zinc-900 rounded-xl p-5 flex items-center gap-5 border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-lg hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300 group/card cursor-pointer"
                                    suppressHydrationWarning
                                >
                                    {/* Icon Container */}
                                    <div className="h-14 w-14 flex-shrink-0 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover/card:scale-110 group-hover/card:bg-emerald-100 dark:group-hover/card:bg-emerald-800/30 transition-all duration-300">
                                        <Icon className="h-7 w-7" />
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex flex-col items-start">
                                        <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1 group-hover/card:text-emerald-700 dark:group-hover/card:text-emerald-400 transition-colors">
                                            {category.name}
                                        </h3>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 group-hover/card:text-emerald-600 dark:group-hover/card:text-emerald-400 transition-colors">
                                            View Products
                                        </span>
                                    </div>

                                    {/* Arrow Icon */}
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/card:opacity-100 transform -translate-x-2 group-hover/card:translate-x-0 transition-all duration-300 text-emerald-500">
                                        →
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* CSS Animation for Marquee */}
                <style jsx>{`
                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-marquee {
                        animation: marquee 60s linear infinite;
                    }
                `}</style>
            </div>
        </div>
    );
}
