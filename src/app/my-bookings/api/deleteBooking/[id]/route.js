import { ConnectDB } from "@/lib/ConnetDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  const db = await ConnectDB();
  const bookingCollection = db.collection("bookings");
  try {
    const result = await bookingCollection.deleteOne({
      _id: params.id,
    });
    // console.log("Result Print kortesi", result);
    return NextResponse.json({ message: "Booking Deleted Successfully", result });
  } catch (error) {
    return NextResponse.json({ message: "Something Went Wrong While Deleting" });
  }
};

export const PATCH = async (request, { params }) => {
  console.log('ads;fkjadslkfja;dlfkjklasj')
  const doc = await request.json();
  const db = await ConnectDB();
  const bookingCollection = db.collection("bookings");
  try {
    const result = await bookingCollection.updateOne(
      { _id: params.id },
      { $set: { ...doc } },
      { upsert: true }
    );
    return NextResponse.json({ message: "Updated Successfully", result });
  } catch (error) {
    return NextResponse.json({ message: "Something Went Wrong While Updating" });
  }
};
