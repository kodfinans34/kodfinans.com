"use client";

import React, { useEffect, useState } from "react";
import { useSystem } from "@/context/SystemContext";
import {
    Coins,
    ShoppingCart,
    ArrowRight,
    Zap,
    ShieldCheck,
    ChevronRight,
    Search,
    MessageCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getKOItems, KnightOnlineItem } from "@/lib/firebase-ko";
import { Button } from "../ui/Button";

export const KnightOnlineSection = () => {
    const { settings } = useSystem();
    const [items, setItems] = useState<KnightOnlineItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadItems = async () => {
            const data = await getKOItems();
            setItems(data.filter(i => i.status === "active").slice(0, 4));
            setLoading(false);
        };
        loadItems();
    }, []);

    if (settings.koServicesEnabled === false) return null;

    return (
        <section className="py-20 relative overflow-hidden" id="knight-online">
            {/* Background Decorations */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 blur-[100px] rounded-full -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                    <div className="space-y-4 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-primary text-xs font-black uppercase tracking-widest">
                            <Zap size={14} fill="currentColor" /> {settings.koSectionTitle || "Knight Online Zero"}
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black font-inter tracking-tighter uppercase italic leading-none text-foreground">
                            ZERO SUNUCUSU <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">ÖZEL PAZARI</span>
                        </h2>
                        <p className="text-foreground/30 max-w-lg text-sm font-medium">
                            {settings.koSectionDescription || "Zero sunucusuna özel GB ve İtem alım satım merkezi. En iyi oranlar ve anında teslimat."}
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-stretch">
                    {/* Left Side: GB Buy/Sell */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-card/40 border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden h-full flex flex-col justify-between group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Coins size={120} />
                            </div>

                            <div className="relative space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                        <Coins size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-white uppercase italic">GB ALIM & SATIM</h3>
                                        <p className="text-[10px] text-white/30 font-bold tracking-widest uppercase">Canlı Zero Sunucu Kurları</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {/* Alış */}
                                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between hover:border-primary/30 transition-all gap-4">
                                        <div className="text-center sm:text-left">
                                            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">BİZ ALIYORUZ</p>
                                            <p className="text-xl sm:text-2xl font-black text-white italic mt-1">₺{settings.koGbBuyRate || "0"}</p>
                                        </div>
                                        <a
                                            href="/knight-online"
                                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 h-12 sm:h-14 bg-gradient-to-r from-primary to-blue-500 hover:scale-[1.02] text-white font-black uppercase tracking-widest transition-all shadow-lg shadow-primary/20 rounded-xl"
                                        >
                                            BİZE SAT
                                        </a>
                                    </div>

                                    {/* Satış */}
                                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between hover:border-blue-500/30 transition-all gap-4">
                                        <div className="text-center sm:text-left">
                                            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest whitespace-nowrap">BİZ SATIYORUZ</p>
                                            <p className="text-xl sm:text-2xl font-black text-white italic mt-1">₺{settings.koGbSellRate || "0"}</p>
                                        </div>
                                        <a
                                            href="/knight-online"
                                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 h-12 sm:h-14 bg-gradient-to-r from-blue-500 to-primary hover:scale-[1.02] text-white font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20 rounded-xl whitespace-nowrap"
                                        >
                                            SATIN AL
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 pt-6 border-t border-white/5">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck size={16} className="text-primary" />
                                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Hızlı Teslimat</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Zap size={16} className="text-primary" />
                                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Güvenli İşlem</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Item Market */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-card/40 border border-white/5 rounded-[2.5rem] p-8 h-full">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                                        <ShoppingCart size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-white uppercase italic">İTEM PAZARI</h3>
                                        <p className="text-[10px] text-white/30 font-bold tracking-widest uppercase">Zero Sunucusu İlanları</p>
                                    </div>
                                </div>
                                <a href="/knight-online">
                                    <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white flex items-center gap-2">
                                        TÜMÜNÜ GÖR <ChevronRight size={14} />
                                    </Button>
                                </a>
                            </div>

                            {loading ? (
                                <div className="flex justify-center py-12">
                                    <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {items.length > 0 ? items.map((item) => (
                                        <div key={item.id} className="group bg-white/[0.02] border border-white/5 rounded-2xl p-4 hover:bg-white/[0.04] transition-all relative overflow-hidden">
                                            <div className="flex gap-4 items-center">
                                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/40 border border-white/5 shrink-0">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-xs font-black text-white uppercase truncate">{item.name}</h4>
                                                    <p className="text-[10px] font-black text-primary italic mt-0.5">₺{item.price}</p>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                                        <span className="text-[8px] font-bold text-white/20 uppercase tracking-tighter">Mevcut</span>
                                                    </div>
                                                </div>
                                                <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-primary group-hover:text-white transition-all">
                                                    <MessageCircle size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="col-span-2 py-12 text-center">
                                            <p className="text-white/20 text-xs font-bold uppercase tracking-widest">Henüz ilan bulunmuyor.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* CTA */}
                            <div className="mt-8">
                                <a
                                    href="/knight-online"
                                    className="w-full inline-flex items-center justify-center gap-2 h-14 bg-white/5 hover:bg-primary text-white font-black uppercase tracking-widest transition-all rounded-xl"
                                >
                                    <button className="w-full py-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center gap-3">
                                        İTEM İLANI EKLEMEK İÇİN WHATSAPP'TAN YAZIN <ArrowRight size={14} />
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
