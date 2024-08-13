import { ConnectDB } from "@/lib/ConnetDB";
import bcrypt from 'bcrypt'
export async function POST(request) {
  const user = await request.json();
  try {
    const db = await ConnectDB();
    const userCollection = db.collection("users");
    const findUser = await userCollection.findOne({ email: user.email });
    if (findUser) {
      return Response.json({ message: "User Already Exists" });
    }
    const hash = bcrypt.hashSync(user?.password, 14);
    const exists = await userCollection.insertOne({...user,password:hash});
    // console.log(result);
    return Response.json({ message: "User Created Successfully!!" });
  } catch (error) {
    return Response.json({ message: "Something Went wrong man!" });
  }
}
