import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Shield, Lock, Eye, FileText, CheckCircle2, AlertTriangle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "KVKK Aydınlatma Metni | KodFinans",
    description:
        "KodFinans KVKK Aydınlatma Metni. 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verilerinizin işlenme süreçleri hakkında bilgi edinin.",
    keywords: "kvkk, kişisel verilerin korunması, kodfinans kvkk, aydınlatma metni",
    alternates: {
        canonical: "https://kodfinans.com/kvkk",
    },
};

export default function KVKKPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="pt-32 pb-24 relative overflow-hidden">
                {/* Background */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full -z-10" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -z-10" />

                <div className="max-w-4xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.03] border border-white/5 text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-6">
                            <Shield size={12} /> Yasal Bilgilendirme
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
                            KVKK <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">AYDINLATMA METNİ</span>
                        </h1>
                        <p className="text-white/40 text-sm">Son Güncelleme: 13 Şubat 2026</p>
                    </div>

                    {/* Content */}
                    <div className="space-y-8">
                        {/* Section 1 */}
                        <div className="glass p-8 rounded-[2rem] border-white/5">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">1. Veri Sorumlusu</h2>
                                    <p className="text-white/60 leading-relaxed">
                                        6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz; veri sorumlusu olarak <strong className="text-white">KodFinans</strong> tarafından aşağıda açıklanan kapsamda işlenebilecektir.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div className="glass p-8 rounded-[2rem] border-white/5">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <Eye size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">2. Kişisel Verilerin Hangi Amaçla İşleneceği</h2>
                                    <div className="space-y-3 text-white/60 leading-relaxed">
                                        <p>Toplanan kişisel verileriniz aşağıdaki amaçlarla işlenebilecektir:</p>
                                        <ul className="space-y-2 ml-6">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 size={16} className="text-primary mt-1 shrink-0" />
                                                <span>Dijital kod alım-satım ve bozum işlemlerinin gerçekleştirilmesi</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 size={16} className="text-primary mt-1 shrink-0" />
                                                <span>Üyelik işlemlerinin yürütülmesi ve kimlik doğrulama</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 size={16} className="text-primary mt-1 shrink-0" />
                                                <span>Ödeme ve finansal işlemlerin güvenli bir şekilde gerçekleştirilmesi</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 size={16} className="text-primary mt-1 shrink-0" />
                                                <span>Müşteri hizmetleri ve destek taleplerinin yanıtlanması</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 size={16} className="text-primary mt-1 shrink-0" />
                                                <span>Yasal yükümlülüklerin yerine getirilmesi</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 size={16} className="text-primary mt-1 shrink-0" />
                                                <span>Platform güvenliğinin sağlanması ve dolandırıcılık önleme</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 3 */}
                        <div className="glass p-8 rounded-[2rem] border-white/5">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <Lock size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">3. İşlenen Kişisel Veriler</h2>
                                    <div className="space-y-3 text-white/60 leading-relaxed">
                                        <p>Platformumuz üzerinden aşağıdaki kişisel verileriniz işlenmektedir:</p>
                                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                                            <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                                <h3 className="text-white font-bold text-sm mb-2">Kimlik Bilgileri</h3>
                                                <p className="text-xs text-white/40">Ad, soyad, T.C. kimlik numarası (gerektiğinde)</p>
                                            </div>
                                            <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                                <h3 className="text-white font-bold text-sm mb-2">İletişim Bilgileri</h3>
                                                <p className="text-xs text-white/40">E-posta adresi, telefon numarası</p>
                                            </div>
                                            <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                                <h3 className="text-white font-bold text-sm mb-2">Finansal Bilgiler</h3>
                                                <p className="text-xs text-white/40">IBAN, işlem geçmişi, bakiye bilgileri</p>
                                            </div>
                                            <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                                <h3 className="text-white font-bold text-sm mb-2">İşlem Bilgileri</h3>
                                                <p className="text-xs text-white/40">Sipariş detayları, bozum talepleri, dijital kodlar</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 4 */}
                        <div className="glass p-8 rounded-[2rem] border-white/5">
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">4. Kişisel Verilerin Aktarılması</h2>
                            <p className="text-white/60 leading-relaxed mb-4">
                                Kişisel verileriniz, KVKK'nın 8. ve 9. maddelerinde belirtilen şartlar çerçevesinde:
                            </p>
                            <ul className="space-y-2 text-white/60 ml-6">
                                <li>• Ödeme hizmet sağlayıcılarına (güvenli ödeme işlemleri için)</li>
                                <li>• Yasal mercilere (yasal yükümlülükler kapsamında)</li>
                                <li>• Hizmet sağlayıcı iş ortaklarımıza (platform altyapısı için)</li>
                            </ul>
                            <p className="text-white/60 leading-relaxed mt-4">
                                aktarılabilecektir. Yurtdışına veri aktarımı söz konusu olduğunda KVKK'nın 9. maddesi hükümlerine uygun hareket edilmektedir.
                            </p>
                        </div>

                        {/* Section 5 */}
                        <div className="glass p-8 rounded-[2rem] border-white/5">
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">5. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h2>
                            <p className="text-white/60 leading-relaxed mb-4">
                                Kişisel verileriniz, platformumuz üzerinden elektronik ortamda toplanmaktadır. KVKK'nın 5. ve 6. maddelerinde belirtilen:
                            </p>
                            <ul className="space-y-2 text-white/60 ml-6">
                                <li>• Açık rızanızın bulunması</li>
                                <li>• Sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması</li>
                                <li>• Hukuki yükümlülüğün yerine getirilmesi</li>
                                <li>• Meşru menfaatlerimizin korunması</li>
                            </ul>
                            <p className="text-white/60 leading-relaxed mt-4">
                                hukuki sebeplerine dayanılarak işlenmektedir.
                            </p>
                        </div>

                        {/* Section 6 */}
                        <div className="glass p-8 rounded-[2rem] border-white/5">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <AlertTriangle size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">6. Kişisel Veri Sahibinin Hakları</h2>
                                    <p className="text-white/60 leading-relaxed mb-4">
                                        KVKK'nın 11. maddesi uyarınca kişisel veri sahipleri olarak aşağıdaki haklara sahipsiniz:
                                    </p>
                                    <ul className="space-y-2 text-white/60 ml-6">
                                        <li>• Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                                        <li>• İşlenmişse buna ilişkin bilgi talep etme</li>
                                        <li>• İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                                        <li>• Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
                                        <li>• Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
                                        <li>• KVKK'da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme</li>
                                        <li>• Aktarıldığı üçüncü kişilere yukarıdaki işlemlerin bildirilmesini isteme</li>
                                        <li>• Münhasıran otomatik sistemler ile analiz edilmesi nedeniyle aleyhinize bir sonuç doğmasına itiraz etme</li>
                                        <li>• Kanuna aykırı işleme nedeniyle zarara uğramanız halinde zararın giderilmesini talep etme</li>
                                    </ul>
                                    <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                                        <p className="text-white/80 text-sm leading-relaxed">
                                            <strong className="text-white">Başvuru Yöntemi:</strong> Haklarınızı kullanmak için <strong className="text-primary">bilgi@kodfinans.com</strong> adresine yazılı olarak başvurabilirsiniz.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="text-center p-8 bg-white/[0.02] rounded-[2rem] border border-white/5">
                            <p className="text-white/60 text-sm leading-relaxed">
                                KVKK kapsamındaki sorularınız için: <a href="mailto:bilgi@kodfinans.com" className="text-primary hover:underline font-bold">bilgi@kodfinans.com</a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
