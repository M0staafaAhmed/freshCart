"use server";
import { productType } from "@/types/product.type";
import { getMyToken } from "@/utils/getMyToken";
import { revalidateTag } from 'next/cache';

export interface cartType {
  status: string;
  message: string;
  numOfCartItems: number; // في TS بنستخدم number (صغيرة) وليس Number
  cartId: string;
  data: {
    _id: string;
    cartOwner: string;
    products: CartProduct[];
    totalCartPrice: number;
  };
}

export interface CartProduct {
  _id: string;
  count: number;
  price: number;
  product: productType; // تأكد إن ProductType متعرفة عندك برضه
}

export async function addToCart(productId: string): Promise<cartType> {
  const token = await getMyToken();

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
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

export async function getCart() : Promise<cartType | null> {
  const token = await getMyToken();

  try{
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    headers: {
      token: token as string,
    },
    next: {
      tags: ["getCart"],
    }
    
  });

  const finalRes = await res.json();
  console.log(finalRes);

  return finalRes;
  }catch(error){
    return null;
  } 
}

export async function updateCartProduct(count : Number, productId : string) : Promise<cartType>{
  const token = await getMyToken();

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
    method: "PUT", // تأكد من الـ Method المطلوبة في الـ API
    headers: {
      token: token as string,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ count: count }),
  });

  const finalRes = await res.json();

  revalidateTag('getCart' , "default")

  return finalRes;
}


export async function deleteProductFromCart(productId : string) : Promise<cartType>{
  const token = await getMyToken();

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
    method: "Delete",
    headers: {
      token: token as string,
    }
  });

  const finalRes = await res.json();

  revalidateTag('getCart' , "default")

  return finalRes;
}


export async function clearCart() : Promise<cartType>{
  const token = await getMyToken();

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    method: "Delete",
    headers: {
      token: token as string,
    }
  });

  const finalRes = await res.json();

  revalidateTag('getCart' , "default")

  return finalRes;
}


export async function createCashOrder(cartId : string , shippingAddress : {}) {
  const token = await getMyToken();

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cartId}`, {
    method: "POST", // تأكد من الـ Method المطلوبة في الـ API
    headers: {
      token: token as string,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shippingAddress: shippingAddress }),
  });

  const finalRes = await res.json();
  console.log(finalRes);

  return finalRes;
}


export async function createVisaOrder(cartId : string , shippingAddress : {}) {
  const token = await getMyToken();

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
    method: "POST", // تأكد من الـ Method المطلوبة في الـ API
    headers: {
      token: token as string,
    },
    body: JSON.stringify({ shippingAddress: shippingAddress }),
  });

  const finalRes = await res.json();
  console.log(finalRes);

  return finalRes;
}

