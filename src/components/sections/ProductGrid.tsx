"use client";

import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Star, Zap, ShieldCheck, Gamepad2, Gift, CreditCard, ChevronRight, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSystem } from "@/context/SystemContext";
import Link from "next/link";
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


    const bozumProducts = products.filter(p => p.productType === "bozum" || p.slug.includes("bozum") || p.slug.includes("bozdurma"));

    const filteredProducts = activeTab === "all"
        ? bozumProducts
        : bozumProducts.filter(p => p.category === activeTab);

    // Filter to show only unique products loosely based on name if needed, 
    // but for now let's show everything or prioritize "sales" items if user wants.
    // User said "Anasayfadaki ürünler görünüümü bozum yapı bozma hiç".
    // So we display what is in context.

    return (
        <section className="py-12 md:py-16 relative" id="products">
            {/* Premium Background Glows */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-4">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 md:mb-16 gap-10">
                    <div className="space-y-6 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.03] border border-white/5 text-primary text-[10px] font-black tracking-[0.3em] uppercase">
                            Market Segmenti
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black font-poppins text-white leading-[0.9] tracking-tighter uppercase italic">
                            KOD <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">BOZDURMA</span>
                        </h2>
                        <p className="text-white/30 max-w-xl text-lg leading-relaxed font-medium">
                            Gaming ve dijital varlıklarınızı saniyeler içinde nakit güce dönüştürün.
                            En iyi kur, anlık onay, tam güven.
                        </p>
                    </div>

                    <div className="flex bg-white/[0.02] border border-white/[0.06] p-2 rounded-[2.5rem] backdrop-blur-3xl w-full md:w-auto overflow-x-auto no-scrollbar shadow-2xl">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={cn(
                                    "flex items-center justify-center gap-3 px-8 py-4 rounded-[2rem] text-[13px] font-black transition-all duration-500 whitespace-nowrap",
                                    activeTab === cat.id
                                        ? "bg-gradient-to-tr from-primary to-secondary text-white shadow-[0_10px_25px_rgba(74,188,241,0.4)] scale-105"
                                        : "text-white/20 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <cat.icon size={18} />
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                                viewport={{ once: true }}
                                className="group relative"
                            >
                                <div className="absolute -inset-[1px] bg-gradient-to-b from-primary/20 to-transparent rounded-[2rem] blur-sm opacity-0 group-hover:opacity-100 transition duration-500" />
                                <div className="relative h-full glass p-3 md:p-4 rounded-[2rem] border-white/5 bg-[#08080a] flex flex-col justify-between overflow-hidden group-hover:bg-white/[0.02] transition-colors">

                                    {/* Image Area - Compact */}
                                    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] mb-4 shadow-lg group-hover:shadow-primary/10 transition-shadow">
                                        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-all duration-[1.5s] group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-transparent to-transparent opacity-80" />

                                        {/* Floating Badge */}
                                        <div className="absolute top-3 left-3 z-20">
                                            {product.badge && (
                                                <span className="bg-primary/90 backdrop-blur-md text-white text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest shadow-lg shadow-primary/20">
                                                    {product.badge}
                                                </span>
                                            )}
                                        </div>

                                        {/* Logo Overlay */}
                                        <div className="absolute bottom-3 right-3 z-20 w-8 h-8 bg-[#1a1a1c] border border-white/10 rounded-xl p-1.5 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                                            {product.logo && <img src={product.logo} alt="logo" className="w-full h-full object-contain brightness-0 invert opacity-100" />}
                                        </div>
                                    </div>

                                    {/* Content Area - Condensed to fit */}
                                    <div className="space-y-3 flex-1 flex flex-col">
                                        <div>
                                            <div className="flex items-center justify-between mb-1.5">
                                                <div className="flex items-center gap-1">
                                                    <Star size={10} className="fill-yellow-500 text-yellow-500" />
                                                    <span className="text-[10px] font-bold text-white/40">{product.rating}</span>
                                                </div>
                                                <span className="text-[9px] font-black text-green-400 uppercase tracking-widest flex items-center gap-1">
                                                    <Zap size={10} /> {product.speed}
                                                </span>
                                            </div>
                                            <h3 className="text-lg md:text-xl font-black text-white leading-none tracking-tighter uppercase line-clamp-1 group-hover:text-primary transition-colors">
                                                {product.name}
                                            </h3>
                                        </div>

                                        <div className="mt-auto space-y-3">
                                            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] group-hover:border-primary/20 transition-colors">
                                                <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Kur</span>
                                                <span className="text-base font-black text-white tracking-tighter italic">{product.price}</span>
                                            </div>

                                            <div className="flex gap-2">
                                                <Button onClick={() => router.push(`/bozum?product=${product.slug}`)} className="flex-1 py-4 h-auto rounded-2xl text-[9px] font-black tracking-[0.2em] uppercase transition-all group/btn bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-primary/50 shadow-lg relative overflow-hidden" variant="ghost">
                                                    <span className="relative z-10 flex items-center justify-center gap-1">BOZUM YAP</span>
                                                </Button>
                                                <Button
                                                    onClick={(e) => {
                                                        e.stopPropagation();

                                                        // 1. Eğer admin panelden özel bir satış slug'ı bağlanmışsa onu kullan
                                                        if (product.linkedSalesSlug) {
                                                            router.push(`/urun/${product.linkedSalesSlug}`);
                                                            return;
                                                        }

                                                        // 2. Yoksa otomatik eşleştirme algoritmasını kullan
                                                        const search = product.name.split(' ')[0].toLowerCase();
                                                        const found = products.find(p => p.productType === "satis" && p.name.toLowerCase().includes(search));

                                                        const target = found?.slug || product.slug.replace("-bozum", "").replace("-bozdurma", "");
                                                        router.push(`/urun/${target}`);
                                                    }}
                                                    className="flex-1 py-4 h-auto rounded-2xl text-[9px] font-black tracking-[0.2em] uppercase transition-all group/btn bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/20 text-white hover:from-primary hover:to-secondary hover:shadow-[0_0_30px_rgba(74,188,241,0.3)] shadow-lg relative overflow-hidden"
                                                    variant="ghost"
                                                >
                                                    <span className="relative z-10 flex items-center justify-center gap-1">SATIN AL</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Statistics Bar - Premium look */}
                <div className="mt-36 grid md:grid-cols-3 gap-10">
                    {[
                        { label: "Anlık İşlem Sayısı", val: "1,492", sub: "Gecikmesiz Onay" },
                        { label: "Minimum Bozum Hızı", val: "22sn", sub: "Global Standart" },
                        { label: "Kullanıcı Güveni", val: "%100", sub: "BDDK Lisanslı" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass p-12 rounded-[4rem] border-white/5 text-center space-y-4 group relative overflow-hidden shadow-2xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <p className="text-[12px] font-black text-white/40 uppercase tracking-[0.4em] mb-2">{stat.label}</p>
                            <p className="text-5xl md:text-6xl font-black text-white font-poppins tracking-tighter shadow-white/5 transition-transform group-hover:scale-105 duration-500">{stat.val}</p>
                            <p className="text-sm font-bold text-primary italic uppercase tracking-widest">{stat.sub}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
