import React from 'react'
import EmptyWishlist from '../_components/wishlist/emptyWishlist'
import { Heart, Trash2, ShoppingCart, ChevronLeft } from 'lucide-react';
import test from "@/images/review-image.png"
import Link from 'next/link';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { Badge } from '@/components/ui/badge';
import { getWishlist } from '../_actions/wishlist.actions';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import AddToCartBtn from '../_components/wishlist/addToCartBtn';
import RemoveFromWishListBtn from '../_components/wishlist/removeFromWishListBtn';

export default async function page() {

    const wishlistItems = await getWishlist();

    return (
        <>
        {(wishlistItems?.count ?? 0) > 0 ? 
            <div className="bg-gray-50">
                <div className="container mx-auto py-6">
                    {/* Breadcrumb & Header */}
                    <nav className="text-sm text-gray-500 mb-4">
                        <Link href={"/"} className='hover:text-green-600 transition-colors mr-2'>Home</Link>
                        / <span className="text-gray-800">Wishlist</span>
                    </nav>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-red-50 p-3 rounded-xl">
                            <Heart className="text-red-500 fill-red-500" size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
                            <p className="text-gray-500 text-sm">{wishlistItems?.count ?? 0} items saved</p>
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wider">
                                    <th className="px-6 py-4 font-medium">Product</th>
                                    <th className="px-6 py-4 font-medium">Price</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {wishlistItems?.data.map((product) => {
                                    return <tr key={product.id} className="group hover:bg-gray-50/30 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-lg  border border-gray-100 relative">
                                                    <Image
                                                        fill
                                                        src={product.imageCover}
                                                        alt="{item.name}"
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <Link href={`product/${product.id}`} className="text-sm font-medium text-gray-900 leading-snug max-w-md hover:text-gray-500 transition-colors">
                                                        {product.title}
                                                    </Link>
                                                    <p className="text-xs text-gray-400 mt-1">{product.category.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-sm font-bold text-gray-900">{product.priceAfterDiscount ? product.priceAfterDiscount : product.price}</span>
                                            {product.priceAfterDiscount && <span className="text-sm font-bold text-gray-500 block line-through">{product.price}</span>}
                                        </td>
                                        <td className="px-6 py-5">
                                            <Badge className='bg-green-100'>
                                                <span className="size-1.5 rounded-full bg-green-500"></span>
                                                <span className="text-xs font-medium text-green-600">In Stock</span>
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-end gap-2">
                                                <AddToCartBtn productId={product.id}/>
                                                <RemoveFromWishListBtn productId={product.id}/>
                                            </div>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer Link */}
                    <Link href={"/"} className="mt-8 flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors text-sm font-medium group">
                        <FaLongArrowAltLeft size={18} className='group-hover:-translate-x-1 transition-transform' />
                        Continue Shopping
                    </Link>
                </div>
            </div>
        
        :
            <EmptyWishlist/>
        }
        </>
    )
}
