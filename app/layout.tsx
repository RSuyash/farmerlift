import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/global/navbar/Navbar";
import Footer from "@/components/global/footer/Footer";
import FloatingContact from "@/components/global/FloatingContact";
import GoogleAnalytics from "@/components/global/GoogleAnalytics";
import { ThemeProvider } from "@/components/global/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://farmerlift.in"),
  title: {
    default: "FarmerLift | Empowering Agriculture",
    template: "%s | FarmerLift",
  },
  description:
    "FarmerLift helps farmers, dealers, and growers access quality crop nutrition, fertilizers, guidance, and agricultural products across Maharashtra.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://farmerlift.in",
    siteName: "FarmerLift",
    title: "FarmerLift | Empowering Agriculture",
    description:
      "Quality agricultural inputs, crop guidance, dealership support, and trusted farming resources from FarmerLift.",
    images: [
      {
        url: "/images/farmerlift_icon_transparent.png",
        width: 512,
        height: 512,
        alt: "FarmerLift logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FarmerLift | Empowering Agriculture",
    description:
      "Quality agricultural inputs, crop guidance, dealership support, and trusted farming resources from FarmerLift.",
    images: ["/images/farmerlift_icon_transparent.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/images/farmerlift_icon_transparent.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
