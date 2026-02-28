
// Final build fix trigger
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kodfinans.com"),
  title: "KodFinans | Razer Gold Bozdurma, Dijital Kod Bozum & Oyun Mağazası",
  description: "Türkiye'nin en güvenilir dijital kod platformu. Razer Gold bozdurma, iTunes, Google Play hediye kartları bozum işlemleri ve uygun fiyatlı oyun e-pinleri, oyun paraları KodFinans'ta.",
  alternates: {
    canonical: "https://kodfinans.com",
    languages: {
      "tr-TR": "https://kodfinans.com",
    },
  },
  keywords: [
    "razer gold bozdurma", "razer gold satın al", "razer gold bozum",
    "knight online cash al", "knight online cash satın al", "ko cash",
    "metin2 ejder", "metin2 ep", "metin 2 ejder parası",
    "pubg mobile uc satın al", "pubg uc bozum", "pubg mobile uc",
    "steam cüzdan kodu", "steam bozum", "steam kodu satın al",
    "playstation hediye çeki", "ps store kart", "psn kart",
    "xbox hediye çeki", "microsoft xbox kart", "xbox gift card",
    "itunes kart bozum", "google play bozum", "google play kodu satın al",
    "dijital kod bozum", "e-pin bozum", "dijital kod satın al",
    "oyun kodu bozum", "gift card bozum", "kod bozdurma",
    "kodfinans", "en iyi bozum oranları", "anında kod bozum"
  ].join(", "),
  openGraph: {
    title: "KodFinans | Razer Gold Bozdurma & Dijital Kod Bozum Platformu",
    description: "Razer Gold, Knight Online Cash, PUBG UC, Steam, PlayStation ve Xbox kodlarınızı anında nakite çevirin. En yüksek oran garantisi ve 7/24 güvenli işlem.",
    url: "https://kodfinans.com",
    siteName: "KodFinans",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "KodFinans - Dijital Kod Bozum ve Oyun Mağazası",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KodFinans | Razer Gold Bozdurma & Dijital Kod Bozum",
    description: "Razer Gold, Knight Online Cash, PUBG UC ve tüm dijital kodlarınızı en yüksek oranlarla bozdurun.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "JE50c0fZ8JUUrRejewNM_pYdwX_SVjwn0e0elKHtGNE",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="overflow-x-hidden">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased overflow-x-hidden pb-20 md:pb-0`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "KodFinans",
              url: "https://kodfinans.com",
              logo: "https://kodfinans.com/logo.png",
              description:
                "Türkiye'nin en güvenilir dijital kod bozum ve alım-satım platformu.",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: "Turkish",
                email: "destek@kodfinans.com",
              },
              sameAs: [],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "KodFinans",
              url: "https://kodfinans.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://kodfinans.com/urunler?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Dijital Kod Bozum ve Satın Alma",
              description: "KodFinans'ta bulunan dijital kod bozum ve satın alma kategorileri",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Razer Gold Bozdurma", url: "https://kodfinans.com/bozum" },
                { "@type": "ListItem", position: 2, name: "Knight Online Cash Satın Al", url: "https://kodfinans.com/urunler" },
                { "@type": "ListItem", position: 3, name: "PUBG Mobile UC Satın Al", url: "https://kodfinans.com/urunler" },
                { "@type": "ListItem", position: 4, name: "PlayStation Hediye Çeki", url: "https://kodfinans.com/urunler" },
                { "@type": "ListItem", position: 5, name: "Xbox Hediye Çeki", url: "https://kodfinans.com/urunler" },
                { "@type": "ListItem", position: 6, name: "Steam Cüzdan Kodu", url: "https://kodfinans.com/urunler" },
                { "@type": "ListItem", position: 7, name: "Metin2 Ejder Parası", url: "https://kodfinans.com/urunler" },
                { "@type": "ListItem", position: 8, name: "Google Play Kodu", url: "https://kodfinans.com/urunler" },
                { "@type": "ListItem", position: 9, name: "iTunes Kart", url: "https://kodfinans.com/urunler" },
              ],
            }),
          }}
        />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
