"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { FaCheck, FaMinus, FaPlus } from 'react-icons/fa6'
import test from "@/images/review-image.png"
import { Button } from '@/components/ui/button'
import { MdDelete } from 'react-icons/md'
import { CartProduct, deleteProductFromCart, updateCartProduct } from '@/app/_actions/cart.actions'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { FaRegTrashAlt } from 'react-icons/fa'
import { cartContext } from '@/app/_context/cartContextProvider'


export default function CartCard({ product }: { product: CartProduct }) {

    const [isLoading, setIsLoading] = useState(false)
    const {setCartNumber} = useContext(cartContext)

    async function updateCart(num: Number) {
        setIsLoading(true)
        try {
            const res = await updateCartProduct(num, product.product.id)
            setCartNumber(res.numOfCartItems)
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    }

    async function deleteProduct() {
        setIsLoading(true)
        try {
            const res = await deleteProductFromCart(product.product.id)
            setCartNumber(res.numOfCartItems)
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    }






    return (
        <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 overflow-hidden">
            {isLoading &&
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/5 backdrop-blur-[2px] transition-all duration-300 animate-in fade-in">
                    <div className="bg-white py-2 px-6 shadow-xl shadow-black/5 border border-gray-100 rounded-full flex items-center gap-2 transform transition-transform duration-300 scale-100 group-hover:scale-105 text-gray-500 font-bold text-sm animate-bounce">
                        <AiOutlineLoading3Quarters className='text-green-600 animate-spin' />
                        Updating...
                    </div>
                </div>
            }
            <div className="p-4 sm:p-5">
                <div className="flex gap-4 sm:gap-6">
                    <Link href={`product/${product.product.id}`} className="relative shrink-0 group">
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-linear-to-br from-gray-50 via-white to-gray-100 p-3 border border-gray-100 overflow-hidden relative">
                            <Image src={product.product.imageCover} alt='test' fill className='object-cover transition-all duration-500 group-hover:scale-110' />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <FaCheck />
                            In Stock
                        </div>
                    </Link>
                    <div className="flex-1 min-w-0 flex flex-col">
                        <Link href={`product/${product.product.id}`} className='group/title'>
                            <h3 className='font-semibold text-gray-900 group-hover/title:text-green-600 transition-colors leading-relaxed text-base sm:text-lg'>
                                {product.product.title}
                            </h3>
                        </Link>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="inline-block px-2.5 py-1 bg-linear-to-r from-green-50 to-emerald-50 text-green-700 text-xs font-medium rounded-full">{product.product.category.name}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500 uppercase">SKU: 5CA{product.product.id.slice(-3)}</span>
                        </div>
                        <div className="my-4 flex items-baseline gap-2">
                            <span className="text-green-600 font-bold text-lg">{product.price} EGP</span>
                            <span className="text-xs text-gray-400">per unit</span>
                        </div>
                        <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center">
                                <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                                    <Button disabled={product.count <= 1} onClick={() => { updateCart(product.count - 1) }} className='h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all cursor-pointer'><FaMinus /></Button>
                                    <span className="w-12 text-center font-bold text-gray-900">{product.count}</span>
                                    <Button onClick={() => { updateCart(product.count + 1) }} className='h-8 w-8 rounded-lg bg-green-600 shadow-sm shadow-green-600/30 flex items-center justify-center text-white hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer'><FaPlus /></Button>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-xs text-gray-400 mb-0.5">Total</p>
                                    <p className="text-xl font-bold text-gray-900">
                                        {product.price * product.count}
                                        <span className="text-sm font-medium text-gray-400 ms-0.5">EGP</span>
                                    </p>
                                </div>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button className='h-10 w-10 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center disabled:opacity-40 transition-all duration-200 cursor-pointer'><MdDelete /></Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className='ring-0 md:min-w-lg'>
                                        <AlertDialogHeader className='grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-center sm:group-data-[size=default]/alert-dialog-content:text-center sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]'>
                                            <AlertDialogTitle>
                                                <div className="size-16 text-3xl rounded-full bg-red-100 mx-auto text-red-600 flex items-center justify-center">
                                                    <FaRegTrashAlt />
                                                </div>
                                                <div className="text-2xl font-bold mt-2 mb-3">Remove Item?</div>
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Remove <span className='font-bold text-gray-700'>{product.product.title}</span> from your cart?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter className='border-none bg-white justify-center!'>
                                            <AlertDialogCancel className='h-auto cursor-pointer border-none bg-gray-100 hover:bg-gray-200! text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all'>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={deleteProduct} className='h-auto cursor-pointer bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all'>Remove</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
