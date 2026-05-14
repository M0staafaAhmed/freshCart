"use client"
import React, {
    createContext,
    ReactNode,
    useEffect,
    useState,
} from "react";

import { getCart } from "../_actions/cart.actions";

type CartContextType = {
    cartNumber: number;
    setCartNumber: React.Dispatch<React.SetStateAction<number>>;
};

export const cartContext = createContext<CartContextType>(
    {} as CartContextType
);

export default function CartContextProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [cartNumber, setCartNumber] = useState(0);

    async function getUserCart() {
        const res = await getCart();

        setCartNumber(res?.numOfCartItems || 0);
    }

    useEffect(() => {
        getUserCart();
    }, []);

    return (
        <cartContext.Provider value={{ cartNumber, setCartNumber }}>
            {children}
        </cartContext.Provider>
    );
}