"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, Search, Phone, Mail } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/global/ThemeToggle";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();

    return (
        <header className="w-full flex flex-col z-50">
            {/* Top Bar - Professional & Trust Signals */}
            <div className="bg-emerald-900 dark:bg-black border-b border-white/10 text-white py-2 text-xs md:text-sm transition-colors duration-300">
                <div className="container-width flex justify-between items-center">
                    <div className="flex items-center gap-4 opacity-90">
                        <a href="tel:+919226411841" className="flex items-center gap-2 hover:text-emerald-300 transition-colors">
                            <Phone className="h-3 w-3 md:h-4 md:w-4" />
                            <span>+91 92264-11841</span>
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
            <div className="sticky top-0 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
                <div className="container-width flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        {/* Logo Icon Placeholder */}
                        <div className="h-10 w-10 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
                            FL
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

                        <ThemeToggle />

                        <Link href="/register" className="hidden md:block">
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md hover:shadow-lg transition-all rounded-full px-6">
                                Get Started
                            </Button>
                        </Link>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-background pt-24 px-6 animate-fade-in">
                    <nav className="flex flex-col gap-6 text-lg font-medium">
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
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="border-b pb-4 border-border hover:text-primary"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button className="w-full mt-4 bg-emerald-600 text-white">
                                Join as Partner
                            </Button>
                        </Link>
                        <div className="flex justify-between items-center mt-4 border-t pt-4 border-border">
                            <span className="text-sm font-medium">Switch Theme</span>
                            <div onClick={() => setIsMobileMenuOpen(false)} className="inline-block">
                                <ThemeToggle />
                            </div>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
