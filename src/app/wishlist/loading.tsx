import { Skeleton } from "@/components/ui/skeleton"

export default function WishlistSkeleton() {
    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            {/* Header Section */}
            <div className="space-y-4">
                <Skeleton className="h-4 w-32" /> {/* Breadcrumb */}
                <div className="flex items-center gap-4">
                    <Skeleton className="h-14 w-14 rounded-2xl" /> {/* Heart Icon Box */}
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-40" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                </div>
            </div>

            {/* Custom Grid Skeleton (بديل الجدول) */}
            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">

                {/* Table Header Row */}
                <div className="hidden md:flex bg-gray-50/50 border-b border-gray-100 px-6 py-4 justify-between">
                    <Skeleton className="h-4 w-20" /> {/* Product */}
                    <Skeleton className="h-4 w-16" /> {/* Price */}
                    <Skeleton className="h-4 w-16" /> {/* Status */}
                    <Skeleton className="h-4 w-20" /> {/* Actions */}
                </div>

                {/* Wishlist Items (3 rows) */}
                <div className="divide-y divide-gray-50">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">

                            {/* Product Info Column */}
                            <div className="flex items-center gap-4 md:w-[40%]">
                                <Skeleton className="h-16 w-16 rounded-lg shrink-0" />
                                <div className="space-y-2 w-full">
                                    <Skeleton className="h-5 w-full max-w-62.5" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </div>

                            {/* Price Column */}
                            <div className="md:w-[15%]">
                                <Skeleton className="h-6 w-16" />
                            </div>

                            {/* Status Column */}
                            <div className="md:w-[15%]">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-3 w-3 rounded-full" />
                                    <Skeleton className="h-5 w-20 rounded-full" />
                                </div>
                            </div>

                            {/* Actions Column */}
                            <div className="flex items-center md:justify-end gap-3 md:w-[20%]">
                                <Skeleton className="h-10 w-32 rounded-lg" /> {/* Add to cart */}
                                <Skeleton className="h-9 w-9 rounded-md" />   {/* Delete */}
                            </div>

                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Link */}
            <div className="flex items-center gap-2 pt-2">
                <Skeleton className="h-5 w-36" />
            </div>
        </div>
    )
}