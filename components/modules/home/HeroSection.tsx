"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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

    // Auto-play carousel
    useEffect(() => {
        if (slides.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);

    // Initial Default Fallback if no slides
    const activeSlide = slides.length > 0 ? slides[currentSlide] : {
        image: "/images/home-hero.png",
        heading: "Quality Inputs for Better Harvests",
        subtext: "Connect directly with top-tier suppliers for verified seeds, fertilizers, and equipment.",
        buttonText: "Explore Catalogue",
        buttonUrl: "/products"
    };

    return (
        <section className="relative w-full h-[90vh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden group/hero">
            {/* Background Image Carousel */}
            <div className="absolute inset-0 z-0 select-none bg-black">
                {slides.length > 0 ? (
                    slides.map((slide, index) => (
                        <div
                            key={slide.id || index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <Image
                                src={slide.image || '/images/home-hero.png'}
                                alt={slide.heading}
                                fill
                                className="object-cover"
                                priority={index === 0}
                            />
                        </div>
                    ))
                ) : (
                    <Image
                        src="/images/home-hero.png"
                        alt="Hero Background"
                        fill
                        className="object-cover"
                        priority
                    />
                )}

                {/* Modern Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
            </div>

            {/* Central Content */}
            <div className="relative z-10 container-width px-4 flex flex-col items-center text-center text-white pb-10">

                {/* Big Dynamic Heading */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-outfit leading-tight tracking-tight drop-shadow-2xl mb-6 max-w-5xl animate-fade-in">
                    {activeSlide.heading}
                </h1>

                {/* Subtext */}
                <p className="text-lg md:text-2xl text-gray-200/90 leading-relaxed max-w-2xl font-light mb-10 animate-fade-in delay-100">
                    {activeSlide.subtext}
                </p>

                {/* Main CTA Button */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-16 animate-fade-in delay-200">
                    <Button
                        size="lg"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white border-0 h-14 px-10 text-lg font-semibold rounded-full shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
                        onClick={() => router.push(activeSlide.buttonUrl || '/products')}
                    >
                        {activeSlide.buttonText || 'Explore Catalogue'} <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>

            </div>

            {/* Slider Controls (Arrow Buttons) */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/20 hover:bg-emerald-600 text-white backdrop-blur-md border border-white/10 transition-all opacity-50 hover:opacity-100 z-20"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/20 hover:bg-emerald-600 text-white backdrop-blur-md border border-white/10 transition-all opacity-50 hover:opacity-100 z-20"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>

                    {/* Pagination Dots */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-10 bg-emerald-500' : 'w-2 bg-white/40 hover:bg-white'}`}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow opacity-80 cursor-pointer z-20" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                <span className="text-xs uppercase tracking-[0.2em] text-white/70 font-light">Scroll Down</span>
                <ChevronDown className="h-6 w-6 text-emerald-400" />
            </div>
        </section>
    );
}
