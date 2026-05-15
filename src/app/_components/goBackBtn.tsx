// components/GoBackButton.tsx
"use client";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function GoBackBtn() {
    const router = useRouter();
    return (
        <button
            onClick={() => router.back()}
            className="cursor-pointer flex items-center gap-2.5 bg-white text-gray-800 px-8 py-3.5 rounded-full font-bold text-base border border-gray-100 shadow-sm hover:border-gray-200 hover:shadow-md transition-all duration-300 group"
        >
            <FiArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform" />
            Go Back
        </button>
    );
}