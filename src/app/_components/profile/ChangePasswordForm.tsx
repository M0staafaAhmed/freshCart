"use client";

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FaLock } from 'react-icons/fa'; // أيقونة القفل الهيدر والزرار
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'; // أيقونات العين المفرغة الشيك
import { signOut, useSession } from 'next-auth/react';
import { toast } from 'sonner'; // أو react-hot-toast حسب مشروعك
import { changePassword } from '@/app/_actions/profile.actions';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const passwordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        ),
    rePassword: z.string().min(8, "Please confirm your new password")
}).refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"]
});

export default function ChangePasswordForm() {
    const [isLoading, setIsLoading] = useState(false);

    // 1. States منفصلة لإظهار/إخفاء الباسورد لكل حقل
    const [showCurrentPwd, setShowCurrentPwd] = useState(false);
    const [showNewPwd, setShowNewPwd] = useState(false);
    const [showConfirmPwd, setShowConfirmPwd] = useState(false);

    // 2. إعداد الـ Form مع الـ Validation
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            password: '',
            rePassword: '', // مسمى الـ API الافتراضي لـ Route
        }
    });


    // 3. دالة الـ Submit
    const onSubmit = async (data: any) => {


        setIsLoading(true);
        try {
            const result = await changePassword(data);
            if (result.message === "fail") {
                toast.error(result.errors.msg || "Failed to change password");
                setIsLoading(false);
                return; // خروج مبكر لو فيه خطأ معروف من السيرفر
            }
            toast.success("Password changed successfully");
            setTimeout(() => {
                signOut({
                    callbackUrl: "/login",
                    redirect: true
                })
            }, 1500);
        } catch (error) {
            toast.error("Network error, please try again");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-6">

                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 text-xl">
                        <FaLock />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Change Password</h3>
                        <p className="text-gray-500 text-sm">Update your account password</p>
                    </div>
                </div>

                <div className="space-y-4">

                    <div className="flex flex-col gap-2 relative">
                        <label className="text-sm font-semibold text-gray-700">Current Password</label>
                        <div className="relative">
                            <Controller
                                name="currentPassword"
                                control={control}
                                rules={{ required: "Current password is required" }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type={showCurrentPwd ? "text" : "password"}
                                        placeholder="Enter your current password"
                                        className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 transition-all text-gray-800 placeholder-gray-400"
                                    />
                                )}
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPwd(!showCurrentPwd)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer text-xl"
                            >
                                {showCurrentPwd ? <IoEyeOffOutline /> : <IoEyeOutline />}
                            </button>
                        </div>
                        {errors.currentPassword && <span className="text-xs text-red-500 font-medium pl-1">{errors.currentPassword.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">New Password</label>
                        <div className="relative">
                            <Controller
                                name="password"
                                control={control}
                                rules={{
                                    required: "New password is required",
                                    minLength: { value: 6, message: "Must be at least 6 characters" }
                                }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type={showNewPwd ? "text" : "password"}
                                        placeholder="Enter your new password"
                                        className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 transition-all text-gray-800 placeholder-gray-400"
                                    />
                                )}
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPwd(!showNewPwd)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer text-xl"
                            >
                                {showNewPwd ? <IoEyeOffOutline /> : <IoEyeOutline />}
                            </button>
                        </div>
                        <p className={`text-xs pl-1 font-medium ${errors.password ? 'text-red-500' : 'text-gray-400'}`}>
                            {errors.password?.message || "Must be at least 6 characters"}
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">Confirm New Password</label>
                        <div className="relative">
                            <Controller
                                name="rePassword"
                                control={control}
                                rules={{
                                    required: "Please confirm your password",
                                }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type={showConfirmPwd ? "text" : "password"}
                                        placeholder="Confirm your new password"
                                        className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 transition-all text-gray-800 placeholder-gray-400"
                                    />
                                )}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer text-xl"
                            >
                                {showConfirmPwd ? <IoEyeOffOutline /> : <IoEyeOutline />}
                            </button>
                        </div>
                        {errors.rePassword && <span className="text-xs text-red-500 font-medium pl-1">{errors.rePassword.message}</span>}
                    </div>

                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-amber-600/20 active:scale-[0.98] cursor-pointer"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <FaLock className="text-sm" />
                    )}
                    <span>{isLoading ? "Updating..." : "Change Password"}</span>
                </button>

            </form>
        </div>
    );
}