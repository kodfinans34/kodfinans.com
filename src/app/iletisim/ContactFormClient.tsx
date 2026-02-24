"use client";

import { Button } from "@/components/ui/Button";
import { Send } from "lucide-react";

export default function ContactFormClient() {
    return (
        <div className="glass p-8 md:p-12 rounded-[3rem] border-white/5 space-y-8">
            <form className="grid md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Adınız Soyadınız</label>
                    <input
                        type="text"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                        placeholder="Ad Soyad"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">E-Posta Adresiniz</label>
                    <input
                        type="email"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                        placeholder="ornek@mail.com"
                    />
                </div>
                <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Konu</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                        <option className="bg-[#080809]">Genel Sorular</option>
                        <option className="bg-[#080809]">Bozum İşlemi Takibi</option>
                        <option className="bg-[#080809]">VIP Finans Başvurusu</option>
                        <option className="bg-[#080809]">Ödeme Problemi</option>
                    </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Mesajınız</label>
                    <textarea
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none"
                        placeholder="Size nasıl yardımcı olabiliriz?"
                    />
                </div>
                <div className="md:col-span-2">
                    <Button variant="primary" size="lg" className="w-full py-5">
                        Mesaj Gönder <Send size={20} className="ml-2" />
                    </Button>
                </div>
            </form>
        </div>
    );
}
