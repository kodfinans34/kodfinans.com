/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/Button";
import { Zap, ShoppingCart, ShoppingBag, X, CheckCircle2, Gift, ChevronLeft, ChevronRight, Store } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSystem } from "@/context/SystemContext";
import { useRouter } from "next/navigation";
import { products as staticProducts } from "@/lib/products";
import { Product } from "@/lib/types";

const getVariants = (category: string) => {
    switch (category) {
        case "games": return ["100 VP", "300 VP", "600 VP", "1250 VP"];
        case "gift": return ["25 TL", "50 TL", "100 TL", "250 TL"];
        case "items": return ["1 GB", "5 GB", "10 GB", "50 GB"];
        default: return ["Starter", "Standard", "Premium"];
    }
};

import { useCart } from "@/context/CartContext";

export const SalesGrid = () => {
    const { products, isLoggedIn } = useSystem();
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [selectedVariant, setSelectedVariant] = useState<string>("");
    const { addToCart } = useCart();
    const router = useRouter();
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.offsetWidth;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const handleAddToCart = () => {
        if (!selectedProduct || !selectedVariant) return;

        addToCart({
            id: selectedProduct.id,
            name: selectedProduct.name,
            variant: selectedVariant,
            price: Number(selectedProduct.price) || 100,
            quantity: 1,
            image: selectedProduct.image
        });

        setSelectedProduct(null);
    };

    const handleBuyNow = () => {
        handleAddToCart();
        if (!isLoggedIn) {
            router.push("/giris?redirect=/odeme");
        } else {
            router.push("/odeme");
        }
    };

    const currentProducts = (products || []).length > 0 ? products : staticProducts;
    const salesProducts = currentProducts.filter((p: Product) => p.productType === "satis" || (!p.productType && !p.slug.includes("bozum")));

    // Explode products into variants
    const explodedItems = salesProducts.flatMap((product: Product) => {
        if (product.variants && product.variants.length > 0) {
            return product.variants.map((variant: any) => ({
                ...product,
                variantId: variant.id,
                variantName: variant.name,
                variantPrice: variant.price,
                variantSlug: variant.slug || product.slug,
                uniqueId: `prod-${product.id}-var-${variant.id}`
            }));
        }
        return [{
            ...product,
            variantId: "",
            variantName: "",
            variantPrice: product.price,
            variantSlug: product.slug,
            uniqueId: `prod-${product.id}`
        }];
    });

    const [displayItems, setDisplayItems] = useState<any[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Shuffle only on client side to avoid hydration mismatch
        const items = [...explodedItems].sort(() => Math.random() - 0.5).slice(0, 8);
        setDisplayItems(items);
    }, [products]);

    // Use a stable slice for SSR, then shuffle on client
    const finalItems = mounted ? displayItems : explodedItems.slice(0, 8);

    return (
        <section className="py-20 md:py-28 relative" id="sales">
            {/* Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProduct(null)}
                            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        />
                        <motion.div
                            className="bg-card border border-white/[0.08] w-full max-w-lg relative z-10 shadow-2xl overflow-hidden rounded-2xl"
                        >
                            {/* Modal Header */}
                            <div className="h-28 bg-gradient-to-br from-primary/15 via-primary/[0.03] to-transparent relative p-6 flex items-center justify-between overflow-hidden">
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-14 h-14 bg-white/[0.06] backdrop-blur rounded-xl flex items-center justify-center p-2 border border-white/[0.08]">
                                        {selectedProduct.logo && <img src={selectedProduct.logo} alt={selectedProduct.name} className="w-full h-full object-contain" />}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground">{selectedProduct.name}</h3>
                                        <p className="text-foreground/40 text-xs font-medium">{selectedProduct.category}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedProduct(null)}
                                    className="w-9 h-9 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-foreground/60 flex items-center justify-center transition-all relative z-10"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="space-y-3">
                                    <label className="text-xs text-white/30 font-medium ml-1">Paket Seçimi</label>
                                    <div className="grid grid-cols-2 gap-2.5">
                                        {getVariants(selectedProduct.category).map((variant) => (
                                            <button
                                                key={variant}
                                                onClick={() => setSelectedVariant(variant)}
                                                className={cn(
                                                    "p-3.5 rounded-xl border text-sm font-medium transition-all flex items-center justify-center",
                                                    selectedVariant === variant
                                                        ? "bg-primary/10 border-primary/30 text-primary"
                                                        : "bg-background border-white/[0.06] text-foreground/50 hover:bg-card hover:text-foreground"
                                                )}
                                            >
                                                {variant}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        variant="secondary"
                                        className="flex-1 py-3.5 text-xs font-medium bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] flex items-center justify-center gap-2 h-auto rounded-xl"
                                        onClick={handleAddToCart}
                                    >
                                        <ShoppingCart size={15} /> Sepete Ekle
                                    </Button>
                                    <Button
                                        className="flex-[2] py-3.5 text-xs font-medium bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center gap-2 shadow-lg h-auto rounded-xl"
                                        onClick={handleBuyNow}
                                    >
                                        <Zap size={15} /> Hemen Al
                                    </Button>
                                </div>

                                <div className="flex items-center justify-center gap-1.5 pt-1 opacity-30">
                                    <CheckCircle2 size={11} className="text-green-500" />
                                    <span className="text-[10px] text-foreground font-medium">Anında Teslimat Garantisi</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Background */}
            <div className="absolute top-1/4 left-0 w-80 h-80 bg-primary/[0.04] blur-[100px] rounded-full -z-10" />
            <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-secondary/[0.04] blur-[100px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="mb-12 md:mb-16">
                    <div className="space-y-4 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-emerald-400 text-xs font-medium">
                            <Store size={12} /> Oyun Mağazası
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold font-inter text-foreground leading-tight tracking-tight">
                            Popüler <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">Ürünler</span>
                        </h2>
                        <p className="text-foreground/30 max-w-lg text-sm leading-relaxed">
                            Oyun kodları, hediye kartları ve dijital ürünleri en uygun fiyatlarla satın alın.
                        </p>
                    </div>
                </div>

                {/* Grid instead of Carousel */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {finalItems.map((item: any) => (
                        <motion.div
                            key={item.uniqueId}
                            className="group/card relative cursor-pointer"
                            onClick={() => router.push(`/urun/${item.variantSlug || item.slug}`)}
                        >
                            <div className="absolute -inset-[1px] bg-gradient-to-b from-primary/15 to-transparent rounded-2xl blur-sm opacity-0 group-hover/card:opacity-100 transition duration-500" />
                            <div className="relative h-full bg-card/40 p-4 rounded-2xl border border-white/[0.06] flex flex-col justify-between overflow-hidden group-hover/card:border-primary/15 transition-colors">

                                {/* Image */}
                                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl mb-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover/card:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70" />

                                    {item.badge && (
                                        <div className="absolute top-2.5 left-2.5 z-20">
                                            <span className="bg-primary text-white text-[9px] font-semibold px-2 py-1 rounded-md">
                                                {item.badge}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="space-y-3 flex-1 flex flex-col">
                                    <div>
                                        <h3 className="text-sm md:text-base font-semibold text-foreground leading-tight line-clamp-2 group-hover/card:text-primary transition-colors">
                                            {item.name} {item.variantName && <span className="text-foreground/30 block text-[10px] mt-0.5 font-normal">{item.variantName}</span>}
                                        </h3>
                                    </div>

                                    <div className="mt-auto pt-2 flex flex-col xl:flex-row xl:items-center justify-between gap-2 xl:gap-1">
                                        <div className="flex flex-col min-w-0">
                                            {item.discountPrice ? (
                                                <>
                                                    <span className="text-[8px] md:text-[10px] line-through text-foreground/15 font-medium">₺{item.price}</span>
                                                    <span className="text-sm md:text-lg font-bold text-foreground tracking-tight truncate">₺{item.variantPrice}</span>
                                                </>
                                            ) : (
                                                <span className="text-sm md:text-lg font-bold text-foreground tracking-tight truncate">₺{item.variantPrice}</span>
                                            )}
                                        </div>
                                        <Button
                                            className="w-full xl:w-auto px-2 py-1.5 md:px-4 md:py-2 bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white text-[9px] md:text-[10px] font-bold rounded-lg transition-all shrink-0"
                                            variant="ghost"
                                            size="sm"
                                        >
                                            Satın Al
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-14 flex justify-center">
                    <Button
                        onClick={() => router.push("/urunler")}
                        variant="ghost"
                        className="group h-12 px-8 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-emerald-500/30 transition-all text-sm font-semibold text-white"
                    >
                        Tüm Ürünleri Gör
                        <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        </section>
    );
};
