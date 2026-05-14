import Image from 'next/image'
import Link from 'next/link'
import test from "@/images/home-slider.png"
import { categoryType } from '@/types/product.type'

interface categoryCardPropsType {
    category: categoryType
}

export default function CategoryCard({ category }: categoryCardPropsType) {
    return (
        <Link href={`/categories/${category._id}`} className="p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-white text-center ">
            <div className="w-20 h-20 relative mb-2 rounded-full mx-auto overflow-hidden">
                <Image src={category.image} alt={category.name} fill className="object-cover" />
            </div>
            <p className="font-medium text-sm wrap-break-word line-clamp-2">{category.name}</p>
        </Link>
    )
}
