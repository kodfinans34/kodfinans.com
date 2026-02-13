"use client";

import React, { useState, useRef } from "react";
import { useSystem, Product } from "@/context/SystemContext";
import { Plus, Edit, Trash2, Search, X, Image as ImageIcon, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminBozumProductsPage() {
    const { products, addProduct, updateProduct, deleteProduct } = useSystem();
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Form State
    const [formData, setFormData] = useState<Partial<Product>>({
        name: "",
        slug: "",
        category: "gift",
        productType: "bozum",
        price: 0,
        discountPrice: 0,
        image: "",
        description: "",
        seoTitle: "",
        seoDescription: "",
        seoKeywords: "",
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setFormData(prev => ({ ...prev, image: base64String }));
            };
            reader.readAsDataURL(file);
        }
    };

    const filteredProducts = products
        .filter(p => p.productType === "bozum") // Filter for Bozum
        .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleOpenModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            const priceVal = typeof product.price === 'string' ? parseFloat(product.price) || 0 : product.price;
            setFormData({
                ...product,
                price: priceVal
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: "",
                slug: "",
                category: "gift",
                productType: "bozum",
                price: 0,
                discountPrice: 0,
                image: "/assets/products/placeholder.png",
                description: "",
                seoTitle: "",
                seoDescription: "",
                seoKeywords: "",
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic Validation
        if (!formData.name || !formData.slug || !formData.price || !formData.image) {
            alert("Lütfen zorunlu alanları doldurunuz.");
            return;
        }

        const productData = {
            ...formData,
            productType: "bozum" as const // Enforce bozum type
        };

        if (editingProduct) {
            updateProduct(editingProduct.id, productData);
        } else {
            addProduct(productData as Omit<Product, "id">);
        }
        setIsModalOpen(false);
    };

    // Auto-generate generic SEO if empty
    const handleGenerateSEO = () => {
        const name = formData.name || "";

        setFormData(prev => ({
            ...prev,
            seoTitle: prev.seoTitle || `${name} Bozum - Hızlı Nakite Çevir | KodFinans`,
            seoDescription: prev.seoDescription || `${name} kodlarınızı en yüksek oranlarla KodFinans'ta bozdurun. Hızlı ödeme ve güvenli işlem garantisi.`,
            seoKeywords: prev.seoKeywords || `${name} bozum, ${name} bozdurma, ${name} nakite çevirme`,
            seoImage: prev.seoImage || prev.image // Auto-fill with product image
        }));
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-3xl font-black text-white uppercase tracking-tight">Bozum Ürünleri Yönetimi</h1>
                <Button onClick={() => handleOpenModal()} className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-wider flex items-center gap-2">
                    <Plus size={18} /> Yeni Bozum Ürünü Ekle
                </Button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                <input
                    type="text"
                    placeholder="Bozum Ürünü Ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#08080a] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-[#08080a] border border-white/10 rounded-2xl p-4 group hover:border-white/20 transition-all">
                        <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-white/5">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-2 right-2 flex gap-2">
                                <button onClick={() => handleOpenModal(product)} className="p-2 bg-black/50 hover:bg-primary text-white rounded-lg backdrop-blur-md transition-all">
                                    <Edit size={16} />
                                </button>
                                <button onClick={() => { if (confirm("Ürünü silmek istediğinize emin misiniz?")) deleteProduct(product.id) }} className="p-2 bg-black/50 hover:bg-red-500 text-white rounded-lg backdrop-blur-md transition-all">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-1">{product.name}</h3>
                        <p className="text-white/40 text-xs mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Bozum Oranı</span>
                                <span className="text-white font-bold text-lg">{product.price}%</span>
                            </div>
                            <span className="px-3 py-1 bg-white/5 rounded-lg text-white/40 text-[10px] uppercase font-bold tracking-wider">
                                {product.category === 'gift' ? 'Hediye Kartı' : product.category === 'games' ? 'Oyun' : 'İtem'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#0f0f11] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0f0f11] z-10">
                            <h2 className="text-xl font-black text-white uppercase tracking-tight">
                                {editingProduct ? "Bozum Ürününü Düzenle" : "Yeni Bozum Ürünü Ekle"}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-8">

                            {/* Temel Bilgiler */}
                            <div className="space-y-4">
                                <h3 className="text-primary font-bold text-xs uppercase tracking-widest border-b border-white/5 pb-2">Temel Bilgiler</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-white/40 text-xs font-bold uppercase ml-2">Ürün Adı</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
                                            placeholder="Örn: Razer Gold Bozdurma"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-white/40 text-xs font-bold uppercase ml-2">Slug (URL)</label>
                                        <input
                                            type="text"
                                            value={formData.slug}
                                            onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
                                            placeholder="örn: razer-gold-bozdurma"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-white/40 text-xs font-bold uppercase ml-2">Bozum Oranı (%)</label>
                                        <input
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
                                            placeholder="Örn: 63"
                                        />
                                        <p className="text-xs text-white/20 ml-2">Buraya yazdığınız oran (örn: 63) site hesaplamalarında %63 olarak kullanılacaktır.</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-white/40 text-xs font-bold uppercase ml-2">Kategori</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
                                        >
                                            <option value="gift">Hediye Kartı</option>
                                            <option value="games">Oyun Parası</option>
                                            <option value="items">İtem & GB</option>
                                        </select>
                                    </div>

                                    <div className="col-span-full space-y-2">
                                        <label className="text-white/40 text-xs font-bold uppercase ml-2">Görsel (URL veya Yükle)</label>
                                        <div className="flex gap-4 items-center">
                                            <div className="flex-1 relative">
                                                <input
                                                    type="text"
                                                    value={formData.image}
                                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none pr-12"
                                                    placeholder="Görsel URL'si yapıştırın veya yükleyin..."
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors"
                                                    title="Görsel Yükle"
                                                >
                                                    <ImageIcon size={18} />
                                                </button>
                                            </div>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                            />
                                            <div
                                                className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 shrink-0 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity relative group"
                                                onClick={() => fileInputRef.current?.click()}
                                                title="Değiştirmek için tıkla"
                                            >
                                                {formData.image ? (
                                                    <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-white/20">
                                                        <Plus size={20} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-full space-y-2">
                                        <label className="text-white/40 text-xs font-bold uppercase ml-2">Açıklama</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none h-32 resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* SEO Ayarları */}
                            <div className="space-y-4 pt-4 border-t border-white/5">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-primary font-bold text-xs uppercase tracking-widest">SEO Ayarları</h3>
                                    <button type="button" onClick={handleGenerateSEO} className="text-[10px] font-bold uppercase text-white/40 hover:text-white bg-white/5 px-2 py-1 rounded transition-colors">
                                        Otomatik Doldur
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-white/40 text-xs font-bold uppercase ml-2">Sayfa Başlığı (Title)</label>
                                        <input
                                            type="text"
                                            value={formData.seoTitle}
                                            onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-white/40 text-xs font-bold uppercase ml-2">Meta Açıklama (Description)</label>
                                        <textarea
                                            value={formData.seoDescription}
                                            onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none h-24 resize-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-white/40 text-xs font-bold uppercase ml-2">Anahtar Kelimeler (Keywords)</label>
                                        <input
                                            type="text"
                                            value={formData.seoKeywords}
                                            onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-white/40 text-xs font-bold uppercase ml-2">SEO Görseli (Opsiyonel)</label>
                                        <div className="flex gap-4">
                                            <input
                                                type="text"
                                                value={formData.seoImage || ""}
                                                onChange={(e) => setFormData({ ...formData, seoImage: e.target.value })}
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
                                                placeholder="Varsayılan: Ürün Görseli"
                                            />
                                            {formData.seoImage && (
                                                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 shrink-0 overflow-hidden">
                                                    <img src={formData.seoImage} className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                                <Button type="button" onClick={() => setIsModalOpen(false)} className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-bold uppercase text-xs">
                                    İptal
                                </Button>
                                <Button type="submit" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-bold uppercase text-xs">
                                    Kaydet
                                </Button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
