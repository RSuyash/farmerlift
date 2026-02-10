"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import ProductPlaceholder from "./ProductPlaceholder";
import { cn } from "@/lib/utils";

interface ProductImageProps {
    src: string;
    alt: string;
    productName: string;
    category?: string;
    fill?: boolean;
    width?: number;
    height?: number;
    className?: string;
    sizes?: string;
    priority?: boolean;
}

export default function ProductImage({
    src,
    alt,
    productName,
    category,
    fill,
    width,
    height,
    className,
    sizes,
    priority
}: ProductImageProps) {
    const [error, setError] = useState(false);
    const [imageSrc, setImageSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setImageSrc(src);
        setError(false);
        setIsLoading(true);
    }, [src]);

    if (!imageSrc || error) {
        return (
            <ProductPlaceholder
                name={productName}
                category={category}
                className={className}
            />
        );
    }

    return (
        <div className={cn("relative overflow-hidden", fill && "w-full h-full")}>
             {isLoading && (
                <div className={cn(
                    "absolute inset-0 bg-zinc-200 dark:bg-zinc-800 animate-pulse z-10",
                    className // Pass classes to match rounded corners etc
                )} />
            )}
            <Image
                src={imageSrc}
                alt={alt}
                fill={fill}
                width={!fill ? width : undefined}
                height={!fill ? height : undefined}
                className={cn(
                    className,
                    "duration-700 ease-in-out",
                    isLoading ? "scale-110 blur-lg grayscale" : "scale-100 blur-0 grayscale-0"
                )}
                sizes={sizes}
                priority={priority}
                onLoad={() => setIsLoading(false)}
                onError={() => setError(true)}
                unoptimized={imageSrc.startsWith('/')}
            />
        </div>
    );
}
