"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Calendar, User, Clock, ArrowRight, BookOpen, Search, Zap, TrendingUp, BarChart3, DollarSign, Bitcoin, ChevronRight, Hash, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSystem } from "@/context/SystemContext";

export default function BlogPage() {
    const { blogs } = useSystem();
    const [searchTerm, setSearchTerm] = useState("");

    const posts = blogs.map(b => ({
        ...b,
        desc: b.seoDescription || b.content.replace(/<[^>]*>?/gm, '').slice(0, 150) + "...",
        read: b.readTime
    })).filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <div className="min-h-screen bg-[#0a0f0d] text-foreground font-inter selection:bg-primary/30">
            <Navbar />

            <main className="pt-32 md:pt-48 pb-24 relative overflow-hidden">
                {/* Premium Background Decor */}
                <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none -z-10" />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[180px] rounded-full pointer-events-none -z-10"
                />

                <div className="max-w-7xl mx-auto px-4">
                    {/* Blog Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-24 space-y-6 relative"
                    >
                        <div className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full glass border border-white/10 text-[10px] font-black text-primary tracking-[0.3em] uppercase backdrop-blur-3xl">
                            <Sparkles size={12} className="animate-pulse" />
                            Akademi & Rehber
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter">
                            DİJİTAL <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary italic">
                                FİNANS BLOG
                            </span>
                        </h1>
                        <p className="text-foreground/40 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                            En güncel bozum rehberleri, piyasa analizleri ve güvenlik ipuçları ile finansal geleceğinizi şekillendirin.
                        </p>
                    </motion.div>

                    {posts.length > 0 ? (
                        <div className="grid lg:grid-cols-3 gap-16">
                            {/* LEFT COLUMN: Main Content */}
                            <div className="lg:col-span-2 space-y-20">

                                {/* Featured Post */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <Link href={`/blog/${posts[0].slug}`} className="group block relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 to-secondary/40 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000" />
                                        <div className="relative glass p-8 md:p-12 rounded-[3.5rem] border-white/5 overflow-hidden backdrop-blur-3xl bg-white/[0.02]">
                                            <div className="aspect-[21/9] rounded-[2.5rem] overflow-hidden mb-10 shadow-2xl relative">
                                                <img src={posts[0].image} alt={posts[0].title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s] ease-out" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-transparent to-transparent opacity-80" />
                                                <div className="absolute top-8 left-8">
                                                    <span className="bg-primary text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl backdrop-blur-md">ÖNE ÇIKAN</span>
                                                </div>
                                            </div>
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-4 text-[11px] font-black text-foreground/40 uppercase tracking-[0.2em]">
                                                    <span className="text-primary flex items-center gap-2"><Calendar size={14} /> {posts[0].date}</span>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-foreground/10" />
                                                    <span>{posts[0].read} Okuma</span>
                                                </div>
                                                <h2 className="text-3xl md:text-5xl font-black text-white leading-[0.95] group-hover:text-primary transition-colors italic uppercase tracking-tight">
                                                    {posts[0].title}
                                                </h2>
                                                <p className="text-foreground/40 text-lg leading-relaxed font-medium line-clamp-3">
                                                    {posts[0].desc}
                                                </p>
                                                <div className="pt-4 flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-primary group-hover:gap-5 transition-all">
                                                    Rehberi Oku <ArrowRight size={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>

                                {/* Post Grid */}
                                <motion.div
                                    variants={container}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                    className="grid md:grid-cols-2 gap-10"
                                >
                                    {posts.slice(1).map((post) => (
                                        <motion.div key={post.id} variants={item}>
                                            <Link href={`/blog/${post.slug}`} className="group h-full block">
                                                <div className="glass h-full rounded-[3rem] border-white/5 overflow-hidden hover:border-primary/30 transition-all duration-500 flex flex-col bg-white/[0.01] hover:bg-white/[0.03]">
                                                    <div className="aspect-[4/3] relative overflow-hidden m-4 rounded-[2.2rem]">
                                                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                                        <div className="absolute top-5 left-5">
                                                            <span className="bg-black/60 backdrop-blur-xl text-white border border-white/10 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest">
                                                                {post.category}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="p-10 pt-6 flex flex-col flex-1 space-y-5">
                                                        <div className="flex items-center gap-3 text-[10px] font-black text-foreground/20 uppercase tracking-widest">
                                                            <span>{post.date}</span>
                                                            <span className="w-1 h-1 rounded-full bg-foreground/10" />
                                                            <span>{post.read}</span>
                                                        </div>
                                                        <h3 className="text-xl font-black text-white group-hover:text-primary transition-colors leading-tight uppercase font-inter tracking-tight">
                                                            {post.title}
                                                        </h3>
                                                        <p className="text-foreground/40 text-[13px] leading-relaxed line-clamp-2 font-medium">
                                                            {post.desc}
                                                        </p>
                                                        <div className="mt-auto pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary/60 group-hover:text-primary group-hover:gap-4 transition-all">
                                                            Devamını Oku <ArrowRight size={14} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* Pagination */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    className="flex justify-center pt-8"
                                >
                                    <div className="glass rounded-full p-2.5 flex items-center gap-2 border border-white/5 bg-white/[0.02]">
                                        <Button size="icon" variant="ghost" className="rounded-full w-12 h-12 hover:bg-white/5 transition-colors" disabled><ArrowRight className="rotate-180" size={18} /></Button>
                                        <Button size="icon" className="rounded-full w-12 h-12 bg-primary text-white font-black shadow-lg shadow-primary/25">1</Button>
                                        <Button size="icon" variant="ghost" className="rounded-full w-12 h-12 hover:bg-white/5 text-foreground/20 font-black">2</Button>
                                        <Button size="icon" variant="ghost" className="rounded-full w-12 h-12 hover:bg-white/5 text-foreground/20 font-black">3</Button>
                                        <Button size="icon" variant="ghost" className="rounded-full w-12 h-12 hover:bg-white/5 text-foreground/20 font-black">...</Button>
                                        <Button size="icon" variant="ghost" className="rounded-full w-12 h-12 hover:bg-white/5 transition-colors"><ArrowRight size={18} /></Button>
                                    </div>
                                </motion.div>
                            </div>

                            {/* RIGHT COLUMN: Sidebar & Widgets */}
                            <div className="hidden lg:block space-y-10 sticky top-32 h-fit">

                                {/* Search Widget */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="glass p-2.5 rounded-3xl border-white/5 flex items-center shadow-2xl bg-white/[0.02]"
                                >
                                    <div className="pl-6 text-foreground/20 group-focus-within:text-primary transition-colors"><Search size={22} /></div>
                                    <input
                                        type="text"
                                        placeholder="İçerik Ara..."
                                        className="w-full bg-transparent border-none py-5 px-5 text-sm font-bold text-white focus:outline-none placeholder:text-foreground/10"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <Button size="icon" className="w-14 h-14 rounded-2xl bg-primary text-white shadow-lg hover:scale-105 transition-transform"><ArrowRight size={20} /></Button>
                                </motion.div>

                                {/* Market Data Widget */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="glass rounded-[3rem] border-white/5 overflow-hidden shadow-2xl relative group bg-white/[0.01]"
                                >
                                    <div className="p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                                        <h3 className="text-[11px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                                            <TrendingUp className="text-primary animate-pulse" size={18} /> CANLI PİYASA
                                        </h3>
                                        <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_#22c55e]" />
                                    </div>
                                    <div className="p-4 space-y-1.5">
                                        {[
                                            { pair: "USD/TRY", price: "36.85", change: "+0.12%", icon: DollarSign, color: "text-green-400" },
                                            { pair: "EUR/TRY", price: "39.42", change: "+0.08%", icon: DollarSign, color: "text-green-400" },
                                            { pair: "BTC/USDT", price: "98,420", change: "+2.45%", icon: Bitcoin, color: "text-green-400" },
                                            { pair: "XAU/GR", price: "3,150", change: "-0.50%", icon: BarChart3, color: "text-red-400" },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-5 hover:bg-white/[0.03] rounded-[2rem] transition-all group/item cursor-default border border-transparent hover:border-white/5">
                                                <div className="flex items-center gap-3.5">
                                                    <div className="w-10 h-10 rounded-2xl bg-white/[0.03] flex items-center justify-center text-foreground/30 group-hover/item:text-primary group-hover/item:bg-primary/5 transition-all">
                                                        <item.icon size={16} />
                                                    </div>
                                                    <span className="font-bold text-[13px] text-foreground/60 group-hover/item:text-white transition-colors">{item.pair}</span>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-black text-white text-[13px]">{item.price}</p>
                                                    <p className={`text-[10px] font-black ${item.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{item.change}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Categories Widget */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="glass rounded-[3rem] border-white/5 p-10 space-y-8 bg-white/[0.01]"
                                >
                                    <h3 className="text-[11px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                                        <Hash className="text-primary" size={18} /> KATEGORİLER
                                    </h3>
                                    <div className="flex flex-col gap-3">
                                        {["Rehberler", "Güvenlik", "E-Pin Haberleri", "Finans", "Oyun Dünyası", "Razer Gold"].map((cat, i) => (
                                            <Link key={i} href="#" className="flex items-center justify-between p-5 rounded-[1.8rem] hover:bg-white/[0.03] group border border-transparent hover:border-white/5 transition-all">
                                                <span className="text-[13px] font-bold text-white/40 group-hover:text-white transition-colors">{cat}</span>
                                                <div className="w-8 h-8 rounded-full bg-white/[0.03] flex items-center justify-center text-white/10 group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all">
                                                    <ChevronRight size={16} />
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Newsletter Widget */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="relative glass p-10 rounded-[3rem] border-white/5 overflow-hidden text-center space-y-8 bg-white/[0.01]"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-white to-secondary" />
                                    <div className="w-20 h-20 rounded-3xl bg-primary/20 flex items-center justify-center mx-auto text-primary shadow-2xl shadow-primary/20">
                                        <Zap size={40} fill="currentColor" />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Akademiye Katıl</h3>
                                        <p className="text-foreground/30 text-[13px] font-medium leading-relaxed italic">En yeni dijital finans stratejileri e-postanda.</p>
                                    </div>
                                    <div className="space-y-4">
                                        <input type="email" placeholder="E-Posta Adresi" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-xs text-white focus:border-primary/50 focus:outline-none font-bold placeholder:text-foreground/10 transition-all" />
                                        <Button className="w-full rounded-2xl py-8 font-black uppercase text-xs tracking-[0.2em] bg-white text-black hover:bg-white/90 hover:scale-105 transition-all shadow-xl shadow-white/5">ABONE OL</Button>
                                    </div>
                                </motion.div>

                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-40 glass rounded-[4rem] border-white/5 mx-auto max-w-3xl bg-white/[0.01]">
                            <div className="w-24 h-24 rounded-full bg-white/[0.03] flex items-center justify-center mx-auto mb-8 text-foreground/10">
                                <BookOpen size={40} />
                            </div>
                            <h2 className="text-3xl font-black text-white/30 uppercase tracking-[0.3em]">Arşiv Henüz Boş</h2>
                            <p className="text-foreground/20 mt-6 font-medium text-lg italic">Admin panelden blog yazılarını saniyeler içinde yükleyebilirsiniz.</p>
                        </div>
                    )}

                    {/* Enhanced Bottom CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-40 relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-secondary opacity-15 blur-[120px] rounded-[5rem] group-hover:opacity-25 transition duration-1000" />
                        <div className="relative glass p-16 md:p-32 rounded-[5rem] border-white/10 text-center space-y-12 overflow-hidden backdrop-blur-3xl bg-white/[0.01]">
                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-5" />

                            <div className="relative z-10 flex flex-col items-center gap-8">
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity }}
                                    className="w-24 h-24 rounded-[2rem] bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-3xl shadow-primary/40"
                                >
                                    <Zap size={48} fill="currentColor" />
                                </motion.div>
                                <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter italic">
                                    Hemen <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary">Nakit</span>e Çevir
                                </h2>
                                <p className="text-foreground/30 max-w-3xl mx-auto font-medium text-xl leading-relaxed italic">
                                    KodFinans güvencesiyle dijital varlıklarını saniyeler içinde gerçek paraya dönüştür.
                                    <br className="hidden md:block" /> En yüksek kur, anında ödeme.
                                </p>
                                <div className="pt-10 w-full max-w-lg">
                                    <Link href="/bozum">
                                        <Button size="lg" className="w-full py-10 text-xl md:text-2xl font-black uppercase tracking-[0.3em] shadow-3xl shadow-white/10 rounded-[2rem] bg-white text-black hover:bg-primary hover:text-white hover:scale-[1.05] transition-all duration-500">
                                            ŞİMDİ BOZDUR
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
