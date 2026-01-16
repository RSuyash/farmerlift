"use client"

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product, FertilizerSpecs, PesticideSpecs, SeedSpecs, MachinerySpecs } from "@/types/product";
import { ChevronRight, Heart, Share2, ShoppingCart, Truck, ShieldCheck, Leaf, Check, MessageCircle, Phone, Info, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductImage from "@/components/ui/ProductImage";

export default function ProductDetailView({ product }: { product: Product }) {
    const [activeImage, setActiveImage] = useState(product.images[0] || '');

    // Determine discount if price is a number
    let discount = 0;
    if (typeof product.price === 'number' && product.mrp > 0) {
        discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
    }

    // Format Price for Message
    const priceText = typeof product.price === 'number' ? `₹${product.price}` : product.price;

    // Enhanced WhatsApp Message
    const whatsAppMessage = encodeURIComponent(
        `Hi FarmerLift, I am interested in *${product.name}*.\n\nSKU: ${product.sku || 'N/A'}\nPrice: ${priceText}\n\nPlease share more details and availability.`
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
                    <div className="lg:col-span-6 space-y-6">
                        <div className="relative h-[400px] lg:h-[450px] w-full bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-8 overflow-hidden group">
                            <ProductImage
                                src={activeImage}
                                alt={product.name}
                                productName={product.name}
                                category={product.category}
                                fill
                                className="object-contain max-h-full max-w-full transition-transform duration-500 group-hover:scale-105 will-change-transform"
                                priority
                            />

                            {discount > 0 && (
                                <div className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
                                    SAVE {discount}%
                                </div>
                            )}
                            <button className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full text-zinc-600 dark:text-zinc-300 hover:text-red-500 dark:hover:text-red-400 transition-colors z-20">
                                <Heart className="h-5 w-5" />
                            </button>
                        </div>

                        {product.images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide justify-center">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(img)}
                                        className={`relative w-16 h-16 rounded-xl border-2 bg-zinc-50 dark:bg-zinc-900 p-2 flex-shrink-0 transition-all ${activeImage === img ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-transparent hover:border-zinc-300 dark:hover:border-zinc-700'}`}
                                    >
                                        <Image src={img} alt="" width={64} height={64} className="w-full h-full object-contain" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info Section */}
                    <div className="lg:col-span-6 flex flex-col">
                        <div className="mb-4">
                            <span className="text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
                                {product.brand}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white font-outfit leading-tight mb-4">
                            {product.name}
                        </h1>

                        {typeof product.price === 'number' && (
                            <div className="flex items-end gap-3 mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-6">
                                <span className="text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">₹{product.price}</span>
                                <div className="flex flex-col mb-1.5">
                                    {product.mrp > product.price && (
                                        <span className="text-base text-zinc-400 line-through font-medium">₹{product.mrp}</span>
                                    )}
                                    <span className="text-xs text-emerald-600 font-medium">Inclusive of all taxes</span>
                                </div>
                            </div>
                        )}

                        {/* Description Short */}
                        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6 text-base">
                            {product.description}
                        </p>

                        {/* Value Props */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="flex items-center gap-3 p-3 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-900/20">
                                <Truck className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                                <div>
                                    <span className="block font-bold text-xs text-zinc-900 dark:text-white">Fast Delivery</span>
                                    <span className="text-[10px] text-zinc-500">To your farm gate</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/20">
                                <ShieldCheck className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                <div>
                                    <span className="block font-bold text-xs text-zinc-900 dark:text-white">Verified Authentic</span>
                                    <span className="text-[10px] text-zinc-500">Direct from manufacturer</span>
                                </div>
                            </div>
                        </div>

                        {/* Available Packs Chips */}
                        {product.availablePackSizes && product.availablePackSizes.length > 0 && (
                            <div className="mb-8">
                                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Package className="h-4 w-4" /> Available Packs
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {product.availablePackSizes.map((size, idx) => (
                                        <div
                                            key={idx}
                                            className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:border-emerald-500 hover:text-emerald-600 dark:hover:border-emerald-500 dark:hover:text-emerald-400 transition-colors cursor-default"
                                        >
                                            {size}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Desktop CTA */}
                        <div className="hidden lg:flex flex-col gap-3 mb-8">
                            <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-center gap-4 w-full p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-200 dark:shadow-none transition-all duration-300 hover:-translate-y-1"
                            >
                                <MessageCircle className="h-6 w-6" />
                                <div className="flex flex-col items-start">
                                    <span className="font-bold text-base leading-none mb-0.5">Get Best Price</span>
                                    <span className="text-[10px] font-medium text-emerald-100 opacity-90">on WhatsApp</span>
                                </div>
                                <ChevronRight className="ml-auto h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Detailed Tabs */}
                <div className="mt-12 lg:mt-16">
                    <Tabs defaultValue="key-benefits" className="w-full max-w-5xl mx-auto">
                        <TabsList className="w-full flex flex-wrap justify-center sm:justify-between bg-transparent border-b border-zinc-200 dark:border-zinc-800 rounded-none h-auto p-0 mb-8">
                            {['Key Benefits', 'Specifications', 'Method of Application', 'QR Details'].map((tab) => {
                                const val = tab.toLowerCase().replace(/ /g, '-');
                                return (
                                    <TabsTrigger
                                        key={val}
                                        value={val}
                                        className="flex-1 min-w-[140px] bg-transparent border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-700 data-[state=active]:shadow-none rounded-none px-2 py-3 text-sm sm:text-base font-medium text-zinc-500 hover:text-zinc-700 whitespace-nowrap"
                                    >
                                        {tab}
                                    </TabsTrigger>
                                )
                            })}
                        </TabsList>

                        {/* 1. Key Benefits */}
                        <TabsContent value="key-benefits" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-8">
                                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                    <Leaf className="h-5 w-5 text-emerald-600" /> Key Benefits
                                </h3>
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
                            </div>
                        </TabsContent>

                        {/* 2. Specifications */}
                        <TabsContent value="specifications" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-8">
                                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                    <Info className="h-5 w-5 text-emerald-600" /> Technical Specifications
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                                    <SpecRow label="Brand Name" value={product.brand} />
                                    <SpecRow label="Manufacturer" value={product.manufacturer} />
                                    <SpecRow label="Country of Origin" value={product.countryOfOrigin} />
                                    <SpecRow label="SKU Code" value={product.sku} />

                                    {/* Category Specific Specs */}
                                    {product.category === 'fertilizer' && (
                                        <>
                                            <SpecRow label="Type" value={(product.specifications as FertilizerSpecs).type} />
                                            <SpecRow label="Form" value={(product.specifications as FertilizerSpecs).form} />
                                            <SpecRow label="NPK Ratio" value={(product.specifications as FertilizerSpecs).npkRatio} />
                                            <SpecRow label="Solubility" value={(product.specifications as FertilizerSpecs).solubility} />
                                        </>
                                    )}
                                    {product.category === 'pesticide' && (
                                        <>
                                            <SpecRow label="Chemical Group" value={(product.specifications as PesticideSpecs).chemicalGroup} />
                                            <SpecRow label="Active Ingredient" value={(product.specifications as PesticideSpecs).activeIngredients[0]?.name} />
                                            <SpecRow label="Formulation" value={(product.specifications as PesticideSpecs).activeIngredients[0]?.formulation} />
                                        </>
                                    )}
                                    {product.category === 'seed' && (
                                        <>
                                            <SpecRow label="Variety" value={(product.specifications as SeedSpecs).variety} />
                                            <SpecRow label="Duration" value={(product.specifications as SeedSpecs).duration} />
                                            <SpecRow label="Season" value={(product.specifications as SeedSpecs).season?.join(', ')} />
                                        </>
                                    )}
                                    {product.category === 'machinery' && (
                                        <>
                                            <SpecRow label="Power Source" value={(product.specifications as MachinerySpecs).powerSource} />
                                            <SpecRow label="Capacity" value={(product.specifications as MachinerySpecs).capacity} />
                                            <SpecRow label="Warranty" value={(product.specifications as MachinerySpecs).warranty} />
                                        </>
                                    )}
                                </div>
                            </div>
                        </TabsContent>

                        {/* 3. Method of Application */}
                        <TabsContent value="method-of-application" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-8">
                                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                    <Leaf className="h-5 w-5 text-emerald-600" /> Method of Application
                                </h3>
                                {(product.applicationDescription || product.dosageDescription || product.targetCropsDescription) ? (
                                    <div className="space-y-4">
                                        {/* Render as Paragraphs since it's description text now, not just rows */}
                                        {product.applicationDescription && (
                                            <div>
                                                <h4 className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 mb-1">Application Method</h4>
                                                <p className="text-zinc-900 dark:text-zinc-100 whitespace-pre-line leading-relaxed">{product.applicationDescription}</p>
                                            </div>
                                        )}
                                        {product.dosageDescription && (
                                            <div>
                                                <h4 className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 mb-1">Dosage</h4>
                                                <p className="text-zinc-900 dark:text-zinc-100 whitespace-pre-line leading-relaxed">{product.dosageDescription}</p>
                                            </div>
                                        )}
                                        {product.targetCropsDescription && (
                                            <div>
                                                <h4 className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 mb-1">Target Crops</h4>
                                                <p className="text-zinc-900 dark:text-zinc-100 whitespace-pre-line leading-relaxed">{product.targetCropsDescription}</p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                                        {product.category === 'fertilizer' && (
                                            <>
                                                <SpecRow label="Application Method" value={(product.specifications as FertilizerSpecs).applicationMethod?.join(', ')} />
                                                <SpecRow label="Dose Per Acre" value={(product.specifications as FertilizerSpecs).dosePerAcre} />
                                                <SpecRow label="Target Crops" value={(product.specifications as FertilizerSpecs).targetCrops?.join(', ')} />
                                            </>
                                        )}
                                        {product.category === 'pesticide' && (
                                            <>
                                                <SpecRow label="Application Method" value={(product.specifications as PesticideSpecs).applicationMethod} />
                                                <SpecRow label="Dosage" value={(product.specifications as PesticideSpecs).dosage} />
                                                <SpecRow label="Target Pests" value={(product.specifications as PesticideSpecs).targetPests?.join(', ')} />
                                                <SpecRow label="Target Crops" value={(product.specifications as PesticideSpecs).targetCrops?.join(', ')} />
                                                <SpecRow label="Pre-Harvest Interval (PHI)" value={(product.specifications as PesticideSpecs).phi ? `${(product.specifications as PesticideSpecs).phi} Days` : undefined} />
                                            </>
                                        )}
                                        {product.category === 'seed' && (
                                            <>
                                                <SpecRow label="Sowing Method" value={(product.specifications as SeedSpecs).sowingMethod} />
                                                <SpecRow label="Sowing Distance" value={(product.specifications as SeedSpecs).sowingDistance} />
                                            </>
                                        )}
                                        {product.category === 'machinery' && (
                                            <div className="text-zinc-500 italic">Refer to the operation manual provided with the machinery.</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        {/* 4. QR Details */}
                        <TabsContent value="qr-details" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 flex flex-col items-center justify-center text-center">
                                <div className="bg-white p-4 rounded-xl border border-zinc-100 shadow-sm mb-4">
                                    {product.qrCodeImage ? (
                                        <div className="relative w-48 h-48">
                                            <Image
                                                src={product.qrCodeImage}
                                                alt="Authenticity QR Code"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-48 h-48 bg-zinc-100 flex items-center justify-center rounded-lg">
                                            <span className="text-zinc-400 text-sm font-mono">NO QR AVAILABLE</span>
                                        </div>
                                    )}
                                </div>
                                <h3 className="font-bold text-lg mb-2">Scan to Verify Authenticity</h3>
                                <p className="text-zinc-500 text-sm max-w-md">
                                    {(product.batchDetails) ? product.batchDetails : "Scan the QR code found on the physical product packaging to verify authenticity, view batch details, and access detailed usage instructions."}
                                </p>
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
