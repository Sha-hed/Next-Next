import { ConnectDB } from "@/lib/ConnetDB";
import { ObjectId } from "mongodb";

export const DELETE = async (request, { params }) => {
  const db = await ConnectDB();
  const bookingCollection = db.collection("bookings");
  try {
    const result = await bookingCollection.deleteOne({
      _id: params.id,
    });
    // console.log("Result Print kortesi", result);
    return Response.json({ message: "Booking Deleted Successfully", result });
  } catch (error) {
    return Response.json({ message: "Something Went Wrong While Deleting" });
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
    return Response.json({ message: "Updated Successfully", result });
  } catch (error) {
    return Response.json({ message: "Something Went Wrong While Updating" });
  }
};
