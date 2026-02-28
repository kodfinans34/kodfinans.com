"use client";

import { useEffect, useState, useRef } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

// A gentle short notification "ding" sound in base64
const NOTIFICATION_SOUND = "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU5LjI3LjEwMAAAAAAAAAAAAAAA//OUAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAOAAAOUQBPQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/P//OUAAxAAAAANtUAAA4oGABAA21QAADwIYAAL+QEAIAgEGAIJAwBgsEgSDYHg2B4QhEMgmCwWBIBgsEgSDYHg2B4QhEMgmCwWBIBg//OUAA9AEAAINtUAAAxEGAAAg21QAADwIYAAQGAYEwSDIHAmCYJBMDwXBMEwXBIFAcCYLAsCgJBMFwcBQFAcCYLAsCgJBMFwcBQFA//OUABCAMAAINtUAAAc2GAAAg21QAADwIYAAIHAWBgFAYBQGAYBgDAYFAwFwcBIFAMBQHA0CgOAcBIEAcBQHA0CgOAcBIEAcBQHA0C//OUABEAYAAINtUAAAZGGAAAg21QAADwIYAAMAgCAHAYBAHAYBAEgGAgCgKAoCQSAcCgJAoBgDAYBAFAYBQGAYBAFAYBQGAYBAFAYB//OUABHAMAAINtUAAAJCGAAAg21QAADwIYAACADAYAwFAMBQFgUBQFgKA4BwIA4CwKAMBgFAYAwEAMBACAEAUBQDAYAwEAMBACAEAUB//OUABJAEAAINtUAAAAiGAAAg21QAADwIYAAL//+w==";
// The actual length of a real sound Base64 would be long. Since we don't have a file, and base64 strings can be large, I'll use a very short valid AudioContext beep or the user can put a file in public/sounds.
// Let's use AudioContext for a perfectly safe & self-contained minimal sound.

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
    const [unreadCount, setUnreadCount] = useState(0);
    const [hasNew, setHasNew] = useState(false);
    const isInitialRender = useRef(true);

    useEffect(() => {
        // We only care about statuses that are "pending"
        const ordersRef = collection(db, "orders");
        const ordersQuery = query(ordersRef, where("status", "==", "pending"));

        const bozumRef = collection(db, "bozum_requests");
        const bozumQuery = query(bozumRef, where("status", "==", "pending"));

        let ordersCount = 0;
        let bozumCount = 0;

        const handleChanges = () => {
            const total = ordersCount + bozumCount;
            setUnreadCount(total);

            // If it's not the initial mount and the total went up, it means there's a new document!
            if (!isInitialRender.current && total > unreadCount) {
                setHasNew(true);
                playNotificationSound();
                setTimeout(() => setHasNew(false), 3000); // Highlight icon briefly
            }
            if (isInitialRender.current) {
                // Wait a tiny bit to mark initial render done, to avoid dinging on page load.
                setTimeout(() => { isInitialRender.current = false; }, 1000);
            }
        };

        const unsubOrders = onSnapshot(ordersQuery, (snap) => {
            ordersCount = snap.docs.length;
            handleChanges();
        });

        const unsubBozum = onSnapshot(bozumQuery, (snap) => {
            bozumCount = snap.docs.length;
            handleChanges();
        });

        return () => {
            unsubOrders();
            unsubBozum();
        };
    }, [unreadCount]);

    return (
        <div className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group flex items-center justify-center">
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
    );
}
