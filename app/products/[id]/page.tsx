import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductById, getAllProducts } from "@/lib/cms";
import ProductDetailView from "@/components/modules/products/ProductDetailView";

export const revalidate = 300;

const SITE_URL = "https://farmerlift.in";

function textOnly(value: string | undefined) {
  return (value || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function metaDescription(product: Awaited<ReturnType<typeof getProductById>>) {
  if (!product) return "FarmerLift product details and agricultural input information.";
  const description = textOnly(product.description);
  return (description || `${product.name} from FarmerLift. View pack sizes, usage guidance, and enquiry options.`).slice(0, 160);
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found",
      robots: { index: false, follow: false },
    };
  }

  const description = metaDescription(product);
  const image = product.images[0] || "/images/farmerlift_icon_transparent.png";
  const url = `${SITE_URL}/products/${product.id}`;

  return {
    title: product.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${product.name} | FarmerLift`,
      description,
      url,
      type: "website",
      images: [{ url: image, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | FarmerLift`,
      description,
      images: [image],
    },
  };
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
    <>
      <h1 className="sr-only">{product.name}</h1>
      <ProductDetailView product={product} />
    </>
  );
}
