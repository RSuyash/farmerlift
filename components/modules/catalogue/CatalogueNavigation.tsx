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

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function CatalogueNavigation({ categories }: CatalogueNavigationProps) {
    const pathname = usePathname();
    // Extract category ID from path: /catalogue/water-soluble-npk -> water-soluble-npk
    const activeId = pathname.split("/").pop();

    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm sticky top-24">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold font-outfit text-lg text-zinc-900 dark:text-white">Categories</h3>
            </div>

            <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Product Range</h3>
                <div className="space-y-1">
                    {categories.map((category) => {
                        const isActive = activeId === category.id;

                        return (
                            <Link
                                key={category.id}
                                href={`/catalogue/${category.id}`}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
                                )}
                            >
                                <span className={cn(
                                    "w-1.5 h-1.5 rounded-full transition-colors",
                                    isActive ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-700 group-hover:bg-zinc-400"
                                )} />
                                {category.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
