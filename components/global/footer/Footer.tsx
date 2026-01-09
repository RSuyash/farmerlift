import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="w-full border-t bg-muted/40 py-12 md:py-16 lg:py-20">
            <div className="container-width grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="relative h-8 w-8">
                            <Image
                                src="/images/farmerlift_icon_logo.png"
                                alt="FarmerLift Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-emerald-900">FarmerLift</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        By The Farmer, For The Farmers
                    </p>
                    <div className="text-xs text-muted-foreground mt-4 leading-relaxed">
                        <p className="font-semibold">Manufactured & Marketed By:</p>
                        <p>Farmer Lift</p>
                        <p>Plot No. A2, MIDC Industrial Area,</p>
                        <p>Kandhar, Dist. Nanded, Maharashtra – 431714</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className="font-semibold">Platform</h4>
                    <Link href="/products" className="text-sm text-muted-foreground hover:text-primary">
                        Browse Products
                    </Link>
                    <Link href="/resources" className="text-sm text-muted-foreground hover:text-primary">
                        Resources & Blog
                    </Link>
                    <Link href="/register" className="text-sm text-muted-foreground hover:text-primary">
                        Join as Partner
                    </Link>
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className="font-semibold">Company</h4>
                    <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                        About Us
                    </Link>
                    <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                        Contact
                    </Link>
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className="font-semibold">Legal</h4>
                    <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                        Terms of Service
                    </Link>
                    <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                        Privacy Policy
                    </Link>
                </div>
            </div>
            <div className="container-width mt-8 pt-8 border-t text-center text-xs text-muted-foreground">
                © 2026 FarmerLift. All rights reserved.
            </div>
        </footer>
    );
}
