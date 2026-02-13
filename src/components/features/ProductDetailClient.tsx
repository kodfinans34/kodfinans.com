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
    Cpu,
    Target
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import ReviewSection from "@/components/features/ReviewSection";

interface ProductDetailClientProps {
    slug: string;
    variantSlug?: string;
}

export default function ProductDetailClient({ slug, variantSlug }: ProductDetailClientProps) {
    const { products, isLoggedIn } = useSystem();
    const { addToCart } = useCart();
    const router = useRouter();

    // Find the product. It could be that 'slug' is actually a variant slug
    let product = products.find(p => p.slug === slug);
    let initialVariantId = "";

    if (!product) {
        // Look in variants
        for (const p of products) {
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

    if (!product) {
        return (
            <div className="min-h-screen bg-[#050506] flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Ürün Bulunamadı</h2>
                        <Button onClick={() => router.push("/")} className="bg-white/5 border border-white/10 text-white rounded-xl px-8 py-3 font-bold">Anasayfaya Dön</Button>
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
        // Check if user is logged in
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

    const breadcrumbs = [
        { name: "Anasayfa", icon: <Home size={14} />, href: "/" },
        { name: "Ürünler", href: "/urunler" },
        { name: product.name, current: true }
    ];

    return (
        <div className="min-h-screen bg-[#050506] text-white font-poppins selection:bg-primary/30">
            <Navbar />

            <main className="pt-32 md:pt-40 pb-24 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto space-y-8">

                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white/30 mb-8 px-2">
                        {breadcrumbs.map((item, idx) => (
                            <React.Fragment key={idx}>
                                {idx > 0 && <ChevronRight size={10} className="text-white/10" />}
                                {item.href ? (
                                    <button
                                        onClick={() => router.push(item.href || "/")}
                                        className="hover:text-primary transition-colors flex items-center gap-1.5"
                                    >
                                        {item.icon}
                                        {item.name}
                                    </button>
                                ) : (
                                    <span className="text-primary italic">{item.name}</span>
                                )}
                            </React.Fragment>
                        ))}
                    </nav>

                    <div className="grid lg:grid-cols-12 gap-8 items-start">

                        {/* Sidebar - Image and Features */}
                        <div className="lg:col-span-3 space-y-6">
                            <div className="glass rounded-[2.5rem] p-4 border-white/10 overflow-hidden shadow-2xl group">
                                <div className="aspect-[3/4] rounded-3xl overflow-hidden relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050506]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>

                            {/* Features Widget */}
                            <div className="glass rounded-[2rem] border-white/5 overflow-hidden">
                                <div className="p-5 border-b border-white/5 bg-white/[0.02]">
                                    <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                        <Target size={14} className="text-primary" /> Özellikleri
                                    </h3>
                                </div>
                                <div className="p-5 space-y-4">
                                    {(product.features || []).map((feature, idx) => (
                                        <div key={idx} className="flex justify-between items-center group">
                                            <span className="text-[11px] font-bold text-white/30 uppercase tracking-widest">{feature.key}</span>
                                            <span className="text-[11px] font-black text-white italic group-hover:text-primary transition-colors">{feature.value}</span>
                                        </div>
                                    ))}
                                    {(!product.features || product.features.length === 0) && (
                                        <p className="text-[10px] text-white/20 italic">Özellik bilgisi belirtilmedi.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Main Content - Variants/Purchase List */}
                        <div className="lg:col-span-9 space-y-8">
                            <div className="grid gap-4">
                                {(product.variants || []).length > 0 ? (
                                    product.variants?.map((variant) => (
                                        <div
                                            key={variant.id}
                                            id={`variant-${variant.slug || variant.id}`}
                                            className={cn(
                                                "glass rounded-3xl p-5 md:p-6 border-white/5 hover:border-white/10 transition-all group flex flex-col md:flex-row items-center gap-6",
                                                (initialVariantId === variant.id || variant.slug === slug) && "border-primary/50 bg-primary/5 ring-1 ring-primary/20"
                                            )}
                                        >
                                            <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                                                <Crown size={24} className={cn("text-white/20 group-hover:text-primary transition-colors", (initialVariantId === variant.id || variant.slug === slug) && "text-primary")} />
                                            </div>

                                            <div className="flex-1 space-y-1 text-center md:text-left">
                                                <h3 className="font-black text-white text-lg tracking-tight uppercase group-hover:text-primary transition-colors">
                                                    {variant.name}
                                                </h3>
                                                <p className="text-[11px] font-medium text-white/30 italic">
                                                    {variant.description}
                                                </p>
                                            </div>

                                            <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
                                                <div className="text-center md:text-right shrink-0">
                                                    {variant.discountPrice && (
                                                        <p className="text-[10px] text-white/20 font-black line-through mb-1">₺{variant.discountPrice}</p>
                                                    )}
                                                    <p className="text-xl md:text-2xl font-black text-white tracking-tighter italic">₺{variant.price}</p>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center bg-black/40 border border-white/10 rounded-xl overflow-hidden shadow-inner">
                                                        <button
                                                            onClick={() => updateQuantity(variant.id, -1)}
                                                            className="p-3 hover:bg-white/5 text-white/40 transition-colors"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="w-10 text-center text-sm font-black text-white">{quantities[variant.id] || 1}</span>
                                                        <button
                                                            onClick={() => updateQuantity(variant.id, 1)}
                                                            className="p-3 hover:bg-white/5 text-white/40 transition-colors"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>

                                                    <Button
                                                        onClick={() => handleAddToCart(variant)}
                                                        className="px-6 py-4 bg-primary hover:bg-secondary text-white rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                                                    >
                                                        Sepete Ekle <Zap size={14} />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="glass rounded-[2.5rem] p-12 md:p-20 text-center space-y-6 border-white/5 border-dashed">
                                        <Info size={60} className="text-white/10 mx-auto" />
                                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Ürün Seçeneği Bulunmuyor</h3>
                                    </div>
                                )}
                            </div>

                            {/* Payment Methods Banner */}
                            <div className="glass rounded-[2.5rem] border-white/5 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />
                                <div className="p-10 md:p-12 flex flex-col md:flex-row items-center gap-12">
                                    <div className="flex-1 space-y-4 text-center md:text-left">
                                        <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Ödeme Yöntemleri</h3>
                                        <p className="text-white/40 text-[11px] font-medium leading-relaxed max-w-sm">
                                            Dünyanın birçok yerinden ödemeler yapabilir, taksitli alışverişinizi tamamlayabilirsiniz.
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-4 md:grid-cols-6 gap-6 md:gap-8 flex-1 opacity-40 grayscale">
                                        <CreditCard className="w-10 h-10" />
                                        <Zap className="w-10 h-10" />
                                        <ShieldCheck className="w-10 h-10" />
                                        <ShoppingCart className="w-10 h-10" />
                                    </div>
                                </div>
                            </div>

                            {/* How to Use Section */}
                            <div className="glass rounded-[2.5rem] border-white/5 p-12 space-y-8">
                                <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                                    <Info size={16} className="text-primary" />
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">{product.name} Nasıl Yüklenir?</span>
                                </div>
                                <div className="text-white/60 text-sm leading-relaxed font-medium space-y-6">
                                    {product.howToUse ? <p>{product.howToUse}</p> : <p>Satın aldığınız kodlar SMS ve E-Posta ile anında tarafınıza iletilir.</p>}
                                </div>
                            </div>

                            <ReviewSection productId={product.id} />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
