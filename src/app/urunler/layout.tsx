import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dijital Kod Ürünleri | KodFinans - E-Pin, Hediye Kartı, Oyun Parası",
    description:
        "Razer Gold, Google Play, Steam, iTunes ve daha fazla dijital kod ürünlerini en uygun fiyatlarla satın alın. Anında teslimat ve güvenli ödeme.",
    keywords:
        "dijital kod satın al, razer gold satın al, google play hediye kartı, steam cüzdan kodu, e-pin, oyun parası",
    alternates: {
        canonical: "https://kodfinans.com/urunler",
    },
    openGraph: {
        title: "Dijital Kod Ürünleri | KodFinans",
        description:
            "En uygun fiyatlarla dijital kodlar. Razer Gold, Google Play, Steam ve daha fazlası.",
        url: "https://kodfinans.com/urunler",
    },
};

export default function UrunlerLayout({ children }: { children: React.ReactNode }) {
    return children;
}
