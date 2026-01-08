import React from 'react';
import Link from 'next/link';
import Container from '../../global/ui/Container';
import ProductCard, { Product } from '../../global/ui/ProductCard';
import Button from '../../global/ui/Button';
import { ArrowRight } from 'lucide-react';
import allProducts from '@/data/products.json';

const FeaturedProducts = () => {
  // Filter only featured products and take top 4
  const featuredProducts: Product[] = (allProducts as Product[])
    .filter(p => p.featured)
    .slice(0, 4);

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div>
            <span className="text-green-600 font-semibold tracking-wide uppercase text-sm">Our Bestsellers</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Featured Products</h2>
          </div>
          <Link href="/products" className="hidden md:inline-block">
            <Button variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-50">
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" href="/products" className="w-full justify-center">
            View All Products
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;
