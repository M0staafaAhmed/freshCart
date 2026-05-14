import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaCartShopping, FaCheck, FaShield } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import { FaLock, FaMinus, FaPlus, FaShieldAlt, FaShoppingBag, FaTag, FaTruck } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { IoPricetag } from 'react-icons/io5'
import { getCart } from '../_actions/cart.actions'
import CartCard from '../_components/cart/cartCard'
import { Progress } from '@/components/ui/progress'
import ClearCartBtn from '../_components/cart/clearCartBtn'
import EmptyCart from '../_components/cart/emptyCart'

export default async function page() {


  const cartItems = await getCart();




  return (

    <>

      {(cartItems?.numOfCartItems ?? 0) <= 0 ?
        <EmptyCart />
        :
        <div className="bg-gray-100 py-10">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Link className="hover:text-green-600 transition" href="/">Home</Link>
                <span>/</span>
                <span className="text-gray-900 font-medium">Shopping Cart</span>
              </nav>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="bg-linear-to-r from-green-600 to-green-700 text-white w-12 h-12 rounded-xl flex items-center justify-center">
                    <FaCartShopping />
                  </div>
                  Shopping Cart
                </h1>
                <p className="text-gray-500 mt-2">You have <span className="font-semibold text-green-600">{cartItems?.numOfCartItems} item</span> in your cart</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {/* card */}
                  {cartItems?.data.products.map((product) => {
                    return <CartCard key={product._id} product={product} />
                  })}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                  <Link className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-2" href="/">
                    <span>←</span>
                    Continue Shopping
                  </Link>
                  <ClearCartBtn />
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-24 shadow-sm">
                  <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2"><FaShoppingBag />Order Summary</h2>
                    <p className="text-green-100 text-sm mt-1">{cartItems?.numOfCartItems} items in your cart</p>
                  </div>
                  <div className="p-6 space-y-5">

                    {(cartItems?.data.totalCartPrice ?? 0) >= 500 ?
                      <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600"><FaTruck /></div>
                        <div>
                          <p className="font-semibold text-green-700">Free Shipping!</p>
                          <p className="text-sm text-green-600">You qualify for free delivery</p>
                        </div>
                      </div>
                      :
                      <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FaTruck className='text-orange-600' />
                          <span className="text-sm font-medium text-gray-700">Add {500 - (cartItems?.data?.totalCartPrice ?? 0)} EGP for free shipping</span>
                        </div>
                        <Progress
                          value={((cartItems?.data?.totalCartPrice ?? 0) / 500) * 100}
                          className='h-2'
                        />
                      </div>
                    }
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-medium text-gray-900">{cartItems?.data.totalCartPrice} EGP</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        {(cartItems?.data.totalCartPrice ?? 0) >= 500 ?
                          <span className="font-medium text-green-600">Free</span>
                          :
                          <span className="font-medium text-gray-900">50 EGP</span>
                        }
                      </div>
                      <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
                        <div className="flex justify-between items-baseline">
                          <span className="text-gray-900 font-semibold">Total</span>
                          <div className="text-right">
                            <span className="text-2xl font-bold text-gray-900">{(cartItems?.data.totalCartPrice ?? 0) >= 500 ? cartItems?.data.totalCartPrice : (cartItems?.data.totalCartPrice ?? 0) + 50}</span>
                            <span className="text-sm text-gray-500 ml-1">EGP</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button className="bg-transparent cursor-pointer h-auto w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-green-400 hover:text-green-600 hover:bg-green-50/50 transition-all">
                      <FaTag />
                      <span className="text-sm font-medium">Apply Promo Code</span>
                    </Button>
                    <Link className="w-full bg-linear-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-600/20 active:scale-[0.98]" href="/checkout">
                      <FaLock />
                      <span>Secure Checkout</span>
                    </Link>
                    <div className="flex items-center justify-center gap-4 py-2">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <FaShieldAlt className='text-green-600 text-sm' />
                        <span>Secure Payment</span>
                      </div>
                      <div className="w-px h-4 bg-gray-200"></div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <FaTruck className='text-blue-600 text-sm' />
                        <span>Fast Delivery</span>
                      </div>
                    </div>
                    <Link className="block text-center text-green-600 hover:text-green-700 text-sm font-medium py-2" href="/">← Continue Shopping</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      }

    </>
  )
}
