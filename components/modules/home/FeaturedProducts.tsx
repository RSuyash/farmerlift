import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getRelatedProducts } from "@/lib/db"; // Use DB util
import ProductCard from "../products/ProductCard";

export default async function FeaturedProducts() {
    const { getAllProducts } = await import("@/lib/db");
    const allProducts = await getAllProducts();

    const featuredIds = [
        "coromandel-urea",
        "pioneer-maize-p3302",
        "fmc-coragen",
        "jain-drip-kit"
    ];

    // Get specific products or fallback to first 4
    const featuredProducts = featuredIds
        .map(id => allProducts.find(p => p.id === id))
        .filter(Boolean) as any[]; // Type assertion for safety

    // Fallback if specific IDs are missing (though we verified them)
    if (featuredProducts.length < 4) {
        const remaining = allProducts.filter(p => !featuredIds.includes(p.id)).slice(0, 4 - featuredProducts.length);
        featuredProducts.push(...remaining);
    }

    return (
        <section className="py-24 bg-white dark:bg-black/20 border-b border-emerald-100 dark:border-white/5">
            <div className="container-width">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                            <span className="h-px w-8 bg-emerald-500 hidden md:block" />
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest text-xs">Season Essentials</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold font-outfit text-emerald-950 dark:text-white tracking-tight mb-4">
                            Featured <span className="text-emerald-600 dark:text-emerald-500">Products</span>
                        </h2>
                        <p className="text-base text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
                            A curated selection of industrial-grade inputs, trusted by India's top farmers for maximum yield and protection.
                        </p>
                    </div>

                    <Link href="/products" className="hidden md:block">
                        <Button
                            className="bg-emerald-900/5 hover:bg-emerald-900/10 text-emerald-900 dark:text-emerald-100 dark:bg-white/10 dark:hover:bg-white/20 border-0 rounded-full px-6 font-semibold transition-all">
                            View Full Catalogue <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map((product) => (
                        <div key={product.id} className="animate-fade-in">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex justify-center md:hidden">
                    <Link href="/products">
                        <Button variant="outline" className="w-full rounded-full border-emerald-200 text-emerald-900">
                            View All Catalogue <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
