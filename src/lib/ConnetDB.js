import { MongoClient, ServerApiVersion } from "mongodb";

let db;
export const ConnectDB = async () => {
  if (db) return db;
  try {
    const uri =
      "mongodb+srv://NextJs:3Xd8nk5ilrWB4fw0@cluster0.ojv3wo1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    db = client.db("CarDoctorNextJS");
    return db;
  } catch (error) {
    console.log(error.message);
  }
};
