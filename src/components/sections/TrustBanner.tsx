"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";

const partners = [
    { name: "Razer Gold", src: "https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Razer_snake_logo.svg/120px-Razer_snake_logo.svg.png" },
    { name: "Steam", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/120px-Steam_icon_logo.svg.png" },
    { name: "iTunes", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/ITunes_logo.svg/120px-ITunes_logo.svg.png" },
    { name: "Google Play", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/120px-Google_Play_Store_badge_EN.svg.png" },
    { name: "Visa", src: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" },
    { name: "Mastercard", src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" },
];

export const TrustBanner = () => {
    return (
        <section className="py-8 md:py-12 border-y border-white/[0.03] bg-card/20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    {/* Trust Label */}
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="w-9 h-9 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                            <ShieldCheck size={18} />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-foreground">Güvenli Altyapı</p>
                            <p className="text-[10px] text-foreground/25 font-medium">Lisanslı ödeme ortakları</p>
                        </div>
                    </div>

                    <div className="w-[1px] h-8 bg-white/[0.06] hidden md:block" />

                    {/* Logo Carousel */}
                    <div className="flex-1 overflow-hidden relative mask-horizontal">
                        <div className="flex gap-10 md:gap-16 items-center slide-logos" style={{ width: "max-content" }}>
                            {[...partners, ...partners].map((p, i) => (
                                <div key={i} className="flex items-center gap-2.5 shrink-0 opacity-20 hover:opacity-50 transition-opacity duration-500">
                                    <img src={p.src} alt={p.name} className="h-5 md:h-6 object-contain brightness-0 dark:invert" />
                                    <span className="text-xs font-medium text-foreground/40 hidden md:block">{p.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
