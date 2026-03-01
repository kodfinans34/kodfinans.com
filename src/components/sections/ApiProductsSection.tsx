"use client";

import { useSystem } from "@/context/SystemContext";
import { Link as LinkIcon, ArrowRight, Zap, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export function ApiProductsSection() {
    const { settings } = useSystem();
    const storedApiIntegrations = settings.apiIntegrations?.filter(api => api.isActive) || [];

    const defaultKodFinansApi = {
        id: "kf-api-v1",
        title: "KodFinans Ürün API",
        description: "B2B entegrasyon için tüm dijital ürün stoklarımıza ve fiyatlarımıza doğrudan erişim sağlayan resmi JSON API'miz.",
        apiUrl: "/api/v1/products",
        apiKey: "public",
        image: "",
        isActive: true,
    };

    const apiIntegrations = [defaultKodFinansApi, ...storedApiIntegrations];


    const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

    // Simulate auto-fetching effect
    useEffect(() => {
        if (apiIntegrations.length > 0) {
            const initialMap: Record<string, boolean> = {};
            apiIntegrations.forEach(api => initialMap[api.id] = true);
            setLoadingMap(initialMap);

            // Simulate loading complete after 1.5s
            const timer = setTimeout(() => {
                setLoadingMap({});
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [apiIntegrations.length]); // Deliberately only on mount/change length


    return (
        <section className="py-20 bg-background relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-4 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary w-fit">
                            <Zap size={14} className="animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Canlı Sistem</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
                            Anında <span className="text-primary italic">Teslimat</span>
                        </h2>
                        <p className="text-white/40 text-sm md:text-base font-medium leading-relaxed">
                            Resmi API entegrasyonlarımız sayesinde 7/24 kesintisiz, anında stok kontrolü ve sıfır bekleme ile dijital ürününüzü hemen teslim alın.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {apiIntegrations.map((api) => {
                        const isLoading = loadingMap[api.id];

                        return (
                            <div key={api.id} className="group relative bg-[#0a100e] border border-white/5 rounded-[2rem] p-6 hover:border-primary/30 transition-all duration-500 overflow-hidden flex flex-col h-[280px]">
                                {/* Card Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex items-start justify-between mb-auto">
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500">
                                            {api.image ? (
                                                <img src={api.image} alt={api.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <LinkIcon className="text-white/20" size={24} />
                                            )}
                                        </div>
                                        <div className={`px-2 py-1 rounded-md flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest ${isLoading ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'}`}>
                                            {isLoading ? (
                                                <><RefreshCw size={10} className="animate-spin" /> Güncelleniyor</>
                                            ) : (
                                                <><Zap size={10} /> Aktif Bağlantı</>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-2">
                                        <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-primary transition-colors">{api.title}</h3>
                                        <p className="text-sm text-white/40 line-clamp-2">{api.description || "Anında otomatik teslimat ile 7/24 hizmetinizde."}</p>
                                    </div>

                                    <div
                                        onClick={() => {
                                            if (api.apiUrl) window.open(api.apiUrl, '_blank');
                                        }}
                                        className="mt-6 pt-4 border-t border-white/5 uppercase flex items-center justify-between group/btn cursor-pointer"
                                    >
                                        <span className="text-[10px] font-black text-white/60 tracking-widest group-hover/btn:text-primary transition-colors">
                                            {isLoading ? "Bağlanıyor..." : (api.id === "kf-api-v1" ? "API'yi Test Et" : "Ürünleri İncele")}
                                        </span>
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover/btn:bg-primary text-white/40 group-hover/btn:text-white transition-all transform group-hover/btn:translate-x-1">
                                            <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
