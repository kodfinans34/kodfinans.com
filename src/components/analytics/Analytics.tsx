"use client";

import { useSystem } from "@/context/SystemContext";
import Script from "next/script";

export function Analytics() {
    const { settings } = useSystem();

    if (!settings) return null;

    // Determine the primary ID for the script src (prefer Ads ID if available as it's static here, or GA ID)
    const primaryId = "AW-17882525420"; // Hardcoded Ads ID

    return (
        <>
            {/* Unified Google Tag Manager */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
                strategy="afterInteractive"
            />
            <Script id="google-tag-manager" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    // Config for Google Ads
                    gtag('config', 'AW-17882525420');

                    // Config for Google Analytics (if ID exists)
                    ${settings.googleAnalyticsId ? `gtag('config', '${settings.googleAnalyticsId}');` : ''}
                `}
            </Script>

            {/* Content Security Policy compatible Custom CSS */}
            {settings.customCss && (
                <style dangerouslySetInnerHTML={{ __html: settings.customCss }} />
            )}

            {/* Custom Head Code (e.g. Google Ads, Verification Meta) Note: Client-side usually */}
            {settings.customHeadCode && (
                <div dangerouslySetInnerHTML={{ __html: settings.customHeadCode }} />
            )}
        </>
    );
}
