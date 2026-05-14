"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import loginImage from '@/assets/images/login-image.png'
import { FaClock, FaEye, FaFacebook, FaGoogle, FaShieldAlt, FaStar, FaTruck, FaUsers } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from './login.schema'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { MdPersonAddAlt1 } from 'react-icons/md'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { IoMdMail } from 'react-icons/io'
import { IoLockClosedSharp } from 'react-icons/io5'

export default function page() {

  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  function togglePassword(){
    setShowPassword(prev => !prev)
  }

  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(loginSchema),
  })

  const handleLogin = async (data: any) => {

    const result = await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: "/",
    })

    if (!result?.ok) {
      toast.error("Wrong email or password", {
        position: "top-right",
      })
    } else {
      toast.success("Logged in successfully", {
        position: "top-right",
      })
      router.push("/")
    }
    console.log("result:", result)
  }
  return (
    <>
      <div className="container py-16 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div className="hidden lg:block">
            <div className="text-center space-y-6">
              <div className="w-full h-96 overflow-hidden rounded-2xl relative">
                <Image src={loginImage.src} alt='fresh vegetables and fruits shopping cart illustration, modern clean style, green theme' fill className='object-cover' />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-800">FreshCart - Your One-Stop Shop for Fresh Products</h2>
                <p className="text-lg text-gray-600 font-medium">Join thousands of happy customers who trust FreshCart for their daily grocery needs</p>
                <div className="flex items-center justify-center space-x-8 text-sm font-medium text-gray-500">
                  <div className="flex items-center gap-2">
                    <FaTruck className='text-green-600' />
                    Free Delivery
                  </div>
                  <div className="flex items-center gap-2">
                    <FaShieldAlt className='text-green-600' />
                    Secure Payment
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className='text-green-600' />
                    24/7 Support
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg px-6 py-10 w-full">
            <h2 className="text-center text-3xl font-bold mb-4"><span className='text-green-600'>Frech</span>Cart</h2>
            <p className='font-bold text-3xl text-center'>Welcome Back!</p>
            <p className="text-center">Sign in to continue your fresh shopping experience</p>
            <div className="w-full space-y-3 mt-4">
              <Button variant="outline" className="text-lg h-auto py-3 px-4 bg-transparent border-2 border-gray-300 hover:bg-green-100 hover:border-green-400 flex justify-center items-center gap-3 cursor-pointer w-full">
                <FaGoogle className="text-red-600" />
                Continue with Google
              </Button>
              <Button variant="outline" className="text-lg h-auto py-3 px-4 bg-transparent border-2 border-gray-300 hover:bg-green-100 hover:border-green-400 flex justify-center items-center gap-3 cursor-pointer w-full">
                <FaFacebook className="text-blue-600" />
                Continue with Facebook
              </Button>
            </div>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">OR CONTINUE WITH EMAIL</span>
              </div>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className='flex gap-0' htmlFor={field.name}>Email Address</FieldLabel>
                    <div className='relative flex items-center'>
                      {/* The Icon */}
                      <IoMdMail className="absolute left-4 text-gray-400 text-lg" />

                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="ali@example.com"
                        type='email'
                        autoComplete="off"
                        required
                        className='w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500! focus:ring-2 focus:ring-green-100! transition-all'
                      />
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className='flex items-center justify-between' htmlFor={field.name}>Password
                      <Link href={"/forget-password"} className='text-green-600 transition-colors hover:text-green-700'>Forget Password?</Link>
                    </FieldLabel>

                    <div className='relative flex items-center'>
                      {/* The Icon */}
                      <IoLockClosedSharp  className="absolute left-4 text-gray-400 text-lg" />

                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="create a strong password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="off"
                        required
                        className='w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500! focus:ring-2 focus:ring-green-100! transition-all'
                      />
                      <FaEye className='absolute right-3 transition-colors text-gray-400 hover:text-gray-600 cursor-pointer text-lg' onClick={togglePassword}/>
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                className="size-4 cursor-pointer accent-green-600"
              />
              <label htmlFor="terms" className='font-medium text-sm'>Keep me signed in</label>
            </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg h-14 rounded-xl transition-colors cursor-pointer flex items-center gap-1 mb-4">Sign In</Button>
              <div className="pt-8 border-t border-gray-200 text-center">
                <p className="font-medium">New to FreshCart? <Link href="/register" className="text-green-600 hover:underline">Create an account</Link></p>
              </div>
            </form>
            <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <IoLockClosedSharp className='mb-0.5'/>
                SSL Secured
              </div>
              <div className="flex items-center gap-1">
                <FaUsers className='mb-0.5'/>
                50K+ Users
              </div>
              <div className="flex items-center gap-1">
                <FaStar className='mb-0.5'/>
                4.9 Rating
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
