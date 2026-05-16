import { getProductById } from '@/services/product.service';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import React from 'react'
import Link from 'next/link';
import { AiFillHome } from 'react-icons/ai';
import { FaHeart, FaRegStar, FaShieldAlt, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { FaArrowRotateLeft, FaRegHeart, FaShareNodes, FaTruckFast } from "react-icons/fa6";
import Slider from '@/app/_components/productComponents/productSlider/slider';
import { Metadata } from 'next';
import ProductCount from '@/app/_components/productComponents/productCount';
import ProductInfo from '@/app/_components/productComponents/productInfo';
import RelatedProducts from '@/app/_components/productComponents/relatedProducts';
import { redirect } from 'next/navigation';


interface productPageProps{
  params: Promise<{id : string}>
}

export async function generateMetadata({ params }: productPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  return {
    title: product?.title || "Product Details", // اسم المنتج سيكون هو العنوان
    description: product?.description?.slice(0, 160), // اختياري: إضافة وصف لتحسين SEO
  }
}


export default async function page({ params }: productPageProps) {

  const { id } = await params;

  const product = await getProductById(id);

  if (!product){
    redirect("/404")
    return <></>;
  }


  return (
    <>
      <div className="container mx-auto py-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className='transition-all hover:text-green-600! flex items-center gap-1 font-medium text-sm'><AiFillHome />Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/categories/${product?.category._id}`} className='transition-all hover:text-green-600! flex items-center gap-1 font-medium text-sm'>{product?.category.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/categories/${product?.category._id}/${product?.subcategory?.[0]?._id}`} className='transition-all hover:text-green-600! flex items-center gap-1 font-medium text-sm'>{product?.subcategory?.[0]?.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product?.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <section id='product-details' className='my-4'>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
                <Slider images={product?.images} />
              </div>
            </div>

            <div className="md:w-3/4">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Link className="bg-green-50 text-green-700 text-xs px-3 py-1.5 rounded-full hover:bg-green-100 transition" href={`/categories/${product?.category._id}`}>{product?.category.name}</Link>
                  <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">{product?.brand.name}</span>
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">{product?.title}</h1>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => {
                      const rating = i + 1;
                      return (
                        <span key={rating} className="text-amber-400">
                          {rating <= Math.floor(product?.ratingsAverage ?? 0) ? (
                            <FaStar />
                          ) : rating - 0.5 <= (product?.ratingsAverage ?? 0) ? (
                            <FaStarHalfAlt />
                          ) : (
                            <FaRegStar />
                          )}
                        </span>
                      );
                    })}
                  </div>
                  <span className="text-sm text-gray-600">{product?.ratingsAverage} ({product?.reviews?.length} reviews)</span>
                </div>
                <div className="flex items-center flex-wrap gap-3 mb-6">
                  {product?.priceAfterDiscount ? <>
                    <span className="text-3xl font-bold text-gray-900">{product?.priceAfterDiscount} EGP</span>
                    <span className="text-lg text-gray-400 line-through">{product.price} EGP</span>
                    <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">Save {Math.floor(((product.price - product.priceAfterDiscount) / product.price) * 100)}%</span>
                  </> : <span className="text-3xl font-bold text-gray-900">{product?.price} EGP</span>}
                </div>
                <div className="border-t border-gray-100 pt-5 mb-6">
                  <p className="text-gray-600 leading-relaxed">{product?.description}</p>
                </div>
                <ProductCount price={product?.priceAfterDiscount ? product.priceAfterDiscount : product?.price} quantity={product?.quantity} productId={product?.id}/>
                <div className="flex items-center gap-3 my-6">
                  <button className="flex-1 py-3 px-4 rounded-xl border-2 border-gray-200 font-medium text-gray-600 hover:text-green-400 hover:border-green-400 transition-all flex items-center justify-center gap-2 cursor-pointer"><FaRegHeart /> Add to Wishlist</button>
                  <button className="py-4 px-4 rounded-xl border-2 border-gray-200 font-medium text-gray-600 hover:text-green-400 hover:border-green-400 transition-all flex items-center justify-center gap-2 cursor-pointer"><FaShareNodes /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                      <FaTruckFast />
                    </div>
                    <div>
                      <h4 className='text-sm font-medium'>Fast Delivery</h4>
                      <p className="text-xs text-gray-500 font-medium">Orders over $50</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                      <FaArrowRotateLeft />
                    </div>
                    <div>
                      <h4 className='text-sm font-medium'>30 Days Return</h4>
                      <p className="text-xs text-gray-500 font-medium">Money back</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                      <FaShieldAlt />
                    </div>
                    <div>
                      <h4 className='text-sm font-medium'>Secure Payment</h4>
                      <p className="text-xs text-gray-500 font-medium">100% Protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ProductInfo product={product}/>
        <RelatedProducts categoryId={product?.category?._id} />
      </div>
    </>
  )
}
