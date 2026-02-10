import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Using Outfit for Headings, Inter for Body
import "./globals.css";
import Navbar from "@/components/global/navbar/Navbar";
import Footer from "@/components/global/footer/Footer";
import FloatingContact from "@/components/global/FloatingContact";
import GoogleAnalytics from "@/components/global/GoogleAnalytics";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/global/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FarmerLift | Empowering Agriculture",
  description: "Connect with high-quality agricultural products, expert knowledge, and a community of farmers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, outfit.variable)} suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col font-sans bg-background text-foreground" suppressHydrationWarning>
        <GoogleAnalytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <FloatingContact />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}