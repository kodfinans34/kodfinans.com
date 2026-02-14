"use client";

import React, { useState, useRef } from "react";
import { useSystem, BlogPost } from "@/context/SystemContext";
import { Plus, Edit, Trash2, Search, X, Image as ImageIcon, Save, AlignLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminBlogPage() {
    const { blogs, addBlog, updateBlog, deleteBlog } = useSystem();
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

    // Form State
    const [formData, setFormData] = useState<Partial<BlogPost>>({
        title: "",
        slug: "",
        content: "",
        image: "",
        category: "Rehber",
        date: new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }),
        author: "KodFinans Ekibi",
        readTime: "5 dk",
        seoTitle: "",
        seoDescription: "",
        seoKeywords: "",
    });

    const fileInputRef = useRef<HTMLInputElement>(null);


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 500 * 1024) { // 500KB limit
                alert("Görsel boyutu çok yüksek! Lütfen 500KB altında bir görsel yükleyiniz. (Firestore limiti)");
                e.target.value = ""; // Reset input
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setFormData(prev => ({ ...prev, image: base64String }));
            };
            reader.readAsDataURL(file);
        }
    };

    const filteredBlogs = blogs
        .filter(b => b.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleOpenModal = (blog?: BlogPost) => {
        if (blog) {
            setEditingBlog(blog);
            setFormData(blog);
        } else {
            setEditingBlog(null);
            setFormData({
                title: "",
                slug: "",
                content: "",
                image: "/assets/blog/placeholder.jpg",
                category: "Rehber",
                date: new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }),
                author: "KodFinans Ekibi",
                readTime: "5 dk",
                seoTitle: "",
                seoDescription: "",
                seoKeywords: "",
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.slug || !formData.content) {
            alert("Lütfen zorunlu alanları doldurunuz.");
            return;
        }

        try {
            if (editingBlog) {
                await updateBlog(editingBlog.id, formData);
            } else {
                await addBlog(formData as Omit<BlogPost, "id">);
            }
            setIsModalOpen(false);
        } catch (error: any) {
            console.error(error);
            alert("Blog yazısı kaydedilirken bir hata oluştu: " + (error.message || error));
        }
    };

    const handleGenerateSEO = () => {
        const title = formData.title || "";
        setFormData(prev => ({
            ...prev,
            seoTitle: prev.seoTitle || `${title} | KodFinans Blog`,
            seoDescription: prev.seoDescription || prev.content?.slice(0, 150) + "...",
            seoKeywords: prev.seoKeywords || `${title}, e-pin, bozum, rehber`,
        }));
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-3xl font-black text-white uppercase tracking-tight">Blog Yönetimi</h1>
                <Button onClick={() => handleOpenModal()} className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-wider flex items-center gap-2">
                    <Plus size={18} /> Yeni Yazı Ekle
                </Button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                <input
                    type="text"
                    placeholder="Blog Yazısı Ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#08080a] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                />
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                    <div key={blog.id} className="bg-[#08080a] border border-white/10 rounded-2xl p-4 group hover:border-white/20 transition-all flex flex-col h-full">
                        <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-white/5">
                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-2 right-2 flex gap-2">
                                <button onClick={() => handleOpenModal(blog)} className="p-2 bg-black/50 hover:bg-primary text-white rounded-lg backdrop-blur-md transition-all">
                                    <Edit size={16} />
                                </button>
                                <button onClick={() => { if (confirm("Yazıyı silmek istediğinize emin misiniz?")) deleteBlog(blog.id) }} className="p-2 bg-black/50 hover:bg-red-500 text-white rounded-lg backdrop-blur-md transition-all">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className="absolute bottom-2 left-2">
                                <span className="bg-black/50 backdrop-blur-md text-white border border-white/10 px-2 py-1 rounded text-[10px] uppercase font-bold">
                                    {blog.category}
                                </span>
                            </div>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{blog.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-white/40 mb-4">
                            <span>{blog.date}</span>
                            <span>•</span>
                            <span>{blog.readTime} okuma</span>
                        </div>
                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
                            <span>{blog.author}</span>
                            <span className="truncate max-w-[100px]">{blog.slug}</span>
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
                                {editingBlog ? "Yazıyı Düzenle" : "Yeni Yazı Ekle"}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="col-span-full space-y-2">
                                    <label className="text-white/40 text-xs font-bold uppercase ml-2">Başlık</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
                                        placeholder="Blog Başlığı"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-white/40 text-xs font-bold uppercase ml-2">Slug (URL)</label>
                                    <input
                                        type="text"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
                                        placeholder="url-adresi"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-white/40 text-xs font-bold uppercase ml-2">Kategori</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
                                    >
                                        <option value="Rehber">Rehber</option>
                                        <option value="Eğitim">Eğitim</option>
                                        <option value="Finans">Finans</option>
                                        <option value="Güvenlik">Güvenlik</option>
                                        <option value="Analiz">Analiz</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-white/40 text-xs font-bold uppercase ml-2">Yazar</label>
                                    <input
                                        type="text"
                                        value={formData.author}
                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-white/40 text-xs font-bold uppercase ml-2">Okuma Süresi</label>
                                    <input
                                        type="text"
                                        value={formData.readTime}
                                        onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
                                    />
                                </div>

                                {/* Image Upload */}
                                <div className="col-span-full space-y-2">
                                    <label className="text-white/40 text-xs font-bold uppercase ml-2">Kapak Görseli</label>
                                    <div className="flex gap-4 items-center">
                                        <div className="flex-1 relative">
                                            <input
                                                type="text"
                                                value={formData.image}
                                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none pr-12"
                                                placeholder="Görsel URL veya Yükle..."
                                            />
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors"
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
                                            className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 shrink-0 overflow-hidden cursor-pointer"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            {formData.image && <img src={formData.image} className="w-full h-full object-cover" />}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full space-y-2">
                                    <label className="text-white/40 text-xs font-bold uppercase ml-2">İçerik (HTML Destekli)</label>
                                    <textarea
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none h-64 font-mono text-sm"
                                        placeholder="<p>Blog yazınızı buraya HTML formatında girebilirsiniz...</p>"
                                    />
                                </div>
                            </div>

                            {/* SEO */}
                            <div className="space-y-4 pt-4 border-t border-white/5">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-primary font-bold text-xs uppercase tracking-widest">SEO Ayarları</h3>
                                    <button type="button" onClick={handleGenerateSEO} className="text-[10px] font-bold uppercase text-white/40 hover:text-white bg-white/5 px-2 py-1 rounded transition-colors">
                                        Otomatik Doldur
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-white/40 text-xs font-bold uppercase ml-2">SEO Başlık</label>
                                    <input
                                        type="text"
                                        value={formData.seoTitle}
                                        onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-white/40 text-xs font-bold uppercase ml-2">Meta Açıklama</label>
                                    <input
                                        type="text"
                                        value={formData.seoDescription}
                                        onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
                                    />
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
