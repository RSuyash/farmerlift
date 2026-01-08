import { BlogPost } from "@/types/blog";
import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";

// Helper to get a single blog post
// Helper to get a single blog post
function getBlogPost(id: string): BlogPost | null {
    const blogDir = path.join(process.cwd(), "data/blog");
    const filePath = path.join(blogDir, `${id}.json`);

    if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, "utf8")) as BlogPost;
    }

    // Fallback: Case-insensitive search
    try {
        const files = fs.readdirSync(blogDir);
        const foundFile = files.find(f => f.toLowerCase().replace('.json', '') === id.toLowerCase());
        if (foundFile) {
            return JSON.parse(fs.readFileSync(path.join(blogDir, foundFile), "utf8")) as BlogPost;
        }
    } catch (error) {
        console.error("Error reading blog directory:", error);
    }

    return null;
}

// Generate Static Params for all posts
export async function generateStaticParams() {
    const blogDir = path.join(process.cwd(), "data/blog");
    if (!fs.existsSync(blogDir)) return [];

    const fileNames = fs.readdirSync(blogDir);
    return fileNames
        .filter(file => file.endsWith(".json"))
        .map(file => ({
            id: file.replace(".json", "")
        }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = getBlogPost(id);
    if (!post) return { title: 'Post Not Found' };

    return {
        title: `${post.title} | FarmerLift Blog`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = getBlogPost(id);

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-white dark:bg-black pb-20">
            {/* Header / Hero */}
            <div className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                <div className="container-width py-12 lg:py-16">
                    <Link href="/blog" className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-emerald-600 transition-colors mb-8">
                        <ChevronLeft className="h-4 w-4 mr-1" /> Back to Articles
                    </Link>

                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            {post.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white font-outfit leading-tight mb-8">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
                                    {post.author.charAt(0)}
                                </div>
                                <span className="font-medium text-zinc-900 dark:text-zinc-300">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" />
                                {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4" />
                                {post.readTime}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container-width py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Featured Image */}
                    <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl mb-12">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Article Body */}
                        <div className="lg:col-span-8">
                            <div className="prose prose-lg dark:prose-invert prose-emerald max-w-none">
                                {/* Simple Markdown Rendering (Since content is markdown string like ## Header) */}
                                {/* In a real app we'd use react-markdown. For now, we'll manually parse basic headers or just render lines. */}
                                {/* Given the prompt asked for "json based... same logic", we will render the raw text with newlines or basic formatting */}

                                {post.content.split('\n').map((line, index) => {
                                    // Helper for inline parsing (bold, etc.)
                                    const parseText = (text: string) => {
                                        return text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
                                            if (part.startsWith('**') && part.endsWith('**')) {
                                                return <strong key={i} className="font-bold text-zinc-900 dark:text-zinc-100">{part.slice(2, -2)}</strong>;
                                            }
                                            return part;
                                        });
                                    };

                                    if (line.startsWith('## ')) return <h2 key={index} className="text-3xl font-bold mt-8 mb-4 font-outfit text-zinc-900 dark:text-white">{parseText(line.replace('## ', ''))}</h2>;
                                    if (line.startsWith('### ')) return <h3 key={index} className="text-2xl font-bold mt-6 mb-3 font-outfit text-zinc-900 dark:text-white">{parseText(line.replace('### ', ''))}</h3>;

                                    if (line.startsWith('- ')) return (
                                        <div key={index} className="flex items-start gap-2 mb-2 ml-4">
                                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                                            <span className="text-zinc-700 dark:text-zinc-300">{parseText(line.replace('- ', ''))}</span>
                                        </div>
                                    );

                                    const numberedMatch = line.match(/^(\d+)\.\s(.+)/);
                                    if (numberedMatch) {
                                        return (
                                            <div key={index} className="flex items-start gap-2 mb-2 ml-4">
                                                <span className="font-bold text-emerald-600 flex-shrink-0">{numberedMatch[1]}.</span>
                                                <span className="text-zinc-700 dark:text-zinc-300">{parseText(numberedMatch[2])}</span>
                                            </div>
                                        );
                                    }

                                    if (line.trim() === '') return <div key={index} className="h-4" />;

                                    return (
                                        <p key={index} className="mb-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            {parseText(line)}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Sidebar / Share */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="sticky top-24 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <Share2 className="h-5 w-5 text-emerald-600" /> Share this article
                                </h4>
                                <div className="space-y-3">
                                    <Button variant="outline" className="w-full justify-start gap-3 h-12 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 dark:hover:bg-blue-900/20">
                                        <Facebook className="h-5 w-5" /> Facebook
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start gap-3 h-12 hover:bg-sky-50 hover:text-sky-500 hover:border-sky-200 dark:hover:bg-sky-900/20">
                                        <Twitter className="h-5 w-5" /> Twitter
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start gap-3 h-12 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 dark:hover:bg-indigo-900/20">
                                        <Linkedin className="h-5 w-5" /> LinkedIn
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start gap-3 h-12">
                                        <LinkIcon className="h-5 w-5" /> Copy Link
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
