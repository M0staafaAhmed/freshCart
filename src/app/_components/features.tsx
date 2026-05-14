"use client"
import React from 'react'
import { FaShieldAlt, FaTruck } from 'react-icons/fa'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { TfiHeadphoneAlt } from 'react-icons/tfi'
import { motion } from 'framer-motion';

export default function Features() {

    const features = {
        hidden : { opacity: 0, y: 50 },
        visible : (i : number)=>({
            opacity : 1,
            y : 0,
            transition : {duration : 0.8, delay : i * 0.2}
        })
    }

    return (
        <section className="container mx-auto py-8 bg-gray-50 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 px-4">
            <motion.div
                initial="hidden"
                animate="visible"
                custom={0}
                variants={features}
                viewport={{once : false , amount : 0.2}}
                className="p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-white flex items-center gap-4"
            >
                <div className="rounded-full bg-blue-100 text-xl w-12 h-12 flex items-center justify-center text-blue-600">
                    <FaTruck />
                </div>
                <div>
                    <p className="font-semibold text-sm mb-1">Free Shipping</p>
                    <p className="font-medium text-gray-500 text-xs">On orders over 500 EGP</p>
                </div>
            </motion.div>
            <motion.div
                initial="hidden"
                animate="visible"
                custom={1}
                variants={features}
                viewport={{once : false , amount : 0.2}}
                className="p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-white flex items-center gap-4"
            >
                <div className="rounded-full bg-green-100 text-xl w-12 h-12 flex items-center justify-center text-green-600">
                    <FaShieldAlt />
                </div>
                <div>
                    <p className="font-semibold text-sm mb-1">Secure Payment</p>
                    <p className="font-medium text-gray-500 text-xs">100% secure transactions</p>
                </div>
            </motion.div>
            <motion.div
                initial="hidden"
                animate="visible"
                custom={2}
                variants={features}
                viewport={{once : false , amount : 0.2}}
                className="p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-white flex items-center gap-4"
            >
                <div className="rounded-full bg-orange-100 text-xl w-12 h-12 flex items-center justify-center text-orange-600">
                    <FaArrowRotateLeft />
                </div>
                <div>
                    <p className="font-semibold text-sm mb-1">Easy Returns</p>
                    <p className="font-medium text-gray-500 text-xs">14-day return policy</p>
                </div>
            </motion.div>
            <motion.div
                initial="hidden"
                animate="visible"
                custom={3}
                variants={features}
                viewport={{once : false , amount : 0.2}}
                className="p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-white flex items-center gap-4"
            >
                <div className="rounded-full bg-purple-100 text-xl w-12 h-12 flex items-center justify-center text-purple-600">
                    <TfiHeadphoneAlt />
                </div>
                <div>
                    <p className="font-semibold text-sm mb-1">24/7 Support</p>
                    <p className="font-medium text-gray-500 text-xs">Dedicated support team</p>
                </div>
            </motion.div>
        </section>
    )
}
