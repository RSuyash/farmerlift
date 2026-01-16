import Link from 'next/link';
import { Camera, Video, ArrowRight } from 'lucide-react';
import Container from '@/components/global/ui/Container';

export const metadata = {
    title: 'FarmerLift Media Gallery | Photos & Videos',
    description: 'Explore our collection of agricultural success stories, product demonstrations, and field activities.',
};

export default function GalleryPage() {
    return (
        <div className="bg-gray-50 dark:bg-black min-h-screen py-16">
            <Container>
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-foreground mb-4">Media Gallery</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Visualizing the future of agriculture. Browse our extensive collection of field photos and expert video guides.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                    {/* Photo Gallery */}
                    <Link href="/gallery/photos" className="group relative bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 dark:border-white/10 transition-all duration-300">
                        <div className="aspect-[16/9] w-full bg-emerald-100/50 dark:bg-emerald-900/20 flex items-center justify-center p-8">
                            <Camera className="h-24 w-24 text-emerald-600 dark:text-emerald-400 opacity-80 group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="p-8 text-center relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-600 text-white p-4 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <Camera className="h-6 w-6" />
                            </div>
                            <h2 className="text-3xl font-bold text-foreground mb-3 mt-4">Photo Gallery</h2>
                            <p className="text-muted-foreground mb-6">High-quality images of crop results, events, and product applications.</p>
                            <span className="inline-flex items-center font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                                View Photos <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </div>
                    </Link>

                    {/* Video Gallery */}
                    <Link href="/gallery/videos" className="group relative bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 dark:border-white/10 transition-all duration-300">
                        <div className="aspect-[16/9] w-full bg-red-100/50 dark:bg-red-900/20 flex items-center justify-center p-8">
                            <Video className="h-24 w-24 text-red-600 dark:text-red-400 opacity-80 group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="p-8 text-center relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white p-4 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <Video className="h-6 w-6" />
                            </div>
                            <h2 className="text-3xl font-bold text-foreground mb-3 mt-4">Video Gallery</h2>
                            <p className="text-muted-foreground mb-6">Expert tutorials, testimonials, and detailed product guides.</p>
                            <span className="inline-flex items-center font-bold text-red-600 hover:text-red-700 transition-colors">
                                Watch Videos <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </div>
                    </Link>

                </div>
            </Container>
        </div>
    );
}
