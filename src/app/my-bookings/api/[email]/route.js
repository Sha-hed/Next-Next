import { ConnectDB } from "@/lib/ConnetDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  // const booking = await request.json();
  const db = await ConnectDB();
  const bookingsCollection = db.collection("bookings");
  try {
    const myBookings = await bookingsCollection.find({ email: params.email }).toArray();
    return NextResponse.json({myBookings});
  } catch (error) {
    return NextResponse.json({message : 'Something Went Wrong'});
  }
};
