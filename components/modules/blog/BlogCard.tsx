import { BlogPost } from "@/types/blog";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BlogCard({ post }: { post: BlogPost }) {
    return (
        <article className="group flex flex-col items-start bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 h-full">
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                    {post.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur text-xs font-bold text-emerald-700 dark:text-emerald-400 rounded-full shadow-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-col flex-1 p-6 w-full">
                <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime}
                    </div>
                </div>

                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {post.title}
                </h3>

                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between w-full pt-6 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase">
                            {post.author ? post.author.charAt(0) : 'U'}
                        </div>
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            {post.author || 'Unknown Author'}
                        </span>
                    </div>

                    <Button variant="ghost" className="p-0 h-auto hover:bg-transparent text-emerald-600 hover:text-emerald-700 font-semibold text-sm group/btn" asChild>
                        <Link href={`/blog/${post.id}`}>
                            Read Article <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                    </Button>
                </div>
            </div>
        </article>
    );
}
