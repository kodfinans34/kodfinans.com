"use client";

import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

export const LiveSupport = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="hidden md:flex fixed bottom-6 right-6 z-[140] flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="bg-card border border-white/10 rounded-2xl w-80 shadow-2xl overflow-hidden mb-2"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <MessageCircle className="text-white" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">Canlı Destek</h3>
                                    <p className="text-[10px] text-white/80 font-medium">Genellikle 5dk içinde yanıtlar</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-4 bg-card">
                            <div className="bg-foreground/5 p-3 rounded-xl rounded-tl-none border border-foreground/5">
                                <p className="text-xs text-foreground/80 leading-relaxed">
                                    Merhaba! 👋 <br />
                                    Size nasıl yardımcı olabilirim? İşlemleriniz hakkında bilgi almak için WhatsApp hattımıza bağlanabilirsiniz.
                                </p>
                            </div>

                            <Button
                                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#25D366]/20"
                                onClick={() => window.open('https://wa.me/905517139330', '_blank')}
                            >
                                <MessageCircle size={16} />
                                WhatsApp ile Bağlan
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-white text-black rotate-90' : 'bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white'}`}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={28} />}

                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background"></span>
                )}
            </motion.button>
        </div>
    );
};
