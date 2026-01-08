import { getAllProducts } from "@/lib/db";
import ProductBrowser from "@/components/modules/products/ProductBrowser";

export default async function ProductsPage() {
  const products = await getAllProducts(); // Server-side data fetching

  return (
    <div className="bg-background min-h-screen pb-20">

      <div className="bg-emerald-950 py-16 text-center text-white mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="container-width relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold font-outfit mb-4">Industrial Marketplace</h1>
          <p className="text-emerald-100/70 max-w-2xl mx-auto text-lg font-light">
            Direct-from-manufacturer inputs at wholesale prices. <br className="hidden md:block" />
            Verified authentic. Delivered to your farm.
          </p>
        </div>
      </div>

      <div className="container-width">
        <ProductBrowser initialProducts={products} />
      </div>
    </div>
  );
}
