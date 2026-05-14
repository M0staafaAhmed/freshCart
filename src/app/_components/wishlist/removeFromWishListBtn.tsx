"use client"
import { removeFromWishlist } from '@/app/_actions/wishlist.actions'
import { wishlistContext } from '@/app/_context/wishlistContextProvider'
import { Button } from '@/components/ui/button'
import React, { useContext, useState } from 'react'
import { BsTrash } from 'react-icons/bs'
import { ImSpinner2 } from 'react-icons/im' // اختيارية للـ loading
import { toast } from 'sonner'

export default function RemoveFromWishListBtn({productId} : {productId : string}) {
    const [isLoading, setIsLoading] = useState(false);
    const {setWishlistNumber} = useContext(wishlistContext)


    async function handleRemoveFromWishlist() {
        setIsLoading(true);
        try {
            const res = await removeFromWishlist(productId);
            
            // تأكد من أن الـ action يرجع استجابة ناجحة
            if (res.status === "success") {
                toast.success("Item removed from wishlist");
                setWishlistNumber(res.data.length)
            } else {
                toast.error(res.message || "Could not remove item");
            }
        } catch (error) {
            toast.error("Failed to remove item");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button 
            onClick={handleRemoveFromWishlist}
            disabled={isLoading}
            variant="ghost" // استخدام variant جاهز من shadcn لو متاح
            className="p-2 h-auto cursor-pointer bg-transparent text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
        >
            {isLoading ? (
                <ImSpinner2 className="animate-spin" size={18} />
            ) : (
                <BsTrash size={18} />
            )}
        </Button>
    )
}