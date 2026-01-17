export interface Certification {
    id: number;
    title: string;
    image: string; // Featured image or specific file icon
    content?: string; // Description
    details: {
        certNumber: string;
        authority: string;
        fileUrl: string;
        validUntil?: string;
        type: 'iso' | 'fco' | 'cib' | 'lab' | 'other';
        standard?: string; // New
        scope?: string;    // New
        relatedProduct?: { id: number; name: string; slug: string }; // New
    }
}
