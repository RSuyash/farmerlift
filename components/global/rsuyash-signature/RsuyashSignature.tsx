import { Code, Instagram, Linkedin } from "lucide-react";

export default function RsuyashSignature() {
    return (
        <div className="relative inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-black">
            <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                <Code className="h-3 w-3" />
            </div>
            <div className="flex flex-col leading-none">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">Developed by</span>
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-200">rsuyash</span>
            </div>
            <div className="ml-3 flex items-center gap-1 border-l border-zinc-200 pl-3 dark:border-zinc-700">
                <a
                    href="https://www.linkedin.com/in/rsuyash/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-1 text-zinc-400 transition-colors hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30"
                    aria-label="LinkedIn Profile"
                >
                    <Linkedin className="h-3 w-3" />
                </a>

                <a
                    href="https://www.instagram.com/r_suyash1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-1 text-zinc-400 transition-colors hover:bg-pink-100 hover:text-pink-600 dark:hover:bg-pink-900/30"
                    aria-label="Instagram Profile"
                >
                    <Instagram className="h-3 w-3" />
                </a>
            </div>
        </div>
    );
}
