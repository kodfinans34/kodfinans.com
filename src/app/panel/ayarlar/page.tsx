"use client";

import React, { useState } from "react";
import { useSystem } from "@/context/SystemContext";
import { User, LogOut, Loader2, Save, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
    const { user, login, logout } = useSystem();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        password: "",
        newPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        alert("Bilgileriniz güncellendi (Demo Modu)");
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 pb-32">
            <h1 className="text-3xl font-black text-white uppercase tracking-tight">Hesap Ayarları</h1>

            <div className="grid gap-8">
                {/* Profile Info */}
                <div className="bg-[#08080a] border border-white/5 rounded-[2rem] p-8 space-y-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                            <User size={32} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Profil Bilgileri</h2>
                            <p className="text-white/40 text-sm">Kişisel bilgilerinizi buradan güncelleyebilirsiniz.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest pl-2">Ad Soyad</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest pl-2">E-Posta</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest pl-2">Telefon</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/5">
                            <Button disabled={loading} type="submit" className="w-full md:w-auto bg-primary text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-primary/80 transition-all flex items-center justify-center gap-2">
                                {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                                Değişiklikleri Kaydet
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Password Change */}
                <div className="bg-[#08080a] border border-white/5 rounded-[2rem] p-8 space-y-6 opacity-50 cursor-not-allowed pointer-events-none grayscale">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/40">
                            <ShieldCheck size={32} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Güvenlik</h2>
                            <p className="text-white/40 text-sm">Parolanızı değiştirmek için (Demo modunda devre dışı).</p>
                        </div>
                    </div>
                </div>

                {/* Logout Zone */}
                <div className="bg-red-500/5 border border-red-500/10 rounded-[2rem] p-8 flex items-center justify-between">
                    <div>
                        <h3 className="text-red-500 font-bold uppercase tracking-widest text-sm mb-1">Oturumu Kapat</h3>
                        <p className="text-red-500/40 text-xs font-medium">Hesabınızdan güvenli çıkış yapın.</p>
                    </div>
                    <Button onClick={logout} className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 px-6 py-3 rounded-xl font-bold uppercase tracking-wider transition-all flex items-center gap-2">
                        <LogOut size={18} />
                        Çıkış
                    </Button>
                </div>
            </div>
        </div>
    );
}
