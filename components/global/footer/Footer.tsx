import Link from "next/link";
import Image from "next/image";
import Container from "@/components/global/ui/Container";
import SocialMediaIcons from "./SocialMediaIcons";
import { getSiteConfig } from "@/lib/cms";
import { Mail, MapPin, Phone, ArrowRight, Leaf, ChevronRight } from "lucide-react";
import RsuyashSignature from "../rsuyash-signature/RsuyashSignature";

export default async function Footer() {
    // 1. Fetch Global Settings from CMS
    const config = await getSiteConfig();

    // 2. Default Values (If CMS is empty)
    const info = {
        address: config?.hqAddress || "Pune, Maharashtra, India",
        phone: config?.phone || "+91 99999 99999",
        email: config?.email || "contact@farmerlift.in",
        aboutText: config?.footerText || "Empowering farmers with world-class agricultural inputs and technology."
    };

    const footerLinks = {
        company: [
            { label: "About Us", href: "/about" },
            { label: "Careers", href: "/careers" },
            { label: "Blog", href: "/blog" },
            { label: "Contact", href: "/contact" },
        ],
        resources: [
            { label: "Catalogue", href: "/catalogue" },
            { label: "Photo Gallery", href: "/gallery/photos" },
            { label: "Video Gallery", href: "/gallery/videos" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
        ],
    };

    return (
        <footer className="relative bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white overflow-hidden transition-colors duration-300">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-emerald-200/40 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-60 dark:opacity-40"></div>
                <div className="absolute bottom-0 right-0 w-[40%] h-[60%] bg-emerald-100/40 dark:bg-emerald-800/10 rounded-full blur-3xl opacity-50 dark:opacity-30"></div>
            </div>

            <Container className="relative z-10 pt-20 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

                    {/* Brand Column (Span 4) */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="inline-block group">
                            <div className="relative h-14 w-56 transition-transform group-hover:scale-105 duration-300">
                                <Image
                                    src="/images/farmerlift_main_transparent.png"
                                    alt="FarmerLift"
                                    fill
                                    className="object-contain object-left dark:brightness-0 dark:invert"
                                />
                            </div>
                        </Link>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-sm">
                            {info.aboutText}
                        </p>

                        {/* Newsletter / CTA Box */}
                        <div className="bg-white dark:bg-white/5 backdrop-blur-sm border border-emerald-100 dark:border-white/10 rounded-2xl p-6 mt-8 shadow-sm dark:shadow-none">
                            <div className="flex items-center gap-3 mb-3 text-emerald-600 dark:text-emerald-400 font-semibold">
                                <Leaf className="h-5 w-5" />
                                <span>Join the Movement</span>
                            </div>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4">Subscribe for the latest farming tips and updates.</p>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Enter email or mobile number"
                                    className="bg-zinc-50 dark:bg-black/30 border border-zinc-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 w-full transition-colors"
                                />
                                <button className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-lg transition-colors shadow-md shadow-emerald-600/20" aria-label="Subscribe">
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Links Column (Span 2) */}
                    <div className="lg:col-span-2 lg:col-start-6">
                        <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-6 font-outfit">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all text-sm font-medium flex items-center group"
                                    >
                                        <ChevronRight className="h-3 w-3 mr-2 text-emerald-500/50 group-hover:text-emerald-500 transition-colors" />
                                        <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Column (Span 2) */}
                    <div className="lg:col-span-2">
                        <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-6 font-outfit">Gallery</h3>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all text-sm font-medium flex items-center group"
                                    >
                                        <ChevronRight className="h-3 w-3 mr-2 text-emerald-500/50 group-hover:text-emerald-500 transition-colors" />
                                        <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column (Span 3) */}
                    <div className="lg:col-span-3">
                        <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-6 font-outfit">Contact Us</h3>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-4 group">
                                <div className="p-2 bg-white dark:bg-white/5 border border-zinc-100 dark:border-white/5 rounded-lg group-hover:border-emerald-500/30 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 transition-colors shadow-sm dark:shadow-none">
                                    <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
                                </div>
                                <span className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                                    {info.address}
                                </span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="p-2 bg-white dark:bg-white/5 border border-zinc-100 dark:border-white/5 rounded-lg group-hover:border-emerald-500/30 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 transition-colors shadow-sm dark:shadow-none">
                                    <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
                                </div>
                                <a href={`tel:${info.phone}`} className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-white transition-colors text-sm font-medium">
                                    {info.phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="p-2 bg-white dark:bg-white/5 border border-zinc-100 dark:border-white/5 rounded-lg group-hover:border-emerald-500/30 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 transition-colors shadow-sm dark:shadow-none">
                                    <Mail className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
                                </div>
                                <a href={`mailto:${info.email}`} className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-white transition-colors text-sm font-medium">
                                    {info.email}
                                </a>
                            </li>
                        </ul>

                        <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-white/5">
                            <p className="text-xs text-zinc-500 mb-4 font-medium uppercase tracking-wider">Follow Us</p>
                            <SocialMediaIcons links={config?.social} />
                        </div>
                    </div>

                </div>

                <div className="border-t border-zinc-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-zinc-500">
                    <p>© {new Date().getFullYear()} FarmerLift. All rights reserved. <span className="text-zinc-400 dark:text-zinc-600">v0.1.1-ci</span></p>

                    {/* Developer Credit */}
                    <RsuyashSignature />

                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-emerald-600 dark:hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-emerald-600 dark:hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/sitemap" className="hover:text-emerald-600 dark:hover:text-white transition-colors">Sitemap</Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}