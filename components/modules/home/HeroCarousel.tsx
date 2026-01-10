"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    {
        id: 1,
        image: "/images/home-hero.png",
        title: "FarmerLift",
        tagline: "By The Farmer, For The Farmers",
        description: "Empowering agriculture through technology and community.",
        buttonText: "About Us",
        buttonLink: "/about",
        align: "center"
    },
    {
        id: 2,
        image: "/images/hero/slide-2.png",
        title: "Quality Inputs for Better Harvests",
        tagline: "Premium Seeds & Fertilizers",
        description: "Sourced directly from top manufacturers ensuring 100% authenticity.",
        buttonText: "View Products",
        buttonLink: "/products",
        align: "left"
    },
    {
        id: 3,
        image: "/images/hero/slide-3.png",
        title: "Your Partner in Agriculture",
        tagline: "Expert Guidance & Support",
        description: "From sowing to harvest, we stand with you at every step.",
        buttonText: "Contact Us",
        buttonLink: "/contact",
        align: "left"
    }
];

export default function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-black">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 md:bg-black/30 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative z-20 container-width h-full flex flex-col justify-center text-white">
                        <div className={`max-w-3xl space-y-6 ${slide.align === 'center' ? 'mx-auto text-center' : ''}`}>
                            <div className="space-y-2 animate-fade-in-up">
                                {slide.id === 1 ? (
                                    <>
                                        <h1 className="text-5xl md:text-7xl font-bold font-outfit tracking-tight">
                                            {slide.title}
                                        </h1>
                                        <p className="text-xl md:text-3xl font-light text-emerald-300">
                                            {slide.tagline}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-lg md:text-xl font-medium text-emerald-300 uppercase tracking-widest">
                                            {slide.tagline}
                                        </p>
                                        <h1 className="text-4xl md:text-6xl font-bold font-outfit leading-tight">
                                            {slide.title}
                                        </h1>
                                    </>
                                )}
                            </div>

                            <p className="text-lg md:text-xl text-gray-200 max-w-xl hidden md:block opacity-90">
                                {slide.description}
                            </p>

                            <div className="pt-4">
                                <Link href={slide.buttonLink}>
                                    <Button
                                        size="lg"
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-emerald-500/20 transition-all"
                                    >
                                        {slide.buttonText}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Controls */}
            <div className="absolute bottom-8 right-8 z-30 flex gap-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={prevSlide}
                    className="bg-black/20 border-white/20 text-white hover:bg-emerald-600 hover:border-emerald-600 rounded-full w-12 h-12 backdrop-blur-sm"
                >
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={nextSlide}
                    className="bg-black/20 border-white/20 text-white hover:bg-emerald-600 hover:border-emerald-600 rounded-full w-12 h-12 backdrop-blur-sm"
                >
                    <ChevronRight className="h-6 w-6" />
                </Button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-emerald-500 w-8" : "bg-white/50 hover:bg-white"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
