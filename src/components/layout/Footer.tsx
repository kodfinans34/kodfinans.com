import React from "react";
import Link from "next/link";
import { ShieldCheck, Zap, Facebook, Twitter, Instagram, Youtube, Send, Mail, Phone, MapPin, Wallet, Lock, CreditCard } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="relative bg-[#09090b] pt-20 pb-8 border-t border-white/[0.05] overflow-hidden">
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/[0.03] blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

                    {/* Brand Info */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-xl border border-primary/20 group-hover:border-primary/40 transition-all duration-500">
                                <Wallet size={20} className="text-primary relative z-10" />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-xl font-bold font-inter tracking-tight flex items-center">
                                    <span className="text-white">Kod</span>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Finans</span>
                                </span>
                                <span className="text-[8px] font-medium text-white/25 tracking-[0.15em] uppercase ml-0.5">Digital Wallet & Store</span>
                            </div>
                        </Link>
                        <p className="text-white/35 text-sm leading-relaxed max-w-xs">
                            Dijital kodlarınızı güvenle nakite çevirin, oyun ürünlerini en uygun fiyatlarla satın alın. Türkiye&apos;nin güvenilir dijital finans platformu.
                        </p>
                        <div className="flex gap-2.5">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <Link key={i} href="#" className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/25 hover:text-white hover:border-primary/30 hover:bg-primary/10 transition-all">
                                    <Icon size={16} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:pl-8">
                        <h4 className="text-white font-semibold mb-6 text-sm">Hızlı Linkler</h4>
                        <ul className="space-y-3.5">
                            {[
                                { href: "/urunler", label: "Mağaza" },
                                { href: "/bozum", label: "Kod Bozdur" },
                                { href: "/vip-finans", label: "VIP Başvurusu" },
                                { href: "/blog", label: "Blog & Rehber" },
                                { href: "/panel/siparisler", label: "İşlem Geçmişi" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-white/30 hover:text-primary transition-colors text-sm font-medium flex items-center gap-2.5 group">
                                        <div className="w-1 h-1 rounded-full bg-white/10 group-hover:bg-primary transition-colors" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div>
                        <h4 className="text-white font-semibold mb-6 text-sm">İletişim</h4>
                        <ul className="space-y-4">
                            <li>
                                <a href="https://wa.me/905517139330" className="flex gap-3 group">
                                    <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/30 group-hover:text-green-400 group-hover:border-green-500/20 transition-all shrink-0">
                                        <Phone size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-white/20 font-medium tracking-wide mb-0.5">WhatsApp Destek</p>
                                        <p className="text-sm font-medium text-white/50 group-hover:text-green-400 transition-colors">0551 713 93 30</p>
                                    </div>
                                </a>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/30 shrink-0">
                                    <Mail size={16} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-white/20 font-medium tracking-wide mb-0.5">E-Posta</p>
                                    <p className="text-sm font-medium text-white/50">destek@kodfinans.com</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/30 shrink-0">
                                    <MapPin size={16} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-white/20 font-medium tracking-wide mb-0.5">Merkez Ofis</p>
                                    <p className="text-sm font-medium text-white/50">Maslak, İstanbul / TR</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter & Trust */}
                    <div className="space-y-6 lg:pl-4">
                        <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/[0.06] space-y-4 relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary/[0.06] blur-2xl rounded-full" />
                            <h5 className="text-white font-semibold text-sm">Bülten</h5>
                            <p className="text-white/30 text-xs leading-relaxed">Özel kampanya ve güncel kurlardan haberdar ol.</p>
                            <div className="relative mt-3">
                                <input
                                    type="email"
                                    placeholder="E-posta adresin..."
                                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2.5 text-xs text-white placeholder:text-white/15 focus:outline-none focus:border-primary/30 transition-all font-medium"
                                />
                                <button className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md bg-primary text-white flex items-center justify-center hover:bg-primary/80 transition-colors">
                                    <Send size={12} />
                                </button>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <div className="flex items-center gap-1.5 text-[10px] text-white/25 font-medium">
                                <Lock size={12} className="text-green-500/60" />
                                256-bit SSL
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] text-white/25 font-medium">
                                <ShieldCheck size={12} className="text-primary/60" />
                                3D Secure
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/[0.04] pt-8 gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <p className="text-white/15 text-xs font-medium">
                            © {new Date().getFullYear()} KodFinans. Tüm Hakları Saklıdır.
                        </p>
                        <div className="flex gap-5 text-xs text-white/20">
                            <Link href="/kvkk" className="hover:text-primary/80 transition-colors">KVKK</Link>
                            <Link href="/gizlilik" className="hover:text-primary/80 transition-colors">Gizlilik</Link>
                            <Link href="/cerezler" className="hover:text-primary/80 transition-colors">Çerezler</Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 opacity-25 hover:opacity-60 transition-opacity duration-500">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3.5" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
                        <div className="h-5 bg-gradient-to-r from-blue-600 to-blue-700 rounded px-2.5 py-0.5 flex items-center">
                            <span className="text-white font-bold text-[10px] tracking-wider">TROY</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
