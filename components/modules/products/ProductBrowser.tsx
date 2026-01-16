"use client"

import { Product } from "@/types/product";
import { useState, useMemo } from "react";
import { searchProducts, SearchFilters, getFacets } from "@/lib/search";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, ArrowUpDown, X } from "lucide-react";

export default function ProductBrowser({ initialProducts }: { initialProducts: Product[] }) {
    const [filters, setFilters] = useState<SearchFilters>({});
    const [sortBy, setSortBy] = useState<string>("relevance");
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Derive filtered products
    const filteredProducts = useMemo(() => {
        let result = searchProducts(initialProducts, filters);

        // Sorting
        if (sortBy === "price_asc") {
            result.sort((a, b) => {
                const priceA = typeof a.price === 'string' ? parseFloat(a.price) || 0 : a.price;
                const priceB = typeof b.price === 'string' ? parseFloat(b.price) || 0 : b.price;
                return priceA - priceB;
            });
        } else if (sortBy === "price_desc") {
            result.sort((a, b) => {
                const priceA = typeof a.price === 'string' ? parseFloat(a.price) || 0 : a.price;
                const priceB = typeof b.price === 'string' ? parseFloat(b.price) || 0 : b.price;
                return priceB - priceA;
            });
        } else if (sortBy === "name_asc") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        }

        return result;
    }, [initialProducts, filters, sortBy]);

    const facets = useMemo(() => getFacets(initialProducts), [initialProducts]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, query: e.target.value }));
    };

    const clearFilters = () => setFilters({});

    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative animate-fade-in">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm sticky top-24">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold font-outfit text-lg text-zinc-900 dark:text-white">Filters</h3>
                        {Object.keys(filters).length > 0 && (
                            <button onClick={clearFilters} className="text-xs text-rose-500 hover:text-rose-600 hover:underline font-medium transition-colors">
                                Reset All
                            </button>
                        )}
                    </div>
                    <ProductFilters
                        filters={filters}
                        setFilters={setFilters}
                        facets={facets}
                    />
                </div>
            </aside>

            {/* Mobile Filter Drawer Overlay */}
            {showMobileFilters && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                        onClick={() => setShowMobileFilters(false)}
                    />
                    {/* Drawer */}
                    <div className="absolute inset-y-0 left-0 w-[85vw] max-w-sm bg-white dark:bg-zinc-900 shadow-xl p-6 overflow-y-auto transition-transform animate-in slide-in-from-left duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold font-outfit text-xl text-zinc-900 dark:text-white">Filters</h3>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowMobileFilters(false)}
                                className="h-8 w-8 rounded-full"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        <ProductFilters
                            filters={filters}
                            setFilters={setFilters}
                            facets={facets}
                        />
                        <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                            <Button onClick={clearFilters} variant="outline" className="w-full mb-3 h-12">Clear Filters</Button>
                            <Button onClick={() => setShowMobileFilters(false)} className="w-full bg-emerald-600 hover:bg-emerald-700 h-12">
                                Show {filteredProducts.length} Results
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 w-full min-w-0">
                {/* Mobile Filter & Search Bar */}
                <div className="lg:hidden flex gap-3 mb-6">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full h-12 rounded-full border border-emerald-100 bg-white shadow-sm pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                            onChange={handleSearchChange}
                        />
                    </div>

                    <Button
                        variant="outline"
                        onClick={() => setShowMobileFilters(true)}
                        className="h-12 w-12 rounded-full border-emerald-100 bg-white p-0 text-emerald-700 shadow-sm flex-shrink-0"
                    >
                        <SlidersHorizontal className="h-5 w-5" />
                    </Button>
                </div>

                {/* Desktop Top Bar */}
                <div className="hidden lg:flex justify-between items-center mb-8 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative w-full max-w-md group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by name, brand, or crop..."
                                className="w-full h-10 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-zinc-700 dark:text-zinc-200 placeholder:text-zinc-400"
                                onChange={handleSearchChange}
                            />
                        </div>
                        <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-2" />
                        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                            Showing <span className="text-emerald-600 dark:text-emerald-400 font-bold">{filteredProducts.length}</span> results
                        </span>
                    </div>

                    <div className="flex items-center gap-3 pl-4">
                        <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium whitespace-nowrap">Sort by:</span>
                        <div className="relative min-w-[180px]">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none w-full h-10 pl-4 pr-10 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-semibold text-zinc-700 dark:text-zinc-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                            >
                                <option value="relevance">Relevance</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                                <option value="name_asc">Name: A to Z</option>
                            </select>
                            <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-zinc-900 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
                        <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <Search className="h-8 w-8 text-emerald-300 dark:text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No products found</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 max-w-xs text-center mb-8">
                            We couldn't find any products matching your current filters. Try adjusting your search or categories.
                        </p>
                        <Button
                            variant="outline"
                            onClick={clearFilters}
                            className="rounded-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800 px-8"
                        >
                            Reset Navigation
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
