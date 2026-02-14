"use client";

import { CartProvider } from "@/context/CartContext";
import { SystemProvider } from "@/context/SystemContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { LiveSupport } from "@/components/ui/LiveSupport";
import { MobileNav } from "./layout/MobileNav";
import { Analytics } from "@/components/analytics/Analytics";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SystemProvider>
            <CartProvider>
                <Analytics />
                {children}
                <CartDrawer />
                <MobileNav />
                <LiveSupport />
            </CartProvider>
        </SystemProvider>
    );
}
