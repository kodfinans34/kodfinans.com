"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { products as initialProducts, Product as StaticProduct } from "@/lib/products";
import { blogs as staticBlogs } from "@/lib/blogs";

// --- Types ---

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
    timestamp: Date;
    userEmail?: string;
}

// Site Settings Type
export interface SiteSettings {
    homepageTitle: string;
    homepageDescription: string;
    heroHeadline: string;
    heroSubheadline: string;
    whatsappNumber: string;
    seoKeywords: string;
    homepageSectionOrder?: string[]; // New: Order of homepage sections
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

// System Context Interface
interface SystemContextType {
    // Users
    users: SystemUser[];
    updateUser: (id: string, updates: Partial<SystemUser>) => void;
    updateUserBalance: (id: string, amount: number, action: "add" | "set") => void;
    deleteUser: (id: string) => void;

    // Products (Dynamic)
    products: Product[];
    addProduct: (product: Omit<Product, "id">) => void;
    updateProduct: (id: number, updates: Partial<Product>) => void;
    deleteProduct: (id: number) => void;

    // Blog
    blogs: BlogPost[];
    addBlog: (blog: Omit<BlogPost, "id">) => void;
    updateBlog: (id: string, updates: Partial<BlogPost>) => void;
    deleteBlog: (id: string) => void;

    // Orders
    orders: Order[];
    addOrder: (order: Omit<Order, "id" | "status" | "timestamp">) => void;
    updateOrderStatus: (id: string, status: "pending" | "completed" | "cancelled", code?: string) => void;

    // Bozum
    bozumRequests: BozumRequest[];
    addBozumRequest: (request: Omit<BozumRequest, "id" | "status" | "timestamp">) => void;
    updateBozumStatus: (id: string, status: "approved" | "rejected") => void;

    // Withdrawal
    withdrawalRequests: WithdrawalRequest[];
    addWithdrawalRequest: (request: Omit<WithdrawalRequest, "id" | "status" | "timestamp">) => void;
    updateWithdrawalStatus: (id: string, status: "approved" | "rejected") => void;

    // Reviews
    reviews: Review[];
    addReview: (review: Omit<Review, "id" | "status" | "timestamp">) => void;
    updateReviewStatus: (id: string, status: "approved" | "rejected") => void;
    deleteReview: (id: string) => void;

    // Settings
    settings: SiteSettings;
    updateSettings: (newSettings: Partial<SiteSettings>) => void;

    // User Balance (Mock)
    userBalance: number;
    addToBalance: (amount: number) => void;
    deductFromBalance: (amount: number) => void;

    // Auth
    user: { name: string; email: string; phone: string } | null;
    login: () => void;
    register: (userData: { name: string; email: string; phone: string; password?: string }) => void;
    logout: () => void;
    isLoggedIn: boolean;

    // Email
    sendEmail: (options: { to: string; subject: string; text?: string; html?: string }) => Promise<void>;
}

const defaultSettings: SiteSettings = {
    homepageTitle: "KodFinans | Dijital Kod Bozum",
    homepageDescription: "Dijital varlıklarınızı anında nakite çevirin. En yüksek oran garantisi.",
    heroHeadline: "DİJİTAL SERMAYENİ",
    heroSubheadline: "NAKİTE ÇEVİR",
    whatsappNumber: "+905517139330",
    seoKeywords: "kod bozum, razer gold, epin, gift card",
    smtpHost: "smtp.yandex.com",
    smtpPort: "465",
    smtpUser: "",
    smtpPass: "",
    smtpFrom: "bilgi@kodfinans.com",
    paytrMerchantId: "",
    paytrMerchantKey: "",
    paytrMerchantSalt: "",
    paytrTestMode: true,
};

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const SystemProvider = ({ children }: { children: React.ReactNode }) => {
    const initialBlogs: BlogPost[] = staticBlogs.map(b => ({
        ...b,
        category: b.category as string,
        excerpt: b.excerpt
    }));
    const [products, setProducts] = useState<Product[]>([]);
    const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
    const [orders, setOrders] = useState<Order[]>([]);
    const [bozumRequests, setBozumRequests] = useState<BozumRequest[]>([]);
    const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
    const [userBalance, setUserBalance] = useState(1250.75);
    const [user, setUser] = useState<{ name: string; email: string; phone: string } | null>(null);

    const [users, setUsers] = useState<SystemUser[]>([
        {
            id: "1",
            name: "Demo Kullanıcı",
            email: "demo@kodfinans.com",
            phone: "0555 555 55 55",
            balance: 1250.75,
            role: "user",
            createdAt: new Date("2026-01-10"),
            password: "password123"
        },
        {
            id: "2",
            name: "Ahmet Yılmaz",
            email: "ahmet@gmail.com",
            phone: "0532 123 44 55",
            balance: 450.00,
            role: "user",
            createdAt: new Date("2026-02-01"),
            password: "password123"
        }
    ]);

    const [isLoaded, setIsLoaded] = useState(false);

    // --- Load/Save (Mock Persistence) ---
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedProducts = localStorage.getItem("kf_products");
            const savedBlogs = localStorage.getItem("kf_blogs");
            const savedOrders = localStorage.getItem("kf_orders");
            const savedBozum = localStorage.getItem("kf_bozum");
            const savedWithdrawal = localStorage.getItem("kf_withdrawal");
            const savedReviews = localStorage.getItem("kf_reviews");
            const savedSettings = localStorage.getItem("kf_settings");
            const savedUsers = localStorage.getItem("kf_users");
            const savedBalance = localStorage.getItem("userBalance");
            const savedUser = localStorage.getItem("userProfile");

            if (savedProducts) setProducts(JSON.parse(savedProducts));
            else setProducts(initialProducts as Product[]);

            if (savedBlogs) setBlogs(JSON.parse(savedBlogs));
            else setBlogs(initialBlogs);

            if (savedOrders) setOrders(JSON.parse(savedOrders).map((o: any) => ({ ...o, timestamp: new Date(o.timestamp) })));
            if (savedBozum) setBozumRequests(JSON.parse(savedBozum).map((r: any) => ({ ...r, timestamp: new Date(r.timestamp) })));
            if (savedWithdrawal) setWithdrawalRequests(JSON.parse(savedWithdrawal).map((w: any) => ({ ...w, timestamp: new Date(w.timestamp) })));
            if (savedReviews) setReviews(JSON.parse(savedReviews).map((rv: any) => ({ ...rv, timestamp: new Date(rv.timestamp) })));
            if (savedSettings) setSettings(JSON.parse(savedSettings));
            if (savedUsers) setUsers(JSON.parse(savedUsers).map((u: any) => ({ ...u, createdAt: new Date(u.createdAt) })));
            if (savedBalance) setUserBalance(parseFloat(savedBalance));
            if (savedUser) setUser(JSON.parse(savedUser));

            setIsLoaded(true);
        }
    }, []);

    // Persistence Hooks
    useEffect(() => {
        if (isLoaded) localStorage.setItem("kf_products", JSON.stringify(products));
    }, [products, isLoaded]);

    useEffect(() => {
        if (isLoaded) localStorage.setItem("kf_blogs", JSON.stringify(blogs));
    }, [blogs, isLoaded]);

    useEffect(() => {
        if (isLoaded) localStorage.setItem("kf_orders", JSON.stringify(orders));
    }, [orders, isLoaded]);

    useEffect(() => {
        if (isLoaded) localStorage.setItem("kf_bozum", JSON.stringify(bozumRequests));
    }, [bozumRequests, isLoaded]);

    useEffect(() => {
        if (isLoaded) localStorage.setItem("kf_withdrawal", JSON.stringify(withdrawalRequests));
    }, [withdrawalRequests, isLoaded]);

    useEffect(() => {
        if (isLoaded) localStorage.setItem("kf_reviews", JSON.stringify(reviews));
    }, [reviews, isLoaded]);

    useEffect(() => {
        if (isLoaded) localStorage.setItem("kf_settings", JSON.stringify(settings));
    }, [settings, isLoaded]);

    useEffect(() => {
        if (isLoaded) localStorage.setItem("kf_users", JSON.stringify(users));
    }, [users, isLoaded]);

    useEffect(() => {
        if (isLoaded) localStorage.setItem("userBalance", userBalance.toString());
    }, [userBalance, isLoaded]);

    useEffect(() => {
        if (!isLoaded) return;
        if (user) localStorage.setItem("userProfile", JSON.stringify(user));
        else localStorage.removeItem("userProfile");
    }, [user, isLoaded]);

    // --- Handlers ---

    // Product Handlers
    const addProduct = (product: Omit<Product, "id">) => {
        const newProduct: Product = {
            ...product,
            id: Date.now(),
        };
        setProducts(prev => [...prev, newProduct]);
    };

    const updateProduct = (id: number, updates: Partial<Product>) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    };

    const deleteProduct = (id: number) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    // Blog Handlers
    const addBlog = (blog: Omit<BlogPost, "id">) => {
        const newBlog: BlogPost = {
            ...blog,
            id: Math.random().toString(36).substr(2, 9),
        };
        setBlogs(prev => [newBlog, ...prev]);
    };

    const updateBlog = (id: string, updates: Partial<BlogPost>) => {
        setBlogs(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
    };

    const deleteBlog = (id: string) => {
        setBlogs(prev => prev.filter(b => b.id !== id));
    };

    // Order Handlers
    const addOrder = (order: Omit<Order, "id" | "status" | "timestamp">) => {
        const newOrder: Order = {
            ...order,
            id: Math.random().toString(36).substr(2, 9).toUpperCase(),
            status: "pending",
            timestamp: new Date()
        };
        setOrders(prev => [newOrder, ...prev]);
    };

    const updateOrderStatus = (id: string, status: "pending" | "completed" | "cancelled", code?: string) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status, digitalCode: code || o.digitalCode } : o));
    };

    const addBozumRequest = (request: Omit<BozumRequest, "id" | "status" | "timestamp">) => {
        const newRequest: BozumRequest = {
            ...request,
            id: Math.random().toString(36).substr(2, 9),
            status: "pending",
            timestamp: new Date()
        };
        setBozumRequests(prev => [newRequest, ...prev]);
    };

    const addWithdrawalRequest = (request: Omit<WithdrawalRequest, "id" | "status" | "timestamp">) => {
        const newRequest: WithdrawalRequest = {
            ...request,
            id: Math.random().toString(36).substr(2, 9),
            status: "pending",
            timestamp: new Date()
        };
        setWithdrawalRequests(prev => [newRequest, ...prev]);
        deductFromBalance(newRequest.amount);
    };

    const updateBozumStatus = (id: string, status: "approved" | "rejected") => {
        const req = bozumRequests.find(r => r.id === id);
        if (req && status === "approved" && req.status !== "approved") {
            addToBalance(req.calculatedAmount);
        }
        setBozumRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    };

    const updateWithdrawalStatus = (id: string, status: "approved" | "rejected") => {
        const req = withdrawalRequests.find(r => r.id === id);
        if (req && status === "rejected" && req.status === "pending") {
            addToBalance(req.amount);
        }
        setWithdrawalRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    };

    // Review Handlers
    const addReview = (review: Omit<Review, "id" | "status" | "timestamp">) => {
        const newReview: Review = {
            ...review,
            id: Math.random().toString(36).substr(2, 9),
            status: "pending",
            timestamp: new Date()
        };
        setReviews(prev => [newReview, ...prev]);
    };

    const updateReviewStatus = (id: string, status: "approved" | "rejected") => {
        setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    };

    const deleteReview = (id: string) => {
        setReviews(prev => prev.filter(r => r.id !== id));
    };

    const updateSettings = (newSettings: Partial<SiteSettings>) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    const updateUser = (id: string, updates: Partial<SystemUser>) => {
        setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
    };

    const updateUserBalance = (id: string, amount: number, action: "add" | "set") => {
        setUsers(prev => prev.map(u => {
            if (u.id === id) {
                const newBalance = action === "add" ? u.balance + amount : amount;
                return { ...u, balance: Math.max(0, newBalance) };
            }
            return u;
        }));
    };

    const deleteUser = (id: string) => {
        setUsers(prev => prev.filter(u => u.id !== id));
    };

    const login = () => {
        const demoUser = users.find(u => u.id === "1");
        if (demoUser) {
            setUser({ name: demoUser.name, email: demoUser.email, phone: demoUser.phone });
            setUserBalance(demoUser.balance);
        } else {
            setUser({ name: "Demo User", email: "demo@kodfinans.com", phone: "05555555555" });
        }
    };

    const register = (userData: { name: string; email: string; phone: string; password?: string }) => {
        const newUser: SystemUser = {
            id: Math.random().toString(36).substr(2, 9),
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            password: userData.password || "password123",
            balance: 0,
            role: "user",
            createdAt: new Date()
        };
        setUsers(prev => [...prev, newUser]);
        setUser({ name: newUser.name, email: newUser.email, phone: newUser.phone });
        setUserBalance(0);
    };

    const logout = () => setUser(null);

    const addToBalance = (amount: number) => {
        setUserBalance(prev => prev + amount);
        if (user) {
            setUsers(prev => prev.map(u => u.email === user.email ? { ...u, balance: u.balance + amount } : u));
        }
    };

    const deductFromBalance = (amount: number) => {
        setUserBalance(prev => Math.max(0, prev - amount));
        if (user) {
            setUsers(prev => prev.map(u => u.email === user.email ? { ...u, balance: Math.max(0, u.balance - amount) } : u));
        }
    };

    const sendEmail = async (options: { to: string; subject: string; text?: string; html?: string }) => {
        try {
            await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    smtpSettings: settings,
                    ...options
                })
            });
        } catch (error) {
            console.error('Email send error:', error);
        }
    };

    return (
        <SystemContext.Provider value={{
            users,
            updateUser,
            updateUserBalance,
            deleteUser,

            products,
            addProduct,
            updateProduct,
            deleteProduct,

            blogs,
            addBlog,
            updateBlog,
            deleteBlog,

            orders,
            addOrder,
            updateOrderStatus,
            bozumRequests,
            addBozumRequest,
            updateBozumStatus,
            withdrawalRequests,
            addWithdrawalRequest,
            updateWithdrawalStatus,

            reviews,
            addReview,
            updateReviewStatus,
            deleteReview,

            settings,
            updateSettings,
            userBalance,
            addToBalance,
            deductFromBalance,
            user,
            isLoggedIn: !!user,
            login,
            register,
            logout,
            sendEmail
        }}>
            {children}
        </SystemContext.Provider>
    );
};

export const useSystem = () => {
    const context = useContext(SystemContext);
    if (!context) throw new Error("useSystem must be used within a SystemProvider");
    return context;
};
