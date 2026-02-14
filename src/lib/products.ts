
export interface ProductVariant {
    id: string;
    name: string;
    price: number;
    discountPrice?: number;
    stock?: number;
    description?: string;
    slug?: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
}

export interface ProductFeature {
    key: string;
    value: string;
}

export interface Product {
    id: string | number;
    slug: string;
    category: "gift" | "games" | "items";
    productType?: "bozum" | "satis";
    name: string;
    price: string | number;
    description: string;
    image: string;
    logo?: string;
    badge?: string;
    rating?: number;
    speed?: string;
    discountPrice?: number;
    games?: { name: string; image: string }[];
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
    seoImage?: string;
    stock?: number;
    variants?: ProductVariant[];
    features?: ProductFeature[];
    howToUse?: string;
}

// EMPTY ARRAY - No hardcoded products. 
// All products come from Firestore (SystemContext).
export const products: Product[] = [];
