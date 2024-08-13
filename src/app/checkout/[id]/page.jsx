"use client"
import { getServicesDetails } from "@/services/getServices";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const CheckOut = ({ params }) => {
    const [service, setService] = useState([]);
    const session = useSession();
    console.log(session.data)
    const loadData = async () => {
        const service = await getServicesDetails(params.id)
        setService(service);
    }
    useEffect(() => {
        loadData();
    }, [params])

    const { price, img } = service;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBooking = {
            nam: session?.data?.user?.name,
            email: session?.data?.user?.email,
            phone: e.target.phone.value,
            data: e.target.date.value,
            address: e.target.presentAddress.value,
            ...service
        }
        // console.log(newBooking)
        const res = await fetch('http://localhost:3000/checkout/api/newBooking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBooking)
        })
        const data = await res.json();
        console.log(data)
        if (data?.result?.insertedId) {
            toast.success('Booking Added Successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }
    return (
        <div>
            <h1 className="text-3xl text-center font-bold text-red-400 my-10 underline">Welcome to checkout page!!</h1>
            <form onSubmit={handleSubmit} action="" className="max-w-5xl mx-auto bg-sky-200 p-5 my-10 rounded-xl">
                <div className="flex gap-10 my-5">
                    <div className="w-1/2">
                        <label className="font-bold text-xl" htmlFor="">Name : </label> <br />
                        <input className="border-2 p-3 my-1 rounded-xl bg-gray-100 w-full" defaultValue={session?.data?.user?.name} type="text" name="name" id="" /> <br /> <br />
                        <label className="font-bold text-xl" htmlFor="">Email : </label> <br />
                        <input className="border-2 p-3 my-1 rounded-xl bg-gray-100 w-full" defaultValue={session?.data?.user?.email} type="text" name="email" id="" /> <br /> <br />
                        <label className="font-bold text-xl" htmlFor="">Phone : </label> <br />
                        <input className="border-2 p-3 my-1 rounded-xl bg-gray-100 w-full" type="text" name="phone" id="" />
                    </div>
                    <div className="w-1/2">
                        <label className="font-bold text-xl" htmlFor="">Date : </label> <br />
                        <input className="border-2 p-3 my-1 rounded-xl bg-gray-100 w-full" type="date" name="date" id="" /> <br /><br />
                        <label className="font-bold text-xl" htmlFor="">dueAmount : </label><br />
                        <input readOnly className="border-2 p-3 my-1 rounded-xl bg-gray-100 w-full" defaultValue={price} type="text" name="due" id="" /> <br /> <br />
                        <label className="font-bold text-xl" htmlFor="">presentAddress : </label> <br />
                        <input className="border-2 p-3 my-1 rounded-xl bg-gray-100 w-full" type="text" name="presentAddress" id="" />
                    </div>
                </div>
                <button className="w-full btn btn-primary" type="submit">Order Confirm</button>
            </form>
        </div>
    );
};

export default CheckOut;