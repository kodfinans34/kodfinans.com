"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, X, Zap, ShoppingCart, ArrowRight, Package } from "lucide-react";
import { useSystem } from "@/context/SystemContext";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const GlobalSearch = () => {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const { products } = useSystem();
    const router = useRouter();
    const searchRef = useRef<HTMLDivElement>(null);

    // Typewriter effect for placeholder
    const [placeholder, setPlaceholder] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const words = ["Razer Gold", "League of Legends", "Steam", "Valorant", "PUBG", "Mobile Legends"];

    // Filter products
    const results = query.length > 1
        ? (products || []).filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category?.toLowerCase().includes(query.toLowerCase()) ||
            p.description?.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 6)
        : [];

    // Typewriter effect
    useEffect(() => {
        const currentWord = words[wordIndex];
        const timeout = setTimeout(() => {
            if (isTyping) {
                if (placeholder.length < currentWord.length) {
                    setPlaceholder(currentWord.slice(0, placeholder.length + 1));
                } else {
                    setTimeout(() => setIsTyping(false), 2000);
                }
            } else {
                if (placeholder.length > 0) {
                    setPlaceholder(currentWord.slice(0, placeholder.length - 1));
                } else {
                    setIsTyping(true);
                    setWordIndex((prev) => (prev + 1) % words.length);
                }
            }
        }, isTyping ? 100 : 50);

        return () => clearTimeout(timeout);
    }, [placeholder, isTyping, wordIndex]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (slug: string, type: string) => {
        setQuery("");
        setIsOpen(false);
        if (type === "bozum" || slug.includes("boz")) {
            router.push(`/bozum?product=${slug}`);
        } else {
            router.push(`/urun/${slug}`);
        }
    };

    return (
        <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-[2rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center bg-card/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-2 transition-all group-focus-within:border-primary/50 group-focus-within:bg-card">
                    <div className="pl-4 text-foreground/30 group-focus-within:text-primary transition-colors">
                        <SearchIcon size={20} />
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setIsOpen(true);
                        }}
                        onFocus={() => setIsOpen(true)}
                        placeholder={placeholder || "Ara..."}
                        className="w-full bg-transparent border-none outline-none px-4 py-3 text-foreground placeholder:text-foreground/30 font-medium text-sm md:text-base"
                    />
                    {query && (
                        <button
                            onClick={() => setQuery("")}
                            className="p-2 hover:bg-card/50 rounded-full text-foreground/20 hover:text-foreground transition-all mr-2"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {isOpen && query.length > 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-4 bg-card border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden z-[100] backdrop-blur-3xl"
                    >
                        <div className="p-2">
                            {results.length > 0 ? (
                                <div className="space-y-1">
                                    <div className="px-4 py-2 text-[10px] font-black text-foreground/20 uppercase tracking-[0.2em]">Sonuçlar</div>
                                    {results.map((product) => (
                                        <button
                                            key={product.id}
                                            onClick={() => handleSelect(product.slug, product.productType || "sales")}
                                            className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-card/40 transition-all group relative overflow-hidden"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-white/5 overflow-hidden shrink-0 border border-white/5">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <h4 className="text-foreground font-bold text-sm uppercase tracking-tight group-hover:text-primary transition-colors">{product.name}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={cn(
                                                        "text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest",
                                                        product.productType === "bozum" || product.slug.includes("boz")
                                                            ? "bg-primary/20 text-primary"
                                                            : "bg-green-500/20 text-green-500"
                                                    )}>
                                                        {product.productType === "bozum" || product.slug.includes("boz") ? "Bozum" : "Satın Al"}
                                                    </span>
                                                    <span className="text-foreground/30 text-[10px] font-medium">{product.category === "gift" ? "Hediye Kartı" : "Oyun Parası"}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-foreground font-black text-sm italic tracking-tighter">
                                                    {product.productType === "bozum" || product.slug.includes("boz") ? `%${product.price}` : `₺${product.price}`}
                                                </p>
                                                <ArrowRight size={14} className="text-foreground/10 group-hover:text-primary group-hover:translate-x-1 transition-all ml-auto mt-1" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-10 text-center space-y-3">
                                    <div className="w-12 h-12 rounded-full bg-card/60 flex items-center justify-center mx-auto text-foreground/20">
                                        <SearchIcon size={24} />
                                    </div>
                                    <p className="text-foreground/40 text-sm font-bold uppercase tracking-widest">Sonuç bulunamadı</p>
                                    <p className="text-foreground/20 text-xs">Farklı bir kelime deneyebilirsiniz.</p>
                                </div>
                            )}
                        </div>

                        {results.length > 0 && (
                            <div className="p-4 bg-card/20 border-t border-white/5 flex justify-center">
                                <button className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em] hover:text-foreground transition-colors">Sitedeki Tüm Sonuçları Gör</button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
