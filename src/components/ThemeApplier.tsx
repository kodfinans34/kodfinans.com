"use client";

import { useEffect } from "react";
import { useSystem } from "@/context/SystemContext";

const COLOR_MAP: Record<string, { primary: string; secondary: string; accent: string }> = {
    green: { primary: "#10b981", secondary: "#059669", accent: "#34d399" },
    indigo: { primary: "#6366f1", secondary: "#8b5cf6", accent: "#a78bfa" },
    red: { primary: "#ef4444", secondary: "#dc2626", accent: "#f87171" },
    blue: { primary: "#3b82f6", secondary: "#2563eb", accent: "#60a5fa" },
    orange: { primary: "#f59e0b", secondary: "#d97706", accent: "#fbbf24" },
};

function hexToRgb(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
}

function hexToGlow(hex: string, alpha: number): string {
    const rgb = hexToRgb(hex);
    return `rgba(${rgb}, ${alpha})`;
}

function applyFullTheme(adminColor: string) {
    if (typeof window === "undefined") return;

    const body = document.body;
    const siteMode = localStorage.getItem("kf_site_mode") || "dark";
    const color = adminColor || "green";

    console.log(`[ThemeApplier] 🎨 Applying: ${color} accent in ${siteMode} mode.`);

    // 1) Clear classes
    const allPossibleClasses = [
        "theme-green", "theme-indigo", "theme-red", "theme-blue", "theme-orange",
        "theme-white", "theme-black"
    ];
    body.classList.remove(...allPossibleClasses);

    // 2) Reset styles
    const vars = [
        "--primary", "--secondary", "--accent",
        "--primary-glow", "--secondary-glow", "--accent-glow",
        "--primary-rgb", "--secondary-rgb", "--accent-rgb"
    ];
    vars.forEach(v => body.style.removeProperty(v));

    // 3) Apply mode
    if (siteMode === "white") {
        body.classList.add("theme-white");
    } else if (siteMode === "black") {
        body.classList.add("theme-black");
    }

    // 4) Apply accent color
    // Always apply theme class for better CSS targeting
    body.classList.add(`theme-${color}`);

    // Still set inline variables as a backup and for instant feedback
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

export { applyFullTheme };

export function ThemeApplier() {
    const { settings } = useSystem();

    useEffect(() => {
        const theme = settings.themeColor || "green";
        applyFullTheme(theme);

        const handleUpdate = () => applyFullTheme(settings.themeColor || "green");

        window.addEventListener("storage", handleUpdate);
        window.addEventListener("kf_theme_update", handleUpdate);
        return () => {
            window.removeEventListener("storage", handleUpdate);
            window.removeEventListener("kf_theme_update", handleUpdate);
        };
    }, [settings.themeColor]);

    return null;
}
