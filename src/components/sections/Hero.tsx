"use client";

import React from "react";
import { Button } from "../ui/Button";
import { ChevronRight, TrendingUp, Zap, ShieldCheck, Wallet, ArrowRight, Store } from "lucide-react";
import { motion } from "framer-motion";
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
        <section className="relative pt-32 md:pt-44 pb-16 overflow-hidden">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                    className="absolute w-[800px] h-[800px] rounded-full blur-[160px] opacity-30"
                    style={{ background: "radial-gradient(circle, var(--primary), transparent 70%)" }}
                    animate={{
                        x: ["-10%", "15%", "-5%", "10%", "-10%"],
                        y: ["-20%", "10%", "-10%", "5%", "-20%"],
                        scale: [1, 1.2, 0.9, 1.1, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute right-0 bottom-0 w-[700px] h-[700px] rounded-full blur-[140px] opacity-20"
                    style={{ background: "radial-gradient(circle, var(--secondary), transparent 70%)" }}
                    animate={{
                        x: ["10%", "-15%", "5%", "-10%", "10%"],
                        y: ["10%", "-10%", "15%", "-5%", "10%"],
                        scale: [1.1, 0.9, 1.2, 1, 1.1],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute left-1/3 top-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-15"
                    style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
                    animate={{
                        x: ["-5%", "10%", "-10%", "5%", "-5%"],
                        y: ["5%", "-15%", "10%", "-10%", "5%"],
                        scale: [0.9, 1.15, 1, 1.1, 0.9],
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-background/20" />
            </div>

            {/* Subtle grid lines */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/[0.02] -z-10" />
            <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/[0.02] -z-10" />

            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8 text-center lg:text-left relative z-10"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-primary text-xs font-medium tracking-wide backdrop-blur-xl">
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Dijital Cüzdan & Oyun Mağazası
                    </div>

                    {/* Headline */}
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-inter leading-[1.05] tracking-tight text-foreground">
                            {settings.heroHeadline} <br />
                            <span className="text-animate-rainbow">
                                {settings.heroSubheadline}
                            </span>
                        </h1>
                    </div>

                    <p className="text-foreground/50 text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                        Oyun kodlarınızı <span className="text-foreground/80 font-medium">en yüksek oranlarla</span> nakite çevirin,
                        dijital ürünleri güvenle satın alın. Tek platformda her şey.
                    </p>

                    {/* Search */}
                    <div className="py-2">
                        <GlobalSearch />
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                        <Button
                            size="lg"
                            className="h-14 w-full sm:w-auto px-8 rounded-xl bg-gradient-to-r from-primary to-secondary text-white shadow-[0_12px_32px_rgba(99,102,241,0.25)] font-semibold text-sm hover:shadow-[0_16px_40px_rgba(99,102,241,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                            onClick={() => router.push("/urunler")}
                        >
                            <Store size={18} className="mr-2" /> Mağazaya Git
                        </Button>
                        <Button
                            variant="secondary"
                            size="lg"
                            className="h-14 w-full sm:w-auto px-8 rounded-xl bg-card/20 border-white/[0.08] font-semibold text-sm hover:bg-card/40 transition-all text-foreground"
                            onClick={() => router.push("/bozum")}
                        >
                            <Zap size={18} className="mr-2" /> Kod Bozdur <ArrowRight size={16} className="ml-1.5 opacity-40" />
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/[0.04]">
                        {[
                            { label: "Aktif Üye", value: "12.5k+" },
                            { label: "Hacim", value: "₺4M+" },
                            { label: "Memnuniyet", value: "%99.8" },
                            { label: "Ort. Hız", value: "45sn" },
                        ].map((stat, i) => (
                            <div key={i} className="space-y-1">
                                <p className="text-[10px] text-foreground/20 font-medium tracking-wide">{stat.label}</p>
                                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Hero Visual */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative hidden lg:block"
                >
                    <div className="relative group">
                        <div className="absolute -inset-10 bg-primary/[0.1] blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity duration-1000 -z-10" />

                        <div className="relative glass p-3 rounded-[2.5rem] border-white/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.4)] bg-card/10">
                            <div className="relative aspect-square rounded-[2rem] overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200"
                                    alt="Premium Gaming & Finance"
                                    className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-[2s]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

                                {/* Floating Labels */}
                                <div className="absolute top-8 left-8 space-y-2.5">
                                    <div className="glass px-3.5 py-2 rounded-xl border-white/[0.12] backdrop-blur-2xl">
                                        <span className="text-[10px] font-semibold text-primary tracking-wide flex items-center gap-1.5">
                                            <Zap size={12} className="fill-primary" /> LİVE EXCHANGE
                                        </span>
                                    </div>
                                    <div className="bg-card/40 backdrop-blur-2xl px-3.5 py-2 rounded-xl border border-white/[0.08]">
                                        <span className="text-[10px] font-medium text-foreground/30 tracking-wide">SSL SECURED</span>
                                    </div>
                                </div>

                                <div className="absolute bottom-8 left-8 right-8">
                                    <div className="space-y-4">
                                        <div className="flex gap-1.5">
                                            <span className="w-10 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                                            <span className="w-3 h-0.5 bg-foreground/10 rounded-full" />
                                            <span className="w-3 h-0.5 bg-foreground/10 rounded-full" />
                                        </div>
                                        <h4 className="text-3xl font-bold text-white tracking-tight">
                                            Güvenli işlem, <br />en iyi kurlar.
                                        </h4>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Card - Top Right */}
                            <motion.div
                                animate={{ y: [0, -16, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute -top-10 -right-10 glass p-6 rounded-2xl border-white/[0.1] shadow-xl backdrop-blur-2xl"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-lg">
                                        <TrendingUp size={24} />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-[10px] text-foreground/25 font-medium tracking-wide">{featuredBozum.name}</p>
                                        <p className="text-2xl font-bold text-foreground tracking-tight">%{featuredBozum.price}</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating Card - Bottom Left */}
                            <motion.div
                                animate={{ y: [0, 16, 0] }}
                                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-10 -left-10 glass p-6 rounded-2xl border-white/[0.1] shadow-xl backdrop-blur-2xl bg-card/60"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-card/40 flex items-center justify-center text-primary border border-white/[0.08]">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-[10px] text-foreground/25 font-medium tracking-wide">Güvenlik</p>
                                        <p className="text-base font-semibold text-foreground">Tam Koruma</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Quick Access Ticker */}
            <div className="max-w-7xl mx-auto px-4 mt-16 md:mt-24">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/[0.06] via-secondary/[0.06] to-primary/[0.06] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <div className="relative glass rounded-2xl md:rounded-full border-white/[0.05] p-3 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth shadow-xl">
                        <div className="flex items-center gap-2.5 px-4 border-r border-white/[0.06] mr-1 shrink-0">
                            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center text-primary">
                                <Zap size={16} className="fill-primary" />
                            </div>
                            <span className="text-xs font-semibold text-foreground/60 whitespace-nowrap">Anlık Kurlar</span>
                        </div>
                        {tickerProducts.map((cat, i) => (
                            <button key={i} onClick={() => router.push(`/bozum?product=${cat.slug}`)} className="whitespace-nowrap flex items-center gap-3 px-5 py-2.5 rounded-xl md:rounded-full hover:bg-card/40 transition-all group/btn border border-transparent hover:border-white/[0.06] shrink-0">
                                <div className="w-6 h-6 flex items-center justify-center group-hover/btn:scale-110 transition-transform overflow-hidden rounded-md">
                                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col items-start leading-none gap-0.5">
                                    <span className="text-[10px] font-medium text-foreground/25 group-hover/btn:text-foreground/60 transition-colors">{cat.name}</span>
                                    <span className="text-xs font-semibold text-primary">%{cat.price}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
