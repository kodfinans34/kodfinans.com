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
            keywords: product.seoKeywords || `${product.name}, ${product.category}, epin, kod bozum, satın al`,
            alternates: {
                canonical: `https://kodfinans.com/urun/${slug}`,
            },
            openGraph: {
                title: title,
                description: description,
                url: `https://kodfinans.com/urun/${slug}`,
                type: "website",
                images: [product.seoImage || product.image],
            },
        };
    }

    return {
        title: "Ürün Bulunamadı | KodFinans",
    };
}

function ProductJsonLd({ product, variant, slug }: { product: any; variant: any; slug: string }) {
    const name = variant ? variant.name : product.name;
    const price = variant ? variant.price : (product.variants?.[0]?.price || product.price || 0);
    const image = product.seoImage || product.image || "";
    const description = variant
        ? `${variant.name} en uygun fiyat ve anında teslimatla KodFinans'ta.`
        : (product.seoDescription || `${product.name} en uygun fiyatlarla KodFinans'ta.`);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: name,
        description: description,
        image: image,
        url: `https://kodfinans.com/urun/${slug}`,
        brand: {
            "@type": "Brand",
            name: product.name,
        },
        offers: {
            "@type": "Offer",
            price: price,
            priceCurrency: "TRY",
            availability: "https://schema.org/InStock",
            seller: {
                "@type": "Organization",
                name: "KodFinans",
            },
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

export default async function ProductPage({ params }: PageProps) {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const { product, variant } = await getProductData(slug);

    return (
        <>
            {product && <ProductJsonLd product={product} variant={variant} slug={decodedSlug} />}
            <ProductDetailClient slug={decodedSlug} initialProduct={product} />
        </>
    );
}
