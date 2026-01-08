import React from 'react';
import Link from 'next/link';
import Container from '../../global/ui/Container';
import Button from '../../global/ui/Button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative bg-green-900 text-white overflow-hidden">
      {/* Background Pattern Overlay (Optional) */}
      <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')]"></div>

      <Container className="relative z-10 py-20 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Empowering Farmers with <span className="text-green-400">Quality Inputs</span> & Expert Knowledge
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
            FarmerLift connects you directly to high-yield seeds, fertilizers, and modern farming techniques. Join thousands of farmers growing better today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg" href="/products" className="bg-green-500 hover:bg-green-600 text-white border-transparent">
              Explore Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" href="/register" className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white">
              Join as Dealer
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroSection;
