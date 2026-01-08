import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../../global/ui/Container';
import Button from '../../global/ui/Button';
import { PlayCircle, Calendar, ArrowRight } from 'lucide-react';
import posts from '@/data/posts.json';
import videos from '@/data/videos.json';

const ResourcesPreview = () => {
  const latestPost = posts[0];
  const latestVideo = videos[0];

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-100">
      <Container>
        <div className="text-center mb-12">
          <span className="text-green-600 font-semibold tracking-wide uppercase text-sm">Knowledge Centre</span>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">Latest Tips & Insights</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Stay updated with modern farming techniques and success stories from our community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Latest Blog Post */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row h-full">
            <div className="md:w-2/5 bg-gray-200 min-h-[200px] relative">
               {/* Placeholder for Blog Image */}
               <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
                  Blog Image
               </div>
            </div>
            <div className="p-6 md:w-3/5 flex flex-col justify-center">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Calendar className="h-4 w-4 mr-1" />
                {latestPost.date}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                {latestPost.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {latestPost.excerpt}
              </p>
              <Link href={`/resources/blog`} className="text-green-600 font-medium hover:text-green-700 flex items-center mt-auto">
                Read Article <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Latest Video */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row h-full">
            <div className="md:w-2/5 bg-gray-900 min-h-[200px] relative group cursor-pointer">
               {/* Placeholder for Video Thumbnail */}
               <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="h-12 w-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
               </div>
            </div>
            <div className="p-6 md:w-3/5 flex flex-col justify-center">
              <div className="inline-block px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full mb-2 w-fit">
                VIDEO
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                {latestVideo.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {latestVideo.description}
              </p>
              <Link href={`/resources/videos`} className="text-green-600 font-medium hover:text-green-700 flex items-center mt-auto">
                Watch Now <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button href="/resources" variant="outline" size="lg">
            Visit Knowledge Centre
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default ResourcesPreview;
