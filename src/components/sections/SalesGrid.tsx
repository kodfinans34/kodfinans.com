/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/Button";
import { Star, Zap, ShoppingCart, ShoppingBag, X, CheckCircle2, Gift, ChevronLeft, ChevronRight, Store } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSystem } from "@/context/SystemContext";
import { useRouter } from "next/navigation";

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
        if (!isLoggedIn) {
            router.push("/giris");
            return;
        }
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
        if (!isLoggedIn) {
            router.push("/giris");
            return;
        }
        handleAddToCart();
        router.push("/odeme");
    };

    const salesProducts = products.filter(p => p.productType === "satis" || (!p.productType && !p.slug.includes("bozum")));

    // Explode products into variants
    const explodedItems = salesProducts.flatMap(product => {
        if (product.variants && product.variants.length > 0) {
            return product.variants.map(variant => ({
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

    useEffect(() => {
        const items = explodedItems.sort(() => Math.random() - 0.5).slice(0, 12);
        setDisplayItems(items);
    }, [products]);

    const finalItems = displayItems.length > 0 ? displayItems : explodedItems.slice(0, 12);

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
                            className="bg-[#0f0f14] border border-white/[0.08] w-full max-w-lg relative z-10 shadow-2xl overflow-hidden rounded-2xl"
                        >
                            {/* Modal Header */}
                            <div className="h-28 bg-gradient-to-br from-primary/15 via-primary/[0.03] to-transparent relative p-6 flex items-center justify-between overflow-hidden">
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-14 h-14 bg-white/[0.06] backdrop-blur rounded-xl flex items-center justify-center p-2 border border-white/[0.08]">
                                        <img src={selectedProduct.logo} alt={selectedProduct.name} className="w-full h-full object-contain brightness-0 invert" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{selectedProduct.name}</h3>
                                        <p className="text-white/40 text-xs font-medium">{selectedProduct.category}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedProduct(null)}
                                    className="w-9 h-9 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white/60 flex items-center justify-center transition-all relative z-10"
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
                                                        : "bg-white/[0.02] border-white/[0.06] text-white/50 hover:bg-white/[0.04] hover:text-white"
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
                                    <span className="text-[10px] text-white font-medium">Anında Teslimat Garantisi</span>
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
                        <h2 className="text-3xl md:text-5xl font-bold font-poppins text-white leading-tight tracking-tight">
                            Popüler <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">Ürünler</span>
                        </h2>
                        <p className="text-white/30 max-w-lg text-sm leading-relaxed">
                            Oyun kodları, hediye kartları ve dijital ürünleri en uygun fiyatlarla satın alın.
                        </p>
                    </div>
                </div>

                {/* Carousel */}
                <div className="relative group">
                    <button
                        onClick={() => scroll('left')}
                        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-xl bg-[#0f0f14]/90 backdrop-blur border border-white/[0.08] items-center justify-center text-white/30 hover:text-white hover:border-primary/30 transition-all opacity-0 group-hover:opacity-100"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-xl bg-[#0f0f14]/90 backdrop-blur border border-white/[0.08] items-center justify-center text-white/30 hover:text-white hover:border-primary/30 transition-all opacity-0 group-hover:opacity-100"
                    >
                        <ChevronRight size={20} />
                    </button>

                    <div
                        ref={scrollRef}
                        className="flex gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth snap-x snap-mandatory"
                    >
                        {finalItems.map((item: any) => (
                            <motion.div
                                key={item.uniqueId}
                                className="group/card relative cursor-pointer snap-start shrink-0 w-[260px] md:w-[calc(25%-12px)]"
                                onClick={() => router.push(`/urun/${item.slug}`)}
                            >
                                <div className="absolute -inset-[1px] bg-gradient-to-b from-primary/15 to-transparent rounded-2xl blur-sm opacity-0 group-hover/card:opacity-100 transition duration-500" />
                                <div className="relative h-full bg-white/[0.02] p-3 rounded-2xl border border-white/[0.06] flex flex-col justify-between overflow-hidden group-hover/card:border-primary/15 transition-colors">

                                    {/* Image */}
                                    <div className="relative h-[220px] w-full overflow-hidden rounded-xl mb-3">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover/card:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-70" />

                                        {item.badge && (
                                            <div className="absolute top-2.5 left-2.5 z-20">
                                                <span className="bg-primary text-white text-[9px] font-semibold px-2 py-1 rounded-md">
                                                    {item.badge}
                                                </span>
                                            </div>
                                        )}

                                        <div className="absolute bottom-2.5 right-2.5 z-20 w-7 h-7 bg-[#0f0f14] border border-white/[0.08] rounded-lg p-1 flex items-center justify-center">
                                            <img src={item.logo} alt="logo" className="w-full h-full object-contain brightness-0 invert" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-2.5 flex-1 flex flex-col">
                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center gap-1">
                                                    <Star size={10} className="fill-yellow-500 text-yellow-500" />
                                                    <span className="text-[10px] font-medium text-white/30">{item.rating}</span>
                                                </div>
                                                <span className="text-[9px] font-medium text-emerald-400 flex items-center gap-0.5">
                                                    <Zap size={9} /> {item.speed}
                                                </span>
                                            </div>
                                            <h3 className="text-sm font-semibold text-white leading-tight line-clamp-2 group-hover/card:text-primary transition-colors">
                                                {item.name} {item.variantName && <span className="text-white/30 block text-[10px] mt-0.5 font-normal">{item.variantName}</span>}
                                            </h3>
                                        </div>

                                        <div className="mt-auto flex items-center justify-between">
                                            <div className="flex flex-col">
                                                {item.discountPrice ? (
                                                    <>
                                                        <span className="text-[10px] line-through text-white/15 font-medium">₺{item.price}</span>
                                                        <span className="text-base font-bold text-white tracking-tight">₺{item.variantPrice}</span>
                                                    </>
                                                ) : (
                                                    <span className="text-base font-bold text-white tracking-tight">₺{item.variantPrice}</span>
                                                )}
                                            </div>
                                            <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/20 group-hover/card:bg-primary group-hover/card:text-white group-hover/card:border-primary transition-all duration-500">
                                                <ShoppingCart size={15} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
