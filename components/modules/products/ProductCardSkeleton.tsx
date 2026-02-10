import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
    return (
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 h-full flex flex-col bg-white dark:bg-zinc-900">
            {/* Image Skeleton */}
            <div className="relative aspect-square w-full bg-zinc-50 dark:bg-zinc-950 rounded-xl mb-4 overflow-hidden p-4">
                 <Skeleton className="w-full h-full rounded-lg" />
            </div>

            {/* Content Skeleton */}
            <div className="flex flex-col flex-grow space-y-3">
                <div className="flex items-center justify-between mb-1">
                    <Skeleton className="h-4 w-20 rounded-sm" />
                </div>

                <Skeleton className="h-6 w-full rounded-md" />
                <Skeleton className="h-6 w-3/4 rounded-md" />
                <Skeleton className="h-3 w-1/3 rounded-md mb-2" />

                <div className="mt-auto flex items-end justify-between border-t border-zinc-100 dark:border-zinc-800 pt-3">
                     <div className="space-y-1">
                        <Skeleton className="h-3 w-10 rounded-sm" />
                        <Skeleton className="h-6 w-16 rounded-md" />
                     </div>
                     <Skeleton className="h-10 w-10 rounded-full" />
                </div>
            </div>
        </div>
    );
}
