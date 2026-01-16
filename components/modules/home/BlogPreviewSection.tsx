import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/cms";

export default async function BlogPreviewSection() {
    const articles = await getAllPosts(3);
    return (
        <section className="py-24 bg-gray-50 dark:bg-black/40 border-t border-emerald-100 dark:border-white/5">
            <div className="container-width">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="h-px w-8 bg-emerald-500 hidden md:block" />
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest text-xs">Knowledge Hub</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold font-outfit text-emerald-950 dark:text-white tracking-tight mb-4">
                            Latest <span className="text-emerald-600 dark:text-emerald-500">Insights</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                            Expert advice, farming tips, and industry news to help you stay ahead of the curve.
                        </p>
                    </div>
                    <Link href="/blog">
                        <Button variant="outline" className="rounded-full border-emerald-200 text-emerald-900 hover:bg-emerald-50 dark:border-white/20 dark:text-white dark:hover:bg-white/10">
                            Read the Blog <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {articles.map((article) => (
                        <Link key={article.id} href={`/blog/${article.id}`} className="group flex flex-col h-full bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 dark:hover:shadow-black/50 transition-all duration-300 hover:-translate-y-1">
                            {/* Image Container */}
                            <div className="aspect-[4/3] w-full bg-gray-200 dark:bg-white/10 relative overflow-hidden">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                                <div className="absolute bottom-4 left-4">
                                    <span className="inline-block py-1 px-3 rounded-md bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                                        {article.tags[0] || 'Insights'}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-grow p-6">
                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium">
                                    <span>{article.date}</span>
                                    <span>•</span>
                                    <span>{article.readTime || '5 min read'}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-outfit leading-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 flex-grow line-clamp-3">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 pt-4 border-t border-gray-100 dark:border-white/5 mt-auto">
                                    Read Article <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
