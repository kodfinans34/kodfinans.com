import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Calendar, User, Clock, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getBlogs } from "@/lib/firebase-blogs";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

// SEO Metadata Generation
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const blogs = await getBlogs();
    const blog = blogs.find(b => b.slug === slug);

    if (!blog) {
        return {
            title: "Yazı Bulunamadı | KodFinans",
        };
    }

    return {
        title: blog.seoTitle || `${blog.title} | KodFinans Blog`,
        description: blog.seoDescription || blog.excerpt,
        keywords: blog.seoKeywords,
        openGraph: {
            title: blog.title,
            description: blog.excerpt,
            images: [blog.image],
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const blogs = await getBlogs();
    const blog = blogs.find(b => b.slug === slug);

    if (!blog) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background text-foreground font-poppins selection:bg-primary/30">
            <Navbar />

            <main className="pt-32 pb-32 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    {/* Breadcrumbs & Back */}
                    <div className="flex items-center justify-between mb-12">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-foreground/40 hover:text-primary transition-all group font-bold text-xs uppercase tracking-widest">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Blog Listesine Dön
                        </Link>
                        {/* Share Button (Mock) */}
                        <div className="flex gap-2">
                            <button className="w-10 h-10 rounded-full glass border border-white/5 flex items-center justify-center text-foreground/40 hover:text-foreground transition-all">
                                <Share2 size={16} />
                            </button>
                        </div>
                    </div>

                    <article className="space-y-12">
                        {/* Header Section */}
                        <div className="space-y-8">
                            <div className="flex flex-wrap items-center gap-4 text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">
                                <span className="flex items-center gap-2 text-primary">
                                    <Calendar size={14} /> {blog.date}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-foreground/10" />
                                <span className="flex items-center gap-2 text-foreground/40">
                                    <User size={14} /> {blog.author}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-foreground/10" />
                                <span className="flex items-center gap-2 text-foreground/40">
                                    <Clock size={14} /> {blog.readTime}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-7xl font-black leading-[1] tracking-tighter uppercase italic drop-shadow-2xl">
                                {blog.title}
                            </h1>

                            <div className="flex items-center gap-3">
                                <span className="bg-primary/10 border border-primary/20 text-primary text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                                    {blog.category}
                                </span>
                                <span className="bg-card border border-white/10 text-foreground/40 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                                    Rehber
                                </span>
                            </div>
                        </div>

                        {/* Featured Image */}
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-primary/20 blur-[100px] opacity-20 rounded-[4rem] -z-10 group-hover:opacity-40 transition-opacity duration-1000" />
                            <div className="aspect-video glass rounded-[3rem] overflow-hidden border-white/10 shadow-3xl bg-white/[0.02]">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                            </div>
                        </div>

                        {/* Content Section */}
                        <div
                            className="prose prose-lg max-w-none text-foreground/70 leading-relaxed font-medium 
                            prose-headings:text-foreground prose-headings:font-black prose-headings:italic prose-headings:uppercase prose-headings:tracking-tighter
                            prose-h2:text-3xl md:prose-h2:text-5xl prose-h2:mt-16 prose-h2:mb-8
                            prose-h3:text-xl md:prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-6
                            prose-p:mb-8 prose-strong:text-primary prose-a:text-primary hover:prose-a:underline
                            prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6
                            prose-li:mb-2 prose-li:text-foreground/80
                            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-card prose-blockquote:p-8 prose-blockquote:rounded-2xl prose-blockquote:italic prose-blockquote:text-foreground/80"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />

                        {/* Footer CTA */}
                        <div className="pt-24 border-t border-white/5 mt-32">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-10 blur-3xl rounded-[3rem]" />
                                <div className="relative glass p-10 md:p-16 rounded-[4rem] border-white/10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left overflow-hidden bg-card">
                                    <div className="space-y-4">
                                        <h3 className="text-3xl md:text-5xl font-black text-foreground italic uppercase tracking-tighter leading-none">
                                            KAZANCINI <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">KATLAMAYA </span> BAŞLA!
                                        </h3>
                                        <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">
                                            Siz de kodlarınızı en yüksek oranlarla hemen nakite çevirin.
                                        </p>
                                    </div>
                                    <Link href="/bozum-hesapla">
                                        <Button className="h-20 px-12 rounded-[2rem] bg-primary text-white font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all w-full md:w-auto">
                                            HEMEN BOZDUR
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
