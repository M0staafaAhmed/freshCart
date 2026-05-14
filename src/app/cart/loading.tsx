import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function Loading() {
    return (
        <div className="container mx-auto py-10 px-4">
            {/* Header Skeleton */}
            <div className="mb-8 space-y-2">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-12 w-12 rounded-xl" />
                    <Skeleton className="h-10 w-48" />
                </div>
                <Skeleton className="h-4 w-32" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side: Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-white p-4 rounded-3xl border border-gray-100 flex gap-4 items-center">
                            {/* Product Image & Stock Status */}
                            <div className="space-y-2">
                                <Skeleton className="h-32 w-32 rounded-2xl" />
                                <Skeleton className="h-6 w-20 mx-auto rounded-full" />
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-2">
                                        <Skeleton className="h-6 w-40" />
                                        <div className="flex gap-2">
                                            <Skeleton className="h-4 w-20 rounded-full" />
                                            <Skeleton className="h-4 w-24" />
                                        </div>
                                    </div>
                                </div>
                                
                                <Skeleton className="h-8 w-28" />

                                {/* Quantity Controls */}
                                <Skeleton className="h-10 w-24 rounded-lg" />
                            </div>

                            {/* Total Price & Delete Button */}
                            <div className="flex flex-col items-end justify-between h-32 py-2">
                                <Skeleton className="h-10 w-10 rounded-xl" /> {/* Delete Icon */}
                                <div className="text-right space-y-1">
                                    <Skeleton className="h-3 w-12 ml-auto" />
                                    <Skeleton className="h-6 w-20" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Side: Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
                        {/* Summary Header */}
                        <Skeleton className="h-24 w-full rounded-none" />
                        
                        <div className="p-6 space-y-6">
                            {/* Free Shipping Progress/Badge */}
                            <Skeleton className="h-20 w-full rounded-2xl" />

                            {/* Price Breakdown */}
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-12" />
                                </div>
                                <hr className="border-gray-100" />
                                <div className="flex justify-between">
                                    <Skeleton className="h-8 w-16" />
                                    <Skeleton className="h-8 w-32" />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3 pt-4">
                                <Skeleton className="h-12 w-full rounded-xl" />
                                <Skeleton className="h-14 w-full rounded-2xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}