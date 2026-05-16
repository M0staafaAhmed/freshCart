import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { getProducts } from '@/services/product.service'
import ProductCard from '../productCard/productCard';

export default async function RelatedProducts({categoryId} : {categoryId : string | undefined}) {


    const products = await getProducts({
        category: categoryId
    });


    return (
        <div className='mt-8'>
            <Carousel className="w-full" opts={{ align: "start" }}>
                <div className="flex items-center justify-between">
                    <h2 className="capitalize mb-6 ps-4 font-bold text-2xl md:text-3xl relative before:h-full before:w-1.5 before:rounded-3xl before:bg-linear-to-b before:from-emerald-500 before:to-emerald-700 before:absolute before:left-0">
                        You May Also <span className="text-emerald-600">Like</span>
                    </h2>
                    <div className="flex items-center gap-3">
                        <CarouselPrevious className="static active:-translate-y-1/2 size-10 [&_svg:not([class*='size-'])]:size-6 cursor-pointer border-none transition-all hover:text-green-600 hover:bg-green-100 bg-gray-200" />
                        <CarouselNext className="static active:-translate-y-1/2 size-10 [&_svg:not([class*='size-'])]:size-6  cursor-pointer border-none transition-all hover:text-green-600 hover:bg-green-100 bg-gray-200" />
                    </div>
                </div>
                <CarouselContent>
                    {products?.map((product) => (
                        <CarouselItem key={product.id} className='sm:basis-1/2 md:basis-1/3 lg:basis-1/5'>
                            <ProductCard product={product} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}
