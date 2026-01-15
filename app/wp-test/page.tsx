'use client';

import { useState } from 'react';
import { mapWpProductToApp } from '@/lib/mapper';
import { Product } from '@/types/product';

export default function WpTestPage() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [raw, setRaw] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        setProducts([]);
        setRaw(null);

        try {
            // Fetching 5 products with embedded data (images, etc.)
            const response = await fetch('https://admin.farmerlift.in/wp-json/wp/v2/product?per_page=5&_embed');

            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setRaw(data);

            const mappedData = data.map((item: any) => mapWpProductToApp(item));
            setProducts(mappedData);

        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto font-sans">
            <h1 className="text-3xl font-bold mb-6">WordPress Data Integration Test</h1>

            <div className="mb-8 p-4 bg-gray-50 rounded-lg border">
                <p className="mb-4 text-gray-700">
                    This page tests the connection to <code>admin.farmerlift.in</code> and the mapping logic in <code>lib/mapper.ts</code>.
                    <br />
                    It does <strong>not</strong> affect the existing JSON database.
                </p>
                <button
                    onClick={fetchData}
                    disabled={loading}
                    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 font-medium transition-colors"
                >
                    {loading ? 'Fetching...' : 'Fetch Test Data'}
                </button>

                {error && (
                    <div className="mt-4 p-3 bg-red-100 text-red-700 rounded border border-red-200">
                        Error: {error}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Mapped Results Column */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        Mapped Products
                        <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                            {products.length}
                        </span>
                    </h2>

                    {products.length === 0 && !loading && <p className="text-gray-500 italic">No data fetched yet.</p>}

                    <div className="space-y-4">
                        {products.map((p) => (
                            <div key={p.id} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex gap-4">
                                    <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg">{p.name}</h3>
                                        <div className="flex gap-2 text-sm text-gray-600 mb-2">
                                            <span className="bg-gray-100 px-2 py-0.5 rounded capitalize">{p.category}</span>
                                            <span className="font-semibold text-green-700">₹{p.price}</span>
                                        </div>
                                        <div className="text-xs text-gray-500 font-mono mt-2">
                                            ID: {p.id}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 pt-3 border-t text-sm grid grid-cols-2 gap-2">
                                    <div className="text-gray-600">
                                        <span className="font-semibold">Brand:</span> {p.brand}
                                    </div>
                                    <div className="text-gray-600">
                                        <span className="font-semibold">Stock:</span> {p.stock}
                                    </div>
                                </div>
                                <details className="mt-2 text-xs text-gray-400 cursor-pointer">
                                    <summary className="hover:text-gray-600">View Full Object</summary>
                                    <pre className="mt-2 p-2 bg-gray-50 rounded overflow-auto max-h-40 text-gray-800">
                                        {JSON.stringify(p, null, 2)}
                                    </pre>
                                </details>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Raw Response Column */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Raw WP Response (First Item)</h2>
                    <div className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-auto max-h-[800px] text-sm font-mono leading-relaxed">
                        {raw ? (
                            JSON.stringify(raw[0], null, 2)
                        ) : (
                            <span className="text-gray-500">// Raw JSON data will appear here...</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
