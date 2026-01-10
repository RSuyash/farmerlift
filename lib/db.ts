import fs from 'fs';
import path from 'path';
import { Product } from '@/types/product';

const dataDirectory = path.join(process.cwd(), 'data/products');
const categoriesPath = path.join(process.cwd(), 'data/categories.json');

export interface Category {
    id: string;
    name: string;
    description: string;
    icon: string;
}

export async function getAllCategories(): Promise<Category[]> {
    if (!fs.existsSync(categoriesPath)) return [];
    const fileContents = fs.readFileSync(categoriesPath, 'utf8');
    return JSON.parse(fileContents);
}

export async function getCategoryById(id: string): Promise<Category | null> {
    const categories = await getAllCategories();
    return categories.find(c => c.id === id) || null;
}

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
            try {
                const fileContents = fs.readFileSync(fullPath, 'utf8');
                const productData = JSON.parse(fileContents);
                return {
                    ...productData,
                    id: fileName.replace(/\.json$/, ''),
                };
            } catch (e) {
                console.error(`Error parsing product ${fileName}:`, e);
                return null;
            }
        })
        .filter((p): p is Product => p !== null);

    return products;
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
    const allProducts = await getAllProducts();
    // Match strict category ID
    return allProducts.filter(p => p.category === categoryId);
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
