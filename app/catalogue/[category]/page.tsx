import { getCategoryById, getAllCategories } from "@/lib/db";
import { getProductsByCategory } from "@/lib/cms";
import CatalogueNavigation from "@/components/modules/catalogue/CatalogueNavigation";
import ProductCardHorizontal from "@/components/modules/products/ProductCardHorizontal";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

export const revalidate = 300;

export async function generateStaticParams() {
    const categories = await getAllCategories();
    return categories.map((category) => ({
        category: category.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
    const { category } = await params;
    const categoryData = await getCategoryById(category);

    if (!categoryData) {
        return {
            title: "Catalogue Category Not Found",
            robots: { index: false, follow: false },
        };
    }

    const url = `https://farmerlift.in/catalogue/${categoryData.id}`;

    return {
        title: `${categoryData.name} | FarmerLift Catalogue`,
        description: categoryData.description,
        alternates: { canonical: url },
        openGraph: {
            title: `${categoryData.name} | FarmerLift Catalogue`,
            description: categoryData.description,
            url,
            type: "website",
        },
    };
}

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
                                    <ProductCardHorizontal
                                        key={product.id}
                                        product={product}
                                    />
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
