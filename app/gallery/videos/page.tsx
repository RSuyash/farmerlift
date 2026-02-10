import Container from '@/components/global/ui/Container';
import { getVideoGallery } from '@/lib/cms';
import { PlayCircle, Video, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
    title: 'Video Gallery | FarmerLift',
    description: 'Expert talks, tutorials, and success stories from the field.',
};

export default async function VideoGalleryPage() {
    const videos = await getVideoGallery();

    return (
        <div className="bg-gray-50 dark:bg-black min-h-screen py-16">
            <Container>
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-red-100 dark:bg-red-900/30 rounded-full mb-6 text-red-600 dark:text-red-400">
                        <Video className="h-6 w-6" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-foreground mb-4">Video Gallery</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Watch and learn. Comprehensive guides and real-world results from FarmerLift experts.
                    </p>
                </div>

                {/* Video Grid */}
                {videos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {videos.map((video: any) => (
                            <Link
                                key={video.id}
                                href={video.videoUrl}
                                target="_blank"
                                className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 dark:border-white/10 transition-all duration-300 hover:-translate-y-1 block h-full flex flex-col"
                            >
                                <div className="aspect-video relative bg-black">
                                    <Image
                                        src={video.thumbnail}
                                        alt={video.title}
                                        fill
                                        className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <PlayCircle className="h-10 w-10 text-white fill-white/20" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded">
                                        WATCH NOW
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                        <Calendar className="h-3.5 w-3.5" />
                                        {video.date ? new Date(video.date).toLocaleDateString() : 'Recent'}
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                                        {video.title}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-white/5 rounded-3xl border border-dashed border-gray-300 dark:border-white/10">
                        <Video className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-bold text-foreground">No Videos Yet</h3>
                        <p className="text-muted-foreground mt-2">Check back soon for updates!</p>
                    </div>
                )}
            </Container>
        </div>
    );
}
