import { getAllPosts } from "@/lib/cms";
import BlogCard from "@/components/modules/blog/BlogCard";

export const metadata = {
    title: "FarmerLift Knowledge Hub | Expert Farming Tips, Guides & News",
    description: "Stay updated with the latest in agriculture. Read expert articles on crop management, fertilizers, machinery, and sustainable farming practices."
};

export default async function BlogListingPage() {
    const posts = await getAllPosts();

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* Hero Section */}
            <section className="relative py-20 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                <div className="container-width text-center max-w-3xl mx-auto">
                    <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold text-sm uppercase tracking-wider">
                        Knowledge Hub
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white font-outfit tracking-tight mb-6">
                        Farming Insights & <span className="text-emerald-600">Expert Guides</span>
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Discover modern farming techniques, deep dives into fertilizers, and expert advice to increase your crop yield and profitability.
                    </p>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="container-width py-16 lg:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <BlogCard key={post.id} post={post} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <p className="text-xl text-zinc-500">No articles found. Check back soon!</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
