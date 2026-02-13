"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { Trash2, CreditCard, Landmark, Wallet, Check, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSystem } from "@/context/SystemContext";

export default function CheckoutPage() {
    const { cart, total, removeFromCart, clearCart } = useCart();
    const { settings, addOrder, userBalance, deductFromBalance, user, sendEmail, isLoggedIn } = useSystem();
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState<"balance" | "card" | "transfer">("balance");
    const [agreement, setAgreement] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    // Check if user is logged in
    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/giris");
        } else {
            setIsChecking(false);
        }
    }, [isLoggedIn, router]);

    // Contact Info - Pre-fill if user logged in
    const [contactInfo, setContactInfo] = useState({
        name: user?.name || "",
        surname: "",
        email: user?.email || "",
        phone: user?.phone || ""
    });

    const [lastOrderTotal, setLastOrderTotal] = useState(0);

    const handlePayment = async () => {
        if (!user) {
            router.push("/giris");
            return;
        }
        if (!contactInfo.name || !contactInfo.email || !contactInfo.phone) {
            alert("Lütfen iletişim bilgilerinizi eksiksiz doldurunuz.");
            return;
        }
        if (!agreement) {
            alert("Lütfen sözleşmeleri onaylayınız.");
            return;
        }

        if (paymentMethod === "balance") {
            if (userBalance < total) {
                alert("Yetersiz bakiye! Lütfen bakiye yükleyiniz veya başka bir ödeme yöntemi seçiniz.");
                return;
            }
        }

        setLoading(true);
        const currentTotal = total; // Capture total

        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (paymentMethod === "balance") {
            deductFromBalance(currentTotal);
        }

        const orderData = {
            items: cart.map(item => ({
                productId: typeof item.id === 'string' ? parseInt(item.id) : item.id,
                productName: item.name,
                price: item.price,
                quantity: item.quantity,
                variant: item.variant
            })),
            totalAmount: currentTotal,
            customerInfo: {
                name: `${contactInfo.name} ${contactInfo.surname}`,
                email: contactInfo.email,
                phone: contactInfo.phone,
            },
            paymentMethod: (paymentMethod === "balance" ? "balance" : paymentMethod === "card" ? "credit_card" : "transfer") as "balance" | "credit_card" | "transfer",
            userId: user?.email
        };

        addOrder(orderData);

        // --- EMAIL NOTIFICATIONS ---
        // 1. To Customer
        sendEmail({
            to: contactInfo.email,
            subject: "Siparişiniz Alındı! - KodFinans",
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #ed1c24;">Siparişiniz İçin Teşekkürler!</h2>
                    <p>Sayın <b>${contactInfo.name} ${contactInfo.surname}</b>, siparişiniz başarıyla alınmıştır.</p>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 10px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">Sipariş Özeti:</h3>
                        ${cart.map(item => `<p style="margin: 5px 0;">• ${item.name} (${item.variant}) x ${item.quantity} - <b>₺${item.price}</b></p>`).join('')}
                        <hr style="border: 0; border-top: 1px solid #ddd; margin: 10px 0;">
                        <p style="font-size: 18px;"><b>Toplam: ₺${currentTotal.toFixed(2)}</b></p>
                    </div>
                    <p>Siparişiniz onaylandığında kodlarınız e-posta ile tarafınıza iletilecektir. Ayrıca panelinizden de takip edebilirsiniz.</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="font-size: 12px; color: #999;">Bu mesaj otomatik olarak gönderilmiştir.</p>
                </div>
            `
        });

        // 2. To Admin
        sendEmail({
            to: settings.smtpFrom || "bilgi@kodfinans.com",
            subject: "YENİ SİPARİŞ! - KodFinans",
            text: `Yeni bir sipariş geldi! \nMüşteri: ${contactInfo.name} ${contactInfo.surname} \nTutar: ₺${currentTotal.toFixed(2)} \nÖdeme: ${paymentMethod}`
        });

        // WhatsApp notification removed per request. Admin and Email only.

        setLastOrderTotal(currentTotal);
        clearCart();
        setSuccess(true);
        setLoading(false);
    };

    const faqs = [
        {
            question: "Ödeme ne kadar güvenli?",
            answer: "Tüm kredi kartı işlemleriniz 256-bit SSL sertifikası ve 3D Secure güvencesiyle korunmaktadır. Bilgileriniz asla saklanmaz."
        },
        {
            question: "Kod ne zaman teslim edilir?",
            answer: "Ödemeniz onaylandıktan hemen sonra dijital kodunuz e-posta adresinize ve panelinize anında gönderilir. 7/24 otomatik teslimat yapılmaktadır."
        },
        {
            question: "İade edebilir miyim?",
            answer: "Dijital kod ürünleri, doğası gereği tek kullanımlık olduğu için görüntülendikten sonra iade edilemez. Lütfen satın almadan önce doğru ürün olduğundan emin olunuz."
        }
    ];

    // Show loading while checking auth
    if (isChecking) {
        return (
            <div className="min-h-screen bg-[#050506] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white/40 text-sm font-bold">Yetkilendiriliyor...</p>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen bg-[#050506] text-white font-poppins flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="max-w-md w-full glass p-8 rounded-[2.5rem] border-white/10 text-center space-y-6">
                        <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-4">
                            <Check size={40} />
                        </div>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tight">Sipariş Alındı!</h2>
                        <p className="text-white/60 text-sm font-medium leading-relaxed">
                            Siparişiniz başarıyla oluşturuldu. Kodlarınız e-posta adresinize ve panelinize gönderilecektir.
                        </p>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                            <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Sipariş Tutarı</p>
                            <p className="text-2xl font-black text-white italic">₺{lastOrderTotal.toFixed(2)}</p>
                        </div>
                        <Button onClick={() => router.push("/panel")} className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-widest text-xs transition-all">
                            Siparişlerime Git
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050506] text-white font-poppins selection:bg-primary/30">
            <Navbar />
            <main className="pt-32 md:pt-48 pb-24 relative overflow-hidden">
                {/* Dynamic Background */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full -z-10 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 blur-[120px] rounded-full -z-10" />

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter mb-12">Ödeme</h1>

                    <div className="grid lg:grid-cols-12 gap-8 items-start">
                        {/* Left Side: Payment & Forms */}
                        <div className="lg:col-span-8 space-y-8">

                            {/* Contact Info */}
                            <div className="glass p-8 rounded-[2.5rem] border-white/5">
                                <h2 className="text-xl font-bold mb-6 text-white uppercase tracking-wider">İletişim Bilgileri</h2>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Ad</label>
                                            <input
                                                type="text"
                                                placeholder="Adınız"
                                                value={contactInfo.name}
                                                onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                                                className="w-full h-14 bg-white/[0.03] border border-white/5 rounded-2xl px-6 text-sm font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Soyad</label>
                                            <input
                                                type="text"
                                                placeholder="Soyadınız"
                                                value={contactInfo.surname}
                                                onChange={(e) => setContactInfo({ ...contactInfo, surname: e.target.value })}
                                                className="w-full h-14 bg-white/[0.03] border border-white/5 rounded-2xl px-6 text-sm font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">E-Posta</label>
                                            <input
                                                type="email"
                                                placeholder="ornek@mail.com"
                                                value={contactInfo.email}
                                                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                                                className="w-full h-14 bg-white/[0.03] border border-white/5 rounded-2xl px-6 text-sm font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Telefon</label>
                                            <input
                                                type="tel"
                                                placeholder="05XX XXX XX XX"
                                                value={contactInfo.phone}
                                                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                                                className="w-full h-14 bg-white/[0.03] border border-white/5 rounded-2xl px-6 text-sm font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <div className="glass p-8 rounded-[2.5rem] border-white/5">
                                <h2 className="text-xl font-bold mb-6 text-white uppercase tracking-wider">Ödeme Yöntemi</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <button
                                        onClick={() => setPaymentMethod("balance")}
                                        className={cn(
                                            "p-6 rounded-3xl border transition-all flex flex-col items-center gap-3 relative overflow-hidden group",
                                            paymentMethod === "balance"
                                                ? "bg-primary/10 border-primary/50 text-white shadow-[0_10px_30px_rgba(74,188,241,0.1)]"
                                                : "bg-white/5 border-white/5 text-white/30 hover:bg-white/10 hover:border-white/20"
                                        )}
                                    >
                                        <Wallet size={28} />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Bakiyeden Öde</span>
                                    </button>
                                    <button
                                        onClick={() => setPaymentMethod("card")}
                                        className={cn(
                                            "p-6 rounded-3xl border transition-all flex flex-col items-center gap-3 relative overflow-hidden group",
                                            paymentMethod === "card"
                                                ? "bg-primary/10 border-primary/50 text-white shadow-[0_10px_30px_rgba(74,188,241,0.1)]"
                                                : "bg-white/5 border-white/5 text-white/30 hover:bg-white/10 hover:border-white/20"
                                        )}
                                    >
                                        <CreditCard size={28} />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Kredi Kartı</span>
                                    </button>
                                    <button
                                        onClick={() => setPaymentMethod("transfer")}
                                        className={cn(
                                            "p-6 rounded-3xl border transition-all flex flex-col items-center gap-3 relative overflow-hidden group",
                                            paymentMethod === "transfer"
                                                ? "bg-primary/10 border-primary/50 text-white shadow-[0_10px_30px_rgba(74,188,241,0.1)]"
                                                : "bg-white/5 border-white/5 text-white/30 hover:bg-white/10 hover:border-white/20"
                                        )}
                                    >
                                        <Landmark size={28} />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Havale / EFT</span>
                                    </button>
                                </div>

                                <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/5 text-sm text-white/60 leading-relaxed">
                                    {paymentMethod === "balance" && (
                                        <div>
                                            <p className="font-bold text-white mb-2">Mevcut Bakiyeniz: ₺{userBalance.toFixed(2)}</p>
                                            <p>Hesabınızdaki bakiye ile güvenli ve komisyonsuz ödeme yapabilirsiniz. Eğer bakiyeniz yetersizse lütfen önce bakiye yükleyiniz.</p>
                                        </div>
                                    )}
                                    {paymentMethod === "card" && (
                                        <p>Kredi kartı veya banka kartınızla 3D Secure altyapısı üzerinden güvenli ödeme yapabilirsiniz. Kart bilgileriniz KodFinans sunucularında saklanmaz.</p>
                                    )}
                                    {paymentMethod === "transfer" && (
                                        <p>Banka hesaplarımıza 7/24 havale veya EFT yapabilirsiniz. Ödeme yaparken açıklama kısmına sipariş numaranızı yazmayı unutmayınız. İşleminiz onaylandıktan sonra bakiyeniz tanımlanır veya ürününüz teslim edilir.</p>
                                    )}
                                </div>
                            </div>

                            {/* FAQ */}
                            <div className="glass p-8 rounded-[2.5rem] border-white/5">
                                <h3 className="text-xl font-bold mb-6 text-white uppercase tracking-wider">Sık Sorulan Sorular</h3>
                                <div className="space-y-3">
                                    {faqs.map((faq, index) => (
                                        <div key={index} className="border border-white/5 rounded-2xl overflow-hidden bg-white/[0.02]">
                                            <button
                                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                                className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-white/80 hover:bg-white/5 transition-colors"
                                            >
                                                {faq.question}
                                                {openFaq === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                            </button>
                                            <div className={cn(
                                                "overflow-hidden transition-all duration-300",
                                                openFaq === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                            )}>
                                                <div className="p-4 pt-0 text-xs text-white/50 leading-relaxed">
                                                    {faq.answer}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Order Summary */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="glass p-8 rounded-[2.5rem] border-white/5 sticky top-32">
                                <h2 className="text-xl font-bold mb-6 text-white uppercase tracking-wider">Sipariş Özeti</h2>

                                {cart.length === 0 ? (
                                    <p className="text-white/40 text-center py-8">Sepetiniz boş.</p>
                                ) : (
                                    <div className="space-y-4 mb-8">
                                        {cart.map(item => (
                                            <div key={`${item.id}-${item.variant}`} className="group flex gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 relative">
                                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/20 shrink-0">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-white font-bold text-xs uppercase tracking-tight truncate">{item.name}</h4>
                                                    <p className="text-white/40 text-[10px] mt-1">{item.variant}</p>
                                                    <div className="flex justify-between items-center mt-2">
                                                        <span className="text-primary text-xs font-bold">₺{item.price.toFixed(2)}</span>
                                                        <span className="text-white/40 text-[10px]">x{item.quantity}</span>
                                                    </div>
                                                </div>
                                                <button onClick={() => removeFromCart(item.id, item.variant)} className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="border-t border-white/10 pt-6 space-y-4">
                                    <div className="flex justify-between text-white/60 text-xs font-bold uppercase tracking-widest">
                                        <span>Ara Toplam</span>
                                        <span>₺{total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-2xl font-black text-white italic tracking-tighter">
                                        <span>Toplam</span>
                                        <span>₺{total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/10">
                                    <label className="flex items-start gap-3 cursor-pointer group mb-6">
                                        <div className={cn("w-5 h-5 rounded border border-white/20 flex items-center justify-center transition-all shrink-0 mt-0.5", agreement ? "bg-primary border-primary" : "group-hover:border-white/40")}>
                                            {agreement && <Check size={12} className="text-white" />}
                                        </div>
                                        <span className="text-xs text-white/60 group-hover:text-white transition-colors leading-snug select-none">
                                            <Link href="#" className="text-primary hover:underline">Mesafeli Satış Sözleşmesi</Link> ve <Link href="#" className="text-primary hover:underline">Ön Bilgilendirme Formu</Link>'nu okudum ve onaylıyorum.
                                        </span>
                                        <input type="checkbox" checked={agreement} onChange={() => setAgreement(!agreement)} className="hidden" />
                                    </label>

                                    <Button
                                        className={cn("w-full py-6 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed")}
                                        disabled={!agreement || cart.length === 0 || loading}
                                        onClick={handlePayment}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin mr-2" />
                                                İŞLENİYOR...
                                            </>
                                        ) : !user ? (
                                            "GİRİŞ YAP VE ÖDEMEYİ TAMAMLA"
                                        ) : (
                                            "ÖDEMEYİ TAMAMLA"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
