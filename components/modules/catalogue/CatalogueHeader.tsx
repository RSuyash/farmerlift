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

            {/* Category Grid Section */}
            <div className="bg-white dark:bg-zinc-950 py-12 md:py-16 border-b border-gray-100 dark:border-white/5">
                <div className="container-width">
                    <div className="text-center mb-10">
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold tracking-widest text-xs uppercase mb-2 block">
                            Browse by Category
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                            Explore Collections
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                        {categories.slice(0, 9).map((category) => {
                            const Icon = iconMap[category.icon] || Package;
                            return (
                                <Link
                                    key={category.id}
                                    href={`/catalogue/${category.id}`}
                                    className="group flex flex-col items-center p-6 bg-gray-50 dark:bg-white/5 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-900/10 border border-transparent hover:border-emerald-200 dark:hover:border-emerald-500/20 transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <div className="h-12 w-12 rounded-full bg-white dark:bg-white/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 group-hover:scale-110 transition-transform shadow-sm group-hover:shadow-md">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white text-center mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                                        {category.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100">
                                        {category.description}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
