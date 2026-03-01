"use client";

import React, { useState } from "react";
import { useSystem } from "@/context/SystemContext";
import { Check, Clock, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function MyBozumRequestsPage() {
    const { bozumRequests, user } = useSystem();
    const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

    // Filter requests for the current user mock
    const userRequests = (bozumRequests || []).filter(req => req.userEmail === user?.email);

    const filteredRequests = userRequests.filter(req => filter === "all" ? true : req.status === filter);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-3xl font-black text-white uppercase tracking-tight">Bozum İşlemlerim</h1>
                <div className="flex gap-2 bg-white/5 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
                    {(["all", "pending", "approved", "rejected"] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${filter === f ? "bg-primary text-white" : "text-white/40 hover:text-white"
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
                    <div className="text-center py-20 bg-[#0a100e] border border-white/5 rounded-2xl">
                        <AlertCircle className="w-12 h-12 text-white/20 mx-auto mb-4" />
                        <p className="text-white/40 font-bold">Herhangi bir işlem bulunamadı.</p>
                    </div>
                ) : (
                    filteredRequests.map((req) => (
                        <div id={`item-${req.id}`} key={req.id} className="bg-[#0a100e] border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between group hover:border-white/20 transition-all gap-4 scroll-mt-24">
                            <div className="flex items-center gap-6">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shrink-0
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
                                        <span>{new Date(req.timestamp).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                                <div className="text-right">
                                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Kod Tutarı</p>
                                    <p className="font-mono text-white">₺{req.codeAmount.toFixed(2)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1">Hesabına Geçecek</p>
                                    <p className="font-mono text-2xl font-bold text-white">₺{req.calculatedAmount.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
