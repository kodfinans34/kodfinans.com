import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CreditCard, ShieldCheck, Zap, Heart, Facebook, Twitter, Instagram, Youtube, Send, ArrowRight, Smartphone, Mail, Phone, MapPin, Command } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="relative bg-[#050506] pt-24 pb-12 border-t border-white/5 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary/5 blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

                    {/* Brand Info & Newsletter */}
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="relative w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 group-hover:border-primary/50 transition-all duration-500 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <Zap size={22} className="text-primary relative z-10 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500" />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-2xl font-black font-poppins tracking-tighter flex items-center">
                                    <span className="text-white">Kod</span>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 animate-gradient-x bg-[length:200%_auto]">Finans</span>
                                </span>
                            </div>
                        </Link>
                        <p className="text-white/40 text-sm leading-relaxed max-w-xs font-medium">
                            Türkiye'nin lider dijital kod bozum platformu. Gaming ve fintech dünyasını güvenle birleştiriyoruz.
                        </p>
                        <div className="flex gap-3">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <Link key={i} href="#" className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/30 hover:text-white hover:border-primary/50 transition-all group">
                                    <Icon size={18} className="group-hover:scale-110 transition-transform" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:pl-8">
                        <h4 className="text-white font-black mb-8 text-sm uppercase tracking-[0.2em]">Hızlı Linkler</h4>
                        <ul className="space-y-5">
                            <li>
                                <Link href="/urunler" className="text-white/30 hover:text-primary transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-3 group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-primary transition-colors" /> Ürün Kataloğu
                                </Link>
                            </li>
                            <li>
                                <Link href="/bozum" className="text-white/30 hover:text-primary transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-3 group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-primary transition-colors" /> Bozum Hesapla
                                </Link>
                            </li>
                            <li>
                                <Link href="/vip-finans" className="text-white/30 hover:text-primary transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-3 group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-primary transition-colors" /> VIP Başvurusu
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-white/30 hover:text-primary transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-3 group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-primary transition-colors" /> Blog & Rehber
                                </Link>
                            </li>
                            <li>
                                <Link href="/panel/siparisler" className="text-white/30 hover:text-primary transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-3 group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-primary transition-colors" /> İşlem Geçmişi
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div>
                        <h4 className="text-white font-black mb-8 text-sm uppercase tracking-[0.2em]">İletişim</h4>
                        <ul className="space-y-5">
                            <li className="flex gap-4">
                                <a href="https://wa.me/905517139330" className="flex gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary shrink-0 group-hover:text-green-500 transition-colors"><Phone size={18} /></div>
                                    <div>
                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">WhatsApp Destek</p>
                                        <p className="text-sm font-bold text-white/60 group-hover:text-green-400 transition-colors">0551 713 93 30</p>
                                    </div>
                                </a>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary shrink-0"><Mail size={18} /></div>
                                <div>
                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">E-Posta</p>
                                    <p className="text-sm font-bold text-white/60">destek@kodfinans.com</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent shrink-0"><MapPin size={18} /></div>
                                <div>
                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Merkez Ofis</p>
                                    <p className="text-xs font-bold text-white/60">Maslak, İstanbul / TR</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter / CTA */}
                    <div className="space-y-6 lg:pl-4">
                        <div className="glass p-8 rounded-[2rem] border-white/5 space-y-4 bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden group">
                            <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 blur-2xl rounded-full" />
                            <h5 className="text-white font-black text-lg">Yeniliklerden Haberdar Ol</h5>
                            <p className="text-white/30 text-xs font-bold uppercase tracking-widest">Özel oranları kaçırma.</p>
                            <div className="relative mt-4">
                                <input
                                    type="email"
                                    placeholder="E-posta adresin..."
                                    className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-primary/50 transition-all font-bold"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
                                    <Send size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SEO Metin Alanı - Enhanced */}
                <div className="border-t border-white/5 pt-12 mt-12 mb-16 relative">
                    <div className="absolute -top-px left-0 w-32 h-[1px] bg-primary shadow-[0_0_10px_#8b5cf6]" />
                    <h5 className="text-white font-black mb-6 text-sm uppercase tracking-[0.2em] italic">KODFINANS | Dijital Varlık Rehberi</h5>
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-4 text-white/30 text-[11px] font-medium leading-relaxed text-justify">
                            <p>
                                KodFinans, dijital oyun kartları (E-pin), hediye çekleri ve oyun içi para birimlerini nakite çevirmek isteyen kullanıcılar için profesyonel aracılık hizmeti sunar. Razer Gold, Steam Cüzdan Kodu, iTunes ve Google Play gibi global platformlardaki varlıklarınız, PCI-DSS standartlarına uygun güvenli altyapımız ile saniyeler içinde değerlendirilir.
                            </p>
                        </div>
                        <div className="space-y-4 text-white/30 text-[11px] font-medium leading-relaxed text-justify">
                            <p>
                                Ödemeleriniz anlık olarak banka hesabınıza veya Papara, İyzico gibi dijital cüzdanlarınıza aktarılır. Türkiye'nin 81 iline kesintisiz hizmet veren sistemimiz, 7/24 aktif kadrosuyla yüksek hacimli bozum talepleriniz için VIP Finans masası üzerinden özel oranlar sunmaktadır. Güvenliğiniz en büyük önceliğimizdir.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-10 gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <p className="text-white/20 text-[10px] font-medium tracking-widest uppercase">
                            © {new Date().getFullYear()} KodFinans Exchange. Tüm Hakları Saklıdır. | v1.0.5-debug
                        </p>
                        <div className="flex gap-6 uppercase text-[9px] font-black tracking-widest text-white/20">
                            <Link href="/kvkk" className="hover:text-primary transition-colors">KVKK</Link>
                            <Link href="/gizlilik" className="hover:text-primary transition-colors">GİZLİLİK</Link>
                            <Link href="/cerezler" className="hover:text-primary transition-colors">ÇEREZLER</Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 md:gap-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                        <div className="h-5 md:h-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded px-3 py-1 flex items-center">
                            <span className="text-white font-black text-xs md:text-sm tracking-wider">TROY</span>
                        </div>
                        <div className="h-8 w-px bg-white/10 hidden md:block" />
                        <div className="flex flex-col leading-none">
                            <span className="text-[10px] font-black text-white leading-none">SECURE</span>
                            <span className="text-[8px] font-bold text-white/40 tracking-tighter">PAYMENT GATEWAY</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
