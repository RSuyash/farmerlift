"use client"

import { Product } from "@/types/product";
import { ShieldCheck, X, Beaker, Leaf, FlaskConical, FileText, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useCallback } from "react";

interface QRAuthPopupProps {
    product: Product;
    onClose: () => void;
}

export default function QRAuthPopup({ product, onClose }: QRAuthPopupProps) {
    const qr = product.qrTabDetails;

    // Close on Escape key
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
    }, [onClose]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden"; // Prevent scroll behind modal

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [handleKeyDown]);

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Product Authentication Details"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative z-10 w-full max-w-2xl mx-3 sm:mx-4 max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-white dark:bg-zinc-900 shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-400">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all active:scale-90"
                    aria-label="Close"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* === Header === */}
                <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 px-5 sm:px-8 pt-6 sm:pt-8 pb-8 sm:pb-10 text-white">
                    {/* Decorative circles */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
                    <div className="absolute -bottom-16 -left-8 w-48 h-48 bg-white/5 rounded-full" />

                    <div className="relative flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-3">
                                <ShieldCheck className="h-5 w-5 text-emerald-200 flex-shrink-0" />
                                <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">
                                    Verified Authentic
                                </span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold leading-tight mb-1 font-outfit">
                                {product.name}
                            </h2>
                            <p className="text-sm text-emerald-100/80">
                                Product Authentication & Regulatory Details
                            </p>
                        </div>

                        {/* QR Code */}
                        <div className="flex-shrink-0 bg-white rounded-xl p-2 shadow-lg">
                            {product.wordpressId ? (
                                <QRCodeSVG
                                    value={`https://farmerlift.in/qr/${product.wordpressId}`}
                                    size={72}
                                    level="H"
                                    includeMargin={false}
                                />
                            ) : (
                                <div className="w-[72px] h-[72px] bg-zinc-100 flex items-center justify-center rounded text-[9px] text-zinc-400">
                                    <QrCode className="h-8 w-8 text-zinc-300" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Gazette Order Badge */}
                    {qr?.gazetteNumber && (
                        <div className="relative mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/15 backdrop-blur-sm rounded-full border border-white/20">
                            <FileText className="h-3 w-3 text-emerald-200" />
                            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-emerald-50">
                                {qr.gazetteNumber}
                            </span>
                        </div>
                    )}
                </div>

                {/* === Product Title (if different from product name) === */}
                {qr?.title && qr.title !== product.name && (
                    <div className="px-5 sm:px-8 pt-5 pb-0">
                        <h3 className="text-base sm:text-lg font-bold text-emerald-700 dark:text-emerald-400 text-center uppercase tracking-tight">
                            {qr.title}
                        </h3>
                    </div>
                )}

                {/* === Info Cards === */}
                <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-3 sm:space-y-4">

                    {/* Composition Card */}
                    <div className="rounded-xl sm:rounded-2xl border border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/50 dark:bg-emerald-900/10 p-4 sm:p-5">
                        <div className="flex items-center gap-2.5 mb-3">
                            <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                                <FlaskConical className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h4 className="font-bold text-sm text-zinc-900 dark:text-white">
                                Guaranteed Composition
                            </h4>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300 whitespace-pre-line leading-relaxed pl-[42px]">
                            {qr?.composition || "Composition details are mentioned on the physical packaging."}
                        </p>
                    </div>

                    {/* 2-column: Crops + Dosage */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {/* Target Crops */}
                        <div className="rounded-xl sm:rounded-2xl border border-blue-100 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-900/10 p-4 sm:p-5">
                            <div className="flex items-center gap-2.5 mb-3">
                                <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                                    <Leaf className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h4 className="font-bold text-sm text-zinc-900 dark:text-white">
                                    Approved Crops
                                </h4>
                            </div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                                {qr?.crops || "All major field, fruit, and vegetable crops."}
                            </p>
                        </div>

                        {/* Dosage */}
                        <div className="rounded-xl sm:rounded-2xl border border-amber-100 dark:border-amber-900/30 bg-amber-50/50 dark:bg-amber-900/10 p-4 sm:p-5">
                            <div className="flex items-center gap-2.5 mb-3">
                                <div className="h-8 w-8 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                                    <Beaker className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                </div>
                                <h4 className="font-bold text-sm text-zinc-900 dark:text-white">
                                    Prescribed Dosage
                                </h4>
                            </div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-300 whitespace-pre-line leading-relaxed">
                                {qr?.dosage || "Refer to method of application or packaging."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* === Footer === */}
                <div className="px-5 sm:px-8 pb-5 sm:pb-6">
                    <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 text-center space-y-3">
                        <p className="text-[10px] sm:text-[11px] text-zinc-400 dark:text-zinc-500 leading-relaxed max-w-md mx-auto">
                            This electronic record is generated for product identification and authenticity verification under FarmerLift Quality Assurance guidelines.
                        </p>
                        <div className="flex items-center justify-center gap-3 text-[10px]">
                            <div className="flex items-center gap-1.5">
                                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                                <span className="font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">FarmerLift Verified</span>
                            </div>
                            <div className="h-3 w-px bg-zinc-200 dark:bg-zinc-700" />
                            <span className="font-mono text-zinc-400">ID: {product.wordpressId}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
