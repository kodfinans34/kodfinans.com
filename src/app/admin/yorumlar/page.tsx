"use client";

import React, { useState } from "react";
import { useSystem } from "@/context/SystemContext";
import {
    MessageSquare,
    Check,
    X,
    Trash2,
    Star,
    Search,
    Filter,
    Clock,
    User,
    Mail,
    AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function AdminReviewsPage() {
    const { reviews, updateReviewStatus, deleteReview, products } = useSystem();
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");

    const filteredReviews = reviews.filter(rev => {
        const matchesSearch =
            rev.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rev.comment.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === "all" || rev.status === filter;
        return matchesSearch && matchesFilter;
    });

    const getProductName = (id: number) => {
        return products.find(p => p.id === id)?.name || "Bilinmeyen Ürün";
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-poppins">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter flex items-center gap-4">
                        <MessageSquare className="text-primary" size={36} />
                        Yorum <span className="text-primary italic">YÖNETİMİ</span>
                    </h1>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-2">Müşteri yorumlarını denetleyin ve onaylayın.</p>
                </div>
            </div>

            {/* Stats Cards (Simplified for this page) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Bekleyen", value: reviews.filter(r => r.status === 'pending').length, color: "text-amber-500", bg: "bg-amber-500/10" },
                    { label: "Onaylı", value: reviews.filter(r => r.status === 'approved').length, color: "text-green-500", bg: "bg-green-500/10" },
                    { label: "Reddedilen", value: reviews.filter(r => r.status === 'rejected').length, color: "text-red-500", bg: "bg-red-500/10" },
                    { label: "Toplam", value: reviews.length, color: "text-primary", bg: "bg-primary/10" },
                ].map((stat, idx) => (
                    <div key={idx} className={cn("glass p-6 rounded-3xl border-white/5", stat.bg)}>
                        <h4 className="text-[10px] font-black uppercase text-white/30 tracking-widest mb-1">{stat.label}</h4>
                        <p className={cn("text-2xl font-black italic", stat.color)}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Filters & Search */}
            <div className="glass p-4 rounded-[2rem] border-white/5 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 group w-full">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Yorumlarda veya isimlerde ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-6 py-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-all font-medium"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    {["all", "pending", "approved", "rejected"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={cn(
                                "px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                                filter === f
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "bg-white/5 text-white/40 hover:bg-white/10"
                            )}
                        >
                            {f === 'all' ? 'TÜMÜ' : f === 'pending' ? 'BEKLEYEN' : f === 'approved' ? 'ONAYLI' : 'REDDEDİLEN'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Reviews List */}
            <div className="grid gap-6">
                {filteredReviews.length === 0 ? (
                    <div className="glass p-20 rounded-[3rem] border-white/5 border-dashed text-center space-y-4">
                        <AlertCircle size={48} className="text-white/10 mx-auto" />
                        <h3 className="text-xl font-bold text-white/20 uppercase tracking-widest italic">Yorum Bulunamadı</h3>
                    </div>
                ) : (
                    filteredReviews.map((rev) => (
                        <div key={rev.id} className="glass rounded-[2rem] border-white/5 overflow-hidden group">
                            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                                {/* Left Side: User Info */}
                                <div className="md:w-64 shrink-0 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                            <User size={24} />
                                        </div>
                                        <div className="overflow-hidden">
                                            <h4 className="text-white font-black text-sm uppercase tracking-tight truncate">{rev.userName}</h4>
                                            <div className="flex items-center gap-1.5 text-white/30 text-[10px] font-bold">
                                                <Mail size={10} /> {rev.userEmail}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest px-2">Ürün</p>
                                        <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5">
                                            <p className="text-xs font-black text-white italic truncate">{getProductName(rev.productId)}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-1 px-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={12}
                                                className={cn(i < rev.rating ? "text-yellow-500 fill-yellow-500" : "text-white/10")}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Right Side: Content & Actions */}
                                <div className="flex-1 flex flex-col justify-between gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-[10px] font-black text-white/30 uppercase tracking-widest bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/5">
                                                <Clock size={12} /> {new Date(rev.timestamp).toLocaleString("tr-TR")}
                                            </div>
                                            <div className={cn(
                                                "text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border",
                                                rev.status === 'pending' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                                                    rev.status === 'approved' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                                        "bg-red-500/10 text-red-500 border-red-500/20"
                                            )}>
                                                {rev.status === 'pending' ? 'Bekliyor' : rev.status === 'approved' ? 'Yayında' : 'Reddedildi'}
                                            </div>
                                        </div>
                                        <div className="glass bg-white/[0.02] p-5 rounded-2xl border-white/5 relative">
                                            <MessageSquare className="absolute -top-3 -left-3 text-white/5" size={40} />
                                            <p className="text-white/70 text-sm leading-relaxed font-medium relative z-10 italic">
                                                "{rev.comment}"
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                                        <Button
                                            onClick={() => deleteReview(rev.id)}
                                            className="bg-transparent hover:bg-red-500/10 text-white/20 hover:text-red-500 p-4 rounded-xl transition-all"
                                            title="Sil"
                                        >
                                            <Trash2 size={18} />
                                        </Button>

                                        {rev.status !== "rejected" && (
                                            <Button
                                                onClick={() => updateReviewStatus(rev.id, "rejected")}
                                                className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                            >
                                                <X size={16} className="mr-2" /> Reddet
                                            </Button>
                                        )}

                                        {rev.status !== "approved" && (
                                            <Button
                                                onClick={() => updateReviewStatus(rev.id, "approved")}
                                                className="bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white border border-green-500/20 px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                            >
                                                <Check size={16} className="mr-2" /> Onayla
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
