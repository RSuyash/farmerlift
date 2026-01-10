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

// Map icon strings to lucide components
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

export default function CatalogueNavigation({ categories }: CatalogueNavigationProps) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-20% 0px -60% 0px" } // Trigger when element is near top
        );

        categories.forEach((category) => {
            const element = document.getElementById(category.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [categories]);

    const scrollToCategory = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            // Offset for fixed header
            const y = element.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <div className="sticky top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto hidden lg:block py-2 pr-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 px-4">
                Categories
            </h3>
            <div className="flex flex-col gap-1 relative border-l border-gray-200 dark:border-white/10 ml-2">
                {categories.map((category) => {
                    const isActive = activeId === category.id;

                    return (
                        <button
                            key={category.id}
                            onClick={() => scrollToCategory(category.id)}
                            className={cn(
                                "flex items-center justify-between pl-4 py-2 text-sm font-medium transition-all duration-300 w-full text-left relative",
                                isActive
                                    ? "text-emerald-600 dark:text-emerald-400 font-bold"
                                    : "text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                            )}
                        >
                            {/* Active Indicator Line */}
                            {isActive && (
                                <span className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-emerald-600 dark:bg-emerald-400 transition-all" />
                            )}

                            <span>{category.name}</span>

                            {/* Count or minimal chevron could go here if needed, but keeping it minimal */}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
