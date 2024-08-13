"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const MyPage = () => {
    const session = useSession();
    const [bookings, setBookings] = useState([])
    // console.log('From Session ', session)
    const loadData = async () => {
        const res = await fetch(`http://localhost:3000/my-bookings/api/${session?.data?.user?.email}`)
        const data = await res.json();
        console.log(data)
        setBookings(data.myBookings)
        // return data.myBookings
    }
    useEffect(() => {
        loadData();
    }, [session])

    const handleDelete = async (id) => {
        console.log('Or Id neu ', id);
        const res = await fetch(`http://localhost:3000/my-bookings/api/deleteBooking/${id}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        console.log(data);
        loadData();
    }

    console.log('Your Favourite Bookings Man ', bookings);


    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-center my-10 underline text-red-500">My Bookings</h1>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-center">
                                <th>#</th>
                                <th>Service Name</th>
                                <th>Address</th>
                                <th>Booking Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                bookings?.map((book, id) =>
                                    <tr key={id} className="text-center">
                                        <td>{id + 1}</td>
                                        <td>{book.title}</td>
                                        <td>{book.address}</td>
                                        <td>{book.data}</td>
                                        <td>
                                            <div className="flex space-x-3 justify-center">
                                                <Link href={`/my-bookings/api/updateBooking/${book._id}`}><button className="btn btn-secondary">Edit</button></Link>
                                                <button onClick={() => handleDelete(book._id)} className="btn btn-primary">Delete</button>
                                            </div>
                                        </td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyPage;