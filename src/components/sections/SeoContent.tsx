"use client";

import React from "react";
import { ShieldCheck, BarChart3, Clock, Wallet } from "lucide-react";

export const SeoContent = () => {
    return (
        <section className="py-12 border-t border-white/5 relative overflow-hidden bg-[#08080a]">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/2 blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/2 blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Main SEO Text */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="text-primary font-black text-xs uppercase tracking-widest">NEDEN KODFINANS?</span>
                            <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-[0.9]">
                                Dijital Varlıklarınızı <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Nakit Güce</span> Çevirin
                            </h2>
                        </div>

                        <div className="space-y-6 text-white/40 text-sm font-medium leading-relaxed text-justify">
                            <p>
                                <strong className="text-white">KodFinans.com</strong>, Türkiye'nin en kapsamlı dijital kod ve e-pin bozum platformudur. Steam Cüzdan Kodu, Razer Gold, iTunes, Google Play ve diğer popüler dijital varlıklarınızı saniyeler içinde nakite dönüştürmenize olanak tanır. Geleneksel pazar yerlerinin aksine, anlık kur takibi ve otomatik işlem altyapısı ile beklemeden ödeme almanızı sağlar.
                            </p>
                            <p>
                                Yüksek işlem hacmine sahip kurumsal müşterilerimiz için geliştirdiğimiz <strong className="text-white">VIP Finans</strong> paneli, piyasa ortalamasının üzerinde özel oranlar sunar. İster bireysel bir oyuncu olun, ister toplu satış yapan bir bayi; KodFinans size en hızlı ve güvenli bozum deneyimini garanti eder.
                            </p>
                            <p>
                                BDDK onaylı ödeme kuruluşları ile entegre çalışan sistemimiz, 7/24 kesintisiz hizmet verir. İşlemleriniz SSL sertifikalı şifreli bağlantılar üzerinden gerçekleştirilir ve ödemeleriniz dakikalar içinde hesabınıza yansır.
                            </p>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        {[
                            { icon: ShieldCheck, title: "Güvenli Altyapı", desc: "256-bit SSL ve 3D Secure ile korunan işlemler." },
                            { icon: Clock, title: "7/24 Anında İşlem", desc: "Zaman sınırı olmadan dilediğiniz an bozum yapın." },
                            { icon: BarChart3, title: "Yüksek Kurlar", desc: "Global piyasaları takip eden rekabetçi oranlar." },
                            { icon: Wallet, title: "Hızlı Ödeme", desc: "Banka veya dijital cüzdanlara anında transfer." }
                        ].map((item, i) => (
                            <div key={i} className="glass p-6 rounded-3xl border-white/5 hover:border-primary/20 transition-all group">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/30 group-hover:text-primary group-hover:bg-primary/20 transition-all mb-4">
                                    <item.icon size={24} />
                                </div>
                                <h4 className="text-white font-black text-sm uppercase tracking-wide mb-2">{item.title}</h4>
                                <p className="text-white/30 text-xs leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};
