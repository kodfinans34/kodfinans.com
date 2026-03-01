"use client";

import React, { useState } from "react";
import { useSystem } from "@/context/SystemContext";
import { Check, X, Clock, Search, Wallet, Building2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminWithdrawalsPage() {
    const { withdrawalRequests, updateWithdrawalStatus, userBalance, sendEmail, settings } = useSystem();
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

    const filteredRequests = (withdrawalRequests || [])
        .filter(req => filter === "all" ? true : req.status === filter)
        .filter(req =>
            req.accountHolder.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (req.userEmail && req.userEmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
            req.iban.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-3xl font-black text-white uppercase tracking-tight">Çekim Talepleri</h1>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        <input
                            type="text"
                            placeholder="Talep Ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-[#0a100e] border border-white/10 rounded-xl pl-12 pr-4 py-2.5 text-sm text-white focus:border-primary/50 outline-none w-full sm:w-64"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 bg-[#0a100e] p-1.5 rounded-xl w-full sm:w-fit border border-white/5 overflow-x-auto hide-scrollbar">
                {(["all", "pending", "approved", "rejected"] as const).map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${filter === f ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-white/40 hover:text-white"
                            }`}
                    >
                        {f === "all" ? "Tümü" :
                            f === "pending" ? "Bekleyen" :
                                f === "approved" ? "Onaylanan" : "Reddedilen"}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {filteredRequests.length === 0 ? (
                    <div className="text-center py-20 bg-[#0a100e] border border-white/5 rounded-2xl border-dashed">
                        <Wallet className="w-12 h-12 text-white/20 mx-auto mb-4" />
                        <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Çekim Talebi Bulunamadı</p>
                    </div>
                ) : (
                    filteredRequests.map((req) => (
                        <div key={req.id} className="bg-[#0a100e] border border-white/5 p-6 rounded-2xl group hover:border-white/10 transition-all">
                            <div className="flex flex-col lg:flex-row gap-8">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shrink-0
                                            ${req.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                                req.status === 'approved' ? 'bg-green-500/10 text-green-500' :
                                                    'bg-red-500/10 text-red-500'}`}>
                                            {req.status === 'pending' && <Clock size={20} />}
                                            {req.status === 'approved' && <Check size={20} />}
                                            {req.status === 'rejected' && <X size={20} />}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-white text-lg">{req.accountHolder}</h3>
                                                <span className="bg-white/5 px-2 py-0.5 rounded text-[10px] text-white/40 font-mono uppercase tracking-widest">
                                                    {new Date(req.timestamp).toLocaleString()}
                                                </span>
                                            </div>
                                            <p className="text-xs text-white/40 font-medium">{req.userEmail || "Bilinmeyen Kullanıcı"}</p>
                                        </div>
                                    </div>

                                    <div className="bg-white/[0.02] rounded-xl p-4 space-y-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-white/40 font-bold uppercase tracking-wider text-[10px]">Banka</span>
                                            <div className="flex items-center gap-2 text-white font-medium">
                                                <Building2 size={14} className="text-white/40" />
                                                {req.bankName}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-white/40 font-bold uppercase tracking-wider text-[10px]">IBAN</span>
                                            <span className="text-white font-mono tracking-wide">{req.iban}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 w-full lg:w-auto lg:min-w-[200px]">
                                    <div className="text-left sm:text-right w-full sm:w-auto">
                                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Çekilecek Tutar</p>
                                        <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">₺{req.amount.toFixed(2)}</p>
                                    </div>

                                    {req.status === 'pending' && (
                                        <div className="flex gap-2 w-full">
                                            <Button
                                                onClick={() => {
                                                    updateWithdrawalStatus(req.id, "rejected");
                                                    if (req.userEmail) {
                                                        sendEmail({
                                                            to: req.userEmail,
                                                            subject: "Çekim Talebiniz Reddedildi - KodFinans",
                                                            text: `Sayın müşterimiz, ${req.id} numaralı çekim talebiniz maalesef onaylanmamıştır. Tutar cüzdanınıza iade edilmiştir.`
                                                        });
                                                    }
                                                }}
                                                className="flex-1 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                            >
                                                Reddet
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    updateWithdrawalStatus(req.id, "approved");
                                                    if (req.userEmail) {
                                                        sendEmail({
                                                            to: req.userEmail,
                                                            subject: "Ödemeniz Yapıldı! ✅ - KodFinans",
                                                            html: `
                                                                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                                                                    <h2 style="color: #ed1c24;">Ödemeniz Tamamlandı</h2>
                                                                    <p>Bakiye çekim talebiniz onaylanmış ve ödemeniz banka hesabınıza gönderilmiştir.</p>
                                                                    <div style="background: #f9f9f9; padding: 15px; border-radius: 10px; margin: 20px 0;">
                                                                        <p style="margin: 5px 0;">💰 Tutar: <b>₺${req.amount.toFixed(2)}</b></p>
                                                                        <p style="margin: 5px 0;">🏦 Banka: <b>${req.bankName}</b></p>
                                                                        <p style="margin: 5px 0;">💳 IBAN: <b>${req.iban}</b></p>
                                                                    </div>
                                                                    <p>Ödemenin hesabınıza geçmesi bankanıza bağlı olarak 5-30 dakika sürebilir.</p>
                                                                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                                                                    <p style="font-size: 12px; color: #999;">Bu mesaj otomatik olarak gönderilmiştir.</p>
                                                                </div>
                                                            `
                                                        });
                                                    }
                                                }}
                                                className="flex-1 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white border border-green-500/20 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                            >
                                                Onayla
                                            </Button>
                                        </div>
                                    )}
                                    {req.status !== 'pending' && (
                                        <div className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border ${req.status === 'approved'
                                            ? 'bg-green-500/5 border-green-500/20 text-green-500'
                                            : 'bg-red-500/5 border-red-500/20 text-red-500'
                                            }`}>
                                            {req.status === 'approved' ? 'Onaylandı & Ödendi' : 'Reddedildi & İade Edildi'}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
