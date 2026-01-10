import { getCategoryById, getProductsByCategory, getAllCategories } from "@/lib/db";
import CatalogueNavigation from "@/components/modules/catalogue/CatalogueNavigation";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const categoryData = await getCategoryById(category);
    const products = await getProductsByCategory(category);
    const allCategories = await getAllCategories();

    if (!categoryData) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <div className="bg-emerald-950 text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />

                <div className="container-width relative z-10 flex flex-col items-start gap-6">
                    <Link href="/catalogue" className="flex items-center text-sm text-emerald-300 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Catalogue
                    </Link>
                    <div>
                        <h1 className="text-3xl md:text-5xl font-bold font-outfit mb-2 tracking-tight">
                            {categoryData.name}
                        </h1>
                        <p className="text-emerald-200/80 text-lg max-w-2xl">
                            {categoryData.description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container-width mt-12 relative z-20">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Sticky Sidebar Navigation */}
                    <div className="w-full lg:w-72 flex-shrink-0">
                        <CatalogueNavigation categories={allCategories} />
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 min-w-0">
                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"> {/* 2 Columns for better readability next to sidebar */}
                                {products.map((product) => (
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
                                                <h3 className="font-bold text-gray-900 dark:text-white leading-tight mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                                                    {product.name}
                                                </h3>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {product.netWeight}
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
                        ) : (
                            <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
                                <p className="text-gray-500 dark:text-gray-400 text-lg">No products available in this category yet.</p>
                                <p className="text-sm text-gray-400 mt-2">Check back soon for updates!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
