"use client";

import { addProductToFirestore } from "@/lib/firebase-products";

// Bozum ürünleri
const bozumProducts = [
    {
        name: "Razer Gold Bozdurma",
        slug: "razer-gold-bozdurma",
        category: "gift" as const,
        productType: "bozum" as const,
        price: 50,
        image: "/assets/products/razer-gold.png",
        description: "Razer Gold kodlarınızı en yüksek oranlarla nakite çevirin. Hızlı ve güvenli işlem garantisi ile 7/24 hizmetinizdeyiz. Yüksek oran için canlı desteğe başvurun.",
        seoTitle: "Razer Gold Bozdurma - En Yüksek Oran %50+ | KodFinans",
        seoDescription: "Razer Gold kodlarınızı KodFinans'ta en yüksek oranlarla bozdurun. %50 garanti oran, yüksek tutarlar için özel oranlar. 7/24 güvenli ve hızlı ödeme.",
        seoKeywords: "razer gold bozdurma, razer gold bozum, razer gold nakite çevirme, razer gold kodu bozdurma, razer gold satma, razer gold paraya çevirme",
    },
    {
        name: "iTunes Kart Bozdurma",
        slug: "itunes-kart-bozdurma",
        category: "gift" as const,
        productType: "bozum" as const,
        price: 50,
        image: "/assets/products/itunes.png",
        description: "iTunes ve App Store hediye kartlarınızı en yüksek oranlarla nakite çevirin. Apple hediye kartı bozdurma hizmeti ile anında ödeme alın.",
        seoTitle: "iTunes Kart Bozdurma - Apple Hediye Kartı Bozum | KodFinans",
        seoDescription: "iTunes ve Apple hediye kartlarınızı KodFinans'ta en yüksek oranlarla bozdurun. %50 garanti oran, yüksek tutarlar için özel oranlar. Anında ödeme.",
        seoKeywords: "itunes kart bozdurma, apple hediye kartı bozum, itunes bozum, itunes kart nakite çevirme, app store kart bozdurma",
    },
    {
        name: "Google Play Kart Bozdurma",
        slug: "google-play-kart-bozdurma",
        category: "gift" as const,
        productType: "bozum" as const,
        price: 50,
        image: "/assets/products/google-play.png",
        description: "Google Play hediye kartlarınızı en avantajlı oranlarla nakite çevirin. Google Play kodu bozdurma hizmeti ile hızlı ve güvenli ödeme.",
        seoTitle: "Google Play Kart Bozdurma - Hediye Kodu Bozum | KodFinans",
        seoDescription: "Google Play hediye kartlarınızı KodFinans'ta bozdurun. %50 garanti oran, yüksek tutarlar için özel oranlar. 7/24 anında ödeme garantisi.",
        seoKeywords: "google play kart bozdurma, google play bozum, google play kodu nakite çevirme, google play hediye kartı bozdurma",
    },
];

// Satış ürünleri
const salesProducts = [
    // Xbox
    { name: "Microsoft Xbox Hediye Çeki 100 TL", slug: "xbox-hediye-ceki-100-tl", category: "gift" as const, productType: "satis" as const, price: 100, image: "/assets/products/xbox.png", description: "Microsoft Xbox 100 TL hediye çeki ile Xbox Store'dan istediğiniz oyunu, DLC'yi veya aboneliği satın alın.", seoTitle: "Xbox Hediye Çeki 100 TL Satın Al | KodFinans", seoDescription: "Xbox 100 TL hediye çeki en uygun fiyat ve anında teslimatla KodFinans'ta. Xbox Game Pass, oyun ve içerik satın alın.", seoKeywords: "xbox hediye çeki 100 tl, xbox gift card, xbox kart satın al" },
    { name: "Microsoft Xbox Hediye Çeki 300 TL", slug: "xbox-hediye-ceki-300-tl", category: "gift" as const, productType: "satis" as const, price: 300, image: "/assets/products/xbox.png", description: "Microsoft Xbox 300 TL hediye çeki ile oyun dünyasının keyfini çıkarın.", seoTitle: "Xbox Hediye Çeki 300 TL Satın Al | KodFinans", seoDescription: "Xbox 300 TL hediye çeki en uygun fiyatla KodFinans'ta. Anında teslimat.", seoKeywords: "xbox hediye çeki 300 tl, xbox gift card 300, xbox kart" },

    // PlayStation
    { name: "PlayStation Hediye Çeki 275 TL", slug: "playstation-hediye-ceki-275-tl", category: "gift" as const, productType: "satis" as const, price: 275, image: "/assets/products/playstation.png", description: "PlayStation Store 275 TL hediye çeki ile PS5 ve PS4 oyunlarını, DLC'leri satın alın.", seoTitle: "PlayStation Hediye Çeki 275 TL Satın Al | KodFinans", seoDescription: "PS Store 275 TL hediye çeki anında teslimatla KodFinans'ta. PlayStation oyun ve içerik satın alın.", seoKeywords: "playstation hediye çeki 275 tl, ps store kart, psn kart 275" },
    { name: "PlayStation Hediye Çeki 500 TL", slug: "playstation-hediye-ceki-500-tl", category: "gift" as const, productType: "satis" as const, price: 500, image: "/assets/products/playstation.png", description: "PlayStation Store 500 TL hediye çeki. PS5 ve PS4 için oyun, DLC ve abonelik satın alın.", seoTitle: "PlayStation Hediye Çeki 500 TL Satın Al | KodFinans", seoDescription: "PS Store 500 TL hediye çeki en uygun fiyatla. Anında dijital teslimat.", seoKeywords: "playstation hediye çeki 500 tl, ps store 500, psn kart" },
    { name: "PlayStation Hediye Çeki 825 TL", slug: "playstation-hediye-ceki-825-tl", category: "gift" as const, productType: "satis" as const, price: 825, image: "/assets/products/playstation.png", description: "PlayStation Store 825 TL hediye çeki ile premium oyunları ve PS Plus aboneliğini satın alın.", seoTitle: "PlayStation Hediye Çeki 825 TL Satın Al | KodFinans", seoDescription: "PS Store 825 TL hediye çeki KodFinans'ta. Anında teslimat ve güvenli ödeme.", seoKeywords: "playstation hediye çeki 825 tl, ps store 825, psn kart" },
    { name: "PlayStation Hediye Çeki 1100 TL", slug: "playstation-hediye-ceki-1100-tl", category: "gift" as const, productType: "satis" as const, price: 1100, image: "/assets/products/playstation.png", description: "PlayStation Store 1100 TL hediye çeki. Büyük indirimli oyunları kaçırmayın.", seoTitle: "PlayStation Hediye Çeki 1100 TL Satın Al | KodFinans", seoDescription: "PS Store 1100 TL hediye çeki anında dijital teslimat ile KodFinans'ta.", seoKeywords: "playstation hediye çeki 1100 tl, ps store 1100, psn kart" },
    { name: "PlayStation Hediye Çeki 2200 TL", slug: "playstation-hediye-ceki-2200-tl", category: "gift" as const, productType: "satis" as const, price: 2200, image: "/assets/products/playstation.png", description: "PlayStation Store 2200 TL hediye çeki. En büyük tutar, en büyük avantaj.", seoTitle: "PlayStation Hediye Çeki 2200 TL Satın Al | KodFinans", seoDescription: "PS Store 2200 TL hediye çeki en uygun fiyat garantisi ile KodFinans'ta.", seoKeywords: "playstation hediye çeki 2200 tl, ps store 2200, psn kart büyük tutar" },

    // PUBG Mobile
    { name: "PUBG Mobile 1500 + 300 UC", slug: "pubg-mobile-1500-300-uc", category: "games" as const, productType: "satis" as const, price: 249.99, image: "/assets/products/pubg-mobile.png", description: "PUBG Mobile 1500 + 300 bonus UC satın alın. Toplam 1800 UC ile favori skinlerinizi edinin.", seoTitle: "PUBG Mobile 1500+300 UC Satın Al | KodFinans", seoDescription: "PUBG Mobile 1800 UC (1500+300 bonus) en uygun fiyatla KodFinans'ta. Anında hesabınıza yüklenir.", seoKeywords: "pubg mobile uc satın al, pubg uc 1500, pubg mobile uc yükleme" },
    { name: "PUBG Mobile 300 + 25 UC", slug: "pubg-mobile-300-25-uc", category: "games" as const, productType: "satis" as const, price: 54.99, image: "/assets/products/pubg-mobile.png", description: "PUBG Mobile 300 + 25 bonus UC satın alın. Hızlı ve güvenli UC yükleme.", seoTitle: "PUBG Mobile 300+25 UC Satın Al | KodFinans", seoDescription: "PUBG Mobile 325 UC (300+25 bonus) anında teslimatla KodFinans'ta.", seoKeywords: "pubg mobile uc, pubg uc 300, pubg mobile uc satın al" },

    // Google Play
    { name: "Google Play Hediye Kod 25 TL", slug: "google-play-hediye-kod-25-tl", category: "gift" as const, productType: "satis" as const, price: 25, image: "/assets/products/google-play.png", description: "Google Play 25 TL hediye kodu ile uygulama, oyun ve abonelik satın alın.", seoTitle: "Google Play 25 TL Hediye Kodu Satın Al | KodFinans", seoDescription: "Google Play 25 TL hediye kodu anında teslimatla KodFinans'ta. Oyun, uygulama ve abonelik alın.", seoKeywords: "google play 25 tl, google play hediye kodu, google play kart" },
    { name: "Google Play Hediye Kod 50 TL", slug: "google-play-hediye-kod-50-tl", category: "gift" as const, productType: "satis" as const, price: 50, image: "/assets/products/google-play.png", description: "Google Play 50 TL hediye kodu. Android uygulama ve oyun mağazası için.", seoTitle: "Google Play 50 TL Hediye Kodu | KodFinans", seoDescription: "Google Play 50 TL hediye kodu en uygun fiyatla KodFinans'ta.", seoKeywords: "google play 50 tl, google play hediye kodu 50" },
    { name: "Google Play Hediye Kod 100 TL", slug: "google-play-hediye-kod-100-tl", category: "gift" as const, productType: "satis" as const, price: 100, image: "/assets/products/google-play.png", description: "Google Play 100 TL hediye kodu ile premium uygulamalara erişin.", seoTitle: "Google Play 100 TL Hediye Kodu | KodFinans", seoDescription: "Google Play 100 TL hediye kodu anında dijital teslimat ile KodFinans'ta.", seoKeywords: "google play 100 tl, google play hediye kodu 100" },
    { name: "Google Play Hediye Kod 250 TL", slug: "google-play-hediye-kod-250-tl", category: "gift" as const, productType: "satis" as const, price: 250, image: "/assets/products/google-play.png", description: "Google Play 250 TL hediye kodu. Büyük tutarda avantajlı alışveriş.", seoTitle: "Google Play 250 TL Hediye Kodu | KodFinans", seoDescription: "Google Play 250 TL hediye kodu en uygun fiyatla KodFinans'ta.", seoKeywords: "google play 250 tl, google play kart 250" },
    { name: "Google Play Hediye Kod 500 TL", slug: "google-play-hediye-kod-500-tl", category: "gift" as const, productType: "satis" as const, price: 500, image: "/assets/products/google-play.png", description: "Google Play 500 TL hediye kodu ile sınırsız eğlenceye ulaşın.", seoTitle: "Google Play 500 TL Hediye Kodu | KodFinans", seoDescription: "Google Play 500 TL hediye kodu anında teslimat ile KodFinans'ta.", seoKeywords: "google play 500 tl, google play hediye kodu 500" },
    { name: "Google Play Hediye Kod 750 TL", slug: "google-play-hediye-kod-750-tl", category: "gift" as const, productType: "satis" as const, price: 750, image: "/assets/products/google-play.png", description: "Google Play 750 TL hediye kodu.", seoTitle: "Google Play 750 TL Hediye Kodu | KodFinans", seoDescription: "Google Play 750 TL hediye kodu KodFinans'ta.", seoKeywords: "google play 750 tl" },
    { name: "Google Play Hediye Kod 1000 TL", slug: "google-play-hediye-kod-1000-tl", category: "gift" as const, productType: "satis" as const, price: 1000, image: "/assets/products/google-play.png", description: "Google Play 1000 TL hediye kodu ile en büyük tutarda alışveriş yapın.", seoTitle: "Google Play 1000 TL Hediye Kodu | KodFinans", seoDescription: "Google Play 1000 TL hediye kodu anında teslimat. KodFinans güvencesi.", seoKeywords: "google play 1000 tl, google play kart 1000" },
    { name: "Google Play Hediye Kod 1250 TL", slug: "google-play-hediye-kod-1250-tl", category: "gift" as const, productType: "satis" as const, price: 1250, image: "/assets/products/google-play.png", description: "Google Play 1250 TL hediye kodu. Premium tutar, premium fiyat.", seoTitle: "Google Play 1250 TL Hediye Kodu | KodFinans", seoDescription: "Google Play 1250 TL hediye kodu KodFinans'ta.", seoKeywords: "google play 1250 tl" },

    // GForce Now
    { name: "GeForce NOW Game+ 1 Yıllık", slug: "gforce-now-game-plus-1-yillik", category: "games" as const, productType: "satis" as const, price: 2880, image: "/assets/products/gforce-now.png", description: "GeForce NOW Game+ 1 yıllık üyelik ile bulut oyun keyfini yaşayın. RTX kalitesinde oyun deneyimi.", seoTitle: "GeForce NOW Game+ 1 Yıllık Satın Al | KodFinans", seoDescription: "GeForce NOW Game+ 1 yıllık üyelik en uygun fiyatla KodFinans'ta. RTX destekli bulut oyun.", seoKeywords: "gforce now satın al, geforce now game plus, bulut oyun abonelik" },

    // Metin2
    { name: "Metin2 100 TRY Epin - 300 Ejder Parası", slug: "metin2-100-try-300-ep", category: "games" as const, productType: "satis" as const, price: 100, image: "/assets/products/metin2.png", description: "Metin2 100 TRY Epin ile 300 Ejder Parası kazanın. Anında hesabınıza yüklenir.", seoTitle: "Metin2 100 TRY Epin - 300 EP Satın Al | KodFinans", seoDescription: "Metin2 300 Ejder Parası (100 TRY Epin) en uygun fiyatla KodFinans'ta.", seoKeywords: "metin2 epin, metin2 ejder parası, metin2 ep satın al" },
    { name: "Metin2 250 TRY Epin - 900 Ejder Parası", slug: "metin2-250-try-900-ep", category: "games" as const, productType: "satis" as const, price: 250, image: "/assets/products/metin2.png", description: "Metin2 250 TRY Epin ile 900 Ejder Parası kazanın.", seoTitle: "Metin2 250 TRY Epin - 900 EP Satın Al | KodFinans", seoDescription: "Metin2 900 Ejder Parası (250 TRY Epin) anında teslimat ile KodFinans'ta.", seoKeywords: "metin2 epin 250, metin2 ejder parası 900" },
    { name: "Metin2 500 TRY Epin - 2100 Ejder Parası", slug: "metin2-500-try-2100-ep", category: "games" as const, productType: "satis" as const, price: 500, image: "/assets/products/metin2.png", description: "Metin2 500 TRY Epin ile 2100 Ejder Parası kazanın. En büyük paket.", seoTitle: "Metin2 500 TRY Epin - 2100 EP Satın Al | KodFinans", seoDescription: "Metin2 2100 Ejder Parası (500 TRY Epin) KodFinans güvencesiyle.", seoKeywords: "metin2 epin 500, metin2 ejder parası 2100" },

    // Razer Gold
    { name: "Razer Gold Hediye Çeki 500 TL", slug: "razer-gold-hediye-ceki-500-tl", category: "gift" as const, productType: "satis" as const, price: 500, image: "/assets/products/razer-gold.png", description: "Razer Gold 500 TL hediye çeki ile binlerce oyunda kullanabileceğiniz bakiye yükleyin.", seoTitle: "Razer Gold 500 TL Hediye Çeki Satın Al | KodFinans", seoDescription: "Razer Gold 500 TL hediye çeki anında teslimatla KodFinans'ta. Güvenli ödeme.", seoKeywords: "razer gold 500 tl, razer gold hediye çeki, razer gold satın al" },

    // Legend Online
    { name: "Legend Online 1500 + 150 Elmas", slug: "legend-online-1500-150-elmas", category: "games" as const, productType: "satis" as const, price: 120, image: "/assets/products/legend-online.png", description: "Legend Online 1500 + 150 bonus Elmas satın alın.", seoTitle: "Legend Online 1650 Elmas Satın Al | KodFinans", seoDescription: "Legend Online 1500+150 Elmas en uygun fiyatla KodFinans'ta.", seoKeywords: "legend online elmas, legend online elmas satın al" },
    { name: "Legend Online 3000 + 300 Elmas", slug: "legend-online-3000-300-elmas", category: "games" as const, productType: "satis" as const, price: 240, image: "/assets/products/legend-online.png", description: "Legend Online 3000 + 300 bonus Elmas satın alın.", seoTitle: "Legend Online 3300 Elmas Satın Al | KodFinans", seoDescription: "Legend Online 3000+300 Elmas anında teslimatla KodFinans'ta.", seoKeywords: "legend online 3000 elmas, legend online elmas" },
    { name: "Legend Online 7500 + 750 Elmas", slug: "legend-online-7500-750-elmas", category: "games" as const, productType: "satis" as const, price: 600, image: "/assets/products/legend-online.png", description: "Legend Online 7500 + 750 bonus Elmas satın alın. En büyük paket.", seoTitle: "Legend Online 8250 Elmas Satın Al | KodFinans", seoDescription: "Legend Online 7500+750 Elmas en uygun fiyatla KodFinans'ta.", seoKeywords: "legend online 7500 elmas, legend online elmas paket" },

    // Legend Online Reborn
    { name: "Legend Online Reborn 1500 + 150 Elmas", slug: "legend-online-reborn-1500-150-elmas", category: "games" as const, productType: "satis" as const, price: 120, image: "/assets/products/legend-online-reborn.png", description: "Legend Online Reborn 1500 + 150 bonus Elmas satın alın.", seoTitle: "Legend Online Reborn 1650 Elmas Satın Al | KodFinans", seoDescription: "Legend Online Reborn 1500+150 Elmas KodFinans'ta.", seoKeywords: "legend online reborn elmas, legend online reborn satın al" },
    { name: "Legend Online Reborn 3000 + 300 Elmas", slug: "legend-online-reborn-3000-300-elmas", category: "games" as const, productType: "satis" as const, price: 240, image: "/assets/products/legend-online-reborn.png", description: "Legend Online Reborn 3000 + 300 bonus Elmas satın alın.", seoTitle: "Legend Online Reborn 3300 Elmas Satın Al | KodFinans", seoDescription: "Legend Online Reborn 3000+300 Elmas anında teslimatla.", seoKeywords: "legend online reborn 3000 elmas" },
    { name: "Legend Online Reborn 7500 + 750 Elmas", slug: "legend-online-reborn-7500-750-elmas", category: "games" as const, productType: "satis" as const, price: 600, image: "/assets/products/legend-online-reborn.png", description: "Legend Online Reborn 7500 + 750 bonus Elmas. En büyük paket.", seoTitle: "Legend Online Reborn 8250 Elmas Satın Al | KodFinans", seoDescription: "Legend Online Reborn 7500+750 Elmas KodFinans güvencesiyle.", seoKeywords: "legend online reborn 7500 elmas" },

    // Knight Online
    { name: "Knight Online 400 Cash", slug: "knight-online-400-cash", category: "games" as const, productType: "satis" as const, price: 221, image: "/assets/products/knight-online.png", description: "Knight Online 400 Cash satın alın. KO Cash ile premium öğeler edinin.", seoTitle: "Knight Online 400 Cash Satın Al - 221 TL | KodFinans", seoDescription: "Knight Online 400 Cash en uygun fiyatla KodFinans'ta. Anında teslimat.", seoKeywords: "knight online cash, ko cash satın al, knight online 400 cash" },
    { name: "Knight Online 800 Cash", slug: "knight-online-800-cash", category: "games" as const, productType: "satis" as const, price: 442, image: "/assets/products/knight-online.png", description: "Knight Online 800 Cash satın alın.", seoTitle: "Knight Online 800 Cash Satın Al - 442 TL | KodFinans", seoDescription: "Knight Online 800 Cash anında teslimatla KodFinans'ta.", seoKeywords: "knight online 800 cash, ko cash 800" },
    { name: "Knight Online 1.200 Cash", slug: "knight-online-1200-cash", category: "games" as const, productType: "satis" as const, price: 663, image: "/assets/products/knight-online.png", description: "Knight Online 1.200 Cash satın alın.", seoTitle: "Knight Online 1200 Cash Satın Al - 663 TL | KodFinans", seoDescription: "Knight Online 1200 Cash KodFinans güvencesiyle.", seoKeywords: "knight online 1200 cash, ko cash 1200" },
    { name: "Knight Online 1.600 Cash", slug: "knight-online-1600-cash", category: "games" as const, productType: "satis" as const, price: 884, image: "/assets/products/knight-online.png", description: "Knight Online 1.600 Cash satın alın.", seoTitle: "Knight Online 1600 Cash Satın Al - 884 TL | KodFinans", seoDescription: "Knight Online 1600 Cash en uygun fiyatla.", seoKeywords: "knight online 1600 cash, ko cash" },
    { name: "Knight Online 2.000 Cash", slug: "knight-online-2000-cash", category: "games" as const, productType: "satis" as const, price: 1105, image: "/assets/products/knight-online.png", description: "Knight Online 2.000 Cash satın alın.", seoTitle: "Knight Online 2000 Cash Satın Al - 1105 TL | KodFinans", seoDescription: "Knight Online 2000 Cash anında teslimat ile KodFinans'ta.", seoKeywords: "knight online 2000 cash, ko cash 2000" },
    { name: "Knight Online 2.400 Cash", slug: "knight-online-2400-cash", category: "games" as const, productType: "satis" as const, price: 1326, image: "/assets/products/knight-online.png", description: "Knight Online 2.400 Cash satın alın.", seoTitle: "Knight Online 2400 Cash Satın Al - 1326 TL | KodFinans", seoDescription: "Knight Online 2400 Cash KodFinans güvencesiyle.", seoKeywords: "knight online 2400 cash, ko cash 2400" },
    { name: "Knight Online 3.200 Cash", slug: "knight-online-3200-cash", category: "games" as const, productType: "satis" as const, price: 1768, image: "/assets/products/knight-online.png", description: "Knight Online 3.200 Cash satın alın. En büyük Cash paketi.", seoTitle: "Knight Online 3200 Cash Satın Al - 1768 TL | KodFinans", seoDescription: "Knight Online 3200 Cash en büyük paket, en uygun fiyatla KodFinans'ta.", seoKeywords: "knight online 3200 cash, ko cash büyük paket" },
];

export const allSeedProducts = [...bozumProducts, ...salesProducts];

export async function seedAllProducts() {
    let success = 0;
    let failed = 0;

    for (const product of allSeedProducts) {
        try {
            await addProductToFirestore(product as any);
            success++;
            console.log(`✅ Added: ${product.name}`);
        } catch (error) {
            failed++;
            console.error(`❌ Failed: ${product.name}`, error);
        }
    }

    return { success, failed, total: allSeedProducts.length };
}
