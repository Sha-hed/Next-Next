"use client"
import SocialLogin from "@/components/SocialLogin";
import Image from "next/image";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const page = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const newUser = { name, email, password }
        // console.log(user);
        const resp = await fetch('http://localhost:3000/signup/newUser', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        console.log(resp)

    }

    return (
        <div className="grid grid-cols-2 gap-12 py-24">
            <div>
                <Image src="/assets/images/login/login.svg" alt="login image" height={400} width={400}></Image>
            </div>
            <div className="border-2 p-12">
                <h6 className="text-3xl font-semibold text-primary text-center">Sign Up</h6>
                <form onSubmit={handleSubmit} action="">
                    <label className="font-bold" htmlFor="">Name</label> <br />
                    <input
                        className="mt-3 w-full input input-bordered"
                        type="text" name="name" placeholder="Your Name" id="" /> <br /> <br />
                    <label className="font-bold" htmlFor="">Email</label> <br />
                    <input
                        className="mt-3 w-full input input-bordered"
                        type="text" name="email" placeholder="Your Email" id="" /> <br /> <br />
                    <label className="font-bold" htmlFor="">Confirm Password</label> <br />
                    <input
                        className="mt-3 w-full input input-bordered"
                        type="text" name="password" placeholder="your password" id="" /> <br /> <br />
                    <button type="submit" className="w-full btn btn-primary mt-6">Sign Up</button>
                </form>
                <div>
                    <h6 className="my-2 text-center">Or Sign Up With</h6>
                    <SocialLogin />
                    <div className="flex justify-center items-center gap-0">
                        <h6 className="my-2 text-center gap-0">Already have an account?</h6>
                        <Link href={'/login'} className="btn btn-link gap-0">Sign in</Link>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default page;