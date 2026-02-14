"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Calendar, User, Clock, ArrowRight, BookOpen, Search, Zap, TrendingUp, BarChart3, DollarSign, Bitcoin, ChevronRight, Hash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useSystem } from "@/context/SystemContext";

export default function BlogPage() {
    const { blogs } = useSystem();
    const [searchTerm, setSearchTerm] = useState("");

    const posts = blogs.map(b => ({
        ...b,
        desc: b.seoDescription || b.content.replace(/<[^>]*>?/gm, '').slice(0, 150) + "...",
        read: b.readTime
    })).filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="min-h-screen bg-[#080809] text-white font-poppins selection:bg-primary/30">
            <Navbar />

            <main className="pt-32 md:pt-48 pb-24 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4">

                    {/* Blog Header */}
                    <div className="text-center mb-24 space-y-6 relative">
                        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass border border-white/5 text-[10px] font-black text-primary tracking-[0.3em] uppercase hover:bg-white/5 transition-colors cursor-default">
                            Akademi & Rehber
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter">
                            DİJİTAL <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-secondary italic">FİNANS BLOG</span>
                        </h1>
                        <p className="text-white/40 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                            En güncel bozum rehberleri, piyasa analizleri ve güvenlik ipuçları.
                        </p>
                    </div>

                    {posts.length > 0 ? (
                        <div className="grid lg:grid-cols-3 gap-16">
                            {/* LEFT COLUMN: Main Content */}
                            <div className="lg:col-span-2 space-y-20">

                                {/* Featured Post */}
                                <Link href={`/blog/${posts[0].slug}`} className="group block relative">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                                    <div className="relative glass p-8 md:p-12 rounded-[3rem] border-white/5 overflow-hidden">
                                        <div className="aspect-[21/9] rounded-[2rem] overflow-hidden mb-8 shadow-2xl relative">
                                            <img src={posts[0].image} alt={posts[0].title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                            <div className="absolute top-6 left-6">
                                                <span className="bg-primary text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">ÖNE ÇIKAN</span>
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
                                                <span className="text-primary flex items-center gap-2"><Calendar size={12} /> {posts[0].date}</span>
                                                <span className="w-1 h-1 rounded-full bg-white/10" />
                                                <span>{posts[0].read} Okuma</span>
                                            </div>
                                            <h2 className="text-3xl md:text-5xl font-black text-white leading-[0.95] group-hover:text-primary transition-colors italic uppercase tracking-tight">
                                                {posts[0].title}
                                            </h2>
                                            <p className="text-white/40 text-lg leading-relaxed font-medium line-clamp-3">
                                                {posts[0].desc}
                                            </p>
                                            <div className="pt-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-primary group-hover:gap-4 transition-all">
                                                Devamını Oku <ArrowRight size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                {/* Post Grid */}
                                <div className="grid md:grid-cols-2 gap-8">
                                    {posts.slice(1).map((post) => (
                                        <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                                            <div className="glass h-full rounded-[2.5rem] border-white/5 overflow-hidden hover:border-primary/30 transition-all duration-500 flex flex-col">
                                                <div className="aspect-[4/3] relative overflow-hidden m-3 rounded-[2rem]">
                                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                    <div className="absolute top-4 left-4">
                                                        <span className="bg-black/50 backdrop-blur-md text-white border border-white/10 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest">
                                                            {post.category}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="p-8 flex flex-col flex-1 space-y-4">
                                                    <div className="flex items-center gap-3 text-[9px] font-black text-white/30 uppercase tracking-widest">
                                                        <span>{post.date}</span>
                                                        <span className="w-1 h-1 rounded-full bg-white/10" />
                                                        <span>{post.read}</span>
                                                    </div>
                                                    <h3 className="text-xl font-black text-white group-hover:text-primary transition-colors leading-tight uppercase font-poppins">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-white/40 text-xs leading-relaxed line-clamp-2 font-medium">
                                                        {post.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* Pagination */}
                                <div className="flex justify-center pt-8">
                                    <div className="glass rounded-full p-2 flex items-center gap-2 border border-white/5">
                                        <Button size="icon" variant="ghost" className="rounded-full w-10 h-10 hover:bg-white/10" disabled><ArrowRight className="rotate-180" size={16} /></Button>
                                        <Button size="icon" className="rounded-full w-10 h-10 bg-primary text-black font-bold">1</Button>
                                        <Button size="icon" variant="ghost" className="rounded-full w-10 h-10 hover:bg-white/10 text-white/40 font-bold">2</Button>
                                        <Button size="icon" variant="ghost" className="rounded-full w-10 h-10 hover:bg-white/10 text-white/40 font-bold">3</Button>
                                        <Button size="icon" variant="ghost" className="rounded-full w-10 h-10 hover:bg-white/10 font-bold">...</Button>
                                        <Button size="icon" variant="ghost" className="rounded-full w-10 h-10 hover:bg-white/10"><ArrowRight size={16} /></Button>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT COLUMN: Sidebar & Widgets */}
                            <div className="hidden lg:block space-y-8 sticky top-32 h-fit">

                                {/* Search Widget */}
                                <div className="glass p-2 rounded-[2rem] border-white/5 flex items-center shadow-xl">
                                    <div className="pl-6 text-white/30"><Search size={20} /></div>
                                    <input
                                        type="text"
                                        placeholder="İçerik Ara..."
                                        className="w-full bg-transparent border-none py-4 px-4 text-sm font-bold text-white focus:outline-none placeholder:text-white/20"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <Button size="icon" className="w-12 h-12 rounded-[1.5rem] bg-white/5 hover:bg-white/10"><ArrowRight size={18} /></Button>
                                </div>

                                {/* Market Data Widget (Mock) */}
                                <div className="glass rounded-[2.5rem] border-white/5 overflow-hidden shadow-2xl relative group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                                    <div className="p-8 border-b border-white/5 flex items-center justify-between">
                                        <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                                            <TrendingUp className="text-primary" size={16} /> PİYASA
                                        </h3>
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                                    </div>
                                    <div className="p-2 space-y-1">
                                        {[
                                            { pair: "USD/TRY", price: "36.85", change: "+0.12%", icon: DollarSign, color: "text-green-400" },
                                            { pair: "EUR/TRY", price: "39.42", change: "+0.08%", icon: DollarSign, color: "text-green-400" },
                                            { pair: "BTC/USDT", price: "98,420", change: "+2.45%", icon: Bitcoin, color: "text-green-400" },
                                            { pair: "XAU/GR", price: "3,150", change: "-0.50%", icon: BarChart3, color: "text-red-400" },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-colors group/item">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover/item:text-white transition-colors">
                                                        <item.icon size={14} />
                                                    </div>
                                                    <span className="font-bold text-xs text-white/80">{item.pair}</span>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-white text-xs">{item.price}</p>
                                                    <p className={`text-[9px] font-black ${item.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{item.change}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Categories Widget */}
                                <div className="glass rounded-[2.5rem] border-white/5 p-8 space-y-6">
                                    <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Hash className="text-primary" size={16} /> KATEGORİLER
                                    </h3>
                                    <div className="flex flex-col gap-2">
                                        {["Rehberler", "Güvenlik", "E-Pin Haberleri", "Finans", "Oyun Dünyası", "Razer Gold"].map((cat, i) => (
                                            <Link key={i} href="#" className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 group border border-transparent hover:border-white/5 transition-all">
                                                <span className="text-xs font-bold text-white/60 group-hover:text-white transition-colors">{cat}</span>
                                                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-primary group-hover:text-black transition-all">
                                                    <ChevronRight size={14} />
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Newsletter Widget */}
                                <div className="relative glass p-8 rounded-[2.5rem] border-white/5 overflow-hidden text-center space-y-6">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-600" />
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-primary">
                                        <Zap size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-white uppercase italic">Abone Ol</h3>
                                        <p className="text-white/40 text-xs font-bold mt-2 leading-relaxed">En yeni bozum fırsatlarını ve kampanyaları ilk sen öğren.</p>
                                    </div>
                                    <div className="space-y-3">
                                        <input type="email" placeholder="E-Posta Adresi" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-primary/50 focus:outline-none font-bold placeholder:text-white/20" />
                                        <Button className="w-full rounded-xl py-6 font-black uppercase text-xs tracking-widest bg-white text-black hover:bg-white/90">Kayıt Ol</Button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    {/* Bottom CTA - Enhanced */}
                    <div className="mt-32 relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-secondary opacity-20 blur-[100px] rounded-[4rem] group-hover:opacity-30 transition duration-1000" />
                        <div className="relative glass p-12 md:p-24 rounded-[4rem] border-white/10 text-center space-y-10 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />

                            <div className="relative z-10 flex flex-col items-center gap-6">
                                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-2xl shadow-primary/30">
                                    <Zap size={40} fill="currentColor" />
                                </div>
                                <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tight italic">
                                    Hemen <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Nakit</span>e Çevir
                                </h2>
                                <p className="text-white/40 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
                                    Binlerce mutlu müşterimiz gibi sen de dijital varlıklarını en güvenli şekilde değerlendir.
                                    <br className="hidden md:block" /> 7/24 Canlı Destek ve Anında Ödeme garantisiyle.
                                </p>
                                <div className="pt-8 w-full max-w-md">
                                    <Link href="/bozum-hesapla">
                                        <Button size="lg" className="w-full py-8 text-lg md:text-xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 rounded-2xl bg-white text-black hover:bg-white/90 hover:scale-[1.02]">
                                            ŞİMDİ BOZDUR
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
