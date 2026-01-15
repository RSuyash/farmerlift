import { getAllCategories } from "@/lib/db";
import { getAllProducts } from "@/lib/cms";
import ProductBrowser from "@/components/modules/products/ProductBrowser";
import CatalogueHeader from "@/components/modules/catalogue/CatalogueHeader";

export default async function ProductsPage() {
  const products = await getAllProducts(); // Fetch dynamically from WP
  const categories = await getAllCategories();

  return (
    <div className="bg-background min-h-screen pb-20">
      <CatalogueHeader categories={categories} />

      <div className="container-width">
        <ProductBrowser initialProducts={products} />
      </div>
    </div>
  );
}
