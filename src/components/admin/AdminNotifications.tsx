"use client";

import { useEffect, useState, useRef } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Bell, ShoppingCart, Zap, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const timeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return "az önce";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} dk önce`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} saat önce`;
    const days = Math.floor(hours / 24);
    return `${days} gün önce`;
};

const playNotificationSound = () => {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
        console.error("Audio error", e);
    }
};

export function AdminNotifications() {
    const router = useRouter();
    const [unreadCount, setUnreadCount] = useState(0);
    const [hasNew, setHasNew] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Store actual items
    const [orders, setOrders] = useState<any[]>([]);
    const [bozums, setBozums] = useState<any[]>([]);

    const isInitialRender = useRef(true);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const ordersRef = collection(db, "orders");
        const ordersQuery = query(ordersRef, where("status", "==", "pending"));

        const bozumRef = collection(db, "bozum_requests");
        const bozumQuery = query(bozumRef, where("status", "==", "pending"));

        const unsubOrders = onSnapshot(ordersQuery, (snap) => {
            const items = snap.docs.map(doc => ({
                id: doc.id,
                type: 'order',
                title: 'Yeni Sipariş',
                user: doc.data().userEmail || 'Bilinmeyen Kullanıcı',
                amount: doc.data().amount || 0,
                timestamp: doc.data().timestamp?.toMillis() || Date.now()
            }));

            setOrders(items);
        });

        const unsubBozum = onSnapshot(bozumQuery, (snap) => {
            const items = snap.docs.map(doc => ({
                id: doc.id,
                type: 'bozum',
                title: 'Yeni Bozum Talebi',
                user: doc.data().userEmail || 'Bilinmeyen Kullanıcı',
                amount: doc.data().calculatedAmount || 0,
                timestamp: doc.data().timestamp?.toMillis() || Date.now()
            }));

            setBozums(items);
        });

        return () => {
            unsubOrders();
            unsubBozum();
        };
    }, []);

    useEffect(() => {
        const total = orders.length + bozums.length;

        if (!isInitialRender.current && total > unreadCount) {
            setHasNew(true);
            playNotificationSound();
            setTimeout(() => setHasNew(false), 3000);
        }

        setUnreadCount(total);

        if (isInitialRender.current) {
            setTimeout(() => { isInitialRender.current = false; }, 1000);
        }
    }, [orders.length, bozums.length]);

    // Combine and sort
    const allNotifications = [...orders, ...bozums].sort((a, b) => b.timestamp - a.timestamp);

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group flex items-center justify-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Bell size={20} className={cn(
                    "text-white/70 group-hover:text-white transition-all",
                    hasNew && "animate-bounce text-primary"
                )} />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 w-4 h-4 rounded-full bg-primary text-[10px] font-bold text-white flex items-center justify-center shadow-lg shadow-primary/20">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-80 bg-background/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 origin-top-right"
                    >
                        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                Bildirim Merkezi
                                {unreadCount > 0 && (
                                    <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-black tracking-wider">
                                        {unreadCount} YENİ
                                    </span>
                                )}
                            </h3>
                        </div>

                        <div className="max-h-[350px] overflow-y-auto no-scrollbar p-2">
                            {allNotifications.length === 0 ? (
                                <div className="p-8 text-center flex flex-col items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 text-white/20">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <p className="text-sm font-medium text-white/50">Harika! Bekleyen işlem yok.</p>
                                    <p className="text-xs text-white/30 mt-1">Tüm işler tıkırında gidiyor.</p>
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    {allNotifications.map((notif) => (
                                        <div
                                            key={notif.id}
                                            onClick={() => {
                                                setIsOpen(false);
                                                router.push(notif.type === 'order' ? "/admin/siparisler" : "/admin/bozumlar");
                                            }}
                                            className="p-3 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer group flex items-start gap-3 border border-transparent hover:border-white/5"
                                        >
                                            <div className={cn(
                                                "mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                                notif.type === 'order' ? "bg-blue-500/10 text-blue-400" : "bg-primary/10 text-primary"
                                            )}>
                                                {notif.type === 'order' ? <ShoppingCart size={14} /> : <Zap size={14} />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-0.5">
                                                    <p className="text-xs font-bold text-white truncate">{notif.title}</p>
                                                    <span className="text-[9px] font-medium text-white/30 whitespace-nowrap ml-2">
                                                        {timeAgo(notif.timestamp)}
                                                    </span>
                                                </div>
                                                <p className="text-[10px] text-white/50 truncate font-medium">
                                                    Kullanıcı: <span className="text-white/70">{notif.user}</span>
                                                </p>
                                                <p className="text-[10px] text-white/50 mt-1">
                                                    Tutar: <span className="font-bold text-white/90">{notif.amount}</span>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {allNotifications.length > 0 && (
                            <div className="p-2 border-t border-white/5 bg-white/[0.01]">
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        router.push("/admin/siparisler"); // Example generic path
                                    }}
                                    className="w-full py-2 rounded-xl text-xs font-semibold text-white/60 hover:text-white hover:bg-white/[0.05] transition-colors"
                                >
                                    Tümünü İncele
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
