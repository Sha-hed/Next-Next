"use client"
import Image from "next/image";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { signIn } from 'next-auth/react'
import SocialLogin from "@/components/SocialLogin";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const path = searchParams.get('redirect')
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const user = { email, password }
        const resp = await signIn('credentials', {
            email, password, 
            redirect: true,
            callbackUrl: path? path : '/'
        })
        if (resp.status === 200) {
            router.push('/')
        }
        console.log('Paiso ni Response theke', resp);
    }


    return (
        <div className="grid grid-cols-2 gap-12 py-24">
            <div>
                <Image src="/assets/images/login/login.svg" alt="login image" height={400} width={400}></Image>
            </div>
            <div className="border-2 p-12">
                <h6 className="text-3xl font-semibold text-primary text-center">Sign In</h6>
                <form onSubmit={handleSubmit} action="">
                    <label className="font-bold" htmlFor="">Email</label> <br />
                    <input
                        className="mt-3 w-full input input-bordered"
                        type="text" name="email" placeholder="Your Email" id="" /> <br /> <br />
                    <label className="font-bold" htmlFor="">Confirm Password</label> <br />
                    <input
                        className="mt-3 w-full input input-bordered"
                        type="text" name="password" placeholder="your password" id="" /> <br /> <br />
                    <button type="submit" className="w-full btn btn-primary mt-6">Sign In</button>
                </form>
                <div>
                    <h6 className="my-2 text-center">or sign in with</h6>
                    {/* <div className="flex items-center justify-center space-x-3">
                        <button className="btn flex items-center justify-center text-green-500"><FaGoogle /></button>
                        <button className="btn flex items-center justify-center"><FaGithub /></button>
                    </div> */}
                    <SocialLogin />
                    <div className="flex justify-center items-center gap-0">
                        <h6 className="my-2 text-center gap-0">not have account? </h6>
                        <Link href={'/signup'} className="btn btn-link gap-0">Sign Up</Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Page;