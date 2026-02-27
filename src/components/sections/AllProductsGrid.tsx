/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Star, Zap, ShoppingCart, ShoppingBag, X, CheckCircle2, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSystem } from "@/context/SystemContext";
import { useRouter } from "next/navigation";

const categories = [
    { id: "all", name: "Tümü", icon: ShoppingBag },
    { id: "gift", name: "Hediye Kartları", icon: Gift },
    { id: "games", name: "Oyun Paraları", icon: Zap },
    { id: "items", name: "İtem & GB", icon: ShoppingCart },
];

import { useCart } from "@/context/CartContext";
import { GlobalSearch } from "@/components/features/GlobalSearch";

export const AllProductsGrid = () => {
    const { products, isLoggedIn } = useSystem();
    const [activeTab, setActiveTab] = useState("all");
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [selectedVariant, setSelectedVariant] = useState<string>("");
    const { addToCart, toggleCart } = useCart();
    const router = useRouter();

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

    // Filter: Only 'satis' products (not bozum)
    const salesProducts = (products || []).filter(p => p.productType === "satis" || (!p.productType && !p.slug.includes("bozum")));

    const filteredProducts = activeTab === "all"
        ? salesProducts
        : salesProducts.filter(p => p.category === activeTab);

    // Explode products into their variants for a "full" look
    const explodedItems = filteredProducts.flatMap(product => {
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

    return (
        <section className="pt-28 md:pt-32 pb-12 md:pb-20 relative" id="all-products">
            {/* Modal Overlay */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                        onClick={() => setSelectedProduct(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-card border border-white/10 rounded-[2.5rem] max-w-md w-full p-8 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -z-10" />

                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"
                            >
                                <X size={20} />
                            </button>

                            <div className="space-y-6">
                                <div className="aspect-square rounded-2xl overflow-hidden bg-white/5">
                                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-black text-foreground uppercase tracking-tight mb-2">{selectedProduct.name}</h3>
                                    <p className="text-foreground/40 text-sm">{selectedProduct.description}</p>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-foreground/40 text-xs font-bold uppercase tracking-wider">Paket Seç</label>
                                    <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto pr-2 no-scrollbar">
                                        {(selectedProduct.variants || []).map((v: any) => (
                                            <button
                                                key={v.id}
                                                onClick={() => setSelectedVariant(v.name)}
                                                className={cn(
                                                    "p-3 rounded-xl border-2 transition-all font-bold text-xs",
                                                    selectedVariant === v.name
                                                        ? "border-primary bg-primary/10 text-white"
                                                        : "border-white/10 bg-white/5 text-white/40 hover:border-white/20"
                                                )}
                                            >
                                                {v.name}
                                                <div className="text-[10px] opacity-40 mt-0.5">₺{v.price}</div>
                                            </button>
                                        ))}
                                        {(selectedProduct.variants || []).length === 0 && (
                                            <div className="p-4 rounded-xl border-2 border-white/10 bg-white/5 text-white/40 font-bold text-xs text-center col-span-2">
                                                Bu ürün için alt seçenek bulunmuyor.
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        onClick={handleAddToCart}
                                        disabled={!selectedVariant}
                                        className="flex-1 bg-white/10 hover:bg-white/20 text-white disabled:opacity-50"
                                    >
                                        Sepete Ekle
                                    </Button>
                                    <Button
                                        onClick={handleBuyNow}
                                        disabled={!selectedVariant}
                                        className="flex-1 bg-primary hover:bg-primary/90 text-white disabled:opacity-50"
                                    >
                                        Hemen Al
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-4 overflow-hidden">
                {/* Header Section with Search */}
                <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                    {/* Title and Search Row */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 md:gap-8">
                        <div className="space-y-3 md:space-y-4 w-full lg:w-auto">
                            <div className="inline-flex items-center gap-2 px-3 md:px-4 lg:px-5 py-1 md:py-1.5 lg:py-2 rounded-full bg-card/60 border border-white/5 text-primary text-[8px] md:text-[9px] lg:text-[10px] font-black tracking-wider md:tracking-[0.2em] lg:tracking-[0.3em] uppercase">
                                Dijital Kodlar
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-inter text-foreground leading-[0.95] md:leading-[0.9] tracking-tight md:tracking-tighter uppercase md:italic">
                                KOD <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">ÜRÜNLERİ</span>
                            </h2>
                            <p className="text-foreground/30 max-w-xl text-xs md:text-sm lg:text-base xl:text-lg leading-relaxed font-medium">
                                En popüler oyun ve platform kodlarını en uygun fiyatlarla satın alın.
                            </p>
                        </div>

                        {/* Search Box */}
                        <div className="w-full lg:w-auto lg:min-w-[400px] xl:min-w-[500px]">
                            <GlobalSearch />
                        </div>
                    </div>

                    {/* Category Filters */}
                    <div className="flex bg-white/[0.02] border border-white/[0.06] p-2 rounded-[2.5rem] backdrop-blur-3xl w-full md:w-auto overflow-x-auto no-scrollbar shadow-2xl">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={cn(
                                    "flex items-center justify-center gap-3 px-8 py-4 rounded-[2rem] text-[13px] font-black transition-all duration-500 whitespace-nowrap",
                                    activeTab === cat.id
                                        ? "bg-gradient-to-tr from-primary to-secondary text-white shadow-[0_10px_25px_rgba(74,188,241,0.4)] scale-105"
                                        : "text-foreground/20 hover:text-foreground hover:bg-card/40"
                                )}
                            >
                                <cat.icon size={18} />
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid - FULL GRID */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <AnimatePresence mode="popLayout">
                        {explodedItems.map((item: any, i) => (
                            <motion.div
                                key={item.uniqueId}
                                className="group relative cursor-pointer"
                                onClick={() => {
                                    router.push(`/urun/${item.variantSlug || item.slug}`);
                                }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: i * 0.02 }}
                            >
                                <div className="absolute -inset-[1px] bg-gradient-to-b from-primary/20 to-transparent rounded-[2rem] blur-sm opacity-0 group-hover:opacity-100 transition duration-500" />
                                <div className="relative h-full glass p-3 md:p-4 rounded-[2rem] border-white/5 bg-card/60 flex flex-col justify-between overflow-hidden group-hover:bg-card/80 transition-colors">

                                    {/* Image */}
                                    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] mb-4 shadow-lg">
                                        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-all duration-[1.5s] group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />

                                        {/* Badge */}
                                        <div className="absolute top-3 left-3 px-3 py-1 bg-primary/90 backdrop-blur-md rounded-full">
                                            <span className="text-[9px] font-black text-white uppercase tracking-widest">Popüler</span>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="space-y-3">
                                        <div>
                                            <h3 className="text-foreground font-black text-sm md:text-base uppercase tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
                                                {item.name}
                                            </h3>
                                            {item.variantName && (
                                                <p className="text-foreground/40 text-[10px] font-bold uppercase tracking-wider mt-1">{item.variantName}</p>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between gap-1">
                                            <div className="min-w-0">
                                                <p className="text-[8px] font-black text-foreground/20 uppercase tracking-widest leading-none">Fiyat</p>
                                                <p className="text-foreground font-black text-sm md:text-xl italic tracking-tighter truncate">₺{item.variantPrice || item.price}</p>
                                            </div>
                                            <div className="flex gap-1 shrink-0">
                                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                                    <ShoppingCart size={15} className="md:w-[18px] md:h-[18px]" />
                                                </div>
                                                <Button
                                                    size="sm"
                                                    className="h-8 md:h-10 px-2 md:px-3 bg-foreground/10 hover:bg-foreground/20 text-foreground text-[8px] md:text-[10px] font-black rounded-lg md:rounded-xl uppercase transition-all"
                                                    variant="ghost"
                                                >
                                                    Satın Al
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
