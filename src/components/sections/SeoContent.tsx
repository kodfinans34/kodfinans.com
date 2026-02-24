"use client";

import React from "react";
import { ShieldCheck, BarChart3, Clock, Wallet, Zap, CreditCard, Gamepad2, Trophy, Star, Globe } from "lucide-react";
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
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card border border-white/[0.06] text-primary text-xs font-medium">
                                <Zap size={12} className="fill-primary" /> Neden KodFinans?
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold font-inter text-foreground leading-tight tracking-tight">
                                Dijital Kodlarınız, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">En Yüksek Oranla</span>
                            </h2>
                        </div>

                        <div className="space-y-5 text-foreground/30 text-sm font-medium leading-relaxed">
                            <p>
                                <strong className="text-foreground/70">KodFinans.com</strong>, Türkiye&apos;nin en güvenilir <strong className="text-foreground/60">dijital kod bozum</strong> ve oyun ürünleri platformudur.
                                <strong className="text-foreground/60"> Razer Gold bozdurma</strong>, <strong className="text-foreground/60">Steam cüzdan kodu</strong>, <strong className="text-foreground/60">iTunes</strong>, <strong className="text-foreground/60">Google Play</strong> ve diğer dijital varlıklarınızı anında nakite çevirebilir, aynı zamanda en güncel oyun kodlarını güvenle satın alabilirsiniz.
                            </p>
                            <p>
                                <strong className="text-foreground/60">Knight Online cash satın al</strong>arak oyun deneyiminizi güçlendirin, <strong className="text-foreground/60">Metin2 ejder parası</strong> ile oyun içi avantaj elde edin.
                                <strong className="text-foreground/60"> PUBG Mobile UC</strong> satın alarak Battle Royale&apos;de rakiplerinizin önüne geçin. Tüm bu işlemleri <strong className="text-foreground/60">KodFinans</strong> güvencesiyle, dakikalar içinde gerçekleştirin.
                            </p>
                            <p>
                                <strong className="text-foreground/60">PlayStation hediye çeki</strong> ve <strong className="text-foreground/60">Microsoft Xbox hediye çeki</strong> ile konsol deneyiminizi zenginleştirin.
                                ₺100&apos;den başlayan fiyatlarla <strong className="text-foreground/60">PSN kart</strong>, <strong className="text-foreground/60">Xbox Gift Card</strong> ve daha fazlasını anında hesabınıza yükleyin.
                            </p>
                            <p>
                                Kurumsal müşterilerimize özel <strong className="text-foreground/70">VIP Finans</strong> programı ile piyasa ortalamasının üzerinde <strong className="text-foreground/60">bozum oranları</strong> sunar, öncelikli işlem garantisi sağlarız. BDDK onaylı ödeme kuruluşları ile entegre altyapımız, 7/24 kesintisiz hizmet sunar.
                            </p>
                        </div>

                        {/* Product keywords for SEO */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            {[
                                "Razer Gold Bozdurma", "Razer Gold Satın Al", "Knight Online Cash",
                                "Metin2 Ejder", "PUBG Mobile UC", "Steam Cüzdan Kodu",
                                "PlayStation Hediye Çeki", "Xbox Hediye Çeki", "Google Play Kodu",
                                "iTunes Kart", "Dijital Kod Bozum", "E-Pin Bozum"
                            ].map((tag) => (
                                <span key={tag} className="px-3 py-1.5 text-[10px] font-semibold bg-card/60 border border-white/[0.06] rounded-lg text-foreground/25 hover:text-primary/60 hover:border-primary/20 transition-all cursor-default">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        {[
                            { icon: ShieldCheck, title: "Güvenli Altyapı", desc: "256-bit SSL şifreleme ve 3D Secure ile korunan her işlem." },
                            { icon: Clock, title: "7/24 Anında İşlem", desc: "Razer Gold bozum, PUBG UC satın alma — zaman sınırı yok." },
                            { icon: BarChart3, title: "En İyi Oranlar", desc: "Knight Online cash, Metin2 ejder ve tüm kodlarda rekabetçi fiyatlar." },
                            { icon: Wallet, title: "Dijital Cüzdan", desc: "Hızlı ödeme, kolay bakiye yönetimi ve anlık transferler." },
                            { icon: Gamepad2, title: "Tüm Platformlar", desc: "PlayStation, Xbox, Steam, Razer Gold, PUBG ve daha fazlası." },
                            { icon: Zap, title: "Anında Teslimat", desc: "Satın aldığınız kodlar saniyeler içinde hesabınıza ulaşır." },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.06 }}
                                viewport={{ once: true }}
                                className="group bg-card p-5 rounded-2xl border border-white/[0.05] hover:border-primary/15 transition-all duration-500"
                            >
                                <div className="w-10 h-10 rounded-xl bg-card/60 border border-white/[0.06] flex items-center justify-center text-foreground/20 group-hover:text-primary group-hover:bg-primary/10 group-hover:border-primary/20 transition-all mb-4">
                                    <item.icon size={20} />
                                </div>
                                <h4 className="text-foreground font-semibold text-sm mb-1.5">{item.title}</h4>
                                <p className="text-foreground/25 text-xs leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section for SEO */}
                <div className="mt-20 space-y-8">
                    <div className="text-center space-y-3">
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                            Sıkça Sorulan <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Sorular</span>
                        </h3>
                        <p className="text-foreground/30 text-sm">Dijital kod bozum ve satın alma hakkında merak edilenler</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
                        {[
                            {
                                q: "Razer Gold nasıl bozdurulur?",
                                a: "KodFinans üzerinden Razer Gold kodunuzu girin, anlık oran hesaplaması yapılır ve tutarınız dakikalar içinde banka hesabınıza veya dijital cüzdanınıza aktarılır."
                            },
                            {
                                q: "Knight Online cash nereden satın alınır?",
                                a: "KodFinans mağazasından Knight Online cash kodlarını en uygun fiyatlarla satın alabilirsiniz. Anında teslimat garantisi ile hesabınıza yüklenir."
                            },
                            {
                                q: "PUBG Mobile UC satın alma güvenli mi?",
                                a: "Evet, KodFinans 256-bit SSL ile korunan altyapısı sayesinde PUBG Mobile UC satın alma işlemleriniz tamamen güvenlidir. Kodlar anında teslim edilir."
                            },
                            {
                                q: "PlayStation hediye çeki nasıl kullanılır?",
                                a: "PlayStation hediye çekinizi PS Store'da hesabınıza giriş yaparak 'Kodu Kullan' bölümünden aktive edebilirsiniz. KodFinans'tan ₺100 ile ₺2.200 arası seçenekler mevcuttur."
                            },
                            {
                                q: "Metin2 ejder parası satın alabilir miyim?",
                                a: "Evet, KodFinans üzerinden Metin2 ejder parası (EP) kodlarını satın alabilir ve oyun hesabınıza anında yükleyebilirsiniz."
                            },
                            {
                                q: "Bozum oranları ne kadar?",
                                a: "KodFinans'ta bozum oranları piyasa koşullarına göre güncellenir. VIP müşterilerimize özel daha yüksek oranlar sunulmaktadır. Güncel oranlar için bozum hesaplama aracımızı kullanabilirsiniz."
                            },
                        ].map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                viewport={{ once: true }}
                                className="bg-card/50 border border-white/[0.05] rounded-2xl p-5 md:p-6 space-y-2"
                            >
                                <h4 className="text-foreground font-semibold text-sm flex items-center gap-2">
                                    <Star size={14} className="text-primary shrink-0" />
                                    {faq.q}
                                </h4>
                                <p className="text-foreground/30 text-xs leading-relaxed pl-[22px]">{faq.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* JSON-LD FAQ Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            mainEntity: [
                                { "@type": "Question", name: "Razer Gold nasıl bozdurulur?", acceptedAnswer: { "@type": "Answer", text: "KodFinans üzerinden Razer Gold kodunuzu girin, anlık oran hesaplaması yapılır ve tutarınız dakikalar içinde banka hesabınıza aktarılır." } },
                                { "@type": "Question", name: "Knight Online cash nereden satın alınır?", acceptedAnswer: { "@type": "Answer", text: "KodFinans mağazasından Knight Online cash kodlarını en uygun fiyatlarla satın alabilirsiniz." } },
                                { "@type": "Question", name: "PUBG Mobile UC satın alma güvenli mi?", acceptedAnswer: { "@type": "Answer", text: "Evet, KodFinans 256-bit SSL ile korunan altyapısı sayesinde PUBG Mobile UC satın alma işlemleriniz tamamen güvenlidir." } },
                                { "@type": "Question", name: "PlayStation hediye çeki nasıl kullanılır?", acceptedAnswer: { "@type": "Answer", text: "PlayStation hediye çekinizi PS Store'da hesabınıza giriş yaparak 'Kodu Kullan' bölümünden aktive edebilirsiniz." } },
                                { "@type": "Question", name: "Metin2 ejder parası satın alabilir miyim?", acceptedAnswer: { "@type": "Answer", text: "Evet, KodFinans üzerinden Metin2 ejder parası kodlarını satın alabilir ve oyun hesabınıza anında yükleyebilirsiniz." } },
                                { "@type": "Question", name: "Bozum oranları ne kadar?", acceptedAnswer: { "@type": "Answer", text: "KodFinans'ta bozum oranları piyasa koşullarına göre güncellenir. VIP müşterilerimize özel daha yüksek oranlar sunulmaktadır." } },
                            ],
                        }),
                    }}
                />
            </div>
        </section>
    );
};
