import { products } from "@/lib/products";
import BozumForm from "@/components/features/BozumForm";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { Suspense } from "react";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const product = products.find(p => p.slug === resolvedParams.slug);

    if (!product) {
        return {
            title: `${resolvedParams.slug.replace(/-/g, " ").toUpperCase()} | KodFinans`,
        };
    }

    const isBozum = product.slug.includes("bozdurma") || product.slug.includes("bozum");

    return {
        title: product.seoTitle || (isBozum
            ? `${product.name} Bozdurma - En Yüksek Oran | KodFinans`
            : `${product.name} Satın Al - Anında Teslimat | KodFinans`),
        description: product.seoDescription || product.description,
        keywords: product.seoKeywords,
        openGraph: {
            title: product.seoTitle || product.name,
            description: product.seoDescription || product.description,
            images: [product.seoImage || product.image],
        }
    };
}

export default async function DynamicPage({ params }: PageProps) {
    const resolvedParams = await params;
    const isBozum = resolvedParams.slug.includes("bozdurma") || resolvedParams.slug.includes("bozum");

    if (isBozum) {
        return (
            <Suspense fallback={<div className="min-h-screen bg-[#050506] flex items-center justify-center text-white">Yükleniyor...</div>}>
                <BozumForm initialProductSlug={resolvedParams.slug} />
            </Suspense>
        );
    } else {
        // Redirect sales products to the new standardized product detail page
        const productExists = products.some(p => p.slug === resolvedParams.slug);
        if (productExists) {
            redirect(`/urun/${resolvedParams.slug}`);
        }
        return notFound();
    }
}
