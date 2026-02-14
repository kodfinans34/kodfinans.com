import { products as staticProducts } from "@/lib/products";
import { getProductBySlug } from "@/lib/firebase-products";
import ProductDetailClient from "@/components/features/ProductDetailClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;

    // Try fetching from Firestore first
    let product: any = await getProductBySlug(slug);

    // If not found in Firestore, try static products
    if (!product) {
        product = staticProducts.find(p => p.slug === slug);
    }

    // Check variants if main product not found
    if (!product) {
        // We'll have to iterate static products for variants as Firestore structure for variants 
        // implies fetching parent first. 
        // For Firestore, if we want to search by variant slug efficiently, we'd need a different query,
        // but for now let's assume if it is a variant slug, it might be found via parent in static or we'd need a more complex query.
        // Let's stick to valid product slugs for now or static fallback.
        for (const p of staticProducts) {
            const v = p.variants?.find(v => v.slug === slug);
            if (v) {
                product = p; // Use parent for metadata context, or variant specific info
                break;
            }
        }
    }

    if (!product) {
        return {
            title: "Ürün Bulunamadı | KodFinans",
        };
    }

    return {
        title: product.seoTitle || `${product.name} Satın Al | KodFinans`,
        description: product.seoDescription || `${product.name} en uygun fiyatlarla KodFinans'ta.`,
        keywords: product.seoKeywords,
        openGraph: {
            title: product.seoTitle || product.name,
            description: product.seoDescription || product.description,
            images: [product.seoImage || product.image],
        }
    };
}

export default async function ProductPage({ params }: PageProps) {
    const { slug } = await params;
    return <ProductDetailClient slug={slug} />;
}

