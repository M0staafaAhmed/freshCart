"use server";
import { productType } from "@/types/product.type";
import { getMyToken } from "@/utils/getMyToken";
import { revalidateTag } from "next/cache";

interface addToWishlistType {
    status: string;
    message: string;
    data: string[];
}

export interface wishlistType {
    status: string;
    count: number;
    data: productType[];
}

export async function addToWishlist(
    productId: string,
): Promise<addToWishlistType> {
    const token = await getMyToken();

    console.log(token);

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        method: "POST", // تأكد من الـ Method المطلوبة في الـ API
        headers: {
            token: token as string,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: productId }),
    });

    const finalRes = await res.json();
    console.log(finalRes);

    return finalRes; // يفضل دائماً إرجاع النتيجة لمعرفة حالة العملية
}

export async function getWishlist(): Promise<wishlistType | null> {
    const token = await getMyToken();

    try{
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: {
            token: token as string,
        },
        next:{
            tags:["wishlist"]
        }
    });

    const finalRes = await res.json();
    console.log(finalRes);

    return finalRes; 
    }catch(error){
        return null;
    }
}


export async function removeFromWishlist(
    productId: string,
): Promise<addToWishlistType> {
    const token = await getMyToken();

    console.log(token);

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        method: "Delete", // تأكد من الـ Method المطلوبة في الـ API
        headers: {
            token: token as string,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: productId }),
    });

    const finalRes = await res.json();
    revalidateTag("wishlist" , "default")
    console.log(finalRes);

    return finalRes; // يفضل دائماً إرجاع النتيجة لمعرفة حالة العملية
}