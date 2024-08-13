import { ConnectDB } from "@/lib/ConnetDB";

export const GET = async (request, { params }) => {
  const db = await ConnectDB();
  const servicesCollection = db.collection("services");
  try {
    const result = await servicesCollection.findOne({ _id: params.id });
    return Response.json(result);
  } catch (error) {
    console.log(error.message);
  }
};
