"use client";

import React, { useState } from "react";
import { useSystem } from "@/context/SystemContext";
import { Plus, Trash2, Edit2, Link as LinkIcon, AlertCircle, Save, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ApiIntegration } from "@/lib/types";

export default function ApiAdminPage() {
    const { settings, updateSettings } = useSystem();
    const [integrations, setIntegrations] = useState<ApiIntegration[]>(settings.apiIntegrations || []);
    const [isSaving, setIsSaving] = useState(false);

    // Form state for adding/editing
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<ApiIntegration>>({
        title: "",
        description: "",
        apiUrl: "",
        apiKey: "",
        image: "",
        isActive: true
    });

    const handleSaveList = async (newList: ApiIntegration[]) => {
        setIsSaving(true);
        try {
            await updateSettings({ apiIntegrations: newList });
            setIntegrations(newList);
            alert("API ayarları kaydedildi!");
        } catch (error) {
            console.error("Error saving API config:", error);
            alert("Kaydedilirken hata oluştu.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleAdd = () => {
        setEditingId("new");
        setFormData({
            title: "",
            description: "",
            apiUrl: "",
            apiKey: "",
            image: "",
            isActive: true
        });
    };

    const handleEdit = (integration: ApiIntegration) => {
        setEditingId(integration.id);
        setFormData(integration);
    };

    const handleDelete = (id: string) => {
        if (!confirm("Bu API bağlantısını silmek istediğinize emin misiniz?")) return;
        const newList = integrations.filter(i => i.id !== id);
        handleSaveList(newList);
    };

    const handleSubmit = () => {
        if (!formData.title || !formData.apiUrl) {
            alert("Lütfen başlık ve API URL alanlarını doldurun.");
            return;
        }

        let newList = [...integrations];
        if (editingId === "new") {
            const newItem: ApiIntegration = {
                id: Date.now().toString(),
                title: formData.title!,
                description: formData.description || "",
                apiUrl: formData.apiUrl!,
                apiKey: formData.apiKey || "",
                image: formData.image || "",
                isActive: formData.isActive ?? true
            };
            newList.push(newItem);
        } else {
            newList = newList.map(item => item.id === editingId ? { ...item, ...formData } as ApiIntegration : item);
        }

        setEditingId(null);
        handleSaveList(newList);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                        <LinkIcon className="text-primary" /> API Ürünleri Yönetimi
                    </h1>
                    <p className="text-white/40 text-sm font-medium mt-1">Anasayfada otomatik listelenecek dış API kaynaklarınızı (Örn: Oyunfor, Epin vb.) yönetin.</p>
                </div>
                {!editingId && (
                    <Button onClick={handleAdd} className="flex items-center gap-2">
                        <Plus size={18} /> Yeni API Ekle
                    </Button>
                )}
            </div>

            {editingId ? (
                <div className="bg-[#0a100e] border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
                    <h2 className="text-xl font-bold text-white mb-4">
                        {editingId === "new" ? "Yeni API Entegrasyonu" : "API Düzenle"}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Platform Başlığı</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                                    placeholder="Örn: Steam Kodları"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Kısa Açıklama</label>
                                <input
                                    type="text"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                                    placeholder="Anında otomatik teslimatlı steam kodları..."
                                />
                            </div>
                            <div className="space-y-1.5 flex items-center gap-3 bg-white/[0.02] p-4 rounded-xl border border-white/5 mt-4">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={formData.isActive}
                                    onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                                    className="w-4 h-4 rounded border-white/20 bg-black/40 text-primary focus:ring-primary focus:ring-offset-0"
                                />
                                <label htmlFor="isActive" className="text-sm font-bold text-white cursor-pointer select-none">
                                    Aktif Olarak Anasayfada Göster
                                </label>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">API Endpoint URL</label>
                                <input
                                    type="text"
                                    value={formData.apiUrl}
                                    onChange={e => setFormData({ ...formData, apiUrl: e.target.value })}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-primary/50 transition-colors"
                                    placeholder="https://api.oyunfor.com/v1/products"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">API Anahtarı (Gerekliyse)</label>
                                <input
                                    type="text"
                                    value={formData.apiKey}
                                    onChange={e => setFormData({ ...formData, apiKey: e.target.value })}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-primary/50 transition-colors"
                                    placeholder="Bırakılmazsa boş kalabilir"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">İkon/Görsel URL</label>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-primary/50 transition-colors"
                                    placeholder="https://... (Medya galerisinden alabilirsiniz)"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                        <Button
                            variant="outline"
                            onClick={() => setEditingId(null)}
                            className="bg-transparent border-white/10 hover:bg-white/5"
                        >
                            İptal
                        </Button>
                        <Button onClick={handleSubmit} disabled={isSaving} className="flex items-center gap-2">
                            {isSaving ? <span className="animate-spin w-4 h-4 border-2 border-white/40 border-t-white rounded-full"></span> : <Save size={16} />}
                            {isSaving ? "Kaydediliyor..." : "Kaydet"}
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="grid gap-4">
                    {integrations.length === 0 ? (
                        <div className="text-center py-20 bg-[#0a100e] border border-white/5 rounded-2xl border-dashed">
                            <LinkIcon className="w-12 h-12 text-white/20 mx-auto mb-4" />
                            <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Henüz API Eklenmemiş</p>
                            <p className="text-white/30 text-xs mt-2 max-w-sm mx-auto">Yeni bir API ekleyerek anasayfada listeleyebilirsiniz.</p>
                        </div>
                    ) : (
                        integrations.map(integration => (
                            <div key={integration.id} className="bg-[#0a100e] border border-white/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-2xl group hover:border-white/20 transition-all">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 overflow-hidden">
                                        {integration.image ? (
                                            <img src={integration.image} alt={integration.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <LinkIcon className="text-white/40" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h3 className="font-bold text-lg text-white">{integration.title}</h3>
                                            <span className={`text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-wider ${integration.isActive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                {integration.isActive ? 'Aktif' : 'Pasif'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-white/50">{integration.description || 'Açıklama yok'}</p>
                                        <div className="text-[10px] font-mono text-white/30 mt-2 bg-white/5 px-2 py-1 rounded inline-block truncate max-w-xs md:max-w-md">
                                            {integration.apiUrl}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button onClick={() => handleEdit(integration)} className="bg-white/5 hover:bg-white/10 text-white w-10 h-10 p-0 flex items-center justify-center rounded-xl">
                                        <Edit2 size={16} />
                                    </Button>
                                    <Button onClick={() => handleDelete(integration.id)} className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white w-10 h-10 p-0 flex items-center justify-center rounded-xl">
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
