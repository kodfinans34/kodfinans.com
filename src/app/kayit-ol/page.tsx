"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { User, Lock, Mail, ArrowRight, Github, Chrome, CheckCircle2, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSystem } from "@/context/SystemContext";

export default function RegisterPage() {
    const router = useRouter();
    const { register, sendEmail, settings } = useSystem();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        password: ""
    });

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const fullName = `${formData.name} ${formData.surname}`;

        // Simulate registration delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        register({
            name: fullName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password
        });

        // Send Welcome Email
        sendEmail({
            to: formData.email,
            subject: "KodFinans'a Hoş Geldiniz!",
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #ed1c24;">Hoş Geldiniz, ${fullName}!</h2>
                    <p>KodFinans ailesine katıldığınız için teşekkür ederiz.</p>
                    <p>Artık avantajlı oranlarla kod bozum işlemleri yapabilir ve güvenle alışveriş yapabilirsiniz.</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="font-size: 12px; color: #999;">Bu mesaj otomatik olarak gönderilmiştir.</p>
                </div>
            `
        });

        // Send Notification to Admin
        sendEmail({
            to: settings.smtpFrom || "bilgi@kodfinans.com",
            subject: "Yeni Üye Kaydı!",
            text: `Yeni bir kullanıcı kayıt oldu: ${fullName} (${formData.email})`
        });

        setIsLoading(false);
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
            <Navbar />

            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full mix-blend-screen animate-pulse" />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full mix-blend-screen" />
            </div>

            <div className="flex-1 flex items-center justify-center pt-44 pb-12 px-4 relative z-10">
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Left Side - Register Text */}
                    <div className="hidden md:block space-y-8 order-2 md:order-1">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-primary text-xs font-black tracking-widest uppercase mb-6">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                Yepyeni Bir Deneyim
                            </div>
                            <h1 className="text-6xl font-black font-inter text-white leading-tight tracking-tighter mb-4">
                                BİZE <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">KATILIN</span>
                            </h1>
                            <p className="text-white/40 text-lg leading-relaxed max-w-md font-medium">
                                Hemen üye olun, avantajlı kod bozum oranlarından ve güvenli alışveriş dünyasından yararlanın.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { title: "Cüzdan Sistemi", desc: "Anında bakiye yükleme" },
                                { title: "Referans Geliri", desc: "Arkadaşını davet et kazan" },
                                { title: "Özel Teklifler", desc: "VIP üyelere özel oranlar" },
                                { title: "Yıldırım Hızı", desc: "Otomatik işlem garantisi" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                    <CheckCircle2 className="text-primary mt-1" size={16} />
                                    <div>
                                        <h4 className="font-bold text-white text-sm">{item.title}</h4>
                                        <p className="text-[10px] text-white/40 uppercase font-medium tracking-wider">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Register Form */}
                    <div className="relative order-1 md:order-2">
                        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent rounded-[2.5rem] blur-xl" />
                        <div className="bg-[#0a100e] border border-white/10 p-8 md:p-12 rounded-[2.5rem] space-y-8 relative shadow-2xl">
                            <div className="text-center space-y-2">
                                <h2 className="text-2xl font-black text-white uppercase tracking-tight">Hesap Oluştur</h2>
                                <p className="text-white/40 font-medium text-sm">Formu doldurarak aramıza katılın.</p>
                            </div>

                            <form onSubmit={handleRegister} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Ad</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full h-14 bg-white/[0.03] border border-white/5 rounded-2xl px-6 text-sm font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all hover:bg-white/[0.05]"
                                                placeholder="Ahmet"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Soyad</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full h-14 bg-white/[0.03] border border-white/5 rounded-2xl px-6 text-sm font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all hover:bg-white/[0.05]"
                                                placeholder="Yılmaz"
                                                value={formData.surname}
                                                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">E-Posta</label>
                                        <div className="relative group">
                                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors">
                                                <Mail size={18} />
                                            </div>
                                            <input
                                                required
                                                type="email"
                                                className="w-full h-14 bg-white/[0.03] border border-white/5 rounded-2xl px-12 text-sm font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all hover:bg-white/[0.05]"
                                                placeholder="ornek@kodfinans.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Telefon</label>
                                        <div className="relative group">
                                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors">
                                                <Phone size={18} />
                                            </div>
                                            <input
                                                required
                                                type="tel"
                                                className="w-full h-14 bg-white/[0.03] border border-white/5 rounded-2xl px-12 text-sm font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all hover:bg-white/[0.05]"
                                                placeholder="0555 555 55 55"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Şifre</label>
                                        <div className="relative group">
                                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors">
                                                <Lock size={18} />
                                            </div>
                                            <input
                                                required
                                                type="password"
                                                className="w-full h-14 bg-white/[0.03] border border-white/5 rounded-2xl px-12 text-sm font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all hover:bg-white/[0.05]"
                                                placeholder="••••••••"
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 py-2">
                                        <input required type="checkbox" className="w-5 h-5 rounded border-white/10 bg-white/5 text-primary focus:ring-primary/50 focus:ring-offset-0 cursor-pointer accent-primary" />
                                        <span className="text-xs font-bold text-white/60">
                                            <Link href="#" className="text-primary hover:text-white transition-colors">Kullanıcı Sözleşmesi</Link>'ni kabul ediyorum.
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    className="w-full py-5 h-auto text-sm font-black uppercase tracking-[0.2em] bg-gradient-to-r from-primary to-purple-500 text-white shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-98 transition-all rounded-2xl group flex items-center justify-center gap-2 relative overflow-hidden"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                                    ) : (
                                        <>
                                            KAYIT OL <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </form>


                            <p className="text-center text-xs font-medium text-white/30 pt-4">
                                Zaten hesabınız var mı? <Link href="/giris" className="text-white hover:text-primary transition-colors font-bold">Giriş Yapın</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
