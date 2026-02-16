
"use client";

import React from "react";
import { Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useSystem } from "@/context/SystemContext";
import { useRouter } from "next/navigation";

export const PlatformGrid = () => {
    const { products } = useSystem();
    const router = useRouter();

    const bozumProducts = products.filter(p => p.productType === "bozum" || p.slug.includes("bozum") || p.slug.includes("bozdurma"));

    return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-primary/[0.06] blur-[120px] -z-10" />
            <div className="absolute top-0 right-0 w-60 h-60 bg-secondary/[0.04] blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-10 space-y-3 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-primary text-xs font-medium">
                        <Zap size={12} className="fill-primary" /> Popüler Platformlar
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold font-inter text-white leading-tight tracking-tight">
                        Bozum <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Kurları</span>
                    </h2>
                    <p className="text-white/30 text-sm max-w-lg">Dijital kodlarınızı en güncel kurlarla anında nakite çevirin.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                    {bozumProducts.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.04 }}
                            viewport={{ once: true }}
                            onClick={() => router.push(`/bozum?product=${product.slug}`)}
                            className="group cursor-pointer w-full"
                        >
                            <div className="relative h-36 md:h-52 overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.06] p-4 md:p-5 flex flex-col justify-end transition-all duration-500 group-hover:-translate-y-1 group-hover:border-primary/20 group-hover:shadow-[0_16px_32px_rgba(99,102,241,0.08)]">
                                {/* Image */}
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/70 to-transparent" />
                                </div>

                                <div className="relative z-10 space-y-2">
                                    <div className="flex items-center gap-1 px-2 py-0.5 bg-primary/15 backdrop-blur rounded-md border border-primary/15 w-fit">
                                        <Zap size={8} className="text-primary fill-primary" />
                                        <span className="text-[8px] md:text-[9px] font-medium text-white/80">{product.speed || "Anında"}</span>
                                    </div>

                                    <div>
                                        <h3 className="text-sm md:text-base font-semibold text-white group-hover:text-primary transition-colors leading-tight line-clamp-2">
                                            {product.name}
                                        </h3>
                                        <p className="text-xs font-semibold text-primary/80 mt-1">
                                            %{product.price} oran
                                        </p>
                                    </div>
                                </div>

                                {/* Logo */}
                                <div className="absolute top-3 right-3 md:top-4 md:right-4 w-7 h-7 md:w-9 md:h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] p-1.5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
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
