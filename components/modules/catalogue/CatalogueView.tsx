"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { ArrowRight, Tag } from "lucide-react";

interface CatalogueViewProps {
    products: Product[];
}

export default function CatalogueView({ products }: CatalogueViewProps) {
    // Group products by category
    const groupedProducts = products.reduce((acc, product) => {
        // Capitalize category name
        const category = (product.category || "Other").charAt(0).toUpperCase() + (product.category || "Other").slice(1) + "s";
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(product);
        return acc;
    }, {} as Record<string, Product[]>);

    const categories = Object.keys(groupedProducts).sort();

    return (
        <div className="space-y-20">
            {categories.map((category) => (
                <section key={category} id={category.toLowerCase()} className="scroll-mt-24">
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-3xl font-bold font-outfit text-emerald-950 dark:text-emerald-50 relative">
                            {category}
                            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-emerald-500 rounded-full" />
                        </h2>
                        <div className="h-px bg-gray-200 dark:bg-white/10 flex-grow" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groupedProducts[category].map((product) => (
                            <Link
                                href={`/products/${product.id}`}
                                key={product.id}
                                className="group flex bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden hover:shadow-lg hover:border-emerald-500/30 transition-all duration-300 h-48"
                            >
                                {/* Image Section */}
                                <div className="w-1/3 relative bg-gray-50 dark:bg-black/20 p-4">
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        fill
                                        className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>

                                {/* Content Section */}
                                <div className="w-2/3 p-5 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20">
                                                {product.brand}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-gray-900 dark:text-white leading-tight mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                            {product.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>
                                            <span className="font-bold text-lg text-emerald-700 dark:text-emerald-400">₹{product.price}</span>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            ))}

            {categories.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    No products found.
                </div>
            )}
        </div>
    );
}
