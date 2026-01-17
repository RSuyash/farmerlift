import { getAllCropGuides, getPageBanner } from "@/lib/cms";
import PageBanner from "@/components/global/PageBanner";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Sprout } from "lucide-react";

export const revalidate = 60;

export default async function CropGuidesPage() {
    const guides = await getAllCropGuides();
    const banner = await getPageBanner('crop-guides'); // Assumes a WP page exists with this slug for banner control

    // Fallback Banner if no specific page is set in WP
    const heroBanner = banner || {
        heading: "Crop Schedule Guides",
        subtext: "Scientific, stage-wise cultivation practices for maximum yield.",
        image: "/images/hero_2.jpg"
    };

    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-black">
            <PageBanner
                heading={heroBanner.heading}
                subtext={heroBanner.subtext}
                image={heroBanner.image || '/images/hero_2.jpg'}
            />

            <div className="container-width py-12 lg:py-20">
                {guides.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {guides.map((guide) => (
                            <Link key={guide.id} href={`/crop-guides/${guide.id}`} className="group block">
                                <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 h-full flex flex-col">
                                    {/* Image */}
                                    <div className="relative h-56 w-full overflow-hidden">
                                        <Image
                                            src={guide.image || '/images/placeholder.png'}
                                            alt={guide.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold font-outfit text-zinc-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                            {guide.title}
                                        </h3>

                                        {guide.scientificName && (
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400 italic mb-4">
                                                {guide.scientificName}
                                            </p>
                                        )}

                                        <div className="flex flex-wrap gap-3 mt-auto">
                                            {guide.season && guide.season.length > 0 && (
                                                <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300">
                                                    <Calendar className="h-3 w-3" />
                                                    {guide.season.join(', ')}
                                                </span>
                                            )}
                                            {guide.duration && (
                                                <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                                                    <Sprout className="h-3 w-3" />
                                                    {guide.duration}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="h-20 w-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6">
                            <Sprout className="h-10 w-10 text-zinc-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">No Guides Available Yet</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                            We are currently compiling comprehensive crop cultivation guides. Please check back soon or contact us for specific advice.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
