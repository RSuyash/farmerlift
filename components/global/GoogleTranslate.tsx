"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Globe } from "lucide-react";

interface GoogleTranslateProps {
  className?: string;
}

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export default function GoogleTranslate({ className }: GoogleTranslateProps) {
  const [mounted, setMounted] = useState(false);
  const [isMarathi, setIsMarathi] = useState(false);
  const initRef = useRef(false);

  useEffect(() => {
    setMounted(true);

    // Check if already translated from cookie
    if (document.cookie.includes("googtrans=/en/mr")) {
      setIsMarathi(true);
    }

    // Only init once
    if (initRef.current) return;
    initRef.current = true;

    window.googleTranslateElementInit = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,mr",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    // Load script
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    if (isMarathi) {
      // Clear cookies and reload to get English back
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
      window.location.reload();
      return;
    }

    // Try to find and trigger the Google Translate select
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = "mr";
      select.dispatchEvent(new Event("change"));
      setIsMarathi(true);
    } else {
      // Fallback: set cookie and reload
      document.cookie = "googtrans=/en/mr; path=/;";
      window.location.reload();
    }
  }, [isMarathi]);

  if (!mounted) return null;

  return (
    <div className={className}>
      {/* Hidden Google Translate widget */}
      <div
        id="google_translate_element"
        aria-hidden="true"
        style={{ position: "absolute", top: "-9999px", left: "-9999px", width: 0, height: 0, overflow: "hidden" }}
      />

      {/* Our branded toggle */}
      <button
        onClick={toggleLanguage}
        type="button"
        className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/25 hover:border-white/50 hover:bg-white/10 transition-all text-white text-xs font-semibold cursor-pointer select-none"
      >
        <Globe className="h-3.5 w-3.5 shrink-0" />
        <span className="whitespace-nowrap">{isMarathi ? "English" : "मराठी"}</span>
      </button>

      <style jsx global>{`
        .goog-te-banner-frame { display: none !important; }
        body { top: 0px !important; }
        #goog-gt-tt, .goog-te-balloon-frame { display: none !important; }
        .goog-text-highlight { background: none !important; box-shadow: none !important; }
      `}</style>
    </div>
  );
}
