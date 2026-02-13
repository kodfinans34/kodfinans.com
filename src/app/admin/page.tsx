"use client";

import { useSystem } from "@/context/SystemContext";
// import { formatCurrency } from "@/lib/utils";

export default function AdminPage() {
    const { bozumRequests, orders, withdrawalRequests } = useSystem();

    // Stats
    const pendingRequests = bozumRequests.filter(req => req.status === "pending").length;
    const totalSales = orders
        .filter(o => o.status === "completed")
        .reduce((acc, curr) => acc + curr.totalAmount, 0);
    const completedBozumAmount = bozumRequests
        .filter(r => r.status === "approved")
        .reduce((acc, r) => acc + r.calculatedAmount, 0);

    const pendingWithdrawals = withdrawalRequests.filter(w => w.status === "pending").length;

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-black text-white uppercase tracking-tight text-red-500">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#08080a] border border-white/[0.08] p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="text-6xl font-black text-red-600">S</span>
                    </div>
                    <h3 className="text-red-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Toplam Satış</h3>
                    <p className="text-4xl font-black text-white">₺{totalSales.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="bg-[#08080a] border border-white/[0.08] p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="text-6xl font-black text-blue-500">B</span>
                    </div>
                    <h3 className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Bekleyen Bozum</h3>
                    <p className="text-4xl font-black text-white">{pendingRequests}</p>
                </div>
                <div className="bg-[#08080a] border border-white/[0.08] p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="text-6xl font-black text-green-500">Ç</span>
                    </div>
                    <h3 className="text-green-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Bekleyen Çekim</h3>
                    <p className="text-4xl font-black text-white">{pendingWithdrawals}</p>
                </div>
                <div className="bg-[#08080a] border border-white/[0.08] p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="text-6xl font-black text-yellow-500">I</span>
                    </div>
                    <h3 className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">İşlenen Bozum (TL)</h3>
                    <p className="text-4xl font-black text-white">₺{completedBozumAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Orders */}
                <div className="bg-[#08080a] border border-white/[0.08] rounded-2xl p-8 flex flex-col">
                    <h2 className="text-lg font-black text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                        <span className="w-2 h-6 bg-red-600 rounded-full"></span>
                        Son Siparişler
                    </h2>
                    <div className="flex-1 space-y-4">
                        {orders.length > 0 ? (
                            orders.slice(0, 5).map(order => (
                                <div key={order.id} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                                    <div>
                                        <p className="text-white font-bold text-sm">#{order.id}</p>
                                        <p className="text-white/40 text-xs">{new Date(order.timestamp).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white font-bold text-sm">₺{order.totalAmount}</p>
                                        <span className={`text-[10px] uppercase font-bold ${order.status === 'pending' ? 'text-yellow-500' : order.status === 'completed' ? 'text-green-500' : 'text-red-500'}`}>
                                            {order.status === 'pending' ? 'Bekliyor' : order.status === 'completed' ? 'Tamamlandı' : 'İptal'}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center space-y-4 h-32 border border-dashed border-white/5 rounded-xl">
                                <p className="text-white/20 font-bold text-xs uppercase tracking-widest">Veri Bulunamadı</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bozum */}
                <div className="bg-[#08080a] border border-white/[0.08] rounded-2xl p-8 flex flex-col">
                    <h2 className="text-lg font-black text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                        <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
                        Son Bozum Talepleri
                    </h2>
                    <div className="flex-1 space-y-4">
                        {bozumRequests.length > 0 ? (
                            bozumRequests.slice(0, 5).map(req => (
                                <div key={req.id} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                                    <div>
                                        <p className="text-white font-bold text-sm">{req.codeType}</p>
                                        <p className="text-white/40 text-xs">{new Date(req.timestamp).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white font-bold text-sm">₺{req.calculatedAmount}</p>
                                        <span className={`text-[10px] uppercase font-bold ${req.status === 'pending' ? 'text-yellow-500' : req.status === 'approved' ? 'text-green-500' : 'text-red-500'}`}>
                                            {req.status === 'pending' ? 'Bekliyor' : req.status === 'approved' ? 'Onaylandı' : 'Reddedildi'}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center space-y-4 h-32 border border-dashed border-white/5 rounded-xl">
                                <p className="text-white/20 font-bold text-xs uppercase tracking-widest">Veri Bulunamadı</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Withdrawals */}
                <div className="bg-[#08080a] border border-white/[0.08] rounded-2xl p-8 flex flex-col">
                    <h2 className="text-lg font-black text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                        <span className="w-2 h-6 bg-green-500 rounded-full"></span>
                        Son Çekim Talepleri
                    </h2>
                    <div className="flex-1 space-y-4">
                        {withdrawalRequests.length > 0 ? (
                            withdrawalRequests.slice(0, 5).map(req => (
                                <div key={req.id} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                                    <div>
                                        <p className="text-white font-bold text-sm">{req.accountHolder.split(' ')[0]}...</p>
                                        <p className="text-white/40 text-xs">{new Date(req.timestamp).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white font-bold text-sm">₺{req.amount}</p>
                                        <span className={`text-[10px] uppercase font-bold ${req.status === 'pending' ? 'text-yellow-500' : req.status === 'approved' ? 'text-green-500' : 'text-red-500'}`}>
                                            {req.status === 'pending' ? 'Bekliyor' : req.status === 'approved' ? 'Ödendi' : 'Reddedildi'}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center space-y-4 h-32 border border-dashed border-white/5 rounded-xl">
                                <p className="text-white/20 font-bold text-xs uppercase tracking-widest">Talep Bulunamadı</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
