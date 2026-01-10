"use client";

import Link from "next/link";
import Image from "next/image";
import SocialMediaIcons from "./SocialMediaIcons";
import { ArrowRight, Heart, MapPin, Mail, Phone, ChevronRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-slate-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-200 border-t border-zinc-200 dark:border-white/5 font-sans relative overflow-hidden transition-colors duration-300" suppressHydrationWarning>
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" suppressHydrationWarning />
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" suppressHydrationWarning />

            {/* Main Content */}
            <div className="container-width py-16 md:py-24 grid gap-12 md:grid-cols-2 lg:grid-cols-4 relative z-10">

                {/* Brand Section */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3 group">
                        <div className="relative h-12 w-12 transition-transform duration-500 group-hover:rotate-12">
                            <Image
                                src="/images/farmerlift_icon_transparent.png"
                                alt="FarmerLift Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-outfit tracking-tight">FarmerLift</h3>
                            <span className="text-xs text-emerald-600 dark:text-emerald-500 font-medium tracking-widest uppercase">Empowering Agriculture</span>
                        </div>
                    </div>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xs">
                        By The Farmer, For The Farmers. <br />
                        Connecting quality inputs with expert knowledge for a better harvest.
                    </p>

                    <div className="pt-2">
                        <SocialMediaIcons />
                    </div>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col gap-6">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white font-outfit relative w-fit">
                        Platform
                        <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-emerald-500 rounded-full" />
                    </h4>
                    <nav className="flex flex-col gap-3">
                        {[
                            { name: "Browse Products", href: "/products" },
                            { name: "Resources & Blog", href: "/resources" },
                            { name: "Join as Partner", href: "/register" }
                        ].map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.href}
                                className="group flex items-center text-sm text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300"
                            >
                                <ChevronRight className="w-4 h-4 mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-emerald-500" />
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Company & Support */}
                <div className="flex flex-col gap-6">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white font-outfit relative w-fit">
                        Company
                        <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-blue-500 rounded-full" />
                    </h4>
                    <nav className="flex flex-col gap-3">
                        {[
                            { name: "About Us", href: "/about" },
                            { name: "Contact Support", href: "/contact" },
                            { name: "Terms of Service", href: "/terms" },
                            { name: "Privacy Policy", href: "/privacy" }
                        ].map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.href}
                                className="group flex items-center text-sm text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-zinc-700 mr-2 group-hover:bg-blue-500 transition-colors duration-300" />
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-6">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white font-outfit relative w-fit">
                        Reach Us
                        <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-orange-500 rounded-full" />
                    </h4>
                    <div className="flex flex-col gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                        <div className="flex items-start gap-3 group">
                            <MapPin className="w-5 h-5 text-zinc-500 dark:text-zinc-600 group-hover:text-orange-500 transition-colors" />
                            <div className="flex flex-col">
                                <span className="font-semibold text-slate-900 dark:text-white mb-1">Headquarters</span>
                                <p className="leading-relaxed">
                                    Plot No. A2, MIDC Industrial Area,<br />
                                    Kandhar, Dist. Nanded,<br />
                                    Maharashtra – 431714
                                </p>
                            </div>
                        </div>

                        {/* Interactive Email/Phone */}
                        <div className="mt-2 flex flex-col gap-2">
                            <p className="flex items-center gap-2 hover:text-emerald-700 dark:hover:text-white transition-colors cursor-pointer">
                                <Mail className="w-4 h-4" /> support@farmerlift.com
                            </p>
                            <p className="flex items-center gap-2 hover:text-emerald-700 dark:hover:text-white transition-colors cursor-pointer">
                                <Phone className="w-4 h-4" /> +91 87881-13105
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-zinc-200 dark:border-white/5 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                <div className="container-width py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
                    <p>© 2026 FarmerLift. All rights reserved.</p>

                    <div className="flex items-center gap-1 group">
                        Made with <Heart className="w-3 h-3 text-red-500 dark:text-red-600 fill-red-500 dark:fill-red-600 animate-pulse" /> for <span className="text-emerald-600 dark:text-zinc-300 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">Indian Farmers</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
