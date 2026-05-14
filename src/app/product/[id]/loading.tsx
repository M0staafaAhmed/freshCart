import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function Loading() {
    return (
        <div className="container mx-auto py-8 px-4">
            {/* Breadcrumb skeleton */}
            <Skeleton className="h-4 w-64 mb-6" />

            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column: Images */}
                <div className="w-full lg:w-1/4">
                    <div className="sticky top-4 space-y-4">
                        {/* Main Product Image */}
                        <Skeleton className="aspect-square w-full rounded-xl" />
                        
                        {/* Thumbnail Row */}
                        <div className="flex gap-4">
                            <Skeleton className="h-24 w-24 rounded-lg" />
                            <Skeleton className="h-24 w-24 rounded-lg" />
                            <Skeleton className="h-24 w-24 rounded-lg" />
                        </div>
                    </div>
                </div>

                {/* Right Column: Content */}
                <div className="w-full lg:w-3/4 space-y-6">
                    <div className="space-y-3">
                        {/* Tags/Category */}
                        <div className="flex gap-2">
                            <Skeleton className="h-6 w-24 rounded-full" />
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                        
                        {/* Title */}
                        <Skeleton className="h-10 w-3/4" />
                        
                        {/* Rating */}
                        <Skeleton className="h-5 w-40" />
                        
                        {/* Price */}
                        <Skeleton className="h-8 w-32 mt-4" />
                    </div>

                    {/* Description Block */}
                    <div className="space-y-2 py-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>

                    {/* Quantity Selector Skeleton */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-12 w-32 rounded-lg" />
                    </div>

                    {/* Total Price Bar */}
                    <Skeleton className="h-16 w-full rounded-lg" />

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Skeleton className="h-12 w-full rounded-lg" />
                        <Skeleton className="h-12 w-full rounded-lg" />
                    </div>

                    {/* Wishlist/Share */}
                    <div className="flex gap-4">
                        <Skeleton className="h-10 w-full rounded-lg" />
                        <Skeleton className="h-10 w-12 rounded-lg" />
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-3 gap-4 pt-6">
                        <Skeleton className="h-16 w-full rounded-xl" />
                        <Skeleton className="h-16 w-full rounded-xl" />
                        <Skeleton className="h-16 w-full rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    )
}