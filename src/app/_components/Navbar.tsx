"use client"

import Link from "next/link"
import {
    Menubar,
    MenubarContent,
    MenubarGroup,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { FaGift, FaPhoneAlt, FaRegHeart, FaUserPlus, FaShoppingCart, FaBars, FaTruck, FaRegAddressBook } from "react-icons/fa"
import { CiMail, CiUser } from "react-icons/ci"
import Image from "next/image"
import logo from "@/images/logo.png"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { IoClose, IoPersonCircleOutline, IoSearch } from "react-icons/io5"
import { TfiHeadphoneAlt } from "react-icons/tfi"
import { useContext, useState } from "react"
import { signOut, useSession } from "next-auth/react"
import { MdOutlineLogout } from "react-icons/md"
import { Box } from "lucide-react"
import { FaGear } from "react-icons/fa6"
import { cartContext } from "../_context/cartContextProvider"
import { wishlistContext } from "../_context/wishlistContextProvider"


export function Navbar() {

    const [openNav, setOpenNav] = useState(false)
    const { cartNumber } = useContext(cartContext)
    const { wishlistNumber } = useContext(wishlistContext)


    const { data, status } = useSession()

    function toggleNav() {
        setOpenNav((prev) => !prev)
    }

    function handleLogout() {
        signOut({
            callbackUrl: "/login",
            redirect: true
        })
    }




    return (
        <>
            <div className="py-4 border-b border-gray-200 hidden lg:block">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                        <div className="flex gap-1.5 items-center text-sm">
                            <FaTruck className="text-emerald-600" />
                            <p className="m-0 text-gray-500">Free Shipping on Orders 500 EGP</p>
                        </div>
                        <div className="flex gap-1.5 items-center text-sm">
                            <FaGift className="text-emerald-600" />
                            <p className="m-0 text-gray-500">New Arrivals Daily</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="flex items-center">
                            <div className="pr-5 border-r border-gray-200 flex gap-3 items-center">
                                <a href="tel:+18001234567" className="flex gap-1.5 items-center text-gray-500 hover:text-emerald-600 text-sm">
                                    <FaPhoneAlt />
                                    <p className="m-0">+1 (800) 123-4567</p>
                                </a>
                                <a href="mailto:support@freshcart.com" className="flex gap-1.5 items-center text-gray-500 hover:text-emerald-600 text-sm">
                                    <CiMail />
                                    <p className="m-0">support@freshcart.com</p>
                                </a>
                            </div>
                            <div className="pl-5 flex gap-4 items-center">
                                {status === "authenticated" ? <>
                                    <Link href="/profile" className="flex gap-1.5 items-center text-gray-500 transition-all hover:text-emerald-600 text-sm font-medium">
                                        <CiUser />
                                        <p className="m-0">{data.user?.name}</p>
                                    </Link>
                                    <Button onClick={handleLogout} className="bg-transparent flex gap-1.5 items-center text-gray-500 transition-all hover:text-red-600 cursor-pointer text-sm font-medium">
                                        <MdOutlineLogout />
                                        logOut
                                    </Button>
                                </> : <>
                                    <Link href="/login" className="flex gap-1.5 items-center text-gray-500 transition-all hover:text-emerald-600 text-sm font-medium">
                                        <CiUser />
                                        <p className="m-0">Login</p>
                                    </Link>
                                    <Link href="/register" className="flex gap-1.5 items-center text-gray-500 transition-all hover:text-emerald-600 text-sm font-medium">
                                        <FaUserPlus />
                                        <p className="m-0">Register</p>
                                    </Link>

                                </>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-3 sticky top-0 bg-white z-10 border-b border-gray-200">
                <div className="container mx-auto flex items-center gap-4 ">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src={logo.src} alt="FreshCart Logo" width={150} height={50} />
                    </Link>
                    {/* tablet & desktop navigation */}
                    <div className="hidden lg:flex flex-1 items-center gap-3">
                        <form action="" className="relative flex-1">
                            <Input placeholder="Search for products, brands and more..." className="rounded-3xl focus:border-emerald-500! focus-visible:ring-emerald-100! py-2.5 pr-10" />
                            <Button variant="default" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-0 w-8 h-8 flex items-center justify-center cursor-pointer bg-emerald-600 hover:bg-emerald-700"><IoSearch /></Button>
                        </form>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className="hover:bg-transparent hover:text-emerald-600">
                                        <Link href="/">Home</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className="hover:bg-transparent hover:text-emerald-600">
                                        <Link href="/shop">Shop</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenu>
                                    <NavigationMenuList>
                                        <NavigationMenuItem className="hidden md:flex hover:bg-transparent hover:text-emerald-600">
                                            <NavigationMenuTrigger className="cursor-pointer bg-transparent! hover:text-emerald-600">Categories</NavigationMenuTrigger>
                                            <NavigationMenuContent className="p-0 py-2">
                                                <ul className="grid w-40 gap-2 md:w-45 lg:w-40">
                                                    <li>
                                                        <Link href={"/categories"} className="block text-sm font-medium px-4 py-2.5 text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors">All Categories</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={"/products?category=6439d2d167d9aa4ca970649f"} className="block text-sm font-medium px-4 py-2.5 text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors">Electronics</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={"/products?category=6439d58a0049ad0b52b9003f"} className="block text-sm font-medium px-4 py-2.5 text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors">Women's Fashion</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={"/products?category=6439d5b90049ad0b52b90048"} className="block text-sm font-medium px-4 py-2.5 text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors">men's Fashion</Link>
                                                    </li>
                                                </ul>
                                            </NavigationMenuContent>
                                        </NavigationMenuItem>
                                    </NavigationMenuList>
                                </NavigationMenu>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className="hover:bg-transparent hover:text-emerald-600">
                                        <Link href="/brands">Brands</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>

                        <Link href={"/contact"} className="flex items-center gap-3 group pr-4 border-r border-gray-200">
                            <div className="h-8 w-8 rounded-full bg-emerald-100/50 flex items-center justify-center group-hover:bg-emerald-100/30 transition-all ">
                                <TfiHeadphoneAlt className="text-emerald-600 transtion-all group-hover:text-emeraled-500" />
                            </div>
                            <div>
                                <p className="m-0 text-gray-400 text-xs transtion-all group-hover:text-gray-400/90">Support</p>
                                <p className="m-0  text-xs transtion-all group-hover:text-black/80 font-semibold">24/7 Help</p>
                            </div>
                        </Link>

                        <ul className="p-0 list-none flex gap-1 items-center">
                            <li>
                                <Link href="/wishlist" className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 text-gray-400 hover:text-emerald-600 text-xl relative">
                                    {wishlistNumber > 0 && <div className="absolute top-0 right-0 border-2 border-white rounded-full size-5 text-white flex items-center justify-center bg-red-600 text-xs font-bold">{wishlistNumber > 9 ? `9+` : wishlistNumber}</div>}
                                    <FaRegHeart />
                                </Link>
                            </li>
                            <li>
                                <Link href="/cart" className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 text-gray-400 hover:text-emerald-600 text-xl relative">
                                    {cartNumber > 0 && <div className="absolute top-0 right-0 border-2 border-white rounded-full size-5 text-white flex items-center justify-center bg-green-600 text-xs font-bold">{cartNumber > 9 ? `9+` : cartNumber}</div>}
                                    <FaShoppingCart />
                                </Link>
                            </li>
                            <li className="ms-4">
                                {status === "authenticated" ? (
                                    <Menubar>
                                        <MenubarMenu>
                                            <MenubarTrigger className="cursor-pointer hover:text-green-600 text-gray-500 text-2xl rounded-full w-10 h-10 flex items-center justify-center"><IoPersonCircleOutline /></MenubarTrigger>
                                            <MenubarContent align="end" className="p-0">
                                                <MenubarGroup>
                                                    <MenubarItem className="hover:bg-transparent!">
                                                        <div className="flex items-center gap-2 p-2">
                                                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600!">
                                                                <IoPersonCircleOutline />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-semibold text-gray-800 truncate">{data?.user?.name}</p>
                                                                <p className="text-xs text-gray-400! truncate">{data?.user?.email}</p>
                                                            </div>
                                                        </div>
                                                    </MenubarItem>
                                                </MenubarGroup>
                                                <MenubarSeparator />
                                                <MenubarGroup>
                                                    <MenubarItem className="p-0 block group focus:bg-green-50! hover:bg-green-50!">
                                                        <Link href={"/profile"} className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-gray-600 group-hover:text-green-600!">
                                                            <CiUser className="text-gray-400! hover:text-gray-400! text-lg transition-colors" />
                                                            Profile
                                                        </Link>
                                                    </MenubarItem>
                                                    <MenubarItem className="p-0 block group focus:bg-green-50! hover:bg-green-50!">
                                                        <Link href={"/allorders"} className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-gray-600 group-hover:text-green-600!">
                                                            <Box className="text-gray-400! hover:text-gray-400! text-lg transition-colors" />
                                                            My Orders
                                                        </Link>
                                                    </MenubarItem>
                                                    <MenubarItem className="p-0 block group focus:bg-green-50! hover:bg-green-50!">
                                                        <Link href={"/wishlist"} className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-gray-600 group-hover:text-green-600!">
                                                            <FaRegHeart className="text-gray-400! hover:text-gray-400! text-lg transition-colors" />
                                                            My Wishlist
                                                        </Link>
                                                    </MenubarItem>
                                                    <MenubarItem className="p-0 block group focus:bg-green-50! hover:bg-green-50!">
                                                        <Link href={"/profile/addresses"} className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-gray-600 group-hover:text-green-600!">
                                                            <FaRegAddressBook className="text-gray-400! hover:text-gray-400! text-lg transition-colors" />
                                                            Addresses
                                                        </Link>
                                                    </MenubarItem>
                                                    <MenubarItem className="p-0 block group focus:bg-green-50! hover:bg-green-50!">
                                                        <Link href={"/profile/settings"} className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-gray-600 group-hover:text-green-600!">
                                                            <FaGear className="text-gray-400! hover:text-gray-400! text-lg transition-colors" />
                                                            Settings
                                                        </Link>
                                                    </MenubarItem>
                                                </MenubarGroup>
                                                <MenubarSeparator />
                                                <MenubarGroup>
                                                    <MenubarItem className="p-0 block group cursor-pointer hover:bg-red-50!">
                                                        <Button onClick={handleLogout} className="bg-transparent cursor-pointer mb-2 flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-red-600 w-full justify-start">
                                                            <MdOutlineLogout />
                                                            SignOut
                                                        </Button>
                                                    </MenubarItem>
                                                </MenubarGroup>
                                            </MenubarContent>
                                        </MenubarMenu>
                                    </Menubar>
                                ) : (
                                    <Link href="/register" className="rounded-4xl px-3 py-2 flex items-center gap-1 text-white bg-emerald-600 hover:bg-emerald-700 text-sm font-medium">
                                        <CiUser className="text-lg" />
                                        Sign Up
                                    </Link>
                                )}

                            </li>
                        </ul>
                    </div>
                    {/* mobile menu */}
                    <div className="lg:hidden ml-auto">
                        <ul className="p-0 list-none flex gap-1 items-center">
                            <li>
                                <Link href="/wishlist" className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 text-gray-400 hover:text-emerald-600 text-xl relative">
                                    {wishlistNumber > 0 && <div className="absolute top-0 right-0 border-2 border-white rounded-full size-5 text-white flex items-center justify-center bg-red-600 text-xs font-bold">{wishlistNumber > 9 ? `9+` : wishlistNumber}</div>}
                                    <FaRegHeart />
                                </Link>
                            </li>
                            <li>
                                <Link href="/cart" className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 text-gray-400 hover:text-emerald-600 text-xl relative">
                                    {cartNumber > 0 && <div className="absolute top-0 right-0 border-2 border-white rounded-full size-5 text-white flex items-center justify-center bg-green-600 text-xs font-bold">{cartNumber > 9 ? `9+` : cartNumber}</div>}
                                    <FaShoppingCart />
                                </Link>
                            </li>
                            <li className="ms-4">
                                <button onClick={toggleNav} className="rounded-full cursor-pointer w-10 h-10 flex items-center justify-center gap-1 text-white bg-emerald-600 hover:bg-emerald-700 text-xl font-medium">
                                    <FaBars />
                                </button>
                            </li>
                        </ul>
                        <div className={`fixed inset-0 transition-all duration-500 z-20 bg-black/40 backdrop-blur-xs ${openNav ? 'bg-black/50 opacity-100 visible' : 'opacity-0 invisible'}`} onClick={toggleNav}>
                            <div className={`absolute top-0 w-75 h-full bg-white ${openNav ? 'right-0' : '-right-full'} transition-all duration-500`} onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center justify-between p-5 border-b border-gray-200">
                                    <Link href="/" className="flex items-center gap-2" onClick={toggleNav}>
                                        <Image src={logo.src} alt="FreshCart Logo" width={150} height={50} />
                                    </Link>
                                    <button onClick={toggleNav} className="rounded-full items-center justify-center bg-gray-200 hover:bg-gray-300 transition-all text-xl text-gray-600 w-8 h-8 cursor-pointer flex">
                                        <IoClose />
                                    </button>
                                </div>
                                <div className="px-5 py-4 border-b border-gray-200">
                                    <form action="" className="relative flex-1">
                                        <Input placeholder="Search products..." className="rounded-lg focus:border-emerald-500! focus-visible:ring-emerald-100! py-5 pr-10" />
                                        <Button variant="default" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-0 w-8 h-8 flex items-center justify-center cursor-pointer bg-emerald-600 hover:bg-emerald-700"><IoSearch /></Button>
                                    </form>
                                </div>
                                <ul className="px-5 py-4 border-b border-gray-200 list-none">
                                    <li>
                                        <Link href="/" onClick={toggleNav} className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors">Home</Link>
                                    </li>
                                    <li>
                                        <Link href="/shop" onClick={toggleNav} className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors">Shop</Link>
                                    </li>
                                    <li>
                                        <Link href="/categories" onClick={toggleNav} className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors">Categories</Link>
                                    </li>
                                    <li>
                                        <Link href="/Brands" onClick={toggleNav} className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors">Brands</Link>
                                    </li>
                                </ul>
                                <ul className="px-5 py-4 border-b border-gray-200 list-none">
                                    <li>
                                        <Link href="/wishlist" onClick={toggleNav} className="relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-emerald-50 transition-colors">
                                            <div className="rounded-full w-8 h-8 flex items-center justify-center text-red-400 bg-red-100 text-lg">
                                                <FaRegHeart />
                                            </div>
                                            Wishlist
                                            {wishlistNumber > 0 && <div className="absolute right-3 border-2 border-white rounded-full size-5 text-white flex items-center justify-center bg-red-600 text-xs font-bold">{wishlistNumber > 9 ? `9+` : wishlistNumber}</div>}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/cart" onClick={toggleNav} className="relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-emerald-50 transition-colors">
                                            <div className="rounded-full w-8 h-8 flex items-center justify-center text-emerald-500 bg-emerald-100 text-lg">
                                                <FaShoppingCart />
                                            </div>
                                            Cart
                                            {cartNumber > 0 && <div className="absolute right-3 border-2 border-white rounded-full size-5 text-white flex items-center justify-center bg-green-600 text-xs font-bold">{cartNumber > 9 ? `9+` : cartNumber}</div>}
                                        </Link>
                                    </li>
                                </ul>
                                {status === "authenticated" ? <>
                                    <ul className="px-5 py-4 border-b border-gray-200 list-none">
                                        <li>
                                            <Link href="/profile" onClick={toggleNav} className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-emerald-50 transition-colors">
                                                <div className="rounded-full w-8 h-8 flex items-center justify-center text-gray-400 bg-gray-100 text-lg">
                                                    <CiUser />
                                                </div>
                                                {data?.user?.name}
                                            </Link>
                                        </li>
                                        <li>
                                            <Button onClick={handleLogout} className="w-full bg-transparent h-auto justify-start cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-colors">
                                                <div className="rounded-full w-8 h-8 flex items-center justify-center text-red-500 bg-red-100 text-lg">
                                                    <MdOutlineLogout />
                                                </div>
                                                SignOut
                                            </Button>
                                        </li>
                                    </ul>
                                </>
                                    : <>
                                        <ul className="px-5 py-4 list-none grid grid-cols-2 gap-3">
                                            <li>
                                                <Link href="/login" onClick={toggleNav} className="rounded-xl py-2.5 flex items-center justify-center gap-1 text-white bg-emerald-600 border-2 border-emerald-600 hover:border-emerald-700 hover:bg-emerald-700 text-lg font-medium">
                                                    Sign In
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/register" onClick={toggleNav} className="rounded-xl py-2.5 flex items-center justify-center gap-1 text-emerald-600 border-2 border-emerald-600 hover:bg-emerald-100/50 text-lg font-medium">
                                                    Sign Up
                                                </Link>
                                            </li>
                                        </ul>

                                    </>}
                                <Link href={"/contact"} onClick={toggleNav} className="mx-4 mt-2 p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3 hover:bg-emerald-50 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <TfiHeadphoneAlt className="text-emerald-600" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-700">Need Help?</div>
                                        <div className="text-sm text-emerald-600">Contact Support</div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

