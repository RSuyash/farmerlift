import { getAllCategories } from "@/lib/db";
import { getAllProducts } from "@/lib/cms";
import CatalogueNavigation from "@/components/modules/catalogue/CatalogueNavigation";
import CatalogueSection from "@/components/modules/catalogue/CatalogueSection";
import CatalogueHeader from "@/components/modules/catalogue/CatalogueHeader";
import { Product } from "@/types/product";

export default async function CataloguePage() {
    const categories = await getAllCategories();
    const allProducts = await getAllProducts();

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header with Hero & Grid */}
            <CatalogueHeader categories={categories} />

            {/* Layout */}
            <div className="container-width relative z-20 mt-12">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Navigation Sidebar (Desktop) */}
                    <div className="w-full lg:w-72 flex-shrink-0">
                        <CatalogueNavigation categories={categories} />
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 min-w-0 space-y-16 pb-20">
                        {categories.map((category) => {
                            // Filter products for this category
                            const categoryProducts = allProducts.filter(p => p.category === category.id);

                            return (
                                <CatalogueSection
                                    key={category.id}
                                    category={category}
                                    products={categoryProducts}
                                />
                            );
                        })}

                        {categories.length === 0 && (
                            <div className="text-center py-20 bg-gray-50 dark:bg-zinc-900 rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
                                <p className="text-gray-500 dark:text-gray-400">Catalogue is being updated.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
