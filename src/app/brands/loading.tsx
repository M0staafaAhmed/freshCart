import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function CategoriesSkeleton() {
    return (
        <div className="w-full space-y-10">
            {/* 1. Header Skeleton (Matching the green banner in image_ccc873.jpg) */}
            <div className="w-full bg-[#1a8a47]/10 py-12 px-6 md:px-12 animate-pulse">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Breadcrumb */}
                    <Skeleton className="h-4 w-32 bg-gray-200" />

                    <div className="flex items-center gap-5">
                        {/* Icon Box */}
                        <Skeleton className="h-16 w-16 rounded-2xl bg-gray-200" />
                        <div className="space-y-2">
                            {/* Title */}
                            <Skeleton className="h-10 w-48 bg-gray-200" />
                            {/* Subtitle */}
                            <Skeleton className="h-4 w-64 bg-gray-200" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Grid Skeleton for Category Cards */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pb-12">
                {[...Array(12)].map((_, i) => (
                    <Card key={i} className="border-gray-100 shadow-sm rounded-2xl overflow-hidden">
                        <CardContent className="p-4 flex flex-col items-center space-y-4">
                            {/* Image Placeholder */}
                            <Skeleton className="w-full aspect-square rounded-xl bg-gray-100" />

                            {/* Category Name Text */}
                            <Skeleton className="h-5 w-24 bg-gray-100" />

                            {/* View Products Link (Only for the first item as seen in the image) */}
                            {i === 0 && (
                                <Skeleton className="h-3 w-20 bg-gray-50" />
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}