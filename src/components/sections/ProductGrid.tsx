"use client";

import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Star, Zap, Gift, CreditCard, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSystem } from "@/context/SystemContext";
import { useRouter } from "next/navigation";

const categories = [
    { id: "all", name: "Tümü", icon: LayoutGrid },
    { id: "gift", name: "Hediye Kartları", icon: Gift },
    { id: "games", name: "Oyun Paraları", icon: Zap },
    { id: "items", name: "İtem & GB", icon: CreditCard },
];

export const ProductGrid = () => {
    const { products } = useSystem();
    const [activeTab, setActiveTab] = useState("all");
    const router = useRouter();

    const bozumProducts = (products || []).filter(p => p.productType === "bozum" || p.slug.includes("bozum") || p.slug.includes("bozdurma"));

    const filteredProducts = activeTab === "all"
        ? bozumProducts
        : bozumProducts.filter(p => p.category === activeTab);

    return (
        <section className="py-16 md:py-24 relative" id="products">
            <div className="absolute top-1/4 left-0 w-80 h-80 bg-primary/[0.04] blur-[100px] rounded-full -z-10" />
            <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-secondary/[0.04] blur-[100px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-10 md:mb-14 gap-8">
                    <div className="space-y-4 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-primary text-xs font-medium">
                            <Zap size={12} className="fill-primary" /> Kod Bozdurma
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold font-inter text-white leading-tight tracking-tight">
                            Bozdurma <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-400">Merkezi</span>
                        </h2>
                        <p className="text-white/30 max-w-lg text-sm leading-relaxed">
                            Dijital kodlarınızı saniyeler içinde nakite dönüştürün. En iyi kur, anlık onay.
                        </p>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex bg-white/[0.02] border border-white/[0.05] p-1 rounded-xl backdrop-blur w-full md:w-auto overflow-x-auto no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={cn(
                                    "flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium transition-all duration-300 whitespace-nowrap",
                                    activeTab === cat.id
                                        ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20"
                                        : "text-white/25 hover:text-white/60 hover:bg-white/[0.03]"
                                )}
                            >
                                <cat.icon size={14} />
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: i * 0.04 }}
                                viewport={{ once: true }}
                                className="group relative"
                            >
                                <div className="absolute -inset-[1px] bg-gradient-to-b from-primary/15 to-transparent rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition duration-500" />
                                <div className="relative h-full bg-white/[0.02] p-3 rounded-2xl border border-white/[0.06] flex flex-col justify-between overflow-hidden group-hover:border-primary/15 transition-colors">

                                    {/* Image */}
                                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-3">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-70" />

                                        {product.badge && (
                                            <div className="absolute top-2.5 left-2.5 z-20">
                                                <span className="bg-primary/90 backdrop-blur text-white text-[9px] font-semibold px-2 py-1 rounded-md">
                                                    {product.badge}
                                                </span>
                                            </div>
                                        )}

                                        <div className="absolute bottom-2.5 right-2.5 z-20 w-7 h-7 bg-[#0f0f14] border border-white/[0.08] rounded-lg p-1 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                            {product.logo && <img src={product.logo} alt="logo" className="w-full h-full object-contain brightness-0 invert" />}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-2.5 flex-1 flex flex-col">
                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center gap-1">
                                                    <Star size={10} className="fill-yellow-500 text-yellow-500" />
                                                    <span className="text-[10px] font-medium text-white/30">{product.rating}</span>
                                                </div>
                                                <span className="text-[9px] font-medium text-emerald-400 flex items-center gap-0.5">
                                                    <Zap size={9} /> {product.speed}
                                                </span>
                                            </div>
                                            <h3 className="text-sm md:text-base font-semibold text-white leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                                                {product.name}
                                            </h3>
                                        </div>

                                        <div className="mt-auto space-y-2.5">
                                            <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] group-hover:border-primary/15 transition-colors">
                                                <span className="text-[9px] text-white/25 font-medium">Kur</span>
                                                <span className="text-sm font-bold text-white tracking-tight">{product.price}</span>
                                            </div>

                                            <div className="flex gap-2">
                                                <Button onClick={() => router.push(`/bozum?product=${product.slug}`)} className="flex-1 py-3 h-auto rounded-xl text-[10px] font-medium transition-all bg-white/[0.03] border border-white/[0.06] text-white hover:bg-white/[0.06] hover:border-primary/20" variant="ghost">
                                                    <span className="flex items-center justify-center gap-1">Bozdur</span>
                                                </Button>
                                                <Button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (product.linkedSalesSlug) {
                                                            router.push(`/urun/${product.linkedSalesSlug}`);
                                                            return;
                                                        }
                                                        const search = product.name.split(' ')[0].toLowerCase();
                                                        const found = products.find(p => p.productType === "satis" && p.name.toLowerCase().includes(search));
                                                        const target = found?.slug || product.slug.replace("-bozum", "").replace("-bozdurma", "");
                                                        router.push(`/urun/${target}`);
                                                    }}
                                                    className="flex-1 py-3 h-auto rounded-xl text-[10px] font-medium transition-all bg-primary/10 border border-primary/15 text-primary hover:bg-primary hover:text-white"
                                                    variant="ghost"
                                                >
                                                    <span className="flex items-center justify-center gap-1">Satın Al</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Stats */}
                <div className="mt-20 grid md:grid-cols-3 gap-6">
                    {[
                        { label: "Anlık İşlem Sayısı", val: "1,492", sub: "Gecikmesiz Onay" },
                        { label: "Minimum Bozum Hızı", val: "22sn", sub: "Global Standart" },
                        { label: "Kullanıcı Güveni", val: "%100", sub: "SSL Korumalı" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="bg-white/[0.02] p-8 md:p-10 rounded-2xl border border-white/[0.05] text-center space-y-3 group hover:border-primary/15 transition-all"
                        >
                            <p className="text-[11px] text-white/25 font-medium tracking-wide">{stat.label}</p>
                            <p className="text-4xl md:text-5xl font-bold text-white font-inter tracking-tight group-hover:text-primary transition-colors">{stat.val}</p>
                            <p className="text-xs font-medium text-primary/70">{stat.sub}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
