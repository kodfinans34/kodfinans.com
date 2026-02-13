
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Blog - E-Pin ve Oyun Haberleri | KodFinans",
    description: "En güncel oyun haberleri, e-pin rehberleri, bozum taktikleri ve güvenli alışveriş ipuçları KodFinans Blog'da.",
    keywords: "oyun haberleri, epin rehberi, valorant vp fiyatları, steam cüzdan kodu, razer gold bozdurma",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
