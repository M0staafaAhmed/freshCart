"use client"
import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { getCart } from '../_actions/cart.actions'


export const cartContext = createContext({})

export default function CartContextProvider({children} : {children : ReactNode}) {
    const [cartNumber, setCartNumber] = useState(0)
    async function getUserCart(){
        const res = await getCart();
        setCartNumber((res?.numOfCartItems!))
    }

    useEffect(()=>{
        getUserCart();
    } , [])
  return (
    <cartContext.Provider value={{cartNumber , setCartNumber}}>
        {children}
    </cartContext.Provider>
  )
}
