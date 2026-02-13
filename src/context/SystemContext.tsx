"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { products as initialProducts } from "@/lib/products";
import { blogs as staticBlogs } from "@/lib/blogs";
import {
    Product,
    Review,
    Order,
    BozumRequest,
    WithdrawalRequest,
    SiteSettings,
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
    addWithdrawalRequest: (request: Omit<WithdrawalRequest, "id" | "status" | "timestamp">) => Promise<void>;
    updateWithdrawalStatus: (id: string, status: "approved" | "rejected") => Promise<void>;

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

    // --- Load Data ---
    useEffect(() => {
        if (typeof window !== "undefined") {
            const loadData = async () => {
                // Initialize LocalStorage Data
                const savedBlogs = localStorage.getItem("kf_blogs");
                const savedOrders = localStorage.getItem("kf_orders");
                const savedBozum = localStorage.getItem("kf_bozum");
                const savedReviews = localStorage.getItem("kf_reviews");
                const savedSettings = localStorage.getItem("kf_settings");
                const savedUsers = localStorage.getItem("kf_users");
                const savedBalance = localStorage.getItem("userBalance");
                const savedUser = localStorage.getItem("userProfile");

                // Load Firestore Data (Products & Withdrawals)
                try {
                    const dbProducts = await getProducts();
                    // If DB is empty, use initial products but DON'T duplicate them.
                    // Actually, if DB is empty, we might want to seed it once?
                    // For now, let's mix them if DB is empty, or just rely on DB.
                    // If the user wants to see products, they must be in Firestore.
                    // If Firestore is empty, we show empty or fallback?
                    // Let's assume if dbProducts is empty, we fall back to static list but we don't save to DB automatically unless admin does so.
                    if (dbProducts.length > 0) {
                        setProducts(dbProducts);
                    } else {
                        // Fallback to static products if DB is empty (First run)
                        // Note: We need to cast IDs to string if they are numbers in static
                        const staticProds = initialProducts.map(p => ({
                            ...p,
                            id: p.id
                        })) as Product[];
                        setProducts(staticProds);
                    }

                    const dbWithdrawals = await getWithdrawalsFromFirestore();
                    setWithdrawalRequests(dbWithdrawals);

                } catch (error) {
                    console.error("Error loading Firestore data:", error);
                    setProducts(initialProducts as Product[]);
                }

                if (savedBlogs) setBlogs(JSON.parse(savedBlogs));
                else setBlogs(initialBlogs);

                if (savedOrders) setOrders(JSON.parse(savedOrders).map((o: any) => ({ ...o, timestamp: new Date(o.timestamp) })));
                if (savedBozum) setBozumRequests(JSON.parse(savedBozum).map((r: any) => ({ ...r, timestamp: new Date(r.timestamp) })));
                if (savedReviews) setReviews(JSON.parse(savedReviews).map((rv: any) => ({ ...rv, timestamp: new Date(rv.timestamp) })));
                if (savedSettings) setSettings(JSON.parse(savedSettings));
                if (savedUsers) setUsers(JSON.parse(savedUsers).map((u: any) => ({ ...u, createdAt: new Date(u.createdAt) })));
                if (savedBalance) setUserBalance(parseFloat(savedBalance));
                if (savedUser) setUser(JSON.parse(savedUser));

                setIsLoaded(true);
            };

            loadData();
        }
    }, []);

    // Persistence Hooks (Only for localStorage items)
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

    const updateBozumStatus = (id: string, status: "approved" | "rejected") => {
        const req = bozumRequests.find(r => r.id === id);
        if (req && status === "approved" && req.status !== "approved") {
            addToBalance(req.calculatedAmount);
        }
        setBozumRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
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


