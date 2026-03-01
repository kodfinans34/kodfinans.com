"use client";

import React, { useState } from "react";
import { useSystem } from "@/context/SystemContext";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
    ArrowRight,
    ShieldCheck,
    Zap,
    Clock,
    MessageCircle,
    CheckCircle2,
    Calculator,
    TrendingUp,
    Star,
    Lock,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
    slug: string;
    initialProduct?: any;
}

export default function BozumProductDetailClient({ slug, initialProduct }: Props) {
    const { products, settings } = useSystem();
    const router = useRouter();
    const [codeAmount, setCodeAmount] = useState<string>("");
    const { user, isLoggedIn } = useSystem();

    // Find product from context or use initial
    const product = products.find(
        (p) => p.productType === "bozum" && p.slug.toLowerCase() === slug.toLowerCase()
    ) || initialProduct;

    if (!product) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-[#0a0f0d] pt-40 flex flex-col items-center justify-center px-4">
                    <h1 className="text-3xl font-black text-white mb-4">Ürün Bulunamadı</h1>
                    <p className="text-white/40 mb-8">Aradığınız bozum ürünü mevcut değil.</p>
                    <Button onClick={() => router.push("/bozum")} className="bg-primary text-white px-6 py-3 rounded-xl">
                        Bozum Sayfasına Dön
                    </Button>
                </main>
                <Footer />
            </>
        );
    }

    const rate = typeof product.price === "number" ? product.price : parseFloat(product.price) || 50;
    const calculatedAmount = codeAmount ? (parseFloat(codeAmount) * rate) / 100 : 0;

    const handleWhatsApp = () => {
        const message = `Merhaba, ${product.name} hizmeti hakkında bilgi almak istiyorum.\n\nKod Tutarı: ${codeAmount} TL\nTahmini Ödeme: ${calculatedAmount.toFixed(2)} TL\nOran: %${rate}`;
        window.open(
            `https://wa.me/${(settings.whatsappNumber || "").replace(/\D/g, "")}?text=${encodeURIComponent(message)}`,
            "_blank"
        );
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#0a0f0d] pt-32 md:pt-40 pb-32">
                {/* Hero Section */}
                <section className="max-w-6xl mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Left - Product Info */}
                        <div className="space-y-8">
                            {/* Breadcrumb */}
                            <nav className="flex items-center gap-2 text-xs text-white/30">
                                <Link href="/" className="hover:text-white transition-colors">Anasayfa</Link>
                                <span>/</span>
                                <Link href="/bozum" className="hover:text-white transition-colors">Bozum</Link>
                                <span>/</span>
                                <span className="text-white/60">{product.name}</span>
                            </nav>

                            {/* Product Card */}
                            <div className="relative group">
                                <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 left-6">
                                        <span className="bg-primary/20 backdrop-blur-md text-primary border border-primary/30 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full">
                                            %{rate} Oran
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
                                    {product.name}
                                </h1>
                                <p className="text-white/50 text-sm leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { icon: Zap, label: "Anında Ödeme", desc: "İşlem sonrası saniyeler içinde" },
                                    { icon: ShieldCheck, label: "Güvenli İşlem", desc: "256-bit SSL koruması" },
                                    { icon: Clock, label: "7/24 Hizmet", desc: "Her an aktif" },
                                    { icon: TrendingUp, label: "En Yüksek Oran", desc: "Piyasanın en iyisi" },
                                ].map((feature, i) => (
                                    <div
                                        key={i}
                                        className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 flex items-start gap-3"
                                    >
                                        <feature.icon size={20} className="text-primary shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-white font-bold text-xs uppercase tracking-wider">{feature.label}</p>
                                            <p className="text-white/30 text-[10px] mt-0.5">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right - Calculator & CTA */}
                        <div className="space-y-6 lg:sticky lg:top-32 relative">

                            <div className={cn("space-y-6 transition-all duration-500", !isLoggedIn && "blur-[8px] opacity-60 pointer-events-none select-none")}>
                                {/* Calculator Card */}
                                <div className="bg-[#0c1210] border border-white/10 rounded-3xl p-8 space-y-6">
                                    <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                                        <Calculator size={20} className="text-primary" />
                                        <h2 className="text-white font-black uppercase tracking-tight text-lg">Hesapla</h2>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] ml-2">
                                            Kod Tutarı (TL)
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 font-bold text-xl">₺</span>
                                            <input
                                                type="number"
                                                value={codeAmount}
                                                onChange={(e) => setCodeAmount(e.target.value)}
                                                placeholder="0"
                                                className="w-full h-16 pl-14 bg-black/30 border border-white/10 rounded-2xl text-2xl font-black text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 transition-all font-mono"
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center space-y-1">
                                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Tahmini Ödeme</p>
                                        <p className="text-3xl font-black text-primary font-mono">
                                            ₺{calculatedAmount.toFixed(2)}
                                        </p>
                                        <p className="text-white/20 text-[10px]">
                                            {codeAmount || 0} TL × %{rate} oran
                                        </p>
                                    </div>

                                    <Button
                                        onClick={handleWhatsApp}
                                        className="w-full py-6 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                                    >
                                        <MessageCircle size={18} />
                                        Hemen Bozdur
                                    </Button>
                                </div>

                                {/* Higher Rate CTA */}
                                <div className="bg-gradient-to-br from-yellow-500/10 via-orange-500/5 to-transparent border border-yellow-500/20 rounded-3xl p-6 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Star size={20} className="text-yellow-400" />
                                        <h3 className="text-white font-black uppercase tracking-tight text-sm">
                                            Daha Yüksek Oran İster Misiniz?
                                        </h3>
                                    </div>
                                    <p className="text-white/40 text-xs leading-relaxed">
                                        Yüksek tutarlı işlemler için özel oranlar sunuyoruz. Canlı destek ekibimiz ile
                                        iletişime geçerek kişiselleştirilmiş teklifinizi alın.
                                    </p>
                                    <Button
                                        onClick={() => {
                                            const msg = `Merhaba, ${product.name} için yüksek oran teklifi almak istiyorum.`;
                                            window.open(
                                                `https://wa.me/${(settings.whatsappNumber || "").replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`,
                                                "_blank"
                                            );
                                        }}
                                        className="w-full py-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-yellow-500/20 transition-all"
                                    >
                                        <MessageCircle size={14} />
                                        Canlı Destek ile Görüşün
                                    </Button>
                                </div>

                                {/* Trust badges */}
                                <div className="flex items-center justify-center gap-6 py-4">
                                    {[
                                        { icon: CheckCircle2, text: "SSL Güvenlik" },
                                        { icon: Zap, text: "Anında Ödeme" },
                                        { icon: Clock, text: "7/24 Aktif" },
                                    ].map((badge, i) => (
                                        <div key={i} className="flex items-center gap-1.5 text-white/20 text-[10px] font-medium">
                                            <badge.icon size={12} />
                                            {badge.text}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Unauthenticated Overlay */}
                            {!isLoggedIn && (
                                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 p-8 text-center animate-in fade-in duration-500">
                                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 ring-4 ring-primary/10">
                                        <Lock size={28} className="text-primary" />
                                    </div>
                                    <h3 className="text-xl font-black text-white uppercase tracking-tight mb-3">
                                        Sadece Üyelere Özel
                                    </h3>
                                    <p className="text-white/60 text-xs leading-relaxed mb-6">
                                        Bozum oranlarını hesaplamak ve anında işlem yapmak için hesabınıza giriş yapmalısınız.
                                    </p>
                                    <div className="flex flex-col gap-3 w-full">
                                        <Link href="/giris" className="w-full py-4 bg-primary text-white font-black rounded-xl uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
                                            Giriş Yap
                                        </Link>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </section>

                {/* FAQ SEO Section */}
                <section className="max-w-4xl mx-auto px-4 md:px-6 mt-24">
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-8 text-center">
                        Sıkça Sorulan Sorular
                    </h2>
                    <div className="space-y-4">
                        {[
                            {
                                q: `${product.name} oranı nedir?`,
                                a: `${product.name} için standart bozum oranımız %${rate}'dir. Yüksek tutarlar için canlı destek üzerinden daha yüksek oranlar sunulmaktadır.`,
                            },
                            {
                                q: `${product.name} nasıl yapılır?`,
                                a: `Kodunuzu bozum formuna veya WhatsApp üzerinden bize iletin. Kodunuz doğrulandıktan hemen sonra hesaplanan tutar bakiyenize veya banka hesabınıza aktarılır.`,
                            },
                            {
                                q: `${product.name} güvenli mi?`,
                                a: `KodFinans, SSL güvenlik sertifikası ile tüm işlemlerinizi korur. Binlerce müşterimizin güvendiği Türkiye'nin önde gelen kod bozum platformudur.`,
                            },
                            {
                                q: `Ne kadar sürede ödememi alırım?`,
                                a: `İşlem onayı sonrası bakiyenize anında yansır. Banka hesabınıza çekim başvurusu yaptığınızda ise genellikle 1-15 dakika içinde ödeme yapılır.`,
                            },
                        ].map((faq, i) => (
                            <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
                                <h3 className="text-white font-bold text-sm mb-2">{faq.q}</h3>
                                <p className="text-white/40 text-xs leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Other Bozum Products */}
                <section className="max-w-6xl mx-auto px-4 md:px-6 mt-24">
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-8 text-center">
                        Diğer Bozum Hizmetlerimiz
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {products
                            .filter((p) => p.productType === "bozum" && p.slug !== product.slug)
                            .map((p) => (
                                <Link
                                    key={p.id}
                                    href={`/bozum/${p.slug}`}
                                    className="group bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-primary/30 transition-all"
                                >
                                    <div className="aspect-video overflow-hidden">
                                        <img
                                            src={p.image}
                                            alt={p.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-white font-bold text-sm mb-1">{p.name}</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-primary font-bold text-xs">%{p.price} Oran</span>
                                            <ArrowRight size={14} className="text-white/20 group-hover:text-primary transition-colors" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
