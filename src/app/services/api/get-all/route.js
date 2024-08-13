import { ConnectDB } from "@/lib/ConnetDB";

export const GET = async () => {
  const db = await ConnectDB();
  const servicesCollection = db.collection("services");
  try {
    const result = await servicesCollection.find().toArray();
    return Response.json(result);
  } catch (error) {
    console.log(error.message);
  }
};
