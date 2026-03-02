"use client";

import React, { useState, useEffect } from "react";
import { UploadCloud, Image as ImageIcon, Copy, CheckCircle2, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { uploadFile } from "@/lib/upload";

interface UploadedImage {
    name: string;
    url: string;
    fullPath: string;
}

export default function GalleryPage() {
    const [images, setImages] = useState<UploadedImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/gallery");
            if (!response.ok) {
                throw new Error("Resimler alınamadı.");
            }
            const data = await response.json();
            setImages(data || []);
        } catch (error: any) {
            console.error("Error fetching images:", error);
            setError(error?.message || "Bilinmeyen bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setUploadProgress(50); // Just a visual indicator

        try {
            const url = await uploadFile(file, "");

            // Add to the top of the list
            setImages(prev => [{
                name: file.name,
                fullPath: url.split("/").pop() || file.name,
                url: url
            }, ...prev]);
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Resim yüklenirken bir hata oluştu.");
        } finally {
            setUploading(false);
            setUploadProgress(0);
            if (e.target) e.target.value = '';
        }
    };

    const handleDelete = async (fullPath: string) => {
        if (!confirm("Bu resmi silmek istediğinize emin misiniz? Kullanıldığı sayfalarda kırık görünebilir.")) return;

        try {
            const response = await fetch(`/api/gallery?file=${encodeURIComponent(fullPath)}`, {
                method: "DELETE"
            });

            if (!response.ok) throw new Error("Silinemedi");

            setImages(prev => prev.filter(img => img.fullPath !== fullPath));
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Resim silinirken bir hata oluştu.");
        }
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        setCopiedUrl(url);
        setTimeout(() => setCopiedUrl(null), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                        <ImageIcon className="text-primary" /> Medya Galerisi
                    </h1>
                    <p className="text-white/40 text-sm mt-1">İlanlar veya blog yazıları için resim yükleyip linklerini alabilirsiniz.</p>
                </div>

                <div className="relative">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={uploading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                    />
                    <Button disabled={uploading} className="bg-gradient-to-r from-primary to-blue-500 text-white font-bold h-10 px-6 uppercase text-[11px] tracking-widest relative">
                        {uploading ? (
                            <>
                                <Loader2 size={16} className="mr-2 animate-spin" /> YÜKLENİYOR %{Math.round(uploadProgress)}
                            </>
                        ) : (
                            <>
                                <UploadCloud size={16} className="mr-2" /> YENİ RESİM YÜKLE
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32 bg-[#0a100e]/50 border border-white/5 rounded-3xl">
                    <Loader2 size={32} className="text-primary animate-spin mb-4" />
                    <p className="text-white/40 text-sm">Yüklenen resimler aranıyor...</p>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center py-24 bg-[#0a100e]/50 border border-red-500/20 rounded-3xl">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-4">
                        <Trash2 size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Bağlantı Hatası</h3>
                    <p className="text-white/40 text-sm max-w-sm text-center mb-6">
                        {error}
                    </p>
                    <Button onClick={fetchImages} className="bg-white/10 hover:bg-white/20 text-white">
                        Tekrar Dene
                    </Button>
                </div>
            ) : images.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 bg-[#0a100e]/50 border border-white/5 rounded-3xl">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/20 mb-4">
                        <ImageIcon size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Henüz Resim Yüklemediniz</h3>
                    <p className="text-white/40 text-sm max-w-sm text-center">
                        Sağ üstteki butondan ilk resminizi yükleyin. Yüklediğiniz resmin URL&apos;sini kopyalayıp ilanlarınızda kullanabilirsiniz.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {images.map((img) => (
                        <div key={img.fullPath} className="bg-[#0a100e] border border-white/5 rounded-2xl overflow-hidden group hover:border-primary/20 transition-all flex flex-col relative">
                            <div className="aspect-square bg-black/40 relative flex items-center justify-center p-4">
                                <img src={img.url} alt={img.name} className="max-w-full max-h-full object-contain" />

                                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 gap-3">
                                    <Button
                                        size="sm"
                                        className={copiedUrl === img.url ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-primary text-white"}
                                        onClick={() => copyToClipboard(img.url)}
                                    >
                                        {copiedUrl === img.url ? (
                                            <><CheckCircle2 size={14} className="mr-2" /> Kopyalandı</>
                                        ) : (
                                            <><Copy size={14} className="mr-2" /> Linki Kopyala</>
                                        )}
                                    </Button>

                                    <button
                                        onClick={() => handleDelete(img.fullPath)}
                                        className="h-8 px-3 rounded-lg bg-red-500/10 text-red-500 text-xs font-bold hover:bg-red-500 hover:text-white transition-colors flex items-center"
                                    >
                                        <Trash2 size={12} className="mr-1.5" /> Resmi Sil
                                    </button>
                                </div>
                            </div>
                            <div className="p-3 border-t border-white/5 bg-white/[0.02]">
                                <p className="text-[10px] text-white/50 truncate font-medium" title={img.name}>{img.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
