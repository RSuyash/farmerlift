"use client";

import Link from "next/link";
import { Product } from "@/types/product";
import { ExternalLink } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import ProductCardHorizontal from "@/components/modules/products/ProductCardHorizontal";

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

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

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
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        suppressHydrationWarning
                    >
                        {products.map((product) => (
                            <ProductCardHorizontal
                                key={product.id}
                                product={product}
                                showSku
                            />
                        ))}
                    </motion.div>
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
