"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, ShoppingCart, Settings, LogOut, ShieldCheck, FileText, ClipboardList, Wallet, MessageSquare, Layout } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if admin is logged in
        const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");

        if (!isAdminLoggedIn || isAdminLoggedIn !== "true") {
            router.push("/admin-giris");
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    const adminLinks = [
        { name: "Genel Bakış", href: "/admin", icon: LayoutDashboard },
        { name: "Anasayfa Düzeni", href: "/admin/anasayfa-duzen", icon: Layout },
        { name: "Ürünler", href: "/admin/urunler", icon: ShoppingCart },
        { name: "Bozum Ürünleri", href: "/admin/bozum-urunleri", icon: ShoppingCart },
        { name: "Siparişler", href: "/admin/siparisler", icon: ClipboardList },
        { name: "Bozum Talepleri", href: "/admin/bozumlar", icon: FileText },
        { name: "Çekim Talepleri", href: "/admin/cekimler", icon: Wallet },
        { name: "Yorumlar", href: "/admin/yorumlar", icon: MessageSquare },
        { name: "Blog Yazıları", href: "/admin/blog", icon: FileText },
        { name: "Kullanıcılar", href: "/admin/kullanicilar", icon: Users },
        { name: "Site Ayarları", href: "/admin/ayarlar", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-[#050506] text-white flex">
            {/* Sidebar - Darker theme for Admin */}
            <aside className="w-64 border-r border-white/[0.08] bg-[#030304] flex flex-col fixed top-0 bottom-0 left-0 z-50">
                <div className="h-20 flex items-center px-6 border-b border-white/[0.08]">
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/20">
                            <ShieldCheck size={18} className="text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-black text-white italic tracking-tighter uppercase leading-none">Admin</span>
                            <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">Panel</span>
                        </div>
                    </Link>
                </div>

                <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
                    {adminLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all group",
                                pathname === link.href
                                    ? "bg-red-600/10 text-red-500 border border-red-600/20 shadow-[0_0_15px_rgba(220,38,38,0.1)]"
                                    : "text-white/30 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <link.icon size={16} className={cn("transition-colors", pathname === link.href ? "text-red-500" : "text-white/30 group-hover:text-white")} />
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="p-4 border-t border-white/[0.08]">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05] mb-2">
                        <div className="w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center text-red-500">
                            <ShieldCheck size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-white truncate">Administrator</p>
                            <p className="text-[10px] text-white/40 truncate">admin@kodfinans.com</p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            localStorage.removeItem("isAdminLoggedIn");
                            localStorage.removeItem("adminUser");
                            router.push("/admin-giris");
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-white/40 hover:text-red-500 hover:bg-red-500/5 transition-all"
                    >
                        <LogOut size={16} />
                        Çıkış Yap
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 bg-[#050506]">
                {isAuthenticated ? children : (
                    <div className="flex items-center justify-center h-screen">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-white/40 text-sm font-bold">Yetkilendiriliyor...</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
