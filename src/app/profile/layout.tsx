"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { FaUser } from 'react-icons/fa'
import { FaChevronRight, FaGear, FaLocationDot } from 'react-icons/fa6'

export default function layout({ children }: { children: React.ReactNode }) {
    const  path = usePathname()

    console.log(path)
    return (
        <>

            <div className="bg-linear-to-br from-green-600 via-green-500 to-green-400 text-white">
                <div className="container mx-auto px-4 py-10 sm:py-12">
                    <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
                        <Link className="hover:text-white transition-colors duration-200" href="/">Home</Link>
                        <span className="text-white/40">/</span>
                        <span className="text-white font-medium">My Account</span>
                    </nav>
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
                            <FaUser size={28} className="text-white fill-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">My Account</h1>
                            <p className="text-white/80 mt-1">Manage your addresses and account settings</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    <aside className="w-full lg:w-72 shrink-0">
                        <nav className="sticky top-20 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="p-4 border-b border-gray-100">
                                <h2 className="font-bold text-gray-900">My Account</h2>
                            </div>
                            <ul className="p-2">
                                <li>
                                    <Link className={path === '/profile/addresses' ? `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group bg-green-50 text-green-700` : `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-gray-600 hover:bg-gray-50 hover:text-gray-900`} href="/profile/addresses">
                                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${path === '/profile/addresses' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}`}>
                                            <FaLocationDot />
                                        </div>
                                        <span className="font-medium flex-1">My Addresses</span>
                                        <FaChevronRight className={`${path === '/profile/addresses' ? 'text-green-400' : 'text-gray-400'} text-sm`} />
                                    </Link>
                                </li>
                                <li>
                                    <Link className={path === '/profile/settings' ? `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group bg-green-50 text-green-700` : `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-gray-600 hover:bg-gray-50 hover:text-gray-900`} href="/profile/settings">
                                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${path === '/profile/settings' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}`}>
                                            <FaGear />
                                        </div>
                                        <span className="font-medium flex-1">Settings</span>
                                        <FaChevronRight className={` ${path === '/profile/settings' ? 'text-green-400' : 'text-gray-400'} text-sm`} />
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </aside>
                    <main className="flex-1 min-w-0">
                        {children}
                    </main>
                </div>
            </div>




            
        </>
    )
}
