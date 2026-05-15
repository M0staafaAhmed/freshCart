import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowRight, FaTag } from 'react-icons/fa6'
import test from "@/images/review-image.png"
import { categoryType, subCategoryType } from '@/types/product.type'
import { FaArrowLeft, FaFolderOpen, FaLongArrowAltLeft } from 'react-icons/fa'
import {  redirect } from 'next/navigation'

interface subCategoryRes {
    results: number,
    data: subCategoryType[]
}

interface categoryRes {
    data: categoryType
    message?: string
}

interface subCatPageProps {
    params: Promise<{ id: string }>
}




export default async function page({ params }: subCatPageProps) {

    const { id } = await params;

    async function getsubCategories(): Promise<subCategoryRes | null> {
        try {
            const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,);

            const finalres = await res.json();
            return finalres;

        } catch (error) {
            console.error("Fetch Error (getsubCategories):", error);
            return null;
        }
    }

    async function getParentCategory(): Promise<categoryRes | null> {
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

    const subCategories = await getsubCategories();
    const parentCategory = await getParentCategory();

    if (!parentCategory || parentCategory.message === "fail") {
        redirect("/404")
    }





    return (
        <>
            <div className="w-full bg-linear-to-r from-green-600 via-green-500 to-green-400 text-white">
                <div className="container mx-auto px-4 py-12 sm:py-16">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-white/80 text-sm mb-6">
                        <Link href={"/"} className="hover:text-white cursor-pointer transition-colors">Home</Link>
                        <span>/</span>
                        <Link href={"/categories"} className="hover:text-white cursor-pointer transition-colors">categories</Link>
                        <span>/</span>
                        <span className="text-white font-medium">{parentCategory?.data.name}</span>
                    </nav>

                    {/* Content Section */}
                    <div className="flex items-center gap-5">
                        {/* Icon Box */}
                        <div className="bg-white/20 size-20 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg relative overflow-hidden">
                            {parentCategory?.data.image && (
                                <Image
                                    src={parentCategory?.data?.image ?? "/placeholder.png"} // الـ ?? بتضمن إن النوع يفضل string دايماً
                                    alt={parentCategory?.data?.name ?? "category"}
                                    fill
                                    className='object-cover'
                                    priority
                                />
                            )}
                        </div>

                        {/* Text Section */}
                        <div className="flex flex-col">
                            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                                {parentCategory?.data.name}
                            </h1>
                            <p className="text-white/90 mt-1 font-medium">
                                Choose a subcategory to browse products
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto py-8">
                <Link className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors mb-6" href="/categories">
                    <FaLongArrowAltLeft />
                    <span>Back to Categories</span>
                </Link>

                {(subCategories?.results ?? 0) <= 0 ?

                    <div>
                        <div className="min-h-100">
                            <div className="flex items-center justify-center flex-col">

                                {/* الأيقونة الرمادية */}
                                <div className="bg-gray-100 p-6 rounded-full mb-6">
                                    <FaFolderOpen size={48} className="text-gray-400" />
                                </div>

                                {/* النصوص */}
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    No Subcategories Found
                                </h2>
                                <p className="text-gray-500 mb-8 max-w-sm">
                                    This category doesn't have any subcategories yet.
                                </p>

                                {/* الزر الأخضر */}
                                <Link
                                    href={`/products?category=${id}`}
                                    className="bg-[#10b981] hover:bg-[#059669] text-white font-medium py-3 px-8 rounded-lg transition-all shadow-sm"
                                >
                                    View All Products in {parentCategory?.data.name}
                                </Link>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900">{subCategories?.results} Subcategories in Men's Fashion</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {subCategories?.data.map((subCat) => {
                                return <Link key={subCat._id} href={`/products?subcategory=${subCat._id}`} className='group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-green-200 transition-all duration-300 hover:-translate-y-1'>
                                    <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors text-green-600 text-3xl">
                                        <FaFolderOpen />
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-lg group-hover:text-green-600 transition-colors mb-2">{subCat.name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <span>Browse Products</span>
                                        <FaArrowRight />
                                    </div>
                                </Link>
                            })}
                        </div>
                    </div>

                }




            </div>
        </>
    )
}
