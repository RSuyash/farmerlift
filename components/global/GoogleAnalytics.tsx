"use client";

import { useEffect } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
    interface Window {
        dataLayer?: unknown[][];
        gtag?: (...args: unknown[]) => void;
    }
}

export default function GoogleAnalytics() {
    useEffect(() => {
        if (!GA_MEASUREMENT_ID || document.getElementById("farmerlift-ga")) return;

        let idleId: number | undefined;
        const loadGoogleAnalytics = () => {
            if (document.getElementById("farmerlift-ga")) return;

            window.dataLayer = window.dataLayer || [];
            window.gtag = (...args: unknown[]) => {
                window.dataLayer?.push(args);
            };
            window.gtag("js", new Date());
            window.gtag("config", GA_MEASUREMENT_ID, {
                page_path: window.location.pathname,
                send_page_view: true,
            });

            const script = document.createElement("script");
            script.id = "farmerlift-ga";
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
            document.head.appendChild(script);
        };

        const timerId = window.setTimeout(() => {
            if ("requestIdleCallback" in window) {
                idleId = window.requestIdleCallback(loadGoogleAnalytics, { timeout: 3000 });
                return;
            }

            loadGoogleAnalytics();
        }, 6000);

        return () => {
            window.clearTimeout(timerId);
            if (idleId && "cancelIdleCallback" in window) {
                window.cancelIdleCallback(idleId);
            }
        };
    }, []);

    return null;
}
