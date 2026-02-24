import { Metadata } from "next";

export const metadata: Metadata = {
    title: "VIP Finans | KodFinans - Kurumsal ve Yüksek Hacimli İşlemler",
    description:
        "KodFinans VIP ile %97'ye varan bozum oranları, öncelikli ödeme ve özel müşteri temsilcisi. Yüksek hacimli dijital kod bozum işlemleri için özel destek.",
    keywords:
        "vip bozum, yüksek hacimli bozum, kurumsal dijital kod, özel bozum oranları, vip finans",
    alternates: {
        canonical: "https://kodfinans.com/vip-finans",
    },
    openGraph: {
        title: "VIP Finans | KodFinans",
        description:
            "Kurumsal ve yüksek hacimli işlemler için özel oranlar ve öncelikli hizmet.",
        url: "https://kodfinans.com/vip-finans",
    },
};

export default function VipFinansLayout({ children }: { children: React.ReactNode }) {
    return children;
}
