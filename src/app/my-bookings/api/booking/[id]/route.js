import { ConnectDB } from "@/lib/ConnetDB";

export const GET = async (request, { params }) => {
  const db = await ConnectDB();
  const bookingCollection = db.collection("bookings");
  try {
    const result = await bookingCollection.findOne({ _id: params.id });
    return Response.json({ result });
  } catch (error) {
    return Response.json({ message: "Something Went Wrong While Deleting" });
  }
};
