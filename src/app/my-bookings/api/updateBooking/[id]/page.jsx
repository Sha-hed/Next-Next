"use client"

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Updatepage = ({ params }) => {
    const session = useSession();
    console.log(session)
    const [booking, setBooking] = useState([])
    const loadData = async () => {
        const res = await fetch(`http://localhost:3000/my-bookings/api/booking/${params.id}`)
        const data = await res.json();
        setBooking(data.result);
    }
    useEffect(() => {
        loadData();
    }, [params])
    console.log('From Booking ', booking)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateDoc = {
            phone: e.target.phone.value,
            data: e.target.date.value,
            address: e.target.presentAddress.value,
        }
        const res = await fetch(`http://localhost:3000/my-bookings/api/deleteBooking/${params.id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateDoc)
        })
        const data =await res.json();
        console.log(data)
    }


    return (
        <div>
            <h1 className="text-center text-3xl text-red-400 my-10 underline font-bold">Update Booking Page!</h1>
            <form onSubmit={handleSubmit} action="" className="max-w-5xl mx-auto bg-sky-200 p-5 my-10 rounded-xl">
                <div className="flex gap-10 my-5">
                    <div className="w-1/2">
                        <label className="font-bold text-xl" htmlFor="">Name : </label> <br />
                        <input readOnly className="border-2 p-3 my-1 rounded-xl bg-gray-100 w-full" defaultValue={session?.data?.user?.name} type="text" name="name" id="" /> <br /> <br />
                        <label className="font-bold text-xl" htmlFor="">Email : </label> <br />
                        <input readOnly className="border-2 p-3 my-1 rounded-xl bg-gray-100 w-full" defaultValue={session?.data?.user?.email} type="text" name="email" id="" /> <br /> <br />
                        <label className="font-bold text-xl" htmlFor="">Phone : </label> <br />
                        <input defaultValue={booking?.phone} className="border-2 p-3 my-1 rounded-xl bg-gray-100 w-full" type="text" name="phone" id="" />
                    </div>
                    <div className="w-1/2">
                        <label className="font-bold text-xl" htmlFor="">Date : </label> <br />
                        <input defaultValue={booking?.data} className="border-2 p-3 my-1 rounded-xl bg-gray-100 w-full" type="date" name="date" id="" /> <br /><br />
                        <label className="font-bold text-xl" htmlFor="">dueAmount : </label><br />
                        <input readOnly className="border-2 p-3 my-1 rounded-xl bg-gray-100 w-full" defaultValue={booking?.price} type="text" name="due" id="" /> <br /> <br />
                        <label className="font-bold text-xl" htmlFor="">presentAddress : </label> <br />
                        <input defaultValue={booking?.address} className="border-2 p-3 my-1 rounded-xl bg-gray-100 w-full" type="text" name="presentAddress" id="" />
                    </div>
                </div>
                <button className="w-full btn btn-primary" type="submit">Update</button>
            </form>
        </div>
    );
};

export default Updatepage;