"use client" 

import { addToCart } from '@/app/_actions/cart.actions';
import { cartContext } from '@/app/_context/cartContextProvider';
import React, { useContext, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { ImSpinner2 } from 'react-icons/im' 
import { toast } from 'sonner';

export default function AddToCartBtn({ productId }: { productId: string }) {
    const {setCartNumber} = useContext(cartContext)
    const [isLoading, setIsLoading] = useState(false);

    async function handleAddToCart() {
        setIsLoading(true); 
        
        try {
            const res = await addToCart(productId); 

            if (res.status === "success") {
                toast.success(res.message);
                setCartNumber(res.numOfCartItems)
            } else {
                toast.error(res.message || "Some thing went error");
            }
        } catch (error) {
            toast.error("failed to add to cart");
        } finally {
            setIsLoading(false); 
        }
    }

    return (
        <button 
            disabled={isLoading}
            className="h-10 w-10 rounded-full flex items-center justify-center transition bg-green-600 text-white hover:bg-green-700 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer" 
            title='Add to cart' 
            onClick={handleAddToCart}
        >
            {isLoading ? <ImSpinner2 className="animate-spin" /> : <FaPlus />}
        </button>
    )
}