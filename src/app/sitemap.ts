import { MetadataRoute } from 'next'
import { getProducts } from '@/lib/firebase-products'
import { getBlogs } from '@/lib/firebase-blogs'

export const dynamic = 'force-dynamic'

function parseDate(dateValue: any): Date {
    if (!dateValue) return new Date();

    // Check if it's a Firestore Timestamp
    if (typeof dateValue === 'object' && 'seconds' in dateValue) {
        return new Date(dateValue.seconds * 1000);
    }

    const d = new Date(dateValue);
    if (!isNaN(d.getTime())) {
        return d;
    }

    // Fallback
    return new Date();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://kodfinans.com'

    // Fetch products dynamically
    const products = await getProducts() || []

    // Fetch blogs dynamically
    const blogs = await getBlogs() || []

    const productRoutes = products
        .filter(p => p && p.slug && p.productType !== "bozum")
        .map((product) => ({
            url: `${baseUrl}/urun/${product.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        }))

    // Bozum products get their own /bozum/[slug] pages
    const bozumRoutes = products
        .filter(p => p && p.slug && p.productType === "bozum")
        .map((product) => ({
            url: `${baseUrl}/bozum/${product.slug}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.95,
        }))

    const blogRoutes = blogs
        .filter(b => b && b.slug)
        .map((blog) => ({
            url: `${baseUrl}/blog/${blog.slug}`,
            lastModified: parseDate(blog.date),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/urunler`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/bozum`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/bozum-hesapla`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/hakkimizda`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/iletisim`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/vip-finans`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/giris`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/kayit-ol`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/gizlilik`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/kvkk`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/cerezler`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        ...productRoutes,
        ...bozumRoutes,
        ...blogRoutes,
    ]
}
