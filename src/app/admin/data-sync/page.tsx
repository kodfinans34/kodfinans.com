"use client";

import { useState, useEffect } from "react";
import { products } from "@/lib/products";
import { db } from "@/lib/firebase";
import { collection, doc, writeBatch } from "firebase/firestore";

export default function DataSyncPage() {
    const [status, setStatus] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [configCheck, setConfigCheck] = useState<any>(null);

    useEffect(() => {
        // Check if config is loaded (without showing secrets)
        setConfigCheck({
            apiKeyPresent: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        });
    }, []);

    const syncProducts = async () => {
        setLoading(true);
        setStatus("Başlıyor... Lütfen bekleyin.");

        try {
            console.log("Starting sync...");

            // Firestore 'undefined' değerleri sevmez. Veriyi temizlemek için JSON döngüsüne sokuyoruz.
            const sanitizedProducts = JSON.parse(JSON.stringify(products));

            const batch = writeBatch(db);

            sanitizedProducts.forEach((product: any) => {
                const productRef = doc(collection(db, "products"), product.id.toString());
                batch.set(productRef, product);
                console.log(`Product ${product.id} added to batch.`);
            });

            console.log("Committing batch...");
            await batch.commit();
            console.log("Batch committed.");

            setStatus(`✅ Başarılı! ${products.length} ürün Firestore'a yüklendi.`);
        } catch (error: any) {
            console.error("Sync Error:", error);
            setStatus(`❌ Hata oluştu: ${error.message || error.toString()}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-xl mx-auto bg-white text-black min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Veri Senkronizasyonu (Admin)</h1>

            <div className="mb-6 p-4 bg-gray-100 rounded text-sm font-mono">
                <p><strong>Config Kontrolü:</strong></p>
                <p>API Key Var mı: {configCheck?.apiKeyPresent ? "✅ Evet" : "❌ Hayır"}</p>
                <p>Project ID: {configCheck?.projectId || "❌ Yok"}</p>
            </div>

            <p className="mb-4 text-gray-700">
                Mevcut <strong>{products.length}</strong> ürünü Firestore veritabanına yüklemek için butona tıklayın.
                Bu işlem, 'products.ts' dosyasındaki verileri alıp Firestore'a yazar.
            </p>

            <button
                onClick={syncProducts}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-bold transition-colors"
            >
                {loading ? "Yükleniyor..." : "Ürünleri Firebase'e Aktar"}
            </button>

            {status && (
                <div className={`mt-6 p-4 rounded-lg border ${status.includes("Hata") ? "bg-red-50 border-red-200 text-red-800" : "bg-green-50 border-green-200 text-green-800"}`}>
                    <p className="whitespace-pre-wrap">{status}</p>
                </div>
            )}
        </div>
    );
}
