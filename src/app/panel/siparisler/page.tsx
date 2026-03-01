"use client";

import React, { useState } from "react";
import { useSystem } from "@/context/SystemContext";
import { Check, Clock, X, AlertCircle, ShoppingBag, Copy } from "lucide-react";

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
                <div className="flex gap-2 bg-white/5 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
                    {(["all", "pending", "completed", "cancelled"] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${filter === f ? "bg-primary text-white" : "text-white/40 hover:text-white"
                                }`}
                        >
                            {f === "all" ? "Tümü" :
                                f === "pending" ? "Bekleyen" :
                                    f === "completed" ? "Tamamlanan" : "İptal Edilen"}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-4">
                {filteredOrders.length === 0 ? (
                    <div className="text-center py-20 bg-[#0a100e] border border-white/5 rounded-2xl">
                        <ShoppingBag className="w-12 h-12 text-white/20 mx-auto mb-4" />
                        <p className="text-white/40 font-bold">Herhangi bir sipariş bulunamadı.</p>
                    </div>
                ) : (
                    filteredOrders.map((order) => (
                        <div id={`item-${order.id}`} key={order.id} className="bg-[#0a100e] border border-white/10 p-6 rounded-2xl md:flex md:items-center justify-between group hover:border-white/20 transition-all gap-4 scroll-mt-24">
                            <div className="flex flex-col md:flex-row md:items-center gap-6 flex-1">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shrink-0
                                    ${order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                        order.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                                            'bg-red-500/10 text-red-500'}`}>
                                    {order.status === 'pending' && <Clock />}
                                    {order.status === 'completed' && <Check />}
                                    {order.status === 'cancelled' && <X />}
                                </div>
                                <div className="space-y-2 flex-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-bold text-white uppercase tracking-tight">Sipariş #{order.id}</h3>
                                        <span className={`text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-wider ${order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                            order.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                                                'bg-red-500/10 text-red-500'
                                            }`}>
                                            {order.status === 'pending' ? 'Bekliyor' :
                                                order.status === 'completed' ? 'Tamamlandı' : 'İptal'}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="bg-white/5 px-2 py-1 rounded text-[10px] text-white/60">
                                                {item.productName} ({item.quantity}x)
                                            </div>
                                        ))}
                                    </div>
                                    {order.status === 'completed' && order.digitalCode && (
                                        <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-xl relative group pr-24">
                                            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Teslim Edilen Kod</p>
                                            <p className="text-sm font-mono text-white select-all break-all">{order.digitalCode}</p>
                                            <button
                                                onClick={() => copyToClipboard(order.digitalCode!, order.id)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 sm:px-3 sm:py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-1.5 border border-white/5"
                                            >
                                                {copiedCodeId === order.id ? (
                                                    <><Check size={14} className="text-green-500" /> <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest hidden sm:inline">Kopyalandı</span></>
                                                ) : (
                                                    <><Copy size={14} className="text-white/60" /> <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest hidden sm:inline">Kopyala</span></>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 border-white/5 pt-4 md:pt-0 mt-4 md:mt-0">
                                <div className="text-right">
                                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Ödeme Yöntemi</p>
                                    <p className="font-bold text-white text-xs uppercase tracking-wider">
                                        {order.paymentMethod === 'balance' ? 'Cüzdan Bakiyesi' :
                                            order.paymentMethod === 'credit_card' ? 'Kredi Kartı' : 'Havale/EFT'}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1">Toplam Tutar</p>
                                    <p className="font-mono text-2xl font-bold text-white">₺{order.totalAmount.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
