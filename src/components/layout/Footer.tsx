"use client";
import React from "react";
import Link from "next/link";
import { ShieldCheck, Zap, Send, Mail, Phone, MapPin, Wallet, Lock, CreditCard } from "lucide-react";
import { useSystem } from "@/context/SystemContext";

export const Footer = () => {
    const { settings } = useSystem();

    const socialLinks = [
        { href: settings.socialFacebook, label: "Facebook", icon: () => <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> },
        { href: settings.socialTwitter, label: "Twitter", icon: () => <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
        { href: settings.socialInstagram, label: "Instagram", icon: () => <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg> },
        { href: settings.socialYoutube, label: "YouTube", icon: () => <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg> },
        { href: settings.socialTelegram, label: "Telegram", icon: () => <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg> },
    ].filter(link => link.href);

    return (
        <footer className="relative bg-background pt-20 pb-8 border-t border-white/[0.05] overflow-hidden">
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/[0.03] blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

                    {/* Brand Info */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2.5 group">
                            {settings.footerLogo ? (
                                <img src={settings.footerLogo} alt="Logo" className="h-14 w-auto object-contain" />
                            ) : (
                                <>
                                    <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-xl border border-primary/20 group-hover:border-primary/40 transition-all duration-500">
                                        <Wallet size={20} className="text-primary relative z-10" />
                                    </div>
                                    <div className="flex flex-col leading-none">
                                        <span className="text-xl font-bold font-inter tracking-tight flex items-center">
                                            <span className="text-foreground">Kod</span>
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Finans</span>
                                        </span>
                                        <span className="text-[8px] font-medium text-foreground/25 tracking-[0.15em] uppercase ml-0.5">Digital Wallet &amp; Store</span>
                                    </div>
                                </>
                            )}
                        </Link>
                        <p className="text-foreground/35 text-sm leading-relaxed max-w-xs">
                            {settings.footerDescription || settings.homepageDescription}
                        </p>
                        <div className="flex gap-2.5">
                            {socialLinks.length > 0 ? (
                                socialLinks.map((social, i) => (
                                    <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/25 hover:text-white hover:border-primary/30 hover:bg-primary/10 transition-all" title={social.label}>
                                        <social.icon />
                                    </a>
                                ))
                            ) : (
                                // Default placeholder icons when no social links configured
                                <span className="text-foreground/15 text-xs italic">Sosyal medya linkleri admin panelden eklenebilir</span>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:pl-8">
                        <h4 className="text-foreground font-semibold mb-6 text-sm">Hızlı Linkler</h4>
                        <ul className="space-y-3.5">
                            {[
                                { href: "/urunler", label: "Mağaza" },
                                { href: "/bozum", label: "Kod Bozdur" },
                                { href: "/vip-finans", label: "VIP Başvurusu" },
                                { href: "/blog", label: "Blog & Rehber" },
                                { href: "/panel/siparisler", label: "İşlem Geçmişi" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-foreground/30 hover:text-primary transition-colors text-sm font-medium flex items-center gap-2.5 group">
                                        <div className="w-1 h-1 rounded-full bg-foreground/10 group-hover:bg-primary transition-colors" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div>
                        <h4 className="text-foreground font-semibold mb-6 text-sm">İletişim</h4>
                        <ul className="space-y-4">
                            <li>
                                <a href={`https://wa.me/${(settings.footerPhone || settings.whatsappNumber).replace(/\D/g, '')}`} className="flex gap-3 group">
                                    <div className="w-9 h-9 rounded-lg bg-card/60 border border-white/[0.06] flex items-center justify-center text-foreground/30 group-hover:text-green-400 group-hover:border-green-500/20 transition-all shrink-0">
                                        <Phone size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-foreground/20 font-medium tracking-wide mb-0.5">WhatsApp Destek</p>
                                        <p className="text-sm font-medium text-foreground/50 group-hover:text-green-400 transition-colors">{settings.footerPhone || settings.whatsappNumber}</p>
                                    </div>
                                </a>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-9 h-9 rounded-lg bg-card/60 border border-white/[0.06] flex items-center justify-center text-foreground/30 shrink-0">
                                    <Mail size={16} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-foreground/20 font-medium tracking-wide mb-0.5">E-Posta</p>
                                    <p className="text-sm font-medium text-foreground/50">{settings.footerEmail || settings.smtpFrom}</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-9 h-9 rounded-lg bg-card/60 border border-white/[0.06] flex items-center justify-center text-foreground/30 shrink-0">
                                    <MapPin size={16} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-foreground/20 font-medium tracking-wide mb-0.5">Merkez Ofis</p>
                                    <p className="text-sm font-medium text-foreground/50">{settings.footerAddress || "Maslak, İstanbul / TR"}</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter & Trust */}
                    <div className="space-y-6 lg:pl-4">
                        <div className="bg-card/40 p-6 rounded-2xl border border-white/[0.06] space-y-4 relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary/[0.06] blur-2xl rounded-full" />
                            <h5 className="text-foreground font-semibold text-sm">Bülten</h5>
                            <p className="text-foreground/30 text-xs leading-relaxed">Özel kampanya ve güncel kurlardan haberdar ol.</p>
                            <div className="relative mt-3">
                                <input
                                    type="email"
                                    placeholder="E-posta adresin..."
                                    className="w-full bg-card/60 border border-white/[0.06] rounded-lg px-4 py-2.5 text-xs text-foreground placeholder:text-foreground/15 focus:outline-none focus:border-primary/30 transition-all font-medium"
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
                        <p className="text-foreground/15 text-xs font-medium">
                            © {new Date().getFullYear()} {settings.copyrightText || "KodFinans. Tüm Hakları Saklıdır."}
                        </p>
                        <div className="flex gap-5 text-xs text-foreground/20">
                            <Link href="/kvkk" className="hover:text-primary/80 transition-colors">KVKK</Link>
                            <Link href="/gizlilik" className="hover:text-primary/80 transition-colors">Gizlilik</Link>
                            <Link href="/cerezler" className="hover:text-primary/80 transition-colors">Çerezler</Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 opacity-60 hover:opacity-100 transition-all duration-500 h-10 w-auto max-w-full">
                        <img src="/images/payment-logos.png" alt="Payment Methods" className="h-full w-auto object-contain block mx-auto" style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.2))' }} />
                    </div>
                </div>
            </div>
        </footer>
    );
};
