"use client";

import { useEffect } from "react";
import { useSystem } from "@/context/SystemContext";
import Script from "next/script";

export function Analytics() {
    const { settings } = useSystem();

    if (!settings) return null;

    return (
        <>
            {/* Google Analytics */}
            {settings.googleAnalyticsId && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}`}
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${settings.googleAnalyticsId}');
                        `}
                    </Script>
                </>
            )}

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
