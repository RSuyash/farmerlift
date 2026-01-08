"use client";

import React, { useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import ProductCard, { Product } from '../../global/ui/ProductCard';
import ProductFilters from './ProductFilters';
import Container from '../../global/ui/Container';
import Button from '../../global/ui/Button';

interface CatalogueProps {
  products: Product[];
}

const Catalogue: React.FC<CatalogueProps> = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory, products]);

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header & Search Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-30">
        <Container className="py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Product Catalogue</h1>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
               <div className="relative flex-grow md:w-80">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button 
                variant="outline" 
                className="md:hidden"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <Filter className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-32">
                <ProductFilters 
                  categories={categories} 
                  activeCategory={activeCategory} 
                  onSelectCategory={setActiveCategory} 
                />
             </div>
          </aside>

          {/* Mobile Filters Overlay */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden bg-black bg-opacity-50 flex justify-end">
              <div className="bg-white w-4/5 h-full p-6 overflow-y-auto">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold">Filters</h3>
                    <button onClick={() => setShowMobileFilters(false)}>
                      <X className="h-6 w-6 text-gray-500" />
                    </button>
                 </div>
                 <ProductFilters 
                    categories={categories} 
                    activeCategory={activeCategory} 
                    onSelectCategory={(cat) => {
                      setActiveCategory(cat);
                      setShowMobileFilters(false);
                    }} 
                  />
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-grow">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-12 text-center border border-dashed border-gray-300">
                 <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                    <Search className="h-12 w-12" />
                 </div>
                 <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                 <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                 <Button 
                    variant="outline" 
                    className="mt-6" 
                    onClick={() => {setSearchTerm(''); setActiveCategory('All');}}
                  >
                    Clear all filters
                 </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Catalogue;
