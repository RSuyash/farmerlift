
import { getCropGuideBySlug, getAllCropGuides } from "@/lib/cms";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, ChevronRight, PlayCircle, Leaf, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";

// Helper to parse description text into styled elements
const renderStageDescription = (desc: string) => {
    // Split by newlines or <br> tags if content comes from HTML
    const cleanDesc = desc.replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    const lines = cleanDesc.split('\n').filter(line => line.trim() !== '');

    return (
        <div className="space-y-3">
            {lines.map((line, i) => {
                const lowerLine = line.toLowerCase();
                let icon = null;
                let badgeClass = "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400";

                if (lowerLine.startsWith('goal:')) {
                    icon = <Sprout className="h-4 w-4" />;
                    badgeClass = "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300";
                } else if (lowerLine.startsWith('action:')) {
                    icon = <Leaf className="h-4 w-4" />;
                    badgeClass = "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
                } else if (lowerLine.startsWith('critical nutrient:') || lowerLine.startsWith('nutrition:')) {
                    icon = <span className="font-bold text-xs">🧪</span>;
                    badgeClass = "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
                } else if (lowerLine.startsWith('pest watch:') || lowerLine.startsWith('tip:')) {
                    icon = <span className="font-bold text-xs">⚠️</span>;
                    badgeClass = "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300";
                }

                // If it matches a pattern "Key: Value", make Key bold
                const match = line.match(/^([^:]+):(.*)$/);

                if (match) {
                    return (
                        <div key={i} className={`flex items-start gap-3 p-3 rounded-lg ${badgeClass} text-sm`}>
                            {icon && <div className="mt-0.5 shrink-0">{icon}</div>}
                            <div>
                                <span className="font-bold uppercase tracking-wider text-xs block opacity-80 mb-1">{match[1]}:</span>
                                <span className="leading-relaxed font-medium">{match[2].trim()}</span>
                            </div>
                        </div>
                    );
                }

                // Standard line
                return <p key={i} className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed pl-1">{line}</p>;
            })}
        </div>
    );
};

// Generate Static Params for SSG
export async function generateStaticParams() {
    const guides = await getAllCropGuides();
    return guides.map((guide) => ({
        slug: guide.id,
    }));
}

export const revalidate = 60;

export default async function CropGuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const guide = await getCropGuideBySlug(slug);

    if (!guide) {
        notFound();
    }

    // 1. Collect all Product IDs across all stages to fetch details
    const allProductIds = new Set<number>();
    guide.stages?.forEach(stage => {
        stage.products?.forEach(id => allProductIds.add(id));
    });

    // 2. Fetch Products
    const productMap = new Map<number, any>();
    if (allProductIds.size > 0) {
        // Fetch products in parallel
        const productPromises = Array.from(allProductIds).map(async (id) => {
            try {
                // Fetch individually from WP API
                const res = await fetch(`https://admin.farmerlift.in/wp-json/wp/v2/product/${id}?_embed`, { next: { revalidate: 3600 } });
                if (res.ok) {
                    const data = await res.json();

                    const mapped = {
                        id: data.id,
                        title: data.title.rendered,
                        image: data._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/placeholder.png',
                        slug: data.slug
                    };
                    return mapped;
                }
            } catch (e) {
                console.error(`Failed to fetch product ${id}`, e);
            }
            return null;
        });

        const products = await Promise.all(productPromises);
        products.forEach(p => {
            if (p) productMap.set(p.id, p);
        });
    }

    return (
        <main className="min-h-screen bg-white dark:bg-black pb-20">
            {/* Header / Hero */}
            <div className="relative h-[40vh] min-h-[400px] w-full bg-zinc-900">
                <Image
                    src={guide.image || '/images/placeholder.png'}
                    alt={guide.title}
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12 mb-8">
                    <div className="container-width">
                        <div className="flex flex-col gap-4 max-w-3xl">
                            <div className="flex flex-wrap gap-2">
                                {guide.season.map(s => (
                                    <span key={s} className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        {s}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit text-white leading-tight">
                                {guide.title}
                            </h1>
                            {guide.scientificName && (
                                <p className="text-xl text-zinc-300 italic font-serif">
                                    {guide.scientificName}
                                </p>
                            )}
                            <div className="flex items-center gap-6 text-white/80 text-sm font-medium mt-2">
                                {guide.duration && (
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-emerald-400" />
                                        <span>Duration: {guide.duration}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-width py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Main Content */}
                <div className="lg:col-span-8 space-y-12">

                    {/* Introduction / Content */}
                    {guide.content && (
                        <div className="prose dark:prose-invert max-w-none prose-lg prose-emerald text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                            <div dangerouslySetInnerHTML={{ __html: guide.content }} />
                        </div>
                    )}

                    {/* STAGES / SOPs */}
                    {guide.stages && guide.stages.length > 0 && (
                        <div className="mt-12">
                            <div className="flex items-center gap-3 mb-8">
                                <Sprout className="h-7 w-7 text-emerald-600" />
                                <h2 className="text-2xl font-bold font-outfit text-zinc-900 dark:text-white">
                                    Cultivation Stages
                                </h2>
                            </div>

                            <div className="space-y-8 relative">
                                {/* Vertical Line */}
                                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-emerald-100 dark:bg-emerald-900/20 lg:left-[23px]" />

                                {guide.stages.map((stage, idx) => (
                                    <div key={idx} className="relative pl-12 lg:pl-16">
                                        {/* Dot */}
                                        <div className="absolute left-0 top-1 h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border-4 border-white dark:border-black flex items-center justify-center z-10 shadow-sm">
                                            <span className="text-emerald-700 dark:text-emerald-400 font-bold text-sm lg:text-base">{idx + 1}</span>
                                        </div>

                                        <div className="bg-white dark:bg-zinc-900/50 rounded-2xl p-6 lg:p-8 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all">
                                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
                                                {stage.name}
                                            </h3>

                                            {stage.description && (
                                                <div className="mb-6">
                                                    {renderStageDescription(stage.description)}
                                                </div>
                                            )}

                                            {/* Recommended Products for this Stage */}
                                            {stage.products && stage.products.length > 0 && (
                                                <div className="mt-6 border-t border-zinc-100 dark:border-zinc-800 pt-5">
                                                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                                        <Leaf className="h-3 w-3" /> Recommended Inputs
                                                    </h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {stage.products.map(pId => {
                                                            const product = productMap.get(pId);
                                                            return (
                                                                <Link
                                                                    key={pId}
                                                                    href={product ? `/products/${product.slug}` : '#'}
                                                                    className="flex items-center gap-4 p-3 rounded-xl bg-zinc-50 dark:bg-black border border-zinc-100 dark:border-zinc-800 hover:border-emerald-500 hover:shadow-emerald-500/10 hover:shadow-lg transition-all group"
                                                                >
                                                                    {/* Image */}
                                                                    <div className="h-14 w-14 shrink-0 bg-white rounded-lg p-1 overflow-hidden border border-zinc-100 dark:border-zinc-800">
                                                                        {product ? (
                                                                            <Image
                                                                                src={product.image}
                                                                                alt={product.title}
                                                                                width={56}
                                                                                height={56}
                                                                                className="h-full w-full object-contain"
                                                                            />
                                                                        ) : (
                                                                            <div className="h-full w-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                                                                <Leaf className="h-6 w-6" />
                                                                            </div>
                                                                        )}
                                                                    </div>

                                                                    {/* Text */}
                                                                    <div className="flex flex-col min-w-0">
                                                                        <span className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 truncate">
                                                                            {product ? product.title : `Product #${pId}`}
                                                                        </span>
                                                                        <span className="text-[11px] text-zinc-500 font-medium">Click to view details</span>
                                                                    </div>

                                                                    <div className="ml-auto">
                                                                        <div className="h-8 w-8 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center group-hover:scale-110 group-hover:border-emerald-500 transition-all">
                                                                            <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:text-emerald-500" />
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Video Card */}
                    {guide.videoUrl && (
                        <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg group cursor-pointer relative ring-1 ring-white/10">
                            <div className="aspect-video bg-black relative">
                                <Image
                                    src={`https://img.youtube.com/vi/${guide.videoUrl.split('v=')[1]?.split('&')[0]}/maxresdefault.jpg`}
                                    alt="Video Thumbnail"
                                    fill
                                    className="object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="h-16 w-16 bg-emerald-600/90 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                                        <PlayCircle className="h-8 w-8 text-white ml-1" />
                                    </div>
                                </div>
                                <a href={guide.videoUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10">
                                    <span className="sr-only">Watch Video</span>
                                </a>
                            </div>
                            <div className="p-4 bg-zinc-900">
                                <h4 className="text-white font-bold text-lg mb-1">Watch Video Guide</h4>
                                <p className="text-zinc-400 text-sm">Visual tour of the cultivation process.</p>
                            </div>
                        </div>
                    )}

                    {/* Contact / CTA */}
                    <div className="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/20 dark:to-zinc-900 rounded-2xl p-8 border border-emerald-100 dark:border-emerald-900/20 text-center shadow-lg shadow-emerald-900/5">
                        <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                            <span className="text-2xl">👨‍🌾</span>
                        </div>
                        <h3 className="font-bold text-xl text-zinc-900 dark:text-white mb-2">Need Expert Advice?</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                            Our agronomists are available to customize this schedule for your specific soil and water conditions.
                        </p>
                        <Link href="/contact">
                            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-emerald-500/20">
                                Talk to an Expert
                            </Button>
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    );
}
