import React from "react";
import { Command } from "lucide-react";

export default function WhatsAppLogoPage() {
    return (
        <div className="min-h-screen bg-[#070d0b] flex items-center justify-center p-4">
            <div
                id="whatsapp-logo"
                className="w-[800px] h-[800px] bg-[#070d0b] flex flex-col items-center justify-center gap-12 border border-white/5 relative overflow-hidden"
            >
                {/* Background Glows matching brand */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full" />

                {/* Icon Container */}
                <div className="relative z-10 w-64 h-64 bg-white flex items-center justify-center rounded-[3rem] shadow-[0_0_90px_rgba(255,255,255,0.1)]">
                    <Command size={140} className="text-primary" strokeWidth={1.5} />
                </div>

                {/* Text */}
                <div className="relative z-10 flex flex-col items-center leading-none mt-4">
                    <span className="text-[100px] font-black font-inter tracking-tighter flex items-center">
                        <span className="text-white">Kod</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 italic">Finans</span>
                    </span>
                    <span className="text-3xl font-bold text-white/40 tracking-[0.6em] uppercase mt-2">Premium Exchange</span>
                </div>

                {/* Decorative border internal */}
                <div className="absolute inset-0 border-[20px] border-[#070d0b] pointer-events-none z-20" />
            </div>
        </div>
    );
}
