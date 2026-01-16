export type ProductCategory = "fertilizer" | "pesticide" | "seed" | "machinery" | "growth_promoter";

export interface BaseProduct {
    id: string;
    name: string;
    brand: string;
    category: ProductCategory;
    price: number | string;
    mrp: number; // Maximum Retail Price for discount calc
    stock: number;
    isOrganic: boolean;
    description: string;
    sku: string;
    images: string[];
    features: string[];

    // Industrial Metadata
    manufacturer: string;
    countryOfOrigin: string;
    commonName?: string; // e.g., "Urea", "Glyphosate"
    packagingType?: string; // e.g., "HDPE Bag", "Bottle"
    netWeight?: string; // e.g., "50 kg", "1 L"

    // New Fields from WP Sync
    availablePackSizes?: string[];
    qrCodeImage?: string;
    batchDetails?: string;

    // Universal App Method / Dosage (overrides category specifics if needed)
    applicationDescription?: string;
    dosageDescription?: string;
    targetCropsDescription?: string;
}

export interface FertilizerSpecs {
    type: "organic" | "chemical" | "bio-fertilizer";
    form: "granule" | "liquid" | "water-soluble-powder";
    applicationMethod: ("basal" | "foliar" | "drip" | "broadcasting")[];
    npkRatio?: string; // e.g., "19:19:19"
    targetCrops: string[];
    dosePerAcre: string; // e.g., "50 kg"
    composition: {
        n: number; // Nitrogen %
        p: number; // Phosphorus %
        k: number; // Potassium %
        other?: string[]; // e.g., ["Zinc 0.5%", "Boron 0.2%"]
    };
    solubility: "low" | "medium" | "high" | "100%";
}

export interface PesticideSpecs {
    type: "insecticide" | "fungicide" | "herbicide" | "miticide";
    chemicalGroup: string; // e.g., "Organophosphate"
    activeIngredients: {
        name: string;
        concentration: string; // e.g., "30%"
        formulation: string; // e.g., "EC", "SC"
    }[];
    targetPests: string[]; // e.g., ["Aphids", "Bollworm"]
    targetCrops: string[];
    applicationMethod: "spray" | "drenching";
    dosage: string; // e.g., "2 ml/L"
    phi: number; // Pre-Harvest Interval in days
    rainFastness?: string; // e.g., "2 hours"
    toxicityLabel: "green" | "blue" | "yellow" | "red"; // Toxicology color code
}

export interface SeedSpecs {
    type: "hybrid" | "open-pollinated" | "gmo";
    crop: string; // e.g., "Tomato"
    variety: string; // e.g., "Abhilash"
    duration: string; // e.g., "60-65 days" (Maturity)
    germinationPercentage: number; // e.g., 70
    purityPercentage: number; // e.g., 98
    geneticPurity?: number;
    season: ("kharif" | "rabi" | "summer")[];
    sowingMethod: "dibbling" | "transplanting" | "broadcasting";
    sowingDistance: string; // e.g., "60x45 cm"
    yieldPotential?: string;
    resistanceFeatures?: string[]; // e.g., ["TLCV Resistant", "Bacterial Wilt Tolerant"]
}

export interface MachinerySpecs {
    type: "sprayer" | "pump" | "tool" | "harvester";
    powerSource?: "battery" | "petrol" | "manual" | "electric";
    capacity?: string; // e.g., "16 Liters"
    pressure?: string; // e.g., "0.2-0.45 MPa"
    flowRate?: string; // e.g., "4.5 L/min"
    weight?: string;
    warranty: string;
}

export interface Product extends BaseProduct {
    specifications: FertilizerSpecs | PesticideSpecs | SeedSpecs | MachinerySpecs;
}
