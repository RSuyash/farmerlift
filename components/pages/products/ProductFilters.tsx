import React from 'react';
import { Check } from 'lucide-react';

interface ProductFiltersProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
      <div className="flex flex-col space-y-2">
        <button
          onClick={() => onSelectCategory('All')}
          className={`flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeCategory === 'All'
              ? 'bg-green-100 text-green-700'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <span>All Products</span>
          {activeCategory === 'All' && <Check className="h-4 w-4" />}
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === category
                ? 'bg-green-100 text-green-700'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span>{category}</span>
            {activeCategory === category && <Check className="h-4 w-4" />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductFilters;
