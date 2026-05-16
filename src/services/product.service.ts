import { productType } from "@/types/product.type";

interface ProductParams {
    category?: string;
    brand?: string;
    price?: number;
    sort?: string;
    keyword?: string;
    page?: number;
    limit?: number;
    subcategory?: string;
}


export async function getProducts(params?: ProductParams): Promise<productType[] | null> {
    try {
        // 1. بناء الـ URL مع الـ Query Params
        const url = new URL("https://ecommerce.routemisr.com/api/v1/products");
        
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined) {
                    url.searchParams.append(key, value.toString());
                }
            });
        }

        const response = await fetch(url.toString(), {
            cache: "force-cache" 
        });

        const data = await response.json();
        return data.data;

    } catch (error) {
        console.error("Error fetching products:", error);
        return null;
    }
}

export async function getProductById(id: string): Promise<productType | null> {
    try {
        const response = await fetch(
            `https://ecommerce.routemisr.com/api/v1/products/${id}`,
            {
                cache: "force-cache",
            },
        );
        const data = await response.json();
        return data.data;
    } catch (error) {
        return null;
    }
}
