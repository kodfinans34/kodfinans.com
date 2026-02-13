
export interface ProductVariant {
    id: string;
    name: string;
    price: number;
    discountPrice?: number;
    stock?: number;
    description?: string;
    slug?: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
}

export interface ProductFeature {
    key: string;
    value: string;
}

export interface Product {
    id: number;
    slug: string;
    category: "gift" | "games" | "items";
    productType?: "bozum" | "satis";
    name: string;
    price: string | number;
    description: string;
    image: string;
    logo?: string;
    badge?: string;
    rating?: number;
    speed?: string;
    discountPrice?: number;
    games?: { name: string; image: string }[];
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
    seoImage?: string;
    stock?: number;
    variants?: ProductVariant[];
    features?: ProductFeature[];
    howToUse?: string;
}

export const products: Product[] = [
    // --- BOZUM (EXCHANGE) PRODUCTS ---
    {
        id: 1,
        slug: "razer-gold-bozdurma",
        category: "gift",
        productType: "bozum",
        name: "Razer Gold Bozdurma",
        price: "%80 Oran",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop", // Gaming setup generic
        logo: "https://cdn.worldvectorlogo.com/logos/razer-1.svg",
        badge: "En Yüksek Kur",
        rating: 5.0,
        speed: "3dk",
        description: "Razer Gold pinlerinizi saniyeler içinde nakite çevirin. Piyasadaki en yüksek bozum oranları ve anında ödeme garantisi KodFinans'ta.",
        seoTitle: "Razer Gold Bozdurma - %80 Oranla Nakite Çevir | KodFinans",
        seoDescription: "Elinizdeki Razer Gold kodlarını en yüksek kurlardan anında nakite çevirin. Güvenilir ve hızlı Razer Gold bozum işlemi için KodFinans.",
        seoKeywords: "razer gold bozdurma, razer gold nakite çevirme, razer gold sat, razer gold bozum oranları",
        features: [
            { key: "İşlem Süresi", value: "3 Dakika" },
            { key: "Ödeme Yöntemi", value: "Havale/EFT/Papara" },
            { key: "Güvenlik", value: "256-bit SSL" }
        ]
    },
    {
        id: 2,
        slug: "steam-cuzdan-kodu-bozdurma",
        category: "gift",
        productType: "bozum",
        name: "Steam Cüzdan Bozdurma",
        price: "%75 Oran",
        image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=800&auto=format&fit=crop", // Console controller
        logo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg",
        badge: "Hızlı",
        rating: 4.8,
        speed: "5dk",
        description: "Kullanmadığınız Steam Cüzdan kodlarını değerlendirin. Hızlı işlem ve güvenli ödeme seçenekleriyle Steam bakiyenizi nakite dönüştürün.",
        seoTitle: "Steam Cüzdan Kodu Bozdurma - Anında Nakit | KodFinans",
        seoDescription: "Steam cüzdan kodu bozdurma ve nakite çevirme işlemleri. En iyi oranlarla Steam bakiyenizi hemen satın.",
        seoKeywords: "steam cüzdan kodu bozdurma, steam bakiye bozdurma, steam cüzdan sat, steam nakit",
        features: [
            { key: "İşlem Süresi", value: "5 Dakika" },
            { key: "Minimum Tutar", value: "50 TL" }
        ]
    },
    {
        id: 3,
        slug: "google-play-bozdurma",
        category: "gift",
        productType: "bozum",
        name: "Google Play Bozdurma",
        price: "%70 Oran",
        image: "https://images.unsplash.com/photo-1628126235206-5260b9ea6441?q=80&w=800&auto=format&fit=crop", // Android phone
        logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg",
        badge: "Yeni",
        rating: 4.7,
        speed: "10dk",
        description: "Google Play hediye kartlarınızı ve kodlarınızı güvenle bozdurun. Android bakiyenizi gerçek paraya çevirmenin en kolay yolu.",
        seoTitle: "Google Play Kodu Bozdurma - Güvenilir İşlem | KodFinans",
        seoDescription: "Google Play kodlarını bozdurmak mı istiyorsunuz? KodFinans ile Google Play bakiyenizi anında nakite çevirin.",
        seoKeywords: "google play bozdurma, google play kod sat, google play nakit, google play kart bozdurma"
    },
    {
        id: 4,
        slug: "itunes-hediye-karti-bozdurma",
        category: "gift",
        productType: "bozum",
        name: "iTunes Kart Bozdurma",
        price: "%75 Oran",
        image: "https://images.unsplash.com/photo-1625505823542-a39e9f291350?q=80&w=800&auto=format&fit=crop", // Apple products
        logo: "https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg",
        badge: "Popüler",
        rating: 4.9,
        speed: "5dk",
        description: "Apple iTunes hediye kartlarını değerlendirin. App Store bakiyenizi nakite çevirin.",
        seoTitle: "iTunes Kart Bozdurma - Apple Bakiye Satışı | KodFinans",
        seoDescription: "iTunes hediye kartı bozdurma işlemleri. Apple bakiyenizi güvenle nakite veya banka hesabınıza aktarın.",
        seoKeywords: "itunes kart bozdurma, apple bakiye bozdurma, itunes kod sat, app store kart bozdurma"
    },
    {
        id: 5,
        slug: "netflix-hediye-karti-bozdurma",
        category: "gift",
        productType: "bozum",
        name: "Netflix Kart Bozdurma",
        price: "%60 Oran",
        image: "https://images.unsplash.com/photo-1522869635100-8f4756253369?q=80&w=800&auto=format&fit=crop",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
        badge: "Yeni",
        rating: 4.5,
        speed: "15dk",
        description: "Netflix hediye kartlarınızı nakite çevirin. Kullanmadığınız üyelik kodlarını değerlendirmenin en kolay yolu.",
        seoTitle: "Netflix Hediye Kartı Bozdurma ve Satış | KodFinans",
        seoDescription: "Netflix hediye kartı bozum işlemleri. Abonelik kodlarınızı güvenle satıp parasını hesabınıza alın.",
        seoKeywords: "netflix kart bozdurma, netflix kod sat, netflix hediye kartı nakit"
    },
    {
        id: 6,
        slug: "spotify-premium-bozdurma",
        category: "gift",
        productType: "bozum",
        name: "Spotify Kod Bozdurma",
        price: "%50 Oran",
        image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=800&auto=format&fit=crop",
        logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
        badge: "Fırsat",
        rating: 4.6,
        speed: "10dk",
        description: "Spotify Premium kodlarınızı nakite dönüştürün. Müzik keyfiniz nakite dönüşsün.",
        seoTitle: "Spotify Premium Kodu Bozdurma | KodFinans",
        seoDescription: "Spotify kod bozdurma ve nakite çevirme. Spotify hediye kartlarını en iyi oranlarla sat.",
        seoKeywords: "spotify kod bozdurma, spotify premium sat, spotify kart nakit"
    },
    {
        id: 7,
        slug: "xbox-gamepass-bozdurma",
        category: "games",
        productType: "bozum",
        name: "Xbox GamePass Bozum",
        price: "%65 Oran",
        image: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=800&auto=format&fit=crop",
        logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Xbox_one_logo.svg",
        badge: "Oyuncu Dostu",
        rating: 4.8,
        speed: "5dk",
        description: "Xbox GamePass kodlarınızı güvenle bozdurun. Konsol ve PC oyun kodlarınızı değerlendirin.",
        seoTitle: "Xbox GamePass Kodu Bozdurma - Microsoft Store Nakit | KodFinans",
        seoDescription: "Xbox GamePass ve hediye kartı bozum işlemleri. Microsoft Store bakiyenizi nakite çevirin.",
        seoKeywords: "xbox gamepass bozdurma, xbox kod sat, xbox bakiye nakit"
    },
    {
        id: 8,
        slug: "playstation-network-bozdurma",
        category: "games",
        productType: "bozum",
        name: "PSN Kodu Bozdurma",
        price: "%70 Oran",
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=800&auto=format&fit=crop",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg",
        badge: "Popüler",
        rating: 4.9,
        speed: "8dk",
        description: "PlayStation Store hediye kartlarını ve PSN kodlarını nakite çevirin. Sony bakiyenizi değerlendirin.",
        seoTitle: "PSN Kodu Bozdurma - PlayStation Store Nakit | KodFinans",
        seoDescription: "PlayStation Network (PSN) kodu bozdurma. PS Store bakiyenizi güvenle satın.",
        seoKeywords: "psn kodu bozdurma, playstation kart sat, ps store nakit"
    },

    // --- SATIŞ (SALES) PRODUCTS ---

    // VALORANT
    {
        id: 101,
        slug: "valorant-vp",
        category: "games",
        productType: "satis",
        name: "Valorant Points (VP)",
        price: 115, // Starting price
        image: "https://images.unsplash.com/photo-1624138784181-dc7f5b759b2d?q=80&w=1000&auto=format&fit=crop", // Neon gaming vibes
        logo: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Valorant_logo_-_pink_color_v.svg",
        description: "Riot Games'in popüler taktiksel nişancısı Valorant için VP satın alın. Türkiye sunucularında geçerli ucuz ve güvenilir Valorant Points.",
        seoTitle: "Valorant VP Satın Al - En Ucuz Fiyatlar ve Anında Teslimat | KodFinans",
        seoDescription: "En ucuz ve güvenilir Valorant VP fiyatları KodFinans'ta. 7/24 anında teslimat garantisiyle hemen Valorant Points satın al, skine kavuş.",
        seoKeywords: "valorant vp satın al, ucuz vp, valorant points fiyatları, güvenilir epin sitesi, valorant vp",
        stock: 5000,
        rating: 5.0,
        speed: "Anında",
        features: [
            { key: "Bölge", value: "Türkiye (TR)" },
            { key: "Platform", value: "Riot Client" },
            { key: "Teslimat", value: "7/24 Otomatik" },
            { key: "Geçerlilik", value: "Süresiz" }
        ],
        variants: [
            { id: "v115", name: "115 VP", price: 35, discountPrice: 33, description: "115 Valorant Points - TR Sunucusu", slug: "valorant-115-vp", seoTitle: "115 VP Satın Al - Valorant | KodFinans" },
            { id: "v485", name: "485 VP", price: 130, discountPrice: 125, description: "485 Valorant Points - TR Sunucusu", slug: "valorant-485-vp", seoTitle: "485 VP Satın Al - Valorant | KodFinans" },
            { id: "v925", name: "925 VP", price: 250, discountPrice: 240, description: "925 Valorant Points - TR Sunucusu", slug: "valorant-925-vp", seoTitle: "925 VP Satın Al - Valorant | KodFinans" },
            { id: "v1850", name: "1850 VP", price: 495, discountPrice: 475, description: "1850 Valorant Points - TR Sunucusu", slug: "valorant-1850-vp", seoTitle: "1850 VP Satın Al - Valorant | KodFinans" },
            { id: "v3400", name: "3400 VP", price: 880, discountPrice: 850, description: "3400 Valorant Points - TR Sunucusu", slug: "valorant-3400-vp", seoTitle: "3400 VP Satın Al - Valorant | KodFinans" },
            { id: "v5550", name: "5550 VP", price: 1400, discountPrice: 1350, description: "5550 Valorant Points - TR Sunucusu", slug: "valorant-5550-vp", seoTitle: "5550 VP Satın Al - Valorant | KodFinans" }
        ],
        howToUse: "KodFinans'tan satın aldığınız E-Pin kodunu; Valorant oyununu açıp, Mağaza sekmesindeki 'VP Satın Al' bölümünden 'Riot Pin ve Kodlar' seçeneğine girerek aktif edebilirsiniz. Bakiyeniz anında hesabınıza yansır."
    },

    // PUBG MOBILE
    {
        id: 102,
        slug: "pubg-mobile-uc",
        category: "games",
        productType: "satis",
        name: "PUBG Mobile UC",
        price: 35,
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop", // Battle royale vibes
        logo: "https://cdn-icons-png.flaticon.com/512/5977/5977575.png",
        description: "PUBG Mobile Unknown Cash (UC) ile oyun içi kostüm, silah ve pass içeriklerine sahip olun. İndirimli UC fiyatlarını kaçırmayın.",
        seoTitle: "PUBG Mobile UC Satın Al - İndirimli UC Fiyatları | KodFinans",
        seoDescription: "En uygun fiyatlarla PUBG Mobile UC satın al. Midasbuy garantisiyle güvenilir ve hızlı UC yükleme işlemleri KodFinans'ta.",
        seoKeywords: "pubg mobile uc satın al, uc fiyatları, ucuz uc, pubg uc yükle, pubg mobile epin",
        stock: 3000,
        rating: 4.9,
        speed: "1dk",
        features: [
            { key: "Bölge", value: "Global" },
            { key: "Platform", value: "Mobile" },
            { key: "Teslimat", value: "E-Pin / ID Yükleme" }
        ],
        variants: [
            { id: "pubg60", name: "60 UC", price: 35, description: "60 Unknown Cash", slug: "pubg-mobile-60-uc", seoTitle: "60 UC Satın Al - PUBG Mobile" },
            { id: "pubg325", name: "325 UC + Bonus", price: 175, description: "325 UC", slug: "pubg-mobile-325-uc", seoTitle: "325 UC Satın Al - PUBG Mobile" },
            { id: "pubg660", name: "660 UC + Bonus", price: 340, description: "660 UC", slug: "pubg-mobile-660-uc", seoTitle: "660 UC Satın Al - PUBG Mobile" },
            { id: "pubg1800", name: "1800 UC + Bonus", price: 850, description: "1800 UC", slug: "pubg-mobile-1800-uc", seoTitle: "1800 UC Satın Al - PUBG Mobile" }
        ],
        howToUse: "Satın aldığınız kodu Midasbuy üzerinden ID'nizi girerek aktif edebilirsiniz. Kodu girdikten sonra UC anında hesabınıza yüklenir."
    },

    // LEAGUE OF LEGENDS
    {
        id: 103,
        slug: "league-of-legends-rp",
        category: "games",
        productType: "satis",
        name: "League of Legends RP",
        price: 45,
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop", // Fantasy game vibes
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/LoL_Icon.svg",
        description: "Riot Points (RP) ile League of Legends şampiyon kostümleri, totemler ve daha fazlasını alın. TR sunucusu için geçerlidir.",
        seoTitle: "LoL RP Satın Al - League of Legends Riot Points | KodFinans",
        seoDescription: "İndirimli League of Legends RP fiyatları. Hızlı ve güvenli Riot Points alışverişinin adresi KodFinans.",
        seoKeywords: "lol rp satın al, riot points fiyatları, ucuz rp, lol rp yükle, league of legends",
        stock: 2500,
        rating: 5.0,
        speed: "Anında",
        features: [
            { key: "Bölge", value: "Türkiye (TR)" },
            { key: "Platform", value: "Riot Client" },
            { key: "Teslimat", value: "7/24 Otomatik" }
        ],
        variants: [
            { id: "rp200", name: "200 RP", price: 45, description: "200 Riot Points - TR", slug: "lol-200-rp", seoTitle: "200 RP Satın Al - LoL" },
            { id: "rp850", name: "850 RP", price: 185, description: "850 Riot Points - TR", slug: "lol-850-rp", seoTitle: "850 RP Satın Al - LoL" },
            { id: "rp1600", name: "1600 RP", price: 350, description: "1600 Riot Points - TR", slug: "lol-1600-rp", seoTitle: "1600 RP Satın Al - LoL" },
            { id: "rp3150", name: "3150 RP", price: 675, description: "3150 Riot Points - TR", slug: "lol-3150-rp", seoTitle: "3150 RP Satın Al - LoL" }
        ],
        howToUse: "League of Legends istemcisinde Mağaza > RP Satın Al > Riot Pin ve Kodlar bölümünden kodunuzu aktif edebilirsiniz."
    },

    // RAZER GOLD
    {
        id: 104,
        slug: "razer-gold-tl",
        category: "gift",
        productType: "satis",
        name: "Razer Gold TL",
        price: 10,
        image: "https://images.unsplash.com/photo-1616440347437-b1c73acce873?q=80&w=1000&auto=format&fit=crop", // Green tech vibes
        logo: "https://cdn.worldvectorlogo.com/logos/razer-1.svg",
        description: "Razer Gold ile 34.000'den fazla oyun ve eğlence içeriğinde harcama yapın. Evrensel oyuncu kredisi.",
        seoTitle: "Razer Gold Satın Al - Razer Gold TL Fiyatları | KodFinans",
        seoDescription: "Razer Gold TL satın alarak PUBG Mobile, Zula ve binlerce oyunda kullanabilirsiniz. Anında teslimat garantisi.",
        seoKeywords: "razer gold satın al, razer gold tl, razer gold fiyatları, razer pin",
        stock: 10000,
        rating: 4.8,
        speed: "Anında",
        features: [
            { key: "Bölge", value: "Türkiye (TR)" },
            { key: "Geçerlilik", value: "Tüm Razer Gold Oyunları" }
        ],
        variants: [
            { id: "rg10", name: "10 Razer Gold", price: 10, description: "10 TL değerinde Razer Gold", slug: "razer-gold-10-tl" },
            { id: "rg25", name: "25 Razer Gold", price: 25, description: "25 TL değerinde Razer Gold", slug: "razer-gold-25-tl" },
            { id: "rg50", name: "50 Razer Gold", price: 50, description: "50 TL değerinde Razer Gold", slug: "razer-gold-50-tl" },
            { id: "rg100", name: "100 Razer Gold", price: 100, description: "100 TL değerinde Razer Gold", slug: "razer-gold-100-tl" },
            { id: "rg250", name: "250 Razer Gold", price: 250, description: "250 TL değerinde Razer Gold", slug: "razer-gold-250-tl" },
            { id: "rg500", name: "500 Razer Gold", price: 500, description: "500 TL değerinde Razer Gold", slug: "razer-gold-500-tl" }
        ],
        howToUse: "Gold.razer.com adresine gidin, hesabınıza giriş yapın ve 'Reload Now' sekmesinden Razer Pin seçeneği ile kodunuzu yükleyin."
    },

    // STEAM WALLET
    {
        id: 105,
        slug: "steam-cuzdan-kodu",
        category: "gift",
        productType: "satis",
        name: "Steam Cüzdan Kodu",
        price: 50,
        image: "https://images.unsplash.com/photo-1629759882200-349f29135061?q=80&w=1000&auto=format&fit=crop", // Steam vibes
        logo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg",
        description: "Steam Cüzdan Kodu ile oyun, yazılım ve topluluk pazarı alışverişlerinizi yapın. TL bazında Steam bakiyesi.",
        seoTitle: "Steam Cüzdan Kodu Satın Al - Steam Bakiye Yükle | KodFinans",
        seoDescription: "Steam oyunlarını satın almak için en ucuz Steam Cüzdan Kodu fiyatları. %100 güvenilir ve anında teslim.",
        seoKeywords: "steam cüzdan kodu, steam bakiye, steam cüzdan kodu satın al, steam tl",
        stock: 200,
        rating: 4.9,
        speed: "Anında",
        features: [
            { key: "Bölge", value: "Türkiye (TR)" },
            { key: "Platform", value: "Steam" }
        ],
        variants: [
            { id: "stm50", name: "50 TL Steam Kodu", price: 50, description: "50 TL Bakiye", slug: "steam-50-tl" },
            { id: "stm100", name: "100 TL Steam Kodu", price: 100, description: "100 TL Bakiye", slug: "steam-100-tl" },
            { id: "stm200", name: "200 TL Steam Kodu", price: 200, description: "200 TL Bakiye", slug: "steam-200-tl" },
            { id: "stm500", name: "500 TL Steam Kodu", price: 500, description: "500 TL Bakiye", slug: "steam-500-tl" }
        ],
        howToUse: "Steam istemcisini açın, profil adınıza tıklayın > Cüzdanımı Görüntüle > Steam Cüzdan Kodu Kullan seçeneğine gidin."
    },

    // NETFLIX
    {
        id: 106,
        slug: "netflix-hediye-karti",
        category: "gift",
        productType: "satis",
        name: "Netflix Hediye Kartı",
        price: 100,
        image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1000&auto=format&fit=crop", // Movie night
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
        description: "Netflix aboneliğinizi başlatmak veya devam ettirmek için hediye kartı kullanın. Kredi kartı gerektirmez.",
        seoTitle: "Netflix Hediye Kartı Satın Al - Abonelik Kodu | KodFinans",
        seoDescription: "Netflix üyeliği için hediye kartı satın al. Kredi kartsız Netflix izlemenin en kolay yolu.",
        seoKeywords: "netflix hediye kartı, netflix kodu, netflix abonelik, netflix bakiye",
        stock: 150,
        rating: 5.0,
        speed: "Anında",
        features: [
            { key: "Bölge", value: "Türkiye" },
            { key: "Kullanım", value: "Abonelik Ödemesi" }
        ],
        variants: [
            { id: "nflx100", name: "100 TL Netflix Kodu", price: 100, description: "100 TL Bakiye", slug: "netflix-100-tl" },
            { id: "nflx250", name: "250 TL Netflix Kodu", price: 250, description: "250 TL Bakiye", slug: "netflix-250-tl" }
        ],
        howToUse: "www.netflix.com/redeem adresine gidin ve satın aldığınız kodu girin."
    }
];
