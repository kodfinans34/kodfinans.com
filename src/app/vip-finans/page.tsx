"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Trophy, ShieldCheck, HeartPulse, Headphones, MessageCircle, Send, Mail, Phone, User, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function VipPage() {
    const whatsappNumber = "905517139330";
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: ""
    });
    const [loading, setLoading] = useState(false);

    const handleWhatsApp = () => {
        window.open(`https://wa.me/${whatsappNumber}?text=Merhaba, VIP Finans hakkında bilgi almak istiyorum.`, '_blank');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    to: 'kodfinans34@gmail.com',
                    type: 'vip-contact'
                })
            });

            if (response.ok) {
                alert("Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.");
                setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
            } else {
                alert("Bir hata oluştu. Lütfen WhatsApp üzerinden iletişime geçin.");
            }
        } catch (error) {
            console.error("Form gönderme hatası:", error);
            alert("Bir hata oluştu. Lütfen WhatsApp üzerinden iletişime geçin.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#080809] text-white">
            <Navbar />

            <main className="pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Hero Header */}
                    <div className="relative glass p-12 rounded-[3rem] border border-primary/20 overflow-hidden mb-20 bg-gradient-to-br from-primary/10 to-transparent">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -z-10" />

                        <div className="max-w-3xl space-y-6">
                            <div className="flex items-center gap-2 text-primary font-bold">
                                <Trophy size={20} /> VIP FİNANS AYRICALIĞI
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold font-poppins">
                                Kurumsal ve Yüksek <br />
                                Hacimli İşlemler İçin <span className="text-primary">Özel Destek</span>
                            </h1>
                            <p className="text-white/60 text-lg">
                                KodFinans VIP ile en yüksek bozum oranları, öncelikli ödeme ve size özel müşteri temsilcisi ile
                                finansal işlemlerinizi bir üst seviyeye taşıyın.
                            </p>
                            <div className="flex gap-4 pt-4">
                                <Button size="lg" onClick={handleWhatsApp}>
                                    <MessageCircle size={20} className="mr-2" />
                                    Hemen Başvuru Yap
                                </Button>
                                <Button variant="secondary" size="lg" onClick={handleWhatsApp}>
                                    <MessageCircle size={20} className="mr-2" /> WhatsApp Destek
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                        {[
                            { title: "En Yüksek Oranlar", desc: "VIP müşterilerimize özel %97'ye varan bozum oranları ile maksimum kazanç.", icon: ShieldCheck },
                            { title: "Öncelikli Ödeme", desc: "Tüm işlemleriniz sırada beklemeden anında onaylanır ve ödemeniz saniyeler içinde geçer.", icon: HeartPulse },
                            { title: "Özel Temsilci", desc: "Yüksek hacimli işlemleriniz için size atanan özel temsilci ile 7/24 kesintisiz iletişim.", icon: Headphones },
                        ].map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass p-8 rounded-3xl border-white/5 space-y-4 hover:border-primary/30 transition-all group"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <f.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-white">{f.title}</h3>
                                <p className="text-white/40 leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="glass p-8 md:p-12 rounded-[3rem] border-white/5 mb-20">
                        <div className="max-w-3xl mx-auto">
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.03] border border-white/5 text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-4">
                                    <Mail size={12} /> Bize Ulaşın
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
                                    İLETİŞİM <span className="text-primary">FORMU</span>
                                </h2>
                                <p className="text-white/40">Formu doldurun, size en kısa sürede dönüş yapalım.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* İsim Soyisim */}
                                    <div className="space-y-2">
                                        <label className="text-white/40 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                            <User size={14} /> İsim Soyisim
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all"
                                            placeholder="Adınız ve soyadınız"
                                        />
                                    </div>

                                    {/* Telefon */}
                                    <div className="space-y-2">
                                        <label className="text-white/40 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                            <Phone size={14} /> Telefon
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all"
                                            placeholder="0555 123 45 67"
                                        />
                                    </div>
                                </div>

                                {/* E-posta */}
                                <div className="space-y-2">
                                    <label className="text-white/40 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                        <Mail size={14} /> E-posta
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all"
                                        placeholder="ornek@email.com"
                                    />
                                </div>

                                {/* Konu */}
                                <div className="space-y-2">
                                    <label className="text-white/40 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                        <MessageSquare size={14} /> Konu
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all"
                                        placeholder="VIP Finans Başvurusu"
                                    />
                                </div>

                                {/* Mesaj */}
                                <div className="space-y-2">
                                    <label className="text-white/40 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                        <MessageCircle size={14} /> Mesajınız
                                    </label>
                                    <textarea
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all resize-none"
                                        placeholder="Mesajınızı buraya yazın..."
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={loading}
                                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider"
                                >
                                    {loading ? "Gönderiliyor..." : (
                                        <>
                                            <Send size={20} className="mr-2" />
                                            Mesajı Gönder
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Footer CTA */}
                    <div className="glass p-8 md:p-12 rounded-[2.5rem] border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-2">
                            <h4 className="text-2xl font-bold text-white">Yüksek tutarlı işlem mi yapacaksınız?</h4>
                            <p className="text-white/40">Sizin için en uygun oranları belirlemek için teklif alın.</p>
                        </div>
                        <Button variant="accent" size="lg" onClick={handleWhatsApp}>
                            <MessageCircle size={20} className="mr-2" />
                            Hemen Teklif Al
                        </Button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
