"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, ChevronDown, Leaf } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

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

export default function HeroSection({ slides = [] }: HeroSectionProps) {
    const router = useRouter();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    // Default / Fallback Slides
    const defaultSlides = [
        {
            id: 1,
            image: "/images/banner1.jpg", // Placeholder - User to provide
            heading: "FarmerLift",
            subtext: "by the farmer, for the farmers",
            buttonText: "About Us",
            buttonUrl: "/about"
        },
        {
            id: 2,
            image: "/images/banner2.jpg",
            heading: "Quality Inputs...",
            subtext: "Better Harvests. Connect directly with top-tier suppliers.",
            buttonText: "View Products",
            buttonUrl: "/products"
        },
        {
            id: 3,
            image: "/images/banner3.jpg",
            heading: "Your Partner in Agriculture",
            subtext: "Empowering farmers with the right knowledge and inputs.",
            buttonText: "Partner with Us",
            buttonUrl: "/register"
        }
    ];

    const finalSlides = slides.length > 0 ? slides : defaultSlides;

    // Auto-play carousel
    useEffect(() => {
        setIsLoaded(true);
        if (finalSlides.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % finalSlides.length);
        }, 6000); // 6s per slide
        return () => clearInterval(interval);
    }, [finalSlides.length]);

    const nextSlide = () => setCurrentSlide(prev => (prev + 1) % finalSlides.length);
    const prevSlide = () => setCurrentSlide(prev => (prev - 1 + finalSlides.length) % finalSlides.length);

    const activeSlide = finalSlides[currentSlide];

    return (
        <section className="relative w-full h-[95vh] min-h-[700px] flex flex-col items-center justify-center overflow-hidden group/hero">
            {/* Background Image Carousel */}
            <div className="absolute inset-0 z-0 select-none bg-zinc-900">
                {finalSlides.map((slide, index) => (
                    <div
                        key={slide.id || index}
                        className={cn(
                            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                        )}
                    >
                        <Image
                            src={slide.image || '/images/home-hero.png'}
                            alt={slide.heading}
                            fill
                            className={cn(
                                "object-cover transition-transform duration-[10000ms] ease-linear",
                                index === currentSlide ? "scale-110" : "scale-100"
                            )}
                            priority={index === 0}
                        />
                    </div>
                ))}

                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-black/30 z-10" /> {/* General Dim */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
                <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/20 to-black/80 z-10" />
            </div>

            {/* Central Content */}
            <div className="relative z-20 container-width px-6 flex flex-col items-center text-center text-white pb-12">

                {/* Brand Badge */}
                <div className={cn(
                    "mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-bold uppercase tracking-widest shadow-lg opacity-0 translate-y-4 transition-all duration-700 delay-100",
                    isLoaded && "opacity-100 translate-y-0"
                )}>
                    <Leaf className="h-3 w-3 fill-emerald-500" />
                    <span>Empowering Agritech</span>
                </div>

                {/* Big Dynamic Heading */}
                <h1 className="max-w-6xl mx-auto">
                    <span className={cn(
                        "block text-5xl md:text-7xl lg:text-9xl font-black font-outfit text-white leading-[0.9] tracking-tight drop-shadow-2xl opacity-0 translate-y-8 transition-all duration-700 delay-200",
                        isLoaded && "opacity-100 translate-y-0"
                    )}>
                        {activeSlide.heading}
                    </span>
                </h1>

                {/* Subtext */}
                <p className={cn(
                    "mt-8 text-lg md:text-2xl text-zinc-300 leading-relaxed max-w-2xl font-light opacity-0 translate-y-4 transition-all duration-700 delay-300",
                    isLoaded && "opacity-100 translate-y-0"
                )}>
                    {activeSlide.subtext}
                </p>

                {/* Main CTA Button */}
                <div className={cn(
                    "mt-12 flex flex-wrap items-center justify-center gap-4 opacity-0 scale-95 transition-all duration-700 delay-500",
                    isLoaded && "opacity-100 scale-100"
                )}>
                    <Button
                        size="lg"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white border-0 h-16 px-12 text-lg font-bold rounded-full shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] transition-all hover:scale-105 active:scale-95 group/btn"
                        onClick={() => router.push(activeSlide.buttonUrl || '/products')}
                    >
                        {activeSlide.buttonText || 'Explore Catalogue'}
                        <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                </div>
            </div>

            {/* Premium Controls */}
            {finalSlides.length > 1 && (
                <>
                    {/* Left/Right Navigation */}
                    <div className="hidden md:flex absolute inset-x-8 lg:inset-x-16 top-1/2 -translate-y-1/2 justify-between pointer-events-none z-30">
                        <button
                            onClick={prevSlide}
                            className="pointer-events-auto h-14 w-14 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 text-white backdrop-blur-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group/nav"
                        >
                            <ChevronLeft className="h-6 w-6 opacity-70 group-hover/nav:opacity-100" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="pointer-events-auto h-14 w-14 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 text-white backdrop-blur-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group/nav"
                        >
                            <ChevronRight className="h-6 w-6 opacity-70 group-hover/nav:opacity-100" />
                        </button>
                    </div>

                    {/* Pagination Lines */}
                    <div className="absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-30">
                        {finalSlides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={cn(
                                    "h-1 rounded-full transition-all duration-500",
                                    idx === currentSlide ? "w-16 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]" : "w-4 bg-white/20 hover:bg-white/40"
                                )}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Scroll Mouse Indicator */}
            <div
                className="absolute bottom-10 right-10 mix-blend-difference hidden lg:flex flex-col items-center gap-2 cursor-pointer z-30 animate-pulse"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent" />
                <span className="text-[10px] uppercase tracking-widest text-white/50 writing-mode-vertical rotate-180">Scroll</span>
            </div>
        </section>
    );
}
