import { ConnectDB } from "@/lib/ConnetDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  const db = await ConnectDB();
  const servicesCollection = db.collection("services");
  try {
    const result = await servicesCollection.find().toArray();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error.message);
  }
};
