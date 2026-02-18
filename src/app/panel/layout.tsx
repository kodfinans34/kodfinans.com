"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ShoppingBag, Wallet, Settings, LogOut, User, PlusCircle, Zap } from "lucide-react";
import { useEffect, useState } from "react";
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
    const { isLoggedIn, logout } = useSystem();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        if (!isLoggedIn) {
            router.push("/giris");
        } else {
            setIsAuthenticated(true);
        }
    }, [isLoggedIn, router]);

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex grain">
            {/* Sidebar - Hidden on Mobile */}
            <aside className="hidden lg:flex w-72 border-r border-white/5 bg-card/50 backdrop-blur-3xl flex-col fixed top-0 bottom-0 left-0 z-50">
                <div className="h-24 flex items-center px-8 border-b border-white/5">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                            <Zap size={18} fill="currentColor" />
                        </div>
                        <span className="text-xl font-black italic tracking-tighter text-white uppercase flex items-center">
                            Kod<span className="text-primary italic">Finans</span>
                        </span>
                    </Link>
                </div>

                <div className="flex-1 py-10 px-6 space-y-2 overflow-y-auto">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-6 px-4">Menu</p>
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-4 px-5 py-4 rounded-2xl text-[13px] font-bold transition-all group relative",
                                    isActive
                                        ? "bg-primary/10 text-primary border-primary/20"
                                        : "text-white/40 hover:bg-white/5 hover:text-white border-transparent"
                                )}
                            >
                                {isActive && (
                                    <div className="absolute left-0 w-1 h-6 bg-primary rounded-full" />
                                )}
                                <Icon size={20} className={cn("transition-transform group-hover:scale-110", isActive && "text-primary")} />
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                <div className="p-6 border-t border-white/5">
                    <div className="flex items-center gap-4 px-5 py-5 rounded-3xl bg-white/[0.03] border border-white/[0.05] mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center text-primary border border-primary/10">
                            <User size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-black text-white truncate uppercase tracking-tight">Kullanıcı</p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Online</p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[13px] font-black text-red-500/60 hover:text-red-500 hover:bg-red-500/10 transition-all uppercase tracking-widest"
                    >
                        <LogOut size={20} />
                        Çıkış Yap
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-72 min-h-screen p-6 md:p-12 pb-32 lg:pb-12">
                <div className="max-w-6xl mx-auto">
                    {isAuthenticated ? children : (
                        <div className="flex items-center justify-center h-screen">
                            <div className="text-center">
                                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-white/40 text-sm font-bold">Yetkilendiriliyor...</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            {/* Mobile Bottom Bar */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-white/5 px-2 py-3 flex items-center justify-around">
                {sidebarLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
                                isActive ? "text-primary bg-primary/10 px-4" : "text-foreground/40"
                            )}
                        >
                            <Icon size={20} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">{link.name.split(' ')[0]}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
