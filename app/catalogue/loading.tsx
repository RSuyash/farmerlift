import Container from "@/components/global/ui/Container";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCardSkeleton from "@/components/modules/products/ProductCardSkeleton";

export default function Loading() {
    return (
        <div className="min-h-screen bg-background pb-20">
             {/* Header Skeleton */}
             <div className="pt-32 pb-16 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                <Container>
                    <div className="max-w-4xl mx-auto text-center space-y-4">
                        <Skeleton className="h-12 w-3/4 mx-auto rounded-xl" />
                        <Skeleton className="h-6 w-1/2 mx-auto rounded-lg" />
                    </div>
                </Container>
             </div>

             <div className="container-width mt-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Skeleton */}
                    <div className="w-full lg:w-72 flex-shrink-0 space-y-4">
                        <Skeleton className="h-10 w-full rounded-lg" />
                        <div className="space-y-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Skeleton key={i} className="h-12 w-full rounded-lg" />
                            ))}
                        </div>
                    </div>

                    {/* Main Content Skeleton */}
                    <div className="flex-1 space-y-16">
                         {[1, 2].map((section) => (
                             <div key={section} className="space-y-6">
                                 <div className="flex items-center justify-between">
                                     <Skeleton className="h-8 w-48 rounded-md" />
                                     <Skeleton className="h-8 w-24 rounded-md" />
                                 </div>
                                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                     {[1, 2, 3].map((card) => (
                                         <ProductCardSkeleton key={card} />
                                     ))}
                                 </div>
                             </div>
                         ))}
                    </div>
                </div>
             </div>
        </div>
    )
}
