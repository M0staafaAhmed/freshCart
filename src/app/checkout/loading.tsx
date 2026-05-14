import { Skeleton } from "@/components/ui/skeleton"

export default function CheckoutSkeleton() {
    return (
        <div className="container mx-auto p-6 space-y-8 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex justify-between items-start">
                <div className="space-y-2">
                    <Skeleton className="h-10 w-64 rounded-lg" /> {/* Title */}
                    <Skeleton className="h-4 w-80 rounded-lg" />  {/* Subtitle */}
                </div>
                <Skeleton className="h-6 w-24 rounded-full" /> {/* Back to Cart */}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Shipping Address (Takes 2/3) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
                        {/* Green Header Placeholder */}
                        <Skeleton className="h-20 w-full rounded-none bg-gray-200" />

                        <div className="p-6 space-y-8">
                            {/* Alert/Info Box Placeholder */}
                            <Skeleton className="h-16 w-full rounded-xl" />

                            {/* Form Inputs Placeholders */}
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="space-y-3">
                                    <Skeleton className="h-4 w-24" /> {/* Label */}
                                    <Skeleton className="h-14 w-full rounded-xl" /> {/* Input Field */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Order Summary (Takes 1/3) */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
                        {/* Green Header Placeholder */}
                        <Skeleton className="h-20 w-full rounded-none bg-gray-200" />

                        <div className="p-5 space-y-6">
                            {/* Cart Items List Placeholder */}
                            <div className="space-y-4">
                                {[1, 2].map((item) => (
                                    <div key={item} className="flex gap-4 items-center">
                                        <Skeleton className="h-14 w-14 rounded-lg shrink-0" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-3 w-20" />
                                        </div>
                                        <Skeleton className="h-5 w-12" />
                                    </div>
                                ))}
                            </div>

                            <hr className="border-gray-100" />

                            {/* Pricing Placeholder */}
                            <div className="space-y-3">
                                <div className="flex justify-between"><Skeleton className="h-4 w-20" /><Skeleton className="h-4 w-16" /></div>
                                <div className="flex justify-between"><Skeleton className="h-4 w-20" /><Skeleton className="h-4 w-12" /></div>
                                <hr className="border-gray-100" />
                                <div className="flex justify-between"><Skeleton className="h-8 w-24" /><Skeleton className="h-8 w-24" /></div>
                            </div>

                            {/* Button Placeholder */}
                            <Skeleton className="h-14 w-full rounded-xl" />

                            {/* Badges Footer Placeholder */}
                            <div className="flex justify-center gap-4 pt-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}