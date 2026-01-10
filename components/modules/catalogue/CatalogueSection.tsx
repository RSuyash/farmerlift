"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { ArrowRight, ChevronRight, ExternalLink } from "lucide-react";
import { useInView } from "react-intersection-observer";
import ProductImage from "@/components/ui/ProductImage";

interface Category {
    id: string;
    name: string;
    description: string;
    icon: string;
}

interface CatalogueSectionProps {
    category: Category;
    products: Product[];
}

export default function CatalogueSection({ category, products }: CatalogueSectionProps) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: "200px 0px", // Start loading 200px before the element comes into view
    });

    return (
        <section
            id={category.id}
            ref={ref}
            className="scroll-mt-28 py-8 border-b border-gray-100 dark:border-white/5 last:border-0 relative"
            suppressHydrationWarning
        >
            <div className="absolute top-8 right-0 text-[10rem] font-bold text-gray-50 dark:text-white/[0.02] -z-10 leading-none pointer-events-none opacity-50 select-none hidden xl:block" suppressHydrationWarning>
                {category.name.split(" ")[0]}
            </div>

            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8" suppressHydrationWarning>
                <div>
                    <h2 className="text-3xl font-bold font-outfit text-emerald-950 dark:text-emerald-50 mb-2">
                        {category.name}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xl text-lg">
                        {category.description}
                    </p>
                </div>
                <Link
                    href={`/catalogue/${category.id}`}
                    className="flex items-center text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 hover:underline decoration-2 underline-offset-4 transition-all"
                >
                    View Category Page <ExternalLink className="w-3 h-3 ml-1.5" />
                </Link>
            </div>

            {/* Products Grid - Lazy Loaded */}
            {inView ? (
                products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in" suppressHydrationWarning>
                        {products.map((product) => (
                            <Link
                                href={`/products/${product.id}`}
                                key={product.id}
                                className="group flex flex-col sm:flex-row bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden hover:shadow-xl hover:border-emerald-500/20 dark:hover:border-emerald-500/20 transition-all duration-300 h-auto sm:h-52"
                                suppressHydrationWarning
                            >
                                {/* Image Section */}
                                <div className="w-full sm:w-2/5 relative bg-gray-50 dark:bg-black/20 p-6 min-h-[160px] sm:min-h-0" suppressHydrationWarning>
                                    <ProductImage
                                        src={product.images[0]}
                                        alt={product.name}
                                        productName={product.name}
                                        category={product.category}
                                        fill
                                        className="object-contain p-2 group-hover:scale-110 transition-transform duration-500 mix-blend-multiply dark:mix-blend-normal"
                                    />
                                    <div className="absolute top-3 left-3" suppressHydrationWarning>
                                        <span className="text-[10px] font-bold font-mono text-gray-400 bg-white/80 dark:bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md border border-gray-100 dark:border-white/10">
                                            {product.sku}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="w-full sm:w-3/5 p-5 flex flex-col justify-between" suppressHydrationWarning>
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="h-0.5 w-4 bg-emerald-500 rounded-full" />
                                            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
                                                {product.brand}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                            {product.name}
                                        </h3>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {(product.features || []).slice(0, 2).map((feature, i) => (
                                                <span key={i} className="text-[10px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded-md">
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 dark:border-white/5" suppressHydrationWarning>
                                        <div className="flex flex-col">
                                            {typeof product.price === 'number' && product.mrp > product.price && (
                                                <span className="text-[10px] text-gray-400 line-through">MRP: ₹{product.mrp}</span>
                                            )}
                                            <div className="flex items-baseline gap-1" suppressHydrationWarning>
                                                {typeof product.price === 'number' ? (
                                                    <>
                                                        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">₹</span>
                                                        <span className="font-bold text-xl text-emerald-700 dark:text-emerald-400">{product.price}</span>
                                                    </>
                                                ) : (
                                                    <span className="font-bold text-base text-emerald-700 dark:text-emerald-400 leading-tight">
                                                        {product.price}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                            Buy Now <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-8 text-center border border-dashed border-gray-200 dark:border-white/10" suppressHydrationWarning>
                        <p className="text-gray-500 dark:text-gray-400">No products available currently.</p>
                    </div>
                )
            ) : (
                // Skeleton/Placeholder state when out of view
                <div className="min-h-[300px] w-full" aria-hidden="true" />
            )}
        </section>
    );
}
