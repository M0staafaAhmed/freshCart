"use client"
import React, { Children, createContext, ReactNode, useEffect, useState } from 'react'
import { getWishlist } from '../_actions/wishlist.actions';


export const wishlistContext = createContext({})

export default function WishlistContextProvider({ children }: { children: ReactNode }) {
    const [wishlistNumber, setWishlistNumber] = useState(0)
    
    async function getUserWishlist() {
        const res = await getWishlist();
        setWishlistNumber((res?.count ?? 0))
    }

    useEffect(() => {
        getUserWishlist();
    }, [])

    return (
        <wishlistContext.Provider value={{ wishlistNumber, setWishlistNumber }}>
            {children}
        </wishlistContext.Provider>
    )
}
