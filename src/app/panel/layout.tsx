"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ShoppingBag, Wallet, Settings, LogOut, User, PlusCircle, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useSystem } from "@/context/SystemContext";
const sidebarLinks = [
    { name: "Genel Bakış", href: "/panel", icon: LayoutDashboard },
    { name: "Siparişlerim", href: "/panel/siparisler", icon: ShoppingBag },
    { name: "Bozum İşlemlerim", href: "/panel/bozumlar", icon: Zap },
    { name: "Bakiye Ekle", href: "/panel/bakiye-ekle", icon: PlusCircle },
    { name: "Hesap Ayarları", href: "/panel/ayarlar", icon: Settings },
];

export default function PanelLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { isLoggedIn, logout, settings, isLoaded } = useSystem();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (!isLoaded) return;

        // Check if user is logged in
        if (!isLoggedIn) {
            router.push("/giris");
        } else {
            setIsAuthenticated(true);
        }
    }, [isLoggedIn, isLoaded, router]);

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-background">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
                <p className="text-white/40 text-sm font-bold">Yetkilendiriliyor...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground font-inter selection:bg-primary/30 flex flex-col">
            <Navbar />
            <main className="flex-1 pt-24 md:pt-32 pb-24 relative overflow-hidden">
                {/* Dynamic Background */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -z-10" />

                <div className="max-w-7xl mx-auto px-1 sm:px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
                        {/* Sidebar / Topbar */}
                        <aside className="w-full lg:w-72 shrink-0 bg-transparent lg:glass lg:p-6 lg:rounded-[2rem] lg:border-white/5 space-y-4 lg:space-y-8 lg:sticky lg:top-32">
                            {/* User Info (Desktop only, mobile has it in page) */}
                            <div className="hidden lg:flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center text-primary border border-primary/10 shrink-0">
                                    <User size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-black text-white truncate uppercase tracking-tight">Kullanıcı Paneli</p>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                        <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Online</p>
                                    </div>
                                </div>
                            </div>

                            {/* Menu Links */}
                            <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar snap-x px-4 sm:px-0 -mx-1 sm:mx-0">
                                {sidebarLinks.map((link) => {
                                    const Icon = link.icon;
                                    const isActive = pathname === link.href;

                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={cn(
                                                "flex items-center gap-2.5 px-4 lg:px-5 py-3 lg:py-4 min-w-max lg:min-w-0 rounded-2xl text-[11px] lg:text-xs font-black uppercase tracking-widest transition-all group snap-start",
                                                isActive
                                                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20"
                                                    : "bg-white/[0.03] text-white/40 hover:bg-white/[0.08] hover:text-white border border-white/5"
                                            )}
                                        >
                                            <Icon size={18} className={cn("transition-transform shrink-0", isActive ? "scale-110" : "group-hover:scale-110")} />
                                            {link.name}
                                        </Link>
                                    );
                                })}
                            </nav>

                            <div className="pt-4 border-t border-white/5 hidden lg:block">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black text-red-500/60 hover:text-red-500 hover:bg-red-500/10 transition-all uppercase tracking-widest"
                                >
                                    <LogOut size={18} />
                                    Çıkış Yap
                                </button>
                            </div>
                        </aside>

                        {/* Main Content Area */}
                        <div className="flex-1 min-w-0 w-full glass p-4 sm:p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border-white/5 mx-2 sm:mx-0 shadow-2xl">
                            {children}
                        </div>

                        {/* Mobile Logout (Visible only on mobile bottom) */}
                        <div className="w-full lg:hidden pt-4 mt-6 border-t border-white/5 px-4 mb-4">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-xl text-[11px] font-black text-red-500/60 hover:text-red-500 hover:bg-red-500/10 border border-red-500/10 transition-all uppercase tracking-widest"
                            >
                                <LogOut size={18} />
                                Güvenli Çıkış
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
