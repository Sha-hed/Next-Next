import { ConnectDB } from "@/lib/ConnetDB";

export const POST = async (request) => {
  const booking = await request.json();
  const db = await ConnectDB();
  const bookingCollection = db.collection("bookings");
  try {
    const result = await bookingCollection.insertOne(booking);
    return Response.json({ message: "Booking Added Successfully", result });
  } catch (error) {
    return Response.json({
      message: "Something Went Wrong While Adding Bookings",
    });
  }
};
