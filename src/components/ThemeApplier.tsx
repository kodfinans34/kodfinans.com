"use client";

import { useEffect } from "react";
import { useSystem } from "@/context/SystemContext";
import { ThemeConfig } from "@/lib/types";
import { usePathname } from "next/navigation";

function hexToRgb(hex: string): string {
    if (!hex || !hex.startsWith('#')) return "0, 0, 0";
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
}

function hexToGlow(hex: string, alpha: number): string {
    const rgb = hexToRgb(hex);
    return `rgba(${rgb}, ${alpha})`;
}

function applyFullTheme(settings: any, pathname: string = "") {
    if (typeof window === "undefined") return;

    const { lightThemeConfig, darkThemeConfig, siteMode: settingsMode } = settings;
    const body = document.body;

    // Force DARK mode for Admin Panel regardless of settings
    const isAdmin = pathname.startsWith("/admin");
    const siteMode = isAdmin ? "dark" : (settingsMode || "dark");

    console.log(`[ThemeApplier] 🎨 Applying theme in ${siteMode} mode. (Admin: ${isAdmin})`);

    // 1) Clear old theme classes
    body.classList.remove("theme-white", "theme-black");

    // 2) Reset ALL inline style properties
    const vars = [
        "--background", "--foreground", "--card",
        "--primary", "--secondary", "--accent", "--muted", "--border",
        "--primary-glow", "--secondary-glow", "--accent-glow",
        "--primary-rgb", "--secondary-rgb", "--accent-rgb"
    ];
    vars.forEach(v => body.style.removeProperty(v));
    body.style.removeProperty("background-color");
    body.style.removeProperty("color");

    // 3) Decide mode class + config
    const config: ThemeConfig = siteMode === "dark"
        ? (darkThemeConfig || { background: "#0a0f0d", foreground: "#ffffff", card: "#070d0b", primary: "#ed1c24", secondary: "#10b981", accent: "#3b82f6", muted: "#9ca3af", border: "rgba(255,255,255,0.05)" })
        : (lightThemeConfig || { background: "#ffffff", foreground: "#000000", card: "#f9fafb", primary: "#ed1c24", secondary: "#10b981", accent: "#3b82f6", muted: "#6b7280", border: "rgba(0,0,0,0.05)" });

    if (siteMode === "dark") {
        body.classList.add("theme-black");
    } else {
        body.classList.add("theme-white");
    }

    // 4) Apply ALL config colors as CSS variables AND directly to body
    if (config.background) {
        body.style.setProperty("--background", config.background);
        body.style.backgroundColor = config.background;
    }
    if (config.foreground) {
        body.style.setProperty("--foreground", config.foreground);
        body.style.color = config.foreground;
    }
    if (config.card) body.style.setProperty("--card", config.card);
    if (config.border) body.style.setProperty("--border", config.border);
    if (config.primary) {
        body.style.setProperty("--primary", config.primary);
        body.style.setProperty("--primary-rgb", hexToRgb(config.primary));
        body.style.setProperty("--primary-glow", hexToGlow(config.primary, siteMode === "white" ? 0.15 : 0.3));
    }
    if (config.secondary) {
        body.style.setProperty("--secondary", config.secondary);
        body.style.setProperty("--secondary-rgb", hexToRgb(config.secondary));
        body.style.setProperty("--secondary-glow", hexToGlow(config.secondary, siteMode === "white" ? 0.1 : 0.25));
    }
    if (config.accent) {
        body.style.setProperty("--accent", config.accent);
        body.style.setProperty("--accent-rgb", hexToRgb(config.accent));
        body.style.setProperty("--accent-glow", hexToGlow(config.accent, siteMode === "white" ? 0.1 : 0.25));
    }
    if (config.muted) body.style.setProperty("--muted", config.muted);
}

export { applyFullTheme };

export function ThemeApplier() {
    const { settings } = useSystem();
    const pathname = usePathname();

    useEffect(() => {
        applyFullTheme(settings, pathname);

        const handleUpdate = () => applyFullTheme(settings, pathname);

        window.addEventListener("storage", handleUpdate);
        window.addEventListener("kf_theme_update", handleUpdate);
        return () => {
            window.removeEventListener("storage", handleUpdate);
            window.removeEventListener("kf_theme_update", handleUpdate);
        };
    }, [settings, pathname]);

    return null;
}
