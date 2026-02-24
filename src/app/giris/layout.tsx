import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Giriş Yap | KodFinans",
    description:
        "KodFinans hesabınıza giriş yapın. Dijital kod alım-satım ve bozum işlemlerinizi yönetin.",
    keywords:
        "kodfinans giriş, kodfinans login, hesap girişi",
    alternates: {
        canonical: "https://kodfinans.com/giris",
    },
};

export default function GirisLayout({ children }: { children: React.ReactNode }) {
    return children;
}
