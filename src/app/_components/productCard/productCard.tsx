"use client"
import Image from 'next/image'
import { FaPlus, FaRegHeart, FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { BsArrowRepeat } from 'react-icons/bs'
import Link from 'next/link'
import { FiEye } from 'react-icons/fi'
import { productType } from '@/types/product.type'
import AddToCartBtn from './addToCartBtn'
import AddToWishlistbtn from './addToWishlistbtn'

interface productCardPropsType {
    product: productType
}

export default function ProductCard({product} : productCardPropsType) {

    

    return (
        <div className="w-full rounded-xl border border-gray-200 relative overflow-hidden bg-white transition-all hover:shadow-lg hover:-translate-y-2">
            <div className="w-full h-56">
                <div className="relative w-full h-full">
                    <Image src={product.imageCover} alt={product.title} fill className="object-contain" />
                </div>
            </div>

            {product.priceAfterDiscount && <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-medium px-2 py-1 m-3 rounded-sm">-{Math.floor(((product.price - product.priceAfterDiscount) / product.price) * 100)}%</span>}

            <div className="absolute top-0 right-0 flex flex-col items-center gap-2 m-3">
                <AddToWishlistbtn productId={product.id}/>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md transition-all hover:text-green-400 cursor-pointer text-lg">
                    <BsArrowRepeat />
                </div>
                <Link href={`/product/${product.id}`} className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md transition-all hover:text-emerald-500 cursor-pointer" title='View product'>
                    <FiEye />
                </Link>
            </div>


            <div className="p-4">
                <div className="text-xs text-gray-500 mb-1">{product.category.name}</div>
                <h3 className="font-medium mb-1 cursor-pointer " title={product.title}>
                    <Link href={`/product/${product.id}`} className="line-clamp-2">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                    </Link>
                </h3>
                <div className="flex items-center mb-2">
                    <div className="flex gap-1 items-center text-amber-400 mr-2">
                        {Array.from({ length: 5 }, (_, i) => {
                            const rating = i + 1;
                            return (
                                <span key={rating}>
                                    {rating <= Math.floor(product.ratingsAverage) ? (
                                        <FaStar className="text-amber-400" />
                                    ) : rating - 0.5 <= product.ratingsAverage ? (
                                        <FaStarHalfAlt className="text-amber-400" />
                                    ) : (
                                        <FaRegStar className="text-amber-400" />
                                    )}
                                </span>
                            );
                        })}
                    </div>

                    <span className="text-xs text-gray-500">{product.ratingsAverage} ({product.ratingsQuantity})</span>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        {product.priceAfterDiscount ? (
                            <div className="flex items-center gap-1.5 flex-1">
                                <span className="text-lg font-bold text-emerald-600 flex items-center gap-1.5">{product.priceAfterDiscount} <span>EGP</span></span>
                                <span className="text-sm text-gray-500 line-through flex items-center gap-1">{product.price} <span>EGP</span></span>
                            </div>
                        ) : (
                            <span className="text-lg font-bold text-gray-800">{product.price} EGP</span>
                        )}
                    </div>
                    <AddToCartBtn productId={product.id}/>
                </div>
            </div>



        </div>
    )
}
