"use client";

import React, { useState } from "react";
import { useSystem } from "@/context/SystemContext";
import { Check, X, Clock, Search, ShoppingBag, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminOrdersPage() {
    const { orders, updateOrderStatus, sendEmail, deleteOrder } = useSystem();
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState<"all" | "pending" | "completed" | "cancelled">("all");

    const filteredOrders = (orders || [])
        .filter(order => filter === "all" ? true : order.status === filter)
        .filter(order =>
            order.customerInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerInfo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const [orderCodes, setOrderCodes] = useState<{ [key: string]: string }>({});

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-3xl font-black text-white uppercase tracking-tight">Sipariş Yönetimi</h1>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        <input
                            type="text"
                            placeholder="Sipariş Ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-[#0a100e] border border-white/10 rounded-xl pl-12 pr-4 py-2.5 text-sm text-white focus:border-primary/50 outline-none w-64"
                        />
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 bg-[#0a100e] p-1.5 rounded-xl w-full sm:w-fit border border-white/5 overflow-x-auto hide-scrollbar">
                    {(["all", "pending", "completed", "cancelled"] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${filter === f ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-white/40 hover:text-white"
                                }`}
                        >
                            {f === "all" ? "Tümü" :
                                f === "pending" ? "Bekleyen" :
                                    f === "completed" ? "Tamamlanan" : "İptal"}
                        </button>
                    ))}
                </div>

                <div className="space-y-4">
                    {filteredOrders.length === 0 ? (
                        <div className="text-center py-20 bg-[#0a100e] border border-white/5 rounded-2xl border-dashed">
                            <ShoppingBag className="w-12 h-12 text-white/20 mx-auto mb-4" />
                            <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Sipariş Bulunamadı</p>
                        </div>
                    ) : (
                        filteredOrders.map((order) => (
                            <div key={order.id} className="bg-[#0a100e] border border-white/5 p-6 rounded-2xl group hover:border-white/10 transition-all">
                                <div className="flex flex-col lg:flex-row gap-8">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shrink-0
                                            ${order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                                    order.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                                                        'bg-red-500/10 text-red-500'}`}>
                                                {order.status === 'pending' && <Clock size={20} />}
                                                {order.status === 'completed' && <Check size={20} />}
                                                {order.status === 'cancelled' && <X size={20} />}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-bold text-white text-lg">#{order.id}</h3>
                                                    <span className="bg-white/5 px-2 py-0.5 rounded text-[10px] text-white/40 font-mono uppercase tracking-widest">
                                                        {new Date(order.timestamp).toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-white/40 font-medium">
                                                    <span className="text-white/60">{order.customerInfo.name}</span>
                                                    <span>•</span>
                                                    <span>{order.customerInfo.email}</span>
                                                    <span>•</span>
                                                    <span>{order.customerInfo.phone}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white/[0.02] rounded-xl p-4 space-y-2">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex justify-between items-center text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-white/40 font-mono text-xs">x{item.quantity}</span>
                                                        <span className="text-white font-medium">{item.productName}</span>
                                                    </div>
                                                    <span className="text-white/60 font-mono">₺{item.price}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Digital Code Input (Only if pending or has code) */}
                                        <div className="pt-2">
                                            {order.status === 'pending' ? (
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-1">Teslim Edilecek Kod</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Dijital kodu buraya giriniz..."
                                                        value={orderCodes[order.id] || ""}
                                                        onChange={(e) => setOrderCodes({ ...orderCodes, [order.id]: e.target.value })}
                                                        className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-green-500/50 outline-none transition-all"
                                                    />
                                                </div>
                                            ) : order.digitalCode && (
                                                <div className="p-4 bg-green-500/5 border border-green-500/10 rounded-xl">
                                                    <p className="text-[10px] font-black text-green-500/50 uppercase tracking-widest mb-1">Teslim Edilen Kod</p>
                                                    <p className="text-sm font-mono text-white select-all">{order.digitalCode}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 w-full lg:w-auto lg:min-w-[200px]">
                                        <div className="text-left lg:text-right w-full lg:w-auto">
                                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Toplam Tutar</p>
                                            <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">₺{order.totalAmount.toFixed(2)}</p>
                                            <p className="text-[10px] sm:text-xs text-red-500 font-bold mt-1 uppercase tracking-wider">
                                                {order.paymentMethod === 'balance' ? 'Cüzdan Bakiyesi' :
                                                    order.paymentMethod === 'credit_card' ? 'Kredi Kartı' : 'Havale/EFT'}
                                            </p>
                                        </div>

                                        {order.status === 'pending' && (
                                            <div className="flex gap-2 w-full">
                                                <Button
                                                    onClick={() => updateOrderStatus(order.id, "cancelled")}
                                                    className="flex-1 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                                >
                                                    İptal Et
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        const code = orderCodes[order.id];
                                                        if (!code) {
                                                            alert("Lütfen teslim edilecek kodu giriniz!");
                                                            return;
                                                        }
                                                        updateOrderStatus(order.id, "completed", code);

                                                        // Send Code to Customer
                                                        sendEmail({
                                                            to: order.customerInfo.email,
                                                            subject: "Kodunuz Teslim Edildi! - KodFinans",
                                                            html: `
                                                            <div style="font-family: sans-serif; padding: 20px; color: #333;">
                                                                <h2 style="color: #ed1c24;">Siparişiniz Tamamlandı!</h2>
                                                                <p>Sayın <b>${order.customerInfo.name}</b>, sipariş ettiğiniz ürünlerin kodları aşağıdadır:</p>
                                                                
                                                                <div style="background: #f9f9f9; padding: 20px; border: 2px dashed #ed1c24; border-radius: 15px; margin: 20px 0; text-align: center;">
                                                                    <p style="text-transform: uppercase; font-size: 10px; color: #999; margin-bottom: 5px;">Dijital Kodunuz</p>
                                                                    <p style="font-family: monospace; font-size: 24px; font-weight: bold; color: #333; letter-spacing: 2px;">${code}</p>
                                                                </div>

                                                                <p>Sipariş detayları:</p>
                                                                <ul>
                                                                    ${order.items.map(item => `<li>${item.productName} (${item.variant})</li>`).join('')}
                                                                </ul>

                                                                <p>Bizi tercih ettiğiniz için teşekkür ederiz!</p>
                                                                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                                                                <p style="font-size: 12px; color: #999;">Bu mesaj otomatik olarak gönderilmiştir. Sorularınız için destek ekibimizle iletişime geçebilirsiniz.</p>
                                                            </div>
                                                        `
                                                        });
                                                    }}
                                                    className="flex-1 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white border border-green-500/20 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                                >
                                                    Onayla & Gönder
                                                </Button>
                                            </div>
                                        )}
                                        {order.status !== 'pending' && (
                                            <div className="flex gap-2 mt-4 lg:mt-0">
                                                <div className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border ${order.status === 'completed'
                                                    ? 'bg-green-500/5 border-green-500/20 text-green-500'
                                                    : 'bg-red-500/5 border-red-500/20 text-red-500'
                                                    }`}>
                                                    {order.status === 'completed' ? 'Tamamlandı' : 'İptal Edildi'}
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        if (confirm("Bu siparişi silmek istediğinize emin misiniz?")) {
                                                            deleteOrder(order.id);
                                                        }
                                                    }}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all ml-2 shrink-0"
                                                    title="Siparişi Sil"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
