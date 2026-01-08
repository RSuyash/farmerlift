"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, ChevronDown, Leaf, Sprout, Bug, Tractor } from "lucide-react"; // Added icons
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroSection() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.push(`/products?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const quickFilters = [
        { label: "Fertilizers", category: "fertilizer", color: "bg-emerald-100/50 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-100 border-emerald-200 dark:border-emerald-500/30", icon: Leaf },
        { label: "Seeds", category: "seed", color: "bg-yellow-100/50 dark:bg-yellow-500/20 text-yellow-900 dark:text-yellow-100 border-yellow-200 dark:border-yellow-500/30", icon: Sprout },
        { label: "Pesticides", category: "pesticide", color: "bg-red-100/50 dark:bg-red-500/20 text-red-900 dark:text-red-100 border-red-200 dark:border-red-500/30", icon: Bug },
        { label: "Machinery", category: "machinery", color: "bg-blue-100/50 dark:bg-blue-500/20 text-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-500/30", icon: Tractor },
    ];

    return (
        <section className="relative w-full h-[90vh] min-h-[650px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Cinematic Overlay - Dual Mode */}
            <div className="absolute inset-0 z-0 select-none">
                <Image
                    src="/images/home-hero.png"
                    alt="Lush green farm field at sunrise"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Light Mode Overlay: White to Transparent (Morning Mist) - Stronger Opacity */}
                {/* Light Mode Overlay: White to Transparent (Morning Mist) - Stronger Opacity */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent/10 dark:hidden" />

                {/* Dark Mode Overlay: Black to Transparent (Cinematic) */}
                <div className="absolute inset-0 hidden dark:block bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
                <div className="absolute inset-0 hidden dark:block bg-gradient-to-t from-black/80 via-transparent to-black/30" />
            </div>

            <div className="container-width relative z-10 grid gap-12 lg:grid-cols-2 items-center dark:text-white text-emerald-950 pt-10">
                {/* Left Content */}
                <div className="flex flex-col gap-6 md:gap-8 animate-fade-in max-w-2xl">
                    <div className="inline-flex items-center rounded-full border border-emerald-600/30 bg-emerald-100/50 dark:bg-emerald-950/40 dark:border-emerald-400/30 px-4 py-1.5 text-sm font-medium backdrop-blur-md text-emerald-800 dark:text-emerald-300 w-fit shadow-sm dark:shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400 mr-2 animate-pulse" />
                        Empowering Modern Agriculture
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-outfit leading-[1.1] tracking-tight drop-shadow-sm dark:drop-shadow-lg">
                        Quality Inputs for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-500 dark:from-emerald-400 dark:via-emerald-300 dark:to-yellow-200 animate-gradient-text">
                            Better Harvests
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-emerald-900/80 dark:text-gray-200/90 leading-relaxed max-w-[540px] font-light font-sans">
                        Connect directly with top-tier suppliers for verified seeds, fertilizers, and equipment.
                        <span className="hidden sm:inline"> Expert knowledge and reliable delivery, tailored for the modern Indian farmer.</span>
                    </p>

                    <div className="flex flex-wrap gap-4 mt-2">
                        <Button
                            size="lg"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 h-14 px-8 text-base font-semibold shadow-lg shadow-emerald-700/20 dark:shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                            onClick={() => router.push('/products')}
                        >
                            Explore Catalogue <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="h-14 px-8 text-base bg-white/40 dark:bg-white/5 border-emerald-900/10 dark:border-white/20 text-emerald-950 dark:text-white hover:bg-emerald-900/5 dark:hover:bg-white/10 backdrop-blur-sm transition-all"
                            onClick={() => router.push('/register')}
                        >
                            Partner with Us
                        </Button>
                    </div>
                </div>

                {/* Right Glass Card (Quick Finder) */}
                <div className="hidden lg:flex justify-end animate-slide-up hover:translate-y-[-5px] transition-transform duration-500 ease-out">
                    <div className="glass p-8 rounded-3xl max-w-sm w-full border border-white/20 dark:border-white/10 bg-white/60 dark:bg-black/40 backdrop-blur-2xl shadow-2xl dark:shadow-black/50 shadow-emerald-900/10">
                        <h3 className="text-2xl font-semibold mb-6 text-emerald-950 dark:text-white font-outfit">Quick Find</h3>

                        <div className="space-y-6">
                            {/* Search Input */}
                            <div className="relative group">
                                <Search className="absolute left-4 top-3.5 h-5 w-5 text-emerald-800/50 dark:text-gray-400 group-focus-within:text-emerald-600 dark:group-focus-within:text-emerald-400 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search (e.g. Urea, Tomato)..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="w-full h-12 bg-emerald-900/5 dark:bg-white/5 border border-emerald-900/10 dark:border-white/10 rounded-xl pl-12 pr-4 text-base text-emerald-950 dark:text-white placeholder:text-emerald-900/40 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white dark:focus:bg-white/10 transition-all font-light"
                                />
                            </div>

                            {/* Quick Filter Grid */}
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-900/60 dark:text-gray-400 mb-3">Popular Categories</p>
                                <div className="grid grid-cols-2 gap-3">
                                    {quickFilters.map((filter) => (
                                        <button
                                            key={filter.category}
                                            onClick={() => router.push(`/products?category=${filter.category}`)}
                                            className={`p-4 rounded-xl border flex flex-col items-start gap-2 transition-all hover:scale-[1.03] active:scale-95 ${filter.color} hover:shadow-lg`}
                                        >
                                            <filter.icon className="h-5 w-5 opacity-80" />
                                            <span className="text-sm font-medium">{filter.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow opacity-80 cursor-pointer" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                <span className="text-xs uppercase tracking-[0.2em] text-white/70 font-light">Scroll Down</span>
                <ChevronDown className="h-6 w-6 text-emerald-400" />
            </div>
        </section>
    );
}
