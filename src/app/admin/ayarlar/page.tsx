"use client";

import React, { useState, useEffect } from "react";
import { useSystem } from "@/context/SystemContext";
import { Button } from "@/components/ui/Button";
import {
    Save,
    Loader2,
    Palette,
    Settings,
    Image as ImageIcon,
    Mail,
    CreditCard,
    Code,
    Sun,
    Moon,
    Check,
    Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeConfig, SiteSettings } from "@/lib/types";
import { uploadFile } from "@/lib/upload";
import { Upload } from "lucide-react";

const THEME_PRESETS = [
    { id: "green", label: "Yeşil (Gaming)", color: "#10b981" },
    { id: "indigo", label: "İndigo", color: "#6366f1" },
    { id: "red", label: "Kırmızı", color: "#ef4444" },
    { id: "blue", label: "Mavi", color: "#3b82f6" },
    { id: "orange", label: "Turuncu", color: "#f59e0b" },
];

export default function AdminSettingsPage() {
    const { settings, updateSettings } = useSystem();
    const [localSettings, setLocalSettings] = useState(settings);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState("general");

    useEffect(() => {
        if (settings) {
            setLocalSettings(settings);
        }
    }, [settings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setLocalSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleThemeColorChange = (mode: SiteSettings["siteMode"], field: keyof ThemeConfig, value: string) => {
        const configKey = mode === "white" ? "lightThemeConfig" : "darkThemeConfig";
        const currentConfig = localSettings[configKey] || (mode === "white" ? settings.lightThemeConfig : settings.darkThemeConfig);

        if (!currentConfig) return;

        setLocalSettings(prev => ({
            ...prev,
            [configKey]: {
                ...currentConfig,
                [field]: value
            }
        }));
    };

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const url = await uploadFile(file, `logos/${field}_${Date.now()}`);
            setLocalSettings(prev => ({ ...prev, [field]: url }));
        } catch (error) {
            console.error("Error uploading logo:", error);
            alert("Logo yüklenirken bir hata oluştu.");
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateSettings(localSettings);
            alert("Sistem: Ayarlar başarıyla güncellendi.");
        } catch (error) {
            alert("Hata: Ayarlar kaydedilirken bir hata oluştu.");
        } finally {
            setSaving(false);
        }
    };

    const tabs = [
        { id: "general", label: "Genel Ayarlar", icon: Settings },
        { id: "theme", label: "Görünüm & Tema", icon: Palette },
        { id: "logos", label: "Logo Ayarları", icon: ImageIcon },
        { id: "payments", label: "Ödeme (PayTR)", icon: CreditCard },
        { id: "smtp", label: "E-Posta (SMTP)", icon: Mail },
        { id: "advanced", label: "Gelişmiş", icon: Code },
    ];

    return (
        <div className="space-y-8 max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tight">Sistem Ayarları</h1>
                    <p className="text-white/35 text-xs font-medium mt-1">Platformun tüm görsel ve fonksiyonel ayarlarını buradan yönetin.</p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-primary hover:bg-secondary text-white font-black uppercase tracking-widest px-8 py-3 rounded-xl shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                    {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    Değişiklikleri Kaydet
                </Button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <aside className="lg:w-64 shrink-0 space-y-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all",
                                activeTab === tab.id
                                    ? "bg-primary/10 text-primary border border-primary/20"
                                    : "text-white/30 hover:bg-white/5 hover:text-white/60 border border-transparent"
                            )}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </aside>

                {/* Content Area */}
                <div className="flex-1 space-y-8">
                    {/* General Settings */}
                    {activeTab === "general" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="bg-[#0a100e] border border-white/10 p-8 rounded-2xl space-y-6">
                                <h2 className="text-lg font-black text-white uppercase tracking-wider border-b border-white/5 pb-4 flex items-center gap-2">
                                    <Globe size={18} className="text-primary" /> SEO & İçerik
                                </h2>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Site Başlığı</label>
                                            <input
                                                name="homepageTitle"
                                                value={localSettings.homepageTitle}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-primary/50 focus:outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">WhatsApp No</label>
                                            <input
                                                name="whatsappNumber"
                                                value={localSettings.whatsappNumber}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-primary/50 focus:outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Meta Açıklama</label>
                                        <textarea
                                            name="homepageDescription"
                                            value={localSettings.homepageDescription}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-primary/50 focus:outline-none transition-all h-24 resize-none"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Hero Headline</label>
                                            <input
                                                name="heroHeadline"
                                                value={localSettings.heroHeadline}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-primary/50 focus:outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Hero Subheadline</label>
                                            <input
                                                name="heroSubheadline"
                                                value={localSettings.heroSubheadline}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-primary/50 focus:outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Theme Settings */}
                    {activeTab === "theme" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            {/* Mode & Type */}
                            <div className="bg-[#0a100e] border border-white/10 p-8 rounded-2xl space-y-8">
                                <h2 className="text-lg font-black text-white uppercase tracking-wider border-b border-white/5 pb-4">Tema Modu Seçimi</h2>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Aktif Site Modu</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { id: "white", label: "Beyaz Tema", icon: Sun },
                                                { id: "dark", label: "Siyah Tema", icon: Moon }
                                            ].map(m => (
                                                <button
                                                    key={m.id}
                                                    onClick={() => setLocalSettings(prev => ({ ...prev, siteMode: m.id as any }))}
                                                    className={cn(
                                                        "flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all font-bold text-xs uppercase tracking-wide",
                                                        localSettings.siteMode === m.id
                                                            ? "border-primary bg-primary/5 text-primary"
                                                            : "border-white/5 bg-white/[0.02] text-white/30 hover:border-white/10"
                                                    )}
                                                >
                                                    <m.icon size={16} />
                                                    {m.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Tema Tipi</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { id: "standard", label: "Standart" },
                                                { id: "special", label: "Özel (Gelişmiş)" }
                                            ].map(t => (
                                                <button
                                                    key={t.id}
                                                    onClick={() => setLocalSettings(prev => ({ ...prev, activeTheme: t.id as any }))}
                                                    className={cn(
                                                        "flex items-center justify-center p-4 rounded-xl border-2 transition-all font-bold text-xs uppercase tracking-wide",
                                                        localSettings.activeTheme === t.id
                                                            ? "border-primary bg-primary/5 text-primary"
                                                            : "border-white/5 bg-white/[0.02] text-white/30 hover:border-white/10"
                                                    )}
                                                >
                                                    {t.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Standard Palette (Only active if Standard) */}
                            {localSettings.activeTheme === "standard" && (
                                <div className="bg-[#0a100e] border border-white/10 p-8 rounded-2xl space-y-6">
                                    <h2 className="text-lg font-black text-white uppercase tracking-wider border-b border-white/5 pb-4">Hazır Renk Paletleri</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                        {THEME_PRESETS.map((p) => (
                                            <button
                                                key={p.id}
                                                onClick={() => setLocalSettings(prev => ({ ...prev, themeColor: p.id }))}
                                                className={cn(
                                                    "flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all",
                                                    localSettings.themeColor === p.id
                                                        ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                                                        : "border-white/5 bg-white/[0.02]"
                                                )}
                                            >
                                                <div className="w-10 h-10 rounded-full shadow-xl" style={{ backgroundColor: p.color }} />
                                                <span className="text-[10px] font-bold uppercase tracking-tight text-white/40">{p.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Advanced Color Editor */}
                            <div className="bg-[#0a100e] border border-white/10 p-8 rounded-2xl space-y-8">
                                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                    <h2 className="text-lg font-black text-white uppercase tracking-wider">Renk Özelleştirme</h2>
                                    <span className="text-[10px] font-medium text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">
                                        {localSettings.siteMode === 'white' ? 'Beyaz Tema Editörü' : 'Siyah Tema Editörü'}
                                    </span>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {Object.entries(localSettings.siteMode === 'white' ?
                                        (localSettings.lightThemeConfig || {}) :
                                        (localSettings.darkThemeConfig || {})).map(([key, value]) => (
                                            <div key={key} className="space-y-2">
                                                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">{key} Rengi</label>
                                                <div className="flex items-center gap-3">
                                                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                                                        <input
                                                            type="color"
                                                            value={value || "#000000"}
                                                            onChange={(e) => handleThemeColorChange(localSettings.siteMode as any, key as any, e.target.value)}
                                                            className="absolute -inset-2 w-16 h-16 cursor-pointer bg-transparent"
                                                        />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={value || ""}
                                                        onChange={(e) => handleThemeColorChange(localSettings.siteMode as any, key as any, e.target.value)}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white uppercase font-mono text-xs focus:border-primary/50 outline-none"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Logo Settings */}
                    {activeTab === "logos" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="bg-[#0a100e] border border-white/10 p-8 rounded-2xl space-y-8">
                                <h2 className="text-lg font-black text-white uppercase tracking-wider border-b border-white/5 pb-4 flex items-center gap-2">
                                    <ImageIcon size={18} className="text-primary" /> Marka & Logo Yönetimi
                                </h2>

                                <div className="grid gap-8">
                                    {[
                                        { id: "headerLogo", label: "Header (Navigasyon) Logo", desc: "Sitenin en üst kısmında görünen ana logo." },
                                        { id: "footerLogo", label: "Footer (Alt Bilgi) Logo", desc: "Sitenin en alt kısmında görünen logo." },
                                        { id: "adminLogo", label: "Admin Panel Logo", desc: "Bu panelde ve giriş ekranında görünen logo." }
                                    ].map((logo) => (
                                        <div key={logo.id} className="grid md:grid-cols-3 gap-6 items-start">
                                            <div className="space-y-1">
                                                <label className="text-sm font-bold text-white uppercase tracking-tight">{logo.label}</label>
                                                <p className="text-white/30 text-[11px] leading-relaxed">{logo.desc}</p>
                                            </div>
                                            <div className="md:col-span-2 space-y-4">
                                                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                                    <div className="w-24 h-24 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 relative group">
                                                        <img
                                                            src={localSettings[logo.id as keyof typeof localSettings] as string || "/logo.png"}
                                                            alt="preview"
                                                            className="max-w-[80%] max-h-[80%] object-contain"
                                                        />
                                                        <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                                                            <Upload size={20} className="text-white" />
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                className="hidden"
                                                                onChange={(e) => handleLogoUpload(e, logo.id)}
                                                            />
                                                        </label>
                                                    </div>
                                                    <div className="flex-1 w-full space-y-2">
                                                        <input
                                                            name={logo.id}
                                                            value={localSettings[logo.id as keyof typeof localSettings] as string || ""}
                                                            onChange={handleChange}
                                                            placeholder="https://.../logo.png"
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-[10px] focus:border-primary/50 outline-none font-mono"
                                                        />
                                                        <p className="text-[9px] text-white/20 italic">Logo URL&apos;sini buraya yapıştırabilir veya kutuya tıklayarak yeni bir dosya yükleyebilirsiniz.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Payment Settings */}
                    {activeTab === "payments" && (
                        <div className="bg-[#0a100e] border border-white/10 p-8 rounded-2xl space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
                                <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
                                    <CreditCard size={18} className="text-primary" /> PayTR Entegrasyonu
                                </h2>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Test Modu</span>
                                    <button
                                        onClick={() => setLocalSettings(prev => ({ ...prev, paytrTestMode: !prev.paytrTestMode }))}
                                        className={cn(
                                            "w-12 h-6 rounded-full transition-all relative",
                                            localSettings.paytrTestMode ? "bg-primary" : "bg-white/10"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-md",
                                            localSettings.paytrTestMode ? "left-7" : "left-1"
                                        )} />
                                    </button>
                                </div>
                            </div>

                            <div className="grid gap-6">
                                {['paytrMerchantId', 'paytrMerchantKey', 'paytrMerchantSalt'].map(f => (
                                    <div key={f} className="space-y-2">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">{f}</label>
                                        <input
                                            name={f}
                                            value={(localSettings as any)[f] || ""}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-primary/50 focus:outline-none transition-all"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* SMTP Settings */}
                    {activeTab === "smtp" && (
                        <div className="bg-[#0a100e] border border-white/10 p-8 rounded-2xl space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <h2 className="text-lg font-black text-white uppercase tracking-wider border-b border-white/5 pb-4 flex items-center gap-2">
                                <Mail size={18} className="text-primary" /> SMTP Bildirimleri
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {['smtpHost', 'smtpPort', 'smtpUser', 'smtpPass', 'smtpFrom'].map(f => (
                                    <div key={f} className={cn("space-y-2", f === 'smtpFrom' && "md:col-span-2")}>
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">{f}</label>
                                        <input
                                            name={f}
                                            type={f === 'smtpPass' ? 'password' : 'text'}
                                            value={(localSettings as any)[f] || ""}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-primary/50 focus:outline-none transition-all"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Advanced Settings */}
                    {activeTab === "advanced" && (
                        <div className="bg-[#0a100e] border border-white/10 p-8 rounded-2xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <h2 className="text-lg font-black text-white uppercase tracking-wider border-b border-white/5 pb-4 flex items-center gap-2">
                                <Code size={18} className="text-primary" /> Gelişmiş Özellikler
                            </h2>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Custom Head/Body Scripts</label>
                                    <textarea
                                        name="customHeadCode"
                                        value={localSettings.customHeadCode || ""}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white font-mono text-xs h-40 focus:border-primary/50 outline-none resize-none"
                                        placeholder="<script>...</script>"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Global Custom CSS</label>
                                    <textarea
                                        name="customCss"
                                        value={localSettings.customCss || ""}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white font-mono text-xs h-40 focus:border-primary/50 outline-none resize-none"
                                        placeholder=".btn { border-radius: 0px !important; }"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
