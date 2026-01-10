"use client"

import { Button } from "@/components/ui/button";
import { SearchFilters } from "@/lib/search";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ProductFiltersProps {
    filters: SearchFilters;
    setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
    facets: {
        brands: string[];
        categories: string[];
        crops: string[];
    };
}

export default function ProductFilters({ filters, setFilters, facets }: ProductFiltersProps) {

    const toggleFilter = (key: keyof SearchFilters, value: any) => {
        setFilters((prev) => {
            const current = (prev[key] as any[]) || [];
            const isSelected = current.includes(value);
            const updated = isSelected
                ? current.filter(item => item !== value)
                : [...current, value];

            return { ...prev, [key]: updated };
        });
    };

    const isSelected = (key: keyof SearchFilters, value: any) => {
        return (filters[key] as any[])?.includes(value);
    }

    return (
        <div className="space-y-8">
            {/* Categories */}
            <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Category</h3>
                <div className="space-y-2">
                    {facets.categories.map((cat) => (
                        <div key={cat} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id={`cat-${cat}`}
                                checked={isSelected('category', cat)}
                                onChange={() => toggleFilter('category', cat)}
                                className="accent-primary h-4 w-4"
                            />
                            <label htmlFor={`cat-${cat}`} className="text-sm capitalize cursor-pointer select-none">
                                {cat.replace('_', ' ')}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Brands */}
            <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Brand</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {facets.brands.map((brand, index) => (
                        <div key={`${brand}-${index}`} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id={`brand-${brand}`}
                                checked={isSelected('brands', brand)}
                                onChange={() => toggleFilter('brands', brand)}
                                className="accent-primary h-4 w-4"
                            />
                            <label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer select-none text-muted-foreground hover:text-foreground">
                                {brand}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Crop Targets */}
            <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Suitable For</h3>
                <div className="flex flex-wrap gap-2">
                    {facets.crops.slice(0, 15).map((crop) => (
                        <button
                            key={crop}
                            onClick={() => toggleFilter('cropTarget', crop)}
                            className={cn(
                                "text-xs px-2.5 py-1 rounded-full border transition-all",
                                isSelected('cropTarget', crop)
                                    ? "bg-primary text-white border-primary"
                                    : "bg-background border-border hover:border-primary/50 text-muted-foreground"
                            )}
                        >
                            {crop}
                        </button>
                    ))}
                </div>
            </div>

            <Button
                variant="outline"
                className="w-full text-xs h-8 mt-4"
                onClick={() => setFilters({})}
            >
                Reset Filters
            </Button>
        </div>
    );
}
