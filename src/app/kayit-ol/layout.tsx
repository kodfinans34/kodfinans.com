import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kayıt Ol | KodFinans - Ücretsiz Hesap Oluştur",
    description:
        "KodFinans'a ücretsiz kayıt olun. Dijital kodlarınızı en iyi oranlarla bozdurun, anında ödeme alın. Hemen hesap oluşturun.",
    keywords:
        "kodfinans kayıt ol, dijital kod bozum hesabı, ücretsiz kayıt, e-pin bozum hesabı",
    alternates: {
        canonical: "https://kodfinans.com/kayit-ol",
    },
};

export default function KayitOlLayout({ children }: { children: React.ReactNode }) {
    return children;
}
