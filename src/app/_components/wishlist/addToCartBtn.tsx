"use client"
import { addToCart } from '@/app/_actions/cart.actions';
import { cartContext } from '@/app/_context/cartContextProvider';
import { Button } from '@/components/ui/button'
import React, { useContext, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { ImSpinner2 } from 'react-icons/im' // أيقونة تحميل اختيارية
import { toast } from 'sonner';

export default function AddToCartBtn({ productId }: { productId: string }) {
    // استخدام الـ Context لتحديث عدد المنتجات في الهيدر تلقائياً
    const { setCartNumber } = useContext(cartContext)
    const [isLoading, setIsLoading] = useState(false);

    async function handleAddToCart() {
        setIsLoading(true);

        try {
            const res = await addToCart(productId);

            if (res.status === "success") {
                toast.success(res.message);
                // تحديث الـ Global State
                setCartNumber(res.numOfCartItems)
            } else {
                toast.error(res.message || "Something went wrong");
            }
        } catch (error) {
            toast.error("failed to add to cart");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button
            onClick={handleAddToCart}
            disabled={isLoading} // منع الضغط المتكرر أثناء العملية
            className="h-auto cursor-pointer flex items-center gap-2 bg-[#1a8a47] hover:bg-[#156e39] text-white px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
            {isLoading ? (
                <>
                    <ImSpinner2 className="animate-spin" size={14} />
                    Adding...
                </>
            ) : (
                <>
                    <FaShoppingCart size={14} />
                    Add to Cart
                </>
            )}
        </Button>
    )
}