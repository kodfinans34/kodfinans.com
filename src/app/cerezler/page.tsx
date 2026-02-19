"use client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Cookie, Settings, Eye, ToggleLeft, CheckCircle2, XCircle } from "lucide-react";

export default function CerezlerPage() {
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
                            <Cookie size={12} /> Web Teknolojileri
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
                            ÇEREZ <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">POLİTİKASI</span>
                        </h1>
                        <p className="text-white/40 text-sm">Son Güncelleme: 13 Şubat 2026</p>
                    </div>

                    {/* Content */}
                    <div className="space-y-8">
                        {/* Intro */}
                        <div className="glass p-8 rounded-[2rem] border-white/5">
                            <p className="text-white/60 leading-relaxed">
                                KodFinans olarak, web sitemizin işlevselliğini artırmak, kullanıcı deneyimini iyileştirmek ve hizmetlerimizi kişiselleştirmek amacıyla çerezler (cookies) ve benzeri teknolojiler kullanmaktayız. Bu politika, çerezlerin nasıl kullanıldığını ve yönetildiğini açıklamaktadır.
                            </p>
                        </div>

                        {/* Section 1 */}
                        <div className="glass p-8 rounded-[2rem] border-white/5">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <Cookie size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">1. Çerez Nedir?</h2>
                                    <p className="text-white/60 leading-relaxed mb-4">
                                        Çerezler, bir web sitesini ziyaret ettiğinizde cihazınıza (bilgisayar, tablet, telefon) kaydedilen küçük metin dosyalarıdır. Çerezler, web sitesinin sizi tanımasını, tercihlerinizi hatırlamasını ve daha iyi bir kullanıcı deneyimi sunmasını sağlar.
                                    </p>
                                    <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
                                        <p className="text-white/40 text-sm">
                                            <strong className="text-white">Not:</strong> Çerezler, cihazınıza virüs bulaştıramaz veya zararlı yazılım yükleyemez. Sadece metin tabanlı bilgiler içerir.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div className="glass p-8 rounded-[2rem] border-white/5">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <Settings size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">2. Kullandığımız Çerez Türleri</h2>
                                    <div className="space-y-4">
                                        {/* Zorunlu Çerezler */}
                                        <div className="bg-white/[0.02] p-6 rounded-xl border border-white/5">
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                                    <CheckCircle2 size={20} className="text-green-500" />
                                                    Zorunlu Çerezler
                                                </h3>
                                                <span className="px-3 py-1 bg-green-500/20 text-green-500 text-[10px] font-black uppercase tracking-wider rounded-full">Gerekli</span>
                                            </div>
                                            <p className="text-white/60 text-sm mb-3">
                                                Web sitesinin temel işlevlerini yerine getirmesi için gereklidir. Bu çerezler olmadan site düzgün çalışmaz.
                                            </p>
                                            <ul className="space-y-1 text-white/40 text-xs ml-6">
                                                <li>• Oturum yönetimi (giriş durumu)</li>
                                                <li>• Güvenlik doğrulaması</li>
                                                <li>• Sepet bilgilerinin saklanması</li>
                                                <li>• Dil ve bölge tercihleri</li>
                                            </ul>
                                        </div>

                                        {/* Performans Çerezleri */}
                                        <div className="bg-white/[0.02] p-6 rounded-xl border border-white/5">
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                                    <Eye size={20} className="text-primary" />
                                                    Performans Çerezleri
                                                </h3>
                                                <span className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-black uppercase tracking-wider rounded-full">Opsiyonel</span>
                                            </div>
                                            <p className="text-white/60 text-sm mb-3">
                                                Web sitesinin nasıl kullanıldığını anlamamıza yardımcı olur. Toplanan bilgiler anonim ve toplu haldedir.
                                            </p>
                                            <ul className="space-y-1 text-white/40 text-xs ml-6">
                                                <li>• Sayfa ziyaret istatistikleri</li>
                                                <li>• Hata raporlama</li>
                                                <li>• Yükleme süreleri analizi</li>
                                                <li>• Kullanıcı akışı takibi</li>
                                            </ul>
                                        </div>

                                        {/* İşlevsellik Çerezleri */}
                                        <div className="bg-white/[0.02] p-6 rounded-xl border border-white/5">
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                                    <ToggleLeft size={20} className="text-secondary" />
                                                    İşlevsellik Çerezleri
                                                </h3>
                                                <span className="px-3 py-1 bg-secondary/20 text-secondary text-[10px] font-black uppercase tracking-wider rounded-full">Opsiyonel</span>
                                            </div>
                                            <p className="text-white/60 text-sm mb-3">
                                                Tercihlerinizi hatırlayarak kişiselleştirilmiş bir deneyim sunar.
                                            </p>
                                            <ul className="space-y-1 text-white/40 text-xs ml-6">
                                                <li>• Tema tercihleri (karanlık/aydınlık mod)</li>
                                                <li>• Favori ürünler</li>
                                                <li>• Son görüntülenen ürünler</li>
                                                <li>• Bildirim tercihleri</li>
                                            </ul>
                                        </div>

                                        {/* Hedefleme Çerezleri */}
                                        <div className="bg-white/[0.02] p-6 rounded-xl border border-white/5">
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                                    <XCircle size={20} className="text-white/40" />
                                                    Hedefleme/Reklam Çerezleri
                                                </h3>
                                                <span className="px-3 py-1 bg-white/10 text-white/40 text-[10px] font-black uppercase tracking-wider rounded-full">Kullanılmıyor</span>
                                            </div>
                                            <p className="text-white/60 text-sm">
                                                Şu anda platformumuzda üçüncü taraf reklam çerezleri kullanmamaktayız.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 3 */}
                        <div className="glass p-8 rounded-[2rem] border-white/5">
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">3. Çerez Süresi</h2>
                            <div className="space-y-4 text-white/60 leading-relaxed">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                        <h3 className="text-white font-bold text-sm mb-2">Oturum Çerezleri</h3>
                                        <p className="text-xs text-white/40">Tarayıcınızı kapattığınızda otomatik olarak silinir. Geçici bilgileri saklar.</p>
                                    </div>
                                    <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                        <h3 className="text-white font-bold text-sm mb-2">Kalıcı Çerezler</h3>
                                        <p className="text-xs text-white/40">Belirli bir süre (genellikle 1 yıl) cihazınızda kalır. Tercihlerinizi hatırlar.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 4 */}
                        <div className="glass p-8 rounded-[2rem] border-white/5">
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">4. Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
                            <div className="space-y-4 text-white/60 leading-relaxed">
                                <p>Çerezleri yönetmek için birkaç seçeneğiniz var:</p>

                                <div className="space-y-3">
                                    <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl">
                                        <h3 className="text-white font-bold text-sm mb-2">1. Tarayıcı Ayarları</h3>
                                        <p className="text-sm text-white/60 mb-2">Tarayıcınızın ayarlarından çerezleri yönetebilirsiniz:</p>
                                        <ul className="space-y-1 text-xs text-white/40 ml-6">
                                            <li>• <strong className="text-white">Chrome:</strong> Ayarlar → Gizlilik ve güvenlik → Çerezler</li>
                                            <li>• <strong className="text-white">Firefox:</strong> Ayarlar → Gizlilik ve Güvenlik → Çerezler</li>
                                            <li>• <strong className="text-white">Safari:</strong> Tercihler → Gizlilik → Çerezler</li>
                                            <li>• <strong className="text-white">Edge:</strong> Ayarlar → Gizlilik → Çerezler</li>
                                        </ul>
                                    </div>

                                    <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                        <h3 className="text-white font-bold text-sm mb-2">2. Çerez Tercih Merkezi</h3>
                                        <p className="text-sm text-white/60 mb-3">
                                            Platformumuzda opsiyonel çerezleri açıp kapatabilirsiniz. (Yakında aktif olacak)
                                        </p>
                                        <button className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-xl text-xs font-bold uppercase tracking-wider transition-all">
                                            Çerez Ayarları
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
                                    <p className="text-yellow-500/80 text-sm">
                                        <strong>⚠️ Uyarı:</strong> Zorunlu çerezleri devre dışı bırakırsanız, platformun bazı özellikleri düzgün çalışmayabilir.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Section 5 */}
                        <div className="glass p-8 rounded-[2rem] border-white/5">
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">5. Üçüncü Taraf Çerezleri</h2>
                            <p className="text-white/60 leading-relaxed mb-4">
                                Platformumuzda aşağıdaki üçüncü taraf hizmetler çerez kullanabilir:
                            </p>
                            <ul className="space-y-2 text-white/60 ml-6">
                                <li>• <strong className="text-white">Ödeme Sağlayıcıları:</strong> Güvenli ödeme işlemleri için (örn: iyzico, PayTR)</li>
                                <li>• <strong className="text-white">Analitik Araçlar:</strong> Site performansını ölçmek için (örn: Google Analytics - anonim)</li>
                                <li>• <strong className="text-white">Güvenlik Hizmetleri:</strong> DDoS koruması ve bot tespiti için</li>
                            </ul>
                        </div>

                        {/* Section 6 */}
                        <div className="glass p-8 rounded-[2rem] border-white/5">
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">6. Çerez Politikası Güncellemeleri</h2>
                            <p className="text-white/60 leading-relaxed">
                                Bu Çerez Politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler olduğunda, sizi bilgilendireceğiz. En son güncelleme tarihi sayfanın üst kısmında belirtilmiştir.
                            </p>
                        </div>

                        {/* Section 7 */}
                        <div className="glass p-8 rounded-[2rem] border-white/5">
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">7. Daha Fazla Bilgi</h2>
                            <p className="text-white/60 leading-relaxed mb-4">
                                Çerezler hakkında daha fazla bilgi için:
                            </p>
                            <ul className="space-y-2 text-white/60 ml-6">
                                <li>• <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">AboutCookies.org</a></li>
                                <li>• <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">AllAboutCookies.org</a></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="text-center p-8 bg-white/[0.02] rounded-[2rem] border border-white/5">
                            <h3 className="text-white font-bold mb-2">Sorularınız mı var?</h3>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Çerez politikamız hakkında sorularınız için: <a href="mailto:bilgi@kodfinans.com" className="text-primary hover:underline font-bold">bilgi@kodfinans.com</a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
