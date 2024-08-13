import { ConnectDB } from "@/lib/ConnetDB";

export const GET = async (request, { params }) => {
  // const booking = await request.json();
  const db = await ConnectDB();
  const bookingsCollection = db.collection("bookings");
  try {
    const myBookings = await bookingsCollection.find({ email: params.email }).toArray();
    return Response.json({myBookings});
  } catch (error) {
    console.log(error.message);
  }
};
