"use client";

import React, { useState, useEffect } from "react";
import { useSystem } from "@/context/SystemContext";
import { Button } from "@/components/ui/Button";
import { Save, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminSettingsPage() {
    const { settings, updateSettings } = useSystem();
    const [localSettings, setLocalSettings] = useState(settings);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (settings) {
            setLocalSettings(settings);
        }
    }, [settings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setLocalSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        // Simulate API
        await new Promise(resolve => setTimeout(resolve, 800));
        updateSettings(localSettings);
        setSaving(false);
        alert("Ayarlar başarıyla güncellendi ve kaydedildi.");
    };

    return (
        <div className="space-y-8 max-w-4xl">
            <h1 className="text-3xl font-black text-white uppercase tracking-tight text-red-500">Site Ayarları</h1>

            <div className="grid gap-8">
                {/* General/SEO */}
                <div className="bg-[#08080a] border border-white/10 p-8 rounded-2xl space-y-6">
                    <h2 className="text-lg font-black text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">Genel & SEO</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">Site Başlığı (Title)</label>
                            <input
                                name="homepageTitle"
                                value={localSettings.homepageTitle}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500/50 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">Site Açıklaması (Description)</label>
                            <textarea
                                name="homepageDescription"
                                value={localSettings.homepageDescription}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500/50 focus:outline-none transition-colors h-24 resize-none"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">Anahtar Kelimeler (Keywords)</label>
                            <input
                                name="seoKeywords"
                                value={localSettings.seoKeywords}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500/50 focus:outline-none transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* Homepage Content */}
                <div className="bg-[#08080a] border border-white/10 p-8 rounded-2xl space-y-6">
                    <h2 className="text-lg font-black text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">Anasayfa İçerik</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">Hero Başlık (Üst)</label>
                            <input
                                name="heroHeadline"
                                value={localSettings.heroHeadline}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500/50 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">Hero Alt Başlık</label>
                            <input
                                name="heroSubheadline"
                                value={localSettings.heroSubheadline}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500/50 focus:outline-none transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact */}
                <div className="bg-[#08080a] border border-white/10 p-8 rounded-2xl space-y-6">
                    <h2 className="text-lg font-black text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">İletişim</h2>

                    <div>
                        <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">WhatsApp Numarası</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">+</span>
                            <input
                                name="whatsappNumber"
                                value={localSettings.whatsappNumber}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white focus:border-red-500/50 focus:outline-none transition-colors"
                                placeholder="90532..."
                            />
                        </div>
                        <p className="text-[10px] text-white/20 mt-2">Uluslararası formatta, başında + olmadan giriniz. (Örn: 90532...)</p>
                    </div>
                </div>

                {/* Email / SMTP */}
                <div className="bg-[#08080a] border border-white/10 p-8 rounded-2xl space-y-6">
                    <h2 className="text-lg font-black text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">E-Posta Bildirim Ayarları (SMTP)</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">SMTP Host</label>
                            <input
                                name="smtpHost"
                                value={localSettings.smtpHost || ""}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500/50 focus:outline-none transition-colors"
                                placeholder="smtp.gmail.com"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">SMTP Port</label>
                            <input
                                name="smtpPort"
                                value={localSettings.smtpPort || ""}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500/50 focus:outline-none transition-colors"
                                placeholder="465 veya 587"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">SMTP Kullanıcı</label>
                            <input
                                name="smtpUser"
                                value={localSettings.smtpUser || ""}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500/50 focus:outline-none transition-colors"
                                placeholder="ornek@alanadi.com"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">SMTP Şifre</label>
                            <input
                                type="password"
                                name="smtpPass"
                                value={localSettings.smtpPass || ""}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500/50 focus:outline-none transition-colors"
                                placeholder="********"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">Gönderen E-Posta</label>
                            <input
                                name="smtpFrom"
                                value={localSettings.smtpFrom || ""}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500/50 focus:outline-none transition-colors"
                                placeholder="bilgi@kodfinans.com"
                            />
                        </div>
                    </div>
                </div>

                {/* Email Test */}
                <div className="bg-[#08080a] border border-white/10 p-8 rounded-2xl space-y-6">
                    <h2 className="text-lg font-black text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">E-Posta Testi</h2>
                    <p className="text-xs text-white/40">SMTP ayarlarınızı kaydettikten sonra, çalışıp çalışmadığını kontrol etmek için bir test e-postası gönderebilirsiniz.</p>

                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Test e-postası gönderilecek adres"
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500/50 focus:outline-none transition-colors"
                            id="test_email_input"
                        />
                        <Button
                            onClick={async () => {
                                const emailInput = document.getElementById('test_email_input') as HTMLInputElement;
                                if (!emailInput.value) {
                                    alert("Lütfen bir e-posta adresi giriniz.");
                                    return;
                                }
                                setSaving(true);
                                try {
                                    const response = await fetch('/api/send-email', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            smtpSettings: localSettings,
                                            to: emailInput.value,
                                            subject: "KodFinans - Sistem Testi",
                                            text: "SMTP Ayarlarınız başarıyla yapılandırıldı! Artık sistem üzerinden otomatik e-postalar gönderilebilir.",
                                            html: `
                                                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                                                    <h2 style="color: #ed1c24;">KodFinans SMTP Testi</h2>
                                                    <p>Tebrikler! SMTP ayarlarınız başarıyla çalışıyor.</p>
                                                    <p>Bu e-posta <b>${localSettings.smtpUser}</b> adresi üzerinden gönderilmiştir.</p>
                                                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                                                    <p style="font-size: 12px; color: #999;">Bu bir sistem test mesajıdır, yanıtlamanıza gerek yoktur.</p>
                                                </div>
                                            `
                                        })
                                    });

                                    const data = await response.json();
                                    if (data.success) {
                                        alert(`BAŞARILI! Test e-postası ${emailInput.value} adresine gerçekten gönderildi.\nLütfen gelen kutunuzu (ve spam klasörünü) kontrol ediniz.`);
                                    } else {
                                        alert(`HATA: ${data.error}`);
                                    }
                                } catch (error: any) {
                                    alert(`BAĞLANTI HATASI: ${error.message}`);
                                } finally {
                                    setSaving(false);
                                }
                            }}
                            disabled={saving}
                            className="bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-widest px-6 py-3 rounded-xl transition-all flex items-center gap-2"
                        >
                            {saving ? <Loader2 size={16} className="animate-spin" /> : null}
                            Test Gönder
                        </Button>
                    </div>
                </div>

                {/* PayTR */}
                <div className="bg-[#08080a] border border-white/10 p-8 rounded-2xl space-y-6">
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                        <h2 className="text-lg font-black text-white uppercase tracking-wider">PayTR Ödeme Altyapısı</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Test Modu</span>
                            <button
                                onClick={() => setLocalSettings(prev => ({ ...prev, paytrTestMode: !prev.paytrTestMode }))}
                                className={cn(
                                    "w-12 h-6 rounded-full transition-all relative",
                                    localSettings.paytrTestMode ? "bg-red-500" : "bg-white/10"
                                )}
                            >
                                <div className={cn(
                                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                                    localSettings.paytrTestMode ? "left-7" : "left-1"
                                )} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">PayTR Merchant ID</label>
                            <input
                                name="paytrMerchantId"
                                value={localSettings.paytrMerchantId || ""}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500/50 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">PayTR Merchant Key</label>
                            <input
                                name="paytrMerchantKey"
                                value={localSettings.paytrMerchantKey || ""}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500/50 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">PayTR Merchant Salt</label>
                            <input
                                name="paytrMerchantSalt"
                                value={localSettings.paytrMerchantSalt || ""}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500/50 focus:outline-none transition-colors"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end sticky bottom-8">
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg shadow-red-600/20 flex items-center gap-2"
                    >
                        {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        Kaydet
                    </Button>
                </div>
            </div>
        </div>
    );
}
