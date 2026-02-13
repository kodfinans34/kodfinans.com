"use client";

import React, { useState, useRef } from "react";
import { useSystem, Product } from "@/context/SystemContext";
import { Plus, Edit, Trash2, Search, X, Image as ImageIcon, Save, Globe, Settings, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function AdminProductsPage() {
    const { products, addProduct, updateProduct, deleteProduct } = useSystem();
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [expandedVariant, setExpandedVariant] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState<Partial<Product>>({
        name: "",
        slug: "",
        category: "gift",
        productType: "satis",
        price: 0,
        discountPrice: 0,
        image: "",
        description: "",
        seoTitle: "",
        seoDescription: "",
        seoKeywords: "",
        variants: [],
        features: [],
        howToUse: ""
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
        .filter(p => !p.productType || p.productType === "satis") // Filter for Sales
        .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleOpenModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                ...product,
                price: typeof product.price === 'string' ? 0 : product.price
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: "",
                slug: "",
                category: "gift",
                productType: "satis",
                price: 0,
                discountPrice: 0,
                image: "/assets/products/placeholder.png",
                description: "",
                seoTitle: "",
                seoDescription: "",
                seoKeywords: "",
                variants: [],
                features: [],
                howToUse: ""
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

        if (editingProduct) {
            updateProduct(editingProduct.id, formData);
        } else {
            // Generate ID in context, just pass Omit<Product, "id">
            addProduct(formData as Omit<Product, "id">);
        }
        setIsModalOpen(false);
    };

    // Auto-generate generic SEO if empty
    const handleGenerateSEO = () => {
        const name = formData.name || "";

        setFormData(prev => {
            // Auto generate for product
            const newProduct = {
                ...prev,
                seoTitle: prev.seoTitle || `${name} Satın Al | KodFinans`,
                seoDescription: prev.seoDescription || `${name} en uygun fiyatlarla KodFinans'ta. Hemen ${name} satın al, anında teslimat fırsatını kaçırma.`,
                seoKeywords: prev.seoKeywords || `${name}, ${name} satın al, ${name} fiyatları, ucuz ${name}`,
                seoImage: prev.seoImage || prev.image
            };

            // Auto generate for variants
            if (newProduct.variants && newProduct.variants.length > 0) {
                newProduct.variants = newProduct.variants.map(v => ({
                    ...v,
                    slug: v.slug || `${v.name.toLowerCase().replace(/ /g, "-").replace(/[^a-z0-9-]/g, "")}-satin-al`,
                    seoTitle: v.seoTitle || `${v.name} Satın Al | KodFinans`,
                    seoDescription: v.seoDescription || `${v.name} en uygun fiyat ve anında teslimat garantisiyle KodFinans'ta.`
                }));
            }

            return newProduct;
        });
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-3xl font-black text-white uppercase tracking-tight">Ürün Yönetimi</h1>
                <Button onClick={() => handleOpenModal()} className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-wider flex items-center gap-2">
                    <Plus size={18} /> Yeni Ürün Ekle
                </Button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                <input
                    type="text"
                    placeholder="Ürün Ara..."
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
                                {product.discountPrice ? (
                                    <>
                                        <span className="text-white/40 line-through text-xs">₺{product.price}</span>
                                        <span className="text-primary font-bold text-lg">₺{product.discountPrice}</span>
                                    </>
                                ) : (
                                    <span className="text-white font-bold text-lg">₺{product.price}</span>
                                )}
                            </div>
                            <span className="px-3 py-1 bg-white/5 rounded-lg text-white/40 text-[10px] uppercase font-bold tracking-wider">
                                {product.variants?.length || product.games?.length || 0} Paket
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
                                {editingProduct ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
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
                                            placeholder="Örn: Razer Gold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-white/40 text-xs font-bold uppercase ml-2">Slug (URL)</label>
                                        <input
                                            type="text"
                                            value={formData.slug}
                                            onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
                                            placeholder="rn: razer-gold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-white/40 text-xs font-bold uppercase ml-2">Fiyat (Başlangıç)</label>
                                        <input
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-white/40 text-xs font-bold uppercase ml-2">İndirimli Fiyat (Opsiyonel)</label>
                                        <input
                                            type="number"
                                            value={formData.discountPrice}
                                            onChange={(e) => setFormData({ ...formData, discountPrice: parseFloat(e.target.value) })}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
                                        />
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
                                        <label className="text-white/40 text-xs font-bold uppercase ml-2">Açıklama</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none h-32 resize-none"
                                        />
                                    </div>
                                    <div className="col-span-full space-y-2">
                                        <label className="text-white/40 text-xs font-bold uppercase ml-2">Nasıl Kullanılır?</label>
                                        <textarea
                                            value={formData.howToUse}
                                            onChange={(e) => setFormData({ ...formData, howToUse: e.target.value })}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none h-32 resize-none"
                                            placeholder="Ürünün nasıl kullanacağını açıklayın..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Paketler (Variants) */}
                            <div className="space-y-4 pt-4 border-t border-white/5">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-primary font-bold text-xs uppercase tracking-widest">Paketler (Varyantlar)</h3>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({
                                            ...formData,
                                            variants: [...(formData.variants || []), { id: Date.now().toString(), name: "", price: 0, description: "" }]
                                        })}
                                        className="text-[10px] font-bold uppercase text-white hover:text-primary bg-white/5 px-2 py-1 rounded transition-colors flex items-center gap-1"
                                    >
                                        <Plus size={10} /> Paket Ekle
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {(formData.variants || []).map((variant, idx) => (
                                        <div key={variant.id} className="space-y-3 p-4 bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden transition-all">
                                            <div className="flex flex-col md:flex-row gap-4 items-center">
                                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                                                    <input
                                                        placeholder="Paket Adı (Örn: 300 VP)"
                                                        value={variant.name}
                                                        onChange={(e) => {
                                                            const newVariants = [...(formData.variants || [])];
                                                            newVariants[idx] = { ...variant, name: e.target.value };
                                                            setFormData({ ...formData, variants: newVariants });
                                                        }}
                                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary outline-none"
                                                    />
                                                    <div className="relative group">
                                                        <input
                                                            type="number"
                                                            placeholder="Fiyat"
                                                            value={variant.price}
                                                            onChange={(e) => {
                                                                const newVariants = [...(formData.variants || [])];
                                                                newVariants[idx] = { ...variant, price: parseFloat(e.target.value) };
                                                                setFormData({ ...formData, variants: newVariants });
                                                            }}
                                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary outline-none"
                                                        />
                                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white/20">TRY</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => setExpandedVariant(expandedVariant === variant.id ? null : variant.id)}
                                                        className={cn(
                                                            "p-2.5 rounded-xl transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider",
                                                            expandedVariant === variant.id ? "bg-primary text-white" : "bg-white/5 text-white/40 hover:text-white"
                                                        )}
                                                    >
                                                        {expandedVariant === variant.id ? <ChevronUp size={14} /> : <Globe size={14} />}
                                                        {expandedVariant === variant.id ? "Kapat" : "SEO/Detay"}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newVariants = (formData.variants || []).filter((_, i) => i !== idx);
                                                            setFormData({ ...formData, variants: newVariants });
                                                        }}
                                                        className="p-2.5 bg-red-500/10 hover:bg-red-500 text-red-500/50 hover:text-white rounded-xl transition-all"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Toplu SEO ve Detay Section */}
                                            {expandedVariant === variant.id && (
                                                <div className="pt-4 mt-4 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold text-white/20 uppercase ml-2">Paket Slug (URL)</label>
                                                        <input
                                                            placeholder="Örn: 300-vp-satin-al"
                                                            value={variant.slug || ""}
                                                            onChange={(e) => {
                                                                const newVariants = [...(formData.variants || [])];
                                                                newVariants[idx] = { ...variant, slug: e.target.value };
                                                                setFormData({ ...formData, variants: newVariants });
                                                            }}
                                                            className="w-full bg-black/60 border border-white/5 rounded-xl px-4 py-2.5 text-[11px] text-white outline-none focus:border-primary/30"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold text-white/20 uppercase ml-2">SEO Title</label>
                                                        <input
                                                            placeholder="Google'da görünecek başlık"
                                                            value={variant.seoTitle || ""}
                                                            onChange={(e) => {
                                                                const newVariants = [...(formData.variants || [])];
                                                                newVariants[idx] = { ...variant, seoTitle: e.target.value };
                                                                setFormData({ ...formData, variants: newVariants });
                                                            }}
                                                            className="w-full bg-black/60 border border-white/5 rounded-xl px-4 py-2.5 text-[11px] text-white outline-none focus:border-primary/30"
                                                        />
                                                    </div>
                                                    <div className="md:col-span-2 space-y-2">
                                                        <label className="text-[10px] font-bold text-white/20 uppercase ml-2">SEO Description (Indexleme İçin)</label>
                                                        <textarea
                                                            placeholder="Google aramalarında çıkacak paket açıklaması..."
                                                            value={variant.seoDescription || ""}
                                                            onChange={(e) => {
                                                                const newVariants = [...(formData.variants || [])];
                                                                newVariants[idx] = { ...variant, seoDescription: e.target.value };
                                                                setFormData({ ...formData, variants: newVariants });
                                                            }}
                                                            className="w-full bg-black/60 border border-white/5 rounded-xl px-4 py-2.5 text-[11px] text-white outline-none focus:border-primary/30 h-16 resize-none"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Özellikler (Features) */}
                            <div className="space-y-4 pt-4 border-t border-white/5">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-primary font-bold text-xs uppercase tracking-widest">Özellikler (Sidebar)</h3>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({
                                            ...formData,
                                            features: [...(formData.features || []), { key: "", value: "" }]
                                        })}
                                        className="text-[10px] font-bold uppercase text-white hover:text-primary bg-white/5 px-2 py-1 rounded transition-colors flex items-center gap-1"
                                    >
                                        <Plus size={10} /> Özellik Ekle
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {(formData.features || []).map((feature, idx) => (
                                        <div key={idx} className="flex gap-2 group">
                                            <input
                                                placeholder="Key (Örn: Bölge)"
                                                value={feature.key}
                                                onChange={(e) => {
                                                    const newFeatures = [...(formData.features || [])];
                                                    newFeatures[idx] = { ...feature, key: e.target.value };
                                                    setFormData({ ...formData, features: newFeatures });
                                                }}
                                                className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/60 focus:border-primary outline-none"
                                            />
                                            <input
                                                placeholder="Değer (Örn: TR)"
                                                value={feature.value}
                                                onChange={(e) => {
                                                    const newFeatures = [...(formData.features || [])];
                                                    newFeatures[idx] = { ...feature, value: e.target.value };
                                                    setFormData({ ...formData, features: newFeatures });
                                                }}
                                                className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-primary outline-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newFeatures = (formData.features || []).filter((_, i) => i !== idx);
                                                    setFormData({ ...formData, features: newFeatures });
                                                }}
                                                className="text-white/10 hover:text-red-500 transition-colors"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
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
                                            placeholder="Örn: Razer Gold Satın Al - En Ucuz Fiyatlar"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-white/40 text-xs font-bold uppercase ml-2">Meta Açıklama (Description)</label>
                                        <textarea
                                            value={formData.seoDescription}
                                            onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none h-24 resize-none"
                                            placeholder="Sayfa içeriğini özetleyen kısa açıklama..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-white/40 text-xs font-bold uppercase ml-2">Anahtar Kelimeler (Keywords)</label>
                                        <input
                                            type="text"
                                            value={formData.seoKeywords}
                                            onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
                                            placeholder="Virgülle ayırarak giriniz"
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
