"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";
import { Menu, X, ChevronRight, ShoppingBag, Zap, Wallet, Home, BookOpen, Trophy, Phone, Store, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useSystem } from "@/context/SystemContext";
import { User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";

const navLinks = [
    { name: "Anasayfa", href: "/", icon: Home },
    { name: "Mağaza", href: "/urunler", icon: Store },
    { name: "Kod Bozdur", href: "/bozum", icon: Zap },
    { name: "Blog", href: "/blog", icon: BookOpen },
    { name: "VIP", href: "/vip-finans", icon: Trophy },
    { name: "İletişim", href: "/iletisim", icon: Phone },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { cart, toggleCart } = useCart();
    const { isLoggedIn, userBalance, logout, settings, updateSettings } = useSystem();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const toggleSiteMode = () => {
        const newMode = settings.siteMode === "dark" ? "white" : "dark";
        updateSettings({ siteMode: newMode });
    };

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
                        ? "bg-background/95 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                        : "bg-transparent"
                )}
            >
                {/* Trust Banner */}
                <div className="bg-gradient-to-r from-primary/90 via-secondary/90 to-primary/90 text-white text-[10px] md:text-xs font-medium text-center py-2 px-4 relative z-[101]">
                    <div className="flex items-center justify-center gap-4 md:gap-8">
                        <span className="flex items-center gap-1.5 opacity-80">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            7/24 Aktif
                        </span>
                        <span className="hidden md:inline opacity-40">•</span>
                        <span className="hidden md:flex items-center gap-1.5 opacity-80">
                            SSL Korumalı İşlemler
                        </span>
                        <span className="hidden md:inline opacity-40">•</span>
                        <span className="opacity-80">Anında Teslimat & Ödeme</span>
                    </div>
                </div>

                <div className={cn(
                    "max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between transition-all duration-500",
                    scrolled ? "py-2.5" : "py-4"
                )}>
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group relative z-[110] shrink-0">
                        <div className="relative h-9 flex items-center justify-center transition-all duration-500">
                            {settings.headerLogo ? (
                                <img src={settings.headerLogo} alt="Logo" className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
                            ) : (
                                <>
                                    <div className="relative w-9 h-9 flex items-center justify-center bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-xl border border-primary/20 group-hover:border-primary/40 transition-all duration-500 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <Wallet size={18} className="text-primary relative z-10 group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="flex flex-col leading-tight">
                                        <span className="text-lg md:text-xl font-bold font-inter tracking-tight flex items-center">
                                            <span className="text-foreground">Kod</span>
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Finans</span>
                                        </span>
                                        <span className="text-[8px] font-medium text-foreground/30 tracking-[0.15em] uppercase ml-0.5">Digital Wallet & Store</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center bg-foreground/[0.03] border border-foreground/[0.06] rounded-full px-1.5 py-1 backdrop-blur-xl gap-0.5 mx-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "px-3.5 py-2 rounded-full text-[13px] font-medium transition-all duration-300 relative group whitespace-nowrap",
                                    pathname === link.href ? "text-foreground font-bold" : "text-foreground/60 hover:text-foreground",
                                    link.name === "VIP" && "animate-rainbow font-bold !opacity-100"
                                )}>
                                {link.name}
                                {pathname === link.href && (
                                    <motion.div
                                        layoutId="activeLink"
                                        className="absolute inset-0 rounded-full bg-foreground/[0.04] border border-foreground/[0.04]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2 md:gap-3 shrink-0">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleSiteMode}
                            className="hidden md:flex items-center justify-center w-9 h-9 rounded-xl bg-foreground/[0.03] hover:bg-foreground/[0.08] transition-all border border-foreground/[0.06] hover:border-foreground/[0.12] group"
                            title={settings.siteMode === "dark" ? "Beyaz Tema" : "Koyu Tema"}
                        >
                            {settings.siteMode === "dark" ? (
                                <Sun size={16} className="text-foreground/40 group-hover:text-yellow-400 transition-colors" />
                            ) : (
                                <Moon size={16} className="text-foreground/40 group-hover:text-indigo-400 transition-colors" />
                            )}
                        </button>

                        {/* WhatsApp Support */}
                        <Link href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`} className="hidden xl:flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.03] hover:bg-[#25D366]/10 transition-all border border-white/[0.06] hover:border-[#25D366]/30 group">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity" />
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
                            className="relative w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-foreground/[0.03] border border-foreground/[0.06] hover:bg-foreground/[0.06] text-foreground/50 hover:text-foreground transition-all group"
                        >
                            <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-primary text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-background">
                                    {cart.length}
                                </span>
                            )}
                        </button>

                        {/* User Area */}
                        <div className="flex items-center gap-1.5 bg-foreground/[0.02] p-1 rounded-xl border border-foreground/[0.05]">
                            {isLoggedIn ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center gap-2 md:gap-2.5 px-2 py-1.5 hover:bg-foreground/[0.04] rounded-lg transition-colors"
                                    >
                                        <div className="text-right hidden lg:block pr-2 border-r border-foreground/[0.06]">
                                            <p className="text-[9px] text-foreground/30 font-medium tracking-wide">Bakiye</p>
                                            <p className="text-xs font-semibold text-foreground font-mono leading-none mt-0.5">₺{userBalance.toFixed(2)}</p>
                                        </div>
                                        <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/15">
                                            <User size={16} />
                                        </div>
                                        <ChevronDown size={14} className={cn("text-foreground/30 transition-transform hidden md:block", isProfileOpen && "rotate-180")} />
                                    </button>

                                    <AnimatePresence>
                                        {isProfileOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                                className="absolute top-full right-0 mt-2 w-48 bg-card border border-foreground/[0.08] rounded-2xl shadow-2xl overflow-hidden z-50"
                                            >
                                                <div className="p-2 space-y-1">
                                                    <Link href="/panel" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-foreground/[0.04] text-sm text-foreground/80 font-medium transition-colors">
                                                        <LayoutDashboard size={16} className="text-primary" />
                                                        Panelim
                                                    </Link>
                                                    <button
                                                        onClick={() => {
                                                            logout();
                                                            setIsProfileOpen(false);
                                                            router.push("/");
                                                        }}
                                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-sm text-red-400 font-medium transition-colors"
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
                                    {/* Desktop Buttons */}
                                    <div className="hidden md:flex gap-1.5">
                                        <Button variant="ghost" size="sm" className="font-medium text-xs px-4 text-foreground/40 hover:text-foreground h-9" onClick={() => router.push("/giris")}>Giriş Yap</Button>
                                        <Button size="sm" className="bg-primary/10 hover:bg-primary/20 text-primary font-medium text-xs px-4 border border-primary/20 h-9 rounded-lg" onClick={() => router.push("/kayit-ol")}>Kayıt Ol</Button>
                                    </div>

                                    {/* Mobile Icon Buttons */}
                                    <div className="flex md:hidden gap-1">
                                        <button
                                            onClick={() => router.push("/giris")}
                                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-foreground/[0.03] border border-foreground/[0.06] text-foreground/40 hover:text-foreground transition-colors"
                                        >
                                            <User size={18} />
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* CTA Button - Desktop only */}
                        <div className="hidden lg:block">
                            <Button
                                size="sm"
                                className="bg-gradient-to-r from-primary to-secondary text-white hover:shadow-[0_0_24px_rgba(99,102,241,0.3)] px-5 py-2 rounded-xl font-semibold text-xs border border-white/10 active:scale-95 transition-all"
                                onClick={() => router.push("/bozum")}
                            >
                                <Zap size={14} className="mr-1.5" />
                                Kod Bozdur
                            </Button>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            className="xl:hidden w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-foreground/[0.03] border border-foreground/[0.06] text-foreground/60 hover:text-foreground hover:bg-foreground/[0.06] transition-all"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <AnimatePresence mode="wait">
                                {isOpen ? <X size={18} key="x" /> : <Menu size={18} key="menu" />}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[200] bg-background flex flex-col lg:hidden"
                    >
                        {/* Mobile Menu Header */}
                        <div className="flex items-center justify-between p-5 border-b border-foreground/[0.05]">
                            <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                                {settings.headerLogo ? (
                                    <img src={settings.headerLogo} alt="Logo" className="h-8 w-auto object-contain" />
                                ) : (
                                    <>
                                        <div className="w-9 h-9 bg-primary/10 flex items-center justify-center rounded-xl border border-primary/20">
                                            <Wallet size={18} className="text-primary" />
                                        </div>
                                        <span className="text-xl font-bold font-inter text-foreground tracking-tight">Kod<span className="text-primary">Finans</span></span>
                                    </>
                                )}
                            </Link>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-10 h-10 rounded-xl bg-foreground/[0.04] border border-foreground/[0.06] flex items-center justify-center text-foreground/60"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Links */}
                        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1.5">
                            <div className="text-foreground/20 text-[10px] font-semibold uppercase tracking-[0.15em] mb-2 px-2">Menü</div>
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 group active:scale-[0.98]",
                                            pathname === link.href
                                                ? "bg-primary/10 text-foreground border-primary/20"
                                                : "bg-foreground/[0.02] border-foreground/[0.04] text-foreground/50 hover:bg-foreground/[0.04] hover:text-foreground",
                                            link.name === "VIP" && "animate-rainbow border-primary/20 font-semibold text-foreground"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                                            pathname === link.href ? "bg-primary/20 text-primary" : "bg-foreground/[0.04] group-hover:bg-foreground/[0.06]"
                                        )}>
                                            <link.icon size={16} />
                                        </div>
                                        <span className="text-sm font-medium">{link.name}</span>
                                        <ChevronRight size={14} className="ml-auto opacity-20 group-hover:opacity-60 transition-opacity" />
                                    </Link>
                                </motion.div>
                            ))}

                            {!isLoggedIn && (
                                <div className="mt-4 grid grid-cols-2 gap-3">
                                    <Button
                                        className="h-12 rounded-xl text-sm font-semibold bg-foreground text-background hover:bg-foreground/90"
                                        onClick={() => { setIsOpen(false); router.push("/giris"); }}
                                    >
                                        Giriş Yap
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        className="h-12 rounded-xl text-sm font-semibold border-foreground/[0.08] bg-foreground/[0.04] hover:bg-foreground/[0.08] text-foreground"
                                        onClick={() => { setIsOpen(false); router.push("/kayit-ol"); }}
                                    >
                                        Kayıt Ol
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Footer Actions */}
                        <div className="p-4 border-t border-foreground/[0.05] space-y-3 bg-card/10 pb-8">
                            {/* Mobile Theme Toggle */}
                            <button
                                onClick={toggleSiteMode}
                                className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-foreground/[0.04] border border-foreground/[0.06] hover:bg-foreground/[0.08] text-foreground/60 hover:text-foreground transition-all text-sm font-medium"
                            >
                                {settings.siteMode === "dark" ? (
                                    <><Sun size={16} className="text-yellow-400" /> Beyaz Tema</>
                                ) : (
                                    <><Moon size={16} className="text-indigo-400" /> Koyu Tema</>
                                )}
                            </button>
                            {isLoggedIn ? (
                                <>
                                    <div className="bg-foreground/[0.03] p-3 rounded-xl flex items-center justify-between border border-foreground/[0.05]">
                                        <div>
                                            <p className="text-[10px] text-foreground/30 font-medium tracking-wide">Bakiye</p>
                                            <p className="text-lg font-semibold text-foreground font-mono mt-0.5">₺{userBalance.toFixed(2)}</p>
                                        </div>
                                        <button
                                            onClick={() => { logout(); setIsOpen(false); }}
                                            className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                                        >
                                            <LogOut size={16} />
                                        </button>
                                    </div>
                                    <Button
                                        className="w-full h-12 rounded-xl text-sm font-medium bg-foreground/[0.04] border border-foreground/[0.06] hover:bg-foreground/[0.08] text-foreground"
                                        onClick={() => { setIsOpen(false); router.push("/panel"); }}
                                    >
                                        <LayoutDashboard size={16} className="mr-2" />
                                        Panelime Git
                                    </Button>
                                </>
                            ) : null}

                            <Button
                                className="w-full h-14 rounded-xl text-sm font-semibold bg-gradient-to-r from-primary to-secondary text-white shadow-xl shadow-primary/15 border border-white/10 active:scale-[0.98] transition-transform"
                                onClick={() => { setIsOpen(false); router.push("/bozum"); }}
                            >
                                <Zap size={18} className="mr-2" />
                                Kod Bozdur
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
