"use client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Zap, Users, ShieldAlert } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                        <div className="space-y-8">
                            <h1 className="text-4xl md:text-6xl font-bold font-inter">
                                Güvenli Dijital <br />
                                Varlık <span className="text-primary">Yönetimi</span>
                            </h1>
                            <p className="text-white/60 text-lg leading-relaxed">
                                2022 yılından beri Türkiye'nin dijital kod ekosisteminde güven ve hızı bir araya getiriyoruz.
                                KodFinans olarak amacımız, kullanıcılarımızın sahip olduğu dijital hediye kartlarını ve oyun bakiyelerini
                                en şeffaf oranlarla ve en hızlı şekilde nakite dönüştürmelerini sağlamaktır.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="glass p-6 rounded-2xl border-white/5">
                                    <h4 className="text-3xl font-bold text-white mb-2">50K+</h4>
                                    <p className="text-white/40 text-sm italic">Başarılı İşlem</p>
                                </div>
                                <div className="glass p-6 rounded-2xl border-white/5">
                                    <h4 className="text-3xl font-bold text-white mb-2">24/7</h4>
                                    <p className="text-white/40 text-sm italic">Kesintisiz Destek</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square glass rounded-[3rem] border-white/5 overflow-hidden flex items-center justify-center p-12 bg-gradient-to-br from-primary/20 to-transparent">
                                <ShieldCheck size={200} className="text-primary/20 absolute -z-10" />
                                <div className="text-center space-y-4">
                                    <ShieldCheck size={80} className="text-primary mx-auto" />
                                    <h3 className="text-2xl font-bold text-white">Güvenli Altyapı</h3>
                                    <p className="text-white/40">Tüm verileriniz 256-bit SSL ve PCI-DSS standartları ile korunmaktadır.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { title: "Şeffaflık", desc: "Gizli komisyon yok. Ne görüyorsanız onu alırsınız.", icon: ShieldAlert },
                            { title: "Hız", desc: "Ortalama 30 saniye işlem süresi ile zamanınız değerli.", icon: Zap },
                            { title: "Topluluk", desc: "Binlerce memnun kullanıcı ve geniş referans ağı.", icon: Users },
                            { title: "Güven", desc: "Legal altyapı ve kurumsal finans yönetimi.", icon: ShieldCheck },
                        ].map((item, i) => (
                            <div key={i} className="glass p-8 rounded-3xl border-white/5 space-y-4 hover:border-primary/20 transition-all">
                                <item.icon size={32} className="text-primary" />
                                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
