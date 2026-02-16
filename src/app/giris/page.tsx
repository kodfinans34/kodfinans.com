"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { User, Lock, Mail, ArrowRight, Github, Chrome, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSystem } from "@/context/SystemContext";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useSystem();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const success = await login(email, password);
            if (success) {
                router.push("/");
            } else {
                setError("E-posta veya şifre hatalı!");
                setIsLoading(false);
            }
        } catch (err) {
            setError("Bir hata oluştu.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050506] text-white flex flex-col relative overflow-hidden">
            <Navbar />

            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full mix-blend-screen animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen" />
            </div>

            <div className="flex-1 flex items-center justify-center pt-44 pb-12 px-4 relative z-10">
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Left Side - Hero Text */}
                    <div className="hidden md:block space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-primary text-xs font-black tracking-widest uppercase mb-6">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                KodFinans ID
                            </div>
                            <h1 className="text-6xl font-black font-inter text-white leading-tight tracking-tighter mb-4">
                                DİJİTAL <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">KİMLİĞİNİZ</span>
                            </h1>
                            <p className="text-white/40 text-lg leading-relaxed max-w-md font-medium">
                                Tek bir hesap ile tüm dijital varlıklarınızı yönetin, oyun kodlarınızı nakite çevirin ve güvenli alışverişin keyfini çıkarın.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { title: "Güvenli İşlem", desc: "256-bit SSL koruması" },
                                { title: "7/24 Destek", desc: "Kesintisiz canlı destek" },
                                { title: "Anında Teslimat", desc: "Otomatik kod gönderimi" },
                                { title: "Yüksek Oranlar", desc: "En iyi bozum kurları" }
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

                    {/* Right Side - Login Form */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-[2.5rem] blur-xl" />
                        <div className="bg-[#08080a] border border-white/10 p-8 md:p-12 rounded-[2.5rem] space-y-8 relative shadow-2xl">
                            <div className="text-center space-y-2">
                                <h2 className="text-2xl font-black text-white uppercase tracking-tight">Hoş Geldiniz</h2>
                                <p className="text-white/40 font-medium text-sm">Devam etmek için giriş yapın.</p>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">E-Posta Adresi</label>
                                        <div className="relative group">
                                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors">
                                                <Mail size={18} />
                                            </div>
                                            <input
                                                required
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full h-14 bg-white/[0.03] border border-white/5 rounded-2xl px-12 text-sm font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all hover:bg-white/[0.05]"
                                                placeholder="ornek@kodfinans.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between ml-1 mr-1">
                                            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Şifre</label>
                                            <Link href="#" className="text-[10px] font-bold text-primary/60 hover:text-primary uppercase tracking-wider transition-colors">Şifremi Unuttum</Link>
                                        </div>
                                        <div className="relative group">
                                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors">
                                                <Lock size={18} />
                                            </div>
                                            <input
                                                required
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full h-14 bg-white/[0.03] border border-white/5 rounded-2xl px-12 text-sm font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all hover:bg-white/[0.05]"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>
                                    {error && (
                                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold text-center animate-pulse">
                                            {error}
                                        </div>
                                    )}
                                </div>

                                <Button
                                    className="w-full py-5 h-auto text-sm font-black uppercase tracking-[0.2em] bg-gradient-to-r from-primary to-secondary text-white shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-98 transition-all rounded-2xl group flex items-center justify-center gap-2 relative overflow-hidden"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                                    ) : (
                                        <>
                                            GİRİŞ YAP <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </form>

                            <div className="relative flex items-center justify-center py-2">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/5"></div>
                                </div>
                                <span className="relative z-10 bg-[#08080a] px-4 text-[10px] font-black text-white/20 uppercase tracking-widest">VEYA</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button className="h-12 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 rounded-xl flex items-center justify-center gap-3 transition-all group">
                                    <Chrome className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                                    <span className="text-xs font-bold text-white/40 group-hover:text-white transition-colors">Google</span>
                                </button>
                                <button className="h-12 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 rounded-xl flex items-center justify-center gap-3 transition-all group">
                                    <Github className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                                    <span className="text-xs font-bold text-white/40 group-hover:text-white transition-colors">Github</span>
                                </button>
                            </div>

                            <p className="text-center text-xs font-medium text-white/30 pt-4">
                                Hesabınız yok mu? <Link href="/kayit-ol" className="text-white hover:text-primary transition-colors font-bold">Hemen Kayıt Olun</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
