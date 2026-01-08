import fs from 'fs';
import path from 'path';
import { Product } from '@/types/product';

const dataDirectory = path.join(process.cwd(), 'data/products');

export async function getAllProducts(): Promise<Product[]> {
    // Ensure directory exists
    if (!fs.existsSync(dataDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(dataDirectory);
    const products = fileNames
        .filter((fileName) => fileName.endsWith('.json'))
        .map((fileName) => {
            const fullPath = path.join(dataDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            // Combine filename ID with content
            const productData = JSON.parse(fileContents);
            return {
                ...productData,
                id: fileName.replace(/\.json$/, ''),
            };
        });

    return products;
}

export async function getProductById(id: string): Promise<Product | null> {
    const fullPath = path.join(dataDirectory, `${id}.json`);
    if (!fs.existsSync(fullPath)) {
        return null;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const productData = JSON.parse(fileContents);
    return {
        ...productData,
        id: id
    };
}

export async function getRelatedProducts(category: string, currentId: string): Promise<Product[]> {
    const allProducts = await getAllProducts();
    return allProducts
        .filter(p => p.category === category && p.id !== currentId)
        .slice(0, 4);
}
