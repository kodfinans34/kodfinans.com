
"use client";

import React from "react";
import { Zap, Star, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSystem } from "@/context/SystemContext";
import { useRouter } from "next/navigation";

export const PlatformGrid = () => {
    const { products } = useSystem();
    const router = useRouter();

    const bozumProducts = products.filter(p => p.productType === "bozum" || p.slug.includes("bozum") || p.slug.includes("bozdurma"));

    return (
        <section className="py-12 md:py-16 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[150px] -z-10" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-8 space-y-4 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-primary text-[10px] font-black tracking-[0.3em] uppercase">
                        Hızlı Erişim
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black font-poppins text-white leading-tight uppercase italic tracking-tighter">
                        Popüler <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Bozum Kurları</span>
                    </h2>
                </div>

                {/* Grid Layout - 2 Columns on Mobile */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                    {bozumProducts.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            viewport={{ once: true }}
                            onClick={() => router.push(`/urun/${product.slug}`)}
                            className="group cursor-pointer w-full"
                        >
                            <div className="relative h-40 md:h-56 overflow-hidden rounded-[2rem] glass border-white/10 bg-[#08080a] p-4 md:p-6 flex flex-col justify-end transition-all duration-500 group-hover:-translate-y-2 group-hover:border-primary/30 group-hover:shadow-[0_20px_40px_rgba(74,188,241,0.1)]">
                                {/* Image & Gradient */}
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/60 to-transparent" />
                                </div>

                                <div className="relative z-10 space-y-2 md:space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1 px-2 py-0.5 md:px-3 md:py-1 bg-primary/20 backdrop-blur-md rounded-lg border border-primary/20">
                                            <Zap size={8} className="text-primary fill-primary md:w-3 md:h-3" />
                                            <span className="text-[8px] md:text-[9px] font-black text-white uppercase tracking-widest">{product.speed || "Anında"}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm md:text-xl font-black text-white uppercase italic tracking-tighter group-hover:text-primary transition-colors leading-none line-clamp-2">
                                            {product.name}
                                        </h3>
                                        <p className="text-[8px] md:text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mt-1">
                                            %{product.price} ORAN
                                        </p>
                                    </div>
                                </div>

                                {/* Floating Logo */}
                                <div className="absolute top-3 right-3 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 rounded-xl glass border border-white/10 p-1.5 md:p-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                    <img src={product.logo || "/logo.png"} alt="logo" className="w-full h-full object-contain brightness-0 invert" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
