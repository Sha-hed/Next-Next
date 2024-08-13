import { ConnectDB } from "@/lib/ConnetDB";
import { NextResponse } from "next/server";

export const POST = async (request, { params }) => {
  const booking = await request.json();
  const db = await ConnectDB();
  const bookingsCollection = db.collection("bookings");
  try {
    const result = await bookingsCollection.insertOne(booking);
    return NextResponse.json({ message: "Service Booked Successfully!" });
  } catch (error) {
    return NextResponse.json({ message: "No Data Found!" });
  }
};
