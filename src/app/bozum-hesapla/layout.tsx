import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bozum Hesapla | KodFinans - Dijital Kod Bozum Hesaplama Aracı",
    description:
        "Dijital kodlarınızın güncel TL karşılığını anında hesaplayın. Razer Gold, Google Play, Steam ve daha fazlası için en iyi bozum oranları.",
    keywords:
        "bozum hesapla, razer gold bozum hesapla, dijital kod bozum oranları, e-pin bozum, anlık bozum hesaplama",
    alternates: {
        canonical: "https://kodfinans.com/bozum-hesapla",
    },
    openGraph: {
        title: "Bozum Hesapla | KodFinans",
        description:
            "Dijital varlıklarınızın güncel TL karşılığını saniyeler içinde öğrenin. En iyi oranlar KodFinans'ta.",
        url: "https://kodfinans.com/bozum-hesapla",
    },
};

export default function BozumHesaplaLayout({ children }: { children: React.ReactNode }) {
    return children;
}
