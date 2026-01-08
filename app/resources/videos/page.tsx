import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Play } from 'lucide-react';
import Container from '@/components/global/ui/Container';
import videos from '@/data/videos.json';

export const metadata: Metadata = {
   title: 'Video Gallery | FarmerLift tutorials',
   description: 'Watch step-by-step product guides and farmer testimonials.',
};

export default function VideoGalleryPage() {
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
               <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Video Demonstrations</h1>
               <p className="text-gray-600 max-w-2xl">
                  Learn visually with our curated collection of product tutorials and field results.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
               {videos.map(video => (
                  <div key={video.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
                     {/* Video Embed */}
                     <div className="aspect-video bg-black relative flex items-center justify-center">
                        <iframe
                           className="w-full h-full"
                           src={`https://www.youtube.com/embed/${video.youtubeId}`}
                           title={video.title}
                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                           allowFullScreen
                        />
                     </div>
                     <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{video.title}</h3>
                        <p className="text-gray-600">{video.description}</p>
                     </div>
                  </div>
               ))}
            </div>
         </Container>
      </div>
   );
}
