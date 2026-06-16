"use client";

import Link from "next/link";
import { ArrowRight, Leaf, Handshake, PhoneCall } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

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

    const shouldReduceMotion = useReducedMotion();
    const reduceMotion = shouldReduceMotion === true;

    const bgVariants: Variants = {
        hidden: { opacity: 0, scale: reduceMotion ? 1 : 1.05 },
        show: {
            opacity: 1, scale: 1,
            transition: { duration: 1.5, ease: [0.25, 1, 0.5, 1] },
        },
    };

    const badgeVariants: Variants = {
        hidden: { opacity: 0, y: reduceMotion ? 0 : 15, filter: reduceMotion ? "none" : "blur(4px)" },
        show: {
            opacity: 1, y: 0, filter: "blur(0px)",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
        },
    };

    const heading = "Next Generation Agritech Solutions";
    const words = heading.split(" ");

    const descVariants: Variants = {
        hidden: { opacity: 0, y: reduceMotion ? 0 : 15, filter: reduceMotion ? "none" : "blur(4px)" },
        show: {
            opacity: 1, y: 0, filter: "blur(0px)",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.2 },
        },
    };

    const ctaContainerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 1.4 },
        },
    };

    const ctaVariants: Variants = {
        hidden: { opacity: 0, y: reduceMotion ? 0 : 15, filter: reduceMotion ? "none" : "blur(4px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    };

    return (
        <section className="relative w-full min-h-[640px] h-[88vh] flex flex-col items-center justify-center overflow-hidden bg-zinc-900">
            <motion.picture
                className="absolute inset-0 z-0"
                initial="hidden"
                animate="show"
                variants={bgVariants}
            >
                {sources.avif && (
                    <source
                        srcSet={sources.avif}
                        type="image/avif"
                        sizes="100vw"
                    />
                )}

                {sources.webp && (
                    <source
                        srcSet={sources.webp}
                        type="image/webp"
                        sizes="100vw"
                    />
                )}

                <img
                    src={sources.fallback}
                    alt="FarmerLift Hero Background"
                    className="h-full w-full object-cover"
                    fetchPriority="high"
                    decoding="async"
                    width={1200}
                    height={800}
                />
            </motion.picture>

            <div className="absolute inset-0 z-10 bg-black/50" />
            <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 z-10 h-2/3 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent" />

            <div className="relative z-20 container-width px-4 sm:px-6 flex flex-col items-center text-center text-white pb-12 pt-16">
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={badgeVariants}
                    className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-300 text-xs md:text-sm font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.1)] backdrop-blur-md"
                >
                    <Leaf className="h-3.5 w-3.5 fill-emerald-500" />
                    <span>Empowering Agritech</span>
                </motion.div>

                <h1 className="max-w-4xl mx-auto text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem] font-black font-outfit text-white leading-[1.05] tracking-[-0.03em] drop-shadow-2xl flex flex-wrap justify-center items-center gap-x-[0.25em] gap-y-1">
                    {words.map((word, index) => {
                        const isGradient = index >= 2;
                        return (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, y: reduceMotion ? 0 : 25, filter: reduceMotion ? "none" : "blur(8px)", scale: reduceMotion ? 1 : 0.98 }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 + (index * 0.1), ease: [0.16, 1, 0.3, 1] }}
                                className={`inline-block ${isGradient ? 'text-transparent bg-clip-text bg-[linear-gradient(to_right,#6ee7b7,#4ade80,#2dd4bf,#22d3ee)] drop-shadow-[0_0_20px_rgba(16,185,129,0.2)] pb-1' : ''}`}
                            >
                                {word}
                            </motion.span>
                        );
                    })}
                </h1>

                <motion.p
                    initial="hidden"
                    animate="show"
                    variants={descVariants}
                    className="mt-4 text-base sm:text-lg md:text-xl text-zinc-300/90 leading-relaxed max-w-xl font-light drop-shadow-md"
                >
                    Empowering farmers and businesses with intelligent
                    technology, superior agricultural inputs, and sustainable
                    growth practices.
                </motion.p>

                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={ctaContainerVariants}
                    className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
                >
                    <motion.div variants={ctaVariants} className="w-full sm:w-auto">
                        <Link
                            href="/catalogue"
                            className="group flex w-full sm:w-auto h-12 md:h-14 items-center justify-center rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600 px-8 text-base font-bold text-white shadow-[0_0_20px_rgba(16,185,129,0.2),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-300 hover:from-emerald-300 hover:to-emerald-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] active:scale-[0.98]"
                        >
                            Explore Catalogue
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </motion.div>

                    <motion.div variants={ctaVariants} className="w-full sm:w-auto hidden md:block">
                        <Link
                            href="/register"
                            className="flex w-full sm:w-auto h-12 md:h-14 items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 px-8 text-base font-bold text-white shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Handshake className="mr-2 h-4 w-4" />
                            Partner With Us
                        </Link>
                    </motion.div>

                    <motion.div variants={ctaVariants} className="w-full sm:w-auto">
                        <Link
                            href="/contact"
                            className="group flex w-full sm:w-auto h-12 md:h-14 items-center justify-center rounded-full bg-transparent px-6 text-base font-medium text-zinc-400 transition-all duration-300 hover:text-white hover:underline decoration-emerald-500 underline-offset-4 active:scale-[0.98]"
                        >
                            <PhoneCall className="mr-2 h-4 w-4 transition-colors group-hover:text-emerald-400" />
                            Contact Us
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
