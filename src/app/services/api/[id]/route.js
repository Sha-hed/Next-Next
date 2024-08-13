import { ConnectDB } from "@/lib/ConnetDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const db = await ConnectDB();
  const servicesCollection = db.collection("services");
  try {
    const result = await servicesCollection.findOne({ _id: params.id });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({message : 'Something Went Wrong'});
  }
};
