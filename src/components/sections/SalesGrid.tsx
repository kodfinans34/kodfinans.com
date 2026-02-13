/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/Button";
import { Star, Zap, ShoppingCart, ShoppingBag, X, CheckCircle2, Gift, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSystem } from "@/context/SystemContext";
import { useRouter } from "next/navigation";

// Mock variants for sales
const getVariants = (category: string) => {
    switch (category) {
        case "games": return ["100 VP", "300 VP", "600 VP", "1250 VP"];
        case "gift": return ["25 TL", "50 TL", "100 TL", "250 TL"];
        case "items": return ["1 GB", "5 GB", "10 GB", "50 GB"];
        default: return ["Starter", "Standard", "Premium"];
    }
};

const categories = [
    { id: "all", name: "Tümü", icon: ShoppingBag },
    { id: "gift", name: "Hediye Kartları", icon: Gift },
    { id: "games", name: "Oyun Paraları", icon: Zap },
    { id: "items", name: "İtem & GB", icon: ShoppingCart },
];

import { useCart } from "@/context/CartContext";

export const SalesGrid = () => {
    const { products, isLoggedIn } = useSystem();
    const [activeTab, setActiveTab] = useState("all");
    const [selectedProduct, setSelectedProduct] = useState<any>(null); // For modal
    const [selectedVariant, setSelectedVariant] = useState<string>("");
    const { addToCart, toggleCart } = useCart();
    const router = useRouter();
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            // Scroll by the full container width to show next 4 items
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
        // toggleCart(); // Optional: open cart immediately
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
    const salesProducts = products.filter(p => p.productType === "satis" || (!p.productType && !p.slug.includes("bozum")));

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
                // Create a unique key for framer-motion
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

    // State for client-side items to avoid hydration mismatch with Math.random()
    const [displayItems, setDisplayItems] = useState<any[]>([]);

    useEffect(() => {
        // Explode and shuffle only once on mount or when products change
        const items = explodedItems.sort(() => Math.random() - 0.5).slice(0, 12);
        setDisplayItems(items);
    }, [products, activeTab]); // Re-shuffle when products or category changes

    // Fallback for SSR
    const finalItems = displayItems.length > 0 ? displayItems : explodedItems.slice(0, 12);

    return (
        <section className="py-24 md:py-36 relative" id="sales">
            {/* Modal Overlay */}
            <AnimatePresence>
                {selectedProduct && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProduct(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            className="bg-[#08080a] border border-white/10 w-full max-w-lg relative z-10 shadow-2xl overflow-hidden rounded-[2.5rem]"
                        >
                            {/* Modal Header */}
                            <div className="h-32 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent relative p-8 flex items-center justify-between overflow-hidden">
                                <div className="absolute inset-0 bg-primary/10 opacity-20 blur-xl"></div>
                                <div className="flex items-center gap-6 relative z-10">
                                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center p-2 shadow-xl border border-white/10">
                                        <img src={selectedProduct.logo} alt={selectedProduct.name} className="w-full h-full object-contain brightness-0 invert" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">{selectedProduct.name}</h3>
                                        <p className="text-white/60 text-xs font-bold uppercase tracking-widest">{selectedProduct.category}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedProduct(null)}
                                    className="w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-all relative z-10"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8 space-y-8">
                                <div className="space-y-4">
                                    <label className="text-xs font-black text-white/30 uppercase tracking-[0.2em] ml-1">Paket Seçimi</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {getVariants(selectedProduct.category).map((variant) => (
                                            <button
                                                key={variant}
                                                onClick={() => setSelectedVariant(variant)}
                                                className={`p-4 rounded-xl border text-sm font-bold transition-all flex items-center justify-center ${selectedVariant === variant ? 'bg-primary/10 border-primary text-primary shadow-[0_0_20px_rgba(74,188,241,0.2)]' : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10 hover:text-white'}`}
                                            >
                                                {variant}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Button
                                        variant="secondary"
                                        className="flex-1 py-4 text-xs font-black uppercase tracking-[0.2em] bg-white/5 border-white/10 hover:bg-white/10 flex items-center justify-center gap-3 h-auto"
                                        onClick={handleAddToCart}
                                    >
                                        <ShoppingCart size={16} /> SEPETE EKLE
                                    </Button>
                                    <Button
                                        className="flex-[2] py-4 text-xs font-black uppercase tracking-[0.2em] bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center gap-3 shadow-lg hover:shadow-primary/25 h-auto"
                                        onClick={handleBuyNow}
                                    >
                                        <Zap size={16} className="fill-white" /> HEMEN AL
                                    </Button>
                                </div>

                                <div className="flex items-center justify-center gap-2 pt-2 opacity-30">
                                    <CheckCircle2 size={12} className="text-green-500" />
                                    <span className="text-[10px] uppercase font-bold text-white">Anında Teslimat Garantisi</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            {/* Premium Background Glows */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-4">
                {/* Header Section */}
                <div className="mb-16 md:mb-20">
                    <div className="space-y-6 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.03] border border-white/5 text-green-500 text-[10px] font-black tracking-[0.3em] uppercase">
                            <Zap size={12} className="fill-green-500" /> Canlı Satışlar
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black font-poppins text-white leading-[0.9] tracking-tighter uppercase italic">
                            EN SON <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">SATIN ALINANLAR</span>
                        </h2>
                        <p className="text-white/30 max-w-xl text-lg leading-relaxed font-medium">
                            Diğer kullanıcıların tercih ettiği popüler ürünler.
                        </p>
                    </div>
                </div>

                {/* Product Carousel - Single Row */}
                <div className="relative group">
                    {/* Left Arrow */}
                    <button
                        onClick={() => scroll('left')}
                        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#0a0a0c]/90 backdrop-blur-xl border border-white/10 items-center justify-center text-white/40 hover:text-white hover:border-primary/50 transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={() => scroll('right')}
                        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#0a0a0c]/90 backdrop-blur-xl border border-white/10 items-center justify-center text-white/40 hover:text-white hover:border-primary/50 transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                    >
                        <ChevronRight size={24} />
                    </button>

                    <div
                        ref={scrollRef}
                        className="flex gap-4 md:gap-6 overflow-x-auto pb-6 no-scrollbar scroll-smooth snap-x snap-mandatory"
                    >
                        {finalItems.map((item: any, i: number) => (
                            <motion.div
                                key={item.uniqueId}
                                className="group relative cursor-pointer snap-start shrink-0 w-[280px] md:w-[calc(25%-18px)]"
                                onClick={() => {
                                    // Always navigate to the main product page
                                    router.push(`/urun/${item.slug}`);
                                }}
                            >
                                <div className="absolute -inset-[1px] bg-gradient-to-b from-primary/20 to-transparent rounded-[2rem] blur-sm opacity-0 group-hover:opacity-100 transition duration-500" />
                                <div className="relative h-full glass p-3 md:p-4 rounded-[2rem] border-white/5 bg-[#08080a] flex flex-col justify-between overflow-hidden group-hover:bg-white/[0.02] transition-colors">

                                    {/* Image Area - Compact */}
                                    <div className="relative h-[250px] w-full overflow-hidden rounded-[1.5rem] mb-4 shadow-lg group-hover:shadow-primary/10 transition-shadow">
                                        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-all duration-[1.5s] group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-transparent to-transparent opacity-80" />

                                        {/* Floating Badge */}
                                        <div className="absolute top-3 left-3 z-20">
                                            {item.badge && (
                                                <span className="bg-primary text-white text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest shadow-lg shadow-primary/20">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </div>

                                        {/* Logo Overlay */}
                                        <div className="absolute bottom-3 right-3 z-20 w-8 h-8 bg-[#1a1a1c] border border-white/10 rounded-xl p-1.5 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                                            <img src={item.logo} alt="logo" className="w-full h-full object-contain brightness-0 invert opacity-100" />
                                        </div>
                                    </div>

                                    {/* Content Area - Condensed to fit */}
                                    <div className="space-y-3 flex-1 flex flex-col">
                                        <div>
                                            <div className="flex items-center justify-between mb-1.5">
                                                <div className="flex items-center gap-1">
                                                    <Star size={10} className="fill-yellow-500 text-yellow-500" />
                                                    <span className="text-[10px] font-bold text-white/40">{item.rating}</span>
                                                </div>
                                                <span className="text-[9px] font-black text-green-400 uppercase tracking-widest flex items-center gap-1">
                                                    <Zap size={10} /> {item.speed}
                                                </span>
                                            </div>
                                            <h3 className="text-sm md:text-base font-black text-white leading-tight tracking-tight uppercase line-clamp-2 group-hover:text-primary transition-colors">
                                                {item.name} {item.variantName && <span className="text-white/40 block text-[10px] mt-1">{item.variantName}</span>}
                                            </h3>
                                        </div>

                                        <div className="mt-auto space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    {item.discountPrice ? (
                                                        <>
                                                            <span className="text-[10px] line-through text-white/20 font-bold">₺{item.price}</span>
                                                            <span className="text-lg font-black text-white italic tracking-tighter">₺{item.variantPrice}</span>
                                                        </>
                                                    ) : (
                                                        <span className="text-lg font-black text-white italic tracking-tighter">₺{item.variantPrice}</span>
                                                    )}
                                                </div>
                                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500">
                                                    <ShoppingCart size={16} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section >
    );
};
