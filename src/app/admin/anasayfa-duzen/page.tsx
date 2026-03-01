"use client";

import React, { useState } from "react";
import { useSystem } from "@/context/SystemContext";
import { GripVertical, Eye, EyeOff, Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

const AVAILABLE_SECTIONS = [
    { id: "Hero", name: "Hero Bölümü", description: "Ana başlık ve arama çubuğu" },
    { id: "PlatformGrid", name: "Platform Grid", description: "Desteklenen platformlar" },
    { id: "KnightOnlineSection", name: "Knight Online", description: "Knight Online Gold bar ve ürünleri" },
    { id: "ApiProductsSection", name: "API Ürünleri", description: "Canlı teslimat API ürün ve entegrasyon listesi" },
    { id: "SalesGrid", name: "En Son Satın Alınanlar", description: "Random ürün carousel" },
    { id: "CtaBanner", name: "CTA Banner", description: "WhatsApp yönlendirme banner'ı" },
    { id: "TrustBanner", name: "Güven Banner'ı", description: "SSL, hızlı teslimat vb." },
    { id: "ProductGrid", name: "Bozum Ürünleri", description: "Kod bozdurma grid" },
    { id: "CalculatorWidget", name: "Hesap Makinesi", description: "Bozum hesaplama widget'ı" },
    { id: "SeoContent", name: "SEO İçerik", description: "Alt kısım SEO metni ve SSS" },
];

export default function HomepageLayoutPage() {
    const { settings, updateSettings } = useSystem();

    const defaultOrder = ["Hero", "PlatformGrid", "KnightOnlineSection", "ApiProductsSection", "SalesGrid", "CtaBanner", "TrustBanner", "ProductGrid", "CalculatorWidget", "SeoContent"];

    const savedOrder = settings.homepageSectionOrder || defaultOrder;
    const initialOrder = [...savedOrder];
    // Ensure all default sections are included if missing
    defaultOrder.forEach(item => {
        if (!initialOrder.includes(item)) {
            initialOrder.push(item);
        }
    });

    const [sectionOrder, setSectionOrder] = useState<string[]>(initialOrder);
    const [hiddenSections, setHiddenSections] = useState<string[]>(settings.hiddenSections || []);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;

        const newOrder = [...sectionOrder];
        const draggedItem = newOrder[draggedIndex];
        newOrder.splice(draggedIndex, 1);
        newOrder.splice(index, 0, draggedItem);

        setSectionOrder(newOrder);
        setDraggedIndex(index);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    const handleToggleVisibility = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setHiddenSections(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const handleSave = () => {
        updateSettings({ homepageSectionOrder: sectionOrder, hiddenSections });
        alert("Anasayfa düzeni kaydedildi! Değişiklikleri görmek için sayfayı yenileyin.");
    };

    const handleReset = () => {
        setSectionOrder(defaultOrder);
        setHiddenSections([]);
    };

    const getSectionInfo = (id: string) => {
        return AVAILABLE_SECTIONS.find(s => s.id === id) || { name: id, description: "" };
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tight">Anasayfa Düzeni</h1>
                    <p className="text-white/40 text-sm mt-2">Anasayfadaki bölümlerin sırasını sürükle-bırak ile düzenleyin</p>
                </div>
                <div className="flex gap-3">
                    <Button
                        onClick={handleReset}
                        className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-bold uppercase text-xs flex items-center gap-2"
                    >
                        <RotateCcw size={16} />
                        Sıfırla
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-bold uppercase text-xs flex items-center gap-2"
                    >
                        <Save size={16} />
                        Kaydet
                    </Button>
                </div>
            </div>

            {/* Info Card */}
            <div className="glass p-6 rounded-2xl border-white/5 bg-primary/5">
                <p className="text-white/80 text-sm leading-relaxed">
                    <strong className="text-white">💡 İpucu:</strong> Bölümleri yukarı-aşağı sürükleyerek anasayfadaki görünüm sırasını değiştirebilirsiniz.
                    Değişiklikler kaydedildikten sonra anasayfayı yenilediğinizde yeni düzen aktif olacaktır.
                </p>
            </div>

            {/* Draggable Section List */}
            <div className="space-y-3">
                {sectionOrder.map((sectionId, index) => {
                    const section = getSectionInfo(sectionId);
                    return (
                        <div
                            key={sectionId}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDragEnd={handleDragEnd}
                            className={`
                                glass p-6 rounded-2xl border-white/10 bg-[#0a100e] 
                                cursor-move hover:border-primary/50 transition-all
                                ${draggedIndex === index ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}
                            `}
                        >
                            <div className="flex items-center gap-4">
                                {/* Drag Handle */}
                                <div className="text-white/20 hover:text-primary transition-colors">
                                    <GripVertical size={24} />
                                </div>

                                {/* Order Number */}
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <span className="text-primary font-black text-lg">{index + 1}</span>
                                </div>

                                {/* Section Info */}
                                <div className="flex-1">
                                    <h3 className="text-white font-bold text-lg uppercase tracking-tight">{section.name}</h3>
                                    <p className="text-white/40 text-sm mt-1">{section.description}</p>
                                </div>

                                {/* Section ID Badge */}
                                <div className="px-4 py-2 bg-white/5 rounded-lg">
                                    <span className="text-white/40 text-xs font-mono">{sectionId}</span>
                                </div>

                                {/* Visibility Toggle */}
                                <button
                                    onClick={(e) => handleToggleVisibility(sectionId, e)}
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${hiddenSections.includes(sectionId) ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'}`}
                                    title={hiddenSections.includes(sectionId) ? "Görünür Yap" : "Gizle"}
                                >
                                    {hiddenSections.includes(sectionId) ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Preview Info */}
            <div className="glass p-6 rounded-2xl border-white/5">
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Eye size={16} className="text-primary" />
                    Mevcut Sıralama
                </h3>
                <div className="flex flex-wrap gap-2">
                    {sectionOrder.map((sectionId, index) => {
                        const isHidden = hiddenSections.includes(sectionId);
                        return (
                            <div key={sectionId} className={`px-3 py-1.5 rounded-lg border ${isHidden ? 'bg-red-500/5 border-red-500/10' : 'bg-white/5 border-white/10'}`}>
                                <span className={`text-xs font-bold ${isHidden ? 'text-red-500/60 line-through' : 'text-white/60'}`}>
                                    {index + 1}. {getSectionInfo(sectionId).name}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
