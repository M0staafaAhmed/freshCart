"use client"
// import Swiper core and required modules
import { Navigation, Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import sliderImage from "@/images/home-slider.png"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from "./slider.module.css"

export default () => {


    const animation = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    return (
        <div className={styles.sliderWrapper}>
            <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            loop
            navigation
            pagination={{ clickable: true }}
        >
            <SwiperSlide>
                <div className="h-100 bg-no-repeat bg-cover bg-center relative" style={{ backgroundImage: `url(${sliderImage.src})` }}>
                    <div className="absolute inset-0 bg-linear-to-r from-green-500/90 to-green-400/50"></div>
                    <motion.div
                    variants={animation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    className="z-10 text-white relative container mx-auto flex justify-center flex-col gap-3 h-full px-4">
                        <h2 className='text-2xl md:text-3xl font-bold'>Fresh Products Delivered <br /> to your Door</h2>
                        <p>Get 20% off your first order</p>
                        <div className="flex items-center gap-2">
                            <Link href={"/products"} className='text-green-400 rounded-lg py-2 px-6 border-2 border-white font-semibold transition-all hover:scale-105 bg-white'>Shop Now</Link>
                            <Link href={"/deals"} className='rounded-lg py-2 px-6 border-2 border-white font-semibold transition-all hover:scale-105'>View Deals</Link>
                        </div>
                    </motion.div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="h-100 bg-no-repeat bg-cover bg-center relative" style={{ backgroundImage: `url(${sliderImage.src})` }}>
                    <div className="absolute inset-0 bg-linear-to-r from-green-500/90 to-green-400/50"></div>
                    <motion.div
                    variants={animation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    className="z-10 text-white relative container mx-auto flex justify-center flex-col gap-3 h-full px-4">
                        <h2 className='text-2xl md:text-3xl font-bold'>Premuim Quality <br /> Guaranteed</h2>
                        <p>Fresh from farm to your table</p>
                        <div className="flex items-center gap-2">
                            <Link href={"/products"} className='text-blue-400 rounded-lg py-2 px-6 border-2 border-white font-semibold transition-all hover:scale-105 bg-white'>Shop Now</Link>
                            <Link href={"/about"} className='rounded-lg py-2 px-6 border-2 border-white font-semibold transition-all hover:scale-105'>Learn More</Link>
                        </div>
                    </motion.div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="h-100 bg-no-repeat bg-cover bg-center relative" style={{ backgroundImage: `url(${sliderImage.src})` }}>
                    <div className="absolute inset-0 bg-linear-to-r from-green-500/90 to-green-400/50"></div>
                    <motion.div
                    variants={animation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    className="z-10 text-white relative container mx-auto flex justify-center flex-col gap-3 h-full px-4">
                        <h2 className='text-2xl md:text-3xl font-bold'>Fast & Free Delivery</h2>
                        <p>Same day delivery available</p>
                        <div className="flex items-center gap-2">
                            <Link href={"/products"} className='text-purple-400 rounded-lg py-2 px-6 border-2 border-white font-semibold transition-all hover:scale-105 bg-white'>Shop Now</Link>
                            <Link href={"/delivery"} className='rounded-lg py-2 px-6 border-2 border-white font-semibold transition-all hover:scale-105'>Delivery Info</Link>
                        </div>
                    </motion.div>
                </div>
            </SwiperSlide>
        </Swiper>
        </div>
    );
};