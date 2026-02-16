"use client";

import React, { useState } from "react";
import { useSystem, SystemUser } from "@/context/SystemContext";
import { Search, Users, Phone, Mail, ShoppingBag, Zap, Edit2, Trash2, Plus, X, Lock, DollarSign, ArrowUpRight, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AdminUsersPage() {
    const { users, updateUser, updateUserBalance, deleteUser, orders, bozumRequests } = useSystem();
    const [searchTerm, setSearchTerm] = useState("");
    const [editingUser, setEditingUser] = useState<SystemUser | null>(null);
    const [balanceAction, setBalanceAction] = useState<"add" | "set">("add");
    const [balanceAmount, setBalanceAmount] = useState<string>("");

    const filteredUsers = (users || []).filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getUserStats = (email: string) => {
        const userOrders = (orders || []).filter(o => o.customerInfo.email === email);
        const userBozums = (bozumRequests || []).filter(b => b.userEmail === email);
        return {
            orderCount: userOrders.length,
            orderTotal: userOrders.reduce((sum, o) => sum + o.totalAmount, 0),
            bozumCount: userBozums.length,
            bozumTotal: userBozums.reduce((sum, b) => sum + b.calculatedAmount, 0)
        };
    };

    const handleUpdateUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingUser) {
            updateUser(editingUser.id, editingUser);
            setEditingUser(null);
        }
    };

    const handleBalanceUpdate = () => {
        if (editingUser && balanceAmount) {
            updateUserBalance(editingUser.id, parseFloat(balanceAmount), balanceAction);
            setBalanceAmount("");
            // Update the local state for the modal as well
            setEditingUser({
                ...editingUser,
                balance: balanceAction === "add"
                    ? editingUser.balance + parseFloat(balanceAmount)
                    : parseFloat(balanceAmount)
            });
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-white uppercase tracking-tight text-blue-500">Kullanıcı Yönetimi</h1>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Tüm üyeleri ve bakiyelerini buradan yönetin</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        <input
                            type="text"
                            placeholder="Kullanıcı Ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-[#08080a] border border-white/10 rounded-xl pl-12 pr-4 py-2.5 text-sm text-white focus:border-blue-500/50 outline-none w-64 transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="grid gap-4">
                {filteredUsers.length === 0 ? (
                    <div className="text-center py-20 bg-[#08080a] border border-white/5 rounded-3xl border-dashed">
                        <Users className="w-12 h-12 text-white/20 mx-auto mb-4" />
                        <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Kullanıcı Bulunamadı</p>
                    </div>
                ) : (
                    filteredUsers.map((user) => {
                        const stats = getUserStats(user.email);
                        return (
                            <div key={user.id} className="bg-[#08080a] border border-white/5 p-6 rounded-3xl group hover:border-white/10 transition-all">
                                <div className="flex flex-col lg:flex-row gap-8 items-center">
                                    <div className="flex items-center gap-6 flex-1 w-full">
                                        <div className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-blue-500/10 to-blue-500/20 border border-blue-500/20 flex items-center justify-center text-blue-500 font-black text-2xl shrink-0">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="space-y-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-black text-white text-lg truncate uppercase italic tracking-tighter">{user.name}</h3>
                                                {user.role === "admin" && (
                                                    <span className="bg-red-500/10 text-red-500 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest border border-red-500/20">Admin</span>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-white/40">
                                                <span className="flex items-center gap-1.5"><Mail size={12} className="text-blue-500" /> {user.email}</span>
                                                <span className="flex items-center gap-1.5"><Phone size={12} className="text-blue-500" /> {user.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-3 pt-2">
                                                <div className="px-3 py-1 bg-white/[0.03] rounded-lg border border-white/5 flex items-center gap-2">
                                                    <DollarSign size={12} className="text-green-500" />
                                                    <span className="text-xs font-mono font-black text-white">₺{user.balance.toFixed(2)}</span>
                                                </div>
                                                <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">
                                                    Kayıt: {user.createdAt.toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 border-white/5 pt-4 lg:pt-0">
                                        <div className="hidden xl:flex gap-6 mr-6">
                                            <div className="text-right">
                                                <p className="text-[8px] text-white/20 font-black uppercase tracking-[0.2em] mb-1">SİPARİŞ</p>
                                                <p className="text-sm font-black text-white">₺{stats.orderTotal.toFixed(0)}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[8px] text-white/20 font-black uppercase tracking-[0.2em] mb-1">BOZUM</p>
                                                <p className="text-sm font-black text-white text-green-500">₺{stats.bozumTotal.toFixed(0)}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setEditingUser(user)}
                                                className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/40 hover:text-blue-500 hover:border-blue-500/30 transition-all shadow-xl"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => { if (confirm("Kullanıcıyı silmek istediğinize emin misiniz?")) deleteUser(user.id) }}
                                                className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/40 hover:text-red-500 hover:border-red-500/30 transition-all shadow-xl"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Editing Modal */}
            <AnimatePresence>
                {editingUser && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    >
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setEditingUser(null)} />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-[#08080a] border border-white/10 w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl"
                        >

                            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-blue-500/10 to-transparent">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                        <Edit2 size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Kullanıcıyı Düzenle</h2>
                                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{editingUser.email}</p>
                                    </div>
                                </div>
                                <button onClick={() => setEditingUser(null)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto no-scrollbar">
                                {/* Profile Info */}
                                <form onSubmit={handleUpdateUser} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-2">Ad Soyad</label>
                                        <input
                                            type="text"
                                            value={editingUser.name}
                                            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-blue-500/50 transition-all font-bold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-2">Telefon</label>
                                        <input
                                            type="text"
                                            value={editingUser.phone}
                                            onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-blue-500/50 transition-all font-bold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-2">Yeni Şifre (Boş bırakılabilir)</label>
                                        <div className="relative">
                                            <Lock size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" />
                                            <input
                                                type="text"
                                                placeholder="••••••••"
                                                value={editingUser.password || ""}
                                                onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-blue-500/50 transition-all font-mono"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-2">Rol</label>
                                        <select
                                            value={editingUser.role}
                                            onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as any })}
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all font-bold appearance-none"
                                        >
                                            <option value="user" className="bg-[#08080a]">Üye</option>
                                            <option value="admin" className="bg-[#08080a]">Yönetici</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2 pt-2">
                                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-14 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-blue-500/10">
                                            <Save size={18} className="mr-2" /> Bilgileri Güncelle
                                        </Button>
                                    </div>
                                </form>

                                {/* Balance Management */}
                                <div className="pt-8 border-t border-white/5 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                                                <DollarSign size={20} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black text-white uppercase italic tracking-tighter leading-none">Bakiye Yönetimi</h3>
                                                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mt-1">Mevcut: ₺{editingUser.balance.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <div className="flex bg-white/5 p-1 rounded-xl">
                                            <button onClick={() => setBalanceAction("add")} className={cn("px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all", balanceAction === "add" ? "bg-green-600 text-white" : "text-white/40")}>EKLE</button>
                                            <button onClick={() => setBalanceAction("set")} className={cn("px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all", balanceAction === "set" ? "bg-blue-600 text-white" : "text-white/40")}>SABİTLE</button>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="relative flex-1">
                                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 font-bold text-lg">₺</span>
                                            <input
                                                type="number"
                                                placeholder="Tutar girin..."
                                                value={balanceAmount}
                                                onChange={(e) => setBalanceAmount(e.target.value)}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white focus:outline-none focus:border-green-500/50 transition-all font-mono font-bold text-lg"
                                            />
                                        </div>
                                        <button
                                            onClick={handleBalanceUpdate}
                                            className={cn(
                                                "px-8 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-2",
                                                balanceAction === "add" ? "bg-green-600 hover:bg-green-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
                                            )}
                                        >
                                            {balanceAction === "add" ? <Plus size={16} /> : <ArrowUpRight size={16} />}
                                            {balanceAction === "add" ? "Bakiye Ekle" : "Bakiyeyi Güncelle"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
