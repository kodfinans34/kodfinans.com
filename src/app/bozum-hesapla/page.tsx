import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CalculatorWidget } from "@/components/sections/CalculatorWidget";
import { Wallet2, Zap, Lock, BarChart3 } from "lucide-react";

export default function CalculatorPage() {
    return (
        <div className="min-h-screen bg-[#050506] text-white font-poppins selection:bg-primary/30">
            <Navbar />

            <main className="pt-32 pb-24 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-primary/5 to-transparent -z-10" />
                <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full -z-10" />

                <div className="max-w-7xl mx-auto px-4">

                    {/* Page Header */}
                    <div className="text-center mb-16 space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md mb-4">
                            <Wallet2 size={14} className="text-primary" />
                            <span className="text-[10px] font-black tracking-[0.2em] text-white/60 uppercase">Live Exchange Tool</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                            Anlık <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Bozum</span> Hesapla
                        </h1>
                        <p className="text-white/40 max-w-xl mx-auto text-sm font-medium">
                            Dijital varlıklarınızın güncel TL karşılığını saniyeler içinde öğrenin.
                        </p>
                    </div>

                    {/* Calculator Section */}
                    <div className="mb-24">
                        <CalculatorWidget compact={true} />
                    </div>

                    {/* Features / SEO Section */}
                    <div className="grid md:grid-cols-3 gap-8 mb-24">
                        {[
                            { icon: Zap, title: "Hızlı Hesaplama", desc: "Güncel piyasa verileri ile anlık kur hesaplaması." },
                            { icon: Lock, title: "Şeffaf Kesintiler", desc: "Hizmet bedeli ve komisyon oranlarını net bir şekilde görün." },
                            { icon: BarChart3, title: "En İyi Oranlar", desc: "Global borsalara endeksli rekabetçi fiyat garantisi." }
                        ].map((item, i) => (
                            <div key={i} className="glass p-8 rounded-[2.5rem] border-white/5 text-center group hover:-translate-y-2 transition-transform duration-500">
                                <div className="w-16 h-16 mx-auto rounded-3xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-primary group-hover:scale-110 transition-all mb-6">
                                    <item.icon size={28} />
                                </div>
                                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2">{item.title}</h3>
                                <p className="text-white/40 text-xs font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* SEO Content Area */}
                    <div className="border-t border-white/5 pt-16 grid lg:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                                Neden KodFinans Hesaplama Aracı?
                            </h2>
                            <div className="space-y-4 text-white/40 text-sm font-medium leading-relaxed text-justify">
                                <p>
                                    Dijital kod bozdurma işlemlerinde en önemli unsur şeffaflıktır. KodFinans, geliştirdiği gelişmiş hesaplama motoru sayesinde Razer Gold, Steam Cüzdan Kodu ve diğer e-pin varlıklarınızın bozum karşılığını kuruşu kuruşuna gösterir.
                                </p>
                                <p>
                                    Sistemimiz, %100 güncel piyasa verilerini baz alarak size en yüksek teklifi sunar. Hesaplanan tutar, işlem sonunda banka hesabınıza yatacak olan net rakamdır. Sürpriz kesintilerle karşılaşmazsınız.
                                </p>
                            </div>
                        </div>
                        <div className="relative rounded-[3rem] overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 opacity-50 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 backdrop-blur-3xl" />
                            <div className="relative p-10 h-full flex flex-col justify-center items-center text-center space-y-6">
                                <div className="space-y-2">
                                    <p className="text-5xl font-black text-white tracking-tighter">7/24</p>
                                    <p className="text-xs font-black text-primary uppercase tracking-[0.4em]">Otomatik İşlem</p>
                                </div>
                                <p className="text-white/60 text-xs max-w-xs">
                                    Hesapladığınız tutarı anında nakite çevirmek için hemen işlem başlatabilirsiniz.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
