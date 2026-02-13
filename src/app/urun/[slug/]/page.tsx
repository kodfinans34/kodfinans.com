import { products } from "@/lib/products";
import ProductDetailClient from "@/components/features/ProductDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;

    // Check if it's a direct product slug
    let product: any = products.find(p => p.slug === slug);
    let variant: any = null;

    if (!product) {
        // Check if it's a variant slug
        for (const p of products) {
            const v = p.variants?.find(v => v.slug === slug);
            if (v) {
                product = p;
                variant = v;
                break;
            }
        }
    }

    if (!product) {
        return {
            title: "Ürün Bulunamadı | KodFinans",
        };
    }

    // Determine SEO values
    const title = variant?.seoTitle || product.seoTitle || (variant ? `${variant.name} Satın Al | KodFinans` : `${product.name} Satın Al | KodFinans`);
    const description = variant?.seoDescription || product.seoDescription || (variant ? `${variant.name} en uygun fiyatlarla KodFinans'ta.` : product.description);
    const keywords = variant?.seoKeywords || product.seoKeywords;

    return {
        title: title,
        description: description,
        keywords: keywords,
        openGraph: {
            title: title,
            description: description,
            images: [product.image],
        }
    };
}

export default async function ProductPage({ params }: PageProps) {
    const { slug } = await params;
    return <ProductDetailClient slug={slug} />;
}
