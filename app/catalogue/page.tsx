import { getAllCategories, getAllProducts } from "@/lib/db";
import CatalogueNavigation from "@/components/modules/catalogue/CatalogueNavigation";
import CatalogueSection from "@/components/modules/catalogue/CatalogueSection";
import { Product } from "@/types/product";

export default async function CataloguePage() {
    const categories = await getAllCategories();
    const allProducts = await getAllProducts();

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <div className="bg-emerald-950 text-white py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
                <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl opacity-50" />

                <div className="container-width relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold font-outfit mb-6 tracking-tight">
                        Product <span className="text-emerald-400">Catalogue</span>
                    </h1>
                    <p className="text-emerald-200/80 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                        Explore our comprehensive range of specialized agricultural inputs. <br className="hidden md:block" />
                        Every product verified for quality and performance.
                    </p>
                </div>
            </div>

            {/* Layout */}
            <div className="container-width relative z-20 mt-12">
                <div className="flex flex-col lg:flex-row gap-12 items-start">

                    {/* Navigation Sidebar (Desktop) */}
                    <div className="w-full lg:w-64 flex-shrink-0">
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
