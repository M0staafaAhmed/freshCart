import { brandType, categoryType, subCategoryType } from '@/types/product.type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaFolderOpen, FaTag } from 'react-icons/fa';

// بنعرف الـ interface عشان الـ TypeScript ميزعلش
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ searchParams }: PageProps) {

  // لازم تعمل await للـ searchParams لأنها Promise في النسخ الجديدة
  const params = await searchParams;

  async function getParent() {
    try {

      if (params.brand) {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${params.brand}`)
        const finalRes = res.json()
        return finalRes;
      } else if (params.subcategory) {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories/${params.subcategory}`)
        const finalRes = res.json()
        return finalRes;
      } else {
        return null;
      }


    } catch (error) {
      return null
    }
  }

  const parent : {data  : brandType | subCategoryType} | null = await getParent()
  
  console.log(parent)

  return (
    <>
      <div className="w-full bg-linear-to-r from-green-600 via-green-500 to-green-400 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/80 text-sm mb-6">
            <Link href={"/"} className="hover:text-white cursor-pointer transition-colors">Home</Link>
            <span>/</span>
            {params.brand && <>
              <Link href={"/brands"} className="hover:text-white cursor-pointer transition-colors">Brands</Link>
              <span>/</span>
            </>}
            {params.subcategory && <>
              <Link href={"/categories"} className="hover:text-white cursor-pointer transition-colors">categories</Link>
              <span>/</span>
            </>}
            <span className="text-white font-medium">{parent?.data?.name}</span>
          </nav>

          {/* Content Section */}
          <div className="flex items-center gap-5">
            {/* Icon Box */}
            <div className="bg-white/20 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg text-white size-16 relative flex items-center justify-center">
              {params.brand && <Image src={(parent?.data as brandType).image} alt={parent?.data.name!} fill className='object-contain'/>}
              {params.subcategory && <FaFolderOpen className='text-3xl'/>}
            </div>

            {/* Text Section */}
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {parent?.data.name}
              </h1>
              <p className="text-white/90 mt-1 font-medium">
                Browse {parent?.data.name} products
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}