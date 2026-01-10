"use client";

import { Package, Sprout, Leaf, Zap, Droplets, FlaskConical, Microscope } from "lucide-react";

interface ProductPlaceholderProps {
    name: string;
    category?: string;
    className?: string;
}

const ProductPlaceholder = ({ name, category = '', className = '' }: ProductPlaceholderProps) => {
    // Generate a consistent color based on the first char of the product name
    const getGradient = (char: string) => {
        const charCode = char.charCodeAt(0);
        const gradients = [
            "from-emerald-100 to-teal-50 dark:from-emerald-900/40 dark:to-teal-900/20",
            "from-green-100 to-lime-50 dark:from-green-900/40 dark:to-lime-900/20",
            "from-teal-100 to-cyan-50 dark:from-teal-900/40 dark:to-cyan-900/20",
            "from-lime-100 to-emerald-50 dark:from-lime-900/40 dark:to-emerald-900/20",
            "from-cyan-100 to-blue-50 dark:from-cyan-900/40 dark:to-blue-900/20"
        ];
        return gradients[charCode % gradients.length];
    };

    const getIcon = (cat: string) => {
        const lowerCat = cat.toLowerCase();
        if (lowerCat.includes('fertilizer')) return Sprout;
        if (lowerCat.includes('pesticide')) return Zap;
        if (lowerCat.includes('seed')) return Leaf;
        if (lowerCat.includes('machinery')) return Droplets; // Just using droplets for now or others
        if (lowerCat.includes('chemical') || lowerCat.includes('acid')) return FlaskConical;
        if (lowerCat.includes('micronutrient')) return Microscope;
        return Package;
    };

    const gradientClass = getGradient(name ? name[0] : 'A');
    const Icon = getIcon(category);

    return (
        <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${gradientClass} ${className} relative overflow-hidden group`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Large Icon */}
            <div className="relative z-10 p-4 rounded-full bg-white/40 dark:bg-black/20 backdrop-blur-sm shadow-sm ring-1 ring-white/50 dark:ring-white/10 group-hover:scale-110 transition-transform duration-500">
                <Icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400 opacity-80" />
            </div>

            {/* Auto-Generated Initials for Brand/Product */}
            <span className="absolute bottom-4 font-bold text-[10px] tracking-[0.2em] text-emerald-800/40 dark:text-emerald-100/30 uppercase">
                {name?.substring(0, 3)}
            </span>
        </div>
    );
};

export default ProductPlaceholder;
