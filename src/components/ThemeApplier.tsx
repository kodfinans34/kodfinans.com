"use client";

import { useEffect } from "react";
import { useSystem } from "@/context/SystemContext";
import { ThemeConfig } from "@/lib/types";

const COLOR_MAP: Record<string, { primary: string; secondary: string; accent: string }> = {
    green: { primary: "#10b981", secondary: "#059669", accent: "#34d399" },
    indigo: { primary: "#6366f1", secondary: "#8b5cf6", accent: "#a78bfa" },
    red: { primary: "#ef4444", secondary: "#dc2626", accent: "#f87171" },
    blue: { primary: "#3b82f6", secondary: "#2563eb", accent: "#60a5fa" },
    orange: { primary: "#f59e0b", secondary: "#d97706", accent: "#fbbf24" },
};

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

function applyFullTheme(settings: any) {
    if (typeof window === "undefined") return;

    const body = document.body;
    const siteMode = localStorage.getItem("kf_site_mode") || "dark";
    const { activeTheme, themeColor, lightThemeConfig, darkThemeConfig } = settings;

    console.log(`[ThemeApplier] 🎨 Applying: ${activeTheme} theme (${themeColor}) in ${siteMode} mode.`);

    // 1) Clear classes
    const allPossibleClasses = [
        "theme-green", "theme-indigo", "theme-red", "theme-blue", "theme-orange",
        "theme-white", "theme-black"
    ];
    body.classList.remove(...allPossibleClasses);

    // 2) Reset styles
    const vars = [
        "--background", "--foreground", "--card",
        "--primary", "--secondary", "--accent", "--muted", "--border",
        "--primary-glow", "--secondary-glow", "--accent-glow",
        "--primary-rgb", "--secondary-rgb", "--accent-rgb"
    ];
    vars.forEach(v => body.style.removeProperty(v));

    // 3) Apply mode class
    if (siteMode === "dark") {
        body.classList.add("theme-black");
    } else {
        body.classList.add("theme-white");
    }

    // 4) Apply Theme Colors
    if (activeTheme === "special") {
        const config: ThemeConfig = siteMode === "dark" ? darkThemeConfig : lightThemeConfig;
        if (config) {
            Object.entries(config).forEach(([key, value]) => {
                const varName = `--${key}`;
                body.style.setProperty(varName, value as string);

                // Add RGB and Glow for primary, secondary, accent
                if (["primary", "secondary", "accent"].includes(key)) {
                    body.style.setProperty(`${varName}-rgb`, hexToRgb(value as string));
                    body.style.setProperty(`${varName}-glow`, hexToGlow(value as string, siteMode === "white" ? 0.15 : 0.3));
                }
            });
        }
    } else {
        // Standard theme
        const color = themeColor || "green";
        body.classList.add(`theme-${color}`);

        const colors = COLOR_MAP[color] || COLOR_MAP.green;
        body.style.setProperty("--primary", colors.primary);
        body.style.setProperty("--secondary", colors.secondary);
        body.style.setProperty("--accent", colors.accent);

        body.style.setProperty("--primary-rgb", hexToRgb(colors.primary));
        body.style.setProperty("--secondary-rgb", hexToRgb(colors.secondary));
        body.style.setProperty("--accent-rgb", hexToRgb(colors.accent));

        body.style.setProperty("--primary-glow", hexToGlow(colors.primary, siteMode === "white" ? 0.15 : 0.3));
        body.style.setProperty("--secondary-glow", hexToGlow(colors.secondary, siteMode === "white" ? 0.1 : 0.25));
        body.style.setProperty("--accent-glow", hexToGlow(colors.accent, siteMode === "white" ? 0.1 : 0.25));
    }
}

export { applyFullTheme };

export function ThemeApplier() {
    const { settings } = useSystem();

    useEffect(() => {
        applyFullTheme(settings);

        const handleUpdate = () => applyFullTheme(settings);

        window.addEventListener("storage", handleUpdate);
        window.addEventListener("kf_theme_update", handleUpdate);
        return () => {
            window.removeEventListener("storage", handleUpdate);
            window.removeEventListener("kf_theme_update", handleUpdate);
        };
    }, [settings]);

    return null;
}
