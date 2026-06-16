import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Assuming Button is imported from a UI library

export default function FloatingContact() {
    return (
        <div className="fixed bottom-6 right-6 z-50 group" suppressHydrationWarning>
            <a href="https://wa.me/918788113105?text=Hello%20FarmerLift" target="_blank" rel="noopener noreferrer" title="Chat with us on WhatsApp">
                <Button
                    className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 text-white shadow-lg p-0 flex items-center justify-center hover:scale-110 transition-all duration-300"
                    aria-label="Contact on WhatsApp"
                >
                    <MessageCircle className="h-7 w-7" />
                    <span className="sr-only">Chat with us</span>
                </Button>
            </a>
        </div>
    );
}
