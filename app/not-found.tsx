import React from 'react';
import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import Container from '@/components/global/ui/Container';
import Button from '@/components/global/ui/Button';

export default function NotFound() {
  return (
    <div className="bg-gray-50 min-h-[70vh] flex items-center justify-center">
      <Container>
        <div className="text-center max-w-lg mx-auto">
          <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
             <Search className="h-12 w-12 text-green-600 opacity-50" />
          </div>
          <h1 className="text-6xl font-extrabold text-gray-900 mb-4 tracking-tighter">404</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Oops! This field is empty.</h2>
          <p className="text-gray-600 mb-10 text-lg">
             The page you are looking for might have been moved, renamed, or is temporarily unavailable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Button variant="primary" size="lg" href="/">
                <Home className="mr-2 h-5 w-5" />
                Return Home
             </Button>
             <Button variant="outline" size="lg" href="/products">
                Browse Catalogue
             </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
