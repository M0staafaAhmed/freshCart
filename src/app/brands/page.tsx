import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowRight, FaTag } from 'react-icons/fa6'
import test from "@/images/review-image.png"
import { brandType } from '@/types/product.type'

interface brandRes {
  data: brandType[]
}

export default async function page() {

  async function getBrands(): Promise<brandRes | null> {
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands",);

      const finalres = await res.json();
      return finalres;

    } catch (error) {
      console.error("Fetch Error (getBrands):", error);
      return null;
    }
  }

  const brands = await getBrands();



  return (
    <>
      <div className="w-full bg-linear-to-r from-violet-600 via-violet-500 to-purple-400 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/80 text-sm mb-6">
            <Link href={"/"} className="hover:text-white cursor-pointer transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Brands</span>
          </nav>

          {/* Content Section */}
          <div className="flex items-center gap-5">
            {/* Icon Box */}
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg">
              <FaTag size={32} className="text-white fill-white" />
            </div>

            {/* Text Section */}
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Top Brands
              </h1>
              <p className="text-white/90 mt-1 font-medium">
                Shop from your favorite brands
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {brands?.data.map((brand) => {
            return <Link key={brand._id} href={`products?brand=${brand._id}`}>
              <div className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-xl hover:border-violet-200 transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3 p-4 flex items-center justify-center relative">
                  <Image src={brand.image} alt={brand.name} fill className='object-contain group-hover:scale-110 transition-transform duration-500' />
                </div>
                <h3 className="font-semibold text-gray-900 text-center text-sm group-hover:text-violet-600 transition-colors truncate">{brand.name}</h3>
                <div className="flex justify-center mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-xs text-violet-600 flex items-center gap-1">
                    View Products
                    <FaArrowRight />
                  </span>
                </div>
              </div>
            </Link>
          })}
        </div>
      </div>
    </>
  )
}
