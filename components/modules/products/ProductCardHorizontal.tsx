"use client";

import { Product } from "@/types/product";
import Link from "next/link";
import { ArrowRight, Sprout } from "lucide-react";
import ProductImage from "@/components/ui/ProductImage";
import { motion } from "framer-motion";

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
};

/**
 * Extracts crop names from product data.
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

interface ProductCardHorizontalProps {
    product: Product;
    /** Show SKU badge on image (used in CatalogueSection) */
    showSku?: boolean;
}

export default function ProductCardHorizontal({ product, showSku = false }: ProductCardHorizontalProps) {
    const crops = getCropNames(product);
    const visibleCrops = crops.slice(0, 3);
    const overflowCount = crops.length - 3;

    return (
        <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}>
            <Link
                href={`/products/${product.id}`}
                className="group flex flex-col sm:flex-row bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden hover:shadow-xl hover:border-emerald-500/20 dark:hover:border-emerald-500/20 transition-all duration-300 h-auto sm:h-56 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                aria-label={`View ${product.name} by ${product.brand}`}
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
                    {showSku && (
                        <div className="absolute top-3 left-3" suppressHydrationWarning>
                            <span className="text-[10px] font-bold font-mono text-gray-400 bg-white/80 dark:bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md border border-gray-100 dark:border-white/10">
                                {product.sku}
                            </span>
                        </div>
                    )}
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
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight mb-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                            {product.name}
                        </h3>

                        {/* Short Description */}
                        {product.description && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-2 line-clamp-2">
                                {product.description}
                            </p>
                        )}

                        {/* Crop Chips */}
                        {visibleCrops.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5 mb-2">
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
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50 dark:border-white/5" suppressHydrationWarning>
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

                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            View Details <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
