"use client"

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product, FertilizerSpecs, PesticideSpecs, SeedSpecs, MachinerySpecs } from "@/types/product";
import { ChevronRight, Heart, Share2, ShoppingCart, Truck, ShieldCheck, Leaf, Check, MessageCircle, Phone, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductDetailView({ product }: { product: Product }) {
    const [activeImage, setActiveImage] = useState(product.images[0] || '/images/placeholder.png');
    const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

    // Enhanced WhatsApp Message
    const whatsAppMessage = encodeURIComponent(
        `Hi FarmerLift, I am interested in *${product.name}*.\n\nSKU: ${product.sku || 'N/A'}\nPrice: ₹${product.price}\n\nPlease share more details and availability.`
    );
    // Updated Contact Number
    const waLink = `https://wa.me/919226411841?text=${whatsAppMessage}`;

    // Helper to render spec table row
    const SpecRow = ({ label, value }: { label: string, value: string | number | undefined }) => (
        value ? (
            <div className="flex justify-between py-3 border-b border-zinc-100 dark:border-zinc-800 last:border-0 group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 px-2 rounded-lg transition-colors">
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{label}</span>
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 text-right">{value}</span>
            </div>
        ) : null
    );

    return (
        <div className="min-h-screen bg-white dark:bg-black pb-28 lg:pb-20">
            {/* Breadcrumb */}
            <div className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                <div className="container-width py-4 flex items-center gap-2 text-xs md:text-sm text-zinc-500 flex-wrap">
                    <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
                    <ChevronRight className="h-3 w-3" />
                    <Link href="/products" className="hover:text-emerald-600 transition-colors">Products</Link>
                    <ChevronRight className="h-3 w-3" />
                    <Link href={`/products?category=${product.category}`} className="hover:text-emerald-600 transition-colors capitalize">{product.category}</Link>
                    <ChevronRight className="h-3 w-3" />
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium truncate max-w-[150px] md:max-w-xs">{product.name}</span>
                </div>
            </div>

            <div className="container-width py-8 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    {/* Gallery Section */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="aspect-square lg:aspect-[4/3] relative bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-8 overflow-hidden group">
                            <Image
                                src={activeImage}
                                alt={product.name}
                                width={800}
                                height={800}
                                className="object-contain max-h-full max-w-full transition-transform duration-500 group-hover:scale-105 will-change-transform"
                                priority
                            />
                            {discount > 0 && (
                                <div className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
                                    SAVE {discount}%
                                </div>
                            )}
                            <button className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full text-zinc-600 dark:text-zinc-300 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                                <Heart className="h-5 w-5" />
                            </button>
                        </div>

                        {product.images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(img)}
                                        className={`relative w-24 h-24 rounded-xl border-2 bg-zinc-50 dark:bg-zinc-900 p-2 flex-shrink-0 transition-all ${activeImage === img ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-transparent hover:border-zinc-300 dark:hover:border-zinc-700'}`}
                                    >
                                        <Image src={img} alt="" width={96} height={96} className="w-full h-full object-contain" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info Section */}
                    <div className="lg:col-span-5 flex flex-col">
                        <div className="mb-4">
                            <span className="text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
                                {product.brand}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white font-outfit leading-tight mb-4">
                            {product.name}
                        </h1>

                        <div className="flex items-end gap-3 mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-8">
                            <span className="text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">₹{product.price}</span>
                            <div className="flex flex-col mb-1.5">
                                <span className="text-lg text-zinc-400 line-through font-medium">₹{product.mrp}</span>
                                <span className="text-sm text-emerald-600 font-medium">Inclusive of all taxes</span>
                            </div>
                        </div>

                        {/* Description Short */}
                        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8">
                            {product.description}
                        </p>

                        {/* Value Props */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="flex items-start gap-3 p-4 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/20">
                                <Truck className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <span className="block font-bold text-sm text-zinc-900 dark:text-white">Fast Delivery</span>
                                    <span className="text-xs text-zinc-500">To your farm gate</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/20">
                                <ShieldCheck className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <span className="block font-bold text-sm text-zinc-900 dark:text-white">Verified Authentic</span>
                                    <span className="text-xs text-zinc-500">Direct from manufacturer</span>
                                </div>
                            </div>
                        </div>

                        {/* Call to Action - Desktop */}
                        <div className="hidden lg:flex flex-col gap-4 mb-8">
                            <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-center gap-4 w-full p-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-lg shadow-emerald-200 dark:shadow-none transition-all duration-300 hover:-translate-y-1"
                            >
                                <MessageCircle className="h-8 w-8" />
                                <div className="flex flex-col items-start">
                                    <span className="font-bold text-lg leading-none mb-1">Get Best Price</span>
                                    <span className="text-xs font-medium text-emerald-100 opacity-90">on WhatsApp</span>
                                </div>
                                <ChevronRight className="ml-auto h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </a>
                            <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                Responds within 5 minutes
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Tabs */}
                <div className="mt-16 lg:mt-24">
                    <Tabs defaultValue="specs" className="w-full max-w-4xl mx-auto">
                        <TabsList className="w-full flex justify-center bg-transparent border-b border-zinc-200 dark:border-zinc-800 rounded-none h-auto p-0 mb-8 space-x-8">
                            <TabsTrigger
                                value="specs"
                                className="bg-transparent border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-700 data-[state=active]:shadow-none rounded-none px-4 py-3 text-lg font-medium text-zinc-500"
                            >
                                Specifications
                            </TabsTrigger>
                            <TabsTrigger
                                value="features"
                                className="bg-transparent border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-700 data-[state=active]:shadow-none rounded-none px-4 py-3 text-lg font-medium text-zinc-500"
                            >
                                Key Features
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="features" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {product.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors">
                                        <div className="mt-1 h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center flex-shrink-0">
                                            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <span className="text-zinc-700 dark:text-zinc-300 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="specs" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-8">
                                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                    <Info className="h-5 w-5 text-emerald-600" /> Technical Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                                    <SpecRow label="Brand Name" value={product.brand} />
                                    <SpecRow label="Manufacturer" value={product.manufacturer} />
                                    <SpecRow label="Country of Origin" value={product.countryOfOrigin} />
                                    <SpecRow label="Net Weight / Volume" value={product.netWeight} />
                                    <SpecRow label="SKU Code" value={product.sku} />

                                    {/* Dynamic Specs based on Category */}
                                    {product.category === 'fertilizer' && (
                                        <>
                                            <SpecRow label="Fertilizer Type" value={(product.specifications as FertilizerSpecs).type} />
                                            <SpecRow label="Physical Form" value={(product.specifications as FertilizerSpecs).form} />
                                            <SpecRow label="NPK Ratio" value={(product.specifications as FertilizerSpecs).npkRatio} />
                                            <SpecRow label="Water Solubility" value={(product.specifications as FertilizerSpecs).solubility} />
                                            <SpecRow label="Recommended Dose" value={(product.specifications as FertilizerSpecs).dosePerAcre} />
                                        </>
                                    )}

                                    {product.category === 'pesticide' && (
                                        <>
                                            <SpecRow label="Chemical Group" value={(product.specifications as PesticideSpecs).chemicalGroup} />
                                            <SpecRow label="Active Ingredient" value={(product.specifications as PesticideSpecs).activeIngredients[0]?.name} />
                                            <SpecRow label="Target Application" value={(product.specifications as PesticideSpecs).targetPests.slice(0, 3).join(", ")} />
                                            <SpecRow label="Dosage" value={(product.specifications as PesticideSpecs).dosage} />
                                            <SpecRow label="Pre-Harvest Interval" value={(product.specifications as PesticideSpecs).phi + ' Days'} />
                                        </>
                                    )}

                                    {product.category === 'seed' && (
                                        <>
                                            <SpecRow label="Seed Variety" value={(product.specifications as SeedSpecs).variety} />
                                            <SpecRow label="Crop Duration" value={(product.specifications as SeedSpecs).duration} />
                                            <SpecRow label="Germination Rate" value={(product.specifications as SeedSpecs).germinationPercentage + '%'} />
                                            <SpecRow label="Yield Potential" value={(product.specifications as SeedSpecs).yieldPotential} />
                                        </>
                                    )}
                                    {product.category === 'machinery' && (
                                        <>
                                            <SpecRow label="Power Source" value={(product.specifications as MachinerySpecs).powerSource} />
                                            <SpecRow label="Operating Capacity" value={(product.specifications as MachinerySpecs).capacity} />
                                            <SpecRow label="Machine Weight" value={(product.specifications as MachinerySpecs).weight} />
                                            <SpecRow label="Warranty Period" value={(product.specifications as MachinerySpecs).warranty} />
                                        </>
                                    )}
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Sticky Mobile Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800 lg:hidden z-40 pb-safe">
                <div className="flex gap-3">
                    <a
                        href="tel:+919226411841"
                        className="flex-1 flex items-center justify-center gap-2 h-14 rounded-xl border-2 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 font-bold bg-white dark:bg-black active:bg-zinc-50 transition-colors"
                    >
                        <Phone className="h-5 w-5" /> Call Now
                    </a>
                    <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-[2] flex items-center justify-center gap-2 h-14 bg-emerald-600 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform"
                    >
                        <MessageCircle className="h-5 w-5" />
                        <div className="flex flex-col items-start leading-tight">
                            <span className="text-sm">Get Best Price</span>
                            <span className="text-[10px] opacity-90 font-medium">on WhatsApp</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
