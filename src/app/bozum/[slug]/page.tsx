import { getProducts } from "@/lib/firebase-products";
import BozumProductDetailClient from "./BozumProductDetailClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

interface PageProps {
    params: Promise<{ slug: string }>;
}

async function getBozumProduct(rawSlug: string) {
    const slug = decodeURIComponent(rawSlug).toLowerCase().trim();
    const allProducts = await getProducts();
    return allProducts.find(p => p.productType === "bozum" && p.slug.toLowerCase() === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = await getBozumProduct(slug);

    if (product) {
        const title = product.seoTitle || `${product.name} - En Yüksek Oran | KodFinans`;
        const description = product.seoDescription || `${product.name} kodlarınızı KodFinans'ta en yüksek oranlarla bozdurun. 7/24 güvenli ve hızlı ödeme.`;

        return {
            title,
            description,
            keywords: product.seoKeywords || `${product.name}, kod bozum, bozdurma, nakite çevirme`,
            alternates: {
                canonical: `https://kodfinans.com/bozum/${slug}`,
            },
            openGraph: {
                title,
                description,
                url: `https://kodfinans.com/bozum/${slug}`,
                type: "website",
                siteName: "KodFinans",
                locale: "tr_TR",
                images: [product.seoImage || product.image],
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: [product.seoImage || product.image],
            },
            robots: {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    "max-video-preview": -1,
                    "max-image-preview": "large",
                    "max-snippet": -1,
                },
            },
        };
    }

    return {
        title: "Bozum Ürünü Bulunamadı | KodFinans",
    };
}

function BozumJsonLd({ product, slug }: { product: any; slug: string }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: product.name,
        description: product.seoDescription || product.description,
        image: product.seoImage || product.image,
        url: `https://kodfinans.com/bozum/${slug}`,
        provider: {
            "@type": "Organization",
            name: "KodFinans",
            url: "https://kodfinans.com",
        },
        serviceType: "Dijital Kod Bozum",
        areaServed: {
            "@type": "Country",
            name: "Turkey",
        },
        offers: {
            "@type": "Offer",
            description: `${product.price}% oran ile bozum hizmeti`,
            priceCurrency: "TRY",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

function BozumFAQJsonLd({ product }: { product: any }) {
    const faq = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: `${product.name} oranı nedir?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: `${product.name} için standart bozum oranımız %${product.price}'dir. Yüksek tutarlar için canlı destek üzerinden daha yüksek oranlar sunulmaktadır.`,
                },
            },
            {
                "@type": "Question",
                name: `${product.name} nasıl yapılır?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: `Kodunuzu bozum formuna girin, hesaplanan tutarı onaylayın ve ödemenizi anında alın. İşlem 7/24 otomatik olarak gerçekleştirilir.`,
                },
            },
            {
                "@type": "Question",
                name: `${product.name} güvenli mi?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: `KodFinans, SSL güvenlik sertifikası ile tüm işlemlerinizi korur. Binlerce müşterimizin güvendiği Türkiye'nin önde gelen kod bozum platformudur.`,
                },
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
        />
    );
}

export default async function BozumProductPage({ params }: PageProps) {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const product = await getBozumProduct(slug);

    return (
        <>
            {product && <BozumJsonLd product={product} slug={decodedSlug} />}
            {product && <BozumFAQJsonLd product={product} />}
            <BozumProductDetailClient slug={decodedSlug} initialProduct={product} />
        </>
    );
}
