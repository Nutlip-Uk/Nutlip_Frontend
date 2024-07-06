// pages/api/init-user-types.js

import dbConnect from "../../../libs/dbconnect";
import UserType from "../../../models/UserType";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await dbConnect();

  const userTypes = [
    "property_seeker",
    "Real_estate_agent",
    "Mortgage_broker",
    "Conveyancer",
    "private_seller",
    "guest",
  ];

  try {
    const createdTypes = [];
    for (const type of userTypes) {
      const userType = await UserType.findOneAndUpdate(
        { type },
        { type, userId: req.body.userId },
        { upsert: true, new: true }
      );
      createdTypes.push(userType);
    }
    console.log("Created UserTypes:", createdTypes);
    res.status(200).json({
      message: "User types initialized successfully",
      types: createdTypes,
    });
  } catch (error) {
    console.error("Error initializing user types:", error);
    res.status(500).json({ message: "Error initializing user types" });
  }
}
