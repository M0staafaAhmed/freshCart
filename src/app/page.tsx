import Image from "next/image";
import Slider from "./_components/slider/slider";
import { FaApple, FaGooglePlay, FaLeaf, FaPlus, FaRegHeart, FaRegStar, FaShieldAlt, FaStar, FaStarHalfAlt, FaTag, FaTruck } from "react-icons/fa";
import { FaArrowRightLong, FaArrowRotateLeft } from "react-icons/fa6";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import Link from "next/link"
import CategoryCard from "./_components/categoryCard";
import { getCategories } from "@/services/category.service";
import Deals from "./_components/deals";
import Features from "./_components/features";
import { CiStar } from "react-icons/ci";
import { BsArrowRepeat } from "react-icons/bs";
import { FiEye } from "react-icons/fi";
import { getProducts } from "@/services/product.service";
import ProductCard from './_components/productCard/productCard';
import { IoMdMail } from "react-icons/io";
import NewsLetter from "./_components/newsLetter";
import { getMyToken } from "@/utils/getMyToken";

export default async function Home() {



  const categories = await getCategories();

  const products = await getProducts();


  return (
    <>
      <Slider />

      {/* Features Section */}
      <Features />


      <main className="container mx-auto pt-7 overflow-x-hidden overflow-y-clip">

        {/* Start Categories section */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="capitalize ps-4 font-bold text-2xl md:text-3xl relative before:h-full before:w-1.5 before:rounded-3xl before:bg-linear-to-b before:from-emerald-500 before:to-emerald-700 before:absolute before:left-0">
              shop by <span className="text-emerald-600">category</span>
            </h2>
            <Link href={"/categories"} className="flex items-center gap-3 text-emerald-600 transition-all hover:text-emerald-800 font-medium group">
              View All Categories
              <FaArrowRightLong className="transition-all group-hover:translate-x-1.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {categories?.map((category) => {
              return <CategoryCard key={category._id} category={category} />
            })}
          </div>
        </section>

        {/* Start deals section */}
        <Deals />

        {/* Start Products section */}
        <section className="my-16">
          <h2 className="capitalize mb-6 ps-4 font-bold text-2xl md:text-3xl relative before:h-full before:w-1.5 before:rounded-3xl before:bg-linear-to-b before:from-emerald-500 before:to-emerald-700 before:absolute before:left-0">
            Featured <span className="text-emerald-600">Products</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products?.map((product) => {
              return <ProductCard key={product.id} product={product} />
            })}
          </div>
        </section>

      </main>
        {/* Start contact section */}
        <section className="py-16">
          <div className="container mx-auto">
            <div className="relative">
              <NewsLetter/>
            </div>
          </div>
        </section>
    </>
  );
}
