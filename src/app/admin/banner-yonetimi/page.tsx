"use client";

import React, { useState, useEffect } from "react";
import { useSystem } from "@/context/SystemContext";
import { Button } from "@/components/ui/Button";
import { Image, Plus, Trash2, Save, GripVertical, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface BannerItem {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    buttonText2?: string;
    buttonLink2?: string;
}

const defaultBanners: BannerItem[] = [
    {
        id: 1,
        image: "/assets/banners/banner-1.png",
        title: "Dijital Cüzdanın,",
        subtitle: "Oyun Mağazan.",
        description: "Oyun kodlarınızı en yüksek oranlarla nakite çevirin, dijital ürünleri güvenle satın alın.",
        buttonText: "Mağazaya Git",
        buttonLink: "/urunler",
        buttonText2: "Kod Bozdur",
        buttonLink2: "/bozum",
    },
    {
        id: 2,
        image: "/assets/banners/banner-2.png",
        title: "Kodlarını Nakite",
        subtitle: "Çevir, Anında Öde.",
        description: "Razer Gold, iTunes, Google Play kodlarınızı %50 garanti oranla saniyeler içinde nakite dönüştürün.",
        buttonText: "Hemen Bozdur",
        buttonLink: "/bozum",
        buttonText2: "Oranları Gör",
        buttonLink2: "/bozum",
    },
    {
        id: 3,
        image: "/assets/banners/banner-3.png",
        title: "Güvenli Alışveriş,",
        subtitle: "Premium Hizmet.",
        description: "SSL sertifikalı güvenli altyapı, 7/24 canlı destek ve anında teslimat garantisi.",
        buttonText: "Ürünleri Keşfet",
        buttonLink: "/urunler",
        buttonText2: "VIP Ol",
        buttonLink2: "/vip-finans",
    },
];

export default function BannerManagementPage() {
    const { settings, updateSettings } = useSystem();
    const [banners, setBanners] = useState<BannerItem[]>([]);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (settings.heroBanners && settings.heroBanners.length > 0) {
            setBanners(settings.heroBanners);
        } else {
            setBanners(defaultBanners);
        }
    }, [settings.heroBanners]);

    const updateBanner = (index: number, field: keyof BannerItem, value: string) => {
        const updated = [...banners];
        (updated[index] as any)[field] = value;
        setBanners(updated);
    };

    const addBanner = () => {
        setBanners([...banners, {
            id: Date.now(),
            image: "/assets/banners/banner-1.png",
            title: "Yeni Banner",
            subtitle: "Alt Başlık",
            description: "Banner açıklaması...",
            buttonText: "Butona Tıkla",
            buttonLink: "/urunler",
        }]);
    };

    const removeBanner = (index: number) => {
        if (banners.length <= 1) return;
        setBanners(banners.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateSettings({ heroBanners: banners });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (error) {
            console.error("Error saving banners:", error);
        }
        setSaving(false);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tight">Banner Yönetimi</h1>
                    <p className="text-white/30 text-xs font-bold uppercase tracking-wider mt-1">Anasayfa hero banner'larını düzenleyin</p>
                </div>
                <div className="flex gap-3">
                    <Button
                        onClick={addBanner}
                        className="bg-white/5 border border-white/10 text-white/60 hover:text-white px-4 py-3 rounded-xl text-xs font-bold uppercase flex items-center gap-2"
                    >
                        <Plus size={16} /> Banner Ekle
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl text-xs font-bold uppercase flex items-center gap-2"
                    >
                        <Save size={16} /> {saving ? "Kaydediliyor..." : saved ? "✓ Kaydedildi!" : "Kaydet"}
                    </Button>
                </div>
            </div>

            {saved && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm">
                    ✅ Banner'lar başarıyla kaydedildi! Anasayfayı yenileyerek değişiklikleri görebilirsiniz.
                </div>
            )}

            <div className="space-y-6">
                {banners.map((banner, index) => (
                    <div key={banner.id} className="bg-[#0a100e] border border-white/10 rounded-2xl overflow-hidden">
                        {/* Banner Header */}
                        <div className="flex items-center gap-4 px-6 py-4 border-b border-white/5">
                            <GripVertical size={16} className="text-white/15 cursor-grab" />
                            <div className="flex items-center gap-3 flex-1">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                                    {index + 1}
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">{banner.title} {banner.subtitle}</p>
                                    <p className="text-white/20 text-[10px]">Banner #{index + 1}</p>
                                </div>
                            </div>
                            {banners.length > 1 && (
                                <button
                                    onClick={() => removeBanner(index)}
                                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Image Preview + URL */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-1">
                                    <div className="aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/5">
                                        <img
                                            src={banner.image}
                                            alt={`Banner ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { (e.target as HTMLImageElement).src = "/logo.png"; }}
                                        />
                                    </div>
                                </div>
                                <div className="md:col-span-2 space-y-4">
                                    <div>
                                        <label className="text-[10px] text-white/30 font-bold uppercase tracking-wider block mb-2">Görsel URL</label>
                                        <input
                                            type="text"
                                            value={banner.image}
                                            onChange={(e) => updateBanner(index, "image", e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50"
                                            placeholder="/assets/banners/banner-1.png"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] text-white/30 font-bold uppercase tracking-wider block mb-2">Başlık</label>
                                            <input
                                                type="text"
                                                value={banner.title}
                                                onChange={(e) => updateBanner(index, "title", e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] text-white/30 font-bold uppercase tracking-wider block mb-2">Alt Başlık (Renkli)</label>
                                            <input
                                                type="text"
                                                value={banner.subtitle}
                                                onChange={(e) => updateBanner(index, "subtitle", e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="text-[10px] text-white/30 font-bold uppercase tracking-wider block mb-2">Açıklama</label>
                                <textarea
                                    value={banner.description}
                                    onChange={(e) => updateBanner(index, "description", e.target.value)}
                                    rows={2}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 resize-none"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="text-[10px] text-white/30 font-bold uppercase tracking-wider block mb-2">Buton 1 Yazısı</label>
                                    <input
                                        type="text"
                                        value={banner.buttonText}
                                        onChange={(e) => updateBanner(index, "buttonText", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] text-white/30 font-bold uppercase tracking-wider block mb-2">Buton 1 Linki</label>
                                    <input
                                        type="text"
                                        value={banner.buttonLink}
                                        onChange={(e) => updateBanner(index, "buttonLink", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] text-white/30 font-bold uppercase tracking-wider block mb-2">Buton 2 Yazısı</label>
                                    <input
                                        type="text"
                                        value={banner.buttonText2 || ""}
                                        onChange={(e) => updateBanner(index, "buttonText2", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50"
                                        placeholder="(Opsiyonel)"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] text-white/30 font-bold uppercase tracking-wider block mb-2">Buton 2 Linki</label>
                                    <input
                                        type="text"
                                        value={banner.buttonLink2 || ""}
                                        onChange={(e) => updateBanner(index, "buttonLink2", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50"
                                        placeholder="(Opsiyonel)"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
