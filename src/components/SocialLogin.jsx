"use Client"
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";


const SocialLogin = () => {
    const session = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const path = searchParams.get('redirect')
    const HandleSocialClick = async (provider) => {
        const resp = await signIn(provider, {
            redirect: true,
            callbackUrl: path ? path : '/'
        })
    }
    // if (session?.status === 'authenticated') {
    //     router.push('/')
    // }
    return (
        <div>
            <div className="flex items-center justify-center space-x-3">
                <button onClick={() => HandleSocialClick('google')} className="btn flex items-center justify-center text-green-500"><FaGoogle /></button>
                <button onClick={() => HandleSocialClick('github')} className="btn flex items-center justify-center"><FaGithub /></button>
            </div>
        </div>
    );
};

export default SocialLogin;