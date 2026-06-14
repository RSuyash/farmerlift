"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

function clearTranslateCookies() {
  document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie =
    "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" +
    window.location.hostname;
}

export default function GoogleTranslate({ className }: GoogleTranslateProps) {
  const [isMarathi, setIsMarathi] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scriptPromiseRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    setIsMarathi(document.cookie.includes("googtrans=/en/mr"));
  }, []);

  const loadTranslate = useCallback(() => {
    if (scriptPromiseRef.current) {
      return scriptPromiseRef.current;
    }

    window.googleTranslateElementInit = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,mr",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element",
        );
      }
    };

    scriptPromiseRef.current = new Promise((resolve, reject) => {
      const existingScript = document.getElementById("google-translate-script");
      if (existingScript) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Google Translate failed to load"));
      document.body.appendChild(script);
    });

    return scriptPromiseRef.current;
  }, []);

  const toggleLanguage = useCallback(async () => {
    if (isMarathi) {
      clearTranslateCookies();
      window.location.reload();
      return;
    }

    setIsLoading(true);
    try {
      await loadTranslate();
      await new Promise((resolve) => window.setTimeout(resolve, 250));

      const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (select) {
        select.value = "mr";
        select.dispatchEvent(new Event("change"));
        setIsMarathi(true);
      } else {
        document.cookie = "googtrans=/en/mr; path=/;";
        window.location.reload();
      }
    } finally {
      setIsLoading(false);
    }
  }, [isMarathi, loadTranslate]);

  return (
    <div className={className}>
      <div
        id="google_translate_element"
        aria-hidden="true"
        style={{ position: "absolute", top: "-9999px", left: "-9999px", width: 0, height: 0, overflow: "hidden" }}
      />

      <button
        onClick={toggleLanguage}
        type="button"
        disabled={isLoading}
        className="flex min-w-[88px] items-center justify-center gap-1.5 px-3 py-1 rounded-full border border-white/25 hover:border-white/50 hover:bg-white/10 transition-all text-white text-xs font-semibold cursor-pointer select-none disabled:opacity-60"
      >
        <Globe className="h-3.5 w-3.5 shrink-0" />
        <span className="whitespace-nowrap">{isMarathi ? "English" : "Marathi"}</span>
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
