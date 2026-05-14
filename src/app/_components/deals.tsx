"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Deals() {
    const cardLeft = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
    };

    const cardRight = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
    };

    return (
        <section className="my-16"> 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <motion.div
                    variants={cardLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    className="p-8 bg-linear-to-br from-emerald-500 to-emerald-700 rounded-4xl relative overflow-hidden"
                >
                    <div className="w-40 h-40 rounded-full bg-white/10 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                    <div className="rounded-3xl py-1 px-3 bg-white/30 flex items-center gap-2 w-fit">
                        <span>🔥</span>
                        <p className="text-white font-medium text-sm">Deal of the Day</p>
                    </div>
                    <h3 className="font-bold text-3xl text-white mt-3">Fresh Organic Fruits</h3>
                    <p className="font-medium text-white/80 mt-2 mb-4">Get up to 40% off on selected organic fruits</p>
                    <div className="flex items-center gap-4">
                        <span className="font-bold text-3xl text-white">40% OFF</span>
                        <span className="font-medium text-sm text-white"><span className="text-white/80">Use code: </span>ORGANIC40</span>
                    </div>
                    <Link href={"/products"} className="py-3 px-5 mt-4 bg-white rounded-3xl font-semibold text-emerald-600 flex items-center gap-2 w-fit group transition-all hover:bg-white/95">
                        Shop Now <FaArrowRightLong className="transition-all group-hover:translate-x-1.5" />
                    </Link>
                </motion.div>

                <motion.div
                    variants={cardRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    className="p-8 bg-linear-to-br from-orange-400 to-rose-500 rounded-4xl relative overflow-hidden"
                >
                    <div className="w-40 h-40 rounded-full bg-white/10 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                    <div className="rounded-3xl py-1 px-3 bg-white/30 flex items-center gap-2 w-fit">
                        <span>✨</span>
                        <p className="text-white font-medium text-sm">New Arrivals</p>
                    </div>
                    <h3 className="font-bold text-3xl text-white mt-3">Exotic Vegetables</h3>
                    <p className="font-medium text-white/80 mt-2 mb-4">Discover our latest collection of premium vegetables</p>
                    <div className="flex items-center gap-4">
                        <span className="font-bold text-3xl text-white">25% OFF</span>
                        <span className="font-medium text-sm text-white"><span className="text-white/80">Use code: </span>FRESH25</span>
                    </div>
                    <Link href={"/products"} className="py-3 px-5 mt-4 bg-white rounded-3xl font-semibold text-orange-600 flex items-center gap-2 w-fit group transition-all hover:bg-white/95">
                        Explore Now <FaArrowRightLong className="transition-all group-hover:translate-x-1.5" />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}