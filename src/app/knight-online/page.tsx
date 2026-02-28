"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useSystem } from "@/context/SystemContext";
import { ShieldCheck, Zap, Coins, ShoppingCart, Search, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getKOItems, KnightOnlineItem } from "@/lib/firebase-ko";
import { motion } from "framer-motion";

export default function KnightOnlinePage() {
    const { settings } = useSystem();
    const [items, setItems] = useState<KnightOnlineItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const loadItems = async () => {
            const data = await getKOItems();
            setItems(data.filter(i => i.status === "active"));
            setLoading(false);
        };
        loadItems();
    }, []);

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background flex flex-col items-center">
            <Navbar />

            {/* Header / Hero */}
            <section className="relative w-full pt-32 pb-20 overflow-hidden">
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full mix-blend-screen animate-pulse pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 w-full text-center space-y-6 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-primary text-xs font-black tracking-widest uppercase mb-6 mx-auto">
                        <Zap size={14} fill="currentColor" /> KODFİNANS GÜVENCESİYLE
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black font-inter tracking-tighter uppercase italic text-white leading-tight">
                        KNIGHT ONLINE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">ZERO SUNUCUSU</span>
                    </h1>
                    <p className="text-white/40 text-lg max-w-2xl mx-auto font-medium">
                        Zero sunucusunda en iyi Gold Bar (GB) alışveriş kurları ve güvenilir İtem Pazarı. İşlemlerinizi saniyeler içinde anında gerçekleştirin.
                    </p>
                </div>
            </section>

            {/* GB Buy/Sell Rates */}
            <section className="w-full max-w-7xl mx-auto px-4 mb-20">
                <h2 className="text-2xl font-black uppercase italic text-white mb-8 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Coins size={20} />
                    </div>
                    GB Alım Satım Kurları
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Alış */}
                    <div className="bg-[#0a100e] border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Coins size={120} />
                        </div>
                        <div className="relative z-10">
                            <p className="text-sm font-black text-white/40 uppercase tracking-widest mb-1">BİZ ALIYORUZ (100M)</p>
                            <p className="text-xs text-white/30 font-bold mb-2">10M = ₺{(Number(settings.koGbBuyRate) / 10).toFixed(2)}</p>
                            <p className="text-5xl font-black text-white italic mb-6">₺{settings.koGbBuyRate || "435"}</p>

                            <a
                                href={`https://wa.me/${settings.whatsappNumber?.replace(/\D/g, '')}?text=Merhaba, Knight Online Zero GB satmak istiyorum.`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="w-full md:w-auto h-10 px-6 bg-white/5 hover:bg-primary text-white font-black uppercase tracking-widest transition-all text-[10px]">
                                    BİZE SAT <ArrowRight size={14} className="ml-2" />
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/* Satış */}
                    <div className="bg-[#0a100e] border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Zap size={120} />
                        </div>
                        <div className="relative z-10">
                            <p className="text-sm font-black text-white/40 uppercase tracking-widest mb-1">BİZ SATIYORUZ (100M)</p>
                            <p className="text-xs text-white/30 font-bold mb-2">10M = ₺{(Number(settings.koGbSellRate) / 10).toFixed(2)}</p>
                            <p className="text-5xl font-black text-white italic mb-6">₺{settings.koGbSellRate || "495"}</p>

                            <a
                                href={`https://wa.me/${settings.whatsappNumber?.replace(/\D/g, '')}?text=Merhaba, Knight Online Zero GB satın almak istiyorum.`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="w-full md:w-auto h-10 px-6 bg-gradient-to-r from-primary to-blue-500 hover:scale-[1.02] text-white font-black uppercase tracking-widest transition-all shadow-lg shadow-primary/20 text-[10px]">
                                    SATIN AL <ArrowRight size={14} className="ml-2" />
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Item Market */}
            <section className="w-full max-w-7xl mx-auto px-4 mb-32">
                <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
                    <h2 className="text-2xl font-black uppercase italic text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <ShoppingCart size={20} />
                        </div>
                        İtem Pazarı
                    </h2>

                    <div className="relative w-full md:w-auto min-w-[300px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        <input
                            type="text"
                            placeholder="İtem ara (örn: Raptor, Shard)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-12 bg-[#0a100e] border border-white/5 rounded-2xl pl-12 pr-4 text-sm font-medium text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    </div>
                ) : filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredItems.map(item => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group bg-[#0a100e] border border-white/5 rounded-3xl overflow-hidden hover:border-primary/30 transition-all hover:-translate-y-1 shadow-2xl shadow-black"
                            >
                                <div className="aspect-square bg-black/40 relative overflow-hidden p-6 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl" />

                                    <div className="absolute top-4 right-4 z-20">
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur border border-white/10">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Mevcut</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-lg font-black text-white uppercase truncate mb-1">{item.name}</h3>
                                    <p className="text-white/40 text-[11px] font-medium line-clamp-2 max-h-8 mb-4">{item.description}</p>

                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Fiyat</p>
                                            <p className="text-2xl font-black text-primary italic">₺{item.price}</p>
                                        </div>

                                        <a
                                            href={`https://wa.me/${settings.whatsappNumber?.replace(/\D/g, '')}?text=${encodeURIComponent(`Merhaba, ${item.name} itemi ile ilgileniyorum.`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <button className="w-12 h-12 rounded-xl bg-white/5 hover:bg-primary text-white flex items-center justify-center transition-all cursor-pointer">
                                                <MessageCircle size={20} />
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center bg-[#0a100e] rounded-3xl border border-white/5">
                        <ShoppingCart size={48} className="mx-auto text-white/10 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">İlan Bulunamadı</h3>
                        <p className="text-white/40">Şu anda bu aramayla eşleşen ilan bulunmuyor.</p>
                    </div>
                )}
            </section>

            {/* SEO Text Content block */}
            <section className="w-full max-w-7xl mx-auto px-4 mb-24">
                <div className="bg-[#0a100e]/50 border border-white/5 rounded-3xl p-8 md:p-12 space-y-8">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-black text-white italic uppercase flex items-center gap-3">
                                <ShieldCheck className="text-primary" />
                                Knight Online Zero GB Al & Sat
                            </h2>
                            <p className="text-white/50 text-sm leading-relaxed font-medium">
                                Knight Online&apos;ın en çok tercih edilen sunucularından olan <strong>Zero</strong> sunucusunda, KodFinans güvencesi ile en hızlı ve güvenilir <strong>Gold Bar (GB)</strong> alışverişini gerçekleştirebilirsiniz. Stoklarımız anlık olarak güncellenmekte olup, en iyi piyasa fiyatlarıyla <strong>Zero GB Satın Al</strong> veya <strong>Zero GB Sat</strong> işlemlerinizi saniyeler içinde tamamlayabilirsiniz. Tamamen güvenli ödeme altyapımız ile 7/24 hizmetinizdeyiz.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-2xl font-black text-white italic uppercase flex items-center gap-3">
                                <MessageCircle className="text-primary" />
                                İtem Pazarı & Güvenli Ticaret
                            </h2>
                            <p className="text-white/50 text-sm leading-relaxed font-medium">
                                Aradığınız değerli eşyayı bulmak ya da elinizdeki eşyayı satmak artık çok daha kolay. <strong>Knight Online Zero İtem Pazarı</strong> alanımız üzerinden yüzlerce eşyayı güvenli bir şekilde inceleyebilir, beğendiğiniz eşyalar için doğrudan iletişime geçebilirsiniz. <strong>İtem Al</strong> ve <strong>İtem Sat</strong> işlemlerinizde dolandırıcılık risklerini KodFinans aracılığıyla en aza indirerek tamamen güvenli dijital alışveriş deneyimini yaşayın.
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-8 mt-8">
                        <h2 className="text-2xl font-black text-white italic uppercase flex items-center gap-3 mb-6">
                            <Zap className="text-primary" />
                            Knight Online Cash & NPoints Yükle
                        </h2>
                        <p className="text-white/50 text-sm leading-relaxed font-medium">
                            Karakterinize değer katmak ve mağazadaki fırsatları kaçırmamak için anında <strong>Knight Online Cash Npoints satın alın</strong>. Kesintisiz dijital kod pin teslimatı ve geniş yelpazedeki E-Pin seçeneklerimizle en uygun <strong>Knight Online Cash Fiyatları</strong> için doğru adrestesiniz. Hemen güvenle <strong>Cash yükle</strong> ve maceraya ara vermeden mükemmel fırsatlarla donan.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
