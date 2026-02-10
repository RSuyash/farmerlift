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
import { useRef, useState, useEffect } from "react";

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



    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    // Duplicate categories for infinite scroll effect
    const carouselItems = [...displayCategories, ...displayCategories];

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        let animationFrameId: number;

        const scrollStep = () => {
            if (!isPaused && scrollContainer) {
                // If we've scrolled past the first set of items, reset to start
                // We use a tolerance (5px) to ensure smooth reset
                if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                    scrollContainer.scrollLeft = 0;
                } else {
                    scrollContainer.scrollLeft += 1; // Adjust speed here (1 is gentle but visible)
                }
            }
            animationFrameId = requestAnimationFrame(scrollStep);
        };

        animationFrameId = requestAnimationFrame(scrollStep);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused]);

    const scroll = (direction: 'left' | 'right') => {
        setIsPaused(true);
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = 320; // Card width + gap

            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
        // Resume auto-scroll after interaction
        setTimeout(() => setIsPaused(false), 2000);
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

            {/* Category Carousel Section */}
            <div className="bg-zinc-50 dark:bg-zinc-950 py-12 border-b border-gray-100 dark:border-white/5 relative overflow-hidden">
                <div className="container-width mb-8 relative z-10 px-4">
                    {/* Header */}
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


                    </div>
                </div>

                {/* Carousel Container */}
                <div
                    className="container-width px-4"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {carouselItems.map((category, index) => {
                            const Icon = iconMap[category.icon] || Package;

                            // Using index as key suffix because items are duplicated
                            return (
                                <Link
                                    key={`${category.id}-${index}`}
                                    href={`/catalogue/${category.id}`}
                                    // Card
                                    className="relative w-[280px] h-[160px] flex-shrink-0 bg-white dark:bg-zinc-900 rounded-xl p-5 flex items-center gap-5 border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-lg hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300 group/card cursor-pointer"
                                >
                                    {/* Icon Container */}
                                    <div className="h-14 w-14 flex-shrink-0 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover/card:scale-110 group-hover/card:bg-emerald-100 dark:group-hover/card:bg-emerald-800/30 transition-all duration-300">
                                        <Icon className="h-7 w-7" />
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex flex-col items-start max-w-[160px]">
                                        <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1 group-hover/card:text-emerald-700 dark:group-hover/card:text-emerald-400 transition-colors line-clamp-2">
                                            {category.name}
                                        </h3>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 group-hover/card:text-emerald-600 dark:group-hover/card:text-emerald-400 transition-colors">
                                            View Products
                                        </span>
                                    </div>

                                    {/* Arrow Icon */}
                                    <div className="absolute right-4 top-4 opacity-0 group-hover/card:opacity-100 transform translate-x-2 group-hover/card:translate-x-0 transition-all duration-300 text-emerald-500">
                                        <span className="text-xl">↗</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Minimal Controls Under the Grid */}
                <div className="container-width px-4 mt-4 flex justify-center">
                    <div className="flex items-center gap-4 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-full p-1.5 shadow-sm">
                        <button
                            onClick={() => scroll('left')}
                            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-zinc-500 hover:text-emerald-600 transition-colors"
                            aria-label="Scroll Left"
                        >
                            ←
                        </button>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Scroll</span>
                        <button
                            onClick={() => scroll('right')}
                            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-zinc-500 hover:text-emerald-600 transition-colors"
                            aria-label="Scroll Right"
                        >
                            →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
