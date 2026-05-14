"use client"
import { addToCart } from '@/app/_actions/cart.actions';
import { cartContext } from '@/app/_context/cartContextProvider';
import React, { useContext, useState } from 'react'
import { FaBolt, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'sonner';

interface props {
    price: number | undefined;
    quantity: number | undefined;
    productId: string | undefined;
}

export default function ProductCount({ price, quantity, productId }: props) {

    const [num, setNum] = useState(1)
    const {setCartNumber} = useContext(cartContext)

    function handleInput(e: any) {
        const value = parseInt(e.target.value)

        if (isNaN(value) || value < 1) {
            setNum(1)
        }
        else if (value > (quantity ?? 200)) {
            setNum(quantity ?? 200)
        } else {
            setNum(value)
        }
    }

    function handleChange(property: number) {
        if (property === -1 && num > 1 || property === 1 && num < (quantity ?? 200)) {
            setNum(num + property)
        }
    }

    const [isLoading, setIsLoading] = useState(false);
    
        async function handleAddToCart() {
            setIsLoading(true); 
            
            try {
                const res = await addToCart(productId as string); 
    
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
        <>
            <p className='text-sm mb-2'>Quantity</p>
            <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                    <button className='py-3 px-4 transition-all hover:bg-gray-200 hover:text-green-400 text-gray-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed' onClick={() => { handleChange(-1) }} disabled={num <= 1}><FaMinus /></button>
                    <input type="number" min={1} max={quantity ?? 200} className='w-14 text-center border-0 focus:ring-0 focus:outline-none text-lg font-medium' value={num} onChange={handleInput} />
                    <button className='py-3 px-4 transition-all hover:bg-gray-200 hover:text-green-400 text-gray-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed' onClick={() => { handleChange(1) }} disabled={num >= (quantity ?? 200)}><FaPlus /></button>
                </div>
                <span className="text-sm text-gray-500">{quantity} available</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Price:</span>
                    <span className="text-2xl font-bold text-green-600">{(num * (price ?? 0)).toFixed(2)} EGP</span>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button onClick={handleAddToCart} className="flex-1 text-white py-4 px-6 rounded-xl font-medium hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/25 bg-green-600 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed" disabled={isLoading} >{isLoading ?  <ImSpinner2 className="animate-spin" /> : <> <FaShoppingCart />Add to Cart</>}</button>
                <button className="flex-1 bg-gray-900 text-white py-4 px-6 rounded-xl font-medium hover:bg-gray-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"><FaBolt />Buy Now</button>
            </div>
        </>
    )
}
