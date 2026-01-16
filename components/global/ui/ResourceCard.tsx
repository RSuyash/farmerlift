import React from 'react';
import Link from 'next/link';
import { Calendar, PlayCircle, ArrowRight } from 'lucide-react';
import Button from './Button';

interface ResourceCardProps {
  type: 'blog' | 'video';
  item: any;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ type, item }) => {
  const isBlog = type === 'blog';

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      {/* Media Placeholder */}
      <div className={`aspect-video relative ${isBlog ? 'bg-gray-100' : 'bg-gray-900'} flex items-center justify-center overflow-hidden`}>
        {(item.image || item.thumbnail) ? (
          <img
            src={item.image || item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          isBlog ? (
            <span className="text-gray-400 text-xs">Blog Thumbnail</span>
          ) : (
            <PlayCircle className="h-12 w-12 text-white opacity-80" />
          )
        )}
        {!isBlog && (item.image || item.thumbnail) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
            <PlayCircle className="h-12 w-12 text-white opacity-90" />
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${isBlog ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
            {type}
          </span>
          {isBlog && (
            <div className="flex items-center text-xs text-gray-400">
              <Calendar className="h-3 w-3 mr-1" />
              {item.date}
            </div>
          )}
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {isBlog ? item.excerpt : item.description}
        </p>

        <div className="mt-auto">
          <Link href={isBlog ? `/blog/${item.id}` : `/resources/videos`} className="block">
            <Button variant="ghost" className="w-full justify-between text-green-600 hover:bg-green-50 p-0 h-auto">
              {isBlog ? 'Read Full Article' : 'Watch Video'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
