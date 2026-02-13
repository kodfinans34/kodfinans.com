"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";
import { Menu, X, ChevronRight, Calculator, Trophy, Info, Phone, BookOpen, LayoutGrid, Home, Command, ShoppingBag, Zap, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useSystem } from "@/context/SystemContext";
import { User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";

const navLinks = [
    { name: "Anasayfa", href: "/", icon: Home },
    { name: "Bozum Yap", href: "/bozum", icon: Zap },
    { name: "Ürünler", href: "/urunler", icon: ShoppingBag },
    { name: "Blog", href: "/blog", icon: BookOpen },
    { name: "VIP", href: "/vip-finans", icon: Trophy },
    { name: "İletişim", href: "/iletisim", icon: Phone },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { cart, toggleCart } = useCart();
    const { isLoggedIn, userBalance, logout } = useSystem();
    const pathname = usePathname();
    const router = useRouter();

    const [isProfileOpen, setIsProfileOpen] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
                    scrolled
                        ? "bg-[#050506]/95 backdrop-blur-md border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                        : "bg-transparent"
                )}
            >
                {/* Top Banner */}
                <div className="bg-gradient-to-r from-primary via-blue-600 to-secondary text-white font-bold text-[9px] md:text-xs tracking-widest text-center py-2.5 px-4 uppercase shadow-lg shadow-primary/10 relative z-[101]">
                    <span className="opacity-90 leading-tight block md:inline">
                        TÜRKİYE'NİN LİDER <span className="text-white font-black">RAZER GOLD</span> PLATFORMU
                        <span className="hidden md:inline mx-3 opacity-50">|</span>
                        <span className="block md:inline mt-0.5 md:mt-0">7/24 ANINDA TESLİMAT</span>
                    </span>
                </div>

                <div className={cn(
                    "max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between transition-all duration-500",
                    scrolled ? "py-3" : "py-6"
                )}>
                    {/* Logo - Animated & Modern */}
                    <Link href="/" className="flex items-center gap-2 group relative z-[110] shrink-0">
                        <div className="relative w-8 h-8 md:w-9 md:h-9 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 group-hover:border-primary/50 transition-all duration-500 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <Zap size={18} className="text-primary relative z-10 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500" />
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-lg md:text-xl font-black font-poppins tracking-tighter flex items-center">
                                <span className="text-white">Kod</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 animate-gradient-x bg-[length:200%_auto]">Finans</span>
                            </span>
                            <span className="text-[8px] font-bold text-white/30 tracking-[0.2em] uppercase ml-0.5 group-hover:text-primary transition-colors duration-500">Exchange</span>
                        </div>
                    </Link>

                    {/* Desktop Nav - Optimized for horizontal space */}
                    <nav className="hidden lg:flex items-center bg-white/[0.04] border border-white/[0.1] rounded-full px-1 py-1 backdrop-blur-xl gap-0.5 mx-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "px-2.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 relative group flex items-center gap-1 whitespace-nowrap",
                                    pathname === link.href ? "text-white bg-white/10" : "text-white/30 hover:text-white",
                                    link.name === "VIP" && "animate-rainbow font-black !opacity-100"
                                )}>
                                {link.name}
                                {pathname === link.href && (
                                    <motion.div
                                        layoutId="activeLink"
                                        className="absolute inset-0 rounded-full border border-white/10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2 md:gap-3 shrink-0">
                        {/* WhatsApp Support - Subtle Desktop */}
                        <Link href="https://wa.me/905517139330" className="hidden xl:flex items-center justify-center w-10 h-10 rounded-2xl bg-[#25D366]/5 hover:bg-[#25D366]/10 transition-all border border-[#25D366]/10 hover:border-[#25D366]/30 group">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                        </Link>

                        {/* Cart Button */}
                        <button
                            onClick={() => {
                                if (!isLoggedIn) {
                                    router.push("/giris");
                                } else {
                                    toggleCart();
                                }
                            }}
                            className="relative w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-white transition-all group"
                        >
                            <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-[#050506]">
                                    {cart.length}
                                </span>
                            )}
                        </button>

                        {/* User Area - Responsive & Protected */}
                        <div className="flex items-center gap-2 bg-white/[0.03] p-1 rounded-2xl border border-white/5">
                            {isLoggedIn ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center gap-2 md:gap-3 px-2 py-1.5 hover:bg-white/5 rounded-xl transition-colors"
                                    >
                                        <div className="text-right hidden lg:block pr-1 border-r border-white/5">
                                            <p className="text-[9px] text-white/30 font-black uppercase tracking-widest">Bakiye</p>
                                            <p className="text-xs font-black text-white font-mono leading-none mt-0.5">₺{userBalance.toFixed(2)}</p>
                                        </div>
                                        <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center text-white shadow-lg shadow-primary/20 group">
                                            <User size={16} className="group-hover:scale-110 transition-transform" />
                                        </div>
                                        <ChevronDown size={14} className={cn("text-white/40 transition-transform hidden md:block", isProfileOpen && "rotate-180")} />
                                    </button>

                                    <AnimatePresence>
                                        {isProfileOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                className="absolute top-full right-0 mt-2 w-48 bg-[#0a0a0c] border border-white/10 rounded-2xl shadow-xl overflow-hidden z-50"
                                            >
                                                <div className="p-2 space-y-1">
                                                    <Link href="/panel" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-sm text-white font-medium transition-colors">
                                                        <LayoutDashboard size={16} className="text-primary" />
                                                        Müşteri Paneli
                                                    </Link>
                                                    <button
                                                        onClick={() => {
                                                            logout();
                                                            setIsProfileOpen(false);
                                                            router.push("/");
                                                        }}
                                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-sm text-red-500 font-medium transition-colors"
                                                    >
                                                        <LogOut size={16} />
                                                        Çıkış Yap
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <>
                                    <Button variant="ghost" size="sm" className="font-black text-[10px] uppercase tracking-[0.2em] px-4 opacity-50 hover:opacity-100 h-9" onClick={() => router.push("/giris")}>Giriş</Button>
                                    <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white font-black text-[10px] uppercase tracking-[0.2em] px-4 border border-white/5 h-9 rounded-xl" onClick={() => router.push("/kayit-ol")}>Kayıt</Button>
                                </>
                            )}
                        </div>

                        {/* CTA Button - Desktop only */}
                        <div className="hidden lg:block">
                            <Button
                                size="sm"
                                className="bg-animate-rainbow text-white hover:shadow-[0_0_20px_rgba(74,188,241,0.4)] px-6 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] border border-white/10 active:scale-95 transition-all"
                                onClick={() => router.push("/bozum")}
                            >
                                HEMEN BOZUM
                            </Button>
                        </div>

                        {/* Mobile & Tablet Toggle */}
                        <button
                            className="xl:hidden w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all -mr-1"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <AnimatePresence mode="wait">
                                {isOpen ? <X size={20} key="x" /> : <Menu size={20} key="menu" />}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu - Full Screen Premium */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[200] bg-[#050506] flex flex-col lg:hidden"
                    >
                        {/* Mobile Menu Header */}
                        <div className="flex items-center justify-between p-5 border-b border-white/5">
                            <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                                <div className="w-9 h-9 bg-primary/10 flex items-center justify-center rounded-xl border border-primary/20">
                                    <Zap size={18} className="text-primary" />
                                </div>
                                <span className="text-xl font-black font-poppins text-white tracking-tighter">Kod<span className="text-primary italic">Finans</span></span>
                            </Link>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-10 h-10 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Links */}
                        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-2">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 + 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 group",
                                            pathname === link.href
                                                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                                : "bg-white/[0.02] border-white/5 text-white/40 hover:bg-white/5 hover:text-white hover:border-white/10",
                                            link.name === "VIP" && "animate-rainbow border-white/20 font-black"
                                        )}
                                    >
                                        <link.icon size={20} className={pathname === link.href ? "text-white" : "text-white/40 group-hover:text-white transition-colors"} />
                                        <span className="text-lg font-bold tracking-tight">{link.name}</span>
                                        <ChevronRight size={16} className="ml-auto opacity-20 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Footer Actions */}
                        <div className="p-6 border-t border-white/5 space-y-4 bg-white/[0.02]">
                            <div className="grid grid-cols-1 gap-4">
                                {isLoggedIn ? (
                                    <>
                                        <div className="bg-white/5 p-4 rounded-xl flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-white/40 font-bold uppercase">Toplam Bakiye</p>
                                                <p className="text-xl font-black text-white font-mono">₺{userBalance.toFixed(2)}</p>
                                            </div>
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white">
                                                <User size={20} />
                                            </div>
                                        </div>
                                        <Button
                                            className="w-full py-6 rounded-2xl text-sm font-black bg-white/5 border border-white/10 hover:bg-white/10 text-white"
                                            onClick={() => { setIsOpen(false); router.push("/panel"); }}
                                        >
                                            <LayoutDashboard size={18} className="mr-2" />
                                            MÜŞTERİ PANELİ
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            className="w-full py-6 rounded-2xl text-sm font-black border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/20"
                                            onClick={() => { setIsOpen(false); logout(); }}
                                        >
                                            <LogOut size={18} className="mr-2" />
                                            ÇIKIŞ YAP
                                        </Button>
                                    </>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        <Button
                                            className="w-full py-6 rounded-2xl text-sm font-black bg-white text-black hover:bg-white/90"
                                            onClick={() => { setIsOpen(false); router.push("/giris"); }}
                                        >
                                            GİRİŞ YAP
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            className="w-full py-6 rounded-2xl text-sm font-black border-white/10 bg-white/5 hover:bg-white/10"
                                            onClick={() => { setIsOpen(false); router.push("/kayit-ol"); }}
                                        >
                                            KAYIT OL
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <Button
                                className="w-full py-6 rounded-2xl text-sm font-black bg-animate-rainbow text-white shadow-xl shadow-primary/20 border border-white/10"
                                onClick={() => { setIsOpen(false); router.push("/bozum"); }}
                            >
                                <Calculator size={18} className="mr-2" />
                                BOZUM YAP
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
