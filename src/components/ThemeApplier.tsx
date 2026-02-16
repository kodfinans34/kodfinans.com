"use client";

import { useEffect } from "react";
import { useSystem } from "@/context/SystemContext";

/**
 * ThemeApplier reads the themeColor from settings and applies the 
 * corresponding CSS class to the body element. Defaults to green.
 */
export function ThemeApplier() {
    const { settings } = useSystem();

    useEffect(() => {
        const theme = settings.themeColor || "green";
        const body = document.body;

        // Remove all existing theme classes
        body.classList.remove("theme-green", "theme-indigo", "theme-red", "theme-blue", "theme-orange");

        // Green is the default (no class needed, :root already has green)
        if (theme !== "green") {
            body.classList.add(`theme-${theme}`);
        }
    }, [settings.themeColor]);

    return null;
}
