import { ConnectDB } from "@/lib/ConnetDB";
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";
export async function POST(request) {
  const user = await request.json();
  try {
    const db = await ConnectDB();
    const userCollection = db.collection("users");
    const findUser = await userCollection.findOne({ email: user.email });
    if (findUser) {
      return NextResponse.json({ message: "User Already Exists" });
    }
    const hash = bcrypt.hashSync(user?.password, 14);
    const exists = await userCollection.insertOne({...user,password:hash});
    // console.log(result);
    return NextResponse.json({ message: "User Created Successfully!!" });
  } catch (error) {
    return NextResponse.json({ message: "Something Went wrong man!" });
  }
}
