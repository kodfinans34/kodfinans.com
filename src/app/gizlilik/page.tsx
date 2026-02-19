"use client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Lock, Eye, Shield, Server, UserCheck, FileText, AlertCircle } from "lucide-react";

export default function GizlilikPage() {
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
                            <Lock size={12} /> Gizlilik ve Güvenlik
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
                            GİZLİLİK <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">POLİTİKASI</span>
                        </h1>
                        <p className="text-white/40 text-sm">Son Güncelleme: 13 Şubat 2026</p>
                    </div>

                    {/* Content */}
                    <div className="space-y-8">
                        {/* Intro */}
                        <div className="glass p-8 rounded-[2rem] border-white/5">
                            <p className="text-white/60 leading-relaxed">
                                KodFinans olarak, kullanıcılarımızın gizliliğini korumayı en önemli önceliklerimizden biri olarak görüyoruz. Bu Gizlilik Politikası, platformumuz üzerinden topladığımız kişisel bilgilerin nasıl kullanıldığını, saklandığını ve korunduğunu açıklamaktadır.
                            </p>
                        </div>

                        {/* Section 1 */}
                        <div className="glass p-8 rounded-[2rem] border-white/5">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <Eye size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">1. Toplanan Bilgiler</h2>
                                    <div className="space-y-4 text-white/60 leading-relaxed">
                                        <div>
                                            <h3 className="text-white font-bold mb-2">Kişisel Bilgiler:</h3>
                                            <ul className="space-y-1 ml-6">
                                                <li>• Ad, soyad</li>
                                                <li>• E-posta adresi</li>
                                                <li>• Telefon numarası</li>
                                                <li>• IBAN bilgileri (para çekme işlemleri için)</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold mb-2">İşlem Bilgileri:</h3>
                                            <ul className="space-y-1 ml-6">
                                                <li>• Satın alma ve bozum işlem geçmişi</li>
                                                <li>• Dijital kod bilgileri</li>
                                                <li>• Ödeme yöntemleri</li>
                                                <li>• Bakiye hareketleri</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold mb-2">Teknik Bilgiler:</h3>
                                            <ul className="space-y-1 ml-6">
                                                <li>• IP adresi</li>
                                                <li>• Tarayıcı türü ve sürümü</li>
                                                <li>• Cihaz bilgileri</li>
                                                <li>• Çerez verileri</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div className="glass p-8 rounded-[2rem] border-white/5">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">2. Bilgilerin Kullanım Amaçları</h2>
                                    <div className="space-y-3 text-white/60 leading-relaxed">
                                        <p>Topladığımız bilgileri aşağıdaki amaçlarla kullanırız:</p>
                                        <ul className="space-y-2 ml-6">
                                            <li>• Hesap oluşturma ve yönetimi</li>
                                            <li>• Alım-satım ve bozum işlemlerinin gerçekleştirilmesi</li>
                                            <li>• Ödeme işlemlerinin güvenli bir şekilde yapılması</li>
                                            <li>• Müşteri destek hizmetlerinin sağlanması</li>
                                            <li>• Platform güvenliğinin sağlanması ve dolandırıcılık tespiti</li>
                                            <li>• Yasal yükümlülüklerin yerine getirilmesi</li>
                                            <li>• Hizmet kalitesinin iyileştirilmesi ve kişiselleştirilmesi</li>
                                            <li>• Kampanya ve duyuruların iletilmesi (onay vermeniz halinde)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 3 */}
                        <div className="glass p-8 rounded-[2rem] border-white/5">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <Shield size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">3. Veri Güvenliği</h2>
                                    <div className="space-y-4 text-white/60 leading-relaxed">
                                        <p>Kişisel bilgilerinizin güvenliğini sağlamak için aşağıdaki önlemleri alıyoruz:</p>
                                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                                            <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                                <h3 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                                                    <Lock size={16} className="text-primary" />
                                                    SSL/TLS Şifreleme
                                                </h3>
                                                <p className="text-xs text-white/40">Tüm veri transferleri 256-bit SSL sertifikası ile şifrelenir</p>
                                            </div>
                                            <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                                <h3 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                                                    <Server size={16} className="text-primary" />
                                                    Güvenli Sunucular
                                                </h3>
                                                <p className="text-xs text-white/40">Verileriniz güvenli ve yedekli sunucularda saklanır</p>
                                            </div>
                                            <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                                <h3 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                                                    <UserCheck size={16} className="text-primary" />
                                                    Erişim Kontrolü
                                                </h3>
                                                <p className="text-xs text-white/40">Verilerinize sadece yetkili personel erişebilir</p>
                                            </div>
                                            <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                                <h3 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                                                    <AlertCircle size={16} className="text-primary" />
                                                    Düzenli Denetim
                                                </h3>
                                                <p className="text-xs text-white/40">Güvenlik sistemlerimiz sürekli izlenir ve güncellenir</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 4 */}
                        <div className="glass p-8 rounded-[2rem] border-white/5">
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">4. Bilgi Paylaşımı</h2>
                            <div className="space-y-3 text-white/60 leading-relaxed">
                                <p>Kişisel bilgilerinizi aşağıdaki durumlar dışında üçüncü taraflarla paylaşmayız:</p>
                                <ul className="space-y-2 ml-6">
                                    <li>• <strong className="text-white">Ödeme İşlemcileri:</strong> Güvenli ödeme işlemleri için (kredi kartı bilgileri asla saklanmaz)</li>
                                    <li>• <strong className="text-white">Yasal Zorunluluklar:</strong> Mahkeme kararı veya yasal mercilerin talebi üzerine</li>
                                    <li>• <strong className="text-white">Hizmet Sağlayıcılar:</strong> Platform altyapısı ve teknik destek için (gizlilik sözleşmeleri ile korunur)</li>
                                    <li>• <strong className="text-white">Açık Rızanız:</strong> Sizin onayınızla belirttiğiniz üçüncü taraflar</li>
                                </ul>
                            </div>
                        </div>

                        {/* Section 5 */}
                        <div className="glass p-8 rounded-[2rem] border-white/5">
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">5. Veri Saklama Süresi</h2>
                            <p className="text-white/60 leading-relaxed">
                                Kişisel verileriniz, işleme amaçlarının gerektirdiği süre boyunca ve yasal saklama yükümlülüklerimiz çerçevesinde saklanır. Hesabınızı silmeniz durumunda, yasal zorunluluklar dışındaki tüm verileriniz <strong className="text-white">30 gün içinde</strong> sistemlerimizden kalıcı olarak silinir.
                            </p>
                        </div>

                        {/* Section 6 */}
                        <div className="glass p-8 rounded-[2rem] border-white/5">
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">6. Haklarınız</h2>
                            <div className="space-y-3 text-white/60 leading-relaxed">
                                <p>Kişisel verilerinizle ilgili olarak aşağıdaki haklara sahipsiniz:</p>
                                <ul className="space-y-2 ml-6">
                                    <li>• Verilerinize erişim ve kopyasını talep etme</li>
                                    <li>• Yanlış veya eksik verilerin düzeltilmesini isteme</li>
                                    <li>• Verilerinizin silinmesini talep etme</li>
                                    <li>• Veri işleme faaliyetlerine itiraz etme</li>
                                    <li>• Pazarlama iletişimlerinden çıkma</li>
                                </ul>
                                <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                                    <p className="text-white/80 text-sm leading-relaxed">
                                        Bu haklarınızı kullanmak için <strong className="text-primary">bilgi@kodfinans.com</strong> adresine e-posta gönderebilirsiniz.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Section 7 */}
                        <div className="glass p-8 rounded-[2rem] border-white/5">
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">7. Çocukların Gizliliği</h2>
                            <p className="text-white/60 leading-relaxed">
                                Platformumuz 18 yaş altı bireyler için tasarlanmamıştır. Bilerek 18 yaş altındaki kişilerden kişisel bilgi toplamıyoruz. Eğer 18 yaşından küçükseniz, lütfen platformumuzu kullanmayın ve kişisel bilgilerinizi bizimle paylaşmayın.
                            </p>
                        </div>

                        {/* Section 8 */}
                        <div className="glass p-8 rounded-[2rem] border-white/5">
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">8. Politika Değişiklikleri</h2>
                            <p className="text-white/60 leading-relaxed">
                                Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler olduğunda, sizi e-posta yoluyla veya platformumuz üzerinden bilgilendireceğiz. Politikayı düzenli olarak gözden geçirmenizi öneririz.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="text-center p-8 bg-white/[0.02] rounded-[2rem] border border-white/5">
                            <h3 className="text-white font-bold mb-2">İletişim</h3>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Gizlilik politikamız hakkında sorularınız için: <a href="mailto:bilgi@kodfinans.com" className="text-primary hover:underline font-bold">bilgi@kodfinans.com</a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
