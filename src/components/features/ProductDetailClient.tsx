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

    const normalize = (s: string) => s ? s.toLowerCase().trim().replace(/\s+/g, '-').replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c') : '';
    const normalizedParam = normalize(decodeURIComponent(slug));

    // Find product either directly or as a variant parent
    let product = currentProducts.find(p => normalize(p.slug || '') === normalizedParam);
    let initialVariantId = "";

    if (!product) {
        for (const p of currentProducts) {
            const v = p.variants?.find(v => normalize(v.slug || '') === normalizedParam);
            if (v) {
                product = p;
                initialVariantId = v.id;
                break;
            }
        }
    }

    // DISCOVERY: If standalone product or no variants, find siblings
    const variants = React.useMemo(() => {
        if (!product) return [];

        // 1. Check nested variants
        if ((product.variants || []).length > 0) return product.variants || [];

        // 2. Discover siblings (individual products that belong together)
        const baseName = product.name.split(' ').slice(0, 2).join(' ').toLowerCase(); // e.g. "google play"
        const siblings = currentProducts.filter(p =>
            p.productType === product.productType &&
            p.category === product.category &&
            p.name.toLowerCase().includes(baseName)
        );

        if (siblings.length <= 1) return []; // Just this product found

        return siblings.map(s => ({
            id: s.id.toString(),
            name: s.name,
            price: Number(s.price),
            discountPrice: (s as any).discountPrice ? Number((s as any).discountPrice) : undefined,
            slug: s.slug,
            description: s.description
        })).sort((a, b) => a.price - b.price);
    }, [product, currentProducts]);

    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

    React.useEffect(() => {
        if (product) {
            document.title = product.seoTitle || `${product.name} Satın Al | KodFinans`;
        }
    }, [product]);

    if (!isLoaded && !product) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
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
        const quantity = quantities[variant.id] || 1;
        addToCart({
            id: product!.id,
            name: product!.name,
            variant: variant.name,
            price: variant.price,
            quantity: quantity,
            image: product!.image
        });

        if (!isLoggedIn) {
            router.push("/giris?redirect=/odeme");
        } else {
            router.push("/odeme");
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-inter selection:bg-primary/30">
            <Navbar />

            <main className="pt-28 md:pt-36 pb-24 px-4 overflow-hidden">
                <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">

                    {/* Breadcrumbs */}
                    <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/30 font-medium whitespace-normal">
                        <button onClick={() => router.push("/")} className="hover:text-primary transition-colors flex items-center gap-1.5 shrink-0">
                            <Home size={13} /> Anasayfa
                        </button>
                        <ChevronRight size={10} className="text-white/10 shrink-0" />
                        <button onClick={() => router.push("/urunler")} className="hover:text-primary transition-colors shrink-0">Ürünler</button>
                        <ChevronRight size={10} className="text-white/10 shrink-0" />
                        <span className="text-primary font-semibold break-all sm:break-normal">{product.name}</span>
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
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

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
                            <h1 className="text-xl md:text-3xl font-bold text-white tracking-tight leading-tight break-words">
                                {product.name}
                            </h1>
                            {product.description && (
                                <p className="text-white/30 text-sm leading-relaxed max-w-2xl break-words">{product.description}</p>
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

                        {variants.length > 0 ? (
                            <div className="grid gap-3">
                                {variants.map((variant) => (
                                    <div
                                        key={variant.id}
                                        id={`variant-${variant.slug || variant.id}`}
                                        onClick={() => {
                                            if (variant.slug) {
                                                router.push(`/urun/${variant.slug}`);
                                            }
                                        }}
                                        className={cn(
                                            "bg-white/[0.02] rounded-xl md:rounded-2xl p-4 md:p-5 border transition-all cursor-pointer group/v flex flex-col gap-4 overflow-hidden",
                                            (initialVariantId === variant.id || normalize(variant.slug || '') === normalizedParam)
                                                ? "border-primary/50 bg-primary/[0.04] ring-1 ring-primary/20"
                                                : "border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.04]"
                                        )}
                                    >
                                        {/* Top section: Icon + Content */}
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            {/* Icon */}
                                            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0 group-hover/v:border-primary/30 transition-colors">
                                                <Package size={18} className={cn(
                                                    "text-white/20 transition-colors",
                                                    (initialVariantId === variant.id || normalize(variant.slug || '') === normalizedParam) ? "text-primary" : "group-hover/v:text-white/40"
                                                )} />
                                            </div>

                                            {/* Name & Description */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-[13px] md:text-sm font-semibold text-white truncate block group-hover/v:text-primary transition-colors">{variant.name}</h4>
                                                {variant.description && (
                                                    <p className="text-[11px] text-primary/80 font-medium truncate mt-0.5 group-hover/v:text-primary transition-colors">{variant.description}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Middle section: Quantity and Price */}
                                        <div className="flex flex-row items-center justify-between gap-4 w-full" onClick={(e) => e.stopPropagation()}>
                                            {/* Quantity Input Area */}
                                            <div className="w-20 md:w-24 shrink-0 relative">
                                                <input
                                                    type="number"
                                                    readOnly
                                                    value={quantities[variant.id] || 1}
                                                    className="w-full h-10 bg-black/40 border border-white/10 rounded-lg px-3 text-sm font-bold text-white outline-none focus:border-primary/50 text-left"
                                                />
                                            </div>

                                            {/* Price */}
                                            <div className="flex-1 text-right min-w-0">
                                                {variant.discountPrice && (
                                                    <p className="text-[10px] text-white/40 line-through truncate">₺{variant.discountPrice}</p>
                                                )}
                                                <p className="text-sm md:text-base font-bold text-white truncate">{variant.price} TL</p>
                                                <p className="text-[10px] md:text-[11px] text-white/40 font-medium flex items-center justify-end gap-1 mt-0.5 truncate">0 Ⓚ</p>
                                            </div>
                                        </div>

                                        {/* Bottom section: Add to Cart Button */}
                                        <div className="w-full" onClick={(e) => e.stopPropagation()}>
                                            <button
                                                onClick={() => handleAddToCart(variant)}
                                                className="w-full py-3 bg-primary hover:bg-secondary text-primary-foreground rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 glow-primary"
                                            >
                                                <ShoppingCart size={16} />
                                                Sepete Ekle
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid gap-3">
                                <div
                                    className="bg-white/[0.02] rounded-xl md:rounded-2xl p-4 md:p-5 border transition-all cursor-pointer flex flex-col gap-4 overflow-hidden border-primary/50 bg-primary/[0.04] ring-1 ring-primary/20"
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0 border-primary/30">
                                            <Package size={18} className="text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-[13px] md:text-sm font-semibold text-white truncate block text-primary">{product.name}</h4>
                                        </div>
                                    </div>

                                    <div className="flex flex-row items-center justify-between gap-4 w-full">
                                        <div className="w-20 md:w-24 shrink-0 relative">
                                            <input
                                                type="number"
                                                readOnly
                                                value={quantities[product.id] || 1}
                                                className="w-full h-10 bg-black/40 border border-white/10 rounded-lg px-3 text-sm font-bold text-white outline-none focus:border-primary/50 text-left"
                                            />
                                        </div>
                                        <div className="flex-1 text-right min-w-0">
                                            <p className="text-sm md:text-base font-bold text-white truncate">{product.price} TL</p>
                                        </div>
                                    </div>

                                    <div className="w-full" onClick={(e) => e.stopPropagation()}>
                                        <button
                                            onClick={() => handleAddToCart(product as any)}
                                            className="w-full py-3 bg-primary hover:bg-secondary text-primary-foreground rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 glow-primary"
                                        >
                                            <ShoppingCart size={16} />
                                            Sepete Ekle
                                        </button>
                                    </div>
                                </div>
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
                    )
                    }

                    {/* How to Use */}
                    < div className="bg-white/[0.02] rounded-2xl border border-white/[0.06] p-6 md:p-8 space-y-4" >
                        <div className="flex items-center gap-2">
                            <Info size={16} className="text-primary" />
                            <h3 className="text-sm font-semibold text-white">{product.name} Nasıl Yüklenir?</h3>
                        </div>
                        <div className="text-white/30 text-sm leading-relaxed break-words">
                            {product.howToUse ? <p>{product.howToUse}</p> : <p>Satın aldığınız kodlar SMS ve E-Posta ile anında tarafınıza iletilir.</p>}
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="bg-white/[0.02] rounded-2xl border border-white/[0.06] p-4 sm:p-6 flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6">
                        <div className="flex-1 min-w-[150px]">
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
