import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { Metadata } from "next";
import ContactFormClient from "./ContactFormClient";

export const metadata: Metadata = {
    title: "İletişim | KodFinans - Bize Ulaşın",
    description:
        "KodFinans ile iletişime geçin. 7/24 müşteri desteği, VIP üyelik talebi ve tüm sorularınız için bize yazın. destek@kodfinans.com",
    keywords:
        "kodfinans iletişim, kodfinans destek, dijital kod bozum destek, canlı destek",
    alternates: {
        canonical: "https://kodfinans.com/iletisim",
    },
    openGraph: {
        title: "İletişim | KodFinans",
        description:
            "Sorularınız ve destek talepleriniz için 7/24 yanınızdayız. Hemen iletişime geçin.",
        url: "https://kodfinans.com/iletisim",
    },
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="pt-48 pb-24 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/20 blur-[150px] -z-10 rounded-full opacity-50 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16 space-y-4">
                        <h1 className="text-4xl md:text-6xl font-bold font-inter">Bizimle İletişime Geçin</h1>
                        <p className="text-white/40 max-w-2xl mx-auto">
                            Sorularınız, önerileriniz veya VIP üyelik talepleriniz için bize ulaşabilirsiniz.
                            Müşteri hizmetlerimiz 7/24 hizmetinizdedir.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-1 space-y-6">
                            {[
                                { label: "Bize Yazın", value: "destek@kodfinans.com", icon: Mail, color: "text-blue-400" },
                                { label: "WhatsApp Destek", value: "+905517139330", icon: Phone, color: "text-green-400" },
                                { label: "Canlı Destek", value: "WhatsApp üzerinden 7/24 ulaşın", icon: MessageSquare, color: "text-primary" },
                                { label: "Adres", value: "Maslak, İstanbul / TR", icon: MapPin, color: "text-orange-400" },
                            ].map((item, i) => (
                                <div key={i} className="glass p-6 rounded-3xl border-white/5 flex items-center gap-6">
                                    <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${item.color}`}>
                                        <item.icon size={24} />
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">{item.label}</p>
                                        <p className="text-white font-medium">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Contact Form - Client Component */}
                        <div className="lg:col-span-2">
                            <ContactFormClient />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
