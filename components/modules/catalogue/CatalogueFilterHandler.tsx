"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CatalogueFilterHandlerProps {
  cropFilter: string | null;
}

export default function CatalogueFilterHandler({ cropFilter }: CatalogueFilterHandlerProps) {
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Check if crop filter exists in URL on load to trigger smooth scroll
    const cropParam = searchParams.get("crop");
    if (cropParam) {
      setTimeout(() => {
        const resultsElement = document.getElementById("catalogue-results");
        if (resultsElement) {
          const y = resultsElement.getBoundingClientRect().top + window.scrollY - 120; // 120px offset for sticky navbar
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 150);
    }
  }, [searchParams]);

  if (!isMounted || !cropFilter) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Active Filter:
          </span>
          <Link
            href="/catalogue#catalogue-results"
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-sm font-semibold transition-all hover:bg-emerald-100 dark:hover:bg-emerald-500/20 hover:scale-[1.02]"
            scroll={false}
          >
            <span className="capitalize">{cropFilter}</span>
            <X className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
