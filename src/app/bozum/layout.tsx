import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kod Bozdurma - Dijital Kod Bozum Merkezi | KodFinans",
    description: "Razer Gold, iTunes, Google Play ve daha fazla dijital kodlarınızı en yüksek oranlarla bozdurun. %50 garanti oran ile 7/24 hızlı ve güvenli ödeme. KodFinans Türkiye'nin #1 kod bozum platformu.",
    keywords: "kod bozdurma, razer gold bozdurma, itunes kart bozdurma, google play kart bozdurma, dijital kod bozum, kod nakite çevirme, hediye kartı bozdurma",
    alternates: {
        canonical: "https://kodfinans.com/bozum",
    },
    openGraph: {
        title: "Kod Bozdurma - En Yüksek Oranlarla | KodFinans",
        description: "Dijital kodlarınızı en yüksek oranlarla bozdurun. %50 garanti oran, yüksek tutarlar için özel fırsatlar.",
        url: "https://kodfinans.com/bozum",
        type: "website",
        siteName: "KodFinans",
        locale: "tr_TR",
    },
    twitter: {
        card: "summary_large_image",
        title: "Kod Bozdurma | KodFinans",
        description: "Dijital kodlarınızı en yüksek oranlarla bozdurun.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function BozumLayout({ children }: { children: React.ReactNode }) {
    return children;
}
