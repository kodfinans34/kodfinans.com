"use client";

import React from "react";
import { ShieldCheck, BarChart3, Clock, Wallet, Zap, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

export const SeoContent = () => {
    return (
        <section className="py-16 md:py-24 border-t border-white/[0.04] relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.03] blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/[0.02] blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* SEO Text */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-primary text-xs font-medium">
                                <Zap size={12} className="fill-primary" /> Neden KodFinans?
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold font-inter text-white leading-tight tracking-tight">
                                Dijital Varlıklarınız <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Güvende</span>
                            </h2>
                        </div>

                        <div className="space-y-5 text-white/30 text-sm font-medium leading-relaxed">
                            <p>
                                <strong className="text-white/70">KodFinans.com</strong>, Türkiye&apos;nin en kapsamlı dijital kod bozum ve oyun ürünleri platformudur. Steam Cüzdan Kodu, Razer Gold, iTunes, Google Play ve diğer dijital varlıklarınızı anında nakite çevirebilir, aynı zamanda en güncel oyun kodlarını güvenle satın alabilirsiniz.
                            </p>
                            <p>
                                Kurumsal müşterilerimize özel <strong className="text-white/70">VIP Finans</strong> programı ile piyasa ortalamasının üzerinde oranlar sunar, öncelikli işlem garantisi sağlarız. İster bireysel oyuncu, ister toplu işlem yapan bayi olun — KodFinans her ölçekte hizmet verir.
                            </p>
                            <p>
                                BDDK onaylı ödeme kuruluşları ile entegre altyapımız, 7/24 kesintisiz hizmet sunar. Tüm işlemleriniz 256-bit SSL ile şifrelenir, ödemeleriniz dakikalar içinde hesabınıza yansır.
                            </p>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        {[
                            { icon: ShieldCheck, title: "Güvenli Altyapı", desc: "256-bit SSL şifreleme ve 3D Secure ile korunan her işlem." },
                            { icon: Clock, title: "7/24 Anında İşlem", desc: "Zaman sınırı olmadan dilediğiniz an bozum veya satın alım yapın." },
                            { icon: BarChart3, title: "Rekabetçi Oranlar", desc: "Canlı piyasa takibi ile her zaman en iyi bozum oranları." },
                            { icon: Wallet, title: "Dijital Cüzdan", desc: "Hızlı ödeme, kolay bakiye yönetimi ve anlık transferler." },
                            { icon: CreditCard, title: "Çoklu Ödeme", desc: "Kredi kartı, havale, IBAN ve dijital cüzdan desteği." },
                            { icon: Zap, title: "Anında Teslimat", desc: "Satın aldığınız kodlar saniyeler içinde hesabınıza ulaşır." },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.06 }}
                                viewport={{ once: true }}
                                className="group bg-white/[0.02] p-5 rounded-2xl border border-white/[0.05] hover:border-primary/15 transition-all duration-500"
                            >
                                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/20 group-hover:text-primary group-hover:bg-primary/10 group-hover:border-primary/20 transition-all mb-4">
                                    <item.icon size={20} />
                                </div>
                                <h4 className="text-white font-semibold text-sm mb-1.5">{item.title}</h4>
                                <p className="text-white/25 text-xs leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
