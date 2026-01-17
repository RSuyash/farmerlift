"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Linkedin, Instagram, Code, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RsuyashSignature() {
    const [isHovered, setIsHovered] = useState(false);
    const [isAutoActive, setIsAutoActive] = useState(false);

    // Animation Loop
    useEffect(() => {
        const triggerAnimation = () => {
            setIsAutoActive(true);
            setTimeout(() => setIsAutoActive(false), 2500); // Stay open for 2.5s
        };

        // Start initial delay
        const initialTimeout = setTimeout(() => {
            triggerAnimation();
            const interval = setInterval(triggerAnimation, 6000); // Repeat every 6s
            return () => clearInterval(interval);
        }, 1500);

        return () => clearTimeout(initialTimeout);
    }, []);

    const isActive = isHovered || isAutoActive;

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
                "relative inline-flex items-center justify-center p-[1px] rounded-full transition-all duration-700",
                isActive
                    ? "bg-gradient-to-r from-emerald-500 via-purple-500 to-emerald-500 bg-[length:200%_auto] animate-gradient"
                    : "bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent"
            )}
        >
            <div className={cn(
                "relative bg-white dark:bg-black rounded-full p-1.5 flex items-center gap-2 transition-all duration-500 ease-out",
                isActive ? "pr-3 pl-2" : "pr-4 pl-2"
            )}>

                {/* Avatar / Icon */}
                <div className={cn(
                    "h-6 w-6 rounded-full flex items-center justify-center border relative overflow-hidden transition-all duration-500",
                    isActive
                        ? "bg-zinc-50 dark:bg-zinc-800 border-emerald-500/50"
                        : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                )}>
                    <Code className={cn(
                        "h-3 w-3 transition-colors duration-500",
                        isActive ? "text-emerald-500" : "text-zinc-500 dark:text-zinc-400"
                    )} />
                    <div className={cn(
                        "absolute inset-0 bg-emerald-500/20 blur-md transition-opacity duration-500",
                        isActive ? "opacity-100" : "opacity-0"
                    )} />
                </div>

                {/* Text Content */}
                <div className="flex flex-col leading-none">
                    <span className={cn(
                        "text-[10px] uppercase tracking-wider font-semibold transition-colors duration-500",
                        isActive ? "text-emerald-600" : "text-zinc-400"
                    )}>Developed by</span>
                    <span className={cn(
                        "text-xs font-bold transition-all duration-500",
                        isActive
                            ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-purple-500"
                            : "text-zinc-700 dark:text-zinc-200"
                    )}>
                        rsuyash
                    </span>
                </div>

                {/* Links (Reveal on Active) */}
                <div className={cn(
                    "flex items-center gap-1 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)]",
                    isActive
                        ? "max-w-[120px] ml-3 pl-3 opacity-100 border-l border-zinc-200 dark:border-zinc-700"
                        : "max-w-0 opacity-0 border-l-0"
                )}>

                    <a href="https://www.linkedin.com/in/rsuyash/" target="_blank" rel="noopener noreferrer"
                        className="p-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 text-zinc-400 hover:text-blue-600 transition-colors" title="LinkedIn">
                        <Linkedin className="h-3 w-3" />
                    </a>

                    <a href="https://www.instagram.com/r_suyash1/" target="_blank" rel="noopener noreferrer"
                        className="p-1 rounded-full hover:bg-pink-100 dark:hover:bg-pink-900/30 text-zinc-400 hover:text-pink-600 transition-colors" title="Instagram">
                        <Instagram className="h-3 w-3" />
                    </a>

                    <a href="https://rsuyash.me" target="_blank" rel="noopener noreferrer"
                        className="p-1 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 text-zinc-400 hover:text-purple-600 transition-colors" title="Portfolio">
                        <Globe className="h-3 w-3" />
                    </a>
                </div>

            </div>

            {/* Ambient Glow */}
            <div className={cn(
                "absolute inset-0 -z-10 bg-emerald-500/20 rounded-full blur-xl transition-opacity duration-700",
                isActive ? "opacity-100" : "opacity-0"
            )} />
        </div>
    );
}
