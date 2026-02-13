"use client";

import React, { useState } from "react";
import { useSystem } from "@/context/SystemContext";
import { Wallet, AlertCircle, ArrowRight, Loader2, Building2, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function WithdrawPage() {
    const { user, userBalance, addWithdrawalRequest, sendEmail, settings } = useSystem();
    const [amount, setAmount] = useState("");
    const [bankName, setBankName] = useState("");
    const [iban, setIban] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const withdrawAmount = parseFloat(amount);

        if (!withdrawAmount || withdrawAmount < 300) return alert("Minimum çekim tutarı 300 TL'dir.");
        if (withdrawAmount > userBalance) return alert("Yetersiz bakiye.");
        if (!bankName || !iban) return alert("Banka bilgilerini eksiksiz doldurunuz.");

        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        addWithdrawalRequest({
            amount: withdrawAmount,
            bankName,
            iban,
            accountHolder: user?.name || "Bilinmeyen Kullanıcı",
            userEmail: user?.email
        });

        // --- EMAIL NOTIFICATIONS ---
        // 1. To Customer
        if (user?.email) {
            sendEmail({
                to: user.email,
                subject: "Çekim Talebiniz Alındı! - KodFinans",
                html: `
                    <div style="font-family: sans-serif; padding: 20px; color: #333;">
                        <h2 style="color: #ed1c24;">Çekim Talebi Bildirimi</h2>
                        <p>Sayın <b>${user.name}</b>, çekim talebiniz işleme alınmıştır.</p>
                        <div style="background: #f9f9f9; padding: 15px; border-radius: 10px; margin: 20px 0;">
                            <p style="margin: 5px 0;">💰 Tutar: <b>₺${withdrawAmount.toFixed(2)}</b></p>
                            <p style="margin: 5px 0;">🏦 Banka: <b>${bankName}</b></p>
                            <p style="margin: 5px 0;">💳 IBAN: <b>${iban}</b></p>
                        </div>
                        <p>Talebiniz yönetici incelemesinden sonra onaylanacak ve tutar banka hesabınıza aktarılacaktır.</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                        <p style="font-size: 12px; color: #999;">Bu mesaj otomatik olarak gönderilmiştir.</p>
                    </div>
                `
            });
        }

        // 2. To Admin
        sendEmail({
            to: settings.smtpFrom || "bilgi@kodfinans.com",
            subject: "YENİ ÇEKİM TALEBİ! - KodFinans",
            text: `Yepyeni bir çekim talebi var! \nMüşteri: ${user?.name} (${user?.email}) \nTutar: ₺${withdrawAmount.toFixed(2)} \nBanka: ${bankName}`
        });

        setLoading(false);
        setSuccess(true);
        setAmount("");
        setBankName("");
        setIban("");
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center text-center space-y-6 py-20 px-4">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-4 animate-pulse">
                    <Check size={40} />
                </div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">Talep Alındı!</h2>
                <p className="text-white/60 text-sm font-medium leading-relaxed max-w-md">
                    Çekim talebiniz başarıyla oluşturuldu. Yönetici onayı sonrası tutar hesabınıza aktarılacaktır.
                </p>
                <Button onClick={() => setSuccess(false)} className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-widest text-xs transition-all">
                    Yeni İşlem
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-black text-white uppercase tracking-tight">Bakiye Çek</h1>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Kazançlarını Banka Hesabına Aktar</p>
            </div>

            <div className="glass p-8 rounded-[2.5rem] border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

                <div className="mb-8 p-6 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-between">
                    <div>
                        <p className="text-primary/60 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Mevcut Bakiye</p>
                        <p className="text-3xl font-black text-white">₺{userBalance.toFixed(2)}</p>
                    </div>
                    <Wallet size={32} className="text-primary" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2">Alıcı Adı Soyadı</label>
                        <div className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white/50 font-bold cursor-not-allowed select-none">
                            {user?.name}
                        </div>
                        <p className="text-[10px] text-red-400 ml-2 font-bold flex items-center gap-1">
                            <AlertCircle size={10} />
                            Sadece kendi adınıza olan hesaba çekim yapabilirsiniz.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2">Banka Adı</label>
                            <div className="relative">
                                <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                                <input
                                    type="text"
                                    placeholder="Örn: Ziraat Bankası"
                                    value={bankName}
                                    onChange={(e) => setBankName(e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all font-medium"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2">Çekilecek Tutar</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 font-bold">₺</span>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-2xl pl-10 pr-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all font-mono font-bold"
                                    max={userBalance}
                                    min={300}
                                    required
                                />
                            </div>
                            <p className="text-[10px] text-white/40 ml-2 font-bold tracking-wide flex items-center gap-1 mt-2">
                                <AlertCircle size={10} />
                                Minimum çekim tutarı 300 TL'dir.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2">IBAN Numarası</label>
                        <input
                            type="text"
                            placeholder="TR00 0000 0000 0000 0000 0000 00"
                            value={iban}
                            onChange={(e) => setIban(e.target.value.toUpperCase())}
                            className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all font-mono"
                            required
                            maxLength={32}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading || userBalance <= 0}
                        className="w-full py-6 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-black text-sm uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(74,188,241,0.2)] hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 size={20} className="animate-spin" /> : (
                            <>
                                ÇEKİM TALEBİ OLUŞTUR <ArrowRight size={20} />
                            </>
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}


