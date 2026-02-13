import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "KodFinans | Dijital Kod Bozum ve Alım-Satım Platformu",
  description: "Razer Gold, Google Play, iTunes, Steam gibi dijital kodlarınızı güvenli şekilde bozdurun. Hızlı ödeme ve en iyi oranlar KodFinans'ta.",
  keywords: "dijital kod bozum, razer gold bozum, google play bozum, itunes kart bozum, pubg uc bozum, knight online gb",
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
        className={`${inter.variable} ${poppins.variable} antialiased overflow-x-hidden`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
