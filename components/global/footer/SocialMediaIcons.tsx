import { Instagram, Linkedin, Youtube, Facebook, Twitter } from "lucide-react";
import Link from 'next/link';

interface SocialLinks {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
}

export default function SocialMediaIcons({ links }: { links?: SocialLinks }) {
    if (!links) return null;

    const socialItems = [
        { id: 'fb', icon: Facebook, url: links.facebook, label: 'Facebook', color: 'hover:text-blue-600' },
        { id: 'tw', icon: Twitter, url: links.twitter, label: 'Twitter', color: 'hover:text-sky-500' },
        { id: 'in', icon: Instagram, url: links.instagram, label: 'Instagram', color: 'hover:text-pink-600' },
        { id: 'li', icon: Linkedin, url: links.linkedin, label: 'LinkedIn', color: 'hover:text-blue-700' },
        { id: 'yt', icon: Youtube, url: links.youtube, label: 'YouTube', color: 'hover:text-red-600' },
    ].filter(item => item.url); // Only show if URL exists

    return (
        <div className="flex gap-4">
            {socialItems.map((social) => (
                <Link
                    key={social.id}
                    href={social.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-muted-foreground transition-colors ${social.color}`}
                    aria-label={social.label}
                >
                    <social.icon className="h-5 w-5" />
                </Link>
            ))}
        </div>
    );
}
