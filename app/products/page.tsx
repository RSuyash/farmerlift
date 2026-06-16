import { Suspense } from "react";
import { getAllCategories } from "@/lib/db";
import { getAllProducts } from "@/lib/cms";
import ProductBrowser from "@/components/modules/products/ProductBrowser";
import CatalogueHeader from "@/components/modules/catalogue/CatalogueHeader";

export const revalidate = 300;

export default async function ProductsPage() {
  const products = await getAllProducts(); // Fetch dynamically from WP
  const categories = await getAllCategories();

  return (
    <div className="bg-background min-h-screen pb-20">
      <CatalogueHeader categories={categories} />

      <div className="container-width">
        <Suspense fallback={<div className="h-96 flex items-center justify-center animate-pulse text-zinc-500">Loading products...</div>}>
          <ProductBrowser initialProducts={products} />
        </Suspense>
      </div>
    </div>
  );
}
