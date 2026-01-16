import { BlogPost } from "@/types/blog";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/cms";

// Generate Static Params for all posts
export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post: BlogPost) => ({
        id: post.id
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await getPostBySlug(id);
    if (!post) return { title: 'Post Not Found' };

    return {
        title: `${post.title} | FarmerLift Blog`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await getPostBySlug(id);

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
                            <div
                                className="prose prose-lg dark:prose-invert prose-emerald max-w-none [&>h2]:font-outfit [&>h2]:text-zinc-900 [&>h2]:dark:text-white [&>h3]:font-outfit [&>h3]:text-zinc-900 [&>h3]:dark:text-white [&>p]:text-zinc-700 [&>p]:dark:text-zinc-300 [&>li]:text-zinc-700 [&>li]:dark:text-zinc-300"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
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
