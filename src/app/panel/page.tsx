"use client";

import { ShoppingBag, Zap, Wallet, ArrowUpRight, Clock, CheckCircle2, TrendingUp, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useSystem } from "@/context/SystemContext";
import { cn } from "@/lib/utils";

export default function PanelPage() {
    const { userBalance, bozumRequests, orders, user } = useSystem();

    const userEmail = user?.email;

    const userBozumRequests = (bozumRequests || []).filter(req => req.userEmail === userEmail);
    const userOrders = (orders || []).filter(o => o.customerInfo.email === userEmail);

    const pendingBozumCount = userBozumRequests.filter(req => req.status === "pending").length;
    const totalOrdersCount = userOrders.length;

    // Combine and sort requests by date (newest first)
    // We need a common interface or just render conditionally
    const recentTransactions = [
        ...userBozumRequests.map(r => ({ ...r, type: 'bozum' as const })),
        ...userOrders.map(o => ({ ...o, type: 'order' as const, calculatedAmount: o.totalAmount, codeType: `Sipariş #${o.id}` }))
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    const stats = [
        { label: "Toplam Sipariş", value: totalOrdersCount.toString(), icon: ShoppingBag, color: "from-blue-500/20 to-transparent", text: "text-blue-400" },
        { label: "Bekleyen Bozum", value: pendingBozumCount.toString(), icon: Zap, color: "from-primary/20 to-transparent", text: "text-primary" },
        { label: "Cüzdan Bakiyesi", value: `₺${userBalance.toFixed(2)}`, icon: Wallet, color: "from-emerald-500/20 to-transparent", text: "text-emerald-400" },
    ];

    return (
        <div className="space-y-8 md:space-y-12">
            <div className="flex flex-col gap-6 md:gap-8 min-w-0">
                {/* Welcome Header */}
                <div className="flex flex-col space-y-3">
                    <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                        Kullanıcı <span className="text-primary italic">Paneli</span>
                    </h1>
                    <p className="text-white/40 text-xs md:text-sm font-bold uppercase tracking-[0.2em]">Hoş geldin, {user?.name || "KodFinans üyesi"}</p>
                </div>

                {/* Balance & Stats Grid - Premium Look */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 w-full">
                    {/* Main Wallet Stat - Spans 2 cols on mobile */}
                    <div className="col-span-2 lg:col-span-1 relative overflow-hidden bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent p-5 md:p-8 rounded-2xl md:rounded-[2rem] border border-emerald-500/20 group transition-all hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] min-w-0">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full -z-10 group-hover:bg-emerald-500/20 transition-all" />
                        <div className="relative z-10 flex flex-col gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shrink-0">
                                <Wallet className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-emerald-500/70 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-1 truncate">Cüzdan Bakiyesi</h3>
                                <p className="text-3xl md:text-4xl font-black text-white tracking-tighter truncate">₺{userBalance.toFixed(2)}</p>
                            </div>
                        </div>
                        <TrendingUp size={64} className="absolute -bottom-4 -right-4 text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors" />
                    </div>

                    {/* Pending Bozum */}
                    <div className="relative overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] p-4 md:p-6 rounded-2xl md:rounded-[2rem] border border-white/5 transition-all min-w-0">
                        <div className="relative z-10 flex flex-col gap-3 md:gap-4">
                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                                <Zap className="w-4 h-4 md:w-5 md:h-5" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-white/40 text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] mb-1 truncate">Bekleyen Bozum</h3>
                                <p className="text-xl md:text-2xl font-black text-white tracking-tighter truncate">{pendingBozumCount}</p>
                            </div>
                        </div>
                    </div>

                    {/* Total Orders */}
                    <div className="relative overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] p-4 md:p-6 rounded-2xl md:rounded-[2rem] border border-white/5 transition-all min-w-0">
                        <div className="relative z-10 flex flex-col gap-3 md:gap-4">
                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 shrink-0">
                                <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-white/40 text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] mb-1 truncate">Toplam Sipariş</h3>
                                <p className="text-xl md:text-2xl font-black text-white tracking-tighter truncate">{totalOrdersCount}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 md:gap-4 w-full min-w-0">
                    <Link href="/panel/bozumlar" className="w-full min-w-0">
                        <Button className="w-full h-full min-w-0 flex flex-col justify-center items-center py-4 md:py-5 px-1 md:px-4 bg-gradient-to-br from-white/[0.05] to-white/[0.01] hover:from-white/[0.08] hover:to-white/[0.02] border border-white/10 rounded-2xl md:rounded-3xl gap-2 md:gap-3 transition-all">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0">
                                <Zap className="text-yellow-400 w-4 h-4 md:w-5 md:h-5" />
                            </div>
                            <span className="text-[9px] sm:text-xs font-black uppercase tracking-widest text-white/80 truncate">Bozum</span>
                        </Button>
                    </Link>
                    <Link href="/panel/bakiye-cek" className="w-full min-w-0">
                        <Button className="w-full h-full min-w-0 flex flex-col justify-center items-center py-4 md:py-5 px-1 md:px-4 bg-gradient-to-br from-white/[0.05] to-white/[0.01] hover:from-white/[0.08] hover:to-white/[0.02] border border-white/10 rounded-2xl md:rounded-3xl gap-2 md:gap-3 transition-all">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                                <ArrowUpRight className="text-blue-400 w-4 h-4 md:w-5 md:h-5" />
                            </div>
                            <span className="text-[9px] sm:text-xs font-black uppercase tracking-widest text-white/80 truncate">Çekim</span>
                        </Button>
                    </Link>
                    <Link href="/panel/bakiye-ekle" className="w-full min-w-0">
                        <Button className="w-full h-full min-w-0 flex flex-col justify-center items-center py-4 md:py-5 px-1 md:px-4 bg-gradient-to-br from-primary/20 to-primary/5 hover:from-primary/30 hover:to-primary/10 border border-primary/30 rounded-2xl md:rounded-3xl gap-2 md:gap-3 transition-all shadow-[0_0_20px_rgba(74,188,241,0.15)] hover:shadow-[0_0_30px_rgba(74,188,241,0.25)]">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/20 flex items-center justify-center shadow-inner shrink-0">
                                <Wallet className="text-white w-4 h-4 md:w-5 md:h-5" />
                            </div>
                            <span className="text-[9px] sm:text-xs font-black uppercase tracking-widest text-white shadow-primary truncate">Yükle</span>
                        </Button>
                    </Link>
                </div>

                {/* Two Column Layout for Desktop, Stacked for Mobile */}
                <div className="grid lg:grid-cols-12 gap-6 md:gap-8 min-w-0 w-full">
                    {/* Recent Transactions */}
                    <div className="lg:col-span-8 space-y-4 md:space-y-5 min-w-0">
                        <div className="flex items-center justify-between px-1">
                            <h2 className="text-base md:text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                                <Clock size={18} className="text-primary shrink-0" />
                                <span className="truncate">Son İşlemler</span>
                            </h2>
                            <Link href="/panel/siparisler" className="text-[9px] md:text-[10px] font-black text-white/40 hover:text-primary uppercase tracking-[0.2em] transition-colors bg-white/5 py-1.5 px-3 rounded-full shrink-0">
                                Tümünü Gör
                            </Link>
                        </div>

                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl md:rounded-[2.5rem] overflow-hidden min-h-[300px] flex flex-col min-w-0">
                            {recentTransactions.length === 0 ? (
                                <div className="p-8 md:p-10 flex flex-col items-center justify-center text-center space-y-4 md:space-y-5 h-full opacity-60 flex-1">
                                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center text-white/20 shrink-0">
                                        <Clock size={28} />
                                    </div>
                                    <div className="space-y-2 px-2">
                                        <p className="text-xs md:text-sm font-black uppercase tracking-tight text-white">İşlem Bulunmuyor</p>
                                        <p className="text-white/40 text-[9px] md:text-[10px] max-w-[200px] mx-auto uppercase tracking-wider">Yaptığınız işlemler burada listelenecektir.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="divide-y divide-white/[0.04]">
                                    {recentTransactions.slice(0, 5).map((req: any) => (
                                        <div key={req.id} className="flex items-center gap-2 sm:gap-4 p-3 sm:p-5 bg-transparent hover:bg-white/[0.02] transition-colors group min-w-0">
                                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 border ${(req.status === 'approved' || req.status === 'completed') ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                (req.status === 'rejected' || req.status === 'cancelled') ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                    'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                                }`}>
                                                {(req.status === 'approved' || req.status === 'completed') ? <CheckCircle2 size={16} className="sm:w-[18px] sm:h-[18px]" /> :
                                                    (req.status === 'rejected' || req.status === 'cancelled') ? <XCircle size={16} className="sm:w-[18px] sm:h-[18px]" /> :
                                                        <Clock size={16} className="sm:w-[18px] sm:h-[18px]" />}
                                            </div>
                                            <div className="flex-1 min-w-0 overflow-hidden">
                                                <h4 className="text-white font-black text-xs sm:text-sm tracking-tight truncate group-hover:text-primary transition-colors">
                                                    {req.type === 'bozum' ? `${req.codeType} Bozum` : req.codeType}
                                                </h4>
                                                <p className="text-white/40 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mt-0.5 sm:mt-1 truncate">{new Date(req.timestamp).toLocaleDateString()}</p>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <p className={`font-black text-[11px] sm:text-sm tracking-tight ${req.type === 'bozum' ? 'text-green-400' : 'text-white'}`}>
                                                    {req.type === 'bozum' ? '+' : '-'}₺{req.calculatedAmount.toFixed(2)}
                                                </p>
                                                <p className={`text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] mt-1 sm:mt-1.5 ${(req.status === 'approved' || req.status === 'completed') ? 'text-green-500' :
                                                    (req.status === 'rejected' || req.status === 'cancelled') ? 'text-red-500' :
                                                        'text-yellow-500'
                                                    }`}>
                                                    {req.status === 'approved' ? 'Onaylandı' :
                                                        req.status === 'completed' ? 'Tamamlandı' :
                                                            req.status === 'rejected' ? 'Reddedildi' :
                                                                req.status === 'cancelled' ? 'İptal Edildi' :
                                                                    'Bekleniyor'}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Announcements sidebar */}
                    <div className="lg:col-span-4 space-y-4 md:space-y-5">
                        <div className="flex items-center px-1">
                            <h2 className="text-base md:text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                                <Zap size={18} className="text-yellow-500" />
                                Duyurular
                            </h2>
                        </div>
                        <div className="space-y-3">
                            {[
                                { title: "Yeni Ödeme Yöntemi", date: "Bugün", desc: "Papara ile 7/24 anında çekim aktif edildi.", type: 'blue' },
                                { title: "%2 Bonus Fırsatı", date: "Dün", desc: "Hafta sonuna özel tüm bozum işlemlerinde ek bonus.", type: 'yellow' }
                            ].map((n, i) => (
                                <div key={i} className={`bg-white/[0.02] p-5 rounded-[2rem] border border-white/5 hover:bg-white/[0.05] transition-all relative overflow-hidden group`}>
                                    {/* Accent edge line */}
                                    <div className={`absolute top-0 left-0 bottom-0 w-1 ${n.type === 'blue' ? 'bg-primary' : 'bg-yellow-500'}`} />

                                    <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest mb-3">
                                        <span className={n.type === 'blue' ? 'text-primary' : 'text-yellow-500'}>{n.date}</span>
                                        <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                            <ArrowUpRight size={12} className="text-white/40" />
                                        </div>
                                    </div>
                                    <h4 className="text-white font-black text-sm uppercase tracking-tight mb-2">{n.title}</h4>
                                    <p className="text-white/40 text-[11px] leading-relaxed font-semibold">{n.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
