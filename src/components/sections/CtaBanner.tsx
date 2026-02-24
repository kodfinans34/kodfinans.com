"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Sparkles, Zap, TrendingUp } from "lucide-react";
import { useSystem } from "@/context/SystemContext";

export const CtaBanner = () => {
    const { settings } = useSystem();

    if (settings.ctaBannerEnabled === false) return null;

    const title = settings.ctaBannerTitle || "Razer Gold Bozdurma";
    const description = settings.ctaBannerDescription || "Razer Gold, Steam, iTunes ve tüm dijital kodlarınızı en yüksek oranlarla bozdurun!";
    const buttonText = settings.ctaBannerButtonText || "WhatsApp ile İletişime Geç";
    const whatsappMessage = encodeURIComponent(settings.ctaBannerWhatsappMessage || "Merhaba, kod bozdurma hakkında bilgi almak istiyorum.");
    const whatsappNumber = (settings.whatsappNumber || "+905517139330").replace(/[^0-9]/g, "");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <section className="py-12 md:py-20 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
                <motion.div
                    animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/[0.08] blur-[120px] rounded-full"
                />
                <motion.div
                    animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.3, 1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/[0.06] blur-[100px] rounded-full"
                />
            </div>

            <div className="max-w-5xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-8 md:p-14 overflow-hidden"
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/15 to-transparent rounded-bl-full -z-0" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-secondary/10 to-transparent rounded-tr-full -z-0" />

                    {/* Floating icons */}
                    <motion.div
                        animate={{ y: [-8, 8, -8], rotate: [0, 10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-6 right-8 md:top-10 md:right-16 text-primary/20"
                    >
                        <Sparkles size={32} />
                    </motion.div>
                    <motion.div
                        animate={{ y: [6, -6, 6], rotate: [0, -15, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-8 right-20 md:bottom-12 md:right-32 text-secondary/15"
                    >
                        <TrendingUp size={28} />
                    </motion.div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        {/* Text Content */}
                        <div className="flex-1 text-center md:text-left space-y-5">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider"
                            >
                                <Zap size={12} className="fill-primary" />
                                Yüksek Oranlar
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl md:text-4xl lg:text-5xl font-black font-inter text-foreground leading-tight tracking-tight"
                            >
                                {title.split(" ").map((word, i) => (
                                    <span key={i}>
                                        {i === 0 ? (
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{word} </span>
                                        ) : (
                                            <span>{word} </span>
                                        )}
                                    </span>
                                ))}
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="text-foreground/40 text-sm md:text-base leading-relaxed max-w-lg"
                            >
                                {description}
                            </motion.p>
                        </div>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, type: "spring" }}
                            className="shrink-0"
                        >
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold text-sm md:text-base rounded-2xl shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                            >
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                                <MessageCircle size={20} className="relative z-10" />
                                <span className="relative z-10 whitespace-nowrap">{buttonText}</span>
                                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <p className="text-center text-[10px] text-foreground/20 mt-3 font-medium">
                                Hızlı yanıt • 7/24 destek
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
