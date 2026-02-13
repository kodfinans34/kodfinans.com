"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, MapPin, MessageSquare, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#080809] text-white">
            <Navbar />

            <main className="pt-48 pb-24 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/20 blur-[150px] -z-10 rounded-full opacity-50 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16 space-y-4">
                        <h1 className="text-4xl md:text-6xl font-bold font-poppins">Bizimle İletişime Geçin</h1>
                        <p className="text-white/40 max-w-2xl mx-auto">
                            Sorularınız, önerileriniz veya VIP üyelik talepleriniz için bize ulaşabilirsiniz.
                            Müşteri hizmetlerimiz 7/24 hizmetinizdedir.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-1 space-y-6">
                            {[
                                { label: "Bize Yazın", value: "destek@kodfinans.com", icon: Mail, color: "text-blue-400" },
                                { label: "Bizi Arayın", value: "+90 212 000 00 00", icon: Phone, color: "text-green-400" },
                                { label: "Canlı Destek", value: "Sitedeki destek butonunu kullanın", icon: MessageSquare, color: "text-primary" },
                                { label: "Adres", value: "Maslak, Büyükdere Cd. No:257, 34398 Sarıyer/İstanbul", icon: MapPin, color: "text-orange-400" },
                            ].map((item, i) => (
                                <div key={i} className="glass p-6 rounded-3xl border-white/5 flex items-center gap-6">
                                    <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${item.color}`}>
                                        <item.icon size={24} />
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">{item.label}</p>
                                        <p className="text-white font-medium">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="glass p-8 md:p-12 rounded-[3rem] border-white/5 space-y-8">
                                <form className="grid md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Adınız Soyadınız</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            placeholder="Ad Soyad"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">E-Posta Adresiniz</label>
                                        <input
                                            type="email"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            placeholder="ornek@mail.com"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Konu</label>
                                        <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                                            <option className="bg-[#080809]">Genel Sorular</option>
                                            <option className="bg-[#080809]">Bozum İşlemi Takibi</option>
                                            <option className="bg-[#080809]">VIP Finans Başvurusu</option>
                                            <option className="bg-[#080809]">Ödeme Problemi</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Mesajınız</label>
                                        <textarea
                                            rows={4}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none"
                                            placeholder="Size nasıl yardımcı olabiliriz?"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <Button variant="primary" size="lg" className="w-full py-5">
                                            Mesaj Gönder <Send size={20} className="ml-2" />
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
