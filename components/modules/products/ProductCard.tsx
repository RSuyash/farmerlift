"use client";

import { Product } from "@/types/product";
import Link from "next/link";
import { ArrowRight, Sprout, Check } from "lucide-react";
import ProductImage from "@/components/ui/ProductImage";
import { motion } from "framer-motion";

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.45,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
};

/**
 * Extracts crop names from product data.
 * Prefers recommendedCrops[].name; falls back to comma-splitting targetCropsDescription.
 */
function getCropNames(product: Product): string[] {
    if (product.recommendedCrops && product.recommendedCrops.length > 0) {
        return product.recommendedCrops.map((c) => c.name);
    }
    if (product.targetCropsDescription) {
        return product.targetCropsDescription
            .split(/[,،]+/)
            .map((s) => s.trim())
            .filter(Boolean);
    }
    return [];
}

export default function ProductCard({ product }: { product: Product }) {
    // Determine discount if price is a number
    let discount = 0;
    if (typeof product.price === 'number' && product.mrp > 0) {
        discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
    }

    const crops = getCropNames(product);
    const visibleCrops = crops.slice(0, 3);
    const overflowCount = crops.length - 3;
    const firstBenefit = product.features?.[0] ?? null;

    return (
        <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}>
            <Link
                href={`/products/${product.id}`}
                className="group block h-full"
                aria-label={`View ${product.name} by ${product.brand}`}
            >
                <div
                    className="relative bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:border-emerald-500/30 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2"
                    suppressHydrationWarning
                >

                    {/* Image Section */}
                    <div
                        className="relative aspect-square w-full bg-zinc-50 dark:bg-zinc-950 rounded-xl mb-4 overflow-hidden flex items-center justify-center p-4"
                        suppressHydrationWarning
                    >
                        <div
                            className="absolute top-2 left-2 z-10 flex flex-col gap-1.5"
                            suppressHydrationWarning
                        >
                            {discount > 0 && (
                                <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm tracking-wide">
                                    {discount}% OFF
                                </span>
                            )}
                            {/* Dynamic Badges if needed */}
                            {(product as any).isOrganic && (
                                <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm tracking-wide">
                                    ORGANIC
                                </span>
                            )}
                        </div>

                        <ProductImage
                            src={product.images[0]}
                            alt={product.name}
                            productName={product.name}
                            category={product.category}
                            width={300}
                            height={300}
                            className="object-contain w-full h-full transform transition-transform duration-500 group-hover:scale-110 will-change-transform"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-grow">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-sm">
                                {product.category}
                            </span>
                            <div className="flex gap-0.5" suppressHydrationWarning>
                                {/* Placeholder for ratings if we had them */}
                            </div>
                        </div>

                        <h3 className="font-bold text-zinc-800 dark:text-zinc-100 text-base leading-snug mb-1 line-clamp-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                            {product.name}
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 font-medium">
                            {product.brand}
                        </p>

                        {/* Short Description */}
                        {product.description && (
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3 line-clamp-2">
                                {product.description}
                            </p>
                        )}

                        {/* Suitable Crops */}
                        {visibleCrops.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5 mb-3">
                                {visibleCrops.map((crop, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-800/40"
                                    >
                                        <Sprout className="w-2.5 h-2.5 flex-shrink-0" />
                                        {crop}
                                    </span>
                                ))}
                                {overflowCount > 0 && (
                                    <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">
                                        +{overflowCount} more
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Key Benefit Tag */}
                        {firstBenefit && (
                            <div className="mb-3">
                                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full border border-amber-100 dark:border-amber-800/40">
                                    <Check className="w-2.5 h-2.5 flex-shrink-0" />
                                    <span className="line-clamp-1">{firstBenefit}</span>
                                </span>
                            </div>
                        )}

                        {/* Price & CTA */}
                        <div className="mt-auto flex items-end justify-between border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <div className="flex flex-col">
                                {typeof product.price === 'number' && product.mrp > product.price && (
                                    <span className="text-xs text-zinc-400 line-through font-medium">₹{product.mrp}</span>
                                )}
                                <div className="flex items-baseline gap-0.5">
                                    {typeof product.price === 'number' ? (
                                        <>
                                            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">₹</span>
                                            <span className="font-bold text-xl text-zinc-900 dark:text-white font-outfit">{product.price}</span>
                                        </>
                                    ) : null}
                                </div>
                            </div>

                            <span
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded-full transition-all duration-300 group-hover:bg-emerald-700 group-hover:text-white dark:group-hover:bg-emerald-600"
                            >
                                Explore
                                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
