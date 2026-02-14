"use client";

import React from "react";
import { Button } from "../ui/Button";
import { ChevronRight, TrendingUp, DollarSign, Zap, ShieldCheck, Gamepad2, CreditCard, Apple, Monitor, Smartphone, Play } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useSystem } from "@/context/SystemContext";
import { GlobalSearch } from "../features/GlobalSearch";

export const Hero = () => {
    const router = useRouter();
    const { settings, products } = useSystem();

    const bozumProducts = products?.filter(p => p && (p.productType === "bozum" || (p.slug && (p.slug.includes("bozum") || p.slug.includes("bozdurma"))))) || [];
    const featuredBozum = bozumProducts.length > 0 ? bozumProducts[0] : { name: "CANLI KUR", price: "--", image: "" };
    const tickerProducts = bozumProducts.slice(0, 7);

    return (
        <section className="relative pt-32 md:pt-48 pb-12 overflow-hidden mesh-gradient">
            {/* Dynamic Background Elements - Optimized */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[100px] rounded-full -z-10" />
            <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary/5 blur-[80px] rounded-full -z-10" />

            {/* Decorative Lines */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/[0.03] -z-10" />
            <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/[0.03] -z-10" />

            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="space-y-10 text-center lg:text-left relative z-10"
                >
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-primary text-[11px] font-black tracking-[0.2em] uppercase shadow-2xl backdrop-blur-xl">
                        <span className="flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Premium Bozum Merkezi v2.0
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-black font-poppins leading-[0.95] tracking-tighter text-white uppercase italic">
                            {settings.heroHeadline} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-secondary animate-gradient-x">
                                {settings.heroSubheadline}
                            </span>
                        </h1>
                    </div>

                    <p className="text-white/40 text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                        Razer Gold, Steam ve iTunes bakiyelerinizi <span className="text-white">Türkiye'nin en yüksek oranlarıyla</span> nakite dönüştürün. Saniyeler içinde ödemeniz cebinizde.
                    </p>

                    {/* Global Search Bar */}
                    <div className="py-4">
                        <GlobalSearch />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                        <Button size="lg" className="h-16 w-full sm:w-auto px-12 rounded-[2rem] bg-animate-rainbow text-white shadow-[0_15px_40px_rgba(74,188,241,0.3)] font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all" onClick={() => router.push("/bozum")}>
                            Hemen Bozum Yap <ChevronRight size={20} className="ml-1" />
                        </Button>
                        <Button variant="secondary" size="lg" className="h-16 w-full sm:w-auto px-12 rounded-[2rem] glass border-white/10 font-bold text-sm uppercase tracking-widest hover:bg-white/5" onClick={() => router.push("/vip-finans")}>
                            VIP Masası Başvuru
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-10 border-t border-white/[0.05]">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Aktif Üye</p>
                            <p className="text-2xl font-black text-white">12.5k+</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Hacim</p>
                            <p className="text-2xl font-black text-white">₺4M+</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Memnuniyet</p>
                            <p className="text-2xl font-black text-white">%99.8</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Ort. Hız</p>
                            <p className="text-2xl font-black text-white">45sn</p>
                        </div>
                    </div>
                </motion.div>

                {/* Hero Visual - High End PC Version */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="relative hidden lg:block"
                >
                    <div className="relative group">
                        {/* Main Visual Frame */}
                        <div className="absolute -inset-10 bg-primary/20 blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000 -z-10" />

                        <div className="relative glass p-4 rounded-[4rem] border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.5)] bg-white/[0.02]">
                            <div className="relative aspect-[4/5] md:aspect-square rounded-[3.5rem] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                                <img
                                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200"
                                    alt="Premium Gaming"
                                    className="object-cover w-full h-full scale-110 group-hover:scale-100 transition-transform duration-[2s]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-[#050506]/20 to-transparent" />

                                {/* Floating Meta Labels */}
                                <div className="absolute top-10 left-10 space-y-3">
                                    <div className="glass px-4 py-2 rounded-2xl border-white/20 backdrop-blur-3xl shadow-2xl">
                                        <span className="text-[10px] font-black text-primary tracking-widest flex items-center gap-2 uppercase">
                                            <Zap size={14} className="fill-primary" /> LIVE EXCHANGE
                                        </span>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-3xl px-4 py-2 rounded-2xl border border-white/10">
                                        <span className="text-[10px] font-black text-white tracking-widest uppercase opacity-40">SECURED BY SSL</span>
                                    </div>
                                </div>

                                <div className="absolute bottom-10 left-10 right-10">
                                    <div className="space-y-6">
                                        <div className="flex gap-2">
                                            <span className="w-12 h-1 bg-primary rounded-full shadow-[0_0_10px_#4abcf1]" />
                                            <span className="w-4 h-1 bg-white/10 rounded-full" />
                                            <span className="w-4 h-1 bg-white/10 rounded-full" />
                                        </div>
                                        <h4 className="text-4xl font-black text-white uppercase italic tracking-tighter">
                                            En güvenli yol, <br /> en iyi kur.
                                        </h4>
                                    </div>
                                </div>
                            </div>

                            {/* Advanced Floating Cards */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute -top-12 -right-12 glass p-8 rounded-[3rem] border-white/20 shadow-2xl backdrop-blur-3xl"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-xl">
                                        <TrendingUp size={32} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[11px] text-white/30 font-black uppercase tracking-[0.2em]">{featuredBozum.name.toUpperCase()}</p>
                                        <p className="text-3xl font-black text-white italic tracking-tighter">%{featuredBozum.price}</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 20, 0] }}
                                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-12 -left-12 glass p-8 rounded-[3rem] border-white/20 shadow-2xl backdrop-blur-3xl bg-white/[0.05]"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center text-primary border border-white/10">
                                        <ShieldCheck size={32} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[11px] text-white/30 font-black uppercase tracking-[0.2em]">TAM GÜVEN</p>
                                        <p className="text-lg font-black text-white uppercase tracking-widest">GÜVENLİ İŞLEM</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Advanced Quick Access Bar - Premium refined */}
            <div className="max-w-7xl mx-auto px-4 mt-20 md:mt-32">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <div className="relative glass rounded-[2.5rem] md:rounded-full border-white/[0.06] p-4 flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth shadow-2xl">
                        <div className="flex items-center gap-3 px-6 border-r border-white/10 mr-2 shrink-0">
                            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary shadow-inner">
                                <Zap size={20} className="fill-primary" />
                            </div>
                            <span className="text-[11px] font-black text-white uppercase tracking-[0.3em] italic">Anlık Kurlar</span>
                        </div>
                        {tickerProducts.map((cat, i) => (
                            <button key={i} onClick={() => router.push(`/bozum?product=${cat.slug}`)} className="whitespace-nowrap flex items-center gap-4 px-8 py-4 rounded-2xl md:rounded-full hover:bg-white/5 transition-all group/btn border border-transparent hover:border-white/10 shrink-0">
                                <div className="w-8 h-8 flex items-center justify-center group-hover/btn:scale-110 transition-transform overflow-hidden rounded-lg">
                                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col items-start leading-none gap-1">
                                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest group-hover/btn:text-white transition-colors">{cat.name}</span>
                                    <span className="text-xs font-black italic text-primary">%{cat.price}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
