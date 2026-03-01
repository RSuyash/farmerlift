"use client"

import { Product } from "@/types/product";
import { ShieldCheck, X, Beaker, Leaf, FlaskConical, FileText, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useCallback } from "react";
import FormattedText from "@/components/ui/FormattedText";

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
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Product Authentication Details"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Card - Bottom sheet on mobile, centered modal on desktop */}
            <div className="relative z-10 w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white dark:bg-zinc-900 shadow-2xl border-t sm:border border-zinc-200 dark:border-zinc-800 animate-in fade-in slide-in-from-bottom-full sm:slide-in-from-bottom-8 sm:zoom-in-95 duration-300 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                {/* Mobile Pull Indicator */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/30 rounded-full sm:hidden z-30" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 p-2.5 rounded-full bg-white/20 sm:bg-zinc-100 dark:sm:bg-zinc-800 hover:bg-white/30 sm:hover:bg-zinc-200 dark:sm:hover:bg-zinc-700 text-white sm:text-zinc-500 dark:sm:text-zinc-400 sm:hover:text-zinc-900 dark:sm:hover:text-white backdrop-blur-sm sm:backdrop-blur-none transition-all active:scale-90"
                    aria-label="Close"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* === Header === */}
                <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 px-6 sm:px-10 pt-10 sm:pt-10 pb-8 sm:pb-10 text-white shadow-inner">
                    {/* Decorative circles */}
                    <div className="absolute -top-20 -right-10 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
                    <div className="absolute -bottom-20 -left-10 w-64 h-64 bg-emerald-900/50 rounded-full blur-2xl" />

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
                <div className="px-5 sm:px-10 py-6 sm:py-8 space-y-4 sm:space-y-6">

                    {/* Composition Card */}
                    <div className="rounded-2xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-900/10 p-5 sm:p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center shadow-inner">
                                <FlaskConical className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h4 className="font-bold text-base text-zinc-900 dark:text-white">
                                Guaranteed Composition
                            </h4>
                        </div>
                        <div className="pl-[52px]">
                            <FormattedText
                                text={qr?.composition || "Composition details are mentioned on the physical packaging."}
                                className="text-[15px] text-zinc-600 dark:text-zinc-300"
                            />
                        </div>
                    </div>

                    {/* 2-column: Crops + Dosage */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {/* Target Crops */}
                        <div className="rounded-2xl border border-blue-100 dark:border-blue-900/40 bg-blue-50/40 dark:bg-blue-900/10 p-5 sm:p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center shadow-inner">
                                    <Leaf className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h4 className="font-bold text-base text-zinc-900 dark:text-white">
                                    Approved Crops
                                </h4>
                            </div>
                            <p className="text-[15px] text-zinc-600 dark:text-zinc-300 leading-relaxed">
                                {qr?.crops || "All major field, fruit, and vegetable crops."}
                            </p>
                        </div>

                        {/* Dosage */}
                        <div className="rounded-2xl border border-amber-100 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-900/10 p-5 sm:p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-xl bg-amber-100 dark:bg-amber-900/60 flex items-center justify-center shadow-inner">
                                    <Beaker className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                </div>
                                <h4 className="font-bold text-base text-zinc-900 dark:text-white">
                                    Prescribed Dosage
                                </h4>
                            </div>
                            <FormattedText
                                text={qr?.dosage || "Refer to method of application or packaging."}
                                className="text-[15px] text-zinc-600 dark:text-zinc-300"
                            />
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
