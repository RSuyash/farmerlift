import { notFound } from "next/navigation";
import { getProductById, getAllProducts } from "@/lib/cms";
import ProductDetailView from "@/components/modules/products/ProductDetailView";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    // ProductDetailView already handles the layout/container heavily
    // But passing just product is cleaner
    <ProductDetailView product={product} />
  );
}
