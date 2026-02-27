"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "../ui/Button";
import { ChevronRight, ChevronLeft, TrendingUp, Zap, ShieldCheck, ArrowRight, Store } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSystem } from "@/context/SystemContext";
import { GlobalSearch } from "../features/GlobalSearch";

interface Banner {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    buttonText2?: string;
    buttonLink2?: string;
}

const defaultBanners: Banner[] = [
    {
        id: 1,
        image: "/assets/banners/banner-1.png",
        title: "Dijital Cüzdanın,",
        subtitle: "Oyun Mağazan.",
        description: "Oyun kodlarınızı en yüksek oranlarla nakite çevirin, dijital ürünleri güvenle satın alın. Tek platformda her şey.",
        buttonText: "Mağazaya Git",
        buttonLink: "/urunler",
        buttonText2: "Kod Bozdur",
        buttonLink2: "/bozum",
    },
    {
        id: 2,
        image: "/assets/banners/banner-2.png",
        title: "Kodlarını Nakite",
        subtitle: "Çevir, Anında Öde.",
        description: "Razer Gold, iTunes, Google Play kodlarınızı %50 garanti oranla saniyeler içinde nakite dönüştürün. Yüksek tutarlar için özel oranlar.",
        buttonText: "Hemen Bozdur",
        buttonLink: "/bozum",
        buttonText2: "Oranları Gör",
        buttonLink2: "/bozum",
    },
    {
        id: 3,
        image: "/assets/banners/banner-3.png",
        title: "Güvenli Alışveriş,",
        subtitle: "Premium Hizmet.",
        description: "SSL sertifikalı güvenli altyapı, 7/24 canlı destek ve anında teslimat garantisi. 12.500+ mutlu müşteri ile Türkiye'nin güvenilir platformu.",
        buttonText: "Ürünleri Keşfet",
        buttonLink: "/urunler",
        buttonText2: "VIP Ol",
        buttonLink2: "/vip-finans",
    },
];

export const Hero = () => {
    const router = useRouter();
    const { settings, products } = useSystem();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);

    const banners = React.useMemo(() => {
        const validBanners = settings.heroBanners?.filter((b: any) => b && b.image && b.image.trim() !== "");
        return validBanners && validBanners.length > 0
            ? validBanners
            : defaultBanners;
    }, [settings.heroBanners]);

    const bozumProducts = products?.filter(p => p && (p.productType === "bozum" || (p.slug && (p.slug.includes("bozum") || p.slug.includes("bozdurma"))))) || [];
    const tickerProducts = bozumProducts.slice(0, 7);

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentSlide(prev => (prev + 1) % banners.length);
    }, [banners.length]);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentSlide(prev => (prev - 1 + banners.length) % banners.length);
    }, [banners.length]);

    // Auto-slide every 6s
    useEffect(() => {
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    const banner = banners[currentSlide] || defaultBanners[0];

    if (!banner) return null;

    // Format bozum rate display
    const formatRate = (price: string | number) => {
        const str = String(price);
        // If it already starts with %, don't add another
        if (str.startsWith("%")) return str;
        // If it's a number, show as percentage
        if (typeof price === "number") return `%${price}`;
        return `%${str}`;
    };

    const slideVariants = {
        enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
    };

    return (
        <section className="relative pt-28 md:pt-40 pb-12 md:pb-16 overflow-hidden">
            {/* Permanent gradient background - always visible regardless of image state */}
            <div className="absolute inset-0 -z-20 bg-gradient-to-br from-background via-background to-primary/10" />

            {/* Background Image - REMOVED Framer Motion to guarantee visibility and fix black screen bugs */}
            <div className="absolute inset-0 -z-10 overflow-hidden bg-background">
                {banners.map((b, idx) => (
                    <div
                        key={`slide-bg-${b.id || idx}`}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <img
                            src={b.image && b.image.trim() !== "" ? b.image : `/assets/banners/banner-${(idx % 3) + 1}.png`}
                            alt={b.title || "Banner"}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                const fallbackUrl = `/assets/banners/banner-${(idx % 3) + 1}.png`;
                                if (!target.src.includes(fallbackUrl)) {
                                    target.src = fallbackUrl;
                                }
                            }}
                        />
                        {/* Optimized Overlays for Visibility */}
                        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/20 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-black/5" />
                    </div>
                ))}
            </div>

            {/* Subtle grid overlay */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/[0.02] -z-10" />
            <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/[0.02] -z-10" />

            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[420px] md:min-h-[480px]">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentSlide}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="space-y-6 md:space-y-8 text-center lg:text-left relative z-10"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.08] text-primary text-xs font-medium tracking-wide backdrop-blur-xl">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            7/24 Aktif · Anında Teslimat
                        </div>

                        {/* Headline */}
                        <div className="space-y-2">
                            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold font-inter leading-[1.05] tracking-tight text-foreground">
                                {banner.title} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                    {banner.subtitle}
                                </span>
                            </h1>
                        </div>

                        <p className="text-foreground/50 text-sm md:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
                            {banner.description}
                        </p>

                        {/* Search - only on first slide */}
                        {currentSlide === 0 && (
                            <div className="py-1">
                                <GlobalSearch />
                            </div>
                        )}

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                            <Button
                                size="lg"
                                className="h-12 md:h-14 w-full sm:w-auto px-6 md:px-8 rounded-xl bg-gradient-to-r from-primary to-secondary text-white shadow-[0_12px_32px_rgba(99,102,241,0.25)] font-semibold text-sm hover:shadow-[0_16px_40px_rgba(99,102,241,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                                onClick={() => router.push(banner.buttonLink)}
                            >
                                <Store size={18} className="mr-2" /> {banner.buttonText}
                            </Button>
                            {banner.buttonText2 && (
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="h-12 md:h-14 w-full sm:w-auto px-6 md:px-8 rounded-xl bg-card/20 border-white/[0.08] font-semibold text-sm hover:bg-card/40 transition-all text-foreground"
                                    onClick={() => router.push(banner.buttonLink2 || "/bozum")}
                                >
                                    <Zap size={18} className="mr-2" /> {banner.buttonText2} <ArrowRight size={16} className="ml-1.5 opacity-40" />
                                </Button>
                            )}
                        </div>

                        {/* Stats - only on first slide */}
                        {currentSlide === 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 pt-6 md:pt-8 border-t border-white/[0.04]">
                                {[
                                    { label: "Aktif Üye", value: "12.5k+" },
                                    { label: "Hacim", value: "₺4M+" },
                                    { label: "Memnuniyet", value: "%99.8" },
                                    { label: "Ort. Hız", value: "45sn" },
                                ].map((stat, i) => (
                                    <div key={i} className="space-y-1">
                                        <p className="text-[10px] text-foreground/20 font-medium tracking-wide">{stat.label}</p>
                                        <p className="text-lg md:text-xl font-bold text-foreground">{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Right side - slide indicators & navigation */}
                <div className="hidden lg:flex flex-col items-end justify-center gap-8">
                    {/* Navigation arrows */}
                    <div className="flex gap-3">
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-foreground/30 hover:text-foreground hover:bg-white/[0.08] hover:border-primary/30 transition-all"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-foreground/30 hover:text-foreground hover:bg-white/[0.08] hover:border-primary/30 transition-all"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    {/* Slide dots */}
                    <div className="flex gap-2">
                        {banners.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => { setDirection(i > currentSlide ? 1 : -1); setCurrentSlide(i); }}
                                className={`h-2 rounded-full transition-all duration-500 ${i === currentSlide
                                    ? "w-10 bg-primary"
                                    : "w-2 bg-white/10 hover:bg-white/20"
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Slide counter */}
                    <div className="text-foreground/20 text-sm font-mono">
                        <span className="text-primary font-bold text-2xl">{String(currentSlide + 1).padStart(2, "0")}</span>
                        <span className="mx-2">/</span>
                        <span>{String(banners.length).padStart(2, "0")}</span>
                    </div>
                </div>
            </div>

            {/* Mobile slide dots */}
            <div className="flex lg:hidden justify-center gap-2 mt-6">
                {banners.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => { setDirection(i > currentSlide ? 1 : -1); setCurrentSlide(i); }}
                        className={`h-2 rounded-full transition-all duration-500 ${i === currentSlide
                            ? "w-8 bg-primary"
                            : "w-2 bg-white/10 hover:bg-white/20"
                            }`}
                    />
                ))}
            </div>

            {/* Quick Access Ticker */}
            <div className="max-w-7xl mx-auto px-4 mt-10 md:mt-16">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/[0.06] via-secondary/[0.06] to-primary/[0.06] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <div className="relative glass rounded-2xl md:rounded-full border-white/[0.05] p-3 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth shadow-xl">
                        <div className="flex items-center gap-2.5 px-4 border-r border-white/[0.06] mr-1 shrink-0">
                            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center text-primary">
                                <Zap size={16} className="fill-primary" />
                            </div>
                            <span className="text-xs font-semibold text-foreground/60 whitespace-nowrap">Anlık Kurlar</span>
                        </div>
                        {tickerProducts.map((cat, i) => (
                            <button key={i} onClick={() => router.push(`/bozum/${cat.slug}`)} className="whitespace-nowrap flex items-center gap-3 px-5 py-2.5 rounded-xl md:rounded-full hover:bg-card/40 transition-all group/btn border border-transparent hover:border-white/[0.06] shrink-0">
                                <div className="w-6 h-6 flex items-center justify-center group-hover/btn:scale-110 transition-transform overflow-hidden rounded-md">
                                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col items-start leading-none gap-0.5">
                                    <span className="text-[10px] font-medium text-foreground/25 group-hover/btn:text-foreground/60 transition-colors">{cat.name}</span>
                                    <span className="text-xs font-semibold text-primary">{formatRate(cat.price)}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
