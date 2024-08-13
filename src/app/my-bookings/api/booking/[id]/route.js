import { ConnectDB } from "@/lib/ConnetDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const db = await ConnectDB();
  const bookingCollection = db.collection("bookings");
  try {
    const result = await bookingCollection.findOne({ _id: params.id });
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ message: "Something Went Wrong While Deleting" });
  }
};
