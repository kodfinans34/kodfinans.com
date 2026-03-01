"use client";

import { useState } from "react";
import { PlusCircle, Info, Edit, Trash2, Save, X } from "lucide-react";

interface Announcement {
    id: string;
    title: string;
    date: string;
    description: string;
    type: "info" | "warning" | "success";
    isActive: boolean;
}

export default function AdminAnnouncementsPage() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([
        {
            id: "1",
            title: "Razer Gold Bozum Oranları Güncellendi!",
            date: "Bugün, 14:30",
            description: "VIP üyelere özel ek bonuslar tanımlanmıştır.",
            type: "success",
            isActive: true,
        },
        {
            id: "2",
            title: "Sistem Bakımı",
            date: "Dün, 09:00",
            description: "Platormumuzda kısa süreli bakım çalışması yapılacaktır.",
            type: "warning",
            isActive: true,
        },
        {
            id: "3",
            title: "Yeni Ürünler Eklendi",
            date: "26 Şubat, 11:15",
            description: "Knight Online ve Metin2 kategorilerinde yeni stoklar.",
            type: "info",
            isActive: true,
        },
    ]);

    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<Announcement>>({});

    const handleEdit = (announcement: Announcement) => {
        setIsEditing(announcement.id);
        setEditForm(announcement);
    };

    const handleSave = () => {
        if (!editForm.title || !editForm.description) return;

        if (isEditing === "new") {
            setAnnouncements([{
                id: Math.random().toString(36).substr(2, 9),
                title: editForm.title,
                date: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }),
                description: editForm.description,
                type: editForm.type as "info" | "warning" | "success" || "info",
                isActive: editForm.isActive ?? true,
            }, ...announcements]);
        } else {
            setAnnouncements(prev => prev.map(a =>
                a.id === isEditing ? { ...a, ...editForm } as Announcement : a
            ));
        }
        setIsEditing(null);
        setEditForm({});
    };

    const handleDelete = (id: string) => {
        if (confirm("Bu duyuruyu silmek istediğinize emin misiniz?")) {
            setAnnouncements(prev => prev.filter(a => a.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Duyuru Yönetimi</h1>
                    <p className="text-sm text-white/50 mt-1">Sitede gösterilecek duyuruları buradan yönetebilirsiniz.</p>
                </div>
                <button
                    onClick={() => {
                        setIsEditing("new");
                        setEditForm({ type: "info", isActive: true });
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-secondary text-white rounded-xl text-sm font-medium transition-all"
                >
                    <PlusCircle size={16} />
                    Yeni Duyuru Ekle
                </button>
            </div>

            <div className="bg-card rounded-2xl border border-white/5 overflow-hidden">
                <div className="p-6">
                    <div className="space-y-4">
                        {isEditing === "new" && (
                            <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-white/50">Başlık</label>
                                        <input
                                            type="text"
                                            value={editForm.title || ""}
                                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                            placeholder="Duyuru başlığı"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-white/50">Tip</label>
                                        <select
                                            value={editForm.type || "info"}
                                            onChange={(e) => setEditForm({ ...editForm, type: e.target.value as "info" | "warning" | "success" })}
                                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary outline-none"
                                        >
                                            <option value="info">Bilgi (Mavi)</option>
                                            <option value="success">Başarı (Yeşil)</option>
                                            <option value="warning">Uyarı (Turuncu)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-semibold text-white/50">Açıklama</label>
                                        <textarea
                                            value={editForm.description || ""}
                                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                            rows={2}
                                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                                            placeholder="Duyuru içeriği"
                                        />
                                    </div>
                                    <div className="flex items-center gap-3 md:col-span-2 pt-2">
                                        <button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90">
                                            Kaydet
                                        </button>
                                        <button onClick={() => setIsEditing(null)} className="px-4 py-2 bg-white/5 text-white/70 rounded-lg text-sm font-medium hover:bg-white/10">
                                            İptal
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {announcements.map((announcement) => (
                            <div key={announcement.id} className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors group">
                                {isEditing === announcement.id ? (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-semibold text-white/50">Başlık</label>
                                                <input
                                                    type="text"
                                                    value={editForm.title || ""}
                                                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-semibold text-white/50">Tip</label>
                                                <select
                                                    value={editForm.type || "info"}
                                                    onChange={(e) => setEditForm({ ...editForm, type: e.target.value as "info" | "warning" | "success" })}
                                                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary outline-none"
                                                >
                                                    <option value="info">Bilgi (Mavi)</option>
                                                    <option value="success">Başarı (Yeşil)</option>
                                                    <option value="warning">Uyarı (Turuncu)</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-xs font-semibold text-white/50">Açıklama</label>
                                                <textarea
                                                    value={editForm.description || ""}
                                                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                                    rows={2}
                                                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary outline-none resize-none"
                                                />
                                            </div>
                                            <div className="flex items-center gap-3 md:col-span-2 pt-2">
                                                <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-500 hover:bg-green-500/30 rounded-lg text-sm font-medium transition-colors">
                                                    <Save size={16} /> Kaydet
                                                </button>
                                                <button onClick={() => setIsEditing(null)} className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white/70 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors">
                                                    <X size={16} /> İptal
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className={`mt-1 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${announcement.type === "success" ? "bg-green-500/10 border-green-500/20 text-green-500" :
                                                    announcement.type === "warning" ? "bg-orange-500/10 border-orange-500/20 text-orange-500" :
                                                        "bg-blue-500/10 border-blue-500/20 text-blue-500"
                                                }`}>
                                                <Info size={18} />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-semibold text-white">{announcement.title}</h3>
                                                <p className="text-xs text-white/40 mt-1 mb-2">{announcement.description}</p>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] uppercase font-bold text-white/20 tracking-wider bg-white/5 px-2 py-0.5 rounded-full">{announcement.date}</span>
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${announcement.isActive ? 'bg-green-500/10 text-green-500' : 'bg-white/5 text-white/30'}`}>
                                                        {announcement.isActive ? 'Aktif' : 'Pasif'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5 justify-end">
                                            <button
                                                onClick={() => {
                                                    setAnnouncements(prev => prev.map(a =>
                                                        a.id === announcement.id ? { ...a, isActive: !a.isActive } : a
                                                    ));
                                                }}
                                                className={`p-2 rounded-lg transition-colors ${announcement.isActive ? 'text-green-500 hover:bg-green-500/10' : 'text-white/30 hover:bg-white/10'}`}
                                                title={announcement.isActive ? "Pasife Al" : "Aktifleştir"}
                                            >
                                                <Save size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(announcement)}
                                                className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(announcement.id)}
                                                className="p-2 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {announcements.length === 0 && (
                            <div className="text-center py-12 border border-white/5 rounded-2xl border-dashed">
                                <Info className="w-12 h-12 text-white/10 mx-auto mb-3" />
                                <p className="text-white/40 text-sm">Henüz bir duyuru bulunmuyor.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
