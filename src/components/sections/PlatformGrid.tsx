
"use client";

import React from "react";
import { Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useSystem } from "@/context/SystemContext";
import { useRouter } from "next/navigation";

export const PlatformGrid = () => {
    const { products } = useSystem();
    const router = useRouter();

    const bozumProducts = (products || []).filter(p => p.productType === "bozum" || p.slug.includes("bozum") || p.slug.includes("bozdurma"));

    return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-primary/[0.06] blur-[120px] -z-10" />
            <div className="absolute top-0 right-0 w-60 h-60 bg-secondary/[0.04] blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-10 space-y-3 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/60 border border-white/[0.06] text-primary text-xs font-medium">
                        <Zap size={12} className="fill-primary" /> Popüler Platformlar
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold font-inter text-foreground leading-tight tracking-tight">
                        Bozum <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Kurları</span>
                    </h2>
                    <p className="text-foreground/30 text-sm max-w-lg">Dijital kodlarınızı en güncel kurlarla anında nakite çevirin.</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {bozumProducts.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.04, duration: 0.6 }}
                            viewport={{ once: true }}
                            onClick={() => router.push(`/bozum/${product.slug}`)}
                            className="group cursor-pointer w-full relative"
                        >
                            {/* Glow Effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-500" />

                            <div className="relative h-44 md:h-60 overflow-hidden rounded-[1.8rem] bg-[#0a0f0d] border border-white/[0.06] p-5 md:p-7 flex flex-col justify-end transition-all duration-500 hover:border-primary/30 shadow-xl shadow-black/20">
                                {/* Image & Layering */}
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-[2s] ease-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-[#0a0f0d]/90 to-transparent" />
                                </div>

                                <div className="relative z-10 space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-lg">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-[9px] font-black text-green-400 tracking-wider">AKTİF</span>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-[13px] md:text-lg font-black text-white group-hover:text-primary transition-colors leading-tight line-clamp-2 uppercase italic tracking-tight">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="text-[10px] font-black text-foreground/40 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">Kur</div>
                                            <p className="text-xl md:text-2xl font-black text-primary tracking-tighter italic">
                                                {String(product.price).startsWith("%") ? product.price : `%${product.price}`}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Logo */}
                                <div className="absolute top-5 right-5 md:top-7 md:right-7 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/[0.03] border border-white/10 p-2.5 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 shadow-2xl backdrop-blur-sm">
                                    <img src={product.logo || "/logo.png"} alt="logo" className="w-full h-full object-contain filter brightness-110" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
