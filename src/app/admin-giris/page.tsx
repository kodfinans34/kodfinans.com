"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Lock, Shield, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Admin credentials check
        if (username === "admin" && password === "@Berkay50") {
            // Store admin session
            localStorage.setItem("isAdminLoggedIn", "true");
            localStorage.setItem("adminUser", username);

            setTimeout(() => {
                setIsLoading(false);
                router.push("/admin");
            }, 1000);
        } else {
            setTimeout(() => {
                setError("Kullanıcı adı veya şifre hatalı!");
                setIsLoading(false);
            }, 1000);
        }
    };

    return (
        <div className="min-h-screen bg-[#070d0b] text-white flex flex-col relative overflow-hidden">
            <Navbar />

            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-500/20 blur-[150px] rounded-full mix-blend-screen animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-600/10 blur-[150px] rounded-full mix-blend-screen" />
            </div>

            <div className="flex-1 flex items-center justify-center pt-44 pb-12 px-4 relative z-10">
                <div className="w-full max-w-md">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-red-500/10 to-transparent rounded-[2.5rem] blur-xl" />
                        <div className="bg-[#0a100e] border border-red-500/20 p-8 md:p-12 rounded-[2.5rem] space-y-8 relative shadow-2xl">

                            {/* Header */}
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 mx-auto bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/20">
                                    <Shield className="text-red-500" size={32} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white uppercase tracking-tight">Admin Paneli</h2>
                                    <p className="text-white/40 font-medium text-sm mt-2">Yetkili giriş alanı</p>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                                    <p className="text-red-500 text-sm font-bold">{error}</p>
                                </div>
                            )}

                            {/* Login Form */}
                            <form onSubmit={handleLogin} className="space-y-6">
                                <div className="space-y-4">
                                    {/* Username */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Kullanıcı Adı</label>
                                        <div className="relative group">
                                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-red-500 transition-colors">
                                                <Shield size={18} />
                                            </div>
                                            <input
                                                required
                                                type="text"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="w-full h-14 bg-white/[0.03] border border-white/5 rounded-2xl px-12 text-sm font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.05] transition-all hover:bg-white/[0.05]"
                                                placeholder="admin"
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Şifre</label>
                                        <div className="relative group">
                                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-red-500 transition-colors">
                                                <Lock size={18} />
                                            </div>
                                            <input
                                                required
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full h-14 bg-white/[0.03] border border-white/5 rounded-2xl px-12 text-sm font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.05] transition-all hover:bg-white/[0.05]"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>

                                    {/* Security Note */}
                                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                                        <p className="text-center text-xs font-medium text-white/40">
                                            🔒 Güvenli bağlantı üzerinden giriş yapıyorsunuz
                                        </p>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full py-5 h-auto text-sm font-black uppercase tracking-[0.2em] bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-xl shadow-red-500/20 hover:scale-[1.02] active:scale-98 transition-all rounded-2xl group flex items-center justify-center gap-2 relative overflow-hidden"
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

                            {/* Warning */}
                            <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4">
                                <p className="text-center text-xs font-medium text-red-500/60">
                                    ⚠️ Bu alan sadece yetkili personel içindir
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
