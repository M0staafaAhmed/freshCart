"use client"
import React from 'react'
import { FaShieldAlt, FaStar, FaGoogle, FaFacebook } from 'react-icons/fa'
import { FaTruckFast } from 'react-icons/fa6'
import avatar from '@/assets/images/review-image.png'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { MdPersonAddAlt1 } from 'react-icons/md'
import { registerSchema } from './register.schema'
import { registerServer } from './registerServer.action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function page() {


  const router = useRouter();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    resolver: zodResolver(registerSchema),
  })

  async function handleRegister(data: any) {
    const result = await registerServer(data);

    
    if(result.message === "success") {
      toast.success("Account created successfully!" , {
        position: "top-center",
      })
      router.push("/login")
    }else {
      toast.error(result.message || "Something went wrong. Please try again." , {
        position: "top-center",
      })
    }
  }

  return (
    <main className='p-10'>
      <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-4">
        <div>
          <h1 className="text-4xl font-bold">Welcome to <span className="text-primary-600">FreshCart</span></h1>
          <p className="text-xl mt-2 mb-4">Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.</p>
          <ul className="*:flex *:items-start *:gap-4 space-y-6 my-8">
            <li>
              <div className="size-12 text-lg bg-green-200 text-green-600 rounded-full flex justify-center items-center">
                <FaStar />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Premium Quality</h2>
                <p className="text-gray-600">Premium quality products sourced from trusted suppliers.</p>
              </div>
            </li>
            <li>
              <div className="size-12 text-lg bg-green-200 text-green-600 rounded-full flex justify-center items-center">
                <FaTruckFast />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Fast Delivery</h2>
                <p className="text-gray-600">Same-day delivery available in most areas</p>
              </div>
            </li>
            <li>
              <div className="size-12 text-lg bg-green-200 text-green-600 rounded-full flex justify-center items-center">
                <FaShieldAlt />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Secure Shopping</h2>
                <p className="text-gray-600">Your data and payments are completely secure</p>
              </div>
            </li>
          </ul>
          <div className="bg-white shadow-sm p-4 rounded-md">
            <div className="flex items-center gap-4 mb-4">
              <Image src={avatar} alt="Login" width={48} height={48} className="rounded-full" />
              <div>
                <h3>Sarah Johnson</h3>
                <div className="flex items-center gap-1 text-yellow-300">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </div>
            </div>
            <blockquote>
              <p className="italic text-gray-600">"FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!"</p>
            </blockquote>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg px-6 py-10">
          <h2 className="text-center text-3xl font-semibold mb-2">Create Your Account</h2>
          <p className="text-center">Start your fresh journey with us today</p>
          <div className="register-options flex gap-2 *:grow my-10">
            <Button variant="outline" className="font-semibold h-auto py-2 px-4 bg-transparent border border-gray-300 hover:bg-gray-100 flex justify-center items-center gap-2 cursor-pointer">
              <FaGoogle className="text-red-600" />
              Google
            </Button>
            <Button variant="outline" className="font-semibold h-auto py-2 px-4 bg-transparent border border-gray-300 hover:bg-gray-100 flex justify-center items-center gap-2 cursor-pointer">
              <FaFacebook className="text-blue-600" />
              Facebook
            </Button>
          </div>
          <div className="divider relative w-full h-0.5 bg-gray-300/30 my-4 flex items-center before:content-['or'] before:absolute before:top-1/2 before:left-1/2 before:-translate-1/2 before:bg-white before:px-4"></div>
          <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className='flex gap-0' htmlFor={field.name}>Name<span>*</span></FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Ali"
                    autoComplete="off"
                    required
                    className='py-2.5 px-3 transition-all focus:ring-0! outline-none focus:border-green-600! shadow-none!'
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className='flex gap-0' htmlFor={field.name}>Email<span>*</span></FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="ali@example.com"
                    type='email'
                    autoComplete="off"
                    required
                    className='py-2.5 px-3 transition-all focus:ring-0! outline-none focus:border-green-600! shadow-none!'
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className='flex gap-0' htmlFor={field.name}>Password<span>*</span></FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="create a strong password"
                    type='password'
                    autoComplete="off"
                    required
                    className='py-2.5 px-3 transition-all focus:ring-0! outline-none focus:border-green-600! shadow-none!'
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="rePassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className='flex gap-0' htmlFor={field.name}>Confirm Password<span>*</span></FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="confirm your password"
                    type='password'
                    autoComplete="off"
                    required
                    className='py-2.5 px-3 transition-all focus:ring-0! outline-none focus:border-green-600! shadow-none!'
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className='flex gap-0' htmlFor={field.name}>Phone<span>*</span></FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="+1 234 567 8900"
                    autoComplete="off"
                    required
                    className='py-2.5 px-3 transition-all focus:ring-0! outline-none focus:border-green-600! shadow-none!'
                  />
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
              <label htmlFor="terms" className='font-medium'>I agree to the <Link href="/terms" className="text-green-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-green-600 hover:underline">Privacy Policy</Link></label>
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold h-10 rounded-md transition-colors cursor-pointer flex items-center gap-1 mb-4"><MdPersonAddAlt1  className='text-xl'/>Create Account</Button>
            <div className="pt-8 border-t border-gray-200 text-center">
              <p className="font-medium">Already have an account? <Link href="/login" className="text-green-600 hover:underline">Sign in</Link></p>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
