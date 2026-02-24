import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Blog - Dijital Finans Rehberleri ve Haberler | KodFinans",
    description: "Dijital kod bozum rehberleri, piyasa analizleri, güvenlik ipuçları ve e-pin dünyasından en güncel haberler. KodFinans Blog'da her şey var.",
    keywords: "dijital finans blog, bozum rehberi, razer gold rehber, e-pin haberleri, oyun haberleri, steam cüzdan kodu",
    alternates: {
        canonical: "https://kodfinans.com/blog",
    },
    openGraph: {
        title: "Blog | KodFinans - Dijital Finans Akademisi",
        description: "En güncel bozum rehberleri, piyasa analizleri ve güvenlik ipuçları.",
        url: "https://kodfinans.com/blog",
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
