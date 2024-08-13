import { ConnectDB } from "@/lib/ConnetDB";

export const POST = async (request, { params }) => {
  const booking = await request.json();
  const db = await ConnectDB();
  const bookingsCollection = db.collection("bookings");
  try {
    const result = await bookingsCollection.insertOne(booking);
    return Response.json({ message: "Service Booked Successfully!" });
  } catch (error) {
    console.log(error.message);
  }
};
