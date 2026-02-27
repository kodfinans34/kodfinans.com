"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, doc, writeBatch, getDocs, deleteDoc } from "firebase/firestore";
import { seedAllProducts, allSeedProducts } from "@/lib/seed-products";
import { Button } from "@/components/ui/Button";
import { Loader2, CheckCircle, AlertCircle, Database, Package, Trash2, RefreshCw } from "lucide-react";

export default function DataSyncPage() {
    const [seedLoading, setSeedLoading] = useState(false);
    const [seedStatus, setSeedStatus] = useState<string>("");
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteStatus, setDeleteStatus] = useState<string>("");
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);
    const [resetStatus, setResetStatus] = useState<string>("");
    const [resetConfirm, setResetConfirm] = useState(false);
    const [configCheck, setConfigCheck] = useState<any>(null);

    useEffect(() => {
        setConfigCheck({
            apiKeyPresent: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        });
    }, []);

    const handleDeleteAllProducts = async () => {
        if (!deleteConfirm) {
            setDeleteConfirm(true);
            setTimeout(() => setDeleteConfirm(false), 5000);
            return;
        }
        setDeleteConfirm(false);

        setDeleteLoading(true);
        setDeleteStatus("Ürünler siliniyor...");

        try {
            const productsRef = collection(db, "products");
            const snapshot = await getDocs(productsRef);

            let deleted = 0;
            for (const docSnap of snapshot.docs) {
                await deleteDoc(doc(db, "products", docSnap.id));
                deleted++;
            }

            setDeleteStatus(`✅ Tamamlandı! ${deleted} ürün Firebase'den silindi.`);
        } catch (error: any) {
            setDeleteStatus(`❌ Hata: ${error.message}`);
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleSeedProducts = async () => {
        setSeedLoading(true);
        setSeedStatus("Ürünler Firebase'e ekleniyor...");

        try {
            const result = await seedAllProducts();
            setSeedStatus(`✅ Tamamlandı! ${result.success}/${result.total} ürün başarıyla eklendi.${result.failed > 0 ? ` ❌ ${result.failed} ürün eklenemedi.` : ""}`);
        } catch (error: any) {
            setSeedStatus(`❌ Hata: ${error.message}`);
        } finally {
            setSeedLoading(false);
        }
    };

    const handleResetAndReseed = async () => {
        if (!resetConfirm) {
            setResetConfirm(true);
            setTimeout(() => setResetConfirm(false), 5000);
            return;
        }
        setResetConfirm(false);

        setResetLoading(true);
        setResetStatus("Adım 1/2: Eski ürünler siliniyor...");

        try {
            // Step 1: Delete all existing products
            const productsRef = collection(db, "products");
            const snapshot = await getDocs(productsRef);

            let deleted = 0;
            for (const docSnap of snapshot.docs) {
                await deleteDoc(doc(db, "products", docSnap.id));
                deleted++;
            }

            setResetStatus(`Adım 1/2 tamamlandı! ${deleted} eski ürün silindi. Yeni ürünler yükleniyor...`);

            // Step 2: Seed new products
            const result = await seedAllProducts();
            setResetStatus(`✅ Tamamlandı! ${deleted} eski ürün silindi, ${result.success}/${result.total} yeni ürün eklendi.`);
        } catch (error: any) {
            setResetStatus(`❌ Hata: ${error.message}`);
        } finally {
            setResetLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black text-white uppercase tracking-tight">Veri Yönetimi</h1>
                <p className="text-white/30 text-xs font-bold uppercase tracking-wider mt-1">Firebase veritabanı ürün yönetimi</p>
            </div>

            {/* Config Check */}
            <div className="bg-[#0a100e] border border-white/10 rounded-2xl p-6 space-y-3">
                <h3 className="text-white font-bold text-sm flex items-center gap-2"><Database size={16} className="text-primary" /> Config Kontrolü</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        {configCheck?.apiKeyPresent ? <CheckCircle size={14} className="text-green-400" /> : <AlertCircle size={14} className="text-red-400" />}
                        <span className="text-white/60">API Key: {configCheck?.apiKeyPresent ? "Mevcut" : "Yok"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {configCheck?.projectId ? <CheckCircle size={14} className="text-green-400" /> : <AlertCircle size={14} className="text-red-400" />}
                        <span className="text-white/60">Project: {configCheck?.projectId || "Yok"}</span>
                    </div>
                </div>
            </div>

            {/* Reset & Reseed - Primary Action */}
            <div className="bg-[#0a100e] border border-primary/30 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                    <RefreshCw size={20} className="text-primary" />
                    <div>
                        <h3 className="text-white font-bold text-sm">Sıfırla & Yeniden Yükle (Önerilen)</h3>
                        <p className="text-white/30 text-xs">Tüm eski ürünleri siler ve {allSeedProducts.length} güncel ürünü yeniden yükler.</p>
                    </div>
                </div>

                <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
                    <p className="text-white/40 text-xs leading-relaxed">
                        Bu işlem: <strong className="text-primary">1)</strong> Tüm eski/hatalı ürünleri temizler → <strong className="text-primary">2)</strong> {allSeedProducts.length} adet güncel ürünü ekler
                    </p>
                    <ul className="text-white/30 text-xs mt-2 space-y-1 list-disc list-inside">
                        <li>3 Bozum Ürünü (Razer Gold, iTunes, Google Play)</li>
                        <li>2 Xbox + 5 PlayStation Hediye Çeki</li>
                        <li>2 PUBG Mobile + 8 Google Play Kodu</li>
                        <li>1 GeForce NOW + 3 Metin2 + 1 Razer Gold Satış</li>
                        <li>3 Legend Online + 3 Legend Reborn + 7 Knight Online</li>
                    </ul>
                </div>

                <Button
                    onClick={handleResetAndReseed}
                    disabled={resetLoading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {resetLoading ? <Loader2 size={18} className="animate-spin" /> : <RefreshCw size={18} />}
                    {resetLoading ? "İşlem Devam Ediyor..." : resetConfirm ? "⚠️ Emin Misin? Tekrar Tıkla!" : "Sıfırla & Yeniden Yükle"}
                </Button>

                {resetStatus && (
                    <div className={`p-4 rounded-xl border text-sm ${resetStatus.includes("Hata") ? "bg-red-500/10 border-red-500/20 text-red-400" : resetStatus.includes("✅") ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-blue-500/10 border-blue-500/20 text-blue-400"}`}>
                        {resetStatus}
                    </div>
                )}
            </div>

            {/* Individual Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Delete All */}
                <div className="bg-[#0a100e] border border-red-500/20 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center gap-3">
                        <Trash2 size={20} className="text-red-400" />
                        <div>
                            <h3 className="text-white font-bold text-sm">Tüm Ürünleri Sil</h3>
                            <p className="text-white/30 text-xs">Firebase'deki tüm ürünleri kalıcı olarak siler.</p>
                        </div>
                    </div>

                    <Button
                        onClick={handleDeleteAllProducts}
                        disabled={deleteLoading}
                        className="w-full py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 font-bold uppercase text-xs flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {deleteLoading ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                        {deleteLoading ? "Siliniyor..." : deleteConfirm ? "⚠️ Emin Misin? Tekrar Tıkla!" : "Tümünü Sil"}
                    </Button>

                    {deleteStatus && (
                        <div className={`p-3 rounded-xl border text-xs ${deleteStatus.includes("Hata") ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-green-500/10 border-green-500/20 text-green-400"}`}>
                            {deleteStatus}
                        </div>
                    )}
                </div>

                {/* Seed Only */}
                <div className="bg-[#0a100e] border border-white/10 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center gap-3">
                        <Package size={20} className="text-primary" />
                        <div>
                            <h3 className="text-white font-bold text-sm">Sadece Ürün Ekle</h3>
                            <p className="text-white/30 text-xs">{allSeedProducts.length} ürünü mevcut verilere ekler (silmeden).</p>
                        </div>
                    </div>

                    <Button
                        onClick={handleSeedProducts}
                        disabled={seedLoading}
                        className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white font-bold uppercase text-xs flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {seedLoading ? <Loader2 size={14} className="animate-spin" /> : <Package size={14} />}
                        {seedLoading ? "Yükleniyor..." : "Ürünleri Ekle"}
                    </Button>

                    {seedStatus && (
                        <div className={`p-3 rounded-xl border text-xs ${seedStatus.includes("Hata") ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-green-500/10 border-green-500/20 text-green-400"}`}>
                            {seedStatus}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
