
export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    author: string;
    date: string;
    category: "Rehber" | "Haber" | "İnceleme" | "Kampanya";
    readTime: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
}

export const blogs: BlogPost[] = [];
