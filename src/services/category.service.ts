import { categoryType } from "@/types/product.type";

export async function getCategories() : Promise<categoryType[] | null> {
    try {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories",
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