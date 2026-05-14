import { productType } from "@/types/product.type";

export async function getProducts() : Promise<productType[] | null> {
    try {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/products",
            {
                cache: "force-cache"
            }
        );
        const data = await response.json();
        return data.data;
    } catch (error) {
        return null;
    }
}

export async function getProductById(id : string) : Promise<productType | null>{
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`,
            {
                cache: "force-cache"
            }
        );
        const data = await response.json();
        return data.data;
    } catch (error) {
        return null;
    }
}