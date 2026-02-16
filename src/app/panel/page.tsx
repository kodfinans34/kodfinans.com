"use client";

import { ShoppingBag, Zap, Wallet, ArrowUpRight, Clock, CheckCircle2, TrendingUp, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useSystem } from "@/context/SystemContext";

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
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">Panel <span className="text-primary text-2xl not-italic ml-2">v4.0</span></h1>
                    <p className="text-white/30 text-xs font-bold uppercase tracking-[0.3em]">Hoş geldin, {user?.name || "KodFinans üyesi"}.</p>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3">
                    <Link href="/panel/bozumlar">
                        <Button className="bg-white/5 border border-white/10 text-white hover:bg-white/10 px-4 py-3 h-auto rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                            BOZUM İŞLEMLERİM
                        </Button>
                    </Link>
                    <Link href="/panel/bakiye-cek">
                        <Button className="bg-white/5 border border-white/10 text-white hover:bg-white/10 px-4 py-3 h-auto rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                            BAKİYE ÇEK
                        </Button>
                    </Link>
                    <Link href="/panel/bakiye-ekle">
                        <Button className="bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white px-6 py-3 h-auto rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                            BAKİYE EKLE
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className={`relative overflow-hidden glass p-8 rounded-[2.5rem] border-white/5 bg-gradient-to-br ${stat.color} group hover:border-white/10 transition-all`}>
                        <div className="relative z-10 flex flex-col gap-6">
                            <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${stat.text}`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <h3 className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-1">{stat.label}</h3>
                                <p className="text-4xl font-black text-white italic tracking-tighter">{stat.value}</p>
                            </div>
                        </div>
                        <div className="absolute top-8 right-8 text-white/5 group-hover:text-white/10 transition-colors">
                            <TrendingUp size={48} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center justify-between px-4">
                        <h2 className="text-xl font-black text-white uppercase italic tracking-tight">Son İşlemler</h2>
                        <Link href="/panel/siparisler" className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:opacity-70 transition-opacity">TÜMÜNÜ GÖR</Link>
                    </div>

                    <div className="glass border-white/5 rounded-[3rem] overflow-hidden min-h-[400px]">
                        {recentTransactions.length === 0 ? (
                            <div className="p-12 flex flex-col items-center justify-center text-center space-y-6 h-full">
                                <div className="w-20 h-20 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/10 group">
                                    <Clock size={32} className="group-hover:rotate-12 transition-transform" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-white font-black text-lg uppercase tracking-tight">Henüz İşlem Bulunmuyor</p>
                                    <p className="text-white/30 text-xs font-medium max-w-xs mx-auto">Yaptığınız tüm bozum ve satın alma işlemleri burada listelenecektir.</p>
                                </div>
                                <Link href="/bozum">
                                    <Button className="bg-white/[0.03] border border-white/10 text-white hover:bg-white/5 px-8 py-4 h-auto rounded-2xl text-[10px] font-black uppercase tracking-[0.2em]">İŞLEM BAŞLAT</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="p-6 space-y-4">
                                {recentTransactions.map((req: any) => (
                                    <div key={req.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${(req.status === 'approved' || req.status === 'completed') ? 'bg-green-500/10 text-green-500' :
                                                (req.status === 'rejected' || req.status === 'cancelled') ? 'bg-red-500/10 text-red-500' :
                                                    'bg-yellow-500/10 text-yellow-500'
                                                }`}>
                                                {(req.status === 'approved' || req.status === 'completed') ? <CheckCircle2 size={18} /> :
                                                    (req.status === 'rejected' || req.status === 'cancelled') ? <XCircle size={18} /> :
                                                        <Clock size={18} />}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-sm">
                                                    {req.type === 'bozum' ? `${req.codeType} Bozum` : req.codeType}
                                                </h4>
                                                <p className="text-white/40 text-[10px] font-mono">{new Date(req.timestamp).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-black text-sm tracking-tight ${req.type === 'bozum' ? 'text-green-400' : 'text-white'}`}>
                                                {req.type === 'bozum' ? '+' : '-'}₺{req.calculatedAmount.toFixed(2)}
                                            </p>
                                            <p className={`text-[10px] font-bold uppercase tracking-wider ${(req.status === 'approved' || req.status === 'completed') ? 'text-green-500' :
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

                <div className="lg:col-span-4 space-y-6">
                    <h2 className="text-xl font-black text-white uppercase italic tracking-tight px-4">Duyurular</h2>
                    <div className="space-y-4">
                        {[
                            { title: "Yeni Ödeme Yöntemi", date: "Bugün", desc: "Papara ile 7/24 anında çekim aktif edildi." },
                            { title: "%2 Bonus Fırsatı", date: "Dün", desc: "Hafta sonuna özel tüm bozum işlemlerinde ek bonus." }
                        ].map((n, i) => (
                            <div key={i} className="glass p-6 rounded-[2rem] border-white/5 hover:bg-white/[0.02] transition-colors space-y-3 group">
                                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest leading-none">
                                    <span className="text-primary">{n.date}</span>
                                    <ArrowUpRight size={14} className="text-white/20 group-hover:text-primary transition-colors" />
                                </div>
                                <h4 className="text-white font-black text-sm uppercase tracking-tight">{n.title}</h4>
                                <p className="text-white/30 text-[11px] leading-relaxed font-medium">{n.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
