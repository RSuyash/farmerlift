"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import ProductPlaceholder from "./ProductPlaceholder";

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

    useEffect(() => {
        setImageSrc(src);
        setError(false);
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
        <Image
            src={imageSrc}
            alt={alt}
            fill={fill}
            width={!fill ? width : undefined}
            height={!fill ? height : undefined}
            className={className}
            sizes={sizes}
            priority={priority}
            onError={() => setError(true)}
        />
    );
}
