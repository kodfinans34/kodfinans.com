"use client";

import React, { useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { X, Trash2, ShoppingCart, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";

export const CartDrawer = () => {
    const { cart, isOpen, toggleCart, removeFromCart, addToCart, total } = useCart();
    const router = useRouter();


    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                toggleCart();
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, toggleCart]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[150]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-card border-l border-white/5 z-[160] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <ShoppingCart size={20} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-black text-foreground uppercase tracking-tight">Sepetim</h2>
                                    <p className="text-xs text-foreground/40 font-bold uppercase tracking-widest">{cart.length} Ürün</p>
                                </div>
                            </div>
                            <button
                                onClick={toggleCart}
                                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-white/20">
                                        <ShoppingCart size={40} />
                                    </div>
                                    <p className="text-white/40 font-bold">Sepetiniz boş.</p>
                                    <Button onClick={toggleCart} variant="secondary" className="px-8 bg-white/5 text-xs">Alışverişe Başla</Button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={`${item.id}-${item.variant}`} className="group flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-colors relative overflow-hidden">

                                        {/* Image */}
                                        <div className="w-20 h-24 rounded-xl overflow-hidden bg-black/20 shrink-0 relative">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h4 className="text-white font-black text-sm uppercase tracking-tight line-clamp-1">{item.name}</h4>
                                                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">{item.variant}</p>
                                                <p className="text-white/60 text-xs">₺{item.price.toFixed(2)}</p>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center gap-3 bg-foreground/5 rounded-lg p-1">
                                                    <button
                                                        onClick={() => item.quantity > 1 ? addToCart({ ...item, quantity: -1 }) : removeFromCart(item.id, item.variant)}
                                                        className="w-6 h-6 rounded bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center text-foreground transition-colors"
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="text-xs font-bold text-foreground w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => addToCart({ ...item, quantity: 1 })}
                                                        className="w-6 h-6 rounded bg-primary/20 hover:bg-primary/40 text-primary flex items-center justify-center transition-colors"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                                <p className="text-white font-black text-sm">₺{(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id, item.variant)}
                                            className="absolute top-2 right-2 p-2 text-white/20 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Sticky Footer - Live Total */}
                        {cart.length > 0 && (
                            <div className="border-t border-white/5 bg-background/95 backdrop-blur-xl">
                                {/* Item Summary */}
                                <div className="px-6 pt-5 pb-3 space-y-2">
                                    {cart.map((item) => (
                                        <div key={`${item.id}-${item.variant}-summary`} className="flex justify-between items-center text-xs">
                                            <span className="text-white/40 truncate max-w-[200px]">
                                                {item.name} <span className="text-white/20">x{item.quantity}</span>
                                            </span>
                                            <span className="text-white/50 font-mono">₺{(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                    <div className="border-t border-white/5 my-1" />
                                </div>

                                {/* Total */}
                                <div className="px-6 pb-3">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] text-foreground/30 font-bold uppercase tracking-widest">Toplam Tutar</p>
                                            <p className="text-xs text-foreground/40 mt-0.5">{cart.reduce((s, i) => s + i.quantity, 0)} ürün</p>
                                        </div>
                                        <motion.div
                                            key={total}
                                            initial={{ scale: 1.15, color: "rgb(16, 185, 129)" }}
                                            animate={{ scale: 1, color: "var(--foreground)" }}
                                            transition={{ duration: 0.4 }}
                                            className="text-3xl font-black tracking-tight text-foreground"
                                        >
                                            ₺{total.toFixed(2)}
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <div className="px-6 pb-6">
                                    <Button
                                        onClick={() => {
                                            toggleCart();
                                            // Provide redirect path or just let it be handled later
                                            router.push("/odeme");
                                        }}
                                        className="w-full py-4 rounded-2xl text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                    >
                                        Ödemeye Geç →
                                    </Button>
                                    <div className="flex items-center justify-center gap-2 mt-3 opacity-40">
                                        <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                                        <span className="text-[10px] text-white font-medium">SSL Güvenli Ödeme</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
