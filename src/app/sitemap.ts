
import { MetadataRoute } from 'next';
import { products } from '@/lib/products';
import { blogs } from '@/lib/blogs';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://kodfinans.com';

    const productUrls = products.map((product) => ({
        url: `${baseUrl}/urun/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }));

    const blogUrls = blogs.map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        // Spread operator correctly expands the arrays into the main array
        ...productUrls,
        ...blogUrls,
    ];
}
