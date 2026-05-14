import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function OrderSkeleton() {
    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            {/* Header Skeleton */}
            <div className="space-y-3">
                <Skeleton className="h-4 w-32" /> {/* Breadcrumb */}
                <div className="flex items-center gap-3">
                    <Skeleton className="h-12 w-12 rounded-lg" /> {/* Icon */}
                    <Skeleton className="h-10 w-48" /> {/* Title */}
                </div>
                <Skeleton className="h-4 w-64" /> {/* Subtitle */}
            </div>

            {/* Orders List Skeleton */}
            <div className="space-y-6">
                {[1, 2].map((i) => (
                    <Card key={i} className="overflow-hidden border-gray-100 shadow-sm rounded-2xl">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-6 relative">

                                {/* Product Image Skeleton */}
                                <Skeleton className="w-28 h-28 rounded-xl" />

                                <div className="flex-1 space-y-4">
                                    {/* Status Badge */}
                                    <Skeleton className="h-6 w-24 rounded-full bg-orange-50" />

                                    {/* Order ID */}
                                    <Skeleton className="h-6 w-20" />

                                    {/* Order Details (Date, Items, Location) */}
                                    <div className="flex flex-wrap gap-4">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>

                                    {/* Price */}
                                    <Skeleton className="h-8 w-36 mt-2" />
                                </div>

                                {/* Right Actions */}
                                <div className="flex flex-col justify-between items-end gap-4">
                                    <Skeleton className="h-6 w-10 rounded-md" /> {/* Icon tag */}
                                    <Skeleton className="h-10 w-28 rounded-lg" /> {/* Details button */}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}