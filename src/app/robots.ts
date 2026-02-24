import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/admin',
                    '/admin/*',
                    '/hesabim',
                    '/hesabim/*',
                    '/api/*',
                    '/_next/*',
                    '/static/*',
                ],
            },
        ],
        sitemap: 'https://kodfinans.com/sitemap.xml',
    }
}
