import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Knight Online Zero GB & İtem Pazar | Cash Al ve Yükle | KodFinans',
    description: 'Knight Online Zero sunucusu 7/24 Kesintisiz GB (Gold Bar) Satın Al, GB Sat, Cash Yükle işlemleri. En güvenilir Knight Online İtem Pazarı (İtem al - sat). Knight Online dünyasındaki ticaret adresiniz.',
    keywords: 'knight online gb al, knight online gb sat, knight online zero gb, zero gb al, ko zero gb, knight online cash al, knight online cash yükle, knight online item al, knight online item sat, knight online pazarı',
    openGraph: {
        title: 'Knight Online Zero GB ve İtem Pazarı - KodFinans',
        description: 'En uygun ve yüksek oranlı Knight Online Zero GB alım-satımı, Cash yükleme işlemleri ve Zero İtem Pazarı.',
    }
}

export default function KnightOnlineLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
