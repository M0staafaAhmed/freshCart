import React from 'react'
import { FaPlus } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

interface EmptyAddressesProps {
  onAddClick: () => void;
}

export default function AddressEmpty({ onAddClick }: EmptyAddressesProps) {
    return (
        <div className="w-full mx-auto bg-white border border-gray-100 rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center text-center shadow-sm">

            {/* الدائرة الرمادية اللي جواها أيقونة اللوكيشن */}
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-5 text-2xl">
                <FaLocationDot />
            </div>

            {/* العناوين والنصوص */}
            <h3 className="text-xl font-bold text-gray-900 mb-2">
                No Addresses Yet
            </h3>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed mb-8">
                Add your first delivery address to make checkout faster and easier.
            </p>

            {/* الزرار الأخضر بـ ظل خفيف زيك كدة */}
            <button
                onClick={onAddClick}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-200 cursor-pointer shadow-lg shadow-green-600/20 active:scale-[0.98]"
            >
                <FaPlus className="text-sm" />
                <span>Add Your First Address</span>
            </button>

        </div>
    )
}
