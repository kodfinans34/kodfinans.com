"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { Calculator, ArrowRight, CheckCircle2, RefreshCcw, TrendingUp, Wallet2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, extractBozumRate } from "@/lib/utils";
import { useRouter } from "next/navigation";

import { useSystem } from "@/context/SystemContext";

interface CalculatorWidgetProps {
    initialProduct?: string;
    compact?: boolean;
}

export const CalculatorWidget = ({ initialProduct = "Razer Gold", compact = false }: CalculatorWidgetProps) => {
    const router = useRouter();
    const { products } = useSystem();
    const [amount, setAmount] = useState<string>("");
    const [isCalculating, setIsCalculating] = useState(false);

    const bozumProducts = products.filter(p => p.productType === "bozum" || p.slug.includes("bozum") || p.slug.includes("bozdurma"));
    const [selectedProduct, setSelectedProduct] = useState(initialProduct || (bozumProducts[0]?.name || ""));

    const calculateResult = () => {
        const numAmount = parseFloat(amount) || 0;
        if (numAmount === 0) return "0,00";

        const product = bozumProducts.find(p => p.name === selectedProduct);
        if (!product) return "0,00";

        const netRate = extractBozumRate(product.price);

        return (numAmount * netRate).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    useEffect(() => {
        if (amount) {
            setIsCalculating(true);
            const timer = setTimeout(() => setIsCalculating(false), 300);
            return () => clearTimeout(timer);
        }
    }, [amount, selectedProduct]);

    return (
        <section className={cn("relative overflow-hidden", compact ? "py-0" : "py-12 md:py-20")} id="calculate">
            {/* Background Decor */}
            {!compact && (
                <>
                    <div className="absolute top-0 right-[-10%] w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full -z-10" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full -z-10" />
                </>
            )}

            <div className={cn("mx-auto px-4", compact ? "max-w-full" : "max-w-6xl")}>
                {/* Title Section */}
                {!compact && (
                    <div className="text-center mb-12 space-y-6">
                        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/[0.02] border border-white/[0.06] text-[11px] font-black text-white/50 tracking-[0.4em] uppercase backdrop-blur-3xl shadow-2xl">
                            FINANCE ENGINE V3
                        </div>
                        <h2 className="text-5xl md:text-[6rem] font-black font-poppins text-white leading-[0.9] tracking-tighter uppercase italic drop-shadow-2xl">
                            Kazancını <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Live</span> Hesapla
                        </h2>
                    </div>
                )}

                <div className={cn(
                    "glass border-white/[0.06] p-4 relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] bg-white/[0.02]",
                    compact ? "rounded-[2rem]" : "rounded-[3rem] md:p-8"
                )}>
                    <div className={cn("grid gap-6 items-stretch", compact ? "grid-cols-1" : "lg:grid-cols-2")}>

                        {/* Input Panel */}
                        <div className={cn(
                            "bg-white/[0.02] border border-white/[0.05]",
                            compact ? "rounded-[1.5rem] p-6 space-y-6" : "p-6 md:p-10 space-y-8 rounded-[2.5rem]"
                        )}>
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] ml-2">DİJİTAL VARLIK</label>
                                    <div className="relative group">
                                        <select
                                            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl px-6 py-4 text-base font-bold text-white focus:outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer relative z-10 hover:bg-white/5 uppercase tracking-wide"
                                            value={selectedProduct}
                                            onChange={(e) => setSelectedProduct(e.target.value)}
                                        >
                                            {bozumProducts.map(p => (
                                                <option key={p.id} value={p.name} className="bg-[#050506]">{p.name}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none z-20 text-white/40">
                                            <Wallet2 size={20} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] ml-2">TUTAR (TRY)</label>
                                    <div className="relative group">
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl px-6 py-4 text-3xl font-bold text-white placeholder:text-white/[0.05] focus:outline-none focus:border-primary/50 transition-all relative z-10 font-poppins tracking-tight bg-transparent"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20">
                                            <span className="text-primary font-bold text-sm">TRY</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {!compact && (
                                <div className="p-6 rounded-[2rem] glass border-white/[0.06] flex gap-5 items-center relative overflow-hidden group/vip">
                                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/vip:opacity-100 transition-opacity" />
                                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                                        <TrendingUp size={20} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold text-white uppercase tracking-wide">VIP Avantajı</p>
                                        <p className="text-[11px] text-white/40 leading-relaxed font-medium">
                                            50.000₺ üzerine <span className="text-primary font-bold">Özel Oran</span>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Results Card */}
                        <div className="relative group flex h-full">
                            <div className="absolute -inset-10 bg-primary/20 blur-[80px] opacity-10 group-hover:opacity-20 transition duration-1000 -z-10" />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className={cn(
                                    "relative bg-white/[0.03] border border-white/[0.08] backdrop-blur-md overflow-hidden flex flex-col justify-between w-full shadow-2xl",
                                    compact ? "rounded-[1.5rem] p-6 space-y-6" : "rounded-[2.5rem] p-8 space-y-8"
                                )}
                            >
                                {/* Header */}
                                <div className={cn(
                                    "flex justify-between items-center border-b border-white/[0.05] relative",
                                    compact ? "mb-4 pb-4" : "mb-6 pb-6"
                                )}>
                                    <div>
                                        <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">ÖZET</p>
                                        <h4 className="text-xl font-black text-white uppercase tracking-tight">İşlem Detayı</h4>
                                    </div>
                                    <div className="w-10 h-10 bg-white/[0.05] rounded-xl flex items-center justify-center text-primary/40 border border-white/[0.08]">
                                        <RefreshCcw size={20} className={cn("transition-all", isCalculating && "animate-spin text-primary")} />
                                    </div>
                                </div>

                                <div className={cn("space-y-4 relative", compact ? "mb-4" : "mb-6")}>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-white/40 font-medium">Güncel Oran</span>
                                        <span className="text-primary font-bold bg-primary/10 px-3 py-1 rounded-lg border border-primary/20">
                                            %{(extractBozumRate(bozumProducts.find(p => p.name === selectedProduct)?.price || 0) * 100).toFixed(1)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-white/40">Tahmini İşlem Süresi</span>
                                        <span className="text-white/60 font-medium">{bozumProducts.find(p => p.name === selectedProduct)?.speed || "Anında"}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-white/40">Güvenlik Durumu</span>
                                        <span className="text-green-500 font-medium">SSL Korumalı</span>
                                    </div>
                                </div>

                                {/* Amount Area */}
                                <div className={cn(
                                    "bg-white/[0.03] rounded-2xl border border-white/[0.05] relative group/amount hover:border-primary/30 transition-all",
                                    compact ? "p-4 mb-4" : "p-6 mb-6"
                                )}>
                                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] text-center mb-2">NET ÖDEME</p>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={amount + selectedProduct}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-4xl md:text-5xl font-black text-white text-center font-poppins tracking-tighter"
                                        >
                                            ₺{calculateResult()}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <Button
                                    onClick={() => {
                                        const product = bozumProducts.find(p => p.name === selectedProduct);
                                        const query = new URLSearchParams();
                                        if (product) query.set("product", product.slug);
                                        if (amount) query.set("amount", amount);

                                        router.push(`/bozum?${query.toString()}`);
                                    }}
                                    className="w-full py-6 rounded-xl text-xs font-bold uppercase tracking-[0.2em] shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-98 transition-all bg-gradient-to-r from-primary via-blue-400 to-secondary text-white h-auto"
                                    variant="primary"
                                >
                                    HEMEN BOZDUR <ArrowRight size={16} className="ml-2" />
                                </Button>

                                <div className="mt-4 flex justify-center gap-3 opacity-30 grayscale">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
