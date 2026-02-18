"use client";

import React from "react";
import { ShoppingBag, User, Wallet, MessageCircle, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const MobileNav = () => {
    const pathname = usePathname();

    const navItems = [
        { name: "Ana Sayfa", icon: Home, href: "/" },
        { name: "Bakiye", icon: Wallet, href: "/panel/bakiye-ekle" },
        { name: "Ürünler", icon: ShoppingBag, href: "/urunler" },
        { name: "Panel", icon: User, href: "/panel" },
        { name: "Destek", icon: MessageCircle, href: "https://wa.me/905517139330", isExternal: true },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden px-4 pb-4 pointer-events-none">
            <div className="max-w-md mx-auto pointer-events-auto">
                <div className="glass rounded-[2rem] border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-2 grid grid-cols-5 place-items-center bg-card/80 backdrop-blur-2xl">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                target={item.isExternal ? "_blank" : undefined}
                                className={cn(
                                    "flex flex-col items-center justify-center gap-1.5 px-3 py-3 rounded-2xl transition-all duration-300 relative group",
                                    isActive ? "text-primary" : "text-foreground/40 hover:text-foreground"
                                )}
                            >
                                {isActive && (
                                    <div className="absolute inset-0 bg-primary/10 rounded-2xl -z-10 animate-pulse" />
                                )}
                                <Icon size={20} className={cn("transition-transform group-hover:scale-110", isActive && "text-primary fill-primary/20")} />
                                <span className="text-[8px] font-black uppercase tracking-widest leading-none">
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
