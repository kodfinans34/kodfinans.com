"use client";

import React, { useState } from "react";
import { useSystem } from "@/context/SystemContext";
import { Check, X, Clock, AlertCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminBozumlarPage() {
    const { bozumRequests, updateBozumStatus, sendEmail, settings, deleteBozumRequest } = useSystem();
    const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

    const filteredRequests = (bozumRequests || []).filter(req => filter === "all" ? true : req.status === filter);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-black text-white uppercase tracking-tight text-red-500">Bozum Talepleri</h1>
                <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
                    {(["all", "pending", "approved", "rejected"] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${filter === f ? "bg-red-600 text-white" : "text-white/40 hover:text-white"
                                }`}
                        >
                            {f === "all" ? "Tümü" :
                                f === "pending" ? "Bekleyen" :
                                    f === "approved" ? "Onaylanan" : "Reddedilen"}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-4">
                {filteredRequests.length === 0 ? (
                    <div className="text-center py-20 bg-[#08080a] border border-white/5 rounded-2xl">
                        <AlertCircle className="w-12 h-12 text-white/20 mx-auto mb-4" />
                        <p className="text-white/40 font-bold">Talep bulunamadı.</p>
                    </div>
                ) : (
                    filteredRequests.map((req) => (
                        <div key={req.id} className="bg-[#08080a] border border-white/10 p-6 rounded-2xl flex items-center justify-between group hover:border-white/20 transition-all">
                            <div className="flex items-center gap-6">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold
                                    ${req.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                        req.status === 'approved' ? 'bg-green-500/10 text-green-500' :
                                            'bg-red-500/10 text-red-500'}`}>
                                    {req.status === 'pending' && <Clock />}
                                    {req.status === 'approved' && <Check />}
                                    {req.status === 'rejected' && <X />}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-bold text-white">{req.codeType}</h3>
                                        <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/60 font-mono">{req.id}</span>
                                    </div>
                                    <div className="text-xs text-white/40 font-mono flex flex-col gap-0.5">
                                        <span>User: {req.userEmail}</span>
                                        {req.userPhone && <span>Phone: {req.userPhone}</span>}
                                        {req.digitalCode && (
                                            <span className="text-primary font-bold mt-1">Kod: <span className="bg-primary/10 px-2 py-0.5 rounded tracking-widest">{req.digitalCode}</span></span>
                                        )}
                                        <span className="mt-1">Date: {new Date(req.timestamp).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="text-right">
                                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Kod Tutarı</p>
                                    <p className="font-mono text-white">₺{req.codeAmount.toFixed(2)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1">Ödenecek</p>
                                    <p className="font-mono text-2xl font-bold text-white">₺{req.calculatedAmount.toFixed(2)}</p>
                                </div>

                                {req.status === "pending" && (
                                    <div className="flex items-center gap-2 pl-6 border-l border-white/10">
                                        <Button
                                            onClick={() => {
                                                updateBozumStatus(req.id, "approved");
                                                if (req.userEmail) {
                                                    sendEmail({
                                                        to: req.userEmail,
                                                        subject: "Bozum Talebiniz Onaylandı! - KodFinans",
                                                        html: `
                                                            <div style="font-family: sans-serif; padding: 20px; color: #333;">
                                                                <h2 style="color: #ed1c24;">Bozum İşlemi Tamamlandı</h2>
                                                                <p>Tebrikler! Bozum talebiniz onaylanmış ve tutar cüzdanınıza yansıtılmıştır.</p>
                                                                <div style="background: #f9f9f9; padding: 15px; border-radius: 10px; margin: 20px 0;">
                                                                    <p style="margin: 5px 0;">📦 Ürün: <b>${req.codeType}</b></p>
                                                                    <p style="margin: 5px 0;">💹 Cüzdanınıza Eklenen: <b>₺${req.calculatedAmount.toFixed(2)}</b></p>
                                                                </div>
                                                                <p>İşlemlerinize devam etmek için <a href="https://kodfinans.com/panel" style="color: #ed1c24; font-weight: bold;">panelinizi</a> ziyaret edebilirsiniz.</p>
                                                                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                                                                <p style="font-size: 12px; color: #999;">Bu mesaj otomatik olarak gönderilmiştir.</p>
                                                            </div>
                                                        `
                                                    });
                                                }
                                            }}
                                            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl"
                                            title="Onayla"
                                        >
                                            <Check size={18} />
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                updateBozumStatus(req.id, "rejected");
                                                if (req.userEmail) {
                                                    sendEmail({
                                                        to: req.userEmail,
                                                        subject: "Bozum Talebiniz Reddedildi - KodFinans",
                                                        text: `Sayın müşterimiz, ${req.id} numaralı bozum talebiniz maalesef onaylanmamıştır. Detaylı bilgi için destek ekibimize ulaşabilirsiniz.`
                                                    });
                                                }
                                            }}
                                            className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl"
                                            title="Reddet"
                                        >
                                            <X size={18} />
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                if (confirm("Bu bozum talebini silmek istediğinize emin misiniz?")) {
                                                    deleteBozumRequest(req.id);
                                                }
                                            }}
                                            className="bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-500 p-3 rounded-xl transition-all"
                                            title="Sil"
                                        >
                                            <Trash2 size={18} />
                                        </Button>
                                    </div>
                                )}
                                {req.status !== "pending" && (
                                    <Button
                                        onClick={() => {
                                            if (confirm("Bu bozum talebini silmek istediğinize emin misiniz?")) {
                                                deleteBozumRequest(req.id);
                                            }
                                        }}
                                        className="bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-500 p-3 rounded-xl transition-all ml-4"
                                        title="Sil"
                                    >
                                        <Trash2 size={18} />
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
