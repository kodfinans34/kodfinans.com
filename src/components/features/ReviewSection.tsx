"use client";

import React, { useState } from "react";
import { useSystem, Review } from "@/context/SystemContext";
import { User, Star, MessageSquare, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ReviewSectionProps {
    productId: number;
}

export default function ReviewSection({ productId }: ReviewSectionProps) {
    const { reviews, addReview, user } = useSystem();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [submitted, setSubmitted] = useState(false);

    const productReviews = reviews.filter(r => r.productId === productId && r.status === "approved");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment || !name || !email) return;

        addReview({
            productId,
            userName: name,
            userEmail: email,
            comment,
            rating
        });

        setSubmitted(true);
        setComment("");
    };

    return (
        <div className="space-y-12">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                        <MessageSquare className="text-primary" />
                        Yorumlar ({productReviews.length})
                    </h2>
                    <p className="text-white/40 text-sm font-medium mt-1">Bu ürün için yapılmış müşteri yorumları.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Review List */}
                <div className="space-y-6">
                    {productReviews.length === 0 ? (
                        <div className="p-12 text-center glass rounded-3xl border-dashed border-white/5">
                            <MessageSquare size={48} className="text-white/10 mx-auto mb-4" />
                            <p className="text-white/20 font-bold uppercase tracking-widest text-xs">Henüz yorum yapılmamış</p>
                            <p className="text-white/10 text-[10px] mt-1 italic">İlk yorumu sen yaparak diğer kullanıcılara yardımcı olabilirsin.</p>
                        </div>
                    ) : (
                        productReviews.map((review) => (
                            <div key={review.id} className="glass p-6 rounded-3xl border-white/5 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-sm tracking-tight">{review.userName}</h4>
                                            <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">
                                                {new Date(review.timestamp).toLocaleDateString("tr-TR")}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={12}
                                                className={cn(
                                                    i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-white/10"
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-white/60 text-sm leading-relaxed font-medium">
                                    {review.comment}
                                </p>
                            </div>
                        ))
                    )}
                </div>

                {/* New Review Form */}
                <div className="relative">
                    <div className="sticky top-24">
                        <div className="glass p-8 rounded-[2.5rem] border-white/10 overflow-hidden relative">
                            {/* Decor */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />

                            {submitted ? (
                                <div className="text-center py-12 space-y-6">
                                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mx-auto animate-bounce">
                                        <CheckCircle size={40} />
                                    </div>
                                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Tebrikler!</h3>
                                    <p className="text-white/40 text-sm font-medium leading-relaxed">
                                        Yorumunuz başarıyla alındı. Yönetici onayından sonra yayına alınacaktır.
                                    </p>
                                    <Button
                                        onClick={() => setSubmitted(false)}
                                        className="bg-white/5 hover:bg-white/10 text-white border border-white/10 py-4 px-8 rounded-xl font-black uppercase text-[10px] tracking-widest"
                                    >
                                        Yeni Yorum Yap
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2">Yorum Bırak</h3>
                                        <p className="text-white/40 text-[11px] font-medium italic">Deneyimlerini saniyeler içinde paylaşabilirsin.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex gap-2">
                                            {[...Array(5)].map((_, i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    onClick={() => setRating(i + 1)}
                                                    className="p-1 transition-transform hover:scale-125"
                                                >
                                                    <Star
                                                        size={24}
                                                        className={cn(
                                                            i < rating ? "text-yellow-500 fill-yellow-500" : "text-white/10"
                                                        )}
                                                    />
                                                </button>
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2 block">İsim Soyisim</label>
                                                <input
                                                    type="text"
                                                    placeholder="Adınız..."
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-all font-medium"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2 block">E-Posta</label>
                                                <input
                                                    type="email"
                                                    placeholder="E-Posta adresiniz..."
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-all font-medium"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2 block">Yorumunuz</label>
                                            <textarea
                                                rows={4}
                                                placeholder="Bu ürün hakkındaki düşüncelerin..."
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-all font-medium resize-none"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full py-5 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-black text-[11px] uppercase tracking-[0.3em] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group"
                                    >
                                        GÖNDER <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
