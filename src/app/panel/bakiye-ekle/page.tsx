"use client";

import React, { useState } from "react";
import { Wallet, CreditCard, Landmark, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

import { useSystem } from "@/context/SystemContext";

export default function BakiyeEklePage() {
    const { settings } = useSystem();
    const [amount, setAmount] = useState<string>("");
    const [method, setMethod] = useState<"card" | "transfer">("card");

    const quickAmounts = ["50", "100", "250", "500", "1000"];

    const handlePayment = () => {
        if (!amount) return alert("Lütfen bir tutar giriniz.");

        const message = `Merhaba, bakiye yüklemek istiyorum.\n\nTutar: ${amount} TL\nÖdeme Yöntemi: ${method === 'card' ? 'Kredi Kartı' : 'Havale/EFT'}`;
        window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12 pb-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">Bakiye Ekle</h1>
                    <p className="text-white/30 text-xs font-bold uppercase tracking-[0.3em]">Güvenli ödeme sistemleri ile 7/24 bakiye yükleyin.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2">Yüklenecek Tutar</label>
                        <div className="relative group">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 font-black text-2xl group-focus-within:text-primary transition-colors">₺</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="w-full h-24 pl-16 bg-[#08080a] border border-white/10 rounded-[2rem] text-4xl font-black text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 transition-all font-mono"
                            />
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {quickAmounts.map((amt) => (
                                <button
                                    key={amt}
                                    onClick={() => setAmount(amt)}
                                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-white/60 font-mono text-sm transition-all"
                                >
                                    +{amt}₺
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2">Ödeme Yöntemi</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setMethod("card")}
                                className={cn(
                                    "p-6 rounded-[2rem] border transition-all flex flex-col items-center gap-4 text-center group relative overflow-hidden",
                                    method === "card"
                                        ? "bg-primary/10 border-primary text-primary shadow-[0_0_30px_rgba(74,188,241,0.2)]"
                                        : "bg-[#08080a] border-white/10 text-white/40 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <CreditCard size={32} className="relative z-10" />
                                <span className="text-xs font-black uppercase tracking-widest relative z-10">Kredi Kartı</span>
                                {method === "card" && <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-50" />}
                            </button>

                            <button
                                onClick={() => setMethod("transfer")}
                                className={cn(
                                    "p-6 rounded-[2rem] border transition-all flex flex-col items-center gap-4 text-center group relative overflow-hidden",
                                    method === "transfer"
                                        ? "bg-secondary/10 border-secondary text-secondary shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                                        : "bg-[#08080a] border-white/10 text-white/40 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <Landmark size={32} className="relative z-10" />
                                <span className="text-xs font-black uppercase tracking-widest relative z-10">Havale / EFT</span>
                                {method === "transfer" && <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-transparent opacity-50" />}
                            </button>
                        </div>
                    </div>

                    <div className="pt-6">
                        <Button
                            onClick={handlePayment}
                            className="w-full py-8 rounded-[2.5rem] bg-gradient-to-r from-primary to-secondary text-white font-black text-sm uppercase tracking-[0.3em] shadow-[0_25px_60px_rgba(74,188,241,0.3)] hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-4 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            ÖDEMEYİ BAŞLAT <ArrowRight size={20} />
                        </Button>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#08080a] border border-white/5 rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden">
                        <div className="flex items-start gap-4">
                            <ShieldCheck size={32} className="text-green-500 shrink-0" />
                            <div>
                                <h3 className="text-white font-black uppercase tracking-tight mb-2">Güvenli Ödeme</h3>
                                <p className="text-white/40 text-xs font-medium leading-relaxed">
                                    Tüm işlemleriniz 256-bit SSL güvenlik sertifikası ile korunmaktadır. Kart bilgileriniz asla sistemlerimizde saklanmaz.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <CheckCircle2 size={32} className="text-blue-500 shrink-0" />
                            <div>
                                <h3 className="text-white font-black uppercase tracking-tight mb-2">Anında Teslimat</h3>
                                <p className="text-white/40 text-xs font-medium leading-relaxed">
                                    Bakiye yüklemeleriniz, ödeme onayının ardından saniyeler içinde hesabınıza tanımlanır.
                                </p>
                            </div>
                        </div>

                        <div className="border-t border-white/5 pt-6 mt-6 flex items-center gap-4">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg" className="h-8 bg-white rounded px-2 py-1 object-contain" alt="Visa" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-8 bg-white rounded px-2 py-1 object-contain" alt="Mastercard" />
                            <img src="https://seeklogo.com/images/T/troy-logo-4B60567A20-seeklogo.com.png" className="h-8 bg-white rounded px-2 py-1 object-contain" alt="Troy" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
