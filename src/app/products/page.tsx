import { getProducts } from '@/services/product.service';
import { brandType, categoryType, subCategoryType } from '@/types/product.type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaBox, FaBoxOpen, FaFilter, FaFolderOpen, FaLayerGroup, FaTag, FaTags } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import ProductCard from '../_components/productCard/productCard';
import { redirect } from 'next/navigation';

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
      } else if (params.category) {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${params.category}`)
        const finalRes = res.json()
        return finalRes;
      } else {
        return null;
      }
    } catch (error) {
      return null
    }
  }

  const products = await getProducts(params);

  console.log(products)


  const parent: { data: brandType | subCategoryType | categoryType } | null = await getParent()

  if (((parent as any)?.message) === "fail") {
    redirect("/404")
  }

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
            {(params.subcategory || params.category) && <>
              <Link href={"/categories"} className="hover:text-white cursor-pointer transition-colors">categories</Link>
              <span>/</span>
            </>}
            {params.category && <>
              <Link href={`/categories/${parent?.data._id}`} className="hover:text-white cursor-pointer transition-colors">{parent?.data.name}</Link>
              <span>/</span>
            </>}
            {parent ?
              <span className="text-white font-medium">{parent?.data?.name}</span>
              :
              <span className="text-white font-medium">All Products</span>
            }
          </nav>

          {/* Content Section */}
          <div className="flex items-center gap-5">
            {/* Icon Box */}
            <div className="bg-white/20 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg text-white size-16 p-2 flex items-center justify-center">
              {parent ?
                <>
                  {params.brand && <div className="relative w-full h-full"><Image src={(parent?.data as brandType).image} alt={parent?.data.name!} fill className='object-contain' /></div>}
                  {params.category && <div className="relative w-full h-full"><Image src={(parent?.data as categoryType).image} alt={parent?.data.name!} fill className='object-contain' /></div>}
                  {params.subcategory && <FaFolderOpen className='text-3xl' />}
                </>
                :
                <FaBoxOpen className='text-3xl' />
              }

            </div>

            {/* Text Section */}
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {parent ?
                  <>
                    {parent?.data.name}

                  </>
                  :
                  <>All Products</>
                }
              </h1>
              <p className="text-white/90 mt-1 font-medium">
                {parent ?
                  <>Browse {parent?.data.name} products</>
                  :
                  <>Explore our complete product collection</>
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8 bg-gray-50">
        <div className="container mx-auto">
          {Object.keys(params).length > 0 &&
            <div className="mb-6 flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaFilter />
                Active Filters:
              </div>
              <Link href={"/products"} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full  text-sm font-medium ${params.brand ? "bg-violet-100 text-violet-700 hover:bg-violet-200" : "bg-green-100 text-green-700 hover:bg-green-200"} transition-colors`}>
                {params.brand ?
                  <FaTags />
                  :
                  <FaLayerGroup />
                }
                {parent?.data.name}
                <FaXmark />
              </Link>
              <Link className="text-sm text-gray-500 hover:text-gray-700 underline" href="/products">Clear all</Link>
            </div>
          }
          {(products?.length ?? 0) > 0 && <div className="mb-6 text-sm text-gray-500">Showing {(products?.length ?? 0)} products</div>}
          {(products?.length ?? 0) > 0 ?
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            :
            <div className="flex flex-col items-center justify-center min-h-100 p-6 text-center w-full">

              {/* أيقونة الصندوق الفاضي الرمادية */}
              <div className="bg-gray-100 p-6 rounded-full mb-6 flex items-center justify-center size-24">
                <FaBox size={44} className="text-gray-400" />
              </div>

              {/* النصوص */}
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                No Products Found
              </h2>
              <p className="text-gray-500 mb-6 max-w-xs text-sm">
                No products match your current filters.
              </p>

              {/* الزر الأخضر لإعادة تعيين الفلاتر */}
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
              >
                View All Products
              </Link>
            </div>
          }
        </div>
      </div>
    </>
  )
}