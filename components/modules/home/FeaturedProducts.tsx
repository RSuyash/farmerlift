import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllProducts } from "@/lib/cms";
import ProductCard from "../products/ProductCard";

export default async function FeaturedProducts() {
    const allProducts = await getAllProducts();
    const featuredProducts = allProducts.slice(0, 4);

    if (featuredProducts.length === 0) return null;

    return (
        <section className="py-24 bg-white dark:bg-black/20 border-b border-emerald-100 dark:border-white/5">
            <div className="container-width">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                            <span className="h-px w-8 bg-emerald-500 hidden md:block" />
                            <span className="text-emerald-700 dark:text-emerald-300 font-bold uppercase tracking-widest text-xs">Season Essentials</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold font-outfit text-emerald-950 dark:text-white tracking-tight mb-4">
                            Featured <span className="text-emerald-700 dark:text-emerald-300">Products</span>
                        </h2>
                        <p className="text-base text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
                            A curated selection of industrial-grade inputs, trusted by India's top farmers for maximum yield and protection.
                        </p>
                    </div>

                    <Link href="/catalogue" className="hidden md:block">
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
                    <Link href="/catalogue">
                        <Button variant="outline" className="w-full rounded-full border-emerald-200 text-emerald-900">
                            View All Catalogue <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
