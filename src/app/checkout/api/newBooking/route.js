import { ConnectDB } from "@/lib/ConnetDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const booking = await request.json();
  const db = await ConnectDB();
  const bookingCollection = db.collection("bookings");
  try {
    const result = await bookingCollection.insertOne(booking);
    return NextResponse.json({ message: "Booking Added Successfully", result });
  } catch (error) {
    return NextResponse.json({
      message: "Something Went Wrong While Adding Bookings",
    });
  }
};
