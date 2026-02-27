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
    Check,
    Globe,
    LayoutTemplate,
    Share2,
    Banknote,
    Megaphone
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
    const [editingThemeTab, setEditingThemeTab] = useState<"white" | "dark">("dark");
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [uploadingLogo, setUploadingLogo] = useState<string | null>(null);

    useEffect(() => {
        if (settings) {
            setLocalSettings(settings);
        }
    }, [settings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setLocalSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleToggle = (field: string) => {
        setLocalSettings(prev => ({ ...prev, [field]: !(prev as any)[field] }));
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


    const handleLogoFileLocal = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate
        if (!file.type.startsWith("image/")) {
            alert("Lütfen geçerli bir resim dosyası seçin (PNG, JPG, SVG, WebP).");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert("Dosya boyutu 5MB'den küçük olmalıdır.");
            return;
        }

        setUploadingLogo(field);

        // Helper: convert file to base64 (with resize for large files)
        const toBase64 = (): Promise<string> => {
            return new Promise((resolve, reject) => {
                if (file.size > 500 * 1024) {
                    const img = new Image();
                    const canvas = document.createElement("canvas");
                    img.onload = () => {
                        const maxWidth = 400;
                        const scale = Math.min(1, maxWidth / img.width);
                        canvas.width = img.width * scale;
                        canvas.height = img.height * scale;
                        const ctx = canvas.getContext("2d");
                        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
                        resolve(canvas.toDataURL("image/webp", 0.8));
                        URL.revokeObjectURL(img.src);
                    };
                    img.onerror = reject;
                    img.src = URL.createObjectURL(file);
                } else {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                }
            });
        };

        // Helper: upload with timeout
        const uploadWithTimeout = (timeoutMs: number): Promise<string> => {
            return new Promise((resolve, reject) => {
                const timer = setTimeout(() => reject(new Error("timeout")), timeoutMs);
                uploadFile(file, `logos/${field}_${Date.now()}`)
                    .then(url => { clearTimeout(timer); resolve(url); })
                    .catch(err => { clearTimeout(timer); reject(err); });
            });
        };

        try {
            // Try Firebase Storage with 8s timeout
            const url = await uploadWithTimeout(8000);
            setLocalSettings(prev => ({ ...prev, [field]: url }));
        } catch (firebaseError: any) {
            console.warn("Firebase upload failed/timed out, using base64:", firebaseError?.message);
            try {
                const base64Url = await toBase64();
                setLocalSettings(prev => ({ ...prev, [field]: base64Url }));
            } catch (base64Error) {
                console.error("Base64 conversion failed:", base64Error);
                alert("Logo yüklenemedi. Lütfen daha küçük bir dosya deneyin veya harici bir URL yapıştırın.");
            }
        } finally {
            setUploadingLogo(null);
        }
    };


    const handleSave = async () => {
        setSaving(true);
        try {
            // Always force siteMode to "dark" and activeTheme to "special"
            await updateSettings({ ...localSettings, siteMode: "dark", activeTheme: "special" });
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            alert("Hata: Ayarlar kaydedilirken bir hata oluştu.");
        } finally {
            setSaving(false);
        }
    };

    const tabs = [
        { id: "general", label: "Genel", icon: Settings },
        { id: "header", label: "Header & Banner", icon: LayoutTemplate },
        { id: "footer", label: "Footer & İletişim", icon: Globe },
        { id: "social", label: "Sosyal Medya", icon: Share2 },
        { id: "theme", label: "Görünüm & Tema", icon: Palette },
        { id: "logos", label: "Logo Ayarları", icon: ImageIcon },
        { id: "payments", label: "Ödeme / IBAN", icon: Banknote },
        { id: "smtp", label: "E-Posta (SMTP)", icon: Mail },
        { id: "ctabanner", label: "CTA Banner", icon: Megaphone },
        { id: "advanced", label: "Gelişmiş", icon: Code },
    ];

    const currentEditConfig = editingThemeTab === "white"
        ? (localSettings.lightThemeConfig || settings.lightThemeConfig || {})
        : (localSettings.darkThemeConfig || settings.darkThemeConfig || {});

    const InputField = ({ name, label, placeholder, type = "text", value }: { name: string; label: string; placeholder?: string; type?: string; value?: string }) => (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">{label}</label>
            <input
                name={name}
                type={type}
                value={value !== undefined ? value : ((localSettings as any)[name] || "")}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-primary/50 focus:outline-none transition-all text-sm"
            />
        </div>
    );

    const TextAreaField = ({ name, label, placeholder, rows = 3 }: { name: string; label: string; placeholder?: string; rows?: number }) => (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">{label}</label>
            <textarea
                name={name}
                value={(localSettings as any)[name] || ""}
                onChange={handleChange}
                placeholder={placeholder}
                rows={rows}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-primary/50 focus:outline-none transition-all resize-none text-sm"
            />
        </div>
    );

    const SectionCard = ({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) => (
        <div className="bg-[#0a100e] border border-white/10 p-6 md:p-8 rounded-2xl space-y-6">
            <h2 className="text-lg font-black text-white uppercase tracking-wider border-b border-white/5 pb-4 flex items-center gap-2">
                <Icon size={18} className="text-primary" /> {title}
            </h2>
            {children}
        </div>
    );

    return (
        <div className="space-y-6 max-w-6xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">Sistem Ayarları</h1>
                    <p className="text-white/35 text-xs font-medium mt-1">Platformun tüm görsel ve fonksiyonel ayarlarını buradan yönetin.</p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    className={cn(
                        "text-white font-black uppercase tracking-widest px-6 md:px-8 py-3 rounded-xl shadow-lg flex items-center gap-2 transition-all text-xs md:text-sm",
                        saveSuccess ? "bg-green-500 hover:bg-green-600 shadow-green-500/20" : "bg-primary hover:bg-secondary shadow-primary/20"
                    )}
                >
                    {saving ? <Loader2 size={18} className="animate-spin" /> : saveSuccess ? <Check size={18} /> : <Save size={18} />}
                    {saveSuccess ? "Kaydedildi!" : "Kaydet"}
                </Button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                {/* Sidebar Navigation */}
                <aside className="lg:w-56 shrink-0">
                    <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible no-scrollbar pb-2 lg:pb-0">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shrink-0",
                                    activeTab === tab.id
                                        ? "bg-primary/10 text-primary border border-primary/20"
                                        : "text-white/30 hover:bg-white/5 hover:text-white/60 border border-transparent"
                                )}
                            >
                                <tab.icon size={16} />
                                <span className="hidden lg:inline">{tab.label}</span>
                                <span className="lg:hidden">{tab.label.split(" ")[0]}</span>
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Content Area */}
                <div className="flex-1 space-y-6">
                    {/* General Settings */}
                    {activeTab === "general" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <SectionCard title="SEO & İçerik" icon={Globe}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField name="homepageTitle" label="Site Başlığı" />
                                    <InputField name="whatsappNumber" label="WhatsApp No" />
                                </div>
                                <TextAreaField name="homepageDescription" label="Meta Açıklama" rows={3} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField name="heroHeadline" label="Hero Headline" />
                                    <InputField name="heroSubheadline" label="Hero Subheadline" />
                                </div>
                                <InputField name="seoKeywords" label="SEO Anahtar Kelimeler" placeholder="virgülle ayırın" />
                            </SectionCard>
                        </div>
                    )}

                    {/* Header & Banner */}
                    {activeTab === "header" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <SectionCard title="Üst Banner (Trust Bar)" icon={LayoutTemplate}>
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-white font-bold text-sm">Banner Aktif</p>
                                        <p className="text-white/30 text-xs">Navbar&apos;ın üstündeki renkli bilgi çubuğu</p>
                                    </div>
                                    <button
                                        onClick={() => handleToggle("topBannerEnabled")}
                                        className={cn(
                                            "w-12 h-6 rounded-full transition-all relative",
                                            localSettings.topBannerEnabled !== false ? "bg-primary" : "bg-white/10"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-md",
                                            localSettings.topBannerEnabled !== false ? "left-7" : "left-1"
                                        )} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <InputField name="topBannerText1" label="Banner Metin 1" placeholder="7/24 Aktif" />
                                    <InputField name="topBannerText2" label="Banner Metin 2" placeholder="SSL Korumalı" />
                                    <InputField name="topBannerText3" label="Banner Metin 3" placeholder="Anında Teslimat" />
                                </div>
                            </SectionCard>
                            <SectionCard title="CTA Butonu" icon={Settings}>
                                <InputField name="navCtaText" label="CTA Buton Metni" placeholder="Kod Bozdur" />
                                <p className="text-white/20 text-[11px] italic">Navbar&apos;daki ana aksiyon butonunun metni. Buton her zaman /bozum sayfasına yönlendirir.</p>
                            </SectionCard>
                            <SectionCard title="Hero Görseli" icon={ImageIcon}>
                                <p className="text-white/30 text-xs -mt-2 mb-4">Anasayfadaki büyük arka plan görseli. Tıklayarak yeni görsel yükleyebilir veya URL yapıştırabilirsiniz.</p>
                                <div className="space-y-4">
                                    {/* Upload Area */}
                                    <div
                                        className="relative group cursor-pointer rounded-2xl border-2 border-dashed border-white/10 hover:border-primary/40 transition-all overflow-hidden aspect-video max-w-md bg-white/[0.02]"
                                        onClick={() => {
                                            const input = document.getElementById("heroImageInput") as HTMLInputElement;
                                            input?.click();
                                        }}
                                    >
                                        {localSettings.heroImage ? (
                                            <>
                                                <img src={localSettings.heroImage} alt="Hero Önizleme" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <div className="text-center space-y-2">
                                                        <Upload size={28} className="text-white mx-auto" />
                                                        <p className="text-white text-xs font-bold uppercase tracking-wider">Değiştirmek için tıkla</p>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full py-12 text-white/20">
                                                <Upload size={32} className="mb-3" />
                                                <p className="text-xs font-bold uppercase tracking-wider">Görsel Yükle</p>
                                                <p className="text-[10px] mt-1">PNG, JPG, WebP — max 5MB</p>
                                            </div>
                                        )}
                                        {uploadingLogo === "heroImage" && (
                                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                                                <Loader2 size={32} className="text-primary animate-spin" />
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        id="heroImageInput"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleLogoFileLocal(e, "heroImage")}
                                    />
                                    {/* Manual URL fallback */}
                                    <InputField name="heroImage" label="veya URL Yapıştır" placeholder="https://images.unsplash.com/..." />
                                </div>
                            </SectionCard>
                        </div>
                    )}

                    {/* Footer & Contact */}
                    {activeTab === "footer" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <SectionCard title="Footer İçerik" icon={Globe}>
                                <TextAreaField name="footerDescription" label="Footer Açıklama Metni" placeholder="Sitenin alt kısmında görünen açıklama..." />
                                <InputField name="copyrightText" label="Telif Hakkı Metni" placeholder="KodFinans. Tüm Hakları Saklıdır." />
                            </SectionCard>
                            <SectionCard title="İletişim Bilgileri" icon={Mail}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField name="footerEmail" label="E-Posta Adresi" placeholder="destek@kodfinans.com" />
                                    <InputField name="footerPhone" label="Telefon / WhatsApp" placeholder="+905517139330" />
                                </div>
                                <InputField name="footerAddress" label="Adres" placeholder="Maslak, İstanbul / TR" />
                            </SectionCard>
                        </div>
                    )}

                    {/* Social Media */}
                    {activeTab === "social" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <SectionCard title="Sosyal Medya Linkleri" icon={Share2}>
                                <p className="text-white/30 text-xs -mt-2 mb-4">Boş bırakılan platformlar footer&apos;da gösterilmez.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField name="socialFacebook" label="Facebook URL" placeholder="https://facebook.com/kodfinans" />
                                    <InputField name="socialTwitter" label="Twitter / X URL" placeholder="https://x.com/kodfinans" />
                                    <InputField name="socialInstagram" label="Instagram URL" placeholder="https://instagram.com/kodfinans" />
                                    <InputField name="socialYoutube" label="YouTube URL" placeholder="https://youtube.com/@kodfinans" />
                                    <InputField name="socialTelegram" label="Telegram URL" placeholder="https://t.me/kodfinans" />
                                </div>
                            </SectionCard>
                        </div>
                    )}

                    {/* Theme Settings */}
                    {activeTab === "theme" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            {/* Active Theme Selection Hidden - Always Dark */}

                            <SectionCard title="Renk Düzenleyici" icon={Palette}>
                                {/* Theme Editor Tabs Hidden - Only Dark Editing */}

                                {/* Color Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {Object.entries(currentEditConfig).map(([key, value]) => (
                                        <div key={key} className="space-y-2">
                                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">
                                                {COLOR_FIELD_LABELS[key] || key}
                                            </label>
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
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
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-white uppercase font-mono text-xs focus:border-primary/50 outline-none"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SectionCard>
                        </div>
                    )}

                    {/* Logo Settings */}
                    {activeTab === "logos" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <SectionCard title="Marka & Logo Yönetimi" icon={ImageIcon}>
                                <div className="grid gap-8">
                                    {[
                                        { id: "headerLogo", label: "Header (Navigasyon) Logo", desc: "Sitenin en üst kısmında görünen ana logo." },
                                        { id: "footerLogo", label: "Footer (Alt Bilgi) Logo", desc: "Sitenin en alt kısmında görünen logo." },
                                        { id: "adminLogo", label: "Admin Panel Logo", desc: "Bu panelde ve giriş ekranında görünen logo." }
                                    ].map((logo) => {
                                        const logoUrl = localSettings[logo.id as keyof typeof localSettings] as string;
                                        const isUploading = uploadingLogo === logo.id;
                                        const hasValidUrl = logoUrl && logoUrl !== "/logo.png" && (logoUrl.startsWith("http") || logoUrl.startsWith("data:"));

                                        return (
                                            <div key={logo.id} className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                                                <div className="space-y-1 md:w-48 shrink-0">
                                                    <label className="text-sm font-bold text-white uppercase tracking-tight">{logo.label}</label>
                                                    <p className="text-white/30 text-[11px] leading-relaxed">{logo.desc}</p>
                                                </div>
                                                <div className="flex-1 w-full flex flex-col md:flex-row items-start md:items-center gap-4">
                                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 relative group">
                                                        {isUploading ? (
                                                            <div className="flex flex-col items-center gap-2">
                                                                <Loader2 size={20} className="text-primary animate-spin" />
                                                                <span className="text-[9px] text-white/40">Yükleniyor...</span>
                                                            </div>
                                                        ) : hasValidUrl ? (
                                                            <img
                                                                src={logoUrl}
                                                                alt="preview"
                                                                className="max-w-[80%] max-h-[80%] object-contain"
                                                                onError={(e) => {
                                                                    (e.target as HTMLImageElement).style.display = "none";
                                                                }}
                                                            />
                                                        ) : (
                                                            <div className="flex flex-col items-center gap-1 text-white/15">
                                                                <ImageIcon size={22} />
                                                                <span className="text-[8px] font-medium">Logo Yok</span>
                                                            </div>
                                                        )}
                                                        <label className={cn(
                                                            "absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer transition-opacity",
                                                            isUploading ? "opacity-0 pointer-events-none" : "opacity-0 group-hover:opacity-100"
                                                        )}>
                                                            <Upload size={20} className="text-white" />
                                                            <input
                                                                type="file"
                                                                accept="image/png,image/jpeg,image/svg+xml,image/webp"
                                                                className="hidden"
                                                                onChange={(e) => handleLogoFileLocal(e, logo.id)}
                                                            />
                                                        </label>
                                                    </div>
                                                    <div className="flex-1 w-full space-y-2">
                                                        <input
                                                            name={logo.id}
                                                            value={logoUrl || ""}
                                                            onChange={handleChange}
                                                            placeholder="https://... veya dosya yükleyin"
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-[11px] focus:border-primary/50 outline-none font-mono"
                                                        />
                                                        <p className="text-[9px] text-white/20 italic">Doğrudan URL yapıştırabilir veya sol taraftaki kutuya tıklayıp dosya yükleyebilirsiniz. Yükledikten sonra {'\"'}Kaydet{'\"'} butonuna basın.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </SectionCard>
                        </div>
                    )}

                    {/* Payment & IBAN Settings */}
                    {activeTab === "payments" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <SectionCard title="IBAN / Havale Bilgileri" icon={Banknote}>
                                <p className="text-white/30 text-xs -mt-2 mb-4">Kullanıcılara gösterilecek havale/EFT bilgileri.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField name="bankName" label="Banka Adı" placeholder="Ziraat Bankası" />
                                    <InputField name="ibanHolder" label="Hesap Sahibi" placeholder="KodFinans Teknoloji A.Ş." />
                                </div>
                                <InputField name="ibanInfo" label="IBAN Numarası" placeholder="TR00 0000 0000 0000 0000 0000 00" />
                            </SectionCard>

                            <SectionCard title="PayTR Entegrasyonu" icon={CreditCard}>
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-white font-bold text-sm">Test Modu</p>
                                        <p className="text-white/30 text-xs">Canlıya geçmeden önce test modunu kapatın</p>
                                    </div>
                                    <button
                                        onClick={() => handleToggle("paytrTestMode")}
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
                                <div className="grid gap-6">
                                    {['paytrMerchantId', 'paytrMerchantKey', 'paytrMerchantSalt'].map(f => (
                                        <InputField key={f} name={f} label={f} />
                                    ))}
                                </div>
                            </SectionCard>
                        </div>
                    )}

                    {/* SMTP Settings */}
                    {activeTab === "smtp" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <SectionCard title="SMTP Bildirimleri" icon={Mail}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField name="smtpHost" label="SMTP Host" placeholder="smtp.yandex.com" />
                                    <InputField name="smtpPort" label="SMTP Port" placeholder="465" />
                                    <InputField name="smtpUser" label="SMTP Kullanıcı" placeholder="user@domain.com" />
                                    <InputField name="smtpPass" label="SMTP Şifre" type="password" />
                                    <div className="md:col-span-2">
                                        <InputField name="smtpFrom" label="Gönderen E-Posta" placeholder="bilgi@kodfinans.com" />
                                    </div>
                                </div>
                            </SectionCard>
                        </div>
                    )}

                    {/* CTA Promo Banner Settings */}
                    {activeTab === "ctabanner" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <SectionCard title="Anasayfa CTA Banner" icon={Megaphone}>
                                <p className="text-white/30 text-xs -mt-2 mb-4">Anasayfada gösterilen WhatsApp yönlendirme banner'ını buradan yönetin.</p>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <p className="text-white font-bold text-sm">Banner Aktif</p>
                                        <p className="text-white/30 text-xs">Kapatırsanız anasayfada CTA banner görünmez</p>
                                    </div>
                                    <button
                                        onClick={() => handleToggle("ctaBannerEnabled")}
                                        className={cn(
                                            "w-12 h-6 rounded-full transition-all relative",
                                            localSettings.ctaBannerEnabled !== false ? "bg-primary" : "bg-white/10"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-md",
                                            localSettings.ctaBannerEnabled !== false ? "left-7" : "left-1"
                                        )} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    <InputField name="ctaBannerTitle" label="Banner Başlığı" placeholder="Razer Gold Bozdurma" />
                                    <TextAreaField name="ctaBannerDescription" label="Banner Açıklaması" placeholder="Razer Gold, Steam, iTunes ve tüm dijital kodlarınızı en yüksek oranlarla bozdurun!" rows={3} />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InputField name="ctaBannerButtonText" label="Buton Yazısı" placeholder="WhatsApp ile İletişime Geç" />
                                        <InputField name="ctaBannerWhatsappMessage" label="WhatsApp Mesajı" placeholder="Merhaba, kod bozdurma hakkında bilgi almak istiyorum." />
                                    </div>
                                </div>
                            </SectionCard>
                        </div>
                    )}

                    {/* Advanced Settings */}
                    {activeTab === "advanced" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <SectionCard title="Gelişmiş Özellikler" icon={Code}>
                                <TextAreaField name="customHeadCode" label="Custom Head/Body Scripts" placeholder="<script>...</script>" rows={6} />
                                <TextAreaField name="customCss" label="Global Custom CSS" placeholder=".btn { border-radius: 0px !important; }" rows={6} />
                            </SectionCard>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
