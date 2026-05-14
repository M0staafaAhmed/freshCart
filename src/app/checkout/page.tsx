"use client"
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FaArrowRotateLeft, FaBagShopping, FaCheck, FaShieldHalved } from "react-icons/fa6";
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { BsTelephoneFill } from 'react-icons/bs'
import { FaBox, FaCity, FaCreditCard, FaMapPin, FaMoneyBill, FaReceipt, FaTruck, FaWallet } from 'react-icons/fa'
import { FaCartShopping, FaArrowLeftLong, FaHouse, FaCircleInfo, FaLocationDot } from 'react-icons/fa6'
import { IoMdMail } from 'react-icons/io'
import test from "@/images/review-image.png"
import { cartType, createCashOrder, createVisaOrder, getCart } from '../_actions/cart.actions'
import CheckoutSkeleton from './loading'
import Image from 'next/image'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addressSchema } from './address.schema'
import * as z from "zod";
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { cartContext } from '../_context/cartContextProvider'


export default function page() {
    const { setCartNumber } = useContext(cartContext)
    const [paymentType, setPaymentType] = useState("cash")
    const [cartItems, setCartItems] = useState<cartType | null>(null);
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    async function handleGetCart() {
        const cart = await getCart()
        if (!cart?.cartId) {
            router.push("/orders")
        }
        setCartItems(cart)
        setIsLoading(false);
    }

    const { handleSubmit, control } = useForm({
        defaultValues: {
            postalCode: '',
            city: '',
            details: '',
            phone: ''
        },
        resolver: zodResolver(addressSchema),
    })

    async function handleCreateOrder(data: z.infer<typeof addressSchema>) {
        const address = {
            shippingAddress: data
        }

        if (paymentType === "cash") {
            const res = await createCashOrder(cartItems?.cartId as string, address)
            if (res.status === "success") {
                toast.success(res.message)
                setCartNumber(0)
                router.push("/allorders")
            } else {
                toast.error("Something went error")
            }
        } else {
            const res = await createVisaOrder(cartItems?.cartId as string, address)
            if (res.status === "success") {
                router.push(res.session.url)
            } else {
                toast.error("Something went error")
            }
        }
    }

    useEffect(() => {
        handleGetCart();
    }, [])

    if (isLoading) {
        return <CheckoutSkeleton />
    }

    return (
        <div className="bg-gray-100 py-10">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Link className="hover:text-green-600 transition" href="/">Home</Link>
                        <span>/</span>
                        <Link className="hover:text-green-600 transition" href="/cart">cart</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">Checkout</span>
                    </nav>
                    <div className="flex items-center justify-between flex-wrap">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                <div className="bg-linear-to-r from-green-600 to-green-700 text-white w-12 h-12 rounded-xl flex items-center justify-center">
                                    <FaReceipt />
                                </div>
                                Complete Your Order
                            </h1>
                            <p className="text-gray-500 mt-2">Review your items and complete your purchase</p>
                        </div>
                        <Link className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-50 transition-all group" href="/cart"> <FaArrowLeftLong className="group-hover:-translate-x-1 transition-all" /> Back to Cart</Link>
                    </div>
                </div>
                <form onSubmit={handleSubmit(handleCreateOrder)}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                                <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
                                    <h2 className="text-lg font-bold text-white flex items-center gap-2"><FaHouse />Shipping Address</h2>
                                    <p className="text-green-100 text-sm mt-1">Where should we deliver your order?</p>
                                </div>
                                <div className="p-6 space-y-5">
                                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0"><FaCircleInfo /></div>
                                        <div>
                                            <p className="text-sm text-blue-800 font-medium">Delivery Information</p>
                                            <p className="text-xs text-blue-600 mt-0.5">Please ensure your address is accurate for smooth delivery</p>
                                        </div>
                                    </div>
                                    <Controller
                                        name="city"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel className='flex gap-1' htmlFor={field.name}>City <span className='text-red-600'>*</span></FieldLabel>
                                                <div className='relative flex items-center'>
                                                    {/* The Icon */}
                                                    <div className="flex items-center justify-center size-8 bg-gray-100 rounded-lg absolute left-3 text-gray-400 text-lg">
                                                        <FaCity />
                                                    </div>

                                                    <Input
                                                        {...field}
                                                        id={field.name}
                                                        aria-invalid={fieldState.invalid}
                                                        placeholder="e.g. Cairo, Alexandria, Giza"
                                                        type='text'
                                                        required
                                                        className='w-full pl-14 py-3.5 pr-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500! transition-all focus:ring-0!'
                                                    />
                                                </div>
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                            </Field>
                                        )}
                                    />
                                    <Controller
                                        name="details"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel className='flex gap-1' htmlFor={field.name}>Street Address <span className='text-red-600'>*</span></FieldLabel>
                                                <div className='relative flex'>
                                                    {/* The Icon */}
                                                    <div className="flex items-center justify-center size-8 bg-gray-100 rounded-lg absolute left-3 top-3 text-gray-400 text-lg">
                                                        <FaLocationDot />
                                                    </div>

                                                    <Textarea
                                                        {...field}
                                                        id={field.name}
                                                        aria-invalid={fieldState.invalid}
                                                        placeholder="Street name, building number, floor, apartment..."
                                                        required
                                                        className='resize-none min-h-24 w-full pl-14 py-3.5 pr-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500! transition-all focus:ring-0!'
                                                    />
                                                </div>
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                            </Field>
                                        )}
                                    />
                                    <Controller
                                        name="phone"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel className='flex gap-1' htmlFor={field.name}>Phone Number <span className='text-red-600'>*</span></FieldLabel>
                                                <div className='relative flex items-center'>
                                                    {/* The Icon */}
                                                    <div className="flex items-center justify-center size-8 bg-gray-100 rounded-lg absolute left-3 text-gray-400 text-lg">
                                                        <BsTelephoneFill />
                                                    </div>

                                                    <Input
                                                        {...field}
                                                        id={field.name}
                                                        aria-invalid={fieldState.invalid}
                                                        placeholder="01xxxxxxxxx"
                                                        type='tel'
                                                        required
                                                        className='w-full pl-14 py-3.5 pr-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500! transition-all focus:ring-0!'
                                                    />
                                                    <div className="absolute right-3 text-gray-400 text-xs font-medium">
                                                        Egyptian numbers only
                                                    </div>
                                                </div>
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                            </Field>
                                        )}
                                    />
                                    <Controller
                                        name="postalCode"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel className='flex gap-1' htmlFor={field.name}>Zip Code <span className='text-red-600'>*</span></FieldLabel>
                                                <div className='relative flex items-center'>
                                                    {/* The Icon */}
                                                    <div className="flex items-center justify-center size-8 bg-gray-100 rounded-lg absolute left-3 text-gray-400 text-lg">
                                                        <FaMapPin />
                                                    </div>

                                                    <Input
                                                        {...field}
                                                        id={field.name}
                                                        aria-invalid={fieldState.invalid}
                                                        placeholder="12345"
                                                        type='text'
                                                        required
                                                        className='w-full pl-14 py-3.5 pr-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500! transition-all focus:ring-0!'
                                                    />
                                                </div>
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                            </Field>
                                        )}
                                    />
                                </div>

                            </div>
                            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                                <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
                                    <h2 className="text-lg font-bold text-white flex items-center gap-2"><FaWallet />Payment Method</h2>
                                    <p className="text-green-100 text-sm mt-1">Choose how you'd like to pay</p>
                                </div>
                                <div className="p-6 space-y-5">
                                    <Button type="button" onClick={() => { setPaymentType("cash") }} className={`w-full h-auto bg-transparent cursor-pointer p-5 rounded-xl border-2 transition-all flex items-center gap-4  ${paymentType === "cash" ? "border-green-600 bg-linear-to-r from-green-50 to-emerald-50 shadow-sm" : "hover:border-green-200 hover:bg-gray-50 group border-gray-200"}`}>
                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all  ${paymentType === "cash" ? "bg-linear-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"}`}>
                                            <FaMoneyBill className='text-3xl! w-auto! h-auto!' />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <h3 className={`font-bold ${paymentType === "cash" ? "text-green-700" : "text-gray-900"}`}>Cash on Delivery</h3>
                                            <p className="text-sm text-gray-500 mt-0.5">Pay when your order arrives at your doorstep</p>
                                        </div>
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${paymentType === "cash" ? "text-white bg-green-600" : "border-2 border-gray-200"}`}>
                                            {paymentType === "cash" && <FaCheck />}
                                        </div>
                                    </Button>
                                    <Button type="button" onClick={() => { setPaymentType("visa") }} className={`w-full h-auto bg-transparent cursor-pointer p-5 rounded-xl border-2 transition-all flex items-center gap-4  ${paymentType === "visa" ? "border-green-600 bg-linear-to-r from-green-50 to-blue-50 shadow-sm" : "hover:border-green-200 hover:bg-gray-50 group border-gray-200"}`}>
                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all  ${paymentType === "visa" ? "bg-linear-to-br from-green-500 to-blue-600 text-white shadow-lg shadow-green-500/30" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"}`}>
                                            <FaCreditCard className='text-3xl! w-auto! h-auto!' />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <h3 className={`font-bold ${paymentType === "visa" ? "text-green-700" : "text-gray-900"}`}>Pay Online</h3>
                                            <p className="text-sm text-gray-500 mt-0.5">Secure payment with Credit/Debit Card via Stripe</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <img alt="Visa" className="h-5" src="https://img.icons8.com/color/48/visa.png" />
                                                <img alt="Mastercard" className="h-5" src="https://img.icons8.com/color/48/mastercard.png" />
                                                <img alt="Amex" className="h-5" src="https://img.icons8.com/color/48/amex.png" />
                                            </div>

                                        </div>
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${paymentType === "visa" ? "text-white bg-green-600" : "border-2 border-gray-200"}`}>
                                            {paymentType === "visa" && <FaCheck />}
                                        </div>
                                    </Button>
                                    <div className="flex items-center gap-3 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 mt-4">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0 text-green-600">
                                            <FaShieldHalved />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-green-800">Secure &amp; Encrypted</p>
                                            <p className="text-xs text-green-600 mt-0.5">Your payment info is protected with 256-bit SSL encryption</p>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-18">

                                {/* Header */}
                                <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
                                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                        <FaBagShopping className="text-xl" />
                                        Order Summary
                                    </h2>
                                    <p className="text-green-100 text-sm mt-1">{cartItems?.numOfCartItems} items</p>
                                </div>

                                <div className="p-5">
                                    {/* Items List */}
                                    <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1 custom-scrollbar">
                                        {cartItems?.data.products.map((product) => {
                                            return <div key={product.product.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                                <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0 relative">
                                                    <Image
                                                        alt={product.product.title}
                                                        fill
                                                        className="object-contain"
                                                        src={product.product.imageCover}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{product.product.title}</p>
                                                    <p className="text-xs text-gray-500 mt-0.5">{product.count} × {product.price} EGP</p>                                            </div>
                                                <p className="text-sm font-bold text-gray-900 shrink-0">{product.count * product.price}</p>
                                            </div>
                                        })}
                                    </div>

                                    <hr className="border-gray-100 my-4" />

                                    {/* Pricing Details */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal</span>
                                            <span className="font-medium">{cartItems?.data.totalCartPrice} EGP</span>
                                        </div>

                                        <div className="flex justify-between text-gray-600">
                                            <span className="flex items-center gap-2">
                                                <FaTruck className="text-gray-400" />
                                                Shipping
                                            </span>
                                            {(cartItems?.data.totalCartPrice ?? 0) >= 500 ?
                                                <span className="font-medium text-green-600">Free</span>
                                                :
                                                <span className="font-medium text-gray-900">50 EGP</span>
                                            }
                                        </div>

                                        <hr className="border-gray-100" />

                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-gray-900">Total</span>
                                            <div className="text-right">
                                                <span className="text-2xl font-bold text-green-600">{(cartItems?.data.totalCartPrice ?? 0) >= 500 ? cartItems?.data.totalCartPrice : (cartItems?.data.totalCartPrice ?? 0) + 50}</span>
                                                <span className="text-sm text-gray-500 ml-1">EGP</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Checkout Button */}
                                    <Button
                                        type="submit"
                                        className="w-full h-auto cursor-pointer mt-6 bg-linear-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all shadow-lg shadow-green-600/20 active:scale-[0.98] flex items-center justify-center gap-2"
                                    >
                                        {paymentType === "cash" ?
                                            <>
                                                <FaBox />
                                                Place Order
                                            </>
                                            :
                                            <>
                                                <FaShieldHalved />
                                                Proceed to Payment
                                            </>
                                        }
                                    </Button>

                                    {/* Trust Badges */}
                                    <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <FaShieldHalved className="text-green-500" />
                                            <span>Secure</span>
                                        </div>
                                        <div className="w-px h-4 bg-gray-200" />
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <FaTruck className="text-blue-500" />
                                            <span>Fast Delivery</span>
                                        </div>
                                        <div className="w-px h-4 bg-gray-200" />
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <FaArrowRotateLeft className="text-orange-500" />
                                            <span>Easy Returns</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
