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

const COLOR_FIELD_LABELS: Record<string, string> = {
    background: "Arka Plan",
    foreground: "Yazı Rengi",
    card: "Kart Zemin",
    primary: "Ana Renk (Primary)",
    secondary: "İkincil Renk (Secondary)",
    accent: "Vurgu Rengi (Accent)",
    muted: "Soluk Renk (Muted)",
    border: "Kenarlık (Border)",
};

export default function AdminSettingsPage() {
    const { settings, updateSettings } = useSystem();
    const [localSettings, setLocalSettings] = useState(settings);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState("general");
    const [editingThemeTab, setEditingThemeTab] = useState<"white" | "dark">("white");

    useEffect(() => {
        if (settings) {
            setLocalSettings(settings);
        }
    }, [settings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setLocalSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleThemeColorChange = (mode: "white" | "dark", field: keyof ThemeConfig, value: string) => {
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
            // Always force activeTheme to "special" so custom colors are always used
            await updateSettings({ ...localSettings, activeTheme: "special" });
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

    const currentEditConfig = editingThemeTab === "white"
        ? (localSettings.lightThemeConfig || settings.lightThemeConfig || {})
        : (localSettings.darkThemeConfig || settings.darkThemeConfig || {});

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

                    {/* Theme Settings — Simplified */}
                    {activeTab === "theme" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            {/* Active Site Mode */}
                            <div className="bg-[#0a100e] border border-white/10 p-8 rounded-2xl space-y-6">
                                <h2 className="text-lg font-black text-white uppercase tracking-wider border-b border-white/5 pb-4">Aktif Tema Seçimi</h2>
                                <p className="text-white/30 text-xs">Sitede hangi temayı kullanmak istediğinizi seçin. Aşağıdaki renk editörüyle her iki temanın tüm renklerini bağımsız olarak düzenleyebilirsiniz.</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { id: "white", label: "Beyaz Tema", icon: Sun, desc: "Açık renkli, beyaz zeminli" },
                                        { id: "dark", label: "Siyah Tema", icon: Moon, desc: "Koyu renkli, siyah zeminli" }
                                    ].map(m => (
                                        <button
                                            key={m.id}
                                            onClick={() => setLocalSettings(prev => ({ ...prev, siteMode: m.id as any }))}
                                            className={cn(
                                                "flex flex-col items-center gap-2 p-6 rounded-xl border-2 transition-all",
                                                localSettings.siteMode === m.id
                                                    ? "border-primary bg-primary/5 text-primary"
                                                    : "border-white/5 bg-white/[0.02] text-white/30 hover:border-white/10"
                                            )}
                                        >
                                            <m.icon size={24} />
                                            <span className="font-bold text-sm uppercase tracking-wide">{m.label}</span>
                                            <span className="text-[10px] opacity-60">{m.desc}</span>
                                            {localSettings.siteMode === m.id && (
                                                <span className="mt-1 text-[9px] font-bold bg-primary/20 text-primary px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                                                    <Check size={10} /> AKTİF
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Color Editor with Tabs for Both Themes */}
                            <div className="bg-[#0a100e] border border-white/10 p-8 rounded-2xl space-y-6">
                                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                    <h2 className="text-lg font-black text-white uppercase tracking-wider">Renk Düzenleyici</h2>
                                </div>

                                {/* Theme Editor Tabs */}
                                <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
                                    <button
                                        onClick={() => setEditingThemeTab("white")}
                                        className={cn(
                                            "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-all",
                                            editingThemeTab === "white"
                                                ? "bg-white text-black shadow-lg"
                                                : "text-white/40 hover:text-white/60"
                                        )}
                                    >
                                        <Sun size={14} /> Beyaz Tema Renkleri
                                    </button>
                                    <button
                                        onClick={() => setEditingThemeTab("dark")}
                                        className={cn(
                                            "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-all",
                                            editingThemeTab === "dark"
                                                ? "bg-black text-white shadow-lg border border-white/10"
                                                : "text-white/40 hover:text-white/60"
                                        )}
                                    >
                                        <Moon size={14} /> Siyah Tema Renkleri
                                    </button>
                                </div>

                                {/* Color Fields */}
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {Object.entries(currentEditConfig).map(([key, value]) => (
                                        <div key={key} className="space-y-2">
                                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">
                                                {COLOR_FIELD_LABELS[key] || key}
                                            </label>
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                                                    <input
                                                        type="color"
                                                        value={(value as string)?.startsWith("#") ? value as string : "#000000"}
                                                        onChange={(e) => handleThemeColorChange(editingThemeTab, key as keyof ThemeConfig, e.target.value)}
                                                        className="absolute -inset-2 w-16 h-16 cursor-pointer bg-transparent"
                                                    />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={(value as string) || ""}
                                                    onChange={(e) => handleThemeColorChange(editingThemeTab, key as keyof ThemeConfig, e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white uppercase font-mono text-xs focus:border-primary/50 outline-none"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Preview hint */}
                                <div className="mt-4 p-4 bg-white/[0.03] rounded-xl border border-white/5">
                                    <p className="text-[11px] text-white/30">
                                        💡 <strong className="text-white/50">İpucu:</strong> Yukarıdaki renkleri değiştirin ve {'"'}Değişiklikleri Kaydet{'"'} butonuna basın.
                                        {editingThemeTab === "white" ? " Beyaz tema" : " Siyah tema"} renkleri{" "}
                                        {editingThemeTab === localSettings.siteMode ? "şu an aktif olan tema olduğu için anında uygulanacaktır." : "diğer temaya ait olduğundan, aktif temayı değiştirdiğinizde uygulanacaktır."}
                                    </p>
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
