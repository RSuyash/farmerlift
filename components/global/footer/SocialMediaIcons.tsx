import { Instagram, Linkedin, Youtube, Facebook } from "lucide-react";
import Link from "next/link";
import socialMediaData from "@/data/social-media.json";

const iconMap = {
    Instagram: Instagram,
    Linkedin: Linkedin,
    Youtube: Youtube,
    Facebook: Facebook
};

export default function SocialMediaIcons() {
    return (
        <div className="flex gap-4">
            {socialMediaData.map((social) => {
                const Icon = iconMap[social.icon as keyof typeof iconMap];
                if (!Icon) return null;

                return (
                    <Link
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-muted-foreground transition-colors ${social.color}`}
                        aria-label={social.name}
                    >
                        <Icon className="h-5 w-5" />
                    </Link>
                );
            })}
        </div>
    );
}
