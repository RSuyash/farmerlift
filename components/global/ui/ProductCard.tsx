import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import Button from './Button';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  benefits: string[];
  specs: any;
  featured?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
      {/* Image Placeholder */}
      <div className="relative h-48 bg-gray-100 w-full flex items-center justify-center">
        {/* In a real app, use Next.js Image with actual src */}
        <span className="text-gray-400">Image: {product.name}</span>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full w-fit mb-2">
          {product.category}
        </span>
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-gray-600 text-lg font-medium mb-4">{product.price}</p>
        
        <div className="mt-auto space-y-2">
          <Link href={`/products/${product.id}`} className="block w-full">
            <Button variant="outline" className="w-full justify-between group">
              View Details
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button variant="primary" className="w-full">
             <ShoppingCart className="h-4 w-4 mr-2" />
             Enquire Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
