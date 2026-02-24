
"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";


import {
    Product,
    Review,
    Order,
    BozumRequest,
    WithdrawalRequest,
    SiteSettings,
    ThemeConfig,
    BlogPost,
    SystemUser
} from "@/lib/types";

export type {
    Product,
    Review,
    Order,
    BozumRequest,
    WithdrawalRequest,
    SiteSettings,
    BlogPost,
    SystemUser
};
import {
    getProducts,
    addProductToFirestore,
    updateProductInFirestore,
    deleteProductFromFirestore
} from "@/lib/firebase-products";
import {
    getWithdrawalsFromFirestore,
    addWithdrawalToFirestore,
    updateWithdrawalinFirestore
} from "@/lib/firebase-withdrawals";
import {
    getSettings,
    updateSettingsInFirestore
} from "@/lib/firebase-settings";
import {
    getBlogs,
    addBlogToFirestore,
    updateBlogInFirestore,
    deleteBlogFromFirestore
} from "@/lib/firebase-blogs";
import {
    getOrdersFromFirestore,
    addOrderToFirestore,
    updateOrderInFirestore,
    deleteOrderFromFirestore
} from "@/lib/firebase-orders";
import {
    getBozumRequestsFromFirestore,
    addBozumRequestToFirestore,
    updateBozumRequestInFirestore,
    deleteBozumRequestFromFirestore
} from "@/lib/firebase-bozum";
import {
    getUsersFromFirestore,
    addUserToFirestore,
    updateUserInFirestore,
    deleteUserFromFirestore
} from "@/lib/firebase-users";

// System Context Interface
interface SystemContextType {
    // Users
    users: SystemUser[];
    updateUser: (id: string, updates: Partial<SystemUser>) => void;
    updateUserBalance: (id: string, amount: number, action: "add" | "set") => void;
    deleteUser: (id: string) => void;

    // Products (Dynamic)
    products: Product[];
    addProduct: (product: Omit<Product, "id">) => Promise<void>;
    updateProduct: (id: string | number, updates: Partial<Product>) => Promise<void>;
    deleteProduct: (id: string | number) => Promise<void>;

    // Blog
    blogs: BlogPost[];
    addBlog: (blog: Omit<BlogPost, "id">) => Promise<void>;
    updateBlog: (id: string, updates: Partial<BlogPost>) => Promise<void>;
    deleteBlog: (id: string) => Promise<void>;

    // Orders
    orders: Order[];
    addOrder: (order: Omit<Order, "id" | "status" | "timestamp">) => Promise<void>;
    updateOrderStatus: (id: string, status: "pending" | "completed" | "cancelled", code?: string) => Promise<void>;
    deleteOrder: (id: string) => Promise<void>;

    // Bozum
    bozumRequests: BozumRequest[];
    addBozumRequest: (request: Omit<BozumRequest, "id" | "status" | "timestamp">) => Promise<void>;
    updateBozumStatus: (id: string, status: "approved" | "rejected") => Promise<void>;
    deleteBozumRequest: (id: string) => Promise<void>;

    // Withdrawal
    withdrawalRequests: WithdrawalRequest[];
    addWithdrawalRequest: (request: Omit<WithdrawalRequest, "id" | "status" | "timestamp">) => Promise<void>;
    updateWithdrawalStatus: (id: string, status: "approved" | "rejected") => Promise<void>;

    // Reviews
    reviews: Review[];
    addReview: (review: Omit<Review, "id" | "status" | "timestamp">) => void;
    updateReviewStatus: (id: string, status: "approved" | "rejected") => void;
    deleteReview: (id: string) => void;

    // Settings
    settings: SiteSettings;
    updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;

    // User Balance (Mock)
    userBalance: number;
    addToBalance: (amount: number) => void;
    deductFromBalance: (amount: number) => void;

    // Auth
    user: { name: string; email: string; phone: string } | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (userData: { name: string; email: string; phone: string; password?: string }) => void;
    logout: () => void;
    isLoggedIn: boolean;

    // Email
    sendEmail: (options: { to: string; subject: string; text?: string; html?: string }) => Promise<void>;

    // System State
    isLoaded: boolean;
}

const defaultLightTheme: ThemeConfig = {
    background: "#ffffff",
    foreground: "#000000",
    card: "#f9fafb",
    primary: "#ed1c24",
    secondary: "#10b981",
    accent: "#3b82f6",
    muted: "#6b7280",
    border: "rgba(0,0,0,0.05)"
};

const defaultDarkTheme: ThemeConfig = {
    background: "#0a0f0d",
    foreground: "#ffffff",
    card: "#070d0b",
    primary: "#ed1c24",
    secondary: "#10b981",
    accent: "#3b82f6",
    muted: "#9ca3af",
    border: "rgba(255,255,255,0.05)"
};

const defaultSettings: SiteSettings = {
    homepageTitle: "KodFinans | Dijital Cüzdan & Oyun Mağazası",
    homepageDescription: "Dijital kodlarınızı güvenle nakite çevirin, oyun ürünlerini en uygun fiyatlarla satın alın.",
    heroHeadline: "Dijital Cüzdanın,",
    heroSubheadline: "Oyun Mağazan.",
    whatsappNumber: "+905517139330",
    seoKeywords: "kod bozum, razer gold, epin, gift card, oyun mağazası, dijital cüzdan",
    smtpHost: "smtp.yandex.com",
    smtpPort: "465",
    smtpUser: "",
    smtpPass: "",
    smtpFrom: "bilgi@kodfinans.com",
    paytrMerchantId: "",
    paytrMerchantKey: "",
    paytrMerchantSalt: "",
    paytrTestMode: true,
    themeColor: "green",
    siteMode: "white",
    activeTheme: "special",
    lightThemeConfig: defaultLightTheme,
    darkThemeConfig: defaultDarkTheme,
    headerLogo: "",
    footerLogo: "",
    adminLogo: "",
    // Header / Navbar defaults
    topBannerEnabled: true,
    topBannerText1: "7/24 Aktif",
    topBannerText2: "SSL Korumalı İşlemler",
    topBannerText3: "Anında Teslimat & Ödeme",
    navCtaText: "Kod Bozdur",
    heroImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200",
    // Footer defaults
    footerDescription: "Dijital kodlarınızı güvenle nakite çevirin, oyun ürünlerini en uygun fiyatlarla satın alın.",
    copyrightText: "KodFinans. Tüm Hakları Saklıdır.",
    footerEmail: "destek@kodfinans.com",
    footerPhone: "+905517139330",
    footerAddress: "Maslak, İstanbul / TR",
    // Social Media defaults
    socialFacebook: "",
    socialTwitter: "",
    socialInstagram: "",
    socialYoutube: "",
    socialTelegram: "",
    // IBAN defaults
    ibanInfo: "",
    ibanHolder: "",
    bankName: "",
    // CTA Promo Banner defaults
    ctaBannerEnabled: true,
    ctaBannerTitle: "Razer Gold Bozdurma",
    ctaBannerDescription: "Razer Gold, Steam, iTunes ve tüm dijital kodlarınızı en yüksek oranlarla bozdurun! Hemen WhatsApp'tan iletişime geçin.",
    ctaBannerButtonText: "WhatsApp ile İletişime Geç",
    ctaBannerWhatsappMessage: "Merhaba, Razer Gold bozdurma hakkında bilgi almak istiyorum.",
};

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const SystemProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [bozumRequests, setBozumRequests] = useState<BozumRequest[]>([]);
    const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
    const [userBalance, setUserBalance] = useState(1250.75);
    const [user, setUser] = useState<{ name: string; email: string; phone: string } | null>(null);

    const [users, setUsers] = useState<SystemUser[]>([]);

    const [isLoaded, setIsLoaded] = useState(false);
    const hasLoaded = useRef(false);

    // --- Load Data ---
    useEffect(() => {
        if (typeof window !== "undefined" && !hasLoaded.current) {
            hasLoaded.current = true;
            const loadData = async () => {
                // 1. Initialize from LocalStorage IMMEDIATELY for zero-flicker
                const savedReviews = localStorage.getItem("kf_reviews");
                const savedSettings = localStorage.getItem("kf_settings");
                const savedUsers = localStorage.getItem("kf_users");
                const savedBalance = localStorage.getItem("userBalance");
                const savedUser = localStorage.getItem("userProfile");

                if (savedSettings) {
                    try {
                        const parsed = JSON.parse(savedSettings);
                        setSettings(prev => ({ ...prev, ...parsed }));
                    } catch (e) { }
                }

                if (savedReviews) {
                    try {
                        setReviews(JSON.parse(savedReviews).map((rv: any) => ({ ...rv, timestamp: new Date(rv.timestamp) })));
                    } catch (e) { }
                }

                if (savedUsers) {
                    try {
                        setUsers(JSON.parse(savedUsers));
                    } catch (e) { }
                }

                if (savedBalance) setUserBalance(parseFloat(savedBalance));
                if (savedUser) {
                    try {
                        setUser(JSON.parse(savedUser));
                    } catch (e) { }
                }

                // 2. Load Fresh Firestore Data in the background
                try {
                    // Users request
                    const dbUsers = await getUsersFromFirestore();
                    if (dbUsers && dbUsers.length > 0) setUsers(dbUsers);

                    // Products request
                    const dbProducts = await getProducts();
                    if (dbProducts && dbProducts.length > 0) setProducts(dbProducts);

                    // Withdrawals request
                    const dbWithdrawals = await getWithdrawalsFromFirestore();
                    if (dbWithdrawals) setWithdrawalRequests(dbWithdrawals);

                    // Orders request
                    const dbOrders = await getOrdersFromFirestore();
                    if (dbOrders) setOrders(dbOrders);

                    // Bozum Requests
                    const dbBozum = await getBozumRequestsFromFirestore();
                    if (dbBozum) setBozumRequests(dbBozum);

                    // Blogs request
                    const dbBlogs = await getBlogs();
                    if (dbBlogs && dbBlogs.length > 0) setBlogs(dbBlogs);

                    // Settings request
                    const dbSettings = await getSettings();
                    if (dbSettings) {
                        setSettings(dbSettings);
                        localStorage.setItem("kf_settings", JSON.stringify(dbSettings));
                    }

                    // Sync current logged in user balance if they exist in dbUsers
                    if (savedUser) {
                        const current = JSON.parse(savedUser);
                        const freshUser = dbUsers.find(u => u.email === current.email);
                        if (freshUser) {
                            setUserBalance(freshUser.balance);
                            localStorage.setItem("userBalance", freshUser.balance.toString());
                        }
                    }

                } catch (error) {
                    console.error("SystemContext: Error loading Firestore data:", error);
                }

                setIsLoaded(true);
            };

            loadData();
        }
    }, []);


    // Persistence Hooks
    useEffect(() => {
        if (isLoaded) localStorage.setItem("kf_reviews", JSON.stringify(reviews));
    }, [reviews, isLoaded]);

    useEffect(() => {
        if (isLoaded) localStorage.setItem("kf_users", JSON.stringify(users));
    }, [users, isLoaded]);

    useEffect(() => {
        if (isLoaded) localStorage.setItem("userBalance", userBalance.toString());
    }, [userBalance, isLoaded]);

    useEffect(() => {
        if (isLoaded) localStorage.setItem("kf_settings", JSON.stringify(settings));
    }, [settings, isLoaded]);

    useEffect(() => {
        if (!isLoaded) return;
        if (user) localStorage.setItem("userProfile", JSON.stringify(user));
        else localStorage.removeItem("userProfile");
    }, [user, isLoaded]);

    // Product Handlers (Firestore)
    const addProduct = async (product: Omit<Product, "id">) => {
        try {
            const id = await addProductToFirestore(product);
            const newProduct = { ...product, id };
            setProducts(prev => [...prev, newProduct]);
        } catch (error) {
            console.error("Failed to add product", error);
        }
    };

    const updateProduct = async (id: string | number, updates: Partial<Product>) => {
        try {
            await updateProductInFirestore(id, updates);
            setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
        } catch (error) {
            console.error("Failed to update product", error);
        }
    };

    const deleteProduct = async (id: string | number) => {
        try {
            await deleteProductFromFirestore(id);
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error("Failed to delete product", error);
        }
    };

    // Blog Handlers
    const addBlog = async (blog: Omit<BlogPost, "id">) => {
        try {
            const id = await addBlogToFirestore(blog);
            const newBlog: BlogPost = { ...blog, id };
            setBlogs(prev => [newBlog, ...prev]);
        } catch (error) {
            console.error("Failed to add blog", error);
        }
    };

    const updateBlog = async (id: string, updates: Partial<BlogPost>) => {
        try {
            await updateBlogInFirestore(id, updates);
            setBlogs(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
        } catch (error) {
            console.error("Failed to update blog", error);
        }
    };

    const deleteBlog = async (id: string) => {
        try {
            await deleteBlogFromFirestore(id);
            setBlogs(prev => prev.filter(b => b.id !== id));
        } catch (error) {
            console.error("Failed to delete blog", error);
        }
    };

    // Order Handlers (Firestore)
    const addOrder = async (order: Omit<Order, "id" | "status" | "timestamp">) => {
        const tempOrder = {
            ...order,
            status: "pending" as const,
            timestamp: new Date()
        };
        try {
            const id = await addOrderToFirestore(tempOrder);
            const newOrder = {
                ...tempOrder,
                id,
                timestamp: new Date()
            };
            setOrders(prev => [newOrder, ...prev]);
        } catch (error) {
            console.error("Failed to create order", error);
            throw error;
        }
    };

    const updateOrderStatus = async (id: string, status: "pending" | "completed" | "cancelled", code?: string) => {
        try {
            const updates: Partial<Order> = { status };
            if (code) updates.digitalCode = code;

            await updateOrderInFirestore(id, updates);
            setOrders(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
        } catch (error) {
            console.error("Failed to update order status", error);
        }
    };

    const deleteOrder = async (id: string) => {
        try {
            await deleteOrderFromFirestore(id);
            setOrders(prev => prev.filter(o => o.id !== id));
        } catch (error) {
            console.error("Failed to delete order", error);
        }
    };

    // Bozum Handlers (Firestore)
    const addBozumRequest = async (request: Omit<BozumRequest, "id" | "status" | "timestamp">) => {
        const newRequestData = {
            ...request,
            status: "pending" as const,
            timestamp: new Date()
        };
        try {
            const id = await addBozumRequestToFirestore(newRequestData);
            const newRequest = { ...newRequestData, id };
            setBozumRequests(prev => [newRequest, ...prev]);
        } catch (error) {
            console.error("Failed to add bozum request", error);
            throw error;
        }
    };

    const updateBozumStatus = async (id: string, status: "approved" | "rejected") => {
        try {
            await updateBozumRequestInFirestore(id, { status });
            const req = bozumRequests.find(r => r.id === id);

            if (req && status === "approved" && req.status !== "approved") {
                addToBalance(req.calculatedAmount);
            }

            setBozumRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
        } catch (error) {
            console.error("Failed to update bozum status", error);
        }
    };

    const deleteBozumRequest = async (id: string) => {
        try {
            await deleteBozumRequestFromFirestore(id);
            setBozumRequests(prev => prev.filter(r => r.id !== id));
        } catch (error) {
            console.error("Failed to delete bozum request", error);
        }
    };

    // Withdrawal Handlers (Firestore)
    const addWithdrawalRequest = async (request: Omit<WithdrawalRequest, "id" | "status" | "timestamp">) => {
        const newRequestData = {
            ...request,
            status: "pending" as const,
            timestamp: new Date()
        };
        try {
            const id = await addWithdrawalToFirestore(newRequestData);
            const newRequest = { ...newRequestData, id };
            setWithdrawalRequests(prev => [newRequest, ...prev]);
            deductFromBalance(newRequest.amount);
        } catch (error) {
            console.error("Failed to add withdrawal", error);
        }
    };

    const updateWithdrawalStatus = async (id: string, status: "approved" | "rejected") => {
        try {
            await updateWithdrawalinFirestore(id, status);
            const req = withdrawalRequests.find(r => r.id === id);
            if (req && status === "rejected" && req.status === "pending") {
                addToBalance(req.amount);
            }
            setWithdrawalRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
        } catch (error) {
            console.error("Failed to update withdrawal status", error);
        }
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

    const updateSettings = async (newSettings: Partial<SiteSettings>) => {
        const updated = { ...settings, ...newSettings };
        setSettings(updated);
        try {
            await updateSettingsInFirestore(updated);
            // Dispatch update event for ThemeApplier
            if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("kf_theme_update"));
            }
        } catch (error) {
            console.error("Failed to save settings to Firestore", error);
        }
    };

    const updateUser = (id: string, updates: Partial<SystemUser>) => {
        setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
    };

    const updateUserBalance = async (id: string, amount: number, action: "add" | "set") => {
        const userToUpdate = users.find(u => u.id === id);
        if (!userToUpdate) return;

        const newBalance = action === "add" ? userToUpdate.balance + amount : amount;
        const safeBalance = Math.max(0, newBalance);

        // Optimistic update
        setUsers(prev => prev.map(u => {
            if (u.id === id) {
                return { ...u, balance: safeBalance };
            }
            return u;
        }));

        // Firestore update
        try {
            await updateUserInFirestore(id, { balance: safeBalance });

            // If the updated user is the currently logged in user, update the session balance too
            if (user && user.email === userToUpdate.email) {
                setUserBalance(safeBalance);
            }
        } catch (error) {
            console.error("Failed to update user balance in Firestore", error);
            // Revert on error? For now just log
        }
    };

    const deleteUser = (id: string) => {
        setUsers(prev => prev.filter(u => u.id !== id));
    };

    const login = async (email: string, password: string) => {
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            const sessionUser = { name: foundUser.name, email: foundUser.email, phone: foundUser.phone };
            setUser(sessionUser);
            setUserBalance(foundUser.balance);
            localStorage.setItem("userProfile", JSON.stringify(sessionUser));
            return true;
        }
        return false;
    };

    const register = async (userData: { name: string; email: string; phone: string; password?: string }) => {
        const newUser: Omit<SystemUser, "id"> = {
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            password: userData.password || "password123",
            balance: 0,
            role: "user",
            createdAt: new Date()
        };

        try {
            const id = await addUserToFirestore(newUser);
            const userWithId = { ...newUser, id };

            setUsers(prev => [...prev, userWithId]);

            // Auto login
            const sessionUser = { name: newUser.name, email: newUser.email, phone: newUser.phone };
            setUser(sessionUser);
            setUserBalance(0);
            localStorage.setItem("userProfile", JSON.stringify(sessionUser));
        } catch (error) {
            console.error("Failed to register user", error);
        }
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
            deleteOrder,

            bozumRequests,
            addBozumRequest,
            updateBozumStatus,
            deleteBozumRequest,

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
            sendEmail,
            isLoaded
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
