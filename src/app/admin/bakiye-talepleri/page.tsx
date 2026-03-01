"use client";

import React, { useState } from "react";
import { useSystem } from "@/context/SystemContext";
import { Button } from "@/components/ui/Button";
import {
    Search,
    CheckCircle,
    XCircle,
    Trash2,
    Clock,
    Wallet,
    Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminBalanceRequestsPage() {
    const { balanceRequests, updateBalanceRequestStatus, deleteBalanceRequest } = useSystem();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");

    const filtered = balanceRequests
        .filter(r => {
            if (filterStatus !== "all" && r.status !== filterStatus) return false;
            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                return (
                    r.userEmail.toLowerCase().includes(term) ||
                    r.userName.toLowerCase().includes(term) ||
                    r.amount.toString().includes(term)
                );
            }
            return true;
        });

    const pendingCount = balanceRequests.filter(r => r.status === "pending").length;
    const totalPending = balanceRequests.filter(r => r.status === "pending").reduce((sum, r) => sum + r.amount, 0);
    const totalApproved = balanceRequests.filter(r => r.status === "approved").reduce((sum, r) => sum + r.amount, 0);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tight">Bakiye Talepleri</h1>
                    <p className="text-white/30 text-xs font-bold uppercase tracking-wider mt-1">Kullanıcı bakiye yükleme taleplerini yönetin</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                        <Clock size={24} className="text-yellow-400" />
                    </div>
                    <div>
                        <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Bekleyen</p>
                        <p className="text-2xl font-black text-yellow-400">{pendingCount}</p>
                    </div>
                </div>
                <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                        <Wallet size={24} className="text-yellow-400" />
                    </div>
                    <div>
                        <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Bekleyen Tutar</p>
                        <p className="text-2xl font-black text-yellow-400 font-mono">₺{totalPending.toFixed(2)}</p>
                    </div>
                </div>
                <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                        <CheckCircle size={24} className="text-green-400" />
                    </div>
                    <div>
                        <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Onaylanan Toplam</p>
                        <p className="text-2xl font-black text-green-400 font-mono">₺{totalApproved.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input
                        type="text"
                        placeholder="İsim, e-posta veya tutar ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#0a100e] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white text-sm focus:outline-none focus:border-primary/50 transition-all min-w-0"
                    />
                </div>
                <div className="flex flex-wrap gap-2 overflow-x-auto hide-scrollbar sm:w-fit">
                    {(["all", "pending", "approved", "rejected"] as const).map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={cn(
                                "px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border",
                                filterStatus === status
                                    ? "bg-primary/10 border-primary/30 text-primary"
                                    : "bg-white/5 border-white/5 text-white/40 hover:text-white"
                            )}
                        >
                            {status === "all" ? "Tümü" : status === "pending" ? "Bekleyen" : status === "approved" ? "Onaylı" : "Reddedilen"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Requests Table */}
            <div className="bg-[#0a100e] border border-white/10 rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="hidden md:grid grid-cols-6 gap-4 px-6 py-4 border-b border-white/5 text-[10px] font-bold uppercase tracking-widest text-white/30">
                    <span>Kullanıcı</span>
                    <span>E-posta</span>
                    <span>Tutar</span>
                    <span>Yöntem</span>
                    <span>Durum</span>
                    <span className="text-right">İşlemler</span>
                </div>

                {/* Rows */}
                {filtered.length === 0 ? (
                    <div className="p-12 text-center text-white/20 text-sm">
                        Bakiye talebi bulunamadı.
                    </div>
                ) : (
                    filtered.map((request) => (
                        <div key={request.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 px-6 py-5 border-b border-white/5 items-center hover:bg-white/[0.02] transition-colors">
                            <div>
                                <p className="text-white font-bold text-sm">{request.userName}</p>
                                <p className="text-white/20 text-[10px] md:hidden">{request.userEmail}</p>
                            </div>
                            <p className="hidden md:block text-white/60 text-xs truncate">{request.userEmail}</p>
                            <p className="text-white font-black text-lg font-mono">₺{request.amount.toFixed(2)}</p>
                            <span className="text-white/40 text-xs font-bold uppercase">
                                {request.method === "card" ? "Kredi Kartı" : "Havale/EFT"}
                            </span>
                            <span className={cn(
                                "inline-flex items-center gap-1.5 w-fit px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                                request.status === "approved" ? "bg-green-500/10 text-green-400" :
                                    request.status === "rejected" ? "bg-red-500/10 text-red-400" :
                                        "bg-yellow-500/10 text-yellow-400"
                            )}>
                                {request.status === "approved" ? <CheckCircle size={12} /> :
                                    request.status === "rejected" ? <XCircle size={12} /> :
                                        <Clock size={12} className="animate-pulse" />}
                                {request.status === "approved" ? "Onaylandı" : request.status === "rejected" ? "Reddedildi" : "Beklemede"}
                            </span>
                            <div className="flex items-center gap-2 justify-end">
                                {request.status === "pending" && (
                                    <>
                                        <button
                                            onClick={() => updateBalanceRequestStatus(request.id, "approved")}
                                            className="p-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg transition-colors"
                                            title="Onayla"
                                        >
                                            <CheckCircle size={16} />
                                        </button>
                                        <button
                                            onClick={() => updateBalanceRequestStatus(request.id, "rejected")}
                                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                                            title="Reddet"
                                        >
                                            <XCircle size={16} />
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={() => {
                                        if (confirm("Bu talebi silmek istediğinize emin misiniz?")) {
                                            deleteBalanceRequest(request.id);
                                        }
                                    }}
                                    className="p-2 bg-white/5 hover:bg-red-500/10 text-white/30 hover:text-red-400 rounded-lg transition-colors"
                                    title="Sil"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
