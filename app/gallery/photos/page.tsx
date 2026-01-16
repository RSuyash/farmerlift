import Container from '@/components/global/ui/Container';
import { getPhotoGallery } from '@/lib/cms';
import Image from 'next/image';
import { Camera } from 'lucide-react';

export const metadata = {
    title: 'Photo Gallery | FarmerLift',
    description: 'Browse our collection of agricultural moments and field success stories.',
};

export default async function PhotoGalleryPage() {
    const photos = await getPhotoGallery();

    return (
        <div className="bg-gray-50 dark:bg-black min-h-screen py-16">
            <Container>
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-6 text-emerald-700 dark:text-emerald-400">
                        <Camera className="h-6 w-6" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-foreground mb-4">Photo Gallery</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Capturing the essence of modern agriculture. Events, field days, and crop results.
                    </p>
                </div>

                {/* Gallery Grid */}
                {photos.length > 0 ? (
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                        {photos.map((photo: any) => (
                            <div key={photo.id} className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-zoom-in">
                                <Image
                                    src={photo.image}
                                    alt={photo.title || 'Gallery Image'}
                                    width={600}
                                    height={400}
                                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <h3 className="text-white font-medium text-lg">{photo.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-white/5 rounded-3xl border border-dashed border-gray-300 dark:border-white/10">
                        <Camera className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-bold text-foreground">No Photos Yet</h3>
                        <p className="text-muted-foreground mt-2">Check back soon for updates!</p>
                    </div>
                )}
            </Container>
        </div>
    );
}
