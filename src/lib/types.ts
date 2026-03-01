
import { Product as StaticProduct } from "@/lib/products";

// Review/Comment Type
export interface Review {
    id: string;
    productId: number;
    userName: string;
    userEmail: string;
    comment: string;
    rating: number;
    status: "pending" | "approved" | "rejected";
    timestamp: Date;
}

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

export interface Product extends StaticProduct {
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
    seoImage?: string;
    stock?: number;
    variants?: ProductVariant[];
    features?: ProductFeature[];
    howToUse?: string;
    linkedSalesSlug?: string; // Bozum ürünlerinin "Satın Al" butonu için yönlendirileceği satış ürünü slug'ı
}

// Order Type
export interface Order {
    id: string;
    items: {
        productId: number;
        productName: string;
        price: number;
        quantity: number;
        variant?: string;
    }[];
    totalAmount: number;
    status: "pending" | "completed" | "cancelled";
    customerInfo: {
        name: string;
        email: string;
        phone: string;
    };
    paymentMethod: "credit_card" | "balance" | "transfer";
    timestamp: Date;
    userId?: string;
    digitalCode?: string;
}

// Bozum Request Type
export interface BozumRequest {
    id: string;
    codeType: string;
    codeAmount: number;
    calculatedAmount: number;
    status: "pending" | "approved" | "rejected";
    timestamp: Date;
    userEmail?: string;
    userPhone?: string;
    digitalCode?: string;
}

// Withdrawal Request Type
export interface WithdrawalRequest {
    id: string;
    bankName: string;
    iban: string;
    amount: number;
    accountHolder: string;
    status: "pending" | "approved" | "rejected";
    timestamp: Date; // In Firestore, this will be convertable from Timestamp
    userEmail?: string;
}

export interface ThemeConfig {
    background: string;
    foreground: string;
    card: string;
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
    border: string;
}

// Site Settings Type
export interface SiteSettings {
    homepageTitle: string;
    homepageDescription: string;
    heroHeadline: string;
    heroSubheadline: string;
    whatsappNumber: string;
    seoKeywords: string;
    homepageSectionOrder?: string[];
    // Email Settings (SMTP)
    smtpHost?: string;
    smtpPort?: string;
    smtpUser?: string;
    smtpPass?: string;
    smtpFrom?: string;
    // PayTR Settings
    paytrMerchantId?: string;
    paytrMerchantKey?: string;
    paytrMerchantSalt?: string;
    paytrTestMode?: boolean;
    // Theme
    themeColor?: string; // 'green' | 'indigo' | 'red' | 'blue' | 'orange'
    siteMode?: "white" | "dark";
    activeTheme?: "standard" | "special";
    lightThemeConfig?: ThemeConfig;
    darkThemeConfig?: ThemeConfig;
    // Logos
    headerLogo?: string;
    footerLogo?: string;
    adminLogo?: string;
    favicon?: string;
    // Scripts & CSS
    googleAnalyticsId?: string;
    customHeadCode?: string; // For Google Ads verification, etc.
    customCss?: string;
    // Header / Navbar
    topBannerEnabled?: boolean;
    topBannerText1?: string;
    topBannerText2?: string;
    topBannerText3?: string;
    navCtaText?: string; // CTA button text (e.g. "Kod Bozdur")
    heroImage?: string; // Hero section background image URL
    // Footer
    footerDescription?: string;
    copyrightText?: string;
    footerEmail?: string;
    footerPhone?: string;
    footerAddress?: string;
    // Social Media
    socialFacebook?: string;
    socialTwitter?: string;
    socialInstagram?: string;
    socialYoutube?: string;
    socialTelegram?: string;
    // IBAN / Payment Info
    ibanInfo?: string;
    ibanHolder?: string;
    bankName?: string;
    // CTA Promo Banner (Homepage)
    ctaBannerEnabled?: boolean;
    ctaBannerTitle?: string;
    ctaBannerDescription?: string;
    ctaBannerButtonText?: string;
    ctaBannerWhatsappMessage?: string;
    // Hero Banners
    heroBanners?: {
        id: number;
        image: string;
        title: string;
        subtitle: string;
        description: string;
        buttonText: string;
        buttonLink: string;
        buttonText2?: string;
        buttonLink2?: string;
    }[];
    // Zero Services
    zeroGbBuyRate?: string;
    zeroGbSellRate?: string;
    zeroItemSellRate?: string;
    zeroServicesEnabled?: boolean;
    zeroSectionTitle?: string;
    zeroSectionDescription?: string;
    // Knight Online Services
    koGbBuyRate?: string;
    koGbSellRate?: string;
    koServicesEnabled?: boolean;
    koSectionTitle?: string;
    koSectionDescription?: string;
}

// Blog Post Type
export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    content: string; // HTML or Markdown
    image: string;
    category: string;
    date: string;
    author: string;
    readTime: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
}

// System User Type
export interface SystemUser {
    id: string;
    name: string;
    email: string;
    phone: string;
    balance: number;
    password?: string;
    role: "user" | "admin";
    createdAt: Date;
}

// Balance Request Type
export interface BalanceRequest {
    id: string;
    userId?: string;
    userEmail: string;
    userName: string;
    amount: number;
    method: "card" | "transfer";
    status: "pending" | "approved" | "rejected";
    timestamp: Date;
    note?: string;
}
