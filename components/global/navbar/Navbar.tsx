"use client"

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, Search, Phone, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/global/ThemeToggle";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();

    // Lock Body Scroll when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    return (
        <header className="w-full flex flex-col z-50">
            {/* Top Bar - Professional & Trust Signals */}
            <div className="bg-emerald-900 dark:bg-black border-b border-white/10 text-white py-2 text-xs md:text-sm transition-colors duration-300 relative z-[51]">
                <div className="container-width flex justify-between items-center">
                    <div className="flex items-center gap-4 opacity-90">
                        <a href="tel:+918788113105" className="flex items-center gap-2 hover:text-emerald-300 transition-colors">
                            <Phone className="h-3 w-3 md:h-4 md:w-4" />
                            <span>+91 87881-13105</span>
                        </a>
                        <a href="mailto:farmerliftmanagement@gmail.com" className="hidden sm:flex items-center gap-2 hover:text-emerald-300 transition-colors">
                            <Mail className="h-3 w-3 md:h-4 md:w-4" />
                            <span>farmerliftmanagement@gmail.com</span>
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/help" className="hover:text-emerald-300 transition-colors opacity-90">Help Center</Link>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="sticky top-0 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm z-[50]">
                <div className="container-width flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative h-10 w-12 md:h-12 md:w-16 transition-transform group-hover:scale-105">
                            <Image
                                src="/images/farmerlift_icon_transparent.png"
                                alt="FarmerLift Logo"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold font-outfit tracking-tight text-foreground leading-none">
                                FarmerLift
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {[
                            { name: "Home", href: "/" },
                            { name: "Products", href: "/products" },
                            { name: "Blog", href: "/blog" },
                            { name: "Resources", href: "/resources" },
                            { name: "About", href: "/about" },
                            { name: "Contact", href: "/contact" },
                        ].map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <div className="hidden lg:flex relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="h-10 w-64 rounded-full border border-input bg-muted/50 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all pb-0.5"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        const target = e.target as HTMLInputElement;
                                        if (target.value.trim()) {
                                            router.push(`/products?q=${encodeURIComponent(target.value)}`);
                                        }
                                    }
                                }}
                            />
                        </div>

                        <Button variant="ghost" size="icon" className="lg:hidden">
                            <Search className="h-5 w-5" />
                        </Button>

                        <div className="hidden md:block">
                            <ThemeToggle />
                        </div>

                        <Link href="/contact" className="hidden md:block">
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md hover:shadow-lg transition-all rounded-full px-6">
                                Contact Us
                            </Button>
                        </Link>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden relative z-[60]"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay & Drawer */}
            {isMobileMenuOpen && (
                <>
                    {/* Dark Backdrop Overlay */}
                    <div
                        className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="fixed inset-y-0 right-0 z-[100] w-[85vw] sm:w-[350px] bg-white dark:bg-zinc-950 border-l border-gray-100 dark:border-white/10 shadow-2xl animate-in slide-in-from-right duration-300 md:hidden flex flex-col">

                        {/* Drawer Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/10">
                            <div className="flex items-center gap-2">
                                <div className="relative h-8 w-10">
                                    <Image
                                        src="/images/farmerlift_icon_transparent.png"
                                        alt="Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="font-bold font-outfit text-xl">Menu</span>
                            </div>
                            {/* Close Button is handled by the toggle in the main nav which stays visible or we duplicate here. 
                                Actually, the main nav toggle is z-60 (below drawer 100). We need a close button inside.
                            */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </Button>
                        </div>

                        {/* Drawer Content */}
                        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-2">
                            {[
                                { name: "Home", href: "/" },
                                { name: "Products", href: "/products" },
                                { name: "Catalogue", href: "/catalogue" }, // Added Catalogue
                                { name: "Blog", href: "/blog" },
                                { name: "Resources", href: "/resources" },
                                { name: "About", href: "/about" },
                                { name: "Contact", href: "/contact" },
                            ].map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-between p-4 rounded-xl hover:bg-emerald-50 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 font-medium transition-all group"
                                >
                                    {link.name}
                                    <svg className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            ))}
                        </div>

                        {/* Drawer Footer */}
                        <div className="p-6 border-t border-gray-100 dark:border-white/10 space-y-4 bg-gray-50/50 dark:bg-black/20">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500">Theme</span>
                                <ThemeToggle />
                            </div>

                            <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="block">
                                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-emerald-500/20">
                                    Join as Partner
                                </Button>
                            </Link>

                            <p className="text-xs text-center text-gray-400 mt-4">
                                © 2026 FarmerLift. v1.3
                            </p>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
}
