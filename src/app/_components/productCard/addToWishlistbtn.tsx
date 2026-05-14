"use client"
import { addToWishlist } from '@/app/_actions/wishlist.actions'
import { wishlistContext } from '@/app/_context/wishlistContextProvider'
import { Button } from '@/components/ui/button'
import React, { useContext, useState, useTransition } from 'react'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { toast } from "sonner" // أو shadcn toast

export default function AddToWishlistbtn({ productId }: { productId: string }) {
    const [isPending, startTransition] = useTransition();
    const { setWishlistNumber } = useContext(wishlistContext)

    function handleAddtoWishlist() {
        startTransition(async () => {
            try {
                const res = await addToWishlist(productId);

                // نفترض أن الـ Action بيرجع نجاح أو فشل
                toast.success(res.message);
                setWishlistNumber(res.data.length)
            } catch (error) {
                toast.error("Something went wrong. Please try again.");
                console.error(error);
            }
        });
    }

    return (
        <Button
            onClick={handleAddtoWishlist}
            disabled={isPending}
            variant="outline"
            size="icon"
            className={`w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md transition-all hover:scale-110 active:scale-95 cursor-pointer disabled:opacity-100 text-gray-900`}
            title='Add to wishlist'
        >
            {isPending ? (
                <div className="w-4 h-4 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin" />
            ) : (
                <FaRegHeart />
            )}
        </Button>
    )
}   