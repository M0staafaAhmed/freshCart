"use client"
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaPlus } from 'react-icons/fa'
import { Textarea } from '@/components/ui/textarea'
import { addAddress } from '@/app/_actions/profile.actions'
import { toast } from 'sonner';
import AddressEmpty from '@/app/_components/profile/addressEmpty';

export default function page() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: ""
    }
  })

  async function onSubmit(data: any) {
    setIsLoading(true);

    try {
      const res = await addAddress(data);
      console.log("Response from API:", res);

      // 👇 التأكد إن الـ API رجع نجاح فعلي (Route API بيرجع status: "success")
      if (res.status === "success" || res.ok) {
        setIsOpen(false);
        reset();
        toast.success("Address added successfully ");
      } else {
        // لو السيرفر رجع رسالة خطأ واضحة (زي التوكن منتهي أو داتا ناقصة)
        toast.error(res.message || "Failed to add address");
      }

    } catch (error) {
      console.error("Submit Error:", error);
      toast.error("Network error, please try again");
    } finally {
      // 👇 السطر ده هيشتغل دايماً سواء الـ API نجح أو فشل، فـ الـ Loader هيقفل بأمان
      setIsLoading(false);
    }
  }
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your saved delivery addresses</p>
        </div>
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open); // بتغير حالة المودال بناءً على الأكشن (فتح أو قفل)

            if (!open) {
              reset(); // 👈 السطر ده هيمسح ويفضي كل الـ inputs أول ما المودال يقفل
            }
          }}
        >
          <DialogTrigger asChild>
            <Button variant="outline" type="button" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white! cursor-pointer font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/25 h-auto">
              <FaPlus /> Add Address
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-lg! p-6 sm:p-8">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-900">Add New Address</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className='flex gap-0' htmlFor={field.name}>Address Name</FieldLabel>

                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. Home, Work"
                        type='text'
                        required
                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-400! focus:ring-2 focus:ring-green-100! transition-all'
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="details"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className='flex gap-0' htmlFor={field.name}>Full Address</FieldLabel>

                      <Textarea
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Street, building, apartment..."
                        required
                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-400! focus:ring-2 focus:ring-green-100! transition-all resize-none h-24'
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <div className="flex gap-4 items-center">
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className='flex gap-0' htmlFor={field.name}>Phone Number</FieldLabel>

                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="01xxxxxxxxx"
                          type='text'
                          required
                          className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-400! focus:ring-2 focus:ring-green-100! transition-all'
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                  <Controller
                    name="city"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className='flex gap-0' htmlFor={field.name}>City</FieldLabel>

                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="cairo"
                          type='text'
                          required
                          className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-400! focus:ring-2 focus:ring-green-100! transition-all'
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </div>
              </FieldGroup>
              <DialogFooter className="bg-transparent border-none flex items-center gap-4 mt-6">
                <DialogClose asChild className="grow">
                  <Button variant="outline" type="button" className="flex-1 py-3 px-6 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors cursor-pointer h-auto">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isLoading} className={`grow h-auto ${isLoading ? "cursor-not-allowed" : "cursor-pointer"} flex-1 py-3 px-6 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 shadow-lg shadow-green-600/25`}> {isLoading ? <><AiOutlineLoading3Quarters className="animate-spin" /> Loading... </> : "Save changes"} </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <AddressEmpty onAddClick={() => setIsOpen(true)} />
    </>
  )
}
