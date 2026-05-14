import Link from 'next/link'
import React from 'react'
import { FaBoxOpen } from 'react-icons/fa'
import { MdArrowRightAlt } from 'react-icons/md'

export default function EmptyCart() {
  return (
    <>
    <div className="bg-gray-200 py-10 min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
            <div className="relative mb-8">
                <div className="size-32 rounded-full bg-linear-to-br from-gray-100 to-gray-50 flex items-center justify-center mx-auto text-gray-400 text-6xl">
                    <FaBoxOpen />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 my-3">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 leading-relaxed">Looks like you haven't added anything to your cart yet. <br /> Start exploring our products!</p>
                <Link href={"/"} className='inline-flex items-center gap-2 bg-linear-to-r from-green-600 to-green-700 text-white py-3.5 px-8 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg shadow-green-600/20 active:scale-[0.98]'>Start shopping <MdArrowRightAlt /></Link>
            </div>
        </div>
    </div>
    </>
  )
}
