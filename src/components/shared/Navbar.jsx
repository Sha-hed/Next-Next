"use client"
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
const Navbar = () => {

    const session = useSession();
    // console.log("From Session Man", session)

    const navItems = [
        {
            title: 'Home',
            path: '/'
        },
        {
            title: 'About',
            path: '/about'
        },
        {
            title: 'Services',
            path: '/services'
        },
        {
            title: 'Blog',
            path: '/blog'
        },
        {
            title: 'Contact',
            path: '/contact'
        },
        {
            title : 'My Bookings',
            path  : 'my-bookings'
        }
    ]

    return (
        <div className="bg-base-100 text-slate-900 border-b-2">
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <div className="flex flex-col space-y-2">
                                {
                                    navItems.map(nav => <Link
                                        key={nav.path}
                                        href={nav.path}
                                        className="font-semibold hover:text-secondary duration-300"
                                    > {nav.title}
                                    </Link>)
                                }
                            </div>
                        </ul>
                    </div>
                    <Link href={'/'}>
                        <Image alt="logo" src="/assets/logo.svg" height={50} width={50}></Image>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <div className="flex items-center space-x-6">
                        {
                            navItems.map(nav => <Link
                                key={nav.path}
                                href={nav.path}
                                className="font-semibold hover:text-secondary duration-300"
                            > {nav.title}
                            </Link>)
                        }
                    </div>
                </div>
                <div className="navbar-end">
                    <div className="flex items-center space-x-3">
                        <FaShoppingCart className="text-2xl" />
                        <IoMdSearch className="text-2xl" />
                        <a className="btn btn-primary btn-outline">Appointment</a>
                        {
                            session?.data ? <button onClick={()=>signOut()} className="btn btn-secondary">Log Out</button> : <Link href={'/login'} className="btn btn-secondary">Login</Link>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;