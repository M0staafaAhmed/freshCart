
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { Progress } from "@/components/ui/progress"
import { productType } from "@/types/product.type"
import { FaBox, FaCheck, FaRegStar, FaShieldAlt, FaStar, FaStarHalfAlt, FaTruck } from "react-icons/fa"
import { FaArrowRotateLeft } from "react-icons/fa6";

interface productInfoProps {
    product: productType | null;
}

export default function ProductInfo({ product }: productInfoProps) {

    const getRatingPercentage = (rating: number) => {
        const reviews = product?.reviews || [];
        const totalReviews = reviews.length;

        if (totalReviews === 0) return 0;

        const ratingCount = reviews.filter((r: any) => r.rating === rating).length;

        return (ratingCount / totalReviews) * 100;
    };

    return (
        <Tabs defaultValue="details" className="w-full mt-8 border border-gray-200 rounded-sm shadow-sm overflow-hidden gap-0">
            <TabsList className="w-full h-auto! justify-start! bg-transparent border-b border-gray-200 p-0 rounded-none">
                <TabsTrigger className='cursor-pointer flex-none rounded-none py-4 px-6 transition-all hover:text-green-600 hover:bg-gray-100 font-medium text-gray-600 capitalize shadow-none! data-[state=active]:text-green-600 data-[state=active]:bg-green-50 data-[state=active]:border-b-green-600 data-[state=active]:border-b-2' value="details"><FaBox />Product Details</TabsTrigger>
                <TabsTrigger className='cursor-pointer flex-none rounded-none py-4 px-6 transition-all hover:text-green-600 hover:bg-gray-100 font-medium text-gray-600 capitalize shadow-none! data-[state=active]:text-green-600 data-[state=active]:bg-green-50 data-[state=active]:border-b-green-600 data-[state=active]:border-b-2' value="reviews"><FaStar />Reviews ({product?.reviews?.length})</TabsTrigger>
                <TabsTrigger className='cursor-pointer flex-none rounded-none py-4 px-6 transition-all hover:text-green-600 hover:bg-gray-100 font-medium text-gray-600 capitalize shadow-none! data-[state=active]:text-green-600 data-[state=active]:bg-green-50 data-[state=active]:border-b-green-600 data-[state=active]:border-b-2' value="shipping"><FaTruck />Shipping & Returns</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="p-6">
                <div className="space-y-6">
                    <div>
                        <h3 className="mb-3 font-semibold text-lg">About this Product</h3>
                        <p className="text-gray-600 leading-relaxed">{product?.description}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-3">Product Information</h4>
                            <ul className="space-y-2">
                                <li className="flex justify-between text-sm">
                                    <span className="text-gray-500">Category</span>
                                    <span className="font-medium text-gray-900">{product?.category.name}</span>
                                </li>
                                <li className="flex justify-between text-sm">
                                    <span className="text-gray-500">Subcategory</span>
                                    <span className="font-medium text-gray-900">{product?.subcategory?.[0]?.name}</span>
                                </li>
                                <li className="flex justify-between text-sm">
                                    <span className="text-gray-500">Brand</span>
                                    <span className="font-medium text-gray-900">{product?.brand?.name}</span>
                                </li>
                                <li className="flex justify-between text-sm">
                                    <span className="text-gray-500">Items Sold</span>
                                    <span className="font-medium text-gray-900">{product?.sold} +sold</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-3">Key Features</h4>
                            <ul className="space-y-2">
                                <li className="flex items-center text-sm">
                                    <FaCheck className="text-green-600 mr-2 mt-1 shrink-0" />
                                    <span className="text-gray-600">Premium Quality Product</span>
                                </li>
                                <li className="flex items-center text-sm">
                                    <FaCheck className="text-green-600 mr-2 mt-1 shrink-0" />
                                    <span className="text-gray-600">100% Authentic Guarantee</span>
                                </li>
                                <li className="flex items-center text-sm">
                                    <FaCheck className="text-green-600 mr-2 mt-1 shrink-0" />
                                    <span className="text-gray-600">Fast & Secure Packaging</span>
                                </li>
                                <li className="flex items-center text-sm">
                                    <FaCheck className="text-green-600 mr-2 mt-1 shrink-0" />
                                    <span className="text-gray-600">Quality Tested</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="reviews" className="p-6">
                <div className="flex flex-col md:flex-row gap-8 items-center mb-6">
                    <div className="text-center">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-gray-900 mb-2">{product?.ratingsAverage}</div>
                        </div>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }, (_, i) => {
                                const rating = i + 1;
                                return (
                                    <span key={rating} className="text-amber-400 text-lg">
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
                        <p className="text-sm text-gray-500 mt-2">Based on {product?.reviews?.length} reviews</p>
                    </div>
                    <div className="flex-1 w-full space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm text-gray-600 w-8">5 star</span>
                            <Progress value={getRatingPercentage(5)} className="flex-1 h-2 bg-gray-200" />
                            <span className="text-sm text-gray-500 w-10">{getRatingPercentage(5).toFixed(0)}%</span>
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm text-gray-600 w-8">4 star</span>
                            <Progress value={getRatingPercentage(4)} className="flex-1 h-2 bg-gray-200" />
                            <span className="text-sm text-gray-500 w-10">{getRatingPercentage(4).toFixed(0)}%</span>
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm text-gray-600 w-8">3 star</span>
                            <Progress value={getRatingPercentage(3)} className="flex-1 h-2 bg-gray-200" />
                            <span className="text-sm text-gray-500 w-10">{getRatingPercentage(3).toFixed(0)}%</span>
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm text-gray-600 w-8">2 star</span>
                            <Progress value={getRatingPercentage(2)} className="flex-1 h-2 bg-gray-200" />
                            <span className="text-sm text-gray-500 w-10">{getRatingPercentage(2).toFixed(0)}%</span>
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm text-gray-600 w-8">1 star</span>
                            <Progress value={getRatingPercentage(1)} className="flex-1 h-2 bg-gray-200" />
                            <span className="text-sm text-gray-500 w-10">{getRatingPercentage(1).toFixed(0)}%</span>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200 pt-6">
                    <div className="text-center py-8">
                        <FaStar className="text-gray-300 text-6xl mb-4 mx-auto" />
                        <p className="text-gray-500">Customer reviews will be displayed here.</p>
                        <button className="mt-4 text-green-600 hover:text-green-700 font-medium">Write a Review</button>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="shipping" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-12 w-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl">
                                <FaTruck />
                            </div>
                            <h4 className="font-semibold text-gray-900">Shipping Information</h4>
                        </div>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-gray-700">
                                <FaCheck className="text-green-600 mt-0.5" /> 
                                <span>Free shipping on orders over $50</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-700">
                                <FaCheck className="text-green-600 mt-0.5" /> 
                                <span>Standard delivery: 3-5 business days</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-700">
                                <FaCheck className="text-green-600 mt-0.5" /> 
                                <span>Express delivery available (1-2 business days)</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-700">
                                <FaCheck className="text-green-600 mt-0.5" /> 
                                <span>Track your order in real-time</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-12 w-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl">
                                <FaArrowRotateLeft />
                            </div>
                            <h4 className="font-semibold text-gray-900">Returns & Refunds</h4>
                        </div>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-gray-700">
                                <FaCheck className="text-green-600 mt-0.5" /> 
                                <span>30-day hassle-free returns</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-700">
                                <FaCheck className="text-green-600 mt-0.5" /> 
                                <span>Full refund or exchange available</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-700">
                                <FaCheck className="text-green-600 mt-0.5" /> 
                                <span>Free return shipping on defective items</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-700">
                                <FaCheck className="text-green-600 mt-0.5" /> 
                                <span>Easy online return process</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 flex items-center gap-4">
                    <div className="h-14 w-14 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center shrink-0 text-2xl">
                        <FaShieldAlt />
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Buyer Protection Guarantee</h4>
                        <p className="text-sm text-gray-600">Get a full refund if your order doesn't arrive or isn't as described. We ensure your shopping experience is safe and secure.</p>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    )
}
