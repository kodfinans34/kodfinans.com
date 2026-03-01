"use client";

import { useState } from "react";
import { Activity, Search, ServerCrash, ShieldAlert, ShieldCheck, Download, Trash2, ShieldOff, Info } from "lucide-react";

interface LogEntry {
    id: string;
    timestamp: string;
    ip: string;
    action: string;
    user: string | null;
    status: "success" | "warning" | "danger" | "info";
    details: string;
}

export default function AdminLogsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState<"all" | "auth" | "admin" | "security">("all");

    // Mock logs for demonstration
    const [logs, setLogs] = useState<LogEntry[]>([
        {
            id: "1",
            timestamp: "2026-03-01 16:30:45",
            ip: "85.105.12.34",
            action: "Admin Girişi",
            user: "admin@kodfinans.com",
            status: "success",
            details: "Başarılı admin paneli girişi."
        },
        {
            id: "2",
            timestamp: "2026-03-01 16:25:12",
            ip: "176.234.56.78",
            action: "Hatalı Şifre Denemesi",
            user: "ahmet@example.com",
            status: "warning",
            details: "Kullanıcı girişi sırasında 3. hatalı şifre."
        },
        {
            id: "3",
            timestamp: "2026-03-01 15:45:00",
            ip: "45.120.30.90",
            action: "Şüpheli İstek",
            user: null,
            status: "danger",
            details: "/api/admin adresine yetkisiz erişim denemesi."
        },
        {
            id: "4",
            timestamp: "2026-03-01 14:10:22",
            ip: "85.105.12.34",
            action: "Sistem Ayarı Değişikliği",
            user: "admin@kodfinans.com",
            status: "info",
            details: "Anasayfa düzeni güncellendi."
        },
        {
            id: "5",
            timestamp: "2026-03-01 10:05:01",
            ip: "176.234.56.78",
            action: "Yeni Kullanıcı Kaydı",
            user: "ahmet@example.com",
            status: "success",
            details: "Hesap oluşturuldu."
        },
    ]);

    const filteredLogs = logs.filter(log => {
        const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.ip.includes(searchTerm) ||
            (log.user && log.user.toLowerCase().includes(searchTerm.toLowerCase()));

        if (filterType === "all") return matchesSearch;
        if (filterType === "auth") return matchesSearch && (log.action.includes("Giriş") || log.action.includes("Şifre") || log.action.includes("Kayıt"));
        if (filterType === "security") return matchesSearch && (log.status === "danger" || log.action.includes("Şüpheli"));
        if (filterType === "admin") return matchesSearch && log.user === "admin@kodfinans.com";
        return matchesSearch;
    });

    const getStatusIcon = (status: LogEntry['status']) => {
        switch (status) {
            case "success": return <ShieldCheck className="text-green-500" size={18} />;
            case "warning": return <ShieldAlert className="text-orange-500" size={18} />;
            case "danger": return <ShieldOff className="text-red-500" size={18} />;
            case "info": return <Info className="text-blue-500" size={18} />;
            default: return <Activity className="text-white/50" size={18} />;
        }
    };

    const clearLogs = () => {
        if (confirm("Tüm log kayıtlarını silmek istediğinize emin misiniz? Bu işlem geri alınamaz.")) {
            setLogs([]);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Sistem & IP Logları</h1>
                    <p className="text-sm text-white/50 mt-1">Sistem üzerindeki tüm giriş çıkış ve kritik hareketler.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-medium transition-all">
                        <Download size={16} />
                        Dışa Aktar
                    </button>
                    <button
                        onClick={clearLogs}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl text-sm font-medium transition-all"
                    >
                        <Trash2 size={16} />
                        Logları Temizle
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-card rounded-2xl border border-white/5 p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <Activity size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-white/50 font-medium">Toplam Kayıt</p>
                        <h3 className="text-2xl font-bold text-white">{logs.length}</h3>
                    </div>
                </div>
                <div className="bg-card rounded-2xl border border-white/5 p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                        <ShieldOff size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-white/50 font-medium">Kritik Uyarılar</p>
                        <h3 className="text-2xl font-bold text-white">{logs.filter(l => l.status === "danger").length}</h3>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-2xl border border-white/5 overflow-hidden flex flex-col h-[600px]">
                <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        <input
                            type="text"
                            placeholder="IP, kullanıcı veya işlem ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-background border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-primary outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2 sm:pb-0">
                        {["all", "auth", "security", "admin"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type as any)}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${filterType === type
                                        ? "bg-primary/10 border-primary/20 text-primary"
                                        : "bg-background border-white/5 text-white/40 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                {type === "all" ? "Tümü" :
                                    type === "auth" ? "Oturumlar" :
                                        type === "security" ? "Güvenlik" : "Admin İşlemleri"}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-white/[0.02] sticky top-0 z-10 backdrop-blur-md">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-white/40">Durum</th>
                                <th className="px-6 py-4 font-semibold text-white/40">Zaman</th>
                                <th className="px-6 py-4 font-semibold text-white/40">IP Adresi</th>
                                <th className="px-6 py-4 font-semibold text-white/40">Kullanıcı</th>
                                <th className="px-6 py-4 font-semibold text-white/40">İşlem</th>
                                <th className="px-6 py-4 font-semibold text-white/40 w-full">Detay</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${log.status === 'success' ? 'bg-green-500/10' :
                                                log.status === 'danger' ? 'bg-red-500/10' :
                                                    log.status === 'warning' ? 'bg-orange-500/10' :
                                                        'bg-blue-500/10'
                                            }`}>
                                            {getStatusIcon(log.status)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-white/60 text-xs font-mono">{log.timestamp}</td>
                                    <td className="px-6 py-4 text-primary font-mono text-xs"><span className="bg-primary/10 px-2 py-1 rounded-md">{log.ip}</span></td>
                                    <td className="px-6 py-4">
                                        <span className="text-white/50 text-xs">{log.user || "Anonim"}</span>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-white/80">{log.action}</td>
                                    <td className="px-6 py-4 text-white/40 truncate max-w-xs">{log.details}</td>
                                </tr>
                            ))}

                            {filteredLogs.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-white/30">
                                        Bu kriterlere uygun log kaydı bulunamadı.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
