import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Video, ArrowRight } from 'lucide-react';
import Container from '@/components/global/ui/Container';
import ResourceCard from '@/components/global/ui/ResourceCard';
import posts from '@/data/posts.json';
import videos from '@/data/videos.json';

export const metadata: Metadata = {
   title: 'Resources & Knowledge | FarmerLift',
   description: 'Access the latest agricultural tips, modern farming techniques, and expert video tutorials.',
};

export default function ResourcesPage() {
   return (
      <div className="bg-gray-50 min-h-screen py-12">
         <Container>
            {/* Header */}
            <div className="text-center mb-16">
               <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Knowledge Centre</h1>
               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Your daily destination for modern agricultural wisdom, product guides, and success stories.
               </p>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
               {/* Blog Category */}
               <Link href="/blog" className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors text-green-600">
                     <BookOpen className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Farming Blog</h2>
                  <p className="text-gray-600 mb-6">Deep dives into soil preparation, crop management, and organic certification.</p>
                  <span className="inline-flex items-center font-bold text-green-600 group-hover:translate-x-2 transition-transform">
                     Browse Articles <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
               </Link>

               {/* Video Category */}
               <Link href="/resources/videos" className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors text-red-600">
                     <Video className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Video Gallery</h2>
                  <p className="text-gray-600 mb-6">Watch product tutorials, field demonstrations, and farmer success stories.</p>
                  <span className="inline-flex items-center font-bold text-red-600 group-hover:translate-x-2 transition-transform">
                     Watch Videos <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
               </Link>
            </div>

            {/* Recent Section */}
            <div>
               <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Recently Added</h2>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {posts.slice(0, 2).map(post => (
                     <ResourceCard key={post.id} type="blog" item={post} />
                  ))}
                  {videos.slice(0, 2).map(video => (
                     <ResourceCard key={video.id} type="video" item={video} />
                  ))}
               </div>
            </div>
         </Container>
      </div>
   );
}
