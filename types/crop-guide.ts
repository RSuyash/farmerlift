
export interface CropGuideStage {
    name: string;
    description: string;
    products: number[]; // IDs of recommended products
}

export interface CropGuide {
    id: string; // Slug
    title: string;
    scientificName: string;
    duration: string;
    season: string[];
    image: string;
    videoUrl: string | null;
    content: string; // Main Body Content
    stages: CropGuideStage[];
}
