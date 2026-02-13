"use client";

import { CartProvider } from "@/context/CartContext";
import { SystemProvider } from "@/context/SystemContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { LiveSupport } from "@/components/ui/LiveSupport";
import { MobileNav } from "./layout/MobileNav";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SystemProvider>
            <CartProvider>
                {children}
                <CartDrawer />
                <MobileNav />
                <LiveSupport />
            </CartProvider>
        </SystemProvider>
    );
}
