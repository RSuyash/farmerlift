import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import ProductImage from "@/components/ui/ProductImage";

export default function ProductCard({ product }: { product: Product }) {
    // Determine discount if price is a number
    let discount = 0;
    if (typeof product.price === 'number' && product.mrp > 0) {
        discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
    }

    return (
        <Link href={`/products/${product.id}`} className="group block h-full">
            <div
                className="relative bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:border-emerald-500/30 hover:-translate-y-1"
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
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-sm">
                            {product.category}
                        </span>
                        <div className="flex gap-0.5" suppressHydrationWarning>
                            {/* Placeholder for ratings if we had them */}
                        </div>
                    </div>

                    <h3 className="font-bold text-zinc-800 dark:text-zinc-100 text-base leading-snug mb-1 line-clamp-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3 font-medium">
                        {product.brand}
                    </p>

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
                                ) : (
                                    <span className="font-bold text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md uppercase tracking-wide">
                                        {product.price}
                                    </span>
                                )}
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300"
                        >
                            <ArrowRight className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
