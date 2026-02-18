import { getProducts } from "@/lib/firebase-products";
import ProductDetailClient from "@/components/features/ProductDetailClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

interface PageProps {
    params: Promise<{ slug: string }>;
}

async function getProductData(rawSlug: string) {
    const slug = decodeURIComponent(rawSlug).toLowerCase().trim();
    const allProducts = await getProducts();

    let product = allProducts.find(p => p.slug.toLowerCase() === slug);
    let variant: any = null;

    if (!product) {
        for (const p of allProducts) {
            const v = p.variants?.find((v: any) => v.slug?.toLowerCase() === slug);
            if (v) {
                product = p;
                variant = v;
                break;
            }
        }
    }
    return { product, variant };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const { product, variant } = await getProductData(slug);

    if (product) {
        const title = variant
            ? `${variant.name} Satın Al | KodFinans`
            : (product.seoTitle || `${product.name} Satın Al | KodFinans`);

        const description = variant
            ? `${variant.name} en uygun fiyat ve anında teslimatla KodFinans'ta.`
            : (product.seoDescription || `${product.name} en uygun fiyatlarla KodFinans'ta.`);

        return {
            title: title,
            description: description,
            keywords: product.seoKeywords || `${product.name}, ${product.category}, epin, kod bozum`,
            openGraph: {
                title: title,
                description: description,
                images: [product.seoImage || product.image],
            }
        };
    }

    return {
        title: "Ürün Bulunamadı | KodFinans",
    };
}

export default async function ProductPage({ params }: PageProps) {
    const { slug } = await params;
    const { product } = await getProductData(slug);

    return <ProductDetailClient slug={decodeURIComponent(slug)} initialProduct={product} />;
}

