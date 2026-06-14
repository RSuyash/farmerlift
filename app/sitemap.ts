import type { MetadataRoute } from "next";
import { getAllCropGuides, getAllPosts, getAllProducts } from "@/lib/cms";
import { getAllCategories } from "@/lib/db";

export const revalidate = 3600;

const baseUrl = "https://farmerlift.in";

const staticPaths = [
  "",
  "/about",
  "/products",
  "/catalogue",
  "/crop-guides",
  "/blog",
  "/gallery",
  "/gallery/photos",
  "/gallery/videos",
  "/certifications",
  "/contact",
  "/register",
  "/dealer-enquiry",
  "/privacy",
  "/terms",
];

function entry(path: string, priority = 0.7, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly") {
  return {
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = staticPaths.map((path) =>
    entry(path, path === "" ? 1 : 0.8, path === "" ? "daily" : "weekly"),
  );

  const [categories, products, posts, cropGuides] = await Promise.allSettled([
    getAllCategories(),
    getAllProducts(),
    getAllPosts(),
    getAllCropGuides(),
  ]);

  if (categories.status === "fulfilled") {
    routes.push(...categories.value.map((category) => entry(`/catalogue/${category.id}`, 0.7)));
  }

  if (products.status === "fulfilled") {
    routes.push(...products.value.map((product) => entry(`/products/${product.id}`, 0.75)));
  }

  if (posts.status === "fulfilled") {
    routes.push(...posts.value.map((post) => entry(`/blog/${post.id}`, 0.65)));
  }

  if (cropGuides.status === "fulfilled") {
    routes.push(...cropGuides.value.map((guide) => entry(`/crop-guides/${guide.id}`, 0.7)));
  }

  return routes;
}
