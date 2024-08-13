import { ConnectDB } from "@/lib/ConnetDB";
import { services } from "@/lib/services";
import { NextResponse } from "next/server";

export const POST = async () => {
  const db = await ConnectDB();
  const servicesCollection = db.collection("services");
  try {
    await servicesCollection.deleteMany();
    const result = await servicesCollection.insertMany(services);
    return NextResponse.json({ message: "Services Added the database", result });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: "Something Went Wrong Adding Services" });
  }
};
