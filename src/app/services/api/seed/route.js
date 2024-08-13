import { ConnectDB } from "@/lib/ConnetDB";
import { services } from "@/lib/services";

export const POST = async () => {
  const db = await ConnectDB();
  const servicesCollection = db.collection("services");
  try {
    await servicesCollection.deleteMany();
    const result = await servicesCollection.insertMany(services);
    return Response.json({ message: "Services Added the database", result });
  } catch (error) {
    console.log(error.message);
    return Response.json({ message: "Something Went Wrong Adding Services" });
  }
};
