// pages/api/users-by-type.js

import dbConnect from "../../../libs/dbconnect";
import User from "../../../models/User";
import UserType from "../../../models/UserType";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { type } = req.query;

  if (!type) {
    return res.status(400).json({ message: "User type is required" });
  }

  await dbConnect();

  try {
    const userType = await UserType.findOne({
      type: { $regex: new RegExp(`^${type}$`, "i") },
    });

    if (!userType) {
      return res.status(404).json({ message: "User type not found" });
    }

    const users = await User.find({ userType: userType._id }).populate(
      "userType"
    );

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users by type:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
}
