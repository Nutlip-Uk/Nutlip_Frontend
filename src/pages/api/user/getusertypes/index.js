import UserType from "../../../../models/UserType";
import connectDB from "../../../../libs/dbconnect";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  await connectDB();

  try {
    const usetypes = await UserType.find();

    return res.status(200).json({ message: "success", usertypes: usetypes });
  } catch (error) {
    console.error("Error fetching users by type:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
}
