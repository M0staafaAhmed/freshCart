export interface categoryType {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface subCategoryType {
    _id: string;
    name: string;
    slug: string;
    category: string;
}

export interface brandType {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface productType {
    sold: number;
    images: string[];
    ratingsQuantity: number;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    priceAfterDiscount?: number;
    imageCover: string;
    category: categoryType;
    subcategory?: subCategoryType[];
    brand: brandType;
    ratingsAverage: number;
    id: string;
    reviews?: reviewType[];
}

interface reviewType{
    _id: string;
    review: string;
    rating: number;
    product: string;
    user: {
        _id: string;
        name: string;
    };
}
