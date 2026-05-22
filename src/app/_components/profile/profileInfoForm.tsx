"use client";

import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FaUser, FaRegSave } from 'react-icons/fa';
import { signOut, useSession } from 'next-auth/react';
import { jwtDecode } from 'jwt-decode';
import { updateProfile } from '@/app/_actions/profile.actions';
import { toast } from 'sonner';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be at most 100 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().regex(/^01[0-9]{9}$/, "Phone number must be 11 digits and start with 01"),
});

export default function ProfileInfoForm() {
  const { data: session, status } = useSession();
  const token = session?.user?.token;
  const [isUpdating, setIsUpdating] = useState(false);

  let decodedData: any = null;
  if (token) {
    try {
      decodedData = jwtDecode(token);
    } catch (e) {
      console.error("JWT Decode Error:", e);
    }
  }


  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (token && decodedData) {
      reset({
        name: session?.user?.name || '',
        email: session?.user?.email || '',
        phone: '', // حطها لو الباكيند بيبعتها في التوكن
      });
    }
  }, [token, session, reset]);

  // دالة الحفظ
  const onSubmit = async (data: any) => {
    setIsUpdating(true);
    try {
      const result = await updateProfile(data);
      if (result.message === "fail") {
        toast.error(result.errors.msg || "Failed to update profile");
        setIsUpdating(false);
        return;
      }
      toast.success("Profile updated successfully");
      setTimeout(() => {
        signOut({
          callbackUrl: "/login",
          redirect: true
        })
      }, 1500);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white border border-gray-100 rounded-3xl p-12 flex flex-col items-center justify-center min-h-100 shadow-sm">
        <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm mt-4 font-medium animate-pulse">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-6">

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 text-xl">
            <FaUser />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Profile Information</h3>
            <p className="text-gray-500 text-sm">Update your personal details</p>
          </div>
        </div>

        {/* Inputs للفورم */}
        <div className="space-y-4">
          {/* حقل الاسم بالكامل */}
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className='flex gap-0' htmlFor={field.name}>Full Name</FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your full name"
                  type='text'
                  autoComplete="off"
                  required
                  className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500! focus:ring-2 focus:ring-green-100! transition-all'
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
                <FieldLabel className='flex gap-0' htmlFor={field.name}>Email Address</FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email address"
                  type='email'
                  autoComplete="off"
                  required
                  className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500! focus:ring-2 focus:ring-green-100! transition-all'
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
                <FieldLabel className='flex gap-0' htmlFor={field.name}>Phone Number</FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="e.g. 01xxxxxxxxx"
                  type='text'
                  autoComplete="off"
                  required
                  className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500! focus:ring-2 focus:ring-green-100! transition-all'
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={isUpdating}
          className="inline-flex h-auto items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-green-600/20 active:scale-[0.98] cursor-pointer"
        >
          {isUpdating ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <FaRegSave className="text-base" />
          )}
          <span>{isUpdating ? "Saving..." : "Save Changes"}</span>
        </Button>
      </form>

      <div className="bg-slate-50/70 border-t border-gray-100 p-6 sm:p-8 space-y-4">
        <h4 className="text-base font-bold text-gray-900 mb-2">Account Information</h4>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 font-medium">User ID</span>
          <span className="text-gray-700 font-mono text-xs select-all bg-white px-2 py-1 rounded border border-gray-100">
            {decodedData?.id || "Loading..."}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 font-medium">Role</span>
          <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-green-100 text-green-700 capitalize">
            {decodedData?.role || "User"}
          </span>
        </div>
      </div>

    </div>
  );
}