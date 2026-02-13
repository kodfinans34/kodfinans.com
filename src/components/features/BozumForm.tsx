"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useSystem, Product } from "@/context/SystemContext";
import { Zap, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn, extractBozumRate } from "@/lib/utils";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

interface BozumFormProps {
    initialProductSlug?: string;
}

export default function BozumForm({ initialProductSlug }: BozumFormProps) {
    const { addBozumRequest, settings, isLoggedIn, user, products, sendEmail } = useSystem();
    const router = useRouter();
    const searchParams = useSearchParams();

    const bozumProducts = products.filter(p => p.slug.includes("bozdurma") || p.slug.includes("bozum") || p.productType === "bozum");

    const queryProductSlug = searchParams.get("product");
    const initialProduct = (initialProductSlug || queryProductSlug)
        ? bozumProducts.find(p => p.slug === (initialProductSlug || queryProductSlug)) || bozumProducts[0]
        : bozumProducts[0];

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(initialProduct || null);
    const [amount, setAmount] = useState<string>(searchParams.get("amount") || "");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [digitalCode, setDigitalCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Initial load for user data
    useEffect(() => {
        if (user) {
            setEmail(user.email || "");
            setPhone(user.phone || "");
        }
    }, [user]);

    // Update selected product if prop changes
    useEffect(() => {
        if (initialProductSlug) {
            const found = bozumProducts.find(p => p.slug === initialProductSlug);
            if (found) setSelectedProduct(found);
        }
    }, [initialProductSlug]);

    // Extract rate from product price
    const currentRate = selectedProduct ? extractBozumRate(selectedProduct.price) : 0;
    const calculatedAmount = amount ? (parseFloat(amount) * currentRate).toFixed(2) : "0.00";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLoggedIn) {
            const message = `Merhaba, bozum işlemi yapmak istiyorum.%0A%0A📦 Ürün: ${selectedProduct?.name}%0A💰 Tutar: ${amount} TL%0A💹 Hesaplanacak: ${calculatedAmount} TL`;
            window.open(`https://wa.me/${settings.whatsappNumber}?text=${message}`, '_blank');
            return;
        }

        if (!selectedProduct) {
            alert("Lütfen bir ürün seçiniz.");
            return;
        }
        if (!amount || !email || !phone) {
            alert("Lütfen tüm alanları doldurunuz.");
            return;
        }

        setLoading(true);

        const requestData = {
            codeType: selectedProduct.name,
            codeAmount: parseFloat(amount),
            calculatedAmount: parseFloat(calculatedAmount),
            userEmail: email,
            userPhone: phone,
            digitalCode: digitalCode || undefined
        };

        // Add to system for admin panel
        addBozumRequest(requestData);

        // --- EMAIL NOTIFICATIONS ---
        // 1. To Customer
        sendEmail({
            to: email,
            subject: "Bozum Talebiniz Alındı! - KodFinans",
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #ed1c24;">Bozum Talebiniz Alındı!</h2>
                    <p>Talep detaylarınız aşağıdadır:</p>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 10px; margin: 20px 0;">
                        <p style="margin: 5px 0;">📦 Ürün: <b>${selectedProduct.name}</b></p>
                        <p style="margin: 5px 0;">💰 Kod Tutarı: <b>₺${amount}</b></p>
                        <p style="margin: 5px 0;">💹 Hesaplanacak: <b>₺${calculatedAmount}</b></p>
                    </div>
                    <p>Yönetici onayından sonra bakiyeniz hesabınıza aktarılacaktır. Ortalama süre 10 dakikadır.</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="font-size: 12px; color: #999;">Bu mesaj otomatik olarak gönderilmiştir.</p>
                </div>
            `
        });

        // 2. To Admin
        sendEmail({
            to: settings.smtpFrom || "bilgi@kodfinans.com",
            subject: "YENİ BOZUM TALEBİ! - KodFinans",
            text: `Yeni bir bozum talebi geldi! \nÜrün: ${selectedProduct.name} \nTutar: ${amount} \nMüşteri: ${email}`
        });

        // WhatsApp redirect removed for logged-in users per request. Admin only.

        setLoading(false);
        setSuccess(true);
    };

    if (success) {
        return (
            <div className="min-h-screen bg-[#050506] text-white font-poppins flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="max-w-md w-full glass p-8 rounded-[2.5rem] border-white/10 text-center space-y-6">
                        <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-4 animate-pulse">
                            <ShieldCheck size={40} />
                        </div>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tight">İşlem Başlatıldı!</h2>
                        <p className="text-white/60 text-sm font-medium leading-relaxed">
                            Bozum talebiniz başarıyla alındı. Yönetici onayı sonrası bakiyeniz hesabınıza anında tanımlanacaktır.
                        </p>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                            <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Tahmini Süre</p>
                            <p className="text-2xl font-black text-white italic">{"<"} 10 Dakika</p>
                        </div>
                        <Button
                            onClick={() => router.push(isLoggedIn ? "/panel" : "/")}
                            className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-widest text-xs transition-all"
                        >
                            {isLoggedIn ? "Panelime Git" : "Anasayfaya Dön"}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050506] text-white font-poppins selection:bg-primary/30">
            <Navbar />

            <main className="pt-32 pb-24 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-primary/5 to-transparent -z-10" />
                <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full -z-10" />

                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
                            {selectedProduct?.name || "Bozum İşlemi"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Bozum</span>
                        </h1>
                        <p className="text-white/40 max-w-xl mx-auto text-sm font-medium">
                            {selectedProduct?.description || "Dijital kodlarınızı en iyi kur garantisiyle saniyeler içinde nakite çevirin."}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-12 gap-8">
                        {/* Form */}
                        <div className="md:col-span-12 lg:col-span-8">
                            <div className="glass p-8 md:p-10 rounded-[2.5rem] border-white/10 shadow-2xl relative overflow-hidden">
                                {/* Decor */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

                                <form onSubmit={handleSubmit} className="space-y-8">

                                    {/* Type Selection */}
                                    <div className="space-y-4">
                                        <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2 block">Kod Türü</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {bozumProducts.map((product) => (
                                                <button
                                                    key={product.id}
                                                    type="button"
                                                    onClick={() => setSelectedProduct(product)}
                                                    className={cn(
                                                        "p-4 rounded-2xl border transition-all flex flex-col items-center gap-3 group relative overflow-hidden",
                                                        selectedProduct?.id === product.id
                                                            ? `bg-white/10 border-white/20 text-white shadow-xl ring-1 ring-primary/50`
                                                            : "bg-white/5 border-white/5 text-white/30 hover:bg-white/10 hover:border-white/10"
                                                    )}
                                                >
                                                    <div className="w-12 h-12 rounded-xl overflow-hidden mb-2 relative">
                                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <span className="text-[10px] font-bold uppercase tracking-tight text-center leading-tight">{product.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Inputs */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2 block">Kod Tutarı (TL)</label>
                                            <div className="relative group">
                                                <input
                                                    type="number"
                                                    placeholder="0.00"
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                    className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-5 text-2xl font-black text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 transition-all font-mono"
                                                    required
                                                />
                                                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 font-bold">TL</span>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2 block">Hesaplanacak Tutar</label>
                                            <div className="relative group opacity-80 cursor-not-allowed">
                                                <div className="w-full bg-primary/10 border border-primary/20 rounded-2xl px-6 py-5 text-2xl font-black text-primary font-mono flex items-center">
                                                    {calculatedAmount}
                                                </div>
                                                <div className="absolute top-2 right-2 px-2 py-1 bg-primary/20 rounded-lg text-primary text-[10px] font-bold uppercase tracking-wider">
                                                    %{(currentRate * 100).toFixed(0)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {isLoggedIn && (
                                        <div className="space-y-4">
                                            <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2 block">Dijital Kod</label>
                                            <input
                                                type="text"
                                                placeholder="XXXX-XXXX-XXXX-XXXX"
                                                value={digitalCode}
                                                onChange={(e) => setDigitalCode(e.target.value)}
                                                className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all font-mono tracking-widest"
                                                required={isLoggedIn}
                                            />
                                            <p className="text-[10px] text-white/30 ml-2">Bozmak istediğiniz kodu buraya giriniz.</p>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2 block">E-Posta Adresi</label>
                                            <input
                                                type="email"
                                                placeholder="ornek@mail.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2 block">Telefon Numarası</label>
                                            <input
                                                type="tel"
                                                placeholder="05XX XXX XX XX"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Action */}
                                    <div className="space-y-4 pt-4">
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className={cn(
                                                "w-full py-6 rounded-2xl text-white font-black text-sm uppercase tracking-[0.3em] shadow-lg hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-3 relative overflow-hidden group",
                                                isLoggedIn ? "bg-gradient-to-r from-primary to-secondary" : "bg-[#25D366]"
                                            )}
                                        >
                                            {loading ? <Loader2 size={20} className="animate-spin" /> : (
                                                <>
                                                    {isLoggedIn ? (
                                                        <>İŞLEMİ BAŞLAT <ArrowRight size={20} /></>
                                                    ) : (
                                                        <>CANLI DESTEK İLE BOZUM YAP <ArrowRight size={20} /></>
                                                    )}
                                                </>
                                            )}
                                        </Button>

                                        {!isLoggedIn && (
                                            <p className="text-center text-xs text-white/40 font-medium">
                                                İşlemlerinizi takip etmek için <Link href="/giris" className="text-primary hover:underline">Giriş Yapın</Link>
                                            </p>
                                        )}
                                    </div>

                                </form>
                            </div>
                        </div>

                        {/* Info Side */}
                        <div className="md:col-span-12 lg:col-span-4 space-y-6">
                            <div className="glass p-8 rounded-[2.5rem] border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
                                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-4">Bilgilendirme</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary shrink-0">
                                            <Zap size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1">Anında Teslimat</h4>
                                            <p className="text-white/40 text-[11px] leading-relaxed">İşlem başlatıldığında yönetici onayı ile bakiyeniz anında hesabınıza yansır.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary shrink-0">
                                            <ShieldCheck size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1">%100 Güvenlik</h4>
                                            <p className="text-white/40 text-[11px] leading-relaxed">Tüm işlemler SSL sertifikalı güvenli altyapımız üzerinden gerçekleşir.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-2 text-center">
                                <p className="text-xs font-bold text-white/30 uppercase tracking-widest">Tahmini İşlem Süresi</p>
                                <p className="text-3xl font-black text-white italic">{"<"} 10 Dk</p>
                            </div>
                        </div>

                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
