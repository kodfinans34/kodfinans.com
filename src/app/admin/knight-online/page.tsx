"use client";

import React, { useState, useEffect } from "react";
import { useSystem } from "@/context/SystemContext";
import { Button } from "@/components/ui/Button";
import {
    Save,
    Loader2,
    Plus,
    Trash2,
    Edit,
    ShieldCheck,
    Coins,
    ShoppingCart,
    Image as ImageIcon,
    Check
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getKOItems, addKOItem, updateKOItem, deleteKOItem, KnightOnlineItem } from "@/lib/firebase-ko";
import { uploadFile } from "@/lib/upload";

export default function AdminKnightOnlinePage() {
    const { settings, updateSettings } = useSystem();
    const [localSettings, setLocalSettings] = useState(settings);
    const [items, setItems] = useState<KnightOnlineItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isAddingItem, setIsAddingItem] = useState(false);
    const [editingItem, setEditingItem] = useState<KnightOnlineItem | null>(null);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Form states for new/editing item
    const [formItem, setFormItem] = useState({
        name: "",
        price: "",
        description: "",
        image: "",
        server: "Zero",
        status: "active" as const
    });

    useEffect(() => {
        if (settings) setLocalSettings(settings);
        loadItems();
    }, [settings]);

    const loadItems = async () => {
        setLoading(true);
        const fetchedItems = await getKOItems();
        setItems(fetchedItems);
        setLoading(false);
    };

    const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLocalSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveSettings = async () => {
        setSaving(true);
        try {
            await updateSettings(localSettings);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            alert("Ayarlar kaydedilirken hata oluştu.");
        } finally {
            setSaving(false);
        }
    };

    const handleItemSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const itemData = {
                ...formItem,
                price: Number(formItem.price),
                timestamp: new Date()
            };

            if (editingItem) {
                await updateKOItem(editingItem.id, itemData);
            } else {
                await addKOItem(itemData);
            }

            setIsAddingItem(false);
            setEditingItem(null);
            setFormItem({ name: "", price: "", description: "", image: "", server: "Zero", status: "active" });
            loadItems();
        } catch (error) {
            alert("İşlem sırasında hata oluştu.");
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteItem = async (id: string) => {
        if (!confirm("Bu ilanı silmek istediğinize emin misiniz?")) return;
        try {
            await deleteKOItem(id);
            loadItems();
        } catch (error) {
            alert("Silme işlemi başarısız.");
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const url = await uploadFile(file, `ko-items/${Date.now()}`);
            setFormItem(prev => ({ ...prev, image: url }));
        } catch (error) {
            alert("Resim yüklenemedi.");
        }
    };

    return (
        <div className="space-y-8 max-w-6xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <div>
                    <h1 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                        <ShieldCheck className="text-primary" /> Knight Online Yönetimi
                    </h1>
                    <p className="text-white/35 text-xs font-medium mt-1">GB kurlarını ve Zero sunucusu item ilanlarını yönetin.</p>
                </div>
            </div>

            {/* GB Rates Section */}
            <div className="bg-[#0a100e] border border-white/10 p-6 md:p-8 rounded-2xl space-y-6 shadow-xl">
                <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <Coins size={18} className="text-primary" /> GB Alış & Satış (Zero)
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">GB Alış Oranı (TL)</label>
                        <input
                            name="koGbBuyRate"
                            value={localSettings.koGbBuyRate || ""}
                            onChange={handleSettingsChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-primary/50 outline-none"
                            placeholder="Örn: 1250"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">GB Satış Fiyatı (TL)</label>
                        <input
                            name="koGbSellRate"
                            value={localSettings.koGbSellRate || ""}
                            onChange={handleSettingsChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-primary/50 outline-none"
                            placeholder="Örn: 1380"
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button
                        onClick={handleSaveSettings}
                        disabled={saving}
                        className={cn("px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center gap-2", saveSuccess ? "bg-green-500" : "bg-primary")}
                    >
                        {saving ? <Loader2 className="animate-spin" size={16} /> : saveSuccess ? <Check size={16} /> : <Save size={16} />}
                        {saveSuccess ? "Güncellendi" : "Kurları Kaydet"}
                    </Button>
                </div>
            </div>

            {/* Items Section */}
            <div className="bg-[#0a100e] border border-white/10 p-6 md:p-8 rounded-2xl space-y-6 shadow-xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
                        <ShoppingCart size={18} className="text-primary" /> Zero İtem Pazarı
                    </h2>
                    <Button
                        onClick={() => { setIsAddingItem(true); setEditingItem(null); }}
                        className="bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg flex items-center gap-2 border border-white/10"
                    >
                        <Plus size={14} /> Yeni İlan Ekle
                    </Button>
                </div>

                {/* Item Form */}
                {isAddingItem && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl space-y-4">
                        <form onSubmit={handleItemSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-white/40 uppercase">İtem Adı</label>
                                    <input required value={formItem.name} onChange={e => setFormItem({ ...formItem, name: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-white/40 uppercase">Fiyat (TL)</label>
                                    <input required type="number" value={formItem.price} onChange={e => setFormItem({ ...formItem, price: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/40 uppercase">Açıklama</label>
                                <textarea value={formItem.description} onChange={e => setFormItem({ ...formItem, description: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm h-20 resize-none" />
                            </div>
                            <div className="flex flex-col md:flex-row gap-4 items-end">
                                <div className="flex-1 space-y-2">
                                    <label className="text-[10px] font-black text-white/40 uppercase">Resim URL</label>
                                    <div className="flex gap-2">
                                        <input value={formItem.image} onChange={e => setFormItem({ ...formItem, image: e.target.value })} className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white text-xs" />
                                        <label className="bg-white/5 hover:bg-white/10 p-2.5 rounded-lg border border-white/10 cursor-pointer">
                                            <ImageIcon size={18} className="text-white/40" />
                                            <input type="file" className="hidden" onChange={handleImageUpload} />
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-2 w-full md:w-auto">
                                    <Button type="button" variant="ghost" className="flex-1 text-white/40" onClick={() => setIsAddingItem(false)}>İptal</Button>
                                    <Button type="submit" className="flex-2 bg-primary text-white px-8" disabled={saving}>
                                        {saving ? <Loader2 className="animate-spin" /> : editingItem ? "Güncelle" : "Ekle"}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                )}

                {/* Items List */}
                {loading ? (
                    <div className="py-12 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {items.map(item => (
                            <div key={item.id} className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden group">
                                <div className="aspect-video relative overflow-hidden bg-black/40">
                                    <img src={item.image || "/logo.png"} alt={item.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => {
                                            setEditingItem(item);
                                            setFormItem({
                                                name: item.name,
                                                price: item.price.toString(),
                                                description: item.description,
                                                image: item.image,
                                                server: item.server,
                                                status: item.status as any
                                            });
                                            setIsAddingItem(true);
                                        }} className="p-2 bg-blue-500 rounded-lg text-white shadow-lg"><Edit size={14} /></button>
                                        <button onClick={() => handleDeleteItem(item.id)} className="p-2 bg-red-500 rounded-lg text-white shadow-lg"><Trash2 size={14} /></button>
                                    </div>
                                    <div className="absolute bottom-3 left-3 bg-primary/90 text-white text-[10px] font-black px-2 py-1 rounded">₺{item.price}</div>
                                </div>
                                <div className="p-4 space-y-1">
                                    <h4 className="font-bold text-white text-sm uppercase truncate">{item.name}</h4>
                                    <p className="text-[10px] text-white/20 line-clamp-2">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
