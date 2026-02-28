"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, ShoppingCart, Settings, LogOut, ShieldCheck, FileText, ClipboardList, Wallet, MessageSquare, Layout, Menu, X, ExternalLink, Image } from "lucide-react";
import { useEffect, useState } from "react";
import { useSystem } from "@/context/SystemContext";
import { AdminNotifications } from "@/components/admin/AdminNotifications";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { settings } = useSystem();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
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
        { name: "Banner Yönetimi", href: "/admin/banner-yonetimi", icon: Image },
        { name: "Knight Online", href: "/admin/knight-online", icon: ShieldCheck },
        { name: "Ürünler", href: "/admin/urunler", icon: ShoppingCart },
        { name: "Bozum Ürünleri", href: "/admin/bozum-urunleri", icon: ShoppingCart },
        { name: "Siparişler", href: "/admin/siparisler", icon: ClipboardList },
        { name: "Bozum Talepleri", href: "/admin/bozumlar", icon: FileText },
        { name: "Çekim Talepleri", href: "/admin/cekimler", icon: Wallet },
        { name: "Bakiye Talepleri", href: "/admin/bakiye-talepleri", icon: Wallet },
        { name: "Yorumlar", href: "/admin/yorumlar", icon: MessageSquare },
        { name: "Blog Yazıları", href: "/admin/blog", icon: FileText },
        { name: "Kullanıcılar", href: "/admin/kullanicilar", icon: Users },
        { name: "Site Ayarları", href: "/admin/ayarlar", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-background/95 backdrop-blur-xl border-b border-white/[0.06] flex items-center justify-between px-4">
                <Link href="/admin" className="flex items-center gap-2">
                    {settings.adminLogo ? (
                        <img src={settings.adminLogo} alt="Admin Logo" className="h-10 w-auto object-contain" />
                    ) : (
                        <>
                            <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                                <ShieldCheck size={14} />
                            </div>
                            <span className="text-sm font-bold text-white">Admin Panel</span>
                        </>
                    )}
                </Link>
                <div className="flex items-center gap-2">
                    <AdminNotifications />
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg bg-white/5 text-white/50">
                        {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div className="lg:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "w-64 border-r border-white/[0.06] bg-card flex flex-col fixed top-0 bottom-0 left-0 z-50 transition-transform duration-300",
                sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                <div className="h-16 flex items-center justify-between px-5 border-b border-white/[0.06]">
                    <Link href="/admin" className="flex items-center gap-2.5">
                        {settings.adminLogo ? (
                            <img src={settings.adminLogo} alt="Admin Logo" className="h-12 w-auto object-contain" />
                        ) : (
                            <>
                                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                    <ShieldCheck size={16} className="text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-white leading-none">Admin</span>
                                    <span className="text-[10px] font-medium text-white/30">Panel</span>
                                </div>
                            </>
                        )}
                    </Link>
                    <div className="hidden lg:block">
                        <AdminNotifications />
                    </div>
                </div>

                <div className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto no-scrollbar">
                    {adminLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setSidebarOpen(false)}
                            className={cn(
                                "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group",
                                pathname === link.href
                                    ? "bg-primary/10 text-primary border border-primary/20"
                                    : "text-white/35 hover:bg-white/[0.04] hover:text-white border border-transparent"
                            )}
                        >
                            <link.icon size={15} className={cn("transition-colors", pathname === link.href ? "text-primary" : "text-white/25 group-hover:text-white/60")} />
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="p-3 border-t border-white/[0.06]">
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-primary/70 hover:text-primary hover:bg-primary/5 transition-all mb-2 border border-primary/10"
                    >
                        <ExternalLink size={15} />
                        Siteye Git
                    </a>
                    <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04] mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary">
                            <ShieldCheck size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-white truncate">Administrator</p>
                            <p className="text-[10px] text-white/30 truncate">admin@kodfinans.com</p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            localStorage.removeItem("isAdminLoggedIn");
                            localStorage.removeItem("adminUser");
                            router.push("/admin-giris");
                        }}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-red-400/60 hover:text-red-400 hover:bg-red-500/5 transition-all"
                    >
                        <LogOut size={15} />
                        Çıkış Yap
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 pt-14 lg:pt-0 min-h-screen">
                <div className="p-4 md:p-8">
                    {isAuthenticated ? children : (
                        <div className="flex items-center justify-center h-screen">
                            <div className="text-center">
                                <div className="w-14 h-14 border-3 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-white/30 text-sm font-medium">Yetkilendiriliyor...</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
