"use client";

import { CartProvider } from "@/context/CartContext";
import { SystemProvider } from "@/context/SystemContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { LiveSupport } from "@/components/ui/LiveSupport";
import { MobileNav } from "./layout/MobileNav";
import { Analytics } from "@/components/analytics/Analytics";
import { ThemeApplier } from "@/components/ThemeApplier";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SystemProvider>
            <CartProvider>
                <ThemeApplier />
                <Analytics />
                {children}
                <CartDrawer />
                <MobileNav />
                <LiveSupport />
            </CartProvider>
        </SystemProvider>
    );
}
