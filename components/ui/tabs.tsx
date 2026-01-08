"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Since I don't have radix installed, I will build a custom accessible simple tab implementation to avoid dependency issues if radix isn't present.
// User requested "professional grade" which implies robustness.
// I'll stick to a pure React implementation that mimics the Radix API for future substitutability.

interface TabsProps {
    defaultValue: string
    className?: string
    children: React.ReactNode
}

const TabsContext = React.createContext<{
    activeTab: string
    setActiveTab: (value: string) => void
} | null>(null);

export function Tabs({ defaultValue, className, children }: TabsProps) {
    const [activeTab, setActiveTab] = React.useState(defaultValue);
    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className={cn("", className)}>{children}</div>
        </TabsContext.Provider>
    )
}

export function TabsList({ className, children }: { className?: string, children: React.ReactNode }) {
    return (
        <div className={cn("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", className)}>
            {children}
        </div>
    )
}

export function TabsTrigger({ value, className, children }: { value: string, className?: string, children: React.ReactNode }) {
    const context = React.useContext(TabsContext);
    if (!context) throw new Error("TabsTrigger must be used within Tabs");

    const isActive = context.activeTab === value;

    return (
        <button
            onClick={() => context.setActiveTab(value)}
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                isActive ? "bg-background text-foreground shadow-sm" : "hover:bg-background/50 hover:text-foreground",
                className
            )}
        >
            {children}
        </button>
    )
}

export function TabsContent({ value, className, children }: { value: string, className?: string, children: React.ReactNode }) {
    const context = React.useContext(TabsContext);
    if (!context) throw new Error("TabsContent must be used within Tabs");

    if (context.activeTab !== value) return null;

    return (
        <div className={cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 animate-fade-in", className)}>
            {children}
        </div>
    )
}
