import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

interface Slide {
    id: number;
    image: string;
    heading: string;
    subtext: string;
    buttonText: string;
    buttonUrl?: string;
}

interface HeroSectionProps {
    slides?: Slide[];
}

const defaultSlide: Slide = {
    id: 1,
    image: "/images/hero-slide-1-1200.jpg",
    heading: "FarmerLift",
    subtext: "by the farmer, for the farmers",
    buttonText: "About Us",
    buttonUrl: "/about",
};

function heroSources(image: string | undefined) {
    if (!image || image.includes("/slide-1-3.jpg")) {
        return {
            avif: "/images/hero-slide-1-640.avif 640w, /images/hero-slide-1-1200.avif 1200w, /images/hero-slide-1-1920.avif 1920w",
            webp: "/images/hero-slide-1-640.webp 640w, /images/hero-slide-1-1200.webp 1200w, /images/hero-slide-1-1920.webp 1920w",
            fallback: "/images/hero-slide-1-1200.jpg",
        };
    }

    return { fallback: image };
}

export default function HeroSection({ slides = [] }: HeroSectionProps) {
    const activeSlide = slides[0] || defaultSlide;
    const sources = heroSources(activeSlide.image);
    const href = activeSlide.buttonUrl || "/products";

    return (
        <section className="relative w-full min-h-[640px] h-[88vh] flex flex-col items-center justify-center overflow-hidden bg-zinc-900">
            <picture className="absolute inset-0 z-0">
                {sources.avif && <source srcSet={sources.avif} type="image/avif" sizes="100vw" />}
                {sources.webp && <source srcSet={sources.webp} type="image/webp" sizes="100vw" />}
                <img
                    src={sources.fallback}
                    alt={activeSlide.heading}
                    className="h-full w-full object-cover"
                    fetchPriority="high"
                    decoding="async"
                    width={1200}
                    height={800}
                />
            </picture>

            <div className="absolute inset-0 z-10 bg-black/35" />
            <div className="absolute inset-x-0 bottom-0 z-10 h-2/3 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

            <div className="relative z-20 container-width px-6 flex flex-col items-center text-center text-white pb-10">
                <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-xs font-bold uppercase tracking-widest shadow-lg">
                    <Leaf className="h-3 w-3 fill-emerald-500" />
                    <span>Empowering Agritech</span>
                </div>

                <h1 className="max-w-6xl mx-auto text-5xl md:text-7xl lg:text-8xl font-black font-outfit text-white leading-[0.95] tracking-tight drop-shadow-2xl">
                    {activeSlide.heading}
                </h1>

                <p className="mt-8 text-lg md:text-2xl text-zinc-200 leading-relaxed max-w-2xl font-light">
                    {activeSlide.subtext}
                </p>

                <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                    <Link
                        href={href}
                        className="inline-flex h-14 md:h-16 items-center justify-center rounded-full bg-emerald-700 px-8 md:px-12 text-base md:text-lg font-bold text-white shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] transition-colors hover:bg-emerald-600"
                    >
                        {activeSlide.buttonText || "Explore Catalogue"}
                        <ArrowRight className="ml-3 h-5 w-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
