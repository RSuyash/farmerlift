import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Container from '@/components/global/ui/Container';
import ResourceCard from '@/components/global/ui/ResourceCard';
import posts from '@/data/posts.json';

export const metadata: Metadata = {
  title: 'Agricultural Blog | FarmerLift',
  description: 'Expert tips and articles on modern farming, fertilizers, and crop yield optimization.',
};

export default function BlogListPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <Container>
        <div className="mb-8">
           <Link href="/resources" className="inline-flex items-center text-gray-500 hover:text-green-600 font-medium transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Resources
           </Link>
        </div>

        <div className="mb-12">
           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Farming Articles</h1>
           <p className="text-gray-600 max-w-2xl">
              Latest news and professional guidance for the modern Indian farmer.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {posts.map(post => (
              <ResourceCard key={post.id} type="blog" item={post} />
           ))}
        </div>
      </Container>
    </div>
  );
}
