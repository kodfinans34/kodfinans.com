"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
    id: string | number;
    name: string;
    variant?: string;
    price: number;
    quantity: number;
    image: string;
    email?: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string | number, variant?: string) => void;
    clearCart: () => void;
    total: number;
    isOpen: boolean;
    toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Initial load from local storage
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save to local storage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === item.id && i.variant === item.variant);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id && i.variant === item.variant
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            }
            return [...prev, item];
        });
        setIsOpen(true);
    };

    const removeFromCart = (id: number | string, variant?: string) => {
        setCart((prev) => prev.filter((item) => !(item.id === id && item.variant === variant)));
    };

    const clearCart = () => {
        setCart([]);
    };

    const toggleCart = () => {
        setIsOpen(!isOpen);
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total, isOpen, toggleCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
