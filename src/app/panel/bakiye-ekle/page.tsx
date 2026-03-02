"use client";

import React, { useState } from "react";
import { Wallet, CreditCard, Landmark, ArrowRight, ShieldCheck, CheckCircle2, Clock, Loader2, Copy, Check, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useSystem } from "@/context/SystemContext";

export default function BakiyeEklePage() {
    const { settings, user, isLoggedIn, addBalanceRequest, balanceRequests } = useSystem();
    const [amount, setAmount] = useState<string>("");
    const [method, setMethod] = useState<"card" | "transfer">("card");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [receipt, setReceipt] = useState<File | null>(null);

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const quickAmounts = ["50", "100", "250", "500", "1000"];

    const userRequests = balanceRequests.filter(r => r.userEmail === user?.email).slice(0, 5);

    const handlePayment = async () => {
        if (!amount || parseFloat(amount) <= 0) return alert("Lütfen geçerli bir tutar giriniz.");
        if (!isLoggedIn || !user) return alert("Lütfen önce giriş yapınız.");

        setIsSubmitting(true);
        try {
            await addBalanceRequest({
                userId: "",
                userEmail: user.email,
                userName: user.name,
                amount: parseFloat(amount),
                method,
            });
            setSubmitted(true);
            setAmount("");

            // Also send WhatsApp notification
            const message = `Merhaba, bakiye yükleme talebi oluşturdum.\n\nTutar: ${amount} TL\nÖdeme Yöntemi: ${method === 'card' ? 'Kredi Kartı' : 'Havale/EFT'}\nE-posta: ${user.email}`;
            window.open(`https://wa.me/${(settings.whatsappNumber || "").replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
        } catch (error) {
            alert("Talep oluşturulurken hata oluştu. Lütfen tekrar deneyin.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12 pb-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">Bakiye Ekle</h1>
                    <p className="text-white/30 text-xs font-bold uppercase tracking-[0.3em]">Güvenli ödeme sistemleri ile 7/24 bakiye yükleyin.</p>
                </div>
            </div>

            {submitted && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 flex items-center gap-4">
                    <CheckCircle2 size={24} className="text-green-500 shrink-0" />
                    <div>
                        <h3 className="text-green-400 font-bold">Talebiniz Oluşturuldu!</h3>
                        <p className="text-white/40 text-xs mt-1">Bakiye yükleme talebiniz admin onayına gönderildi. Onaylandığında bakiyenize otomatik olarak eklenecektir.</p>
                    </div>
                    <button onClick={() => setSubmitted(false)} className="text-white/20 hover:text-white ml-auto transition-colors text-xs">Kapat</button>
                </div>
            )}

            <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2">Yüklenecek Tutar</label>
                        <div className="relative group">
                            <span className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-white/20 font-black text-xl sm:text-2xl group-focus-within:text-primary transition-colors">₺</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="w-full h-16 sm:h-24 pl-10 sm:pl-16 bg-[#0a100e] border border-white/10 rounded-2xl sm:rounded-[2rem] text-2xl sm:text-4xl font-black text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 transition-all font-mono"
                            />
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {quickAmounts.map((amt) => (
                                <button
                                    key={amt}
                                    onClick={() => setAmount(amt)}
                                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-white/60 font-mono text-sm transition-all"
                                >
                                    +{amt}₺
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2">Ödeme Yöntemi</label>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <button
                                onClick={() => setMethod("card")}
                                className={cn(
                                    "p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] border transition-all flex flex-col items-center gap-3 sm:gap-4 text-center group relative overflow-hidden",
                                    method === "card"
                                        ? "bg-primary/10 border-primary text-primary shadow-[0_0_30px_rgba(74,188,241,0.2)]"
                                        : "bg-[#0a100e] border-white/10 text-white/40 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <CreditCard size={28} className="relative z-10 sm:w-8 sm:h-8" />
                                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest relative z-10">Kredi Kartı</span>
                                {method === "card" && <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-50" />}
                            </button>

                            <button
                                onClick={() => setMethod("transfer")}
                                className={cn(
                                    "p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] border transition-all flex flex-col items-center gap-3 sm:gap-4 text-center group relative overflow-hidden",
                                    method === "transfer"
                                        ? "bg-secondary/10 border-secondary text-secondary shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                                        : "bg-[#0a100e] border-white/10 text-white/40 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <Landmark size={28} className="relative z-10 sm:w-8 sm:h-8" />
                                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest relative z-10">Havale / EFT</span>
                                {method === "transfer" && <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-transparent opacity-50" />}
                            </button>
                        </div>
                    </div>

                    {/* IBAN Info for transfer */}
                    {method === "transfer" && settings.ibanInfo && (
                        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 space-y-4">
                            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Havale / EFT Bilgileri</h4>
                            <div className="space-y-2">
                                {settings.bankName && (
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                        <div>
                                            <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider mb-0.5">Banka Adı</p>
                                            <p className="text-sm text-white font-medium">{settings.bankName}</p>
                                        </div>
                                        <button onClick={() => copyToClipboard(settings.bankName!, "bank")} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5">
                                            {copiedId === "bank" ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-white/60" />}
                                        </button>
                                    </div>
                                )}
                                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="flex-1 min-w-0 pr-2">
                                        <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider mb-0.5">IBAN Numarası</p>
                                        <p className="text-sm font-mono text-primary font-bold truncate select-all">{settings.ibanInfo}</p>
                                    </div>
                                    <button onClick={() => copyToClipboard(settings.ibanInfo!, "iban")} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5 shrink-0">
                                        {copiedId === "iban" ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-white/60" />}
                                    </button>
                                </div>
                                {settings.ibanHolder && (
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                        <div>
                                            <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider mb-0.5">Alıcı Ad Soyad</p>
                                            <p className="text-sm font-medium text-white">{settings.ibanHolder}</p>
                                        </div>
                                        <button onClick={() => copyToClipboard(settings.ibanHolder!, "holder")} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5">
                                            {copiedId === "holder" ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-white/60" />}
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="pt-2 border-t border-white/[0.05] space-y-3">
                                <div>
                                    <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-2">Dekont Ekle <span className="text-white/30 text-[10px] normal-case tracking-normal">(Opsiyonel)</span></h4>
                                    <label className="flex items-center justify-center w-full h-16 px-4 transition border-2 border-white/[0.05] border-dashed rounded-xl appearance-none cursor-pointer hover:border-primary/50 hover:bg-white/[0.02] group overflow-hidden">
                                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 w-full justify-center">
                                            <Upload size={16} className="text-white/40 group-hover:text-primary transition-colors shrink-0" />
                                            <span className="text-[11px] sm:text-xs font-medium text-white/60 group-hover:text-white transition-colors truncate">
                                                {receipt ? receipt.name : "Dosya veya resim seçin (İsteğe bağlı)"}
                                            </span>
                                        </div>
                                        <input type="file" name="file_upload" className="hidden" accept="image/*,.pdf" onChange={(e) => setReceipt(e.target.files?.[0] || null)} />
                                    </label>
                                </div>
                                <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                                    <p className="text-xs text-white/80 font-medium pl-2 relative z-10">
                                        <span className="text-primary font-bold">İpucu:</span> Dekont yüklemek zorunlu değildir. Havale açıklamasına sadece KodFinans kayıtlı <span className="font-bold underline decoration-primary/50 text-white">telefon numaranızı</span> yazmanız onay için yeterlidir!
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="pt-2 sm:pt-6">
                        <Button
                            onClick={handlePayment}
                            disabled={isSubmitting || !amount}
                            className="w-full py-5 sm:py-8 rounded-2xl sm:rounded-[2.5rem] bg-gradient-to-r from-primary to-secondary text-white font-black text-xs sm:text-sm uppercase tracking-widest sm:tracking-[0.3em] shadow-[0_25px_60px_rgba(74,188,241,0.3)] hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-3 sm:gap-4 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed">
                            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            {isSubmitting ? <Loader2 size={18} className="animate-spin sm:w-5 sm:h-5" /> : null}
                            <span className="truncate">{isSubmitting ? "GÖNDERİLİYOR..." : "TALEP OLUŞTUR"}</span>
                            {!isSubmitting && <ArrowRight size={18} className="sm:w-5 sm:h-5 shrink-0" />}
                        </Button>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0a100e] border border-white/5 rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden">
                        <div className="flex items-start gap-4">
                            <ShieldCheck size={32} className="text-green-500 shrink-0" />
                            <div>
                                <h3 className="text-white font-black uppercase tracking-tight mb-2">Güvenli Ödeme</h3>
                                <p className="text-white/40 text-xs font-medium leading-relaxed">
                                    Tüm işlemleriniz 256-bit SSL güvenlik sertifikası ile korunmaktadır. Kart bilgileriniz asla sistemlerimizde saklanmaz.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <CheckCircle2 size={32} className="text-blue-500 shrink-0" />
                            <div>
                                <h3 className="text-white font-black uppercase tracking-tight mb-2">Admin Onaylı</h3>
                                <p className="text-white/40 text-xs font-medium leading-relaxed">
                                    Talebiniz oluşturulduktan sonra admin ekibimiz tarafından hızlıca kontrol edilir. Onay sonrası bakiyeniz anında yüklenir.
                                </p>
                            </div>
                        </div>

                        <div className="border-t border-white/5 pt-6 mt-6 flex items-center justify-center h-14 w-full mx-auto max-w-[280px]">
                            <img src="/images/payment-logos.png" className="h-full w-full object-contain" alt="Payment Methods" style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.2))' }} />
                        </div>
                    </div>

                    {/* User's Recent Requests */}
                    {userRequests.length > 0 && (
                        <div className="bg-[#0a100e] border border-white/5 rounded-[2.5rem] p-6 space-y-4">
                            <h3 className="text-white font-black uppercase tracking-tight text-sm">Son Talepleriniz</h3>
                            <div className="space-y-2">
                                {userRequests.map((req) => (
                                    <div key={req.id} className="flex items-center justify-between bg-white/[0.02] border border-white/[0.04] rounded-xl p-3">
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "w-2 h-2 rounded-full",
                                                req.status === "approved" ? "bg-green-500" : req.status === "rejected" ? "bg-red-500" : "bg-yellow-500 animate-pulse"
                                            )} />
                                            <div>
                                                <p className="text-white text-xs font-bold">₺{req.amount.toFixed(2)}</p>
                                                <p className="text-white/20 text-[10px]">{req.method === "card" ? "Kredi Kartı" : "Havale/EFT"}</p>
                                            </div>
                                        </div>
                                        <span className={cn(
                                            "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg",
                                            req.status === "approved" ? "bg-green-500/10 text-green-400" :
                                                req.status === "rejected" ? "bg-red-500/10 text-red-400" :
                                                    "bg-yellow-500/10 text-yellow-400"
                                        )}>
                                            {req.status === "approved" ? "Onaylandı" : req.status === "rejected" ? "Reddedildi" : "Beklemede"}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
