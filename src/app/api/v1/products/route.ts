import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/firebase-products';

// Handle GET requests to fetch products
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const apiKey = searchParams.get('test_key') || request.headers.get('Authorization'); // Dummy token check mechanism

        // Fetch products from our DB
        const products = await getProducts();

        // Separate active sales products
        const salesProducts = products.filter(p => p.productType === 'satis' || (!p.productType && !p.slug.includes('bozum')));

        // "Deneme ürünleri koyalım test için" - Inject some dummy products for testing if requested
        const dummyApiProducts = [
            {
                id: "test-api-prod-1",
                name: "Test API Ürünü - 100 TL Bakiye",
                slug: "test-api-urunu-100-tl",
                category: "gift",
                productType: "satis",
                price: 100,
                image: "https://via.placeholder.com/300x300/10b981/ffffff?text=Test+API+100",
                description: "Sadece API testi için oluşturulmuş örnek test ürünü.",
                variants: [],
            },
            {
                id: "test-api-prod-2",
                name: "Test API Ürünü - Premium Oyun Kodu",
                slug: "test-api-premium-oyun",
                category: "games",
                productType: "satis",
                price: 1500,
                image: "https://via.placeholder.com/300x300/a855f7/ffffff?text=Test+API+Oyun",
                description: "Sadece API testi için oluşturulmuş premium oyun kodu.",
                variants: [
                    { id: "v1", name: "Standart Paket", price: 1500 },
                    { id: "v2", name: "VIP Paket", price: 3000 }
                ],
            }
        ];

        // Combine live items + dummy test items
        const combinedResponse = {
            success: true,
            status: 200,
            message: "Products fetched successfully.",
            meta: {
                totalLiveProducts: salesProducts.length,
                totalTestProducts: dummyApiProducts.length,
                provider: "KodFinans API v1",
            },
            data: [
                ...dummyApiProducts,
                ...salesProducts
            ]
        };

        return NextResponse.json(combinedResponse, { status: 200 });

    } catch (error: any) {
        console.error("API error fetching products:", error);
        return NextResponse.json(
            { success: false, status: 500, message: "Internal server error.", error: error.message },
            { status: 500 }
        );
    }
}
