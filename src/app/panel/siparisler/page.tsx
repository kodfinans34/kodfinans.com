"use client";

import React, { useState } from "react";
import { useSystem } from "@/context/SystemContext";
import { Check, Clock, X, AlertCircle, ShoppingBag, Copy, CheckCircle2 } from "lucide-react";

export default function MyOrdersPage() {
    const { orders, user } = useSystem();
    const [filter, setFilter] = useState<"all" | "pending" | "completed" | "cancelled">("all");
    const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedCodeId(id);
        setTimeout(() => setCopiedCodeId(null), 2000);
    };

    // Filter orders for the current user mock
    const userOrders = (orders || []).filter(o => o.customerInfo.email === user?.email);

    const filteredOrders = userOrders.filter(o => filter === "all" ? true : o.status === filter);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-3xl font-black text-white uppercase tracking-tight">Siparişlerim</h1>
                <div className="flex gap-2 bg-white/5 p-1 rounded-xl w-full md:w-auto overflow-x-auto no-scrollbar">
                    {(["all", "pending", "completed", "cancelled"] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2.5 md:py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${filter === f ? "bg-primary text-white" : "text-white/40 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {f === "all" ? "Tümü" :
                                f === "pending" ? "Bekleyen" :
                                    f === "completed" ? "Tamamlanan" : "İptal Edilen"}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-6">
                {filteredOrders.length === 0 ? (
                    <div className="text-center py-24 bg-[#0a100e] border border-white/5 rounded-3xl flex flex-col items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                            <ShoppingBag className="w-10 h-10 text-white/20" />
                        </div>
                        <p className="text-white/60 font-bold text-lg mb-2">Herhangi bir sipariş bulunamadı.</p>
                        <p className="text-white/30 text-xs">Bu filtreye uygun siparişiniz yok veya henüz alışveriş yapmadınız.</p>
                    </div>
                ) : (
                    filteredOrders.map((order) => (
                        <div id={`item-${order.id}`} key={order.id} className="bg-card/20 border border-white/5 rounded-2xl p-5 md:p-6 group hover:border-primary/20 transition-all flex flex-col gap-5 scroll-mt-24 shadow-lg shadow-black/20">
                            {/* Header: Status and Totals */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-5">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                                            order.status === 'completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                                                'bg-red-500/10 text-red-500 border border-red-500/20'
                                        }`}>
                                        {order.status === 'pending' && <Clock size={24} />}
                                        {order.status === 'completed' && <Check size={24} />}
                                        {order.status === 'cancelled' && <X size={24} />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                                            <h3 className="font-black text-white text-lg md:text-xl uppercase tracking-tight">Sipariş #{order.id}</h3>
                                            <span className={`text-[9px] px-2 py-0.5 rounded-md font-black uppercase tracking-widest ${order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                                                    order.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                                                        'bg-red-500/20 text-red-500'
                                                }`}>
                                                {order.status === 'pending' ? 'Bekliyor' :
                                                    order.status === 'completed' ? 'Tamamlandı' : 'İptal Edildi'}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-white/40 font-medium font-mono">
                                            {order.timestamp instanceof Date ? order.timestamp.toLocaleString('tr-TR', { dateStyle: 'medium', timeStyle: 'short' }) : 'Tarih Bilinmiyor'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between md:justify-end gap-6 md:gap-8 bg-white/5 md:bg-transparent p-4 md:p-0 rounded-xl">
                                    <div className="text-left md:text-right">
                                        <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest mb-1">Ödeme Yöntemi</p>
                                        <div className="flex items-center gap-1.5 md:justify-end">
                                            <div className="w-1.5 h-1.5 rounded-full bg-white/40 hidden md:block"></div>
                                            <p className="font-bold text-white/80 text-xs md:text-sm uppercase tracking-wider">
                                                {order.paymentMethod === 'balance' ? 'Cüzdan Bakiyesi' :
                                                    order.paymentMethod === 'credit_card' ? 'Kredi Kartı' : 'Havale / EFT'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-[1px] h-8 bg-white/10 hidden md:block"></div>
                                    <div className="text-right">
                                        <p className="text-[9px] text-primary font-bold uppercase tracking-widest mb-1">Toplam Alışveriş</p>
                                        <p className="font-mono text-xl md:text-2xl font-black text-white leading-none">₺{order.totalAmount.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Body: Items and Code */}
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                <div className="flex-1">
                                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                        <ShoppingBag size={12} /> Sipariş İçeriği
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="bg-black/40 border border-white/5 px-4 py-2.5 rounded-xl flex items-center gap-3 w-full sm:w-auto hover:bg-white/5 transition-colors">
                                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                                    <span className="text-xs font-black text-white/60">{item.quantity}x</span>
                                                </div>
                                                <div>
                                                    <p className="text-[13px] font-bold text-white/90">{item.productName}</p>
                                                    {item.variant && <p className="text-[10px] text-white/40 mt-0.5">{item.variant}</p>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Digital Code Section */}
                                {order.status === 'completed' && order.digitalCode && (
                                    <div className="md:w-80 w-full shrink-0">
                                        <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5 md:justify-end">
                                            <CheckCircle2 size={12} /> Teslim Edilen Kod
                                        </p>
                                        <div className="bg-green-500/10 border border-green-500/20 p-2 pl-4 rounded-xl relative group flex items-center justify-between">
                                            <p className="text-sm font-mono text-white select-all break-all pr-2 truncate" title={order.digitalCode}>{order.digitalCode}</p>
                                            <button
                                                onClick={() => copyToClipboard(order.digitalCode!, order.id)}
                                                className={`shrink-0 h-10 px-4 rounded-lg transition-colors flex items-center justify-center font-bold text-xs uppercase tracking-wider ${copiedCodeId === order.id
                                                        ? "bg-green-500 text-white"
                                                        : "bg-black/40 text-white/60 hover:text-white hover:bg-black/60"
                                                    }`}
                                            >
                                                {copiedCodeId === order.id ? (
                                                    <><Check size={14} className="mr-1.5" /> Kopyalandı</>
                                                ) : (
                                                    <><Copy size={14} className="mr-1.5" /> Kopyala</>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
