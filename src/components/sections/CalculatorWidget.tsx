"use client";

import React, { useState } from "react";
import { Wallet, Calculator, Clock, ShieldCheck, ArrowRight, ChevronDown, TrendingUp, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useSystem } from "@/context/SystemContext";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const CalculatorWidget = () => {
    const { products } = useSystem();
    const router = useRouter();
    const [amount, setAmount] = useState<number>(100);
    const [selectedPlatform, setSelectedPlatform] = useState<number>(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const bozumProducts = products.filter(p => p.productType === "bozum" || p.slug.includes("bozum") || p.slug.includes("bozdurma"));
    const platforms = bozumProducts.length > 0 ? bozumProducts.map(p => ({
        name: p.name,
        rate: Number(p.price) || 80,
        image: p.image,
        slug: p.slug,
    })) : [
        { name: "Razer Gold", rate: 80, image: "/images/razer.webp", slug: "razer-gold-bozum" },
        { name: "Steam Cüzdan", rate: 78, image: "/images/steam.webp", slug: "steam-bozum" },
    ];

    const current = platforms[selectedPlatform] || platforms[0];
    const result = (amount * current.rate) / 100;

    return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.04] blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="space-y-8 text-center lg:text-left"
                    >
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-primary text-xs font-medium">
                                <Calculator size={12} /> Hesaplama Aracı
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold font-inter text-white leading-tight tracking-tight">
                                Kazancınızı <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Hesaplayın</span>
                            </h2>
                            <p className="text-white/30 text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
                                Platform seçin, tutarı girin, anında ne kadar kazanacağınızı görün.
                            </p>
                        </div>

                        {/* Feature Cards */}
                        <div className="grid sm:grid-cols-2 gap-3">
                            {[
                                { icon: Clock, label: "Anında Hesaplama", desc: "Canlı kur ile anlık sonuç" },
                                { icon: TrendingUp, label: "En İyi Oranlar", desc: "Piyasanın üzerinde kurlar" },
                                { icon: ShieldCheck, label: "Güvenli İşlem", desc: "SSL korumalı altyapı" },
                                { icon: Star, label: "VIP Avantajı", desc: "+5000₺ üzeri özel oranlar" },
                            ].map((feat, i) => (
                                <div key={i} className="flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] group hover:border-primary/15 transition-all">
                                    <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/20 group-hover:text-primary group-hover:bg-primary/10 group-hover:border-primary/20 transition-all shrink-0">
                                        <feat.icon size={16} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-white mb-0.5">{feat.label}</p>
                                        <p className="text-[10px] text-white/25 font-medium">{feat.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Calculator Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="relative"
                    >
                        <div className="absolute -inset-6 bg-primary/[0.06] blur-[60px] rounded-3xl -z-10" />

                        <div className="bg-white/[0.02] rounded-3xl border border-white/[0.08] overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.3)]">
                            {/* Card Header */}
                            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-5 border-b border-white/[0.04]">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                                            <Wallet size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-white">Bozum Hesaplayıcı</h4>
                                            <p className="text-[10px] text-white/30 font-medium">Canlı kurlarla hesaplayın</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[9px] font-medium text-green-400">CANLI</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 space-y-5">
                                {/* Platform Select */}
                                <div className="space-y-2">
                                    <label className="text-xs text-white/25 font-medium ml-1">Platform</label>
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className="w-full flex items-center justify-between bg-white/[0.03] border border-white/[0.06] p-3.5 rounded-xl text-sm font-medium text-white hover:border-primary/20 transition-all"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] p-1 flex items-center justify-center overflow-hidden">
                                                    <img src={current.image} alt={current.name} className="w-full h-full object-contain" />
                                                </div>
                                                <span>{current.name}</span>
                                            </div>
                                            <ChevronDown size={16} className={cn("text-white/25 transition-transform", isDropdownOpen && "rotate-180")} />
                                        </button>

                                        {isDropdownOpen && (
                                            <div className="absolute top-full left-0 right-0 mt-2 bg-[#0f0f14] border border-white/[0.08] rounded-xl shadow-2xl z-40 max-h-48 overflow-y-auto no-scrollbar">
                                                {platforms.map((p, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => { setSelectedPlatform(i); setIsDropdownOpen(false); }}
                                                        className={cn(
                                                            "flex items-center gap-3 w-full p-3 text-sm hover:bg-white/[0.04] transition-colors",
                                                            selectedPlatform === i ? "bg-primary/5 text-primary" : "text-white/60"
                                                        )}
                                                    >
                                                        <div className="w-7 h-7 rounded-lg bg-white/[0.04] p-1 overflow-hidden">
                                                            <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                                                        </div>
                                                        <span className="font-medium">{p.name}</span>
                                                        <span className="ml-auto text-xs font-semibold text-primary/70">%{p.rate}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Amount Input */}
                                <div className="space-y-2">
                                    <label className="text-xs text-white/25 font-medium ml-1">Tutar (₺)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(Number(e.target.value) || 0)}
                                            className="w-full bg-white/[0.03] border border-white/[0.06] px-4 py-3.5 rounded-xl text-xl font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-primary/30 transition-all focus:ring-2 focus:ring-primary/10"
                                            placeholder="100"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/15 text-sm font-medium">TL</span>
                                    </div>
                                </div>

                                {/* Result */}
                                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-5 border border-primary/10 space-y-3">
                                    <div className="flex justify-between items-center text-xs text-white/30 font-medium">
                                        <span>Kur Oranı</span>
                                        <span className="text-primary font-semibold">%{current.rate}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-white/30 font-medium">Tahmini Ödeme</span>
                                        <span className="text-3xl font-bold text-white tracking-tight font-mono">
                                            ₺{result.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {/* CTA */}
                                <button
                                    onClick={() => router.push(`/bozum?product=${current.slug}`)}
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/15 hover:shadow-primary/25 hover:scale-[1.01] active:scale-[0.99] transition-all"
                                >
                                    Hemen Bozdur <ArrowRight size={16} />
                                </button>

                                <p className="text-center text-[10px] text-white/15 font-medium">
                                    * Gösterilen tutar tahminidir. Gerçek tutar işlem anındaki kura göre değişiklik gösterebilir.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
