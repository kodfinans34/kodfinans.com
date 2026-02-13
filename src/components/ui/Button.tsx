"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "accent" | "destructive"; // Added destructive for future use maybe? No, let's stick to what's there but `icon`
    size?: "sm" | "md" | "lg" | "icon";
    children: React.ReactNode;
}

export const Button = ({
    variant = "primary",
    size = "md",
    className,
    children,
    ...props
}: ButtonProps) => {
    const variants = {
        primary: "bg-gradient-to-r from-primary to-secondary text-white glow-primary hover:scale-[1.02]",
        secondary: "bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10",
        outline: "border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary",
        ghost: "text-white/70 hover:text-white hover:bg-white/5",
        accent: "bg-accent text-white glow-accent hover:scale-[1.02]",
        destructive: "bg-red-500 text-white hover:bg-red-600",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 font-semibold",
        lg: "px-8 py-4 text-lg font-bold",
        icon: "p-2 aspect-square flex items-center justify-center",
    };

    return (
        <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
};
