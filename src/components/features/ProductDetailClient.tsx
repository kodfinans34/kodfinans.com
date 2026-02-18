"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSystem } from "@/context/SystemContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import {
    Zap,
    ShieldCheck,
    Info,
    ShoppingCart,
    Plus,
    Minus,
    Star,
    ChevronRight,
    Home,
    Crown,
    CreditCard,
    Clock,
    CheckCircle,
    Package,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import ReviewSection from "@/components/features/ReviewSection";

import { Product } from "@/lib/types";

interface ProductDetailClientProps {
    slug: string;
    variantSlug?: string;
    initialProduct?: Product;
}

import { products as staticProducts } from "@/lib/products";

export default function ProductDetailClient({ slug, variantSlug, initialProduct }: ProductDetailClientProps) {
    const { products, isLoggedIn, isLoaded } = useSystem();
    const { addToCart } = useCart();
    const router = useRouter();

    // Use initial product if present, then system products when loaded
    const currentProducts = (products || []).length > 0 ? products : (initialProduct ? [initialProduct] : staticProducts);

    let product = currentProducts.find(p => p.slug === slug);
    let initialVariantId = "";

    if (!product) {
        for (const p of currentProducts) {
            const v = p.variants?.find(v => v.slug === slug);
            if (v) {
                product = p;
                initialVariantId = v.id;
                break;
            }
        }
    }

    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

    React.useEffect(() => {
        if (product) {
            document.title = product.seoTitle || `${product.name} Satın Al | KodFinans`;
        }
    }, [product]);

    if (!isLoaded && !product) {
        return (
            <div className="min-h-screen bg-[#070d0b] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-[#070d0b] flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center p-4 pt-32">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold text-white tracking-tight">Ürün Bulunamadı</h2>
                        <p className="text-white/40 text-sm">Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</p>
                        <Button onClick={() => router.push("/")} className="bg-primary/10 border border-primary/20 text-primary rounded-xl px-8 py-3 font-semibold hover:bg-primary/20 transition-all">Anasayfaya Dön</Button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const updateQuantity = (variantId: string, delta: number) => {
        setQuantities(prev => ({
            ...prev,
            [variantId]: Math.max(1, (prev[variantId] || 1) + delta)
        }));
    };

    const handleAddToCart = (variant: any) => {
        if (!isLoggedIn) {
            router.push("/giris");
            return;
        }

        const quantity = quantities[variant.id] || 1;
        addToCart({
            id: product!.id,
            name: product!.name,
            variant: variant.name,
            price: variant.price,
            quantity: quantity,
            image: product!.image
        });

        router.push("/odeme");
    };

    return (
        <div className="min-h-screen bg-[#070d0b] text-white font-inter selection:bg-primary/30">
            <Navbar />

            <main className="pt-28 md:pt-36 pb-24 px-4 overflow-hidden">
                <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">

                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-xs text-white/30 font-medium">
                        <button onClick={() => router.push("/")} className="hover:text-primary transition-colors flex items-center gap-1.5">
                            <Home size={13} /> Anasayfa
                        </button>
                        <ChevronRight size={10} className="text-white/10" />
                        <button onClick={() => router.push("/urunler")} className="hover:text-primary transition-colors">Ürünler</button>
                        <ChevronRight size={10} className="text-white/10" />
                        <span className="text-primary font-semibold">{product.name}</span>
                    </nav>

                    {/* Product Header — Mobile-First Wide Image */}
                    <div className="bg-white/[0.02] rounded-2xl md:rounded-3xl border border-white/[0.06] overflow-hidden">
                        {/* Wide Image — 16:9 on mobile, hero-style */}
                        <div className="relative aspect-[16/7] md:aspect-[21/7] w-full overflow-hidden bg-gradient-to-br from-white/[0.03] to-white/[0.01]">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-contain p-6 md:p-10"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#070d0b]/80 via-transparent to-transparent" />

                            {/* Badge */}
                            <div className="absolute top-4 left-4 flex items-center gap-2">
                                <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-semibold">
                                    {product.productType === "bozum" ? "Bozum" : "Satın Al"}
                                </span>
                                {product.category && (
                                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-medium">
                                        {product.category === "gift" ? "Hediye Kartı" : product.category === "games" ? "Oyun Parası" : product.category}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-5 md:p-8 space-y-4">
                            <h1 className="text-xl md:text-3xl font-bold text-white tracking-tight leading-tight">
                                {product.name}
                            </h1>
                            {product.description && (
                                <p className="text-white/30 text-sm leading-relaxed max-w-2xl">{product.description}</p>
                            )}

                            {/* Trust signals */}
                            <div className="flex flex-wrap gap-3 pt-2">
                                {[
                                    { icon: ShieldCheck, text: "Güvenli Ödeme" },
                                    { icon: Zap, text: "Anında Teslimat" },
                                    { icon: Clock, text: "7/24 Destek" },
                                ].map((b, i) => (
                                    <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/30 text-[10px] font-medium">
                                        <b.icon size={12} className="text-primary/60" /> {b.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Variants / Purchase Cards */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-white/40 px-1">Seçenekler</h3>

                        {(product.variants || []).length > 0 ? (
                            <div className="grid gap-3">
                                {product.variants?.map((variant) => (
                                    <div
                                        key={variant.id}
                                        id={`variant-${variant.slug || variant.id}`}
                                        onClick={() => {
                                            if (variant.slug) {
                                                router.push(`/urun/${variant.slug}`);
                                            }
                                        }}
                                        className={cn(
                                            "bg-white/[0.02] rounded-xl md:rounded-2xl p-4 md:p-5 border transition-all flex items-center gap-4 cursor-pointer group/v",
                                            (initialVariantId === variant.id || variant.slug === slug)
                                                ? "border-primary/50 bg-primary/[0.04] ring-1 ring-primary/20"
                                                : "border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.04]"
                                        )}
                                    >
                                        {/* Icon */}
                                        <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0 group-hover/v:border-primary/30 transition-colors">
                                            <Package size={18} className={cn(
                                                "text-white/20 transition-colors",
                                                (initialVariantId === variant.id || variant.slug === slug) ? "text-primary" : "group-hover/v:text-white/40"
                                            )} />
                                        </div>

                                        {/* Name & Description */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-semibold text-white truncate group-hover/v:text-primary transition-colors">{variant.name}</h4>
                                            {variant.description && (
                                                <p className="text-[11px] text-white/25 font-medium truncate group-hover/v:text-white/40 transition-colors">{variant.description}</p>
                                            )}
                                        </div>

                                        {/* Price */}
                                        <div className="text-right shrink-0">
                                            {variant.discountPrice && (
                                                <p className="text-[10px] text-white/20 line-through">₺{variant.discountPrice}</p>
                                            )}
                                            <p className="text-lg font-bold text-white tracking-tight">₺{variant.price}</p>
                                        </div>

                                        {/* Quantity + CTA */}
                                        <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                                            <div className="hidden md:flex items-center bg-white/[0.03] border border-white/[0.06] rounded-lg overflow-hidden">
                                                <button onClick={() => updateQuantity(variant.id, -1)} className="p-2 hover:bg-white/5 text-white/30 transition-colors">
                                                    <Minus size={13} />
                                                </button>
                                                <span className="w-8 text-center text-xs font-bold text-white">{quantities[variant.id] || 1}</span>
                                                <button onClick={() => updateQuantity(variant.id, 1)} className="p-2 hover:bg-white/5 text-white/30 transition-colors">
                                                    <Plus size={13} />
                                                </button>
                                            </div>

                                            <Button
                                                onClick={() => handleAddToCart(variant)}
                                                className="px-4 py-2.5 md:px-5 md:py-3 bg-primary hover:bg-secondary text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-primary/15 hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                            >
                                                <ShoppingCart size={14} /> Sepete Ekle
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white/[0.02] rounded-2xl p-12 text-center border border-white/[0.04] border-dashed space-y-3">
                                <Info size={40} className="text-white/10 mx-auto" />
                                <h3 className="text-lg font-semibold text-white/40">Ürün Seçeneği Bulunmuyor</h3>
                            </div>
                        )}
                    </div>

                    {/* Features */}
                    {product.features && product.features.length > 0 && (
                        <div className="bg-white/[0.02] rounded-2xl border border-white/[0.06] overflow-hidden">
                            <div className="p-5 border-b border-white/[0.04]">
                                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                                    <CheckCircle size={15} className="text-primary" /> Ürün Özellikleri
                                </h3>
                            </div>
                            <div className="p-5 grid sm:grid-cols-2 gap-3">
                                {product.features.map((feature, idx) => (
                                    <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-white/[0.01] border border-white/[0.03]">
                                        <span className="text-xs text-white/30 font-medium">{feature.key}</span>
                                        <span className="text-xs font-semibold text-white">{feature.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* How to Use */}
                    <div className="bg-white/[0.02] rounded-2xl border border-white/[0.06] p-6 md:p-8 space-y-4">
                        <div className="flex items-center gap-2">
                            <Info size={16} className="text-primary" />
                            <h3 className="text-sm font-semibold text-white">{product.name} Nasıl Yüklenir?</h3>
                        </div>
                        <div className="text-white/30 text-sm leading-relaxed">
                            {product.howToUse ? <p>{product.howToUse}</p> : <p>Satın aldığınız kodlar SMS ve E-Posta ile anında tarafınıza iletilir.</p>}
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="bg-white/[0.02] rounded-2xl border border-white/[0.06] p-6 flex flex-wrap items-center gap-6">
                        <div className="flex-1 min-w-[200px]">
                            <h4 className="text-sm font-semibold text-white mb-1">Ödeme Yöntemleri</h4>
                            <p className="text-[11px] text-white/25 font-medium">Güvenli ödeme altyapısı ile alışverişinizi tamamlayın.</p>
                        </div>
                        <div className="flex items-center gap-4 opacity-30 grayscale">
                            <CreditCard className="w-8 h-8" />
                            <ShieldCheck className="w-8 h-8" />
                            <Zap className="w-8 h-8" />
                        </div>
                    </div>

                    <ReviewSection productId={product.id as any} />
                </div>
            </main>

            <Footer />
        </div>
    );
}
