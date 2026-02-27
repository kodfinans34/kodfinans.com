"use client";

import React from "react";
import { Coins, ShoppingCart, ArrowRightLeft, TrendingUp, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useSystem } from "@/context/SystemContext";
import { Button } from "@/components/ui/Button";

export const ZeroSection = () => {
    const { settings } = useSystem();

    if (!settings.zeroServicesEnabled) return null;

    const items = [
        {
            title: "Zero GB Alış",
            rate: settings.zeroGbBuyRate || "15.50",
            icon: Coins,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
            buttonText: "Hemen Sat",
            type: "buy"
        },
        {
            title: "Zero GB Satış",
            rate: settings.zeroGbSellRate || "16.80",
            icon: ShoppingCart,
            color: "text-primary",
            bg: "bg-primary/10",
            border: "border-primary/20",
            buttonText: "Hemen Al",
            type: "sell"
        },
        {
            title: "Zero Item Satış",
            rate: settings.zeroItemSellRate || "900",
            icon: TrendingUp,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
            buttonText: "İncele",
            type: "item"
        }
    ];

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.02] blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-12 text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-primary text-xs font-semibold">
                        <Zap size={14} className="fill-primary" /> Özel Hizmetler
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                        {settings.zeroSectionTitle || "Zero İşlemleri"}
                    </h2>
                    <p className="text-white/30 text-sm max-w-xl mx-auto leading-relaxed">
                        {settings.zeroSectionDescription || "Zero GB ve Item alım/satım işlemlerinizi en yüksek oranlar ve anında teslimat garantisi ile güvenle gerçekleştirin."}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="group relative"
                        >
                            <div className="absolute -inset-px bg-gradient-to-b from-white/[0.08] to-transparent rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative h-full bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8 flex flex-col items-center text-center space-y-6 transition-all duration-300 group-hover:border-white/[0.12] group-hover:bg-white/[0.04]">
                                {/* Icon Container */}
                                <div className={`w-14 h-14 rounded-xl ${item.bg} border ${item.border} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                                    <item.icon className={`w-7 h-7 ${item.color}`} />
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-white tracking-tight">{item.title}</h3>
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Oran/Fiyat</span>
                                        <div className={`text-2xl font-black ${item.color} tracking-tighter`}>
                                            {item.type === "item" ? `₺${item.rate}` : `₺${item.rate}`}
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => window.open(`https://wa.me/${(settings.whatsappNumber || "+905517139330").replace(/\D/g, '')}?text=Merhaba, ${item.title} hakkında bilgi almak istiyorum.`)}
                                    className={`w-full py-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 ${item.type === "sell" ? "bg-primary hover:bg-primary/80" :
                                            item.type === "buy" ? "bg-emerald-500 hover:bg-emerald-600" :
                                                "bg-blue-500 hover:bg-blue-600"
                                        } text-white shadow-lg`}
                                >
                                    {item.buttonText}
                                    <ArrowRightLeft size={16} className="ml-2 opacity-50" />
                                </Button>

                                <p className="text-[10px] text-white/10 font-medium">Anında Teslimat • Güvenilir İşlem</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
