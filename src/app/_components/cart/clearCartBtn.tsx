"use client"
import React, { use, useContext } from 'react'
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
import { Button } from '@/components/ui/button'
import { FaRegTrashAlt } from 'react-icons/fa'
import { MdDelete, MdOutlineShoppingCart } from 'react-icons/md'
import { clearCart } from '@/app/_actions/cart.actions'
import { toast } from 'sonner'
import { cartContext } from '@/app/_context/cartContextProvider'

export default function ClearCartBtn() {

    const {setCartNumber} = useContext(cartContext)

    async function handleClearCart(){
        try{
            const res = await clearCart()
            setCartNumber(res.numOfCartItems)
            toast.success("Cart cleared successfully")
        }catch(error){
            toast.error("Something went error")
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button className="cursor-pointer bg-transparent flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50">
                    <MdDelete />
                    <span>Clear all items</span>
                </Button>            </AlertDialogTrigger>
            <AlertDialogContent className='ring-0 md:min-w-lg'>
                <AlertDialogHeader className='grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-center sm:group-data-[size=default]/alert-dialog-content:text-center sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]'>
                    <AlertDialogTitle>
                        <div className="size-16 text-3xl rounded-full bg-red-100 mx-auto text-red-600 flex items-center justify-center">
                            <MdOutlineShoppingCart />
                        </div>
                        <div className="text-2xl font-bold mt-2 mb-3">Clear Your Cart?</div>
                    </AlertDialogTitle>
                    <AlertDialogDescription className='md:max-w-3/4'>
                        All items will be removed from your cart. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='border-none bg-white justify-center!'>
                    <AlertDialogCancel className='h-auto cursor-pointer border-none bg-gray-100 hover:bg-gray-200! text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all'>Keep Shopping</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearCart} className='h-auto cursor-pointer bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all'>Yes, Clear All</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
