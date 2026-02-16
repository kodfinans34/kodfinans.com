import { MetadataRoute } from 'next'
import { getProducts } from '@/lib/firebase-products'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://kodfinans.com'

    // Fetch products dynamically
    const products = await getProducts()

    const productRoutes = products.map((product) => ({
        url: `${baseUrl}/urun/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    return [
        {
            url: 'https://kodfinans.com',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://kodfinans.com/blog',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: 'https://kodfinans.com/giris',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://kodfinans.com/kayit-ol',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://kodfinans.com/iletisim',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        ...productRoutes,
    ]
}
