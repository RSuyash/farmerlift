"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
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

// Map icon strings to lucide components.
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
    icon: string;
}

interface CatalogueNavigationProps {
    categories: Category[];
}

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function CatalogueNavigation({ categories }: CatalogueNavigationProps) {
    const pathname = usePathname();
    const [activeId, setActiveId] = useState<string>("");

    // Check if we are on the main catalogue page (unified view)
    const isMainCatalogue = pathname === "/catalogue";

    // Initialize Active ID from URL if on category page
    useEffect(() => {
        if (!isMainCatalogue) {
            const id = pathname.split("/").pop();
            if (id) setActiveId(id);
        }
    }, [pathname, isMainCatalogue]);

    // Scroll Spy Logic for Main Catalogue Page
    useEffect(() => {
        if (!isMainCatalogue) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-20% 0px -60% 0px" } // Activate when section is near top
        );

        categories.forEach((cat) => {
            const element = document.getElementById(cat.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [isMainCatalogue, categories]);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        if (isMainCatalogue) {
            e.preventDefault();
            const element = document.getElementById(id);
            if (element) {
                const offset = 80; // Navbar height
                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: "smooth"
                });
                setActiveId(id);
            }
        }
    };

    return (
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm sticky top-24">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold font-outfit text-lg text-zinc-900 dark:text-white flex items-center gap-2">
                    <span className="w-1 h-6 bg-emerald-500 rounded-full inline-block" />
                    Categories
                </h3>
            </div>

            <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 pl-2">Product Range</h3>
                <div className="flex flex-col gap-1 relative" suppressHydrationWarning>
                    {categories.map((category) => {
                        const isActive = activeId === category.id;

                        // Dynamic link: anchor ID for main page, full path for sub-pages
                        const href = isMainCatalogue ? `#${category.id}` : `/catalogue/${category.id}`;

                        return (
                            <Link
                                key={category.id}
                                href={href}
                                onClick={(e) => handleScroll(e, category.id)}
                                className={cn(
                                    "relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 z-10 group",
                                    isActive
                                        ? "text-emerald-700 dark:text-emerald-300 font-bold"
                                        : "text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-300"
                                )}
                                suppressHydrationWarning
                            >
                                {/* Active Indicator (Background Pill) */}
                                {isActive && (
                                    <div
                                        className="absolute inset-0 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl -z-10 animate-fade-in border border-emerald-100 dark:border-emerald-500/20"
                                        style={{ transition: 'all 0.3s ease-in-out' }}
                                        suppressHydrationWarning
                                    />
                                )}

                                {/* Hover Effect (Subtle Background) */}
                                <div
                                    className="absolute inset-0 rounded-xl bg-zinc-50 dark:bg-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-20"
                                    suppressHydrationWarning
                                />

                                <span className={cn(
                                    "w-2 h-2 rounded-full transition-all duration-300",
                                    isActive
                                        ? "bg-emerald-500 scale-125 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                                        : "bg-zinc-300 dark:bg-zinc-700 group-hover:bg-emerald-300"
                                )} />

                                {category.name}

                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
