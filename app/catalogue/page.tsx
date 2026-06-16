import { getAllCategories } from "@/lib/db";
import { getAllProducts } from "@/lib/cms";
import { searchProducts } from "@/lib/search";
import CatalogueNavigation from "@/components/modules/catalogue/CatalogueNavigation";
import CatalogueSection from "@/components/modules/catalogue/CatalogueSection";
import CatalogueHeader from "@/components/modules/catalogue/CatalogueHeader";
import CatalogueFilterHandler from "@/components/modules/catalogue/CatalogueFilterHandler";
import { Suspense } from "react";

export const revalidate = 300;

export default async function CataloguePage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const searchParams = await props.searchParams;
    const cropFilter = typeof searchParams.crop === 'string' ? searchParams.crop : undefined;

    const categories = await getAllCategories();
    const allProducts = await getAllProducts();

    // 1. Filter products if crop filter is present
    const filteredProducts = cropFilter
        ? searchProducts(allProducts, { cropTarget: [cropFilter] })
        : allProducts;

    // 2. Filter categories to only those that contain matching products
    // This prevents "0 products available" states.
    const activeCategories = cropFilter
        ? categories.filter(category => 
            filteredProducts.some(p => p.category === category.id)
          )
        : categories;

    // 3. Fallback: If filtering resulted in 0 total products, we might want to still show all categories
    // or just show an empty state. The requirement says: "Ensure products exist for the selected crop before applying filters. Prevent empty-state regressions"
    // So if filteredProducts.length is 0, we fallback to all products and all categories to prevent empty states.
    const finalProducts = cropFilter && filteredProducts.length === 0 ? allProducts : filteredProducts;
    const finalCategories = cropFilter && filteredProducts.length === 0 ? categories : activeCategories;

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header with Hero & Grid */}
            <CatalogueHeader categories={categories} />

            {/* Layout */}
            <div className="container-width relative z-20 mt-12">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Navigation Sidebar (Desktop) */}
                    <div className="w-full lg:w-72 flex-shrink-0">
                        <CatalogueNavigation categories={finalCategories} />
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 min-w-0 pb-20" id="catalogue-results">
                        <Suspense fallback={null}>
                            <CatalogueFilterHandler cropFilter={filteredProducts.length > 0 ? (cropFilter || null) : null} />
                        </Suspense>

                        <div className="space-y-16">
                            {finalCategories.map((category) => {
                                // Filter products for this category
                                const categoryProducts = finalProducts.filter(p => p.category === category.id);

                            return (
                                <CatalogueSection
                                    key={category.id}
                                    category={category}
                                    products={categoryProducts}
                                />
                            );
                        })}

                        {finalCategories.length === 0 && (
                            <div className="text-center py-20 bg-gray-50 dark:bg-zinc-900 rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
                                <p className="text-gray-500 dark:text-gray-400">No products match your current filters.</p>
                            </div>
                        )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
